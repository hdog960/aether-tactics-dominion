/* v3.0 — navigation, campaign map and duel front door.
   State remains inside the authoritative AetherGame engine. */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const game=$('game'),G=window.AetherGame;
if(!game||!G)return;
const pages=['battle','campaign','cards','forge','duel'];
let active='battle';
function closeNested(){
 if(!$('deck-builder').classList.contains('hidden'))$('deck-cancel').click();
 if(!$('rules-sheet').classList.contains('hidden'))$('rules-close').click();
 if(!$('lobby').classList.contains('hidden'))$('close-lobby').click();
}
function showTab(page){
 if(!pages.includes(page))return;
 closeNested();
 active=page;game.dataset.tab=page;
 $('bottom-tabs').querySelectorAll('button[data-page]').forEach(b=>{
  const yes=b.dataset.page===page;b.classList.toggle('selected',yes);
  if(yes)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');
 });
 if(page==='cards'){
  $('card-guide').click();
  $('codex-back')?.click();
 }else if(!$('codex').classList.contains('hidden'))$('codex-close').click();
 if(page==='forge')$('profile-open').click();
 else if(!$('player-profile').classList.contains('hidden'))$('profile-close').click();
 if(page==='campaign')renderCampaign();
 if(page==='duel')renderDuel();
}
window.DominionNav={showTab,renderCampaign:()=>renderCampaign(),active:()=>active};
$('bottom-tabs').addEventListener('click',e=>{
 const b=e.target.closest('button[data-page]');if(b)showTab(b.dataset.page);
});
function renderCampaign(){
 const info=G.campaign?.();if(!info)return;
 const complete=new Set(info.completed),available=new Set(info.available);
 $('campaign-count').textContent=info.storyDone+' / '+info.storyTotal+' MISSIONS';
 $('campaign-stars').textContent='✦ '+info.sigils+' SIGILS';
 const S=G.get();
 $('campaign-regions').innerHTML=info.regions.map((r,i)=>{
  const entries=info.missions.filter(m=>m.region===r.id);
  const done=entries.filter(m=>complete.has(m.id)).length;
  return '<section class="campaign-region">'+
   '<header class="region-banner" style="--region-start:'+r.color[0]+';--region-end:'+r.color[1]+'">'+
   '<div><span>CHAPTER '+(i+1)+' · '+r.subtitle.toUpperCase()+'</span><h3>'+r.icon+' '+r.title+'</h3></div>'+
   '<em>'+done+' / '+entries.length+' COMPLETE</em></header>'+
   '<div class="campaign-nodes">'+entries.map((m,idx)=>missionHtml(m,idx,complete,available,S)).join('')+'</div></section>';
 }).join('');
 const trialOpen=info.storyDone===info.storyTotal;
 $('trial-list').innerHTML=info.trials.map((m,i)=>{
  const ok=available.has(m.id),done=complete.has(m.id);
  return '<button type="button" class="trial-node'+(done?' done':'')+'" data-mission="'+m.id+'"'+(!ok?' disabled':'')+'>'+
   '<span>♜ '+m.name+'</span><small>'+(done?'✦ CLEARED':!trialOpen?'COMPLETE CAMPAIGN':ok?'CHALLENGE':'LOCKED')+'</small></button>';
 }).join('');
}
function missionHtml(m,idx,complete,available,S){
 const done=complete.has(m.id),unlocked=available.has(m.id),isCurrent=S?.missionId===m.id&&S.phase==='playing';
 const type={assault:'⚔ BREAK CORE',hunt:'♜ DEFEAT CHAMPION',capture:'✦ HOLD SPRINGS',defend:'◇ SURVIVE SIEGE'}[m.objective]||'BATTLE';
 return '<button type="button" class="mission-node'+(done?' done':'')+(isCurrent?' current':'')+'" data-mission="'+m.id+'"'+(!unlocked?' disabled':'')+'>'+
  '<span class="mission-symbol">'+(done?'✓':unlocked?'✦':'🔒')+'</span>'+
  '<span class="mission-info"><strong>'+(idx+1)+'. '+m.name+'</strong><small>'+type+' · '+m.story+'</small></span>'+
  '<span class="mission-status">'+(isCurrent?'CONTINUE':done?'✦ '+(G.campaign().stars[m.id]||1)+'/3':unlocked?'PLAY':'LOCKED')+'</span></button>';
}
function onMission(e){
 const button=e.target.closest('button[data-mission]');if(!button||button.disabled)return;
 const id=button.dataset.mission,S=G.get();
 if(S?.missionId===id&&S.phase==='playing'){showTab('battle');return}
 if(S?.phase==='playing'&&S.round>1){
  if(!window.confirm('Starting this mission replaces your current solo battle. Your player levels and completed missions will be kept. Continue?'))return;
 }
 if(G.startMission(id))showTab('battle');
}
$('campaign-regions').addEventListener('click',onMission);
$('trial-list').addEventListener('click',onMission);
function renderDuel(){
 const s=G.get();
 $('duel-connection').textContent=s?.mode==='online'?
  s.phase==='waiting'?'Waiting for a friend to connect and send their deck.':
  s.phase==='playing'?'Duel match active. Use the Battle tab to play.':
  'Duel ended. Open the chamber to start another.':
  'No room connected. Experimental peer-to-peer duels require two devices.';
 $('duel-launch').textContent=s?.mode==='online'&&s.phase==='playing'?'RETURN TO ACTIVE DUEL':'OPEN DUEL CHAMBER';
}
$('duel-launch').addEventListener('click',()=>{
 const s=G.get();
 if(s?.mode!=='online'){
  if(s?.phase==='playing'&&s.round>1&&!confirm('Your current solo battle is saved. Open private duels?'))return;
  $('mode-online').click();
 }else if(s.phase==='waiting')$('mode-online').click();
 showTab('battle');
 if(s?.mode!=='online'||s.phase==='waiting')$('lobby').classList.remove('hidden');
});
$('duel-return').addEventListener('click',()=>showTab('battle'));
// Shortcut actions open their dedicated tabs, even when triggered from Battle.
$('card-guide').addEventListener('click',()=>{if(active!=='cards')showTab('cards')});
$('profile-open').addEventListener('click',()=>{if(active!=='forge')showTab('forge')});
$('codex-profile').addEventListener('click',()=>{if(active!=='forge')showTab('forge')});
$('result-rewards').addEventListener('click',()=>{if(active!=='forge')showTab('forge')});
// Mobile layout retains one centralized way back; never strand the user behind a panel.
$('profile-done').addEventListener('click',()=>{if(active==='forge')showTab('battle')});
$('codex-close').addEventListener('click',()=>{if(active==='cards')showTab('battle')});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&active!=='battle'&&$('deck-builder').classList.contains('hidden')){
  showTab('battle');
 }
});
renderCampaign();
})();