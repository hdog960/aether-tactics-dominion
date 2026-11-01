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
panel.innerHTML='<h2>DOMINION · REAL BATTLE QA</h2><p id="qa-status">Starting battlefield...</p><div class="qa-buttons"><button data-qa="new">8 NEW UNITS</button><button data-qa="old">CLASSIC UNITS</button><button data-qa="opponents">RED + BLUE</button><button data-qa="cards">SPELL CARDS</button><button data-qa="report">ASSET STATUS</button></div><pre id="qa-report"></pre>';
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
  ['spell card atlas','./art/cards-spells-v37.webp?v=37',1280,96],
  ['classic','./art/units-painted-v35.png',256,88]
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
panel.addEventListener('click',e=>{
 const b=e.target.closest('[data-qa]');if(!b)return;
 const mode=b.dataset.qa;
 if(mode in groupLayouts)showUnits(mode);
 else if(mode==='cards')showCards();
 else if(mode==='report')assetReport();
});
document.body.classList.add('qa-page');
setTimeout(()=>{
 showUnits('new');
 assetReport().catch(e=>status('Report failed '+e.message));
},950);
})();