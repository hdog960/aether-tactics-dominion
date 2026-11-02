import fs from 'node:fs';
import crypto from 'node:crypto';
const read=f=>fs.readFileSync(f,'utf8'),has=f=>fs.existsSync(f);
const errors=[],checks=[];
const test=(n,condition)=>{checks.push({name:n,pass:!!condition});if(!condition)errors.push(n)};
const html=read('index.html'),alternate=read('v30.html'),qaHtml=read('qa-v39.html');
const sw=read('sw.js'),engine=read('v45-engine.js'),scene=read('v45-scene.js');
const release=x=>/window\.DOMINION_V457_ART_RELEASE\s*=\s*true/.test(x);
const active=release(html);
const asset='art/cards-spells-v457.webp',manifest='art/v457-spell-manifest.json';
const original='art/sources/v457-original-spells.png';
test('Both real entrypoints agree on release flag',release(html)===release(alternate));
test('Source engine matches QA engine exactly',engine===read('v45-qa-engine.js'));
test('Real renderer matches QA renderer exactly',scene===read('v45-qa-scene.js'));
test('All four new spell keys are defined separately',["ac","ad","ae","af"].every(k=>
 new RegExp("\\b"+k+":\\{name:").test(engine)));
test('All new spell names are in Grimoire',["Gravemire Ring","Prism Relay","Cinder Bloom","Tidal Reprieve"].every(n=>engine.includes(n)));
test('All three entrypoints use original new artwork adapter',
 [html,alternate,qaHtml].every(x=>x.includes('v457-spell-art.js?v=457')));
test('Original painting is permanently archived',has(original));
test('Asset file and provenance manifest must travel together',has(asset)===has(manifest));
test('No unfinished new cards can be released',!active||(has(original)&&has(asset)&&has(manifest)));
test('Stop after v4.7 preserved',read('DOMINION_ROADMAP.md').includes('Mandatory stopping point after v4.7'));
if(has(asset)&&has(manifest)){
 try{
  const m=JSON.parse(read(manifest));
  const actual=crypto.createHash('sha256').update(fs.readFileSync(original)).digest('hex');
  test('Original painting SHA-256 matches build manifest',m.source?.sha256===actual);
  test('Original image dimensions large and square',m.source?.dimensions?.length===2&&
   Math.min(...m.source.dimensions)>=1024&&
   Math.abs(m.source.dimensions[0]-m.source.dimensions[1])<Math.max(...m.source.dimensions)*.09);
  test('Four distinct original scenes are credited in exact order',
   JSON.stringify(m.keys)===JSON.stringify(['ac','ad','ae','af'])&&m.unique_paintings===4);
  test('Portrait atlas has four 128x96 cells',m.width===512&&m.height===96&&
   m.cell_width===128&&m.cell_height===96);
  test('Real atlas binary is non-empty',fs.statSync(asset).size>6000);
 }catch(e){test('Manifest parsing and checksumming',false)}
}
if(active){
 test('New original atlas is precached for PWA offline play',
  sw.includes('./art/cards-spells-v457.webp?v=457'));
 test('A new v457 service-worker cache version was created',
  sw.includes('v457')&&sw.includes('20261102'));
}
console.log(JSON.stringify({pass:errors.length===0,release:active,checks,errors},null,2));
if(errors.length)process.exitCode=1;
