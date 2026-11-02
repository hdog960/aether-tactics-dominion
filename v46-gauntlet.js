/* Dominion 4.6.0 — visible Rift Gauntlet and mastery. Gameplay lives in real engine. */
(()=>{'use strict';
 const G=window.AetherGame,N=window.DominionNav;
 if(!G?.gauntletStatus||!G?.startGauntlet||!N?.showTab)return;
 const $=id=>document.getElementById(id),title=['Whispering Gate','Frostbound Passage','Crownfall Reckoning'];
 let last='',lastContracts='',masteryFilter='active',selectedPath='wayfinder',selectedFlux=false;
 function render(){
  const g=G.gauntletStatus(),current=g.current,match=G.get();
  let line=current?.status==='ready'?'STAGE '+current.stage+' CLEARED · NEXT '+(current.stage+1)+'/3 · CORE '+current.core+'/24':
   current?.status==='active'?'IN PROGRESS · STAGE '+current.stage+'/3 · CORE '+(current.liveCore??current.core)+'/24':
   current?.status==='cleared'?'FULL GAUNTLET CLEARED · '+g.clears+' RUNS':
   current?.status==='failed'?'RUN ENDED AT STAGE '+current.stage+' · RETRY':
   'THREE STAGES · '+g.bestStage+'/3 BEST';
  const chosen=current?.status==='active'||current?.status==='ready'?current.path:selectedPath;
  for(const path of g.paths||[]){
   const button=document.querySelector('[data-rift-path="'+path.id+'"]');
   if(button){
    button.setAttribute('aria-pressed',String(chosen===path.id));
    button.disabled=['active','ready'].includes(current?.status);
   }
   const cleared=$('rift-clear-'+path.id);
   if(cleared)cleared.textContent=path.clears+' clear'+(path.clears===1?'':'s');
  }
  const detail=$('rift-path-detail'),activePath=(g.paths||[]).find(p=>p.id===chosen);
  if(detail&&activePath)detail.textContent=activePath.description+
   (activePath.firstGold&&!g.pathFirstRewards[activePath.id]?
   ' · First clear: +'+activePath.firstGold+' gold':'');
  const active=['active','ready'].includes(current?.status);
  const showingFlux=active?current?.flux===true:selectedFlux;
  const toggle=$('v463-flux-toggle');
  if(toggle){toggle.disabled=active;toggle.setAttribute('aria-pressed',String(showingFlux))}
  const label=$('v463-flux-toggle-label');
  if(label)label.textContent=showingFlux?'ON':'OFF';
  const details=$('v463-flux-details');
  if(details)details.hidden=!showingFlux;
  const progress=$('v463-flux-progress');
  if(progress)progress.textContent=
   (g.fluxClears||0)+' Flux clear'+(g.fluxClears===1?'':'s')+' · '+
   (g.fluxFirstRewarded?'First-clear 60 gold claimed':'First full Flux clear: +60 gold');
  const forecast=$('v463-omen-forecast');
  if(forecast){
   const catalog=Object.fromEntries((g.omenCatalog||[]).map(v=>[v.id,v]));
   const picks=active&&showingFlux?(current.omens||[]).map(k=>catalog[k]):g.nextOmens||[];
   const markup=showingFlux?picks.filter(Boolean).map((omen,i)=>
    '<div class="v463-omen-row'+(active&&current.stage===i+1?' current':'')+'">'+
    '<span class="v463-omen-step">'+(i+1)+'</span><span><b>'+omen.name+
    '</b><small>'+omen.detail+'</small></span></div>').join(''):'';
   if(forecast.innerHTML!==markup)forecast.innerHTML=markup;
  }
  const stageForecast=$('v464-stage-forecast'),numbers=g.stageForecast?.[chosen];
  if(stageForecast&&numbers)stageForecast.textContent=
   'CORE START '+numbers.startCore+'/24 · RECOVER +'+numbers.heal+
   ' BETWEEN STAGES (MAX 24) · ENEMY CORES '+numbers.enemyCores.join(' → ');
  const best=$('v464-run-best');
  const record=(showingFlux?g.bestFluxCoreByPath:g.bestCoreByPath)?.[chosen];
  if(best)best.textContent=(g.attempts||0)+' ATTEMPTS · '+(g.clears||0)+
   ' CLEARS · '+(record>0?'BEST '+(showingFlux?'FLUX ':'')+
   ((g.paths||[]).find(p=>p.id===chosen)?.name||'RIFT').toUpperCase()+
   ' FINISH: '+record+'/24 CORE':
   'NO '+(showingFlux?'FLUX ':'')+'CLEAR ON THIS PATH YET');
  const history=$('v464-run-history');
  if(history){
   const paths={wayfinder:'WAYFINDER',stormbound:'STORMBOUND',ironbound:'IRONBOUND'};
   const results={cleared:'CLEARED',failed:'DEFEATED',abandoned:'ABANDONED'};
   const items=(g.chronicle||[]).slice(0,4).filter(Boolean).map(entry=>{
    const name=paths[entry.path]||paths.wayfinder;
    const result=results[entry.result]||'ABANDONED';
    const stage=Math.max(1,Math.min(3,Math.floor(Number(entry.stage)||1)));
    const core=Math.max(0,Math.min(24,Number(entry.core)||0));
    return '<li class="v464-history-entry"><strong>'+name+
     (entry.flux?' · FLUX':'')+'</strong><span>'+result+' · STAGE '+
     stage+'/3 · '+core+'/24 CORE</span></li>';
   });
   const markup=items.length?items.join(''):
    '<li class="v464-history-empty">Your next finished attempt will be recorded here.</li>';
   if(history.innerHTML!==markup)history.innerHTML=markup;
  }
  const status=$('home-gauntlet-status');
  if(status&&status.textContent!==line)status.textContent=line;
  const dots=document.querySelectorAll('#home-gauntlet .rift-progress i');
  dots.forEach((dot,i)=>dot.classList.toggle('complete',i<(current?.wins||0)));
  const action=$('again');
  if(action&&match?.gauntletRunId){
   const same=current?.id===match.gauntletRunId;
   if(same&&current?.status==='ready')action.textContent='CONTINUE · '+title[current.stage];
   else if(same&&current?.status==='cleared')action.textContent='BEGIN ANOTHER GAUNTLET';
   else if(same&&current?.status==='failed')action.textContent='RETRY RIFT GAUNTLET';
  }else if(action&&action.textContent!=='FIGHT AGAIN')action.textContent='FIGHT AGAIN';
  const masters=$('v46-masteries');
  const all=G.masteryStatus(),contracts=G.masteryContractsStatus();
  const list=masteryFilter==='gold'?all.filter(x=>x.rank===3):
   masteryFilter==='active'?all.filter(x=>x.uses>0):all;
  document.querySelectorAll('button[data-mastery-filter]').forEach(button=>
   button.setAttribute('aria-pressed',String(button.dataset.masteryFilter===masteryFilter)));
  const count=$('v462-mastery-count');
  if(count)count.textContent=list.length+' OF '+all.length+' CARDS · '+
   all.filter(x=>x.rank===3).length+' GOLD MASTERIES';
  if(masters){
   const markup=list.length?list.map(x=>{
    const next=x.next||30,ratio=Math.min(100,100*x.uses/next);
    const name=x.name.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
    return '<div class="rift-mastery-row"><div class="rift-mastery-top"><b>'+
     name+'</b><span>'+['UNRANKED','BRONZE','SILVER','GOLD'][x.rank]+'</span></div>'+
     '<div class="rift-mastery-rail"><i style="width:'+ratio+'%"></i></div>'+
     '<small>'+x.uses+' SOLO PARTICIPATIONS · '+(x.next?x.next+' TO NEXT RANK':'MAX RANK')+
     ' · '+x.claimed+'/3 REWARDS CLAIMED</small></div>';
   }).join(''):'<p class="v462-empty">No cards in this filter yet. Try ALL 60 to explore the roster.</p>';
   if(markup!==last){masters.innerHTML=markup;last=markup}
  }
  const box=$('v462-contracts');
  if(box){
   const markup=contracts.map(c=>{
    const fraction=Math.min(100,Math.round(100*c.progress/c.goal));
    return '<div class="v462-contract'+(c.claimed?' complete':'')+'">'+
     '<div class="v462-contract-top"><b>'+c.name+'</b><span>'+
     (c.claimed?'CLAIMED':'+'+c.gold+' GOLD')+'</span></div>'+
     '<div class="v462-contract-description">'+c.detail+'</div>'+
     '<div class="rift-mastery-rail"><i style="width:'+fraction+'%"></i></div>'+
     '<small>'+c.progress+'/'+c.goal+' · '+(c.claimed?'COMPLETE':'EARN ON VICTORY')+'</small>'+
     '</div>';
   }).join('');
   if(markup!==lastContracts){box.innerHTML=markup;lastContracts=markup}
  }
 }
 document.querySelectorAll('button[data-mastery-filter]').forEach(button=>button.addEventListener('click',()=>{
  masteryFilter=button.dataset.masteryFilter;render();
 }));
 $('v463-flux-toggle')?.addEventListener('click',()=>{
  if(['active','ready'].includes(G.gauntletStatus().current?.status))return;
  selectedFlux=!selectedFlux;render();
 });
 document.querySelectorAll('button[data-rift-path]').forEach(button=>button.addEventListener('click',()=>{
  const cur=G.gauntletStatus().current;
  if(['active','ready'].includes(cur?.status))return;
  selectedPath=button.dataset.riftPath;render();
 }));
 $('home-gauntlet')?.addEventListener('click',()=>{
  const g=G.gauntletStatus(),state=G.get(),cur=g.current;
  if(cur?.status==='active'&&state?.gauntletRunId===cur.id&&state.phase==='playing'){
   N.showTab('battle');return;
  }
  if(cur?.status==='ready'){
   if(G.continueGauntlet()){N.showTab('battle');render();return}
   if(!confirm('Your previous Gauntlet stage is no longer the saved match. Begin a new run from stage one?'))return;
  }
  if(state?.phase==='playing'&&!state.gauntletRunId&&
   !confirm('Begin a Rift Gauntlet? Your current solo battle will be replaced. Commander, deck, and campaign progression will remain saved.'))return;
  if(G.startGauntlet(selectedPath,selectedFlux)){N.showTab('battle');render()}
 });
 document.addEventListener('click',e=>{
  if(e.target.closest('[data-page],#battle-home,#home-forge,#home-continue,#home-campaign,#home-quick,#again,#result-rewards')){
   queueMicrotask(render);
  }
 },true);
 window.DominionRift={render};
 render();
})();