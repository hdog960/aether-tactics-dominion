import {chromium} from 'playwright';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const failures=[];
page.on('pageerror',err=>failures.push('QA: '+err.message));
const invariant=(bool,msg)=>{if(!bool)throw Error(msg)};
try{
 await page.goto('http://127.0.0.1:8000/qa-v39.html',{waitUntil:'load',timeout:45000});
 await page.waitForFunction(()=>!!window.AetherGame?.qaV455Spells&&
  window.AetherArt?.v455ArtStatus?.()?.complete,null,{timeout:30000});
 const paint=await page.evaluate(()=>{
   const s=window.AetherArt.v455ArtStatus();
   const images=['U','V','W','X'].map(k=>window.AetherArt.get(k));
   return{...s,fourNonblank:images.every(x=>x.startsWith('data:image/png')),
    uniqueCrops:new Set(images).size};
 });
 invariant(paint.complete&&paint.loaded&&paint.distinct&&paint.uniqueCrops===4&&
  paint.fourNonblank&&paint.dimensions.join('x')==='512x96','Painted image acceptance failed: '+JSON.stringify(paint));
 const gameplay=await page.evaluate(()=>{
  const g=window.AetherGame;
  const spells=g.qaV455Spells();
  const oldSpells=g.qaV45Spells();
  const q453=g.qaV453Creatures(),q454=g.qaV454Creatures(),vault=g.qaDeckVault();
  const bosses=g.missions.all.filter(m=>m.bossKit).map(m=>g.qaBoss(m.id));
  const plans=g.missions.all.flatMap(m=>m.storyScene.choices.map(p=>g.qaPlan(m.id,p.kind)));
  const deck=['v','v','b','b','r','r','s','f','c','j','k','M','N','O','P','U','V','W','X','a','a','h','e','J'];
  const balance=g.qaBalance(2,null,{testDeck:deck});
  return{spells,oldSpells:{pass:oldSpells.pass,total:oldSpells.results.length},
   creatures:{first:q453.pass,second:q454.pass},vault:vault.pass,
   bosses:{pass:bosses.filter(x=>x.pass).length,total:bosses.length},
   plans:{pass:plans.filter(x=>x.pass).length,total:plans.length},
   battle:{pass:balance.pass,games:balance.games,wins:balance.wins,
    errors:balance.errors,usage:balance.v455SpellUsage.player}};
 });
 invariant(gameplay.spells.pass&&gameplay.spells.tests.length===15&&
  gameplay.oldSpells.pass&&gameplay.oldSpells.total===12&&
  gameplay.creatures.first&&gameplay.creatures.second&&gameplay.vault&&
  gameplay.bosses.pass===7&&gameplay.plans.pass===30&&
  gameplay.battle.pass&&gameplay.battle.games===60&&gameplay.battle.errors.length===0,
  'Spell legality or prior regression failed: '+JSON.stringify(gameplay));
 await page.evaluate(()=>{
  const gallery=document.createElement('div');gallery.id='v455-art-review';
  gallery.style.cssText='position:fixed;inset:0;z-index:2147483647;background:#11192f;padding:15px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;color:#ffe8b8;font:700 13px system-ui';
  ['U','V','W','X'].forEach((k,i)=>{
   const tile=document.createElement('div');tile.style.cssText='border:1px solid #bea17a;border-radius:10px;padding:9px;background:#222f46;text-align:center';
   const name=document.createElement('p');name.textContent=['Mirror Breach','Gale Step','Ember Covenant','Crescent Refrain'][i];
   const img=document.createElement('img');img.src=window.AetherArt.get(k);
   img.style.cssText='display:block;width:100%;aspect-ratio:4/3;object-fit:contain;border-radius:5px';
   tile.append(img,name);gallery.append(tile);
  });
  document.body.append(gallery);
 });
 await page.screenshot({path:'art/v455-four-painted-spells-390px.png'});
 await page.evaluate(()=>document.querySelector('#v455-art-review')?.remove());
 const real=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 real.on('pageerror',err=>failures.push('Public: '+err.message));
 await real.goto('http://127.0.0.1:8000/index.html',{waitUntil:'load',timeout:45000});
 await real.waitForFunction(()=>window.AetherGame&&window.AetherArt?.v455ArtStatus?.()?.complete,null,{timeout:30000});
 await real.locator('button[data-page="cards"]').click();
 await real.locator('#codex-tabs button[data-tab="deck"]').click();
 const collection=await real.evaluate(()=>{
  const names=[...document.querySelectorAll('#codex-list button[data-inspect] strong')].map(x=>x.textContent);
  return{count:Number(document.querySelector('#codex-deck-count')?.textContent),names,
   deck:window.AetherGame.deckInfo(),vault:window.AetherGame.loadouts()};
 });
 const release=process.env.V455_RELEASE==='1',expectedCount=release?48:44;
 invariant(collection.count===expectedCount&&collection.deck.cards===24&&collection.vault.slots.length===3,
  'Release collection or save-deck mismatch: '+JSON.stringify(collection));
 const newNames=['Mirror Breach','Gale Step','Ember Covenant','Crescent Refrain'];
 invariant(newNames.every(n=>collection.names.includes(n)===release),
  'New card release gate mismatch: '+JSON.stringify(collection.names));
 await real.screenshot({path:'art/v455-real-grimoire-390px.png'});
 const report={pass:!failures.length,release,collection:collection.count,painted:paint,
   game:{spellChecks:gameplay.spells.tests.length,spellPass:gameplay.spells.pass,
    olderSpellPass:gameplay.oldSpells.pass,creatures:gameplay.creatures,
    vault:gameplay.vault,bosses:gameplay.bosses,plans:gameplay.plans,
    battle:gameplay.battle},errors:failures};
 console.log(JSON.stringify(report,null,2));
 invariant(!failures.length,'Browser JS errors: '+failures.join(', '));
}finally{await browser.close()}
