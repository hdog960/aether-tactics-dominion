/* Aether Tactics: Dominion 3.2 — presentation-only details.
   No match rules, storage keys, scores or rewards are modified here. */
(()=>{
'use strict';
const $=id=>document.getElementById(id);
const game=$('game');
if(!game||!window.AetherGame)return;
const badges=[
 {id:'firstVictory',icon:'⚔',name:'First Victory'},
 {id:'fieldTactician',icon:'✧',name:'Field Tactician'},
 {id:'pathfinder',icon:'🧭',name:'Pathfinder'},
 {id:'relicSeeker',icon:'◆',name:'Relic Seeker'},
 {id:'crownBreaker',icon:'♛',name:'Crown Breaker'},
 {id:'collector',icon:'▤',name:'Collector'}
];
function decorateAtlas(){
 const root=$('campaign-regions');
 if(!root)return;
 root.querySelectorAll('.campaign-region').forEach((region,index)=>{
  const r=window.AetherGame.missions?.regions?.[index];
  if(!r)return;
  region.dataset.region=r.id;
  const banner=region.querySelector('.region-banner');
  if(banner&&!banner.querySelector('.region-emblem')){
   const emblem=document.createElement('span');
   emblem.className='region-emblem';emblem.textContent=r.icon;emblem.setAttribute('aria-hidden','true');
   banner.appendChild(emblem);
  }
  region.querySelectorAll('.mission-node').forEach((node,num)=>{
   if(node.disabled){node.setAttribute('aria-description','Complete earlier missions to unlock this challenge.');}
   else if(!node.classList.contains('done'))node.classList.add('available-quest');
   const status=node.querySelector('.mission-status');
   if(status&&!node.disabled&&node.classList.contains('available-quest'))status.setAttribute('aria-label','Available mission, tap to play');
  });
 });
 const map=$('campaign-screen');
 const target=$('campaign-regions');
 if(map&&target&&!$('atlas-subline')){
  const hint=document.createElement('p');hint.id='atlas-subline';hint.className='atlas-subline';
  hint.textContent='✧ Follow the glowing trail. Clear chapters to unlock new realms and earn sigils.';
  map.insertBefore(hint,target);
 }
}
function renderTrophies(){
 const el=$('profile-achievements');if(!el)return;
 const awards=window.AetherGame.profile?.()?.achievements||{};
 let rack=el.querySelector('.trophy-rack');
 if(!rack){
  rack=document.createElement('div');rack.className='trophy-rack';
  el.appendChild(rack);
 }
 const signature=badges.map(b=>awards[b.id]?'1':'0').join('');
 if(rack.dataset.signature===signature)return;
 rack.dataset.signature=signature;
 rack.replaceChildren();
 for(const b of badges){
  const earned=!!awards[b.id];
  const coin=document.createElement('span');
  coin.className='trophy-token'+(earned?' earned':'');
  coin.textContent=b.icon;coin.title=b.name+(earned?' — earned':' — locked');
  coin.setAttribute('role','img');coin.setAttribute('aria-label',coin.title);
  rack.appendChild(coin);
 }
}
function moteField(parent,count){
 if(!parent||parent.querySelector('.ui-motes'))return;
 const field=document.createElement('span');field.className='ui-motes';field.setAttribute('aria-hidden','true');
 for(let i=0;i<count;i++){
  const mote=document.createElement('i');mote.className='ui-mote';
  mote.style.setProperty('--x',(8+i*23%86)+'%');
  mote.style.setProperty('--y',(12+i*19%74)+'%');
  mote.style.setProperty('--dur',(6+i%4*2)+'s');
  mote.style.setProperty('--delay',(-i*1.13)+'s');
  field.appendChild(mote);
 }
 parent.insertBefore(field,parent.firstChild);
}
function decorateHero(){
 moteField(document.querySelector('.hall-hero'),8);
 moteField(document.querySelector('#campaign-screen .page-top'),6);
 moteField(document.querySelector('#duel-screen .page-top'),8);
 moteField(document.querySelector('#codex .codex-header'),6);
 moteField(document.querySelector('#player-profile .profile-head'),6);
}
decorateAtlas();decorateHero();renderTrophies();
// The original map renderer replaces its children when progress changes.
const regionRoot=$('campaign-regions');
if(regionRoot)new MutationObserver(decorateAtlas).observe(regionRoot,{childList:true});
const milestone=$('profile-achievements');
if(milestone)new MutationObserver(renderTrophies).observe(milestone,{childList:true,subtree:false});
// Focus a freshly opened tab at the top rather than keeping a previous scroll position.
new MutationObserver(()=>{
 const tab=game.dataset.tab;
 if(tab==='forge')renderTrophies();
 if(tab==='campaign')decorateAtlas();
 const scroller=tab==='home'?$('home-screen'):tab==='campaign'?$('campaign-screen'):tab==='duel'?$('duel-screen'):null;
 if(scroller)scroller.scrollTop=0;
}).observe(game,{attributes:true,attributeFilter:['data-tab']});
})();
