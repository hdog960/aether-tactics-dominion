/* Dominion 4.6.0 — visible Rift Gauntlet and mastery. Gameplay lives in real engine. */
(()=>{'use strict';
 const G=window.AetherGame,N=window.DominionNav;
 if(!G?.gauntletStatus||!G?.startGauntlet||!N?.showTab)return;
 const $=id=>document.getElementById(id),title=['Whispering Gate','Frostbound Passage','Crownfall Reckoning'];
 let last='';
 function render(){
  const g=G.gauntletStatus(),current=g.current,match=G.get();
  let line=current?.status==='ready'?'STAGE '+current.stage+' CLEARED · NEXT '+(current.stage+1)+'/3':
   current?.status==='active'?'IN PROGRESS · STAGE '+current.stage+'/3 · CORE '+current.core+'/24':
   current?.status==='cleared'?'FULL GAUNTLET CLEARED · '+g.clears+' RUNS':
   current?.status==='failed'?'RUN ENDED AT STAGE '+current.stage+' · RETRY':
   'THREE STAGES · '+g.bestStage+'/3 BEST';
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
  if(masters){
   const list=G.masteryStatus().filter(x=>x.uses>0).slice(0,6);
   const markup=list.length?list.map(x=>{
    const next=x.next||30,ratio=Math.min(100,100*x.uses/next);
    return '<div class="rift-mastery-row"><div class="rift-mastery-top"><b>'+
     x.name.replaceAll('&','&amp;').replaceAll('<','&lt;')+
     '</b><span>'+['UNRANKED','BRONZE','SILVER','GOLD'][x.rank]+'</span></div>'+
     '<div class="rift-mastery-rail"><i style="width:'+ratio+'%"></i></div>'+
     '<small>'+x.uses+' WIN/PLAY MARKS · '+(x.next?x.next+' TO NEXT TIER':'MAX RANK')+
     ' · '+x.claimed+'/3 REWARDS CLAIMED</small></div>';
   }).join(''):'<p>Play cards during solo matches to begin unlocking mastery rewards.</p>';
   if(markup!==last){masters.innerHTML=markup;last=markup}
  }
 }
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
  if(G.startGauntlet()){N.showTab('battle');render()}
 });
 document.addEventListener('click',e=>{
  if(e.target.closest('[data-page],#battle-home,#home-forge,#home-continue,#home-campaign,#home-quick,#again,#result-rewards')){
   queueMicrotask(render);
  }
 },true);
 window.DominionRift={render};
 render();
})();