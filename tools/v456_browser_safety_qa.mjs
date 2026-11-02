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
 assert(problems.length===0,'Browser exception: '+problems.join('; '));
 console.log(JSON.stringify({pass:true,qa:report,public:cards,errors:problems},null,2));
}finally{await browser.close()}
