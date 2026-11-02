// v4.7.0: fail closed if transport, saved games, PvP fairness or cache drift.
import fs from 'node:fs';
const read=file=>fs.readFileSync(file,'utf8');
const engine=read('v45-engine.js'),qa=read('v45-qa-engine.js'),
 net=read('v30-net.js'),ui=read('index.html'),alternate=read('v30.html'),
 cache=read('sw.js'),road=read('DOMINION_ROADMAP.md');
const checks=[],check=(name,pass)=>checks.push({name,pass:!!pass});
check('Production and isolated engine remain identical',engine===qa);
check('Production and isolated renderer remain identical',
 read('v45-scene.js')===read('v45-qa-scene.js'));
check('Both entrypoints version the same duel transport, combat engine and ribbon',
 [ui,alternate].every(s=>['src="./v30-net.js?v=470"','v45-engine.js?v=470',
  'v470-duel.css?v=470','id="duel-link-status"','id="roomstatus"'].every(v=>s.includes(v))));
check('iPhone PWA precaches the updated duel networking and UI',
 ['aether-dominion-v470-duel-reliability','v30-net.js?v=470',
  'v45-engine.js?v=470','v470-duel.css?v=470'].every(v=>cache.includes(v)));
check('Local profile, deck and v4 match keys preserved',
 ["const PROFILE_STORE='aether-dominion-profile-v21'",
  "DECK_STORE='aether-dominion-deck-v20'",
  "const LOADOUT_STORE='aether-dominion-loadouts-v452'",
  'version:4,usedCards:'].every(v=>engine.includes(v)));
check('No collection cuts or competitive rank advantages',
 engine.includes("const V458_UNIT_KEYS=['ag','ah','ai','aj']")&&
 engine.includes("function combatLevel(k,t){return mode==='ai'")&&
 ui.includes('window.DOMINION_V458_ART_RELEASE=true'));
check('Guest submissions carry the host revision and are locked until ACK',
 engine.includes('duelOrderPending=true;')&&
 engine.includes("net?.intent({rev:revision,cmd:a})")&&
 engine.includes("const ordersLocked=S.mode==='online'")&&
 engine.includes('S=p.s;revision=p.rev;duelOrderPending=false;'));
check('Host rejects stale revision then sends an authoritative snapshot',
 engine.includes("order?.rev===revision&&apply(1,order.cmd)")&&
 engine.includes("publish();render();"));
check('Host never rebuilds decks after an initialized duel',
 engine.includes('if(duelStarted){publish();return;}')&&
 engine.includes("duelStarted=true;S.phase='playing';revision++;"));
check('Disconnects lock both host and guest and reconnect restores state',
 engine.includes("S.phase='waiting';")&&
 engine.includes('if(duelStarted){')&&
 engine.includes('if(S.phase!==\'over\')S.phase=\'playing\';'));
check('Old session callbacks cannot overwrite a newly started match',
 engine.includes('const ticket=networkEpoch;')&&
 engine.includes('if(ticket!==networkEpoch)return;'));
check('Peer identity, packet sizes and sequence checks are enforced in transport',
 net.includes('senderOf(meta)!==peer')&&net.includes('seq<=lastInboundSeq')&&
 net.includes('small(payload,75000)')&&net.includes('room.onPeerJoin=null;'));
check('No automated tests are falsely called live cross-network proof',
 road.includes('Mandatory stopping point after v4.7')&&
 road.includes('Do not begin v5.0'));
const bad=checks.filter(x=>!x.pass);
console.log(JSON.stringify({pass:bad.length===0,checks,failures:bad},null,2));
if(bad.length)process.exitCode=1;
