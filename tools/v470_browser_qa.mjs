// v4.7.0: real Chromium 390/320px game surfaces with simulated transport.
import {chromium} from 'playwright';
const assert=(ok,msg)=>{if(!ok)throw Error(msg)};
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const problems=[],results=[];
const fakeTransport=`window.AetherNet={ready:true,connect:(code,host,callbacks)=>{
  const probe={code,host,callbacks,snapshots:[],orders:[],decks:[],closed:false,seqCounter:0,
   join(){callbacks.join?.('peer-47')},leavePeer(){callbacks.leave?.()},
   loadout(cards){callbacks.loadout?.(cards)},
   action(order){callbacks.intent?.(order)},
   snapshot(payload){callbacks.state?.(payload)},
   close(){callbacks.error?.('Test relay drop')}
  };
  window.__duelProbe=probe;
  return {state:s=>{probe.snapshots.push(s);return true},
   intent:a=>{probe.orders.push(a);return ++probe.seqCounter},
   sendLoadout:cards=>{probe.decks.push(cards);return true},
   leave:()=>{probe.closed=true},connected:()=>!probe.closed};
 }};
 window.dispatchEvent(new Event('aether-network-ready'));`;
async function createPage(width,height){
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:2,isMobile:true,hasTouch:true});
 page.on('pageerror',e=>problems.push(width+'px '+e.message));
 page.on('dialog',d=>d.accept());
 await page.route(/v30-net\.js\?v=471/,route=>route.fulfill({status:200,contentType:'text/javascript',body:fakeTransport}));
 await page.goto('http://127.0.0.1:8000/index.html',{waitUntil:'load',timeout:45000});
 await page.waitForFunction(()=>window.AetherGame&&window.DominionNav&&window.AetherNet?.ready,null,{timeout:30000});
 await page.locator('#home-duel').click();
 await page.locator('#duel-launch').click();
 assert(await page.locator('#lobby').isVisible(),'Real Duel Chamber does not open');
 return page;
}
try{
 const host=await createPage(390,844);
 await host.locator('#make-room').click();
 assert(await host.evaluate(()=>!!window.__duelProbe&&window.__duelProbe.host),
  'Host cannot create a private room');
 assert(await host.locator('#duel-link-status').isVisible(),
  'Private link ribbon does not render in actual battlefield');
 assert(await host.locator('#duel-link-status').getAttribute('data-link')==='offline',
  'No-peer link must be offline');
 await host.evaluate(()=>window.__duelProbe.join());
 assert((await host.locator('#roomstatus').textContent()).includes('Verifying'),
  'Host does not expose deck handshake');
 const starting=await host.evaluate(()=>window.AetherGame.loadouts().currentDeck.slice());
 await host.evaluate(cards=>window.__duelProbe.loadout(cards),starting);
 const ready=await host.evaluate(()=>({
  phase:window.AetherGame.get().phase,turn:window.AetherGame.get().turn,
  snapshots:window.__duelProbe.snapshots.length,
  rank:window.AetherGame.get().cardRanks
 }));
 assert(ready.phase==='playing'&&ready.turn===0&&ready.snapshots===1,
  'A valid private rival deck must begin a host-authoritative match');
 assert(await host.locator('#duel-link-status').getAttribute('data-link')==='linked',
  'Active duel should show connected indicator');
 await host.screenshot({path:'art/v470-host-linked-390px.png',fullPage:true});
 await host.locator('#end').click();
 const awaiting=await host.evaluate(()=>({turn:window.AetherGame.get().turn,
  rev:window.__duelProbe.snapshots.at(-1).rev}));
 assert(awaiting.turn===1,'Host end turn did not yield control to guest');
 await host.evaluate(rev=>window.__duelProbe.action({rev,cmd:{op:'end'},seq:1}),awaiting.rev);
 const advanced=await host.evaluate(()=>({turn:window.AetherGame.get().turn,
  round:window.AetherGame.get().round,rev:window.__duelProbe.snapshots.at(-1).rev}));
 assert(advanced.turn===0&&advanced.round===2&&advanced.rev>awaiting.rev,
  'Valid guest action must advance the host state once');
 await host.evaluate(rev=>window.__duelProbe.action({rev,cmd:{op:'end'},seq:2}),awaiting.rev);
 const rejected=await host.evaluate(()=>({round:window.AetherGame.get().round,
  rev:window.__duelProbe.snapshots.at(-1).rev}));
 assert(rejected.round===2&&rejected.rev===advanced.rev,
  'An old-revision guest action must not advance the match');
 const guestDeckBefore=await host.evaluate(()=>JSON.stringify([
  window.AetherGame.get().decks[1],window.AetherGame.get().hands[1]
 ]));
 await host.evaluate(()=>window.__duelProbe.leavePeer());
 assert(await host.locator('#duel-link-status').getAttribute('data-link')==='offline',
  'Disconnection must show offline state');
 assert(await host.locator('#end').isDisabled(),'Disconnected host cannot play on');
 await host.screenshot({path:'art/v470-host-paused-390px.png',fullPage:true});
 await host.evaluate(()=>window.__duelProbe.join());
 const restored=await host.evaluate(()=>({
  round:window.AetherGame.get().round,phase:window.AetherGame.get().phase,
  rev:window.__duelProbe.snapshots.at(-1)?.rev
 }));
 assert(restored.round===2&&restored.phase==='playing'&&restored.rev>advanced.rev,
  'Host must resume the existing battle and publish a fresh state');
 await host.evaluate(cards=>window.__duelProbe.loadout(cards),starting);
 const guestDeckAfter=await host.evaluate(()=>JSON.stringify([
  window.AetherGame.get().decks[1],window.AetherGame.get().hands[1]
 ]));
 assert(guestDeckAfter===guestDeckBefore,
  'Late reconnection handshake cannot reshuffle or replace guest deck');
 results.push({case:'host',initial:ready.phase,turnAdvance:advanced.round,
  staleRejected:true,reconnected:true,deckPreserved:true});
 await host.close();
 const guest=await createPage(320,720);
 await guest.locator('#roomid').fill('PEER47');
 await guest.locator('#join-room').click();
 assert(await guest.evaluate(()=>!!window.__duelProbe&&!window.__duelProbe.host),
  '320px guest cannot join room');
 await guest.evaluate(()=>window.__duelProbe.join());
 assert(await guest.evaluate(()=>window.__duelProbe.decks.length===1),
  'Guest must supply its own selected 24-card deck');
 const snap=await guest.evaluate(()=>{
  const s=window.AetherGame.get();
  return {...s,phase:'playing',turn:1,round:1};
 });
 await guest.evaluate(s=>window.__duelProbe.snapshot({rev:10,s}),snap);
 assert(await guest.locator('#end').isEnabled(),
  'Guest should be enabled only after authoritative host snapshot');
 await guest.locator('#end').click();
 assert(await guest.locator('#end').isDisabled(),
  'Guest cannot issue duplicate unacknowledged actions');
 assert(await guest.locator('#duel-link-status').getAttribute('data-link')==='pending',
  'Guest must see awaiting-host confirmation');
 assert(await guest.evaluate(()=>window.__duelProbe.orders.length===1&&
  window.__duelProbe.orders[0].rev===10),
  'Guest action must carry exact host revision');
 await guest.screenshot({path:'art/v470-guest-pending-320px.png',fullPage:true});
 await guest.evaluate(s=>window.__duelProbe.snapshot({rev:10,s,ackSeq:1}),snap);
 assert(await guest.locator('#end').isEnabled(),
  'Same-revision host rejection should unlock controls');
 await guest.locator('#end').click();
 assert(await guest.evaluate(()=>window.__duelProbe.orders.length===2),
  'Guest should retry after host rejection');
 const accepted={...snap,turn:0,round:2};
 await guest.evaluate(s=>window.__duelProbe.snapshot({rev:11,s}),accepted);
 assert(await guest.locator('#duel-link-status').getAttribute('data-link')==='linked',
  'Valid host ACK must release guest pending UI');
 await guest.evaluate(s=>window.__duelProbe.snapshot({rev:9,s}),snap);
 assert(await guest.evaluate(()=>window.AetherGame.get().round===2&&window.AetherGame.get().turn===0),
  'Old host snapshots must be ignored');
 await guest.evaluate(()=>window.__duelProbe.leavePeer());
 assert(await guest.locator('#end').isDisabled(),'Disconnected guest cannot submit actions');
 const fit=await guest.evaluate(()=>{
  const nodes=['#lobby','#duel-link-status','#end'];
  return nodes.every(sel=>{const el=document.querySelector(sel);if(!el)return false;
   const r=el.getBoundingClientRect();return r.left>=-4&&r.right<=324});
 });
 assert(fit,'320px Duel Chamber or controls overflow phone viewport');
 results.push({case:'guest',pendingLock:true,hostRejectionRecovery:true,
  staleStateBlocked:true,disconnectedLock:true,narrowFit:fit});
 await guest.close();
 assert(!problems.length,'Runtime console errors: '+JSON.stringify(problems));
 console.log(JSON.stringify({pass:true,results,problems},null,2));
}finally{await browser.close()}
