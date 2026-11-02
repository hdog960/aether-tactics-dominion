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
 const completed=[];
 for(let step=1;step<=5;step++){
  const seat=role==='host'?0:1;
  await page.waitForFunction(({step,seat})=>window.AetherGame.get().round===step&&
   window.AetherGame.get().turn===seat&&window.AetherGame.get().phase==='playing',
   {step,seat},{timeout:65000});
  if(step===1){
   // Exercise actual hand/tile UI, not only END TURN or direct state mutations.
   const before=await page.evaluate(()=>window.AetherGame.get().units.length);
   const hand=await page.evaluate(seat=>window.AetherGame.get().hands[seat][0],seat);
   if(hand!=='v')throw Error(role+' expected the starting Vanguard card, saw '+hand);
   await page.locator('#hand button[data-card="0"]').click();
   // The 32-bit battlefield is interactive via its visible painted canvas,
   // not via the hidden semantic grid. Tap the projected center of tile (1,6).
   const touch=await page.evaluate(()=>{
    const c=document.getElementById('battle-canvas'),r=c.getBoundingClientRect();
    const fit=getComputedStyle(c).objectFit;
    const scale=(fit==='contain'?Math.min:Math.max)(r.width/720,r.height/960);
    const px=1+.5,row=6+.72,t=row/8,width=430+t*270;
    const wx=360+(t-.5)*29+(px/7-.5)*width;
    const wy=237+Math.pow(t,1.21)*518;
    return{x:r.left+(r.width-720*scale)/2+wx*scale,
     y:r.top+(r.height-960*scale)/2+wy*scale,
     rect:[r.x,r.y,r.width,r.height],fit,
     legal:document.querySelector('#board button[data-x="1"][data-y="6"]')?.className};
   });
   await page.touchscreen.tap(touch.x,touch.y);
   try{
    await page.waitForFunction(n=>window.AetherGame.get().units.length===n+1,
     before,{timeout:22000});
   }catch(e){
    info.touchFailure={touch,after:await page.evaluate(()=>({
     units:window.AetherGame.get().units.length,
     notice:document.getElementById('instruction')?.textContent,
     status:document.getElementById('roomstatus')?.textContent,
     clicked:document.elementFromPoint(touch.x,touch.y)?.id
    }))};
    throw e;
   }
   info.cardPlayed=true;
  }
  await page.locator('#end').click();
  await page.waitForFunction(n=>window.AetherGame.get().round===n+1,step,{timeout:65000});
  completed.push(await page.evaluate(()=>({round:window.AetherGame.get().round,
   turn:window.AetherGame.get().turn,hp:window.AetherGame.get().hp,
   units:window.AetherGame.get().units.length})));
  if(step===3&&role==='guest'){
   // One participant loses the page and reconnects to the original host session.
   await page.reload({waitUntil:'load',timeout:45000});
   await page.waitForFunction(()=>window.AetherGame&&window.DominionNav&&window.AetherNet?.ready,
    null,{timeout:30000});
   await page.locator('#home-duel').click();
   await page.locator('#duel-launch').click();
   await page.locator('#roomid').fill(code);
   await page.locator('#join-room').click();
   await page.waitForFunction(()=>window.AetherGame.get().round===4&&
    window.AetherGame.get().phase==='playing',null,{timeout:95000});
   info.rejoined=true;
  }
 }
 info.round=await page.evaluate(()=>window.AetherGame.get().round);
 info.completed=completed;
 info.link=await page.locator('#duel-link-status').getAttribute('data-link');
 info.pass=info.round===6&&completed.length===5&&
  info.cardPlayed===true&&completed.every(x=>x.units===6)&&
  (role==='host'||info.rejoined===true)&&info.link==='linked'&&!errors.length;
 await page.close();
}catch(e){info.error=String(e.stack||e).slice(0,700)}
finally{info.errors=errors;console.log(JSON.stringify(info,null,2));await browser.close()}
if(!info.pass)process.exitCode=1;
