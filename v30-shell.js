/* v3.1 — commander hall, repaired map navigation and duel front door.
   State remains inside the authoritative AetherGame engine. */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const game=$('game'),G=window.AetherGame;
if(!game||!G)return;
const pages=['home','battle','campaign','cards','forge','duel'];
let active='home',everLaunched=false;
function closeNested(){
 if(!$('deck-builder').classList.contains('hidden'))$('deck-cancel').click();
 if(!$('rules-sheet').classList.contains('hidden'))$('rules-close').click();
 if(!$('lobby').classList.contains('hidden'))$('close-lobby').click();
}
function showTab(page,opts={}){
 if(!pages.includes(page))return;
 closeNested();
 active=page;game.dataset.tab=page;
 // v3.0 regression: map and duel carried the global .hidden class forever.
 // Explicitly remove it on entry, then hide the other destination screens.
 for(const [id,tab] of [['home-screen','home'],['campaign-screen','campaign'],['duel-screen','duel']]){
  $(id).classList.toggle('hidden',page!==tab);
 }
 $('bottom-tabs').querySelectorAll('button[data-page]').forEach(b=>{
  const yes=b.dataset.page===(page==='battle'?'home':page);b.classList.toggle('selected',yes);
  if(yes)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');
 });
 if(page==='cards'){
  if(!opts.preserveDetail){$('card-guide').click();$('codex-back')?.click();$('codex-tabs').querySelector('button[data-tab="deck"]')?.click()}
 }else if(!$('codex').classList.contains('hidden'))$('codex-close').click();
 if(page==='forge')$('profile-open').click();
 else if(!$('player-profile').classList.contains('hidden'))$('profile-close').click();
 if(page==='campaign')renderCampaign();
 if(page==='duel')renderDuel();
 if(page==='home')renderHome();
}
window.DominionNav={showTab,renderCampaign:()=>renderCampaign(),active:()=>active};
$('bottom-tabs').addEventListener('click',e=>{
 const b=e.target.closest('button[data-page]');if(b)showTab(b.dataset.page);
});
function savedBattle(){
 try{
  const s=JSON.parse(localStorage.getItem('aether-dominion-v04')||'null');
  return s?.version===4&&s.mode==='ai'&&Array.isArray(s.units)?s:null;
 }catch(e){return null}
}
function renderHome(){
 const info=G.campaign?.(),p=G.profile?.(),s=G.get(),saved=savedBattle();
 if(info){
  $('home-progress').textContent=info.storyDone+' / '+info.storyTotal+' MISSIONS';
  const next=info.missions.find(m=>!info.completed.includes(m.id));
  $('home-next-story').textContent=next?'NEXT: '+next.name.toUpperCase():info.trialsDone===info.trials.length?'ALL CROWN TRIALS CLEARED':'THE CROWN TRIALS AWAIT';
 }
 if(p)$('home-player').textContent='COMMANDER · LV '+p.level+' · '+p.gold+' GOLD';
 const ongoing=s?.phase==='playing'&&(s.mode==='online'||everLaunched||!!saved);
 const waiting=s?.mode==='online'&&s.phase==='waiting';
 const continueButton=$('home-continue');
 continueButton.classList.toggle('hidden',!ongoing&&!waiting);
 if(ongoing||waiting){
  const mission=G.missions?.all?.find(m=>m.id===s.missionId);
  $('home-current').textContent=s.mode==='online'?(waiting?'Waiting for a friend to connect':'Private duel · Round '+s.round):
   mission?mission.name+' · Round '+s.round:'Solo skirmish · Round '+s.round;
 }
}
$('home-campaign').addEventListener('click',()=>showTab('campaign'));
$('home-cards').addEventListener('click',()=>showTab('cards'));
$('home-forge').addEventListener('click',()=>showTab('forge'));
$('home-duel').addEventListener('click',()=>showTab('duel'));
$('home-continue').addEventListener('click',()=>{
 const s=G.get();
 if(s?.phase==='playing'||s?.mode==='online'&&s.phase==='waiting')showTab('battle');
});
$('home-quick').addEventListener('click',()=>{
 const s=G.get(),saved=savedBattle();
 const inProgress=s?.mode==='online'||s?.phase==='playing'&&(everLaunched||!!saved);
 if(inProgress&&!confirm('Start a new quick battle? This replaces your current match. Campaign progress and your card collection will remain.'))return;
 G.startQuickMatch();everLaunched=true;showTab('battle');
});
$('battle-home').addEventListener('click',()=>showTab('home'));
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
 if(S?.mode==='online'||S?.phase==='playing'&&S.round>1){
  if(!window.confirm('Starting this mission replaces your current solo battle. Your player levels and completed missions will be kept. Continue?'))return;
 }
 if(G.startMission(id)){everLaunched=true;showTab('battle')}
}
$('campaign-regions').addEventListener('click',onMission);
$('trial-list').addEventListener('click',onMission);
function renderDuel(){
 const s=G.get();
 $('duel-connection').textContent=s?.mode==='online'?
  s.phase==='waiting'?'Waiting for a friend to connect and send their deck.':
  s.phase==='playing'?'Duel match active. Return to the battle to play.':
  'Duel ended. Open the chamber to start another.':
  'No room connected. Experimental peer-to-peer duels require two devices.';
 $('duel-launch').textContent=s?.mode==='online'&&s.phase==='playing'?'RETURN TO ACTIVE DUEL':'OPEN DUEL CHAMBER';
}
$('duel-launch').addEventListener('click',()=>{
 const s=G.get();
 if(s?.mode!=='online'){
  if((s?.missionId||s?.phase==='playing'&&s.round>1)&&!confirm('Your current solo battle is saved. Open private duels?'))return;
  $('mode-online').click();
 }else if(s.phase==='waiting')$('mode-online').click();
 showTab('battle');
 if(s?.mode!=='online'||s.phase==='waiting')$('lobby').classList.remove('hidden');
});
$('duel-return').addEventListener('click',()=>showTab('home'));
$('duel-solo').addEventListener('click',()=>{if(G.get()?.mode==='online')$('mode-ai').click();showTab('battle')});
// Shortcut actions open their dedicated tabs, even when triggered from Battle.
$('card-guide').addEventListener('click',()=>{if(active!=='cards')showTab('cards',{preserveDetail:true})});
$('hand').addEventListener('click',e=>{
 if(e.target.closest('button[data-card-info]')&&active!=='cards')showTab('cards',{preserveDetail:true});
});
$('next-mission').addEventListener('click',()=>showTab('campaign'));
$('profile-open').addEventListener('click',()=>{if(active!=='forge')showTab('forge')});
$('codex-profile').addEventListener('click',()=>{if(active!=='forge')showTab('forge')});
$('result-rewards').addEventListener('click',()=>{if(active!=='forge')showTab('forge')});
// Mobile layout retains one centralized way back; never strand the user behind a panel.
$('profile-done').addEventListener('click',()=>{if(active==='forge')showTab('home')});
$('codex-close').addEventListener('click',()=>{if(active==='cards')showTab('home')});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&active!=='home'&&$('deck-builder').classList.contains('hidden')){
  showTab('home');
 }
});
renderCampaign();
renderHome();
})();