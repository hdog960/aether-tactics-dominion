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
panel.innerHTML='<h2>DOMINION · REAL BATTLE QA</h2><p id="qa-status">Starting battlefield...</p><div class="qa-buttons"><button data-qa="new">8 NEW UNITS</button><button data-qa="old">CLASSIC UNITS</button><button data-qa="opponents">RED + BLUE</button><button data-qa="cards">SPELL CARDS</button><button data-qa="report">ASSET STATUS</button><button data-qa="combat">COMBAT ENGINE TEST</button><button data-qa="aitest">AI · 12 TURNS</button><button data-qa="spellfx">SPELL FX</button><button data-qa="motion">ANIMATION AUDIT</button><button data-qa="stress">AI STRESS</button><button data-qa="frames">264 FRAME AUDIT</button><button data-qa="classic">CLASSIC 132 FRAMES</button><button data-qa="campaign">15 ENCOUNTERS</button><button data-qa="boss">7 BOSS PHASES</button><button data-qa="story">30 STORY CHOICES</button><button data-qa="outcomes">45 RESULTS QA</button><button data-qa="winScene">VICTORY SCENE</button><button data-qa="lossScene">DEFEAT SCENE</button><button data-qa="balance">60 TACTICAL BATTLES</button><button data-qa="probe">SPELL & MYTHIC QA</button><button data-qa="warnings">22 EARLY WARNINGS</button><button data-qa="weatherPreview">WEATHER WARNING</button><button data-qa="bossPreview">BOSS WARNING</button></div><pre id="qa-report"></pre>';
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

function auditMotion(){
 const keysToTest=['v','b','r','s','f','g','t','l','c','j','p','k','d','o','y','z','A','B'];
 const results=keysToTest.map(k=>{
  const idle=window.AetherScene?.motionSample?.(k,false,0);
  const walking=window.AetherScene?.motionSample?.(k,true,Math.PI/2);
  const valid=!!idle&&!!walking&&
   [idle.sx,idle.sy,idle.lean,idle.lift,walking.sx,walking.sy,walking.lean,walking.lift]
    .every(Number.isFinite)&&
   walking.sx>=.8&&walking.sx<=1.18&&walking.sy>=.82&&walking.sy<=1.13&&
   Math.abs(walking.lean)<=.15;
  return{k,pass:valid,role:walking?.role||'MISSING'};
 });
 const roles=new Set(results.map(r=>r.role));
 const good=results.filter(r=>r.pass).length;
 window.__qaMotionResults=results;
 status('ANIMATION '+good+'/'+results.length+' valid · '+roles.size+' movement profiles');
 $('qa-report').textContent=results.map(r=>(r.pass?'✓ ':'✗ ')+r.k+' '+r.role).join('\n');
}
function stressAI(){
 const results=[];let turnCount=0,endings=0,damageTurns=0,summonTurns=0;
 N.showTab('battle');
 for(let match=0;match<12;match++){
  G.startQuickMatch();
  for(let step=0;step<12;step++){
   const before=G.get();if(before.phase!=='playing'){endings++;break}
   if(before.turn!==0){results.push({match,step,pass:false,reason:'human turn inaccessible'});break}
   const hp0=before.hp[0],count0=before.units.filter(u=>u.team===1).length,round=before.round;
   $('end').click();
   const s=G.get(),ids=new Set(s.units.map(u=>u.x+','+u.y));
   const valid=s.units.every(u=>u.hp>0&&u.max>0&&u.x>=0&&u.x<7&&u.y>=0&&u.y<8&&
      u.shield>=0&&u.shield<=5)&&
    ids.size===s.units.length&&s.energy.every(e=>e>=0&&e<=10)&&s.hp.every(h=>h>=0&&h<=24)&&
    s.units.filter(u=>u.team===0).length<=8&&s.units.filter(u=>u.team===1).length<=8&&
    (s.phase!=='playing'||s.turn===0&&s.round===round+1);
   turnCount++;if(s.hp[0]<hp0)damageTurns++;
   if(s.units.filter(u=>u.team===1).length>count0)summonTurns++;
   if(!valid){results.push({match,step,pass:false,reason:'illegal board/resources or turn'});break}
  }
  if(results.some(x=>!x.pass))break;
 }
 const ok=!results.some(x=>!x.pass);
 window.__qaStressResult={pass:ok,matches:12,turns:turnCount,damageTurns,summonTurns,endings,failures:results};
 status('AI STRESS '+(ok?'PASS':'FAIL')+' · '+turnCount+' simulated turns / 12 games');
 $('qa-report').textContent='Damage turns '+damageTurns+'\nSummon turns '+summonTurns+
  '\nEarly finishes '+endings+'\nFailures '+results.length+
  (results.length?'\n'+results.map(x=>JSON.stringify(x)).join('\n'):'');
 G.startQuickMatch();N.showTab('battle');
}

