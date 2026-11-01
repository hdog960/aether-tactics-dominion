import { chromium } from 'playwright';

const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
const fail=(message)=>{throw new Error(message)};
try{
  await page.goto('http://127.0.0.1:8000/qa-v39.html',{waitUntil:'load',timeout:45000});
  await page.waitForFunction(()=>!!window.AetherGame?.qaV453Creatures&&!!window.AetherScene?.v453ArtInfo,{timeout:25000});
  await page.waitForFunction(()=>window.AetherScene.v453ArtInfo().cards?.complete&&window.AetherScene.v453ArtInfo().framesReady,{timeout:30000});

  const art=await page.evaluate(()=>{
    const s=window.AetherScene.v453ArtInfo();
    const status=s.cards;
    const images=['M','N','O','P'].map(k=>window.AetherArt.get(k));
    const silhouettes=['M','N','O','P'].map(k=>window.AetherArt.sprite(k));
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
    const creature=G.qaV453Creatures();
    const spell=G.qaV45Spells();
    const vault=G.qaDeckVault();
    const boss=G.missions.all.filter(m=>m.bossKit).map(m=>G.qaBoss(m.id));
    const plans=G.missions.all.flatMap(m=>m.storyScene.choices.map(p=>G.qaPlan(m.id,p.kind)));
    const deck=['v','v','b','b','r','r','s','f','g','c','p','k','M','N','O','P','a','a','a','w','w','h','H','J'];
    const battle=G.qaBalance(2,null,{testDeck:deck});
    return {
      creatures:{pass:creature.pass,total:creature.checks.length,failed:creature.checks.filter(x=>!x.pass)},
      spells:{pass:spell.pass,total:spell.results.length},
      deckVault:{pass:vault.pass,total:vault.results.length},
      bosses:{passed:boss.filter(x=>x.pass).length,total:boss.length},
      doctrines:{passed:plans.filter(x=>x.pass).length,total:plans.length},
      tactical:{pass:battle.pass,total:battle.games,wins:battle.wins,errors:battle.errors,
        usage:battle.newCreatureUsage.player}
    };
  });
  if(!results.creatures.pass||results.creatures.total!==13||
     !results.spells.pass||results.spells.total!==12||
     !results.deckVault.pass||results.deckVault.total!==8||
     results.bosses.passed!==7||results.doctrines.passed!==30||
     !results.tactical.pass||results.tactical.total!==60)
    fail('Staging browser gameplay failed: '+JSON.stringify(results));

  // The real browser's canvas has exactly four painted characters in two
  // distinct sheets. Screen capture remains available for visual review.
  await page.screenshot({path:'art/v453-staging-browser-390px.png',fullPage:false});
  const report={pass:errors.length===0,viewport:'390x844 mobile',art:{
    complete:art.status.complete,cardDimensions:art.status.cardDimensions,
    spriteDimensions:art.s.spriteDimensions,frameDimensions:art.s.frameDimensions,
    uniqueCards:art.uniqueCards,uniqueSprites:art.uniqueSprites},results,errors};
  console.log(JSON.stringify(report,null,2));
  if(errors.length)fail('Browser JS errors: '+errors.join('; '));
}finally{
  await browser.close();
}
