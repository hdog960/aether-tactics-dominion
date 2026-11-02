import {chromium} from 'playwright';
import fs from 'node:fs';
const names=['Gravemire Ring','Prism Relay','Cinder Bloom','Tidal Reprieve'];
const ids=['ac','ad','ae','af'];
const candidate=process.env.V457_RELEASE==='1';
const assert=(ok,message)=>{if(!ok)throw new Error(message)};
const problems=[];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try{
 const qa=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
 qa.on('pageerror',e=>problems.push('QA: '+e.message));
 await qa.goto('http://127.0.0.1:8000/qa-v39.html',{waitUntil:'load',timeout:45000});
 await qa.waitForFunction(()=>window.AetherGame?.qaV457Spells&&window.AetherArt?.v457ArtStatus?.()?.complete,
  null,{timeout:35000});
 const source=await qa.evaluate(()=>{
  const status=window.AetherArt.v457ArtStatus();
  const ids=['ac','ad','ae','af'];
  const portraits=ids.map(k=>window.AetherArt.get(k));
  return{status,images:portraits.length,distinct:new Set(portraits).size,
   painted:portraits.every(src=>src.startsWith('data:image/png')),
   checks:window.AetherGame.qaV457Spells()};
 });
 assert(source.status.complete&&source.status.dimensions.join('x')==='512x96'&&
  source.images===4&&source.distinct===4&&source.painted&&
  source.checks.pass&&source.checks.checks.length===14,
  'V457 original paintings or gameplay failed '+JSON.stringify(source));
 await qa.evaluate(()=>{
  const overlay=document.createElement('section');
  overlay.id='v457-original-review';
  overlay.style.cssText='position:fixed;inset:0;z-index:999999;background:#151e30;padding:12px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;color:#ffe7b0;font:700 13px system-ui';
  ['ac','ad','ae','af'].forEach((k,i)=>{
   const tile=document.createElement('div');
   tile.style.cssText='background:#26314b;border:1px solid #ceb58b;padding:6px;border-radius:8px;align-content:center';
   const img=document.createElement('img');img.src=window.AetherArt.get(k);
   img.style.cssText='width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:5px';
   const name=document.createElement('p');name.textContent=['Gravemire Ring','Prism Relay','Cinder Bloom','Tidal Reprieve'][i];
   tile.append(img,name);overlay.append(tile);
  });
  document.body.append(overlay);
 });
 await qa.screenshot({path:'art/v457-four-painted-spell-review-390px.png'});
 await qa.evaluate(()=>{
  document.querySelector('#v457-original-review')?.remove();
  document.querySelector('#qa-panel')?.style.setProperty('display','none');
  window.DominionNav.showTab('battle');
  const s=window.AetherGame.get();
  s.fxEvents=[];
  s.fxSeq=0;
  window.AetherScene.sync(s,0,{unit:null,card:-1,tributes:[]});
  const kinds=['gravemire','prismrelay','cinderbloom','tidalreprieve'];
  const allies=s.units.filter(u=>u.team===0);
  s.fxEvents=kinds.map((kind,i)=>({
   id:500+i,type:'buff',kind,amount:1,
   to:{x:(allies[i%allies.length]?.x??i),y:(allies[i%allies.length]?.y??5),team:0,id:allies[i%allies.length]?.id}
  }));
  s.fxSeq=503;
  window.AetherScene.sync(s,0,{unit:null,card:-1,tributes:[]});
 });
 await qa.waitForFunction(()=>document.querySelector('#game')?.dataset.tab==='battle'&&
  window.AetherScene?.activeCombat?.()>=4,null,{timeout:12000});
 await qa.waitForTimeout(120);
 await qa.screenshot({path:'art/v457-four-spell-battle-fx-390px.png'});
 const game=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
 game.on('pageerror',e=>problems.push('Real UI: '+e.message));
 if(!candidate)await game.addInitScript(()=>{window.DOMINION_V457_ART_RELEASE=false});
 await game.goto('http://127.0.0.1:8000/index.html',{waitUntil:'load',timeout:45000});
 await game.waitForFunction(()=>window.AetherGame&&window.AetherArt?.v457ArtStatus?.()?.complete,
   null,{timeout:30000});
 await game.locator('button[data-page="cards"]').click();
 await game.locator('#codex-tabs button[data-tab="deck"]').click();
 let count=Number(await game.locator('#codex-deck-count').textContent());
 assert(count===(candidate?56:52),'Normal collection count incorrect: '+count);
 const visible=await game.locator('#codex-list button[data-inspect] strong').allTextContents();
 assert(names.every(n=>visible.includes(n)===candidate),'Card release gate mismatch '+JSON.stringify(visible));
 await game.screenshot({path:'art/v457-staged-grimoire-390px.png'});
 const preview=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 preview.on('pageerror',e=>problems.push('Preview: '+e.message));
 await preview.addInitScript(()=>{window.DOMINION_V457_ART_RELEASE=true});
 await preview.goto('http://127.0.0.1:8000/index.html',{waitUntil:'load',timeout:45000});
 await preview.waitForFunction(()=>window.AetherGame&&window.AetherArt?.v457ArtStatus?.()?.complete,null,{timeout:30000});
 await preview.locator('button[data-page="cards"]').click();
 await preview.locator('#codex-tabs button[data-tab="deck"]').click();
 const previewCount=Number(await preview.locator('#codex-deck-count').textContent());
 assert(previewCount===56,'Painted 56-card preview did not render: '+previewCount);
 for(let i=0;i<ids.length;i++){
  await preview.locator('#codex-list button[data-inspect="'+ids[i]+'"]').click();
  const title=(await preview.locator('#codex-detail-body h2').textContent()||'').trim();
  assert(title===names[i],'Wrong painted Grimoire details '+ids[i]);
  await preview.locator('#codex-back').click();
 }
 await preview.locator('#open-builder').click();
 for(const id of ids)assert(await preview.locator('#deck-cards button[data-add="'+id+'"]').count()===1,
   'Deck builder lost '+id);
 for(let i=0;i<3;i++)await preview.locator('#deck-cards button[data-remove="v"]').click();
 await preview.locator('#deck-cards button[data-remove="b"]').click();
 for(const id of ids)await preview.locator('#deck-cards button[data-add="'+id+'"]').click();
 assert(await preview.locator('#deck-save').isEnabled(),'Expanded mixed spell deck failed validation');
 await preview.locator('#deck-save').click();
 const saved=await preview.evaluate(()=>({
  deck:window.AetherGame.loadouts().currentDeck,
  store:JSON.parse(localStorage.getItem('aether-dominion-deck-v20')||'null'),
  slots:window.AetherGame.loadouts().slots.length
 }));
 assert(saved.deck.length===24&&ids.every(k=>saved.deck.includes(k))&&
  JSON.stringify(saved.deck)===JSON.stringify(saved.store)&&saved.slots===3,
  'New spell IDs did not survive actual Armory UI saving');
 await preview.screenshot({path:'art/v457-painted-56-card-preview-390px.png'});
 const small=await browser.newPage({viewport:{width:320,height:720},deviceScaleFactor:2,isMobile:true,hasTouch:true});
 small.on('pageerror',e=>problems.push('320px: '+e.message));
 await small.addInitScript(()=>{window.DOMINION_V457_ART_RELEASE=true});
 await small.goto('http://127.0.0.1:8000/index.html',{waitUntil:'load',timeout:45000});
 await small.waitForFunction(()=>window.AetherGame&&document.querySelector('#bottom-tabs'),null,{timeout:30000});
 await small.locator('button[data-page="cards"]').click();
 const smallCount=Number(await small.locator('#codex-deck-count').textContent());
 assert(smallCount===56,'Small phone card count wrong');
 await small.locator('#open-builder').click();
 const bounds=await small.evaluate(()=>({
  panel:document.querySelector('.deck-panel')?.getBoundingClientRect().toJSON(),
  close:document.querySelector('#deck-close')?.getBoundingClientRect().toJSON()
 }));
 assert(bounds.panel?.left>=-3&&bounds.panel?.right<=323&&bounds.close?.right<=322,
  '320px modal clipped: '+JSON.stringify(bounds));
 assert(problems.length===0,'Browser errors '+JSON.stringify(problems));
 console.log(JSON.stringify({pass:true,releaseCandidate:candidate,normalCards:count,
  futureCards:previewCount,smallPhoneCards:smallCount,paintings:source.status,
  spellRules:source.checks.checks.length,deckSaved:ids,errors:problems},null,2));
}finally{await browser.close()}
