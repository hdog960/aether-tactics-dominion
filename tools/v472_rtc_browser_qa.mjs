// Dominion v4.7.2: actual Chromium RTCPeerConnection / RTCDataChannel duel test.
// Signaling is exchanged locally by Playwright; this is NOT a cross-NAT/TURN test.
import fs from 'node:fs';
import {chromium} from 'playwright';
const assert=(ok,msg)=>{if(!ok)throw Error(msg)};
const raw=fs.readFileSync('v30-net.js','utf8');
const transport=raw.replace("await import('https://esm.run/trystero@0.26.0')","window.__rtcTrystero");
assert(transport!==raw,'Pinned module import must be intercepted for deterministic RTC test');
const adapter=`(()=>{
 const rooms=new Map();
 window.__rtcTrystero={joinRoom(config,roomId){
  const actions=new Map(),r={
   roomId,
   makeAction(name){
    const a={onMessage:null,send:(payload,opts)=>{
     const c=window.__rtcTest?.channel;
     if(c?.readyState!=='open'||opts?.target!==window.__rtcRemote)
      return Promise.reject(Error('Not connected'));
     c.send(JSON.stringify({name,payload}));
     return Promise.resolve();
    }};
    actions.set(name,a);return a;
   },
   onPeerJoin:null,onPeerLeave:null,
   ping:()=>Promise.resolve(12),
   leave:async()=>{window.__rtcTest?.pc?.close()}
  };
  rooms.set(roomId,r);
  window.__rtcTest={
   room:r,actions,pc:null,channel:null,joined:false,
   create(offerer){
    const x=window.__rtcTest;
    if(x.pc)x.pc.close();
    x.joined=false;
    const pc=new RTCPeerConnection({iceServers:[]});
    x.pc=pc;
    const attach=c=>{
     x.channel=c;
     c.onopen=()=>{if(!x.joined){x.joined=true;r.onPeerJoin?.(window.__rtcRemote)}};
     c.onclose=()=>{if(x.joined){x.joined=false;r.onPeerLeave?.(window.__rtcRemote)}};
     c.onmessage=e=>{
      let p;try{p=JSON.parse(e.data)}catch{return}
      actions.get(p.name)?.onMessage?.(p.payload,{peerId:window.__rtcRemote});
     };
    };
    if(offerer)attach(pc.createDataChannel('dominion'));
    else pc.ondatachannel=e=>attach(e.channel);
    return true;
   },
   async offer(){
    const pc=window.__rtcTest.pc;
    await pc.setLocalDescription(await pc.createOffer());
    await window.__rtcTest.ice();
    return pc.localDescription.toJSON();
   },
   async answer(offer){
    const pc=window.__rtcTest.pc;
    await pc.setRemoteDescription(offer);
    await pc.setLocalDescription(await pc.createAnswer());
    await window.__rtcTest.ice();
    return pc.localDescription.toJSON();
   },
   async accept(answer){
    await window.__rtcTest.pc.setRemoteDescription(answer);
   },
   ice(){
    const pc=window.__rtcTest.pc;
    return new Promise((resolve,reject)=>{
     if(pc.iceGatheringState==='complete')return resolve();
     const timer=setTimeout(()=>reject(Error('ICE timed out')),12000);
     pc.addEventListener('icegatheringstatechange',()=>{
      if(pc.iceGatheringState==='complete'){clearTimeout(timer);resolve()}
     });
    });
   }
  };
  return r;
 }};
})();`;
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const errors=[];
async function peer(width,role){
 const page=await browser.newPage({viewport:{width,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
 page.on('pageerror',e=>errors.push(role+': '+e.message));
 await page.addInitScript({content:adapter});
 await page.addInitScript(role=>{window.__rtcRemote=role==='host'?'guest':'host'},role);
 await page.route(/v30-net\.js\?v=471/,route=>route.fulfill({
  status:200,contentType:'text/javascript',body:transport
 }));
 await page.goto('http://127.0.0.1:8000/index.html',{waitUntil:'load',timeout:45000});
 await page.waitForFunction(()=>window.AetherGame&&window.AetherNet?.ready&&window.DominionNav);
 await page.locator('#home-duel').click();
 await page.locator('#duel-launch').click();
 return page;
}
async function awaitValue(page,expr,msg,timeout=20000,arg=null){
 try{await page.waitForFunction(expr,arg,{timeout})}
 catch(e){throw Error(msg+' — '+e.message)}
}
async function bridge(host,guest){
 await host.evaluate(()=>window.__rtcTest.create(true));
 await guest.evaluate(()=>window.__rtcTest.create(false));
 const offer=await host.evaluate(()=>window.__rtcTest.offer());
 const answer=await guest.evaluate(offer=>window.__rtcTest.answer(offer),offer);
 await host.evaluate(answer=>window.__rtcTest.accept(answer),answer);
 awaitValue(host,()=>window.__rtcTest.joined,'RTC host DataChannel did not open');
 awaitValue(guest,()=>window.__rtcTest.joined,'RTC guest DataChannel did not open');
}
try{
 const host=await peer(390,'host'),guest=await peer(320,'guest');
 await host.locator('#make-room').click();
 const code=await host.locator('#roomid').inputValue();
 assert(code.length===6,'Host did not generate a valid 6-digit duel code');
 await guest.locator('#roomid').fill(code);
 await guest.locator('#join-room').click();
 await bridge(host,guest);
 await awaitValue(host,()=>window.AetherGame.get().phase==='playing',
  'Host deck handshake failed over real WebRTC DataChannel',35000);
 await awaitValue(guest,()=>window.AetherGame.get().phase==='playing',
  'Guest never received first host-authoritative RTC snapshot',35000);
 assert(await host.locator('#duel-link-status').getAttribute('data-link')==='linked',
  'Host private-link indicator is not connected');
 const steps=[];
 for(let round=1;round<=5;round++){
  await awaitValue(host,()=>window.AetherGame.get().turn===0,'Host did not regain turn '+round);
  await host.locator('#end').click();
  await awaitValue(guest,()=>window.AetherGame.get().turn===1,
   'Guest did not receive host move '+round);
  await guest.locator('#end').click();
  try{
   await awaitValue(host,target=>window.AetherGame.get().round===target,
    'Host did not accept guest move '+round,20000,round+1);
  }catch(e){
   const inspect=await Promise.all([host,guest].map(p=>p.evaluate(()=>({
    phase:window.AetherGame.get()?.phase,turn:window.AetherGame.get()?.turn,
    round:window.AetherGame.get()?.round,roomstatus:document.getElementById('roomstatus')?.textContent,
    linked:document.getElementById('duel-link-status')?.textContent,
    dataChannel:window.__rtcTest?.channel?.readyState,
    inputDisabled:document.getElementById('end')?.disabled,
    error:document.getElementById('instruction')?.textContent
   }))));
   console.error('RTC TURN DIAGNOSTICS',JSON.stringify({round,inspect,errors}));
   throw e;
  }
  await awaitValue(guest,target=>window.AetherGame.get().round===target,
   'Guest did not receive ACK after guest move '+round,20000,round+1);
  const states=await Promise.all([host,guest].map(p=>p.evaluate(()=>{
   const s=window.AetherGame.get();
   return {round:s.round,turn:s.turn,hp:s.hp,energy:s.energy,phase:s.phase,units:s.units.length};
  })));
  assert(JSON.stringify(states[0])===JSON.stringify(states[1]),
   'Real WebRTC host/guest state mismatch after round '+round);
  steps.push(states[0]);
 }
 await guest.screenshot({path:'art/v472-real-rtc-guest-320px.png',fullPage:true});
 await host.screenshot({path:'art/v472-real-rtc-host-390px.png',fullPage:true});
 assert(!errors.length,'Browser errors: '+errors.join('; '));
 console.log(JSON.stringify({pass:true,transport:'real browser RTCDataChannel',
  signaling:'Playwright local SDP exchange; not internet/NAT',
  rounds:steps.length,final:steps.at(-1),errors},null,2));
 await host.close();await guest.close();
}finally{await browser.close()}
