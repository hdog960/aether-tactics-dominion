/* Aether Tactics: Dominion — v4.1 Riftfront Living Atlas.
   Renders the approved world art as a navigable 4-region mission map.
   Reads authoritative campaign state. Does not alter save schemas or game rules. */
(()=>{'use strict';
const G=window.AetherGame,N=window.DominionNav,C=window.AetherConquest;
const $=id=>document.getElementById(id);
if(!G||!N||!C||!$('campaign-screen'))return;
const screen=$('campaign-screen'),game=$('game');
const positions={
 v1:[389,210],v2:[680,187],v3:[792,152],
 f1:[381,481],f2:[506,480],f3:[771,483],
 e1:[375,748],e2:[504,716],e3:[786,709],
 r1:[346,1033],r2:[479,1012],r3:[787,1008]
};
const chapterProgress=[[149,157],[145,447],[149,691],[151,959]];
const types={assault:'⚔ Break the enemy core',capture:'✦ Hold both Aeth springs',hunt:'♜ Defeat the champion',defend:'◇ Survive the siege'};
const safe=s=>String(s).replace(/[&<>"']/g,t=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[t]));
let current=null,lastFocus=null,initialized=false;
const ui=document.createElement('div');ui.id='atlas-experience';ui.innerHTML=`
 <div class="atlas-toolbar"><span class="atlas-help">✦ Swipe to explore · Tap a mission crest</span><div class="atlas-tools">
 <button type="button" data-pan="-1" aria-label="Pan map left">◀</button><button type="button" data-fit aria-pressed="false">FIT MAP</button><button type="button" data-pan="1" aria-label="Pan map right">▶</button></div></div>
 <div id="atlas-viewport" class="atlas-viewport" tabindex="0" aria-label="Scrollable illustrated world campaign map">
  <div id="atlas-art" class="atlas-art"><img src="./art/riftfront-atlas-v41.webp?v=41" alt="The four illustrated lands of Riftfront Conquest, connected by an illuminated campaign path" draggable="false"><div class="atlas-dynamic" id="atlas-dynamic"></div></div>
 </div>
 <div class="atlas-key"><span><i class="ready"></i> AVAILABLE</span><span><i class="cleared"></i> CLEARED</span><span><i class="locked"></i> LOCKED</span></div>
 <p class="atlas-footnote">Rune Valley · Frostglass Reach · Ashen Crucible · Crownfall Sanctum. Complete missions in order to unlock the next stage.</p>`;
screen.insertBefore(ui,$('campaign-regions'));
const modal=document.createElement('div');modal.id='atlas-dialog';modal.className='atlas-dialog hidden';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-labelledby','atlas-dialog-title');modal.innerHTML=`
 <div class="atlas-dialog-panel"><button type="button" class="atlas-dialog-close" data-close aria-label="Close mission details">✕</button>
 <div class="atlas-dialog-mark" id="atlas-dialog-mark"></div><div class="atlas-dialog-kicker" id="atlas-dialog-kicker"></div>
 <h2 id="atlas-dialog-title"></h2><p class="atlas-dialog-story" id="atlas-dialog-story"></p>
 <div class="atlas-dialog-objective" id="atlas-dialog-objective"></div><div class="atlas-dialog-reward" id="atlas-dialog-reward"></div>
 <div class="atlas-dialog-actions"><button type="button" data-close>BACK TO ATLAS</button><button type="button" id="atlas-launch">START MISSION</button></div></div>`;
game.appendChild(modal);
function close(){modal.classList.add('hidden');current=null;lastFocus?.focus?.()}
modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('[data-close]'))close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.classList.contains('hidden')){e.stopImmediatePropagation();close()}} ,true);
function openMission(id,button){
 const info=G.campaign(),m=C.all.find(m=>m.id===id);if(!m)return;
 const available=info.available.includes(id),done=info.completed.includes(id);
 const active=G.get()?.missionId===id&&G.get()?.phase==='playing';
 current=id;lastFocus=button;
 const region=info.regions.find(r=>r.id===m.region);
 $('atlas-dialog-mark').textContent=m.trial?'♛':region?.icon||'✦';
 $('atlas-dialog-kicker').textContent=(m.trial?'CROWN TRIAL':safe(region?.title||'Riftfront').toUpperCase())+' · '+(done?'CLEARED':available?'READY TO PLAY':'LOCKED');
 $('atlas-dialog-title').textContent=m.name;
 $('atlas-dialog-story').textContent=m.story;
 $('atlas-dialog-objective').textContent=types[m.objective]||'⚔ Tactical encounter';
 $('atlas-dialog-reward').textContent='REWARDS  ✧ '+m.bonusXP+' XP   ◆ '+m.bonusGold+' GOLD'+(done?'   ★ '+(info.stars?.[id]||1)+'/3':'');
 const launch=$('atlas-launch');
 launch.disabled=!available;
 const s=G.get();const replacing=s&&(s.mode==='online'||s.phase==='playing'&&s.round>1)&&!active;
 launch.textContent=!available?'FINISH EARLIER MISSIONS':active?'CONTINUE BATTLE':done?'REPLAY MISSION':replacing?'REPLACE MATCH & PLAY':'START MISSION';
 $('atlas-dialog-story').insertAdjacentText('beforeend',replacing?' Starting will replace your current unfinished match; your collection and completed missions stay saved.':'');
 modal.classList.remove('hidden');launch.focus();
}
$('atlas-launch').addEventListener('click',()=>{
 if(!current)return;
 const info=G.campaign();if(!info.available.includes(current))return;
 const id=current,s=G.get();
 if(s?.missionId===id&&s.phase==='playing'){
  close();N.showTab('battle');return;
 }
 if(G.startMission(id)){
  close();N.showTab('battle');
 }
});
ui.addEventListener('click',e=>{
 const marker=e.target.closest('[data-atlas-mission]');if(marker){openMission(marker.dataset.atlasMission,marker);return}
 const pan=e.target.closest('[data-pan]');if(pan){$('atlas-viewport').scrollBy({left:parseInt(pan.dataset.pan,10)*160,behavior:'smooth'});return}
 if(e.target.closest('[data-fit]')){
  const next=ui.classList.toggle('atlas-fit');const btn=ui.querySelector('[data-fit]');btn.setAttribute('aria-pressed',next?'true':'false');btn.textContent=next?'ZOOM IN':'FIT MAP';
  if(next)$('atlas-viewport').scrollLeft=0;
 }
});
function render(){
 const info=G.campaign();if(!info)return;
 $('campaign-count').textContent=info.storyDone+' / '+info.storyTotal+' MISSIONS';
 $('campaign-stars').textContent='✦ '+info.sigils+' SIGILS';
 const complete=new Set(info.completed),available=new Set(info.available),state=G.get();
 const nodes=info.missions.map((m,i)=>{
  const pos=positions[m.id];if(!pos)return '';
  const done=complete.has(m.id),ready=available.has(m.id),active=state?.missionId===m.id&&state.phase==='playing';
  const status=done?'cleared':ready?'ready':'locked';
  const icon=done?'✓':active?'▶':ready?'✦':'🔒';
  return `<button type="button" class="atlas-marker ${status}${active?' in-progress':''}" data-atlas-mission="${safe(m.id)}" style="--x:${(pos[0]/941*100).toFixed(4)}%;--y:${(pos[1]/1204*100).toFixed(4)}%" aria-label="${safe(m.name)}. ${done?'Completed, ':ready?'Available, ':'Locked, '}${safe(types[m.objective]||'mission')}"><span>${icon}</span></button>`;
 }).join('');
 const chapters=info.regions.map((r,i)=>{
  const n=info.missions.filter(m=>m.region===r.id),count=n.filter(m=>complete.has(m.id)).length;
  const p=chapterProgress[i];return `<span class="atlas-progress" style="--x:${(p[0]/941*100).toFixed(4)}%;--y:${(p[1]/1204*100).toFixed(4)}%">✧ ${count} / ${n.length} COMPLETE</span>`;
 }).join('');
 $('atlas-dynamic').innerHTML=nodes+chapters;
 // Crown Trials remain live mission buttons and use the existing unlock rules.
 const trialSection=screen.querySelector('.trials-section');
 if(trialSection){
  trialSection.classList.add('atlas-trials');
  trialSection.querySelectorAll('[data-mission]').forEach(b=>{
   b.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();openMission(b.dataset.mission,b)},true);
  });
 }
}
window.DominionAtlas={render,openMission};
render();
})();