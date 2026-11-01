import fs from 'node:fs';
const paths=['v45-engine.js','v45-qa-engine.js','v45-scene.js','v45-qa-scene.js','v45-qa.js','v454-creature-art.js'];
for(const path of paths){new Function(fs.readFileSync(path,'utf8'))}
const engine=fs.readFileSync('v45-engine.js','utf8');
const qaEngine=fs.readFileSync('v45-qa-engine.js','utf8');
const scene=fs.readFileSync('v45-scene.js','utf8');
const qaScene=fs.readFileSync('v45-qa-scene.js','utf8');
const html=fs.readFileSync('index.html','utf8');
const qaHtml=fs.readFileSync('qa-v39.html','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const artwork=fs.readFileSync('v454-creature-art.js','utf8');
const assets=['art/cards-creatures-v454.webp','art/units-creatures-v454.png',
 'art/battlefield-frames-v454.webp'];
const manifest=JSON.parse(fs.readFileSync('art/v454-art-manifest.json','utf8'));
const checks={
 jsSyntax:true,
 qaEngineMatches:engine===qaEngine,
 qaSceneMatches:scene===qaScene,
 artworkGatePresent:engine.includes("const V454_UNIT_KEYS=['Q','R','S','T']")&&
  engine.includes('V454_ENABLED||!V454_UNIT_KEYS.includes(k)'),
 releasedArtworkFlag:html.includes('DOMINION_V454_ART_RELEASE=true'),
 stagingCardsScript:html.includes('./v454-creature-art.js?v=454'),
 stagingSceneScript:html.includes('./v45-scene.js?v=454'),
 isolatedQAIncludesTests:qaHtml.includes('./v45-qa.js?v=454')&&
  fs.readFileSync('v45-qa.js','utf8').includes('14 SECOND-BATCH CREATURE TESTS'),
 v454SpritesAreDistinct:scene.includes('const v454Rows={Q:0,R:1,S:2,T:3}')&&
  scene.includes('v454FrameReady()')&&
  scene.includes('latest?v454Frames'),
 artLoaderRejectsMissing:artwork.includes("const transparent='data:image/gif")&&
  artwork.includes('checks.transparentCutouts')&&artwork.includes('checks.distinctPaintings'),
 actualArtInRepository:assets.every(a=>fs.existsSync(a)&&fs.statSync(a).size>8000),
 manifestAndFrames:manifest.version==='4.5.4'&&
  JSON.stringify(manifest.characters)===JSON.stringify(['Q','R','S','T'])&&
  manifest.frames_per_character===22,
 offlineCacheIncludesActualArtwork:assets.every(a=>sw.includes(a+'?v=454')),
 roadmapStop:fs.readFileSync('DOMINION_ROADMAP.md','utf8').includes('Mandatory stopping point after v4.7')
};
console.log(JSON.stringify(checks,null,2));
if(Object.values(checks).some(v=>v!==true))process.exitCode=1;