async function auditFrames(){
 const info=window.AetherScene?.frameAtlasInfo?.();
 if(!info){status('FRAME AUDIT FAIL: scene API unavailable');return}
 const image=new Image();
 try{await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;
   image.src='./art/battlefield-frames-v432.webp?v=432'})}
 catch(e){status('FRAME AUDIT FAIL: sprite atlas missing');return}
 const canvas=document.createElement('canvas');canvas.width=96;canvas.height=120;
 const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.imageSmoothingEnabled=false;
 let cells=0,failed=[],nonempty=0,distinct=0;
 const names=['t','l','c','j','p','k','d','o','y','z','A','B'];
 for(let row=0;row<12;row++){
  const fingerprints=new Set();
  for(let frame=0;frame<22;frame++){
   ctx.clearRect(0,0,96,120);ctx.drawImage(image,frame*96,row*120,96,120,0,0,96,120);
   const pixels=ctx.getImageData(0,0,96,120).data;
   let solid=0,h=2166136261;
   for(let i=0;i<pixels.length;i+=16){
    if(pixels[i+3]>32)solid++;
    h=Math.imul(h^pixels[i],16777619);h=Math.imul(h^pixels[i+3],16777619);
   }
   cells++;if(solid>10)nonempty++;else failed.push(names[row]+':'+frame+' blank');
   fingerprints.add(h>>>0);
  }
  distinct+=fingerprints.size;
  if(fingerprints.size<16)failed.push(names[row]+' only '+fingerprints.size+' distinct frames');
 }
 const ok=info.ready&&image.naturalWidth===2112&&image.naturalHeight===1440&&
  cells===264&&nonempty===264&&distinct>=200&&!failed.length;
 window.__qaFrameReport={pass:ok,cells,nonempty,distinct,failures:failed,scene:info};
 status('FRAME ATLAS '+(ok?'PASS':'FAIL')+' · '+nonempty+'/264 visible · '+distinct+' distinct');
 $('qa-report').textContent='Dimensions '+image.naturalWidth+' × '+image.naturalHeight+
 '\nAnimated creatures '+names.length+'\nNonempty frames '+nonempty+
 '\nUnique frame fingerprints '+distinct+'\nErrors: '+failed.join('; ');
}

// v4.3.3: audit newly prerendered bitmap frames, not just the existence
// of an input PNG. Covers every classic creature and all five pose groups.
function auditClassicFrames(){
 const scene=window.AetherScene;
 const info=scene?.classicFrameInfo?.();
 const image=scene?.classicFrameCanvas?.();
 if(!image||!info?.ready){
  status('CLASSIC FRAME AUDIT: art still loading');
  $('qa-report').textContent='Original PNG or raster frame generation has not completed.';
  window.__qaClassicResult={pass:false,pending:true};
  return;
 }
 const ctx=image.getContext('2d',{willReadFrequently:true});
 const roster=['v','r','b','s','f','g'],failures=[];
 let visible=0,distinct=0;
 for(let row=0;row<6;row++){
  const fingerprints=new Set();
  for(let frame=0;frame<22;frame++){
   const pixels=ctx.getImageData(frame*128,row*148,128,148).data;
   let solid=0,h=2166136261;
   for(let i=0;i<pixels.length;i+=16){
    if(pixels[i+3]>32)solid++;
    h=Math.imul(h^pixels[i],16777619);
    h=Math.imul(h^pixels[i+3],16777619);
   }
   if(solid>10)visible++;else failures.push(roster[row]+':'+frame+' empty');
   fingerprints.add(h>>>0);
  }
  distinct+=fingerprints.size;
  if(fingerprints.size<20)failures.push(roster[row]+' '+fingerprints.size+' distinct poses');
 }
 const pass=visible===132&&distinct>=126&&failures.length===0&&
  image.width===2816&&image.height===888&&info.totalFrames===132;
 window.__qaClassicResult={pass,visible,distinct,failures,info};
 status('CLASSIC '+(pass?'PASS':'FAIL')+' · '+visible+'/132 visible · '+distinct+' distinct');
 $('qa-report').textContent='Source: original painted PNG\\nAtlas '+image.width+'×'+image.height+
  '\\nSix classic creatures: '+roster.join(', ')+
  '\\nNonempty: '+visible+'/132\\nDistinct: '+distinct+
  '\\nIssues: '+(failures.join(', ')||'none');
}

