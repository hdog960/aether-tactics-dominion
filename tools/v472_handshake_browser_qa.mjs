// Dominion v4.7.2 real phone-sized browser handshake loss and duplicate safety.
import {chromium} from 'playwright';
const assert=(ok,msg)=>{if(!ok)throw Error(msg)};
const fake=`window.AetherNet={ready:true,connect:(code,host,callbacks)=>{
 const p={host,code,cards:[],states:[],closed:false,
 join(){callbacks.join?.('peer-472')},
 loadout(cards){callbacks.loadout?.(cards)},
 snapshot(packet){callbacks.state?.(packet)},
 leavePeer(){callbacks.leave?.()},
 };
 window.__handshakeProbe=p;
 return {sendLoadout:cards=>{p.cards.push(cards);return true},
  state:s=>{p.states.push(s);return true},
  requestState:()=>{p.requests=(p.requests||0)+1;return true},
  intent:a=>{p.actions=(p.actions||[]).concat([a]);return p.actions.length},
  retryIntent:()=>true,
  connected:()=>!p.closed,
  leave:()=>{p.closed=true}};
 }};
 window.dispatchEvent(new Event('aether-network-ready'));`;
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const errors=[];
async function make(w){
 const page=await browser.newPage({viewport:{width:w,height:844},isMobile:true,hasTouch:true});
 page.on('pageerror',e=>errors.push(w+': '+e.message));
 page.on('dialog',d=>d.accept());
 await page.route(/v30-net\.js\?v=471/,r=>r.fulfill({
  status:200,contentType:'text/javascript',body:fake
 }));
 await page.goto('http://127.0.0.1:8000/index.html',{waitUntil:'load'});
 await page.waitForFunction(()=>window.AetherNet?.ready&&window.AetherGame&&window.DominionNav);
 await page.locator('#home-duel').click();
 await page.locator('#duel-launch').click();
 return page;
}
try{
 const guest=await make(320);
 await guest.locator('#roomid').fill('R472XQ');
 await guest.locator('#join-room').click();
 await guest.evaluate(()=>window.__handshakeProbe.join());
 assert(await guest.evaluate(()=>window.__handshakeProbe.cards.length===1),
  'Guest first deck attempt not sent');
 await guest.waitForTimeout(4200);
 assert(await guest.evaluate(()=>window.__handshakeProbe.cards.length>=2),
  'Lost initial deck must trigger a bounded retry');
 const sent=await guest.evaluate(()=>window.__handshakeProbe.cards.slice());
 assert(sent.every(x=>JSON.stringify(x)===JSON.stringify(sent[0])),
  'Repeated deck handshake must send identical selected deck');
 const state=await guest.evaluate(()=>({...window.AetherGame.get(),phase:'playing',turn:0}));
 await guest.evaluate(s=>window.__handshakeProbe.snapshot({rev:1,s}),state);
 assert(await guest.evaluate(()=>window.AetherGame.get().phase==='playing'),
  'First valid host snapshot must activate guest game');
 const fixed=await guest.evaluate(()=>window.__handshakeProbe.cards.length);
 await guest.waitForTimeout(4100);
 assert(await guest.evaluate(n=>window.__handshakeProbe.cards.length===n,fixed),
  'Guest must cancel deck retries after the match has started');
 await guest.evaluate(()=>document.dispatchEvent(new Event('visibilitychange')));
 assert(await guest.evaluate(()=>window.__handshakeProbe.cards.length===fixed),
  'Safari resume cannot resend deck once it is confirmed');
 await guest.screenshot({path:'art/v472-guest-handshake-320px.png',fullPage:true});
 await guest.close();
 const host=await make(390);
 await host.locator('#make-room').click();
 await host.evaluate(()=>window.__handshakeProbe.join());
 assert(await host.evaluate(()=>window.__handshakeProbe.states.length===1&&
  window.__handshakeProbe.states[0].s.phase==='waiting'),
  'Host must publish initial readiness before receiving guest deck');
 const deck=await host.evaluate(()=>window.AetherGame.loadouts().currentDeck.slice());
 await host.evaluate(cards=>window.__handshakeProbe.loadout(cards),deck);
 assert(await host.evaluate(()=>window.AetherGame.get().phase==='playing'),
  'Host must accept and start first valid guest deck');
 const original=await host.evaluate(()=>JSON.stringify([
  window.AetherGame.get().decks[1],window.AetherGame.get().hands[1]
 ]));
 await host.evaluate(cards=>window.__handshakeProbe.loadout(cards),deck);
 assert(await host.evaluate(old=>JSON.stringify([
  window.AetherGame.get().decks[1],window.AetherGame.get().hands[1]
 ])===old,original),'Duplicate deck handshake cannot reshuffle live match');
 assert(await host.evaluate(()=>window.__handshakeProbe.states.length>=3),
  'Host must respond to duplicate deck with current authoritative snapshot');
 await host.screenshot({path:'art/v472-host-ready-390px.png',fullPage:true});
 await host.close();
 assert(!errors.length,'Browser errors: '+errors.join(', '));
 console.log(JSON.stringify({pass:true,checks:9,formats:[320,390],
  tested:'dropped deck packet, bounded retry, guest start, duplicate freeze, Safari wake',
  errors},null,2));
}finally{await browser.close()}
