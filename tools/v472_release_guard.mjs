// Dominion v4.7.2: protect progression and startup handshake from regression.
import fs from 'node:fs';
const read=f=>fs.readFileSync(f,'utf8');
const eng=read('v45-engine.js'),qa=read('v45-qa-engine.js'),
 html=read('index.html'),alt=read('v30.html'),sw=read('sw.js'),
 rtc=read('tools/v472_rtc_browser_qa.mjs'),
 handshake=read('tools/v472_handshake_browser_qa.mjs'),
 road=read('DOMINION_ROADMAP.md');
const checks=[],check=(name,pass)=>checks.push({name,pass:!!pass});
check('Production and isolated match engines remain identical',eng===qa);
check('Original painted renderer stays identical',read('v45-scene.js')===read('v45-qa-scene.js'));
check('Both public entrypoints use new v4.7.2 handshake engine',
 [html,alt].every(h=>h.includes('v45-engine.js?v=472')&&
 h.includes('v30-net.js?v=471')&&h.includes('id="duel-refresh-link"')));
check('PWA cache is new and includes the actual v4.7.2 engine',
 sw.includes('aether-dominion-v472-peer-handshake')&&
 sw.includes('v45-engine.js?v=472')&&sw.includes('v30-net.js?v=471'));
check('Bounded guest retry is independent of cards and progression',
 eng.includes('function repeatDuelLoadout(ticket)')&&
 eng.includes('if(duelHandshakeTries>=5)')&&
 eng.includes('duelHandshakeTimer=setTimeout(')&&
 eng.includes('net?.sendLoadout(chosenDeck.slice());'));
check('Host announces readiness on first join before guest deck arrives',
 eng.includes("S.phase='waiting';$('roomstatus').textContent='Friend connected. Verifying their 24-card deck…';")&&
 eng.includes('publish();\n    }'));
check('Host never re-installs or reshuffles a live rival deck',
 eng.includes('if(duelStarted){publish();return;}'));
check('Guest cancels retry timers once host starts the battle',
 eng.includes("if(S.phase==='playing'||S.phase==='over'){")&&
 eng.includes('duelStarted=true;clearDuelHandshake();'));
check('Session changes and disconnects clear pending retry timers',
 eng.includes('networkEpoch++;clearDuelAck();clearDuelHandshake();')&&
 eng.includes('connected=false;clearDuelAck();clearDuelHandshake();'));
check('Safely retry deck on manual sync or Safari resume only if unstarted',
 eng.split("if(!duelStarted&&S.phase!=='over')net?.sendLoadout(chosenDeck.slice())").length===3);
check('Live RTC test exercises actual browser data channel, not mocked transport only',
 rtc.includes('new RTCPeerConnection')&&rtc.includes("createDataChannel('dominion')")&&
 rtc.includes('for(let round=1;round<=5;round++)')&&rtc.includes('Playwright local SDP exchange'));
check('Lost-first-deck browser regression and duplicate-freeze QA are present',
 handshake.includes('handshake loss')&&handshake.includes('window.__handshakeProbe.cards.length>=2')&&
 handshake.includes('Duplicate deck handshake cannot reshuffle live match'));
check('Original v4 saves, deck keys, ranked combat rules and 60 cards protected',
 ["const PROFILE_STORE='aether-dominion-profile-v21'","DECK_STORE='aether-dominion-deck-v20'",
  "const LOADOUT_STORE='aether-dominion-loadouts-v452'","const V458_UNIT_KEYS=['ag','ah','ai','aj']",
  "function combatLevel(k,t){return mode==='ai'"].every(x=>eng.includes(x)));
check('Mandatory creator review after v4.7 remains required',
 road.includes('Mandatory stopping point after v4.7')&&road.includes('Do not begin v5.0'));
const bad=checks.filter(c=>!c.pass);
console.log(JSON.stringify({pass:bad.length===0,checks,failed:bad},null,2));
if(bad.length)process.exitCode=1;