// Save-isolated authoring QA — exercises every mission's own real event
// runner without unlocking anything in the production player profile.
function auditCampaign(){
 const missions=G.missions?.all||[],results=[];
 const kinds=new Set(),rounds=new Set();
 for(const m of missions){
  const e=m.encounter;
  if(!e){results.push({id:m.id,pass:false,reason:'missing encounter rule'});continue}
  kinds.add(e.type);
  const r=G.qaEncounter?.(m.id,e.first);
  results.push({id:m.id,pass:!!r?.pass,kind:e.type,round:r?.round,
   reason:r?.pass?r.note||'event fired':r?.reason||'event failed'});
  if(r?.round)rounds.add(r.round);
 }
 G.startQuickMatch();N.showTab('battle');
 const count=results.filter(x=>x.pass).length,pass=count===15&&results.length===15&&kinds.size>=5;
 window.__qaCampaignResult={pass,count,total:results.length,kinds:[...kinds],
  distinctTriggerRounds:rounds.size,results};
 status('CAMPAIGN '+(pass?'PASS':'FAIL')+' · '+count+'/'+results.length+
  ' missions · '+kinds.size+' tactical rules');
 $('qa-report').textContent=results.map(x=>(x.pass?'✓ ':'✗ ')+x.id+
  ' '+(x.kind||'none')+' '+x.reason).join('\\n');
}

function auditBossPhases(){
 const ids=['v3','f3','e3','r3','t1','t2','t3'];
 const results=ids.map(id=>G.qaBoss?.(id)||
   {id,pass:false,reason:'Boss QA hook unavailable'});
 const passed=results.filter(r=>r.pass).length;
 window.__qaBossResults=results;
 status('BOSS PHASE AUDIT '+(passed===7?'PASS':'FAIL')+' · '+passed+'/7 unique champions');
 $('qa-report').textContent=results.map(r=>(r.pass?'✓ ':'✗ ')+r.id+' · '+(r.kit||r.reason)+
  ' · phase1='+r.phaseOne+' phase2='+r.phaseTwo+
  ' legal='+r.legal+(r.id==='t2'?' mirror='+r.mirrorCheck:'')).join('\\n')+
  '\\nErrors '+errors.length;
 G.startQuickMatch();N.showTab('battle');
}

function auditStoryPlans(){
 const missions=G.missions?.all||[],results=[];
 for(const m of missions){
  const choices=m.storyScene?.choices||[];
  if(choices.length!==2){
   results.push({id:m.id,pass:false,reason:'expected two unique story choices'});continue;
  }
  for(const choice of choices){
   const r=G.qaPlan?.(m.id,choice.kind);
   results.push(r||{pass:false,id:m.id,kind:choice.kind,reason:'missing QA plan runner'});
  }
 }
 const passes=results.filter(r=>r.pass).length;
 window.__qaStoryPlans={pass:passes===30&&results.length===30,
  passed:passes,total:results.length,results};
 G.startQuickMatch();N.showTab('battle');
 status('STORY PLANS '+(passes===30?'PASS':'FAIL')+' · '+passes+'/'+results.length+' choices');
 $('qa-report').textContent=results.map(r=>(r.pass?'✓ ':'✗ ')+r.id+' '+r.kind+
  ' energy '+r.openingEnergy+' cores '+r.coreHealth+
  ' hand '+r.handSize+(r.reason?' '+r.reason:'')).join('\\n');
}

function auditAllResults(){
 const list=G.missions?.all||[],results=[];
 for(const m of list){
  // Verify a loss cannot unlock a level. Then the first win must clear it,
  // while replay wins must not pay the unique story-clear bonus again.
  for(const variant of ['loss','win','replay']){
   const r=G.qaMissionOutcome?.(m.id,variant==='replay'?'win':variant);
   results.push({...r,variant});
  }
 }
 const passed=results.filter(r=>r.pass).length;
 window.__qaOutcomes={passed,total:results.length,pass:passed===45,results};
 status('MISSION RESULTS '+passed+'/'+results.length+' '+(passed===45?'PASS':'FAIL'));
 $('qa-report').textContent=results.map(r=>(r.pass?'✓ ':'✗ ')+r.id+' '+
  r.variant+' '+(r.objective||'unknown')+' first='+r.storyClear+
  ' rewardOnce='+r.duplicateSafe+' stars='+r.star).join('\\n');
 G.startQuickMatch();N.showTab('battle');
}

