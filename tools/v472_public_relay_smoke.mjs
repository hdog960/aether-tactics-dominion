// Best-effort public-Trystero signaling smoke: two Chromium browsers,
// real network import + Nostr signaling + WebRTC. NOT iPhone/cellular coverage.
import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const errors=[],result={mode:'public Trystero Nostr signaling, same CI network',pass:false};
try{
 async function page(role){
  const p=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  p.on('pageerror',e=>errors.push(role+': '+e.message));
  p.on('dialog',d=>d.accept());
  await p.goto('http://127.0.0.1:8000/index.html',{waitUntil:'load',timeout:45000});
  await p.waitForFunction(()=>window.AetherGame&&window.DominionNav,null,{timeout:20000});
  await p.locator('#home-duel').click();await p.locator('#duel-launch').click();
  await p.waitForFunction(()=>window.AetherNet?.ready===true,null,{timeout:30000});
  return p;
 }
 const host=await page('host'),guest=await page('guest');
 await host.locator('#make-room').click();
 const code=await host.locator('#roomid').inputValue();
 await guest.locator('#roomid').fill(code);
 await guest.locator('#join-room').click();
 await host.waitForFunction(()=>window.AetherGame.get().phase==='playing',null,{timeout:75000});
 await guest.waitForFunction(()=>window.AetherGame.get().phase==='playing',null,{timeout:75000});
 const stateA=await host.evaluate(()=>window.AetherGame.get());
 await host.locator('#end').click();
 await guest.waitForFunction(()=>window.AetherGame.get().turn===1,null,{timeout:25000});
 await guest.locator('#end').click();
 await host.waitForFunction(()=>window.AetherGame.get().round===2,null,{timeout:25000});
 await guest.waitForFunction(()=>window.AetherGame.get().round===2,null,{timeout:25000});
 result.pass=true;result.codeLength=code.length;
 result.hostRound=await host.evaluate(()=>window.AetherGame.get().round);
 result.guestRound=await guest.evaluate(()=>window.AetherGame.get().round);
 result.stateSize=JSON.stringify(stateA).length;
 await host.close();await guest.close();
}catch(e){result.error=String(e.message||e).slice(0,450)}
finally{result.browserErrors=errors;console.log(JSON.stringify(result,null,2));await browser.close()}
if(!result.pass)process.exitCode=1;
