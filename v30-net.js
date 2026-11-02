/* Dominion v4.7.0 — bounded host-authoritative private duel transport.
   Transport messages never grant progression, rewards or client authority. */
(async()=>{
 'use strict';
 const status=msg=>{const el=document.getElementById('roomstatus');if(el)el.textContent=msg};
 let joinRoom;
 try{
  const lib=await import('https://esm.run/trystero@0.26.0');
  joinRoom=lib.joinRoom;
  if(typeof joinRoom!=='function')throw Error('Multiplayer import missing');
 }catch(e){
  status('Private duel networking unavailable. Reconnect to the internet and reopen the game.');
  window.AetherNet={connect:()=>{throw Error('Private duel networking unavailable')},ready:false};
  window.dispatchEvent(new Event('aether-network-ready'));return;
 }
 const appId='com.huntermakesgame.aethertactics.publicplaytest.v30';
 const small=(v,limit)=>{try{return JSON.stringify(v).length<=limit}catch(e){return false}};
 const senderOf=meta=>typeof meta==='string'?meta:meta?.peerId;
 window.AetherNet={ready:true,connect:(code,host,callbacks={})=>{
  const room=joinRoom({appId},'duel-'+code,{
   onJoinError:details=>callbacks.error?.('Peer connection failed. Try Wi-Fi or a different network. '+String(details?.error?.message||'').slice(0,90))
  });
  const actions={
   intent:room.makeAction('act'),
   state:room.makeAction('sync'),
   loadout:room.makeAction('loadout'),
   resync:room.makeAction('resync')
  };
  let peer=null,closed=false,lastInboundSeq=0,outboundSeq=0,lastResyncAt=0;
  const error=e=>{if(!closed)callbacks.error?.(String(e?.message||e).slice(0,140))};
  const send=(channel,payload)=>{
   if(closed||!peer)return false;
   try{Promise.resolve(channel.send(payload,{target:peer})).catch(error);return true}
   catch(e){error(e);return false}
  };
  room.onPeerJoin=id=>{
   if(closed||!id||(peer&&peer!==id))return;
   if(peer===id)return;
   peer=id;lastInboundSeq=0;lastResyncAt=0;
   callbacks.join?.(id);
   if(typeof room.ping==='function')Promise.resolve(room.ping(id)).then(ms=>{
    if(!closed&&peer===id&&Number.isFinite(ms)&&ms>=0)callbacks.quality?.(Math.round(ms))
   }).catch(()=>{});
  };
  room.onPeerLeave=id=>{
   if(closed||id!==peer)return;
   peer=null;lastInboundSeq=0;lastResyncAt=0;callbacks.leave?.();
  };
  actions.intent.onMessage=(payload,meta)=>{
   if(!host||closed||senderOf(meta)!==peer||!peer||!payload||!small(payload,2048))return;
   const seq=payload.seq;
   if(!Number.isSafeInteger(seq)||seq<1||seq>1000000000)return;
   if(seq<=lastInboundSeq){
    if(seq===lastInboundSeq)callbacks.duplicate?.(seq);
    return; // Replay ACK only; NEVER re-apply a movement, card or turn.
   }
   if(!Number.isSafeInteger(payload.rev)||payload.rev<0||!payload.cmd||
      typeof payload.cmd!=='object'||Array.isArray(payload.cmd)||
      typeof payload.cmd.op!=='string')return;
   lastInboundSeq=seq;
   callbacks.intent?.({rev:payload.rev,cmd:payload.cmd,seq});
  };
  // Guest requests a host snapshot if an ACK is lost or after Safari wake.
  // Rate-limit untrusted requests; no remote state mutation is permitted.
  actions.resync.onMessage=(payload,meta)=>{
   if(!host||closed||!peer||senderOf(meta)!==peer||!payload||
      payload.ask!=='snapshot'||!small(payload,80))return;
   const now=Date.now();
   if(now-lastResyncAt<700)return;
   lastResyncAt=now;callbacks.syncRequest?.();
  };
  actions.loadout.onMessage=(payload,meta)=>{
   if(!host||closed||senderOf(meta)!==peer||!peer||!payload||
      !Array.isArray(payload.cards)||payload.cards.length!==24||!small(payload,1024))return;
   callbacks.loadout?.(payload.cards);
  };
  actions.state.onMessage=(payload,meta)=>{
   if(host||closed||senderOf(meta)!==peer||!peer||!payload||!small(payload,75000))return;
   if(!Number.isSafeInteger(payload.rev)||payload.rev<0||!payload.s||
      payload.s.version!==4||payload.s.mode!=='online')return;
   callbacks.state?.(payload);
  };
  return {
   sendLoadout:cards=>Array.isArray(cards)&&cards.length===24&&small({cards},1024)?
    send(actions.loadout,{cards}):false,
   intent:order=>{
    if(!order||!Number.isSafeInteger(order.rev)||order.rev<0||
       !order.cmd||!small(order,1500))return false;
    const seq=outboundSeq+1;
    if(seq>1000000000)return false;
    if(!send(actions.intent,{seq,rev:order.rev,cmd:order.cmd}))return false;
    outboundSeq=seq;return seq;
   },
   retryIntent:order=>{
    if(!order||!Number.isSafeInteger(order.seq)||order.seq<1||
       order.seq>outboundSeq||!Number.isSafeInteger(order.rev)||
       order.rev<0||!order.cmd||!small(order,1500))return false;
    return send(actions.intent,{seq:order.seq,rev:order.rev,cmd:order.cmd});
   },
   requestState:()=>send(actions.resync,{ask:'snapshot'}),
   state:s=>s&&Number.isSafeInteger(s.rev)&&s.rev>=0&&small(s,75000)?
    send(actions.state,s):false,
   connected:()=>!closed&&!!peer,
   leave:()=>{
    if(closed)return;
    closed=true;peer=null;
    room.onPeerJoin=null;room.onPeerLeave=null;
    try{Promise.resolve(room.leave()).catch(()=>{})}catch(e){}
   }
  };
 }};
 window.dispatchEvent(new Event('aether-network-ready'));
})();