function auditTacticalProbe(){
 const r=G.qaTacticalProbe?.()||{pass:false,findings:[]};
 window.__qaTacticalProbe=r;
 status('SPELL + MYTHIC '+(r.pass?'PASS':'FAIL')+' · '+
  r.findings.filter(x=>x.pass).length+'/'+r.findings.length);
 $('qa-report').textContent=r.findings.map(x=>
  (x.pass?'✓ ':'✗ ')+x.name).join('\\n');
 N.showTab('battle');
}
function auditBattleBalance(){
 status('BALANCE RUN · playing 60 legal-action games...');
 const started=performance.now();
 // Defer work to allow the test button's status to paint in the browser.
 setTimeout(()=>{
  let result;
  try{result=G.qaBalance?.(2)}catch(e){result={pass:false,errors:[String(e)]}}
  if(!result){status('BALANCE AUDIT NOT AVAILABLE');return}
  window.__qaBattleBalance=result;
  const fail=result.errors?.length||0;
  const acts=result.actions||{};
  status('TACTICAL '+(result.pass?'PASS':'NEEDS REVIEW')+' · '+result.games+
   ' games · '+result.wins+' wins · '+fail+' invalid states · '+
   (acts.spells||0)+' spells · '+(acts.mythicSummons||0)+' mythics');
  const lines=(result.grouped||[]).map(m=>m.id+' '+m.objective+' · '+
   m.plans.map(p=>p.kind+': '+p.wins+'/'+p.games+
   ' wins, '+p.averageRounds+' rd, '+p.averageCore+' Core').join(' vs '));
  $('qa-report').textContent='AGENT: '+(result.agent||'unknown')+
   '\\nACTIONS: '+JSON.stringify(result.actions||{})+
   '\\nElapsed '+Math.round(performance.now()-started)+' ms'+
   '\\n'+lines.join('\\n')+
   (fail?'\\nERRORS: '+result.errors.join('; '):'');
  N.showTab('battle');
 },35);
}
function auditWarnings(){
 const result=G.qaWarnings?.()||{pass:false,results:[],checked:0,noQuick:false};
 window.__qaWarnings=result;
 status('EARLY WARNINGS '+(result.pass?'PASS':'FAIL')+' · '+
  result.checked+'/22 · no quick-battle leaks '+result.noQuick);
 $('qa-report').textContent=(result.results||[]).map(x=>
  (x.pass?'✓ ':'✗ ')+x.id+' '+x.kind+' '+(x.title||'MISSING')).join('\\n');
 N.showTab('battle');
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
 else if(mode==='motion')auditMotion();
 else if(mode==='stress')stressAI();
 else if(mode==='frames')auditFrames();
 else if(mode==='classic')auditClassicFrames();
 else if(mode==='campaign')auditCampaign();
 else if(mode==='boss')auditBossPhases();
 else if(mode==='story')auditStoryPlans();
 else if(mode==='outcomes')auditAllResults();
 else if(mode==='balance')auditBattleBalance();
 else if(mode==='probe')auditTacticalProbe();
 else if(mode==='warnings')auditWarnings();
 else if(mode==='weatherPreview'||mode==='bossPreview'){
  const boss=mode==='bossPreview';
  const r=G.qaPreviewWarning?.(boss?'t2':'f1',boss?'boss':'event');
  window.__qaWarningPreview=r;
  N.showTab('battle');
  status('WARNING PREVIEW '+(r?.pass?'PASS':'FAIL')+' · '+(r?.warning?.title||'MISSING'));
  $('qa-report').textContent=(r?.warning?.text||'No warning returned');
 }
 else if(mode==='winScene'||mode==='lossScene'){
  const result=G.qaPreviewResult?.('v1',mode==='lossScene');
  window.__qaEpiloguePreview=result;
  status(result?.pass?'EPILOGUE VISIBLE · '+(mode==='winScene'?'VICTORY':'DEFEAT'):'EPILOGUE PREVIEW FAILED');
  $('qa-report').textContent=JSON.stringify({pass:result?.pass,mission:result?.id,
   firstClear:result?.result?.storyClear,defeat:result?.defeat},null,2);
 }
});
document.body.classList.add('qa-page');
setTimeout(()=>{
 showUnits('new');
 assetReport().catch(e=>status('Report failed '+e.message));
},950);
})();