// Dominion v4.7.1: release guard for ACK recovery without reapplying commands.
import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const eng=read('v45-engine.js'),qa=read('v45-qa-engine.js'),
 net=read('v30-net.js'),html=read('index.html'),alt=read('v30.html'),
 sw=read('sw.js'),css=read('v471-ack.css'),road=read('DOMINION_ROADMAP.md');
const checks=[],check=(name,pass)=>checks.push({name,pass:!!pass});
check('Isolated and live engines are byte-identical',eng===qa);
check('Painted battlefield renderer remains byte-identical',read('v45-scene.js')===read('v45-qa-scene.js'));
check('Both playable entrypoints reference ACK-recovery assets',
 [html,alt].every(x=>['v45-engine.js?v=471','v30-net.js?v=471',
 'v471-ack.css?v=471','id="duel-refresh-link"','id="duel-link-status"'].every(y=>x.includes(y))));
check('iPhone offline cache refreshes all changed network and UI assets',
 ['aether-dominion-v471-duel-ack-recovery','v45-engine.js?v=471',
 'v30-net.js?v=471','v471-ack.css?v=471'].every(x=>sw.includes(x)));
check('Original keys and v4 match format are not migrated or reset',
 ["const PROFILE_STORE='aether-dominion-profile-v21'",
 "DECK_STORE='aether-dominion-deck-v20'",
 "const LOADOUT_STORE='aether-dominion-loadouts-v452'",'version:4,usedCards:'].every(x=>eng.includes(x)));
check('Original 60-card catalog and competitive stat balancing retained',
 eng.includes("const V458_UNIT_KEYS=['ag','ah','ai','aj']")&&
 eng.includes("function combatLevel(k,t){return mode==='ai'")&&
 html.includes('window.DOMINION_V458_ART_RELEASE=true'));
check('Transport enforces bounded payloads and original peer identity',
 ['senderOf(meta)!==peer','small(payload,75000)','lastInboundSeq',
 'room.onPeerJoin=null','room.makeAction(\'resync\')'].every(x=>net.includes(x)));
check('Original sequence remains stable on retransmission',
 net.includes('return send(actions.intent,{seq:order.seq,rev:order.rev,cmd:order.cmd})')&&
 net.includes('if(seq===lastInboundSeq)callbacks.duplicate?.(seq)'));
check('Host replies with exact ACK even for a rejected action',
 eng.includes('publish(order.seq);render();')&&eng.includes('if(lastDuelAckSeq>0)packet.ackSeq=lastDuelAckSeq'));
check('Unrelated equal revision cannot unlock a pending guest order',
 eng.includes('if(duelOrderPending&&sameRevision&&!matchingAck)return;'));
check('Guest cannot double issue while awaiting ACK',
 eng.includes("mode==='online'&&(!connected||duelOrderPending)")&&
 eng.includes('duelOrderPending=true;duelPendingOrder={seq,rev:revision,cmd:a}'));
check('Lost ACK watchdog retransmits original order, never invents new sequence',
 eng.includes('net?.retryIntent?.(duelPendingOrder);')&&
 eng.includes('duelAckRetries<3')&&eng.includes('duelPendingOrder?.seq!==seq'));
check('Guest resync uses safe read-only host snapshot and original ACK',
 net.includes("requestState:()=>send(actions.resync,{ask:'snapshot'})")&&
 eng.includes('syncRequest:()=>{')&&eng.includes('if(duelStarted)publish();'));
check('User can request resync without opening new room or replacing deck',
 eng.includes("$('duel-refresh-link')?.addEventListener('click'")&&
 eng.includes("document.addEventListener('visibilitychange'")&&
 css.includes('@media(max-width:370px)'));
check('No production accounts, ranking or v5 added without user review',
 road.includes('Mandatory stopping point after v4.7')&&
 road.includes('Do not begin v5.0'));
const problems=checks.filter(x=>!x.pass);
console.log(JSON.stringify({pass:problems.length===0,checks,problems},null,2));
if(problems.length)process.exitCode=1;
