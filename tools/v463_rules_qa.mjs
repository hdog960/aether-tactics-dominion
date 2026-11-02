// Dominion v4.6.3 rotating Rift Omen regression on exact committed source. No player saves.
import fs from 'node:fs';
const engine=fs.readFileSync('v45-engine.js','utf8');
const conquest=fs.readFileSync('v30-campaign-data.js','utf8');
const fakeEl=()=>({
 style:{},dataset:{},children:[],classList:{add(){},remove(){},contains(){return true},toggle(){}},
 addEventListener(){},appendChild(n){this.children.push(n)},focus(){},setAttribute(){},removeAttribute(){},
 getBoundingClientRect(){return{width:100,height:100}},
 querySelector(){return null},querySelectorAll(){return[]},
 getContext(){return{clearRect(){},drawImage(){}}},textContent:'',innerHTML:'',value:'',disabled:false
});
function boot(qa){
 const dom=new Map();
 const document={
  getElementById(id){if(!dom.has(id))dom.set(id,fakeEl());return dom.get(id)},
  createElement(){return fakeEl()},addEventListener(){},querySelectorAll(){return[]}
 };
 const data=new Map();
 const storage={
  getItem(k){return data.has(k)?data.get(k):null},
  setItem(k,v){data.set(k,String(v))},removeItem(k){data.delete(k)}
 };
 const window={
  AetherArt:{get(){return''},terrain(){return''}},
  DOMINION_V45_ART_RELEASE:true,DOMINION_V453_ART_RELEASE:true,
  __qaIsolatedStorage:qa,addEventListener(){},innerWidth:390
 };
 const location={pathname:qa?'/aether-tactics-dominion/qa-v39.html':'/aether-tactics-dominion/index.html',search:'',origin:'http://localhost'};
 new Function('window','document','localStorage','location',conquest)(window,document,storage,location);
 new Function('window','document','localStorage','location','navigator','confirm','URLSearchParams',engine)(
  window,document,storage,location,{},()=>true,URLSearchParams);
 return {G:window.AetherGame,storage,window};
}

const qa=boot(true),live=boot(false),G=qa.G;
const spells=G.qaV463Flux();
const previous={
 v462:G.qaV462MasteryContracts(),v461:G.qaV461Paths(),v460:G.qaV46Gauntlet(),v458:G.qaV458Creatures(),v457:G.qaV457Spells(),v456:G.qaV456Creatures(),v455:G.qaV455Spells(),
 v454:G.qaV454Creatures(),v453:G.qaV453Creatures(),
 v45:G.qaV45Spells(),vault:G.qaDeckVault()
};
const bosses=G.missions.all.filter(z=>z.bossKit).map(z=>G.qaBoss(z.id));
const plans=G.missions.all.flatMap(z=>z.storyScene.choices.map(p=>G.qaPlan(z.id,p.kind)));
const old=G.qaBalance(2);
const mixed=['v','v','b','b','r','r','s','f','c','j','k','M',
 'N','O','P','Y','Z','aa','ab','a','a','h','e','J'];
const newSpells=['v','v','b','b','r','r','s','f','c','j','k','M',
 'N','O','P','Y','Z','ag','ah','ai','aj','a','h','e'];
const mixedRun=G.qaBalance(2,null,{testDeck:mixed});
const newRun=G.qaBalance(2,null,{testDeck:newSpells});
const report={
 spells,previous:Object.fromEntries(Object.entries(previous).map(([k,v])=>[k,
  {pass:v.pass,count:(v.checks||v.tests||v.results).length}])),
 bosses:{pass:bosses.filter(x=>x.pass).length,total:bosses.length},
 plans:{pass:plans.filter(x=>x.pass).length,total:plans.length},
 battles:[old,mixedRun,newRun].map(x=>({games:x.games,wins:x.wins,errors:x.errors})),
 gate:{noQA:live.G.qaV463Flux===undefined,
  activeDeck:live.G.deckInfo().cards,
  hiddenDeck:!live.G.loadouts().currentDeck.some(k=>['ag','ah','ai','aj'].includes(k))},
 stop:fs.readFileSync('DOMINION_ROADMAP.md','utf8').includes('Mandatory stopping point after v4.7')
};
console.log(JSON.stringify(report,null,2));
if(!spells.pass||spells.checks.length!==18||Object.values(previous).some(x=>!x.pass)||
 report.bosses.pass!==report.bosses.total||
 report.plans.pass!==report.plans.total||
 report.battles.some(x=>x.games!==60||x.errors.length)||
 !report.gate.noQA||report.gate.activeDeck!==24||!report.gate.hiddenDeck||!report.stop)
 process.exitCode=1;
