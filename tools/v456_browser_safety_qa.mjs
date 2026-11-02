import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const qa=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const problems=[];
qa.on('pageerror',e=>problems.push('Isolated QA: '+e.message));
const assert=(v,msg)=>{if(!v)throw Error(msg)};
try{
 await qa.goto('http://127.0.0.1:8000/qa-v39.html',{waitUntil:'load',timeout:40000});
 await qa.waitForFunction(()=>window.AetherGame?.qaV456Creatures&&
  window.AetherScene?.v456ArtInfo&&window.AetherArt?.v456ArtStatus,null,{timeout:25000});
 const report=await qa.evaluate(()=>{
  const g=window.AetherGame,sp=g.qaV455Spells(),newUnits=g.qaV456Creatures(),
   previous=g.qaV454Creatures(),first=g.qaV453Creatures(),oldSpell=g.qaV45Spells(),
   vault=g.qaDeckVault(),boss=g.missions.all.filter(m=>m.bossKit).map(m=>g.qaBoss(m.id)),
   plans=g.missions.all.flatMap(m=>m.storyScene.choices.map(p=>g.qaPlan(m.id,p.kind)));
  const art=window.AetherScene.v456ArtInfo();
  return{newUnits:{pass:newUnits.pass,count:newUnits.checks.length},
    prior:{v455:sp.pass,v454:previous.pass,v453:first.pass,spells:oldSpell.pass,
      vault:vault.pass,bosses:boss.filter(x=>x.pass).length,
      bossTotal:boss.length,plans:plans.filter(x=>x.pass).length,
      plansTotal:plans.length},
    art:{ready:!!art.cards?.complete&&art.spriteReady&&art.framesReady,
      cards:art.cards?.complete||false,spriteReady:art.spriteReady,
      framesReady:art.framesReady,ids:art.characterIds}};
 });
 assert(report.newUnits.pass&&report.newUnits.count===19,'19 new mechanics failed');
 assert(report.prior.v455&&report.prior.v454&&report.prior.v453&&
  report.prior.spells&&report.prior.vault&&report.prior.bosses===report.prior.bossTotal&&
  report.prior.plans===report.prior.plansTotal,'Previous combat regression failed');
 // Until actual source images are committed, the art gate MUST remain closed.
 assert(!report.art.ready,'Unreviewed v4.5.6 artwork silently marked ready');

 // Stage four genuine canvas spell-feedback signatures without requiring
 // missing character paintings. This exercises the 2D effect renderer itself.
 const fx=await qa.evaluate(()=>{
  const state=window.AetherGame.get(),scene=window.AetherScene;
  const units=(state.units||[]).slice(0,4);
  state.fxSeq=0;state.fxEvents=[];
  scene.sync(state,0,{unit:null,card:-1,tributes:[]});
  const kinds=['bellkeeper','cinderwake','oathmoss','tidebreak'];
  state.fxEvents=kinds.map((kind,i)=>({
   id:101+i,type:'buff',kind,amount:i===2?2:1,
   to:{id:units[i]?.id||i+1,x:units[i]?.x??i+1,y:units[i]?.y??5,
       team:units[i]?.team??0}
  }));
  state.fxSeq=104;
  scene.sync(state,0,{unit:null,card:-1,tributes:[]});
  return{queued:scene.activeCombat(),kinds};
 });
 assert(fx.queued>=4,'Four unique staged visual events did not reach the battlefield');
 await qa.waitForTimeout(130);
 await qa.screenshot({path:'art/v456-four-ability-fx-390px.png',fullPage:false});

 const real=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 real.on('pageerror',e=>problems.push('Regular game: '+e.message));
 await real.goto('http://127.0.0.1:8000/index.html',{waitUntil:'load',timeout:40000});
 await real.waitForFunction(()=>window.AetherGame&&window.AetherArt?.v455ArtStatus?.()?.complete,null,{timeout:30000});
 await real.locator('button[data-page="cards"]').click();
 await real.locator('#codex-tabs button[data-tab="deck"]').click();
 const cards=await real.evaluate(()=>({
  count:Number(document.querySelector('#codex-deck-count')?.textContent),
  names:[...document.querySelectorAll('#codex-list button[data-inspect] strong')].map(x=>x.textContent),
  deck:window.AetherGame.deckInfo(),slots:window.AetherGame.loadouts().slots.length,
  art:window.AetherArt.v456ArtStatus().complete
 }));
 assert(cards.count===48&&cards.deck.cards===24&&cards.slots===3&&
  !cards.art&&
  !['Gloam Bellkeeper','Cinderjaw Prowler','Oathmoss Devourer','Tidebreak Herald']
   .some(name=>cards.names.includes(name)),
  'Public 48-card collection unexpectedly exposed unpainted v4.5.6 creatures');
 await real.screenshot({path:'art/v456-staged-public-safety-390px.png',fullPage:false});

 // Simulate the future 52-card flag ONLY inside a disposable test browser.
 // The original art is still missing, so this is an interaction/key-routing QA
 // and must never be interpreted as visual approval or a public release.
 const future=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 future.on('pageerror',e=>problems.push('52-card UI-only preview: '+e.message));
 await future.addInitScript(()=>{window.DOMINION_V456_ART_RELEASE=true});
 await future.goto('http://127.0.0.1:8000/index.html',{waitUntil:'load',timeout:40000});
 await future.waitForFunction(()=>window.AetherGame&&document.querySelector('button[data-page="cards"]'),
  null,{timeout:25000});
 await future.locator('button[data-page="cards"]').click();
 await future.locator('#codex-tabs button[data-tab="deck"]').click();
 const futureCount=Number(await future.locator('#codex-deck-count').textContent());
 assert(futureCount===52,'Future gated 52-card collection did not load in UI test');
 for(const [id,name] of [['Y','Gloam Bellkeeper'],['Z','Cinderjaw Prowler'],
  ['aa','Oathmoss Devourer'],['ab','Tidebreak Herald']]){
  await future.locator('#codex-list button[data-inspect="'+id+'"]').click();
  const actual=(await future.locator('#codex-detail-body h2').textContent()||'').trim();
  assert(actual===name,'Two-letter or single-letter detail routing failed for '+id+': '+actual);
  await future.locator('#codex-back').click();
 }
 await future.locator('#open-builder').click();
 assert(await future.locator('#deck-cards button[data-add="aa"]').count()===1&&
  await future.locator('#deck-cards button[data-add="ab"]').count()===1,
  'Armory did not render independent two-letter card buttons');
 await future.locator('#deck-cards button[data-remove="v"]').click();
 await future.locator('#deck-cards button[data-remove="v"]').click();
 await future.locator('#deck-cards button[data-add="aa"]').click();
 await future.locator('#deck-cards button[data-add="ab"]').click();
 assert(await future.locator('#deck-save').isEnabled(),
  'A valid two-letter-card custom deck was rejected');
 await future.locator('#deck-save').click();
 const edited=await future.evaluate(()=>({
  deck:window.AetherGame.loadouts().currentDeck,
  slots:window.AetherGame.loadouts().slots.length,
  persisted:JSON.parse(localStorage.getItem('aether-dominion-deck-v20')||'null')
 }));
 assert(edited.deck.length===24&&edited.deck.includes('aa')&&edited.deck.includes('ab')&&
  edited.slots===3&&JSON.stringify(edited.persisted)===JSON.stringify(edited.deck),
  'Future UI interaction failed to save distinct aa/ab card keys');
 await future.close();


 // Small-phone layout pass catches controls blocked by bottom dock and
 // horizontally clipped modals. Screens are disposable, saves are temporary.
 const small=await browser.newPage({viewport:{width:320,height:720},deviceScaleFactor:2,isMobile:true,hasTouch:true});
 small.on('pageerror',e=>problems.push('320px mobile: '+e.message));
 await small.goto('http://127.0.0.1:8000/index.html',{waitUntil:'load',timeout:40000});
 await small.waitForFunction(()=>window.AetherGame&&document.querySelector('button[data-page="cards"]'),
  null,{timeout:20000});
 const nav=await small.evaluate(()=>{
  const buttons=[...document.querySelectorAll('[data-page]')].filter(e=>e.closest('nav'));
  return buttons.map(e=>{const b=e.getBoundingClientRect();
   return{label:e.dataset.page,left:b.left,right:b.right,width:b.width,height:b.height}})
 });
 assert(nav.length===5&&nav.every(b=>b.width>=34&&b.height>=30&&b.left>=-2&&b.right<=322),
  'Bottom game dock clipped at 320px: '+JSON.stringify(nav));
 await small.locator('button[data-page="cards"]').click();
 assert(await small.locator('#codex-list button[data-inspect]').count()>=48,
  'Narrow phone cannot browse the complete 48-card Grimoire');
 await small.locator('#open-builder').click();
 const armory=await small.evaluate(()=>{
  const panel=document.querySelector('.deck-panel')?.getBoundingClientRect();
  const close=document.querySelector('#deck-close')?.getBoundingClientRect();
  const vault=document.querySelector('#deck-slots')?.getBoundingClientRect();
  const footer=document.querySelector('#deck-save')?.getBoundingClientRect();
  return{panel:panel&&{left:panel.left,right:panel.right},
   close:close&&{left:close.left,right:close.right},
   vault:vault&&{left:vault.left,right:vault.right},
   footer:footer&&{left:footer.left,right:footer.right}}
 });
 assert(armory.panel&&armory.panel.left>=-3&&armory.panel.right<=323&&
  armory.close?.left>=0&&armory.close?.right<=322&&
  armory.vault?.left>=-2&&armory.vault?.right<=322,
  '320px Armory geometry is clipped: '+JSON.stringify(armory));
 await small.locator('#deck-cancel').click();
 await small.screenshot({path:'art/v456-320px-mobile-dock-qa.png'});
 await small.close();

 assert(problems.length===0,'Browser exception: '+problems.join('; '));
 console.log(JSON.stringify({pass:true,qa:report,public:cards,errors:problems},null,2));
}finally{await browser.close()}
