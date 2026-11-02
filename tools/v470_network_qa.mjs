// v4.7.0: mock two real Trystero-compatible peers, without public relay access.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const source=fs.readFileSync('v30-net.js','utf8');
assert(source.includes("trystero@0.26.0"),'Pinned Trystero transport expected');
const script=source.replace("await import('https://esm.run/trystero@0.26.0')",'window.__trystero');
assert.notEqual(script,source,'Network module mock injection must be effective');
const events=[],wire=[],rooms={};
function createPeer(id){
 const state={joined:0,left:0,intents:[],states:[],decks:[],errors:[],quality:[]};
 const elements=new Map();
 const document={getElementById(name){
  if(!elements.has(name))elements.set(name,{textContent:''});
  return elements.get(name);
 }};
 const roomJoin=(options,roomId,callbacks)=>{
  assert.equal(options.appId,'com.huntermakesgame.aethertactics.publicplaytest.v30');
  assert.equal(roomId,'duel-PEER47');
  const room={id,onPeerJoin:null,onPeerLeave:null,handlers:new Map(),options:callbacks,
   makeAction(name){
    const action={onMessage:null,send:(payload,settings)=>{
     if(!settings?.target)throw Error('Unaddressed send');
     wire.push({from:id,to:settings.target,name,payload});
     return Promise.resolve();
    }};
    room.handlers.set(name,action);return action;
   },
   ping:async()=>29,leave:async()=>{room.left=true}
  };
  rooms[id]=room;return room;
 };
 const window={__trystero:{joinRoom:roomJoin},dispatchEvent:ev=>events.push([id,ev.type])};
 const callbacks={join:()=>state.joined++,leave:()=>state.left++,
  intent:msg=>state.intents.push(msg),state:msg=>state.states.push(msg),
  loadout:deck=>state.decks.push(deck),
  error:msg=>state.errors.push(msg),quality:ping=>state.quality.push(ping)};
 const run=new Function('window','document','Event','return '+script);
 return {id,window,document,callbacks,state,load:()=>run(window,document,class Event{
  constructor(type){this.type=type}
 })};
}
const host=createPeer('host'),guest=createPeer('guest');
await host.load();await guest.load();
assert(host.window.AetherNet.ready&&guest.window.AetherNet.ready);
const H=host.window.AetherNet.connect('PEER47',true,host.callbacks);
const G=guest.window.AetherNet.connect('PEER47',false,guest.callbacks);
function open(){
 rooms.host.onPeerJoin?.('guest');
 rooms.guest.onPeerJoin?.('host');
}
function deliver(packet){
 const target=rooms[packet.to];
 if(!target?.left)target?.handlers.get(packet.name)?.onMessage?.(packet.payload,{peerId:packet.from});
}
function flush(){
 let n=0;
 while(wire.length){
  if(++n>80)throw Error('Runaway mock message queue');
  deliver(wire.shift());
 }
}
const checks=[],check=(name,pass)=>{checks.push({name,pass:!!pass});assert(pass,name)};
open();await Promise.resolve();await Promise.resolve();
check('Host and guest each join one peer',host.state.joined===1&&guest.state.joined===1&&H.connected()&&G.connected());
check('Round-trip ping comes from actual mock peer',host.state.quality[0]===29&&guest.state.quality[0]===29);
rooms.host.onPeerJoin('intruder');
check('An unexpected third participant is never admitted',host.state.joined===1);
const cards=Array.from({length:24},()=>'v');
check('Guest can send one legal-sized deck',G.sendLoadout(cards)===true);
flush();
check('Only the known guest supplies the host loadout',host.state.decks.length===1&&host.state.decks[0].length===24);
check('Invalid or overlength deck is refused',G.sendLoadout(['v'])===false&&
 G.sendLoadout(Array.from({length:24},()=>'verylongvalue'.repeat(10)))===false);
check('Guest may send an action with authoritative revision',G.intent({rev:8,cmd:{op:'end'}})===true);
const packet=wire.shift();
deliver(packet);deliver(packet);
check('Duplicated action sequence can reach host only once',
 host.state.intents.length===1&&host.state.intents[0].rev===8);
check('Spoofed sender cannot inject a valid action',
 (()=>{rooms.host.handlers.get('act').onMessage({seq:999,rev:8,cmd:{op:'end'}},{peerId:'intruder'});return host.state.intents.length===1})());
check('Malformed intent and revision are rejected before host callback',
 (()=>{rooms.host.handlers.get('act').onMessage({seq:2,rev:-1,cmd:{op:'end'}},{peerId:'guest'});
 rooms.host.handlers.get('act').onMessage({seq:2,rev:9,cmd:'end'},{peerId:'guest'});
 return host.state.intents.length===1})());
check('A newer sequenced guest action is admitted',G.intent({rev:9,cmd:{op:'end'}})===true);
flush();
check('Accepted actions are sequenced without replay',host.state.intents.length===2&&host.state.intents[1].seq===2);
check('Old packets delivered out of order are ignored',(()=>{deliver(packet);return host.state.intents.length===2})());
check('Host snapshot transfers only to the known guest',H.state({rev:10,s:{version:4,mode:'online',phase:'playing'}})===true);
flush();
check('Guest receives the host snapshot with revision',guest.state.states.length===1&&guest.state.states[0].rev===10);
check('Forged third-party snapshots are discarded',(()=>{
 rooms.guest.handlers.get('sync').onMessage({rev:99,s:{version:4,mode:'online'}},{peerId:'intruder'});
 return guest.state.states.length===1
})());
check('Unsafe oversized state or invalid revisions never send',
 H.state({rev:11,s:{version:4,mode:'online',big:'x'.repeat(75000)}})===false&&
 H.state({rev:-1,s:{version:4,mode:'online'}})===false);
rooms.host.onPeerLeave('guest');rooms.guest.onPeerLeave('host');
check('Disconnect marks both peers unavailable without resetting the duel',!H.connected()&&!G.connected()&&host.state.left===1&&guest.state.left===1);
check('Guest cannot send an action while disconnected',G.intent({rev:12,cmd:{op:'end'}})===false);
open();
check('Reconnect restores one peer without admitting intruder',H.connected()&&G.connected()&&host.state.joined===2&&guest.state.joined===2);
check('Reconnected guest sends a new action with ordered sequence',G.intent({rev:12,cmd:{op:'end'}})===true);
flush();
check('Host accepts the fresh reconnection packet',host.state.intents.length===3&&host.state.intents[2].rev===12);
H.leave();
check('Closed room ignores even a valid late guest packet',(()=>{
 rooms.host.handlers.get('act').onMessage({seq:100,rev:12,cmd:{op:'end'}},{peerId:'guest'});
 return host.state.intents.length===3&&!H.connected()
})());
check('Client startup signals network readiness',events.some(([id,type])=>id==='host'&&type==='aether-network-ready')&&
 events.some(([id,type])=>id==='guest'&&type==='aether-network-ready'));
console.log(JSON.stringify({pass:checks.every(x=>x.pass),checks,mock:'two peers, adversarial packets and reconnect'},null,2));
