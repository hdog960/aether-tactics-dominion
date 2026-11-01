/* Dominion QA sandbox — v39 (temporary, standalone entrypoint).
   Important: this page uses an in-memory save shim, never real player progress. */
(()=>{
'use strict';
const keys=["p","k","d","o","y","z","A","B"];
const classic=["v","r","b","s","f","g","t","l","c","j"];
const cards=["q","e","i","n","x","C","D","E","F","G"];
const stats={
 p:[5,1,2,1],k:[5,3,1,2],d:[2,1,2,3],o:[4,2,3,1],
 y:[7,2,1,1],z:[5,2,3,1],A:[5,3,1,3],B:[8,2,1,1],
 v:[5,2,1,2],r:[4,2,3,1],b:[8,1,1,1],s:[4,3,1,3],
 f:[4,2,1,3],g:[9,2,1,1],t:[13,5,1,1],l:[10,4,2,2],
 c:[3,2,2,1],j:[6,1,1,2]
};
const $=id=>document.getElementById(id);
const G=window.AetherGame,N=window.DominionNav,A=window.AetherArt;
if(!G||!N||!A){document.body.insertAdjacentHTML('afterbegin','<h1 style="color:red">QA bootstrap failed</h1>');return}
const panel=document.createElement('aside');panel.id="qa-panel";
panel.innerHTML='<h2>DOMINION · REAL BATTLE QA</h2><p id="qa-status">Starting battlefield...</p><div class="qa-buttons"><button data-qa="new">8 NEW UNITS</button><button data-qa="old">CLASSIC UNITS</button><button data-qa="opponents">RED + BLUE</button><button data-qa="cards">SPELL CARDS</button><button data-qa="report">ASSET STATUS</button><button data-qa="combat">COMBAT ENGINE TEST</button><button data-qa="aitest">AI · 12 TURNS</button><button data-qa="spellfx">SPELL FX</button></div><pre id="qa-report"></pre>';
document.body.appendChild(panel);
let errors=[];window.addEventListener('error',e=>{errors.push(String(e.message||e.error));status('ERROR: '+String(e.message))});
window.addEventListener('unhandledrejection',e=>{errors.push(String(e.reason));status('Promise error: '+String(e.reason))});
const blocked=new Set(window.AetherConquest?.regions?.[0]?.rocks||[]);
function emptySlots(n){
 const ans=[];
 for(let y of [5,4,3,2,1,6])for(let x of [0,1,2,4,5,6,3]){
   if(x===3&&(y===0||y===7))continue;
   if(blocked.has(x+','+y))continue;
   ans.push([x,y]);
 }
 return ans.slice(0,n);
}
const groupLayouts={new:keys,old:classic,opponents:[...keys,...keys]};
function status(s){$('qa-status').textContent=s;}
function showUnits(which){
 G.startQuickMatch();
 const s=G.get(),pick=groupLayouts[which];
 if(!s){status('No battle state!');return}
 const cells=emptySlots(pick.length);
 if(cells.length<pick.length){status('Not enough free cells!');return}
 s.units=pick.map((k,i)=>{const [hp,atk,range,move]=stats[k],xy=cells[i];return{
 id:500+i,k,team:which==='opponents'?(i<8?0:1):i%2,
 x:xy[0],y:xy[1],hp,max:hp,atk,range,move,
 shield:k==='b'||k==='B'?2:0,
 fly:k==='d'||k==='f'||k==='l',moved:false,attacked:false
 }});
 s.phase="playing";s.turn=0;s.round=1;s.hp=[24,24];s.energy=[10,10];s.cap=10;
 N.showTab("battle");
 status(which.toUpperCase()+' · '+s.units.length+' actual units on the board');
 window.__qaState={mode:which,unitIds:s.units.map(u=>u.k),gameState:s,errors};
 const as=Array.from(document.images).filter(im=>!im.complete||!im.naturalWidth);
 $('qa-report').textContent='Visible roster: '+pick.join(', ')+'\nLoaded assets: '+(document.images.length-as.length)+'/'+document.images.length+'\nErrors: '+errors.length;
}
function showCards(){
 N.showTab("cards");
 setTimeout(()=>{
  const artImgs=[...document.querySelectorAll('#codex-list img')];
  status('Collection art: '+artImgs.filter(i=>i.complete&&i.naturalWidth).length+'/'+artImgs.length+' img elements loaded');
  $('qa-report').textContent='Portrait sources: '+artImgs.length+'\nVisible names: '+document.querySelectorAll('#codex-list .codex-entry-main strong').length+'\nErrors: '+errors.length;
 },1000);
}
async function assetReport(){
 const a=[
  ['unit atlas','./art/units-character-v37.png?v=37',768,120],
  ['unit card atlas','./art/cards-character-v37.webp?v=37',1024,96],
  ['spell card atlas','./art/cards-spells-v40.webp?v=40',1280,96],
  ['classic','./art/units-painted-v35.png',320,88]
 ];
 const rs=await Promise.all(a.map(([name,url,w,h])=>new Promise(resolve=>{
  const img=new Image();
  img.onload=()=>resolve(name+' '+img.naturalWidth+'×'+img.naturalHeight+' '+(img.naturalWidth===w&&img.naturalHeight===h?'PASS':'CHECK'));
  img.onerror=()=>resolve(name+' FAILED');
  img.src=url;
 })));
 const portraits=keys.map(k=>{const u=A.get(k);return k+': '+(u.startsWith('data:image/png')?'PAINTED READY':u.startsWith('data:image/gif')?'EMPTY':u.slice(0,22))});
 status('Asset dimensions checked; '+errors.length+' page errors');
 $('qa-report').textContent=rs.join('\n')+'\n'+portraits.join('\n')+'\nerrors: '+errors.join('; ');
 window.__qaReport={assets:rs,portraits,errors};
}

function runCombatChecks(){
 const results=[];
 const cells=emptySlots(40);
 let pair=null;
 for(const c of cells){for(const t of cells){
  if(Math.abs(c[0]-t[0])+Math.abs(c[1]-t[1])===1){pair=[c,t];break}
 }if(pair)break}
 if(!pair){status('Combat test blocked: no adjacent empty squares');return}
 const [from,to]=pair;
 const candidates=keys.slice();
 for(const k of candidates){
  try{
   G.startQuickMatch();const S=G.get();
   const st=stats[k],ally={id:701,k,team:0,x:from[0],y:from[1],hp:st[0],max:st[0],atk:st[1],range:st[2],move:st[3],shield:0,fly:k==='d',moved:false,attacked:false};
   const foe={id:702,k:'v',team:1,x:to[0],y:to[1],hp:50,max:50,atk:2,range:1,move:1,shield:0,moved:false,attacked:false};
   S.units=[ally,foe];S.turn=0;S.phase='playing';S.round=1;S.energy=[10,10];
   const ok=G.apply(0,{op:'attack',id:ally.id,x:foe.x,y:foe.y});
   const attacked=!!ok&&ally.attacked&&foe.hp<50;
   results.push({kind:k,action:'attack',pass:attacked,reason:!ok?'action rejected':foe.hp>=50?'no damage':'ok'});
   // Re-seed before movement to avoid test interdependence.
   G.startQuickMatch();
   const M=G.get();
   const p={...ally,hp:st[0],x:from[0],y:from[1],attacked:false,moved:false};
   M.units=[p];M.turn=0;M.phase='playing';M.round=1;M.energy=[10,10];
   const move=G.apply(0,{op:'move',id:p.id,x:to[0],y:to[1]});
   results.push({kind:k,action:'move',pass:!!move&&p.moved&&p.x===to[0]&&p.y===to[1],reason:!move?'move rejected':'ok'});
  }catch(e){results.push({kind:k,action:'exception',pass:false,reason:e.message});errors.push(k+': '+e.message)}
 }
 const passed=results.filter(t=>t.pass).length;
 status('COMBAT '+passed+'/'+results.length+' checks passed');
 window.__qaCombatResults=results;
 showUnits('new');
 $('qa-report').textContent=results.map(x=>(x.pass?'✓ ':'✗ ')+x.kind+' '+x.action+' '+x.reason).join('\n')+'\nJavascript errors: '+errors.length;
 status('COMBAT '+passed+'/'+results.length+' checks passed; original 8-unit scene restored');
}

function runAITurnChecks(){
 const results=[];G.startQuickMatch();N.showTab('battle');
 for(let i=0;i<12;i++){
  const before=G.get();
  if(before.phase!=='playing'){results.push({round:i,pass:true,reason:'Match ended'});break}
  if(before.turn!==0){results.push({round:i,pass:false,reason:'AI left the human unable to act'});break}
  const oldRound=before.round;
  $('end').click();const s=G.get();
  const tiles=new Set(s.units.map(u=>u.x+','+u.y));
  const legal=s.units.every(u=>u.x>=0&&u.x<7&&u.y>=0&&u.y<8&&u.hp>0);
  const valid=tiles.size===s.units.length&&legal&&s.units.filter(u=>u.team===0).length<=8&&
   s.units.filter(u=>u.team===1).length<=8&&
   s.energy.every(e=>e>=0&&e<=10)&&s.hp.every(h=>h>=0&&h<=24)&&
   (s.phase!=='playing'||s.turn===0&&s.round===oldRound+1);
  results.push({round:oldRound,pass:valid,reason:valid?'legal AI turn':'illegal position/resource/turn'});
  if(!valid){errors.push('AI turn failed on '+oldRound);break}
 }
 const passed=results.filter(x=>x.pass).length;
 const failures=results.filter(x=>!x.pass);
 window.__qaAIResults=results;
 status('AI '+passed+'/'+results.length+' legality checks; '+failures.length+' failures');
 $('qa-report').textContent=results.map(x=>(x.pass?'✓':'✗')+' turn '+x.round+' '+x.reason).join('\n');
}
function runSpellFXChecks(){
 showUnits('new');const s=G.get();
 const target=s.units[0],from=s.units[1];
 const kinds=['bolt','cross','frost','ignite','silence','exchange','heal','shield','cleanse','dash','rally','bond','snare','recall'];
 s.fxEvents=[];s.fxSeq=0;
 for(const kind of kinds){
  s.fxEvents.push({id:++s.fxSeq,type:['bolt','cross','frost','ignite','silence','exchange'].includes(kind)?'spell':'buff',
   kind,from:{id:from.id,k:from.k,x:from.x,y:from.y,team:from.team},
   to:{id:target.id,k:target.k,x:target.x,y:target.y,team:target.team},amount:kind==='heal'?3:1,blocked:0,lethal:false});
 }
 window.AetherScene?.sync?.(s,0,{unit:null,card:-1,tributes:[]});
 status('14 signature effects queued on real battlefield renderer');
 $('qa-report').textContent='Effects: '+kinds.join(', ')+'\nErrors: '+errors.length;
 window.__qaFXKinds=kinds;
}

panel.addEventListener('click',e=>{
 const b=e.target.closest('[data-qa]');if(!b)return;
 const mode=b.dataset.qa;
 if(mode in groupLayouts)showUnits(mode);
 else if(mode==='cards')showCards();
 else if(mode==='report')assetReport();
 else if(mode==='combat')runCombatChecks();
 else if(mode==='aitest')runAITurnChecks();
 else if(mode==='spellfx')runSpellFXChecks();
});
document.body.classList.add('qa-page');
setTimeout(()=>{
 showUnits('new');
 assetReport().catch(e=>status('Report failed '+e.message));
},950);
})();