// Diagnostic: two independent GitHub runner VMs use public Nostr signaling
// to play an actual WebRTC duel. Not equivalent to iOS cellular NAT testing.
import {chromium} from 'playwright';
const role=process.argv[2],id=process.env.GITHUB_RUN_ID||'20261102';
if(!['host','guest'].includes(role))throw Error('Use host or guest role');
const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const token=Number(id).toString(31).toUpperCase();
const code=('Z'+token.replace(/[^ABCDEFGHJKLMNPQRSTUVWXYZ23456789]/g,'A').padStart(5,'A').slice(-5));
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const info={role,code,pass:false,env:'different GitHub Actions hosted runners, public Trystero Nostr signaling'};
const errors=[];
try{
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 page.on('pageerror',e=>errors.push(e.message));
 page.on('dialog',d=>d.accept());
 await page.goto('http://127.0.0.1:8000/index.html',{waitUntil:'load',timeout:45000});
 await page.waitForFunction(()=>window.AetherGame&&window.DominionNav&&window.AetherNet?.ready,null,{timeout:30000});
 await page.locator('#home-duel').click();
 await page.locator('#duel-launch').click();
 if(role==='host'){
  const produced=await page.evaluate(code=>{
   const alpha='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',original=crypto.getRandomValues;
   Object.defineProperty(crypto,'getRandomValues',{configurable:true,value:bytes=>{
    for(let i=0;i<bytes.length;i++)bytes[i]=alpha.indexOf(code[i]);
    return bytes;
   }});
   document.getElementById('make-room').click();
   delete crypto.getRandomValues;
   return document.getElementById('roomid').value;
  },code);
  if(produced!==code)throw Error('Host deterministic CI code mismatch');
 }else{
  await page.locator('#roomid').fill(code);
  await page.locator('#join-room').click();
 }
 await page.waitForFunction(()=>window.AetherGame.get().phase==='playing',null,{timeout:95000});
 info.joined=true;
 if(role==='host'){
  await page.locator('#end').click();
  await page.waitForFunction(()=>window.AetherGame.get().round===2,null,{timeout:30000});
 }else{
  await page.waitForFunction(()=>window.AetherGame.get().turn===1,null,{timeout:30000});
  await page.locator('#end').click();
  await page.waitForFunction(()=>window.AetherGame.get().round===2,null,{timeout:30000});
 }
 info.round=await page.evaluate(()=>window.AetherGame.get().round);
 info.link=await page.locator('#duel-link-status').getAttribute('data-link');
 info.pass=info.round===2&&info.link==='linked'&&!errors.length;
 await page.close();
}catch(e){info.error=String(e.stack||e).slice(0,700)}
finally{info.errors=errors;console.log(JSON.stringify(info,null,2));await browser.close()}
if(!info.pass)process.exitCode=1;
