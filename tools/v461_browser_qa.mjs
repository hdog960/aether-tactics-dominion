import {chromium} from 'playwright';
const assert=(ok,msg)=>{if(!ok)throw Error(msg)};
const errors=[];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try{
 const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
 page.on('pageerror',e=>errors.push('390px '+e.message));
 page.on('dialog',d=>d.accept());
 await page.goto('http://127.0.0.1:8000/index.html',{waitUntil:'load',timeout:45000});
 await page.waitForFunction(()=>window.AetherGame?.startGauntlet&&window.DominionNav&&window.DominionRift,
  null,{timeout:30000});
 assert(await page.locator('#home-gauntlet').isVisible(),'Rift Gauntlet is not present in commander hall');
 assert((await page.locator('#home-gauntlet-status').textContent()).includes('THREE STAGES'),
  'New player gauntlet status incorrect');
 const oldDeck=await page.evaluate(()=>window.AetherGame.deckInfo());
 assert(oldDeck.cards===24,'Existing saved 24-card deck constraint changed');
 assert(await page.locator('[data-rift-path]').count()===3,'Three selectable Rift paths absent');
 await page.locator('button[data-rift-path="stormbound"]').click();
 assert(await page.locator('button[data-rift-path="stormbound"]').getAttribute('aria-pressed')==='true',
  'Stormbound path selection did not persist in UI');
 assert((await page.locator('#rift-path-detail').textContent()).includes('2 Core HP'),
  'Stormbound risk/reward explanation missing');
 await page.locator('#v461-paths').scrollIntoViewIfNeeded();
 await page.screenshot({path:'art/v461-gauntlet-commander-hall-390px.png',fullPage:true});
 await page.locator('#home-gauntlet').click();
 const stage1=await page.evaluate(()=>({
  game:window.AetherGame.get(),run:window.AetherGame.gauntletStatus(),
  activeTab:window.DominionNav.active()
 }));
 assert(stage1.game.gauntletStage===1&&stage1.run.current?.stage===1&&
  stage1.game.gauntletRunId===stage1.run.current.id&&
  stage1.game.hp[0]===24&&stage1.game.hp[1]===27&&stage1.game.energy[0]===5&&
  stage1.game.gauntletPath==='stormbound'&&stage1.run.current.path==='stormbound'&&stage1.game.arenaId==='verdant'&&
  stage1.activeTab==='battle','Real Gauntlet stage one not playable');
 assert(stage1.game.decks[0].length+stage1.game.hands[0].length===24,
  'Locked deck should be exactly 24 cards on stage one');
 await page.screenshot({path:'art/v461-gauntlet-first-encounter-390px.png',fullPage:false});
 await page.reload({waitUntil:'load'});
 await page.waitForFunction(()=>window.AetherGame?.gauntletStatus&&window.DominionRift,null,{timeout:30000});
 const resumed=await page.evaluate(()=>({
  match:window.AetherGame.get(),progress:window.AetherGame.gauntletStatus()
 }));
 assert(resumed.progress.current?.id===stage1.run.current.id&&
  resumed.match.gauntletRunId===stage1.run.current.id&&
  resumed.match.gauntletStage===1&&resumed.match.gauntletPath==='stormbound'&&resumed.match.version===4,
  'Reload lost gauntlet run or damaged original version-four match save');
 assert((await page.locator('#home-gauntlet-status').textContent()).includes('IN PROGRESS'),
   'Home screen does not show resumable active Gauntlet');
 assert(await page.locator('button[data-rift-path="wayfinder"]').isDisabled(),
  'Player can illegally switch Rift Path midway through a run');
 await page.locator('#home-forge').click();
 assert(await page.locator('#v46-masteries').isVisible(),
  'Mastery section invisible when opening Forge');
 await page.screenshot({path:'art/v461-mastery-forge-390px.png'});
 const qa=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 qa.on('pageerror',e=>errors.push('isolated '+e.message));
 await qa.goto('http://127.0.0.1:8000/qa-v39.html',{waitUntil:'load',timeout:45000});
 await qa.waitForFunction(()=>window.AetherGame?.qaV461Paths,null,{timeout:30000});
 const suite=await qa.evaluate(()=>window.AetherGame.qaV46Gauntlet());
 assert(suite.pass&&suite.checks.length===14,'One-time reward and stage regression failed: '+JSON.stringify(suite));
 await qa.close();
 const narrow=await browser.newPage({viewport:{width:320,height:720},deviceScaleFactor:2,isMobile:true,hasTouch:true});
 narrow.on('pageerror',e=>errors.push('320px '+e.message));
 narrow.on('dialog',d=>d.accept());
 await narrow.goto('http://127.0.0.1:8000/index.html',{waitUntil:'load',timeout:45000});
 await narrow.waitForFunction(()=>window.DominionRift&&window.AetherGame?.startGauntlet,null,{timeout:30000});
 const geometry=await narrow.evaluate(()=>{
  const hall=document.getElementById('home-gauntlet').getBoundingClientRect();
  const paths=[...document.querySelectorAll('button[data-rift-path]')].map(x=>x.getBoundingClientRect());
  const tabs=[...document.querySelectorAll('#bottom-tabs button')].map(x=>x.getBoundingClientRect());
  return{hallLeft:hall.left,hallRight:hall.right,
   paths:paths.map(x=>({left:x.left,right:x.right})),
   tabs:tabs.map(x=>({left:x.left,right:x.right}))};
 });
 assert(geometry.hallLeft>=-3&&geometry.hallRight<=323&&geometry.tabs.every(t=>t.left>=-3&&t.right<=323)&&
  geometry.paths.length===3&&geometry.paths.every(t=>t.left>=-3&&t.right<=323),
  'Gauntlet or five-tab navigation clips narrow phone: '+JSON.stringify(geometry));
 await narrow.locator('button[data-rift-path="ironbound"]').click();
 assert(await narrow.locator('button[data-rift-path="ironbound"]').getAttribute('aria-pressed')==='true','320px Ironbound cannot be selected');
 await narrow.screenshot({path:'art/v461-gauntlet-narrow-320px.png',fullPage:true});
 await narrow.locator('#home-gauntlet').click();
 const iron=await narrow.evaluate(()=>({match:window.AetherGame.get(),
   run:window.AetherGame.gauntletStatus()}));
 assert(iron.match.gauntletPath==='ironbound'&&iron.run.current.path==='ironbound'&&
  iron.match.hp[0]===20&&iron.match.hp[1]===26&&
  iron.match.units.filter(u=>u.team===0).slice(0,2).every(u=>u.shield>=1),
  'Real 320px Ironbound battle mechanics did not apply');
 assert(errors.length===0,'Browser errors '+JSON.stringify(errors));
 console.log(JSON.stringify({pass:true,mode:'v4.6.1 Rift Paths',rules:suite.checks.length,
  originalDeck:oldDeck.cards,stage1:stage1.run.current,restore:resumed.progress.current,
  mobile320:geometry,errors},null,2));
}finally{await browser.close()}
