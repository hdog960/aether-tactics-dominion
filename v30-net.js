
(async()=>{
const status=msg=>document.getElementById('roomstatus')&&(document.getElementById('roomstatus').textContent=msg);
let joinRoom;
try{
 const lib=await import('https://esm.run/trystero@0.26.0');
 joinRoom=lib.joinRoom;
 if(typeof joinRoom!=='function')throw new Error('Multiplayer library missing joinRoom');
}catch(e){status('Could not load multiplayer library. Ensure this page is open in Safari with internet access.');window.AetherNet={connect:()=>{throw Error('Multiplayer library unavailable')},ready:false};window.dispatchEvent(new Event('aether-network-ready'));return}
const appId='com.huntermakesgame.aethertactics.publicplaytest.v30';
window.AetherNet={ready:true,connect:(code,host,callbacks)=>{
 const room=joinRoom({appId},'duel-'+code,{
  onJoinError:details=>callbacks.error?.('Peer connection failed; try Wi-Fi or another network. '+String(details?.error?.message||''))
 });
 const act=room.makeAction('act'),state=room.makeAction('sync'),loadout=room.makeAction('loadout');
 let peer=null,closed=false;
 room.onPeerJoin=id=>{
   if(closed)return;
   if(peer&&peer!==id)return; // Only one friend occupies a private match.
   peer=id;callbacks.join?.(id);
   // Surface a real one-time connection quality indicator; never invent ping.
   if(typeof room.ping==='function')room.ping(id).then(ms=>{
    if(peer===id&&Number.isFinite(ms))callbacks.quality?.(Math.round(ms))
   }).catch(()=>{});

 };
 room.onPeerLeave=id=>{if(id===peer&&!closed){peer=null;callbacks.leave?.()}};
 act.onMessage=(payload,meta)=>{
   const sender=typeof meta==='string'?meta:meta?.peerId;
   if(!host||sender!==peer)return;
   if(!payload||typeof payload!=='object'||JSON.stringify(payload).length>1024)return;
   callbacks.intent?.(payload);
 };
 loadout.onMessage=(payload,meta)=>{
   const sender=typeof meta==='string'?meta:meta?.peerId;
   if(!host||sender!==peer)return;
   if(!payload||!Array.isArray(payload.cards)||payload.cards.length!==24||JSON.stringify(payload).length>512)return;
   callbacks.loadout?.(payload.cards);
 };
 state.onMessage=(payload,meta)=>{
   const sender=typeof meta==='string'?meta:meta?.peerId;
   if(host||sender!==peer)return;
   if(!payload||typeof payload!=='object'||JSON.stringify(payload).length>30000)return;
   callbacks.state?.(payload);
 };
 return {
   sendLoadout:cards=>{if(!peer)return;loadout.send({cards},{target:peer}).catch(e=>callbacks.error?.(e.message))},
   intent:a=>{if(!peer)return callbacks.error?.('Friend is not connected');act.send(a,{target:peer}).catch(e=>callbacks.error?.(e.message))},
   state:s=>{if(!peer)return;state.send(s,{target:peer}).catch(e=>callbacks.error?.(e.message))},
   leave:()=>{closed=true;peer=null;room.leave().catch(()=>{})}
 };
}};
window.dispatchEvent(new Event('aether-network-ready'));
})();
