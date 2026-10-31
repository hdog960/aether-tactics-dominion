
(async()=>{
const status=msg=>document.getElementById('roomstatus')&&(document.getElementById('roomstatus').textContent=msg);
let joinRoom;
try{
 const lib=await import('https://esm.run/trystero@0.26.0');
 joinRoom=lib.joinRoom;
 if(typeof joinRoom!=='function')throw new Error('Multiplayer library missing joinRoom');
}catch(e){status('Could not load multiplayer library. Ensure this page is open in Safari with internet access.');window.AetherNet={connect:()=>{throw Error('Multiplayer library unavailable')},ready:false};window.dispatchEvent(new Event('aether-network-ready'));return}
const appId='com.huntermakesgame.aethertactics.publicplaytest.v04';
window.AetherNet={ready:true,connect:(code,host,callbacks)=>{
 const room=joinRoom({appId},'duel-'+code);
 const act=room.makeAction('act'),state=room.makeAction('sync');
 let peer=null;
 room.onPeerJoin=id=>{
   if(peer&&peer!==id)return; // Only one friend occupies a private match.
   peer=id;callbacks.join?.(id);
 };
 room.onPeerLeave=id=>{if(id===peer){peer=null;callbacks.leave?.()}};
 act.onMessage=(payload,meta)=>{
   const sender=typeof meta==='string'?meta:meta?.peerId;
   if(!host||sender!==peer)return;
   if(!payload||typeof payload!=='object'||JSON.stringify(payload).length>1024)return;
   callbacks.intent?.(payload);
 };
 state.onMessage=(payload,meta)=>{
   const sender=typeof meta==='string'?meta:meta?.peerId;
   if(host||sender!==peer)return;
   if(!payload||typeof payload!=='object'||JSON.stringify(payload).length>30000)return;
   callbacks.state?.(payload);
 };
 return {
   intent:a=>{if(!peer)return callbacks.error?.('Friend is not connected');act.send(a,{target:peer}).catch(e=>callbacks.error?.(e.message))},
   state:s=>{if(!peer)return;state.send(s,{target:peer}).catch(e=>callbacks.error?.(e.message))},
   leave:()=>{room.leave().catch(()=>{})}
 };
}};
window.dispatchEvent(new Event('aether-network-ready'));
})();
