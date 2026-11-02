// v4.5.6 release-gate and save-compatibility regression.
// Exercises the real engine with isolated Map storage; never touches a player save.
// Important: this proves data compatibility, NOT painting quality or iPhone rendering.
import fs from 'node:fs';

const engine=fs.readFileSync('v45-engine.js','utf8');
const campaign=fs.readFileSync('v30-campaign-data.js','utf8');
const DECK='aether-dominion-deck-v20';
const SLOTS='aether-dominion-loadouts-v452';
const MATCH='aether-dominion-v04';
const PROFILE='aether-dominion-profile-v21';
const keys=['Y','Z','aa','ab'];
const mixed=['v','v','b','b','r','r','s','f','c','j','k','M',
 'N','O','P','Y','Z','aa','ab','a','a','h','e','J'];
const older=['v','v','v','b','b','b','r','r','r','s','s','f','f','g',
 'c','j','p','k','a','a','h','e','J','J'];
const checks=[];
function check(name,pass,detail=''){
 checks.push({name,pass:!!pass,...(!pass?{detail}: {})});
}
const element=()=>({
 style:{},dataset:{},children:[],
 classList:{add(){},remove(){},contains(){return true},toggle(){}},
 addEventListener(){},appendChild(e){this.children.push(e)},
 focus(){},setAttribute(){},removeAttribute(){},
 getBoundingClientRect(){return{width:390,height:844}},
 querySelector(){return null},querySelectorAll(){return[]},
 getContext(){return{clearRect(){},drawImage(){}}},
 textContent:'',innerHTML:'',value:'',disabled:false
});
function boot({release=false,storage=new Map()}={}){
 const elems=new Map();
 const document={
  getElementById(id){if(!elems.has(id))elems.set(id,element());return elems.get(id)},
  createElement(){return element()},addEventListener(){},querySelectorAll(){return[]}
 };
 const localStorage={
  getItem(k){return storage.has(k)?storage.get(k):null},
  setItem(k,v){storage.set(k,String(v))},
  removeItem(k){storage.delete(k)}
 };
 const window={
  AetherArt:{get(){return''},terrain(){return''}},
  DOMINION_V45_ART_RELEASE:true,
  DOMINION_V453_ART_RELEASE:true,
  DOMINION_V454_ART_RELEASE:true,
  DOMINION_V455_ART_RELEASE:true,
  DOMINION_V456_ART_RELEASE:release,
  addEventListener(){},innerWidth:390
 };
 const location={pathname:'/aether-tactics-dominion/index.html',
  search:'',origin:'http://localhost'};
 new Function('window','document','localStorage','location',campaign)(
  window,document,localStorage,location);
 new Function('window','document','localStorage','location','navigator','confirm','URLSearchParams',engine)(
  window,document,localStorage,location,{},()=>true,URLSearchParams);
 return{game:window.AetherGame,storage};
}
const serialize=v=>JSON.stringify(v);
const same=(a,b)=>serialize(a)===serialize(b);
try{
 // Public v4.5.5 must never show v4.5.6 cards or unexpectedly rewrite a save.
 const baseline=boot();
 const pub=baseline.game.loadouts();
 check('Live 48-card gate hides all four unreleased keys',
  !keys.some(k=>pub.currentDeck.includes(k))&&pub.currentDeck.length===24);
 check('Three preexisting Armory slots are still present',pub.slots.length===3);
 check('Merely opening the game does not create or rewrite save keys',
  [DECK,SLOTS,MATCH,PROFILE].every(k=>!baseline.storage.has(k)));

 // Approved artwork gate: two-character IDs must survive across all persistence.
 const storage=new Map();
 storage.set(DECK,serialize(mixed));
 storage.set(SLOTS,serialize({version:1,active:0,slots:[
  {name:'FOUR ROLES',cards:mixed},
  {name:'OLD STRATEGY',cards:older},
  null
 ]}));
 storage.set(PROFILE,serialize({version:1,level:3,xp:5,gold:100,
  matches:2,wins:1,copies:{v:3,'aa':4,'ab':2},levels:{aa:2,ab:3},
  claimed:{},campaign:{completed:[],stars:{},best:{}}}));
 const release=boot({release:true,storage});
 const vault=release.game.loadouts();
 check('52-card gate loads the exact 24-card mixed deck',
  same(vault.currentDeck,mixed)&&release.game.deckInfo().cards===24);
 check('All four new IDs survive as distinct deck entries',
  keys.every(k=>vault.currentDeck.includes(k))&&
  vault.currentDeck.includes('aa')&&vault.currentDeck.includes('ab'));
 check('Second saved deck survives unchanged alongside expanded deck',
  same(vault.slots[1]?.cards,older)&&vault.slots[2]===null);
 check('Existing card upgrade ranks for aa and ab survive',
  release.game.cardLevel('aa')===2&&release.game.cardLevel('ab')===3);
 release.game.startQuickMatch();
 const snapshot=JSON.parse(storage.get(MATCH)||'null');
 check('Newly started battle saves a genuine v4 match snapshot',
  snapshot?.version===4&&snapshot?.mode==='ai'&&Array.isArray(snapshot?.units));
 check('Battle snapshot retains complete two-character card IDs',
  keys.every(k=>snapshot?.rewardPool?.includes(k))&&
  keys.every(k=>snapshot?.cardRanks?.[k]>=1));
 const firstMatchId=snapshot?.matchId;
 const reload=boot({release:true,storage});
 reload.game.startAI();
 const resumed=reload.game.get();
 check('Reload resumes the same in-progress match rather than resetting it',
  resumed?.matchId===firstMatchId&&same(resumed?.rewardPool,mixed));
 check('Reload preserves saved cards and all Armory slots',
  same(reload.game.loadouts().currentDeck,mixed)&&
  same(reload.game.loadouts().slots[1]?.cards,older));
 check('Reload preserves new card levels in existing profile',
  reload.game.cardLevel('aa')===2&&reload.game.cardLevel('ab')===3);

 // When art is NOT released, a future-only deck is rejected safely.
 // User data is left intact rather than silently destroyed or re-saved.
 const unapproved=boot({release:false,storage});
 const disabled=unapproved.game.loadouts();
 check('Missing-art launch safely refuses expanded active deck',
  disabled.currentDeck.length===24&&!keys.some(k=>disabled.currentDeck.includes(k)));
 check('Missing-art launch preserves original stored selected deck for later',
  same(JSON.parse(storage.get(DECK)),mixed));
 check('Missing-art launch does not overwrite active battle snapshot',
  same(JSON.parse(storage.get(MATCH)),snapshot));
}catch(e){checks.push({name:'Unhandled save compatibility exception',pass:false,detail:String(e.stack||e)})}
const report={pass:checks.every(x=>x.pass),count:checks.length,checks};
console.log(JSON.stringify(report,null,2));
if(!report.pass||report.count!==14)process.exitCode=1;
