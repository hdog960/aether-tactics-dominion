// v4.6.4 publication guard: hard stop on save resets, missing assets, PvP drift.
import fs from 'node:fs';
const read=path=>fs.readFileSync(path,'utf8');
const eng=read('v45-engine.js'),qa=read('v45-qa-engine.js'),
 index=read('index.html'),secondary=read('v30.html'),
 sw=read('sw.js'),ui=read('v46-gauntlet.js'),
 road=read('DOMINION_ROADMAP.md'),css=read('v464-chronicle.css');
const results=[],check=(name,pass)=>results.push({name,pass:!!pass});
check('Authoritative and isolated engines stay byte-identical',eng===qa);
check('Battle renderers stay byte-identical',
 read('v45-scene.js')===read('v45-qa-scene.js'));
check('All production entrypoints contain Chronicle and versioned assets',
 [index,secondary].every(h=>[
  'id="v464-stage-forecast"','id="v464-run-best"','id="v464-run-history"',
  'v464-chronicle.css?v=464','v46-gauntlet.js?v=464',
  'v45-engine.js?v=464','id="v463-flux-toggle"',
  'data-rift-path="wayfinder"','data-rift-path="stormbound"',
  'data-rift-path="ironbound"'].every(token=>h.includes(token))));
check('iPhone offline cache version and all new references updated',
 ['aether-dominion-v464-rift-chronicle','v464-chronicle.css?v=464',
  'v46-gauntlet.js?v=464','v45-engine.js?v=464'].every(x=>sw.includes(x)));
check('No player saves migrated, renamed or erased',
 ["const PROFILE_STORE='aether-dominion-profile-v21'",
  "DECK_STORE='aether-dominion-deck-v20'",
  "const LOADOUT_STORE='aether-dominion-loadouts-v452'",
  'version:4,usedCards:'].every(x=>eng.includes(x)));
check('Sixty original painted cards and all tiers remain available',
 eng.includes("const V458_UNIT_KEYS=['ag','ah','ai','aj']")&&
 index.includes('window.DOMINION_V458_ART_RELEASE=true')&&
 secondary.includes('window.DOMINION_V458_ART_RELEASE=true')&&
 eng.includes('const MASTERY_CONTRACTS='));
check('Chronicle only stores terminal outcomes and deduplicates by run ID',
 eng.includes("['cleared','failed','abandoned'].includes(outcome)")&&
 eng.includes('g.chronicle.some(entry=>entry.id===run.id)')&&
 eng.includes('g.chronicle=[entry,...g.chronicle].slice(0,12)')&&
 eng.includes("archiveGauntletRun(run,'cleared')")&&
 eng.includes("archiveGauntletRun(run,'failed')"));
check('True path and Flux choice survive result-screen rematches',
 eng.includes("startGauntlet(status.path||'wayfinder',status.flux===true)"));
check('Changing mode records rather than strands in-progress runs',
 eng.includes('function abandonGauntletOnMatchReplace()')&&
 eng.includes("function startOnline(){\n abandonGauntletOnMatchReplace();")&&
 eng.includes("function startQuickMatch(){\n abandonGauntletOnMatchReplace();")&&
 eng.includes("if(!m||(!testMode&&!campaignAvailable(id)))return false;\n abandonGauntletOnMatchReplace();"));
check('Visible Hall shows real stage forecast and best by path with safe text',
 ui.includes("stageForecast.textContent=")&&
 ui.includes("best.textContent=")&&
 ui.includes("const history=$('v464-run-history')")&&
 css.includes('@media(max-width:370px)'));
check('Chronicle contributes no new farmable currency or competitive power',
 !eng.includes('profile.gold+=chronicle')&&
 !eng.includes('profile.levels[entry.path]')&&
 eng.includes("function combatLevel(k,t){return mode==='ai'"));
check('Twelve new isolated regression cases are QA-only',
 eng.includes('qaV464Chronicle:()=>{')&&
 eng.includes('return{pass:checks.length===12'));
check('Mandatory stop after version 4.7 remains binding',
 road.includes('Mandatory stopping point after v4.7')&&
 road.includes('Do not begin v5.0'));
const problems=results.filter(x=>!x.pass).map(x=>x.name);
console.log(JSON.stringify({pass:problems.length===0,results,problems},null,2));
if(problems.length)process.exitCode=1;
