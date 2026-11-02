import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const issue=[];
try{
 const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
 page.on('pageerror',e=>issue.push(e.message));

 // Instrument the actual 2D renderer before any game scripts run. This
 // records which 120px rows of the *new* animated atlas reach drawImage.
 // Loading a sprite file or drawing a promotional preview is insufficient.
 await page.addInitScript(()=>{
  const draw=CanvasRenderingContext2D.prototype.drawImage;
  window.__dominionV458DrawRows=[];
  CanvasRenderingContext2D.prototype.drawImage=function(img,...args){
   if(typeof img?.src==='string'&&img.src.includes('battlefield-frames-v458.webp')&&
      args.length===8&&Number.isFinite(args[1])&&
      [0,120,240,360].includes(args[1])){
    const row=args[1];
    if(!window.__dominionV458DrawRows.includes(row))
     window.__dominionV458DrawRows.push(row);
   }
   return draw.call(this,img,...args);
  };
 });

 await page.goto('http://127.0.0.1:8000/qa-v39.html',{waitUntil:'load',timeout:45000});
 await page.waitForFunction(()=>window.AetherScene?.v458ArtInfo?.()?.framesReady&&
  window.AetherArt?.v458ArtStatus?.()?.complete,null,{timeout:25000});
 // The legacy QA dashboard schedules showUnits('new') 950ms after load,
 // resetting the battle and replacing our staged creatures with the old roster.
 // Let this single initialization finish *before* altering live QA state.
 await page.waitForTimeout(1550);
 const result=await page.evaluate(()=>{
  const art=window.AetherScene.v458ArtInfo(),status=art.cards,
   portraits=['ag','ah','ai','aj'].map(k=>window.AetherArt.get(k)),
   sprites=['ag','ah','ai','aj'].map(k=>window.AetherArt.sprite(k));
  return{status,frameReady:art.framesReady,spriteReady:art.spriteReady,
   frameDimensions:art.frameDimensions,spriteDimensions:art.spriteDimensions,
   uniquePaintings:new Set(portraits).size,uniqueSprites:new Set(sprites).size,
   cardsLoaded:portraits.every(v=>v.startsWith('data:image/png')),
   spritesLoaded:sprites.every(v=>v.startsWith('data:image/png')),
   rules:window.AetherGame.qaV458Creatures()};
 });
 if(!result.status.complete||!result.frameReady||!result.spriteReady||
   result.uniquePaintings!==4||result.uniqueSprites!==4||
   !result.cardsLoaded||!result.spritesLoaded||!result.rules.pass||
   result.frameDimensions.join('x')!=='2112x480'||
   result.spriteDimensions.join('x')!=='384x120')
   throw Error('Failed real painted v4.5.8 artwork acceptance: '+JSON.stringify(result));
 await page.evaluate(()=>{
  const root=document.createElement('section');
  root.id='v458-review';
  root.style.cssText='position:fixed;inset:0;background:#171d30;z-index:999999;padding:10px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;color:white;font:700 13px system-ui';
  ['ag','ah','ai','aj'].forEach((k,i)=>{
   const cell=document.createElement('div');
   cell.style.cssText='border:1px solid #bbaa85;border-radius:8px;padding:6px;background:#27354c;text-align:center';
   const title=document.createElement('p');
   title.textContent=['Aether Lanternist','Vesper Kestrel','Hollowroot Collector','Rimeshard Sentinel'][i];
   const card=document.createElement('img');card.src=window.AetherArt.get(k);
   card.style.cssText='width:100%;aspect-ratio:4/3;object-fit:cover';
   const sprite=document.createElement('img');sprite.src=window.AetherArt.sprite(k);
   sprite.style.cssText='width:96px;height:120px;object-fit:contain;margin:auto;display:block';
   cell.append(title,card,sprite);root.append(cell);
  });
  document.body.append(root);
 });
 await page.screenshot({path:'art/v458-card-sprite-identity-390px.png'});
 await page.evaluate(()=>document.getElementById('v458-review')?.remove());
 await page.evaluate(()=>{
  // Canvas shots must show actual deployed battle, not the Hall behind it.
  document.querySelector('#qa-panel')?.style.setProperty('display','none');
  window.DominionNav?.showTab('battle');
 });
 await page.waitForFunction(()=>document.querySelector('#game')?.dataset.tab==='battle'&&
  document.querySelector('#battle-canvas')?.getBoundingClientRect().width>100,null,{timeout:15000});
 await page.evaluate(()=>{
  const g=window.AetherGame.get();
  g.phase='playing';g.turn=0;g.round=1;
  g.units=['ag','ah','ai','aj'].map((k,i)=>({
   id:920+i,k,team:0,x:i*2,y:5,hp:5,max:5,atk:2,range:2,move:2,
   shield:0,fly:false,moved:false,attacked:false
  }));
  window.AetherScene.sync(g,0,{unit:null,card:-1,tributes:[]});
  // Refresh the REAL board DOM. Old overlay <img> sprites otherwise cover
  // the new painted canvas units despite drawImage events being recorded.
  document.querySelector('#board button[data-x="3"][data-y="3"]')?.click();
  const panel=document.querySelector('#qa-panel');if(panel)panel.style.display='none';
 });
 await page.waitForFunction(()=>
  ['Aether Lanternist','Vesper Kestrel','Hollowroot Collector','Rimeshard Sentinel']
   .every(name=>[...document.querySelectorAll('#board button[aria-label]')]
    .some(el=>el.getAttribute('aria-label')?.includes(name)))&&
  document.querySelectorAll('#board img.unitimg').length===4,
  null,{timeout:12000});
 await page.waitForFunction(()=>
  [0,120,240,360].every(row=>window.__dominionV458DrawRows?.includes(row)),
  null,{timeout:15000});
 const paintedRows=await page.evaluate(()=>window.__dominionV458DrawRows.slice());
 await page.waitForTimeout(280);
 const nativeCanvas=await page.evaluate(()=>{
  const units=window.AetherGame.get().units.map(u=>u.k);
  const labels=[...document.querySelectorAll('#board button[aria-label]')]
   .filter(e=>e.querySelector('img.unitimg')).map(e=>e.getAttribute('aria-label'));
  return{units,labels,canvas:document.querySelector('#battle-canvas').toDataURL('image/png')};
 });
 const fs=await import('node:fs');
 fs.writeFileSync('art/v458-raw-battle-canvas-720px.png',
  Buffer.from(nativeCanvas.canvas.split(',')[1],'base64'));
 if(JSON.stringify(nativeCanvas.units)!==JSON.stringify(['ag','ah','ai','aj'])||
  nativeCanvas.labels.length!==4)throw Error('Rendered unit mismatch: '+JSON.stringify({
   units:nativeCanvas.units,labels:nativeCanvas.labels}));
 await page.screenshot({path:'art/v458-battlefield-four-creatures-390px.png'});
 const game=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 game.on('pageerror',e=>issue.push(e.message));
 await game.addInitScript(()=>{window.DOMINION_V458_ART_RELEASE=true});
 await game.goto('http://127.0.0.1:8000/index.html',{waitUntil:'load',timeout:45000});
 await game.waitForFunction(()=>window.AetherGame&&window.AetherArt?.v458ArtStatus?.()?.complete,null,{timeout:25000});
 await game.locator('button[data-page="cards"]').click();
 await game.locator('#codex-tabs button[data-tab="deck"]').click();
 const count=await game.evaluate(()=>({
  total:Number(document.querySelector('#codex-deck-count')?.textContent),
  names:[...document.querySelectorAll('#codex-list button[data-inspect] strong')].map(e=>e.textContent),
  deck:window.AetherGame.deckInfo().cards,slots:window.AetherGame.loadouts().slots.length
 }));
 if(count.total!==60||count.deck!==24||count.slots!==3||
  ['Aether Lanternist','Vesper Kestrel','Hollowroot Collector','Rimeshard Sentinel']
    .some(n=>!count.names.includes(n))||issue.length)
  throw Error('60-card painted release-candidate collection failed: '+JSON.stringify({count,issue}));
 await game.screenshot({path:'art/v458-future-60-card-grimoire-390px.png'});
 await game.locator('#open-builder').click();
 for(const id of ['ag','ah','ai','aj']){
  if(await game.locator('#deck-cards button[data-add="'+id+'"]').count()!==1)
   throw Error('Armory missing original creature '+id);
 }
 for(let i=0;i<3;i++)await game.locator('#deck-cards button[data-remove="v"]').click();
 await game.locator('#deck-cards button[data-remove="b"]').click();
 for(const id of ['ag','ah','ai','aj'])await game.locator('#deck-cards button[data-add="'+id+'"]').click();
 if(!await game.locator('#deck-save').isEnabled())throw Error('60-card Armory deck invalid');
 await game.locator('#deck-save').click();
 const saved=await game.evaluate(()=>({
  selected:window.AetherGame.loadouts().currentDeck,
  stored:JSON.parse(localStorage.getItem('aether-dominion-deck-v20')||'null')
 }));
 if(saved.selected.length!==24||!['ag','ah','ai','aj'].every(k=>saved.selected.includes(k))||
  JSON.stringify(saved.selected)!==JSON.stringify(saved.stored))
  throw Error('Final four creature IDs failed actual saved Armory');
 const narrow=await browser.newPage({viewport:{width:320,height:720},isMobile:true,hasTouch:true});
 narrow.on('pageerror',e=>issue.push('320px: '+e.message));
 await narrow.addInitScript(()=>{window.DOMINION_V458_ART_RELEASE=true});
 await narrow.goto('http://127.0.0.1:8000/index.html',{waitUntil:'load',timeout:45000});
 await narrow.waitForFunction(()=>window.AetherGame&&window.AetherArt?.v458ArtStatus?.()?.complete,null,{timeout:25000});
 await narrow.locator('button[data-page="cards"]').click();
 await narrow.locator('#codex-tabs button[data-tab="deck"]').click();
 if(Number(await narrow.locator('#codex-deck-count').textContent())!==60)
  throw Error('Narrow phone did not show all 60 original cards');
 await narrow.screenshot({path:'art/v458-60-card-narrow-phone-320px.png'});
 await narrow.close();
 console.log(JSON.stringify({pass:true,painted:result.status.complete,
  distinctPaintingCount:result.uniquePaintings,distinctSpriteCount:result.uniqueSprites,
  frameAtlas:result.frameDimensions,mechanicChecks:result.rules.checks.length,
  battlefieldPaintedRows:paintedRows,candidateCards:count.total,preservedDeck:count.deck,slots:count.slots,errors:issue},null,2));
}finally{await browser.close()}
