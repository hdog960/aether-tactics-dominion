import fs from 'node:fs';
import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),exists=p=>fs.existsSync(p),errors=[],checks=[];
const test=(n,ok)=>{checks.push({name:n,pass:!!ok});if(!ok)errors.push(n)};
const html=read('index.html'),alt=read('v30.html'),qa=read('qa-v39.html'),sw=read('sw.js');
const engine=read('v45-engine.js'),scene=read('v45-scene.js');
const release=h=>/window\.DOMINION_V458_ART_RELEASE\s*=\s*true/.test(h);
const enabled=release(html),original='art/sources/v458-original-characters.png';
const assets=['art/cards-creatures-v458.webp','art/units-creatures-v458.png',
 'art/battlefield-frames-v458.webp','art/v458-art-manifest.json'];
test('Entry point release flags agree',enabled===release(alt));
test('Combat engine and QA source identical',engine===read('v45-qa-engine.js'));
test('Renderer and QA scene identical',scene===read('v45-qa-scene.js'));
test('All four new unique keys in actual engine',["ag","ah","ai","aj"].every(k=>
 new RegExp("\\b"+k+":\\{name:").test(engine)));
test('All new creature IDs appear in painted renderer',scene.includes('v458Rows={ag:0,ah:1,ai:2,aj:3}'));
test('Final original character PNG archived',exists(original));
test('Exactly four source-linked art assets or none',assets.every(exists)||assets.every(x=>!exists(x)));
test('Cannot release missing game art',!enabled||assets.every(exists)&&exists(original));
test('All three game entrypoints include image adapter', [html,alt,qa].every(h=>h.includes('v458-creature-art.js?v=458')));
test('Preserved mandatory stop at v4.7',read('DOMINION_ROADMAP.md').includes('Mandatory stopping point after v4.7'));
if(assets.every(exists)&&exists(original)){
 try{
  const m=JSON.parse(read(assets[3]));
  const sum=crypto.createHash('sha256').update(fs.readFileSync(original)).digest('hex');
  test('Original source hash equals manifest provenance',m.source?.sha256===sum);
  test('Four distinct character keys',JSON.stringify(m.characters)===JSON.stringify(['ag','ah','ai','aj']));
  test('Twenty-two frames per character',m.frames_per_character===22);
  test('Image has actual high resolution',Math.min(...m.source.dimensions)>=1024);
  for(const [file,dim] of assets.slice(0,3).map((p,i)=>[p,[[512,96],[384,120],[2112,480]][i]])){
   const entry=m.atlases?.[file.split('/').at(-1)];
   test(file+' manifest dimensions',JSON.stringify(entry?.dimensions)===JSON.stringify(dim));
   test(file+' actual data > 3KB',fs.statSync(file).size>3000);
  }
 }catch(e){test('Manifest valid original provenance',false)}
}
if(enabled){
 test('Published PWA caches original three art atlases',
  assets.slice(0,3).every(path=>sw.includes('./'+path+'?v=458')));
 test('Published app cache bumped to v458',sw.includes('aether-dominion-v458'));
}
console.log(JSON.stringify({pass:!errors.length,enabled,assetsReady:assets.every(exists),checks,errors},null,2));
if(errors.length)process.exitCode=1;
