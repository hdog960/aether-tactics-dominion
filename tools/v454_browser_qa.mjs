import { chromium } from 'playwright';

const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
const fail=(message)=>{throw new Error(message)};
try{
  await page.goto('http://127.0.0.1:8000/qa-v39.html',{waitUntil:'load',timeout:45000});
  await page.waitForFunction(()=>!!window.AetherGame?.qaV454Creatures&&!!window.AetherScene?.v454ArtInfo,{timeout:25000});
  await page.waitForFunction(()=>window.AetherScene.v454ArtInfo().cards?.complete&&window.AetherScene.v454ArtInfo().framesReady,{timeout:30000});

  const art=await page.evaluate(()=>{
    const s=window.AetherScene.v454ArtInfo();
    const status=s.cards;
    const images=['Q','R','S','T'].map(k=>window.AetherArt.get(k));
    const silhouettes=['Q','R','S','T'].map(k=>window.AetherArt.sprite(k));
    return {status,s,
      cards:images.map(x=>x.startsWith('data:image/png')),
      sprites:silhouettes.map(x=>x.startsWith('data:image/png')),
      uniqueCards:new Set(images).size,
      uniqueSprites:new Set(silhouettes).size
    };
  });
  if(!art.status.complete||!art.s.spriteReady||!art.s.framesReady)fail('Art gate incomplete: '+JSON.stringify(art));
  if(art.cards.some(x=>!x)||art.sprites.some(x=>!x)||art.uniqueCards!==4||art.uniqueSprites!==4)
    fail('Missing or duplicated painted card/battlefield art: '+JSON.stringify(art));

  const results=await page.evaluate(()=>{
    const G=window.AetherGame;
    const creature=G.qaV454Creatures();
    const spell=G.qaV45Spells();
    const vault=G.qaDeckVault();
    const boss=G.missions.all.filter(m=>m.bossKit).map(m=>G.qaBoss(m.id));
    const plans=G.missions.all.flatMap(m=>m.storyScene.choices.map(p=>G.qaPlan(m.id,p.kind)));
    const deck=['v','v','b','b','r','r','s','f','c','p','k','M','N','O','P','Q','R','S','T','a','a','h','H','J'];
    const battle=G.qaBalance(2,null,{testDeck:deck});
    return {
      creatures:{pass:creature.pass,total:creature.checks.length,failed:creature.checks.filter(x=>!x.pass)},
      spells:{pass:spell.pass,total:spell.results.length},
      deckVault:{pass:vault.pass,total:vault.results.length},
      bosses:{passed:boss.filter(x=>x.pass).length,total:boss.length},
      doctrines:{passed:plans.filter(x=>x.pass).length,total:plans.length},
      tactical:{pass:battle.pass,total:battle.games,wins:battle.wins,errors:battle.errors,
        usage:battle.v454CreatureUsage.player}
    };
  });
  if(!results.creatures.pass||results.creatures.total!==14||
     !results.spells.pass||results.spells.total!==12||
     !results.deckVault.pass||results.deckVault.total!==8||
     results.bosses.passed!==7||results.doctrines.passed!==30||
     !results.tactical.pass||results.tactical.total!==60)
    fail('Staging browser gameplay failed: '+JSON.stringify(results));

  // The real browser's canvas has exactly four painted characters in two
  // distinct sheets. Screen capture remains available for visual review.
  await page.screenshot({path:'art/v454-staging-browser-390px.png',fullPage:false});
  // QA-only contact sheet drawn from the REAL image adapter, not promo art.
  await page.evaluate(()=>{
    const cover=document.createElement('div');
    cover.id='v454-art-review';
    cover.style.cssText='position:fixed;inset:0;z-index:2147483647;background:#101a2e;padding:18px;overflow:auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;color:#f6dfad;font:700 12px system-ui';
    for(const [i,k] of ['Q','R','S','T'].entries()){
      const cell=document.createElement('div');
      cell.style.cssText='padding:8px;background:#21324b;border:1px solid #bba17a;border-radius:9px;text-align:center';
      const name=document.createElement('div');
      name.textContent=['Tideglass Oracle','Ashen Harrier','Gravebloom Warden','Stormvault Artificer'][i];
      name.style.cssText='min-height:36px;line-height:1.35';
      const portrait=document.createElement('img');
      portrait.src=window.AetherArt.get(k);
      portrait.style.cssText='display:block;width:100%;height:115px;object-fit:cover;border-radius:4px';
      const sprite=document.createElement('img');
      sprite.src=window.AetherArt.sprite(k);
      sprite.style.cssText='display:block;width:110px;height:140px;object-fit:contain;margin:0 auto';
      cell.append(name,portrait,sprite);cover.append(cell);
    }
    document.body.append(cover);
  });
  await page.waitForTimeout(180);
  await page.screenshot({path:'art/v454-art-identity-review-390px.png',fullPage:false});
  await page.evaluate(()=>document.querySelector('#v454-art-review')?.remove());
  // Visual acceptance capture through the actual tactical renderer.
  await page.evaluate(()=>{
    const s=window.AetherGame.get();
    const identities=[
      {k:'Q',id:801,x:0,y:5,hp:4,max:4,atk:1,range:2,move:2},
      {k:'R',id:802,x:2,y:5,hp:4,max:4,atk:2,range:1,move:3},
      {k:'S',id:803,x:4,y:5,hp:7,max:7,atk:2,range:1,move:1},
      {k:'T',id:804,x:6,y:5,hp:4,max:4,atk:2,range:2,move:2}
    ];
    s.phase='playing';s.round=1;s.turn=0;
    s.units=identities.map(unit=>({team:0,shield:0,moved:false,attacked:false,
      rooted:false,frosted:false,burning:false,stride:0,rallied:false,...unit}));
    window.AetherScene.sync(s,0,{unit:null,card:-1,tributes:[]});
    const qa=document.querySelector('#qa-panel');
    if(qa)qa.style.display='none';
  });
  await page.waitForTimeout(700);
  await page.screenshot({path:'art/v454-creatures-on-battlefield-390px.png',fullPage:false});
  const report={pass:errors.length===0,viewport:'390x844 mobile',art:{
    complete:art.status.complete,cardDimensions:art.status.cardDimensions,
    spriteDimensions:art.s.spriteDimensions,frameDimensions:art.s.frameDimensions,
    uniqueCards:art.uniqueCards,uniqueSprites:art.uniqueSprites},results,errors};

  // Staging intentionally retains 40 public cards until artwork is signed off.
  const main=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  main.on('pageerror',e=>errors.push('Main: '+e.message));
  await main.goto('http://127.0.0.1:8000/index.html',{waitUntil:'load',timeout:45000});
  await main.waitForFunction(()=>window.AetherGame&&window.AetherArt?.v453ArtStatus?.()?.complete,null,{timeout:30000});
  await main.locator('button[data-page="cards"]').click();
  await main.locator('#codex-tabs button[data-tab="deck"]').click();
  const collection=await main.evaluate(()=>({
    count:Number(document.querySelector('#codex-deck-count')?.textContent),
    names:[...document.querySelectorAll('#codex-list button[data-inspect] strong')].map(x=>x.textContent),
    deck:window.AetherGame.deckInfo()
  }));
  if(collection.count!==40||collection.names.includes('Tideglass Oracle')||
     collection.deck.cards!==24)
    fail('Unreleased new cards escaped staging gate: '+JSON.stringify(collection));
  report.production={collection:collection.count,stillArtGated:true};
  console.log(JSON.stringify(report,null,2));
  if(errors.length)fail('Browser JS errors: '+errors.join('; '));
}finally{
  await browser.close();
}
