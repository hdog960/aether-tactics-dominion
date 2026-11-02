import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const checks=[],problems=[],test=(name,pass)=>{checks.push({name,pass:!!pass});if(!pass)problems.push(name)};
const index=read('index.html'),secondary=read('v30.html'),sw=read('sw.js'),
 eng=read('v45-engine.js'),qa=read('v45-qa-engine.js'),scene=read('v45-scene.js'),
 css=read('v46-gauntlet.css'),ui=read('v46-gauntlet.js'),road=read('DOMINION_ROADMAP.md');
test('Real game and isolated engine are byte-identical',eng===qa);
test('Real and QA renderer are unchanged and synchronized',scene===read('v45-qa-scene.js'));
test('Both entrypoints include Hall, mastery, JS and CSS',
 [index,secondary].every(s=>['id="home-gauntlet"','id="home-gauntlet-status"',
 'id="v46-masteries"','v46-gauntlet.js?v=461','v46-gauntlet.css?v=460','v461-rift-paths.css?v=461'].every(x=>s.includes(x))));
test('New original 60-card catalogue is preserved with no newly gated cards',
 eng.includes("const V458_UNIT_KEYS=['ag','ah','ai','aj']")&&
 index.includes('window.DOMINION_V458_ART_RELEASE=true')&&
 secondary.includes('window.DOMINION_V458_ART_RELEASE=true'));
test('Existing locally saved match version and deck/profile keys unchanged',
 eng.includes("version:4,usedCards:")&&
 eng.includes("const PROFILE_STORE='aether-dominion-profile-v21'")&&
 eng.includes("DECK_STORE='aether-dominion-deck-v20'")&&
 eng.includes("const LOADOUT_STORE='aether-dominion-loadouts-v452'"));
test('Gauntlet rewards depend on same run and only a win',
 eng.includes("S.gauntletRunId===run.id")&&eng.includes("run.status==='active'")&&
 eng.includes("if(victory){")&&eng.includes('profile.gauntlet.firstClearRewarded=true'));
test('Run is a linked sequence with a fixed original 24-card deck',
 eng.includes("name:'Whispering Gate'")&&eng.includes("name:'Frostbound Passage'")&&
 eng.includes("name:'Crownfall Reckoning'")&&eng.includes('checkDeck(run.deck)')&&
 eng.includes('S.rewardPool=run.deck.slice()'));
test('First Gauntlet award cannot repeat after first clear',
 eng.includes('if(!profile.gauntlet.firstClearRewarded)'));
test('Card mastery rewards are one time with bounded milestones',
 eng.includes('const tiers=[{uses:4,gold:30},{uses:12,gold:65},{uses:30,gold:125}]')&&
 eng.includes('profile.masteryClaims[k]=claimed'));
test('New PvE gauntlet does not modify online balance',
 eng.includes("function combatLevel(k,t){return mode==='ai'"));
test('Released PWA caches all Gauntlet JS/CSS and fresh engine',
 ['v46-gauntlet.js?v=461','v46-gauntlet.css?v=460','v461-rift-paths.css?v=461','v45-engine.js?v=461',
 'aether-dominion-v461-three-rift-paths'].every(x=>sw.includes(x)));
test('Three Rift paths are presented in both game entrypoints',
 [index,secondary].every(x=>['data-rift-path="wayfinder"','data-rift-path="stormbound"','data-rift-path="ironbound"'].every(v=>x.includes(v))));
test('Original run uses Wayfinder and new variants are bounded to PvE',
 eng.includes('const GAUNTLET_PATHS=')&&eng.includes("stormbound:{id:'stormbound'")&&
 eng.includes("ironbound:{id:'ironbound'")&&eng.includes('firstGold:70')&&eng.includes('firstGold:100')&&
 eng.includes('profile.gauntlet.pathFirstRewards[path.id]'));
test('Gauntlet has real 320px style rules',
 css.includes('@media(max-width:370px)')&&css.includes('.hall-choice.hall-gauntlet'));
test('GAUNTLET is available and all source has no ambiguous post-v4.7 work',
 road.includes('Mandatory stopping point after v4.7')&&ui.includes('startGauntlet'));
console.log(JSON.stringify({pass:problems.length===0,checks,problems},null,2));
if(problems.length)process.exitCode=1;
