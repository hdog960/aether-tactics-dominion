// Dominion v4.5.4 rules regression on exact committed source. No player saves.
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
const qa=boot(true),live=boot(false);
const G=qa.G;
const v454=G.qaV454Creatures();
const v453=G.qaV453Creatures();
const spells=G.qaV45Spells();
const vault=G.qaDeckVault();
const bosses=G.missions.all.filter(z=>z.bossKit).map(z=>G.qaBoss(z.id));
const plans=G.missions.all.flatMap(z=>z.storyScene.choices.map(p=>G.qaPlan(z.id,p.kind)));
const original=G.qaBalance(2);
const deck=['v','v','b','b','r','r','s','f','c','p','k','M','N','O','P','Q','R','S','T','a','a','h','H','J'];
const experiment=G.qaBalance(2,null,{testDeck:deck});
const report={
 rules:{pass:v454.pass,count:v454.checks.length,fail:v454.checks.filter(x=>!x.pass)},
 prior:{v453:v453.pass,v453Count:v453.checks.length,
   spells:spells.pass,spellCount:spells.results.length,
   vault:vault.pass,vaultCount:vault.results.length,
   bossPass:bosses.filter(x=>x.pass).length,bossTotal:bosses.length,
   plansPass:plans.filter(x=>x.pass).length,plansTotal:plans.length},
 battles:{
  original:{games:original.games,wins:original.wins,errors:original.errors},
  experimental:{games:experiment.games,wins:experiment.wins,errors:experiment.errors}
 },
 publicGate:{noQA:live.G.qaV454Creatures===undefined,
  selectedCards:live.G.deckInfo().cards===24,
  newCardsAreNotInDeck:!live.G.loadouts().currentDeck.some(k=>['Q','R','S','T'].includes(k))},
 creatorStop:fs.readFileSync('DOMINION_ROADMAP.md','utf8').includes('Mandatory stopping point after v4.7')
};
console.log(JSON.stringify(report,null,2));
if(!report.rules.pass||report.rules.count!==14||
 !report.prior.v453||report.prior.v453Count!==13||
 !report.prior.spells||report.prior.spellCount!==12||
 !report.prior.vault||report.prior.vaultCount!==8||
 report.prior.bossPass!==report.prior.bossTotal||
 report.prior.plansPass!==report.prior.plansTotal||
 original.games!==60||original.errors.length>0||
 experiment.games!==60||experiment.errors.length>0||
 !report.publicGate.noQA||!report.publicGate.selectedCards||
 !report.publicGate.newCardsAreNotInDeck||!report.creatorStop)process.exitCode=1;
