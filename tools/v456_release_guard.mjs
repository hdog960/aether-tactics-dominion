// v4.5.6 fail-closed staging/release safety audit.
// Runs without real images. A missing source is ALLOWED only while art release
// is off: it must never expose incomplete creatures in the normal player UI.
import fs from 'node:fs';
import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8');
const exists=p=>fs.existsSync(p);
const html=read('index.html'),alternate=read('v30.html');
const engine=read('v45-engine.js'),qaEngine=read('v45-qa-engine.js');
const scene=read('v45-scene.js'),qaScene=read('v45-qa-scene.js');
const sw=read('sw.js'),art=read('v456-creature-art.js');
const roadmap=read('DOMINION_ROADMAP.md');
const source='art/sources/v456-original-characters.png';
const names=['art/cards-creatures-v456.webp','art/units-creatures-v456.png',
  'art/battlefield-frames-v456.webp','art/v456-art-manifest.json'];
const failures=[],checks=[];
function check(name,pass,detail){
 checks.push({name,pass:!!pass});
 if(!pass)failures.push(name+(detail?': '+detail:''));
}
const flag=(html)=>/window\.DOMINION_V456_ART_RELEASE\s*=\s*true/.test(html);
const release=flag(html),alternateRelease=flag(alternate);
const sourceAvailable=exists(source),outputs=names.map(exists);
check('Primary and alternate entrypoints agree on release gate',release===alternateRelease);
check('Production and QA combat source remain synchronized',engine===qaEngine);
check('Production and QA scene renderer remain synchronized',scene===qaScene);
check('New two-letter keys are distinct and explicit in combat source',
 ['Y','Z','aa','ab'].every(k=>new RegExp('(?:^|\\W)'+k+':\\{name:', 'm').test(engine)));
check('Art adapter maps all four exact IDs',
 art.includes("const ids=['Y','Z','aa','ab']"));
check('Battlefield animator maps all four independent rows',
 scene.includes('const v456Rows={Y:0,Z:1,aa:2,ab:3}'));
check('User-mandated stop after v4.7 remains in roadmap',
 roadmap.includes('Mandatory stopping point after v4.7')&&roadmap.includes('then **STOP**'));
check('New 52-card art gate requires real image build outputs',
 !release||sourceAvailable&&outputs.every(Boolean));
check('Absent original source cannot be accompanied by fake completed atlases',
 sourceAvailable||outputs.every(v=>!v));
if(outputs.some(Boolean)){
 check('Output image files and manifest appear as an indivisible set',outputs.every(Boolean));
 if(outputs.every(Boolean)){
  try{
   const m=JSON.parse(read(names[3]));
   check('Manifest names exact four distinct creature keys',
    JSON.stringify(m.characters)===JSON.stringify(['Y','Z','aa','ab']));
   check('Manifest has 22 frames per character',m.frames_per_character===22);
   check('Original painting is a high-resolution square source',
    Array.isArray(m.source?.dimensions)&&m.source.dimensions[0]>=1024&&
    m.source.dimensions[1]>=1024&&Math.abs(m.source.dimensions[0]-m.source.dimensions[1])<
    Math.max(...m.source.dimensions)*.09);
   check('Manifest contains genuine source SHA-256, not an empty sentinel',
    typeof m.source?.sha256==='string'&&/^[a-f0-9]{64}$/.test(m.source.sha256));
   if(sourceAvailable){
    const sum=crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex');
    check('Manifest source checksum matches actual archived input',sum===m.source?.sha256);
   }
   for(const name of names.slice(0,3)){
    const entry=m.atlases?.[name.split('/').at(-1)];
    const expected=name.includes('cards-')?[512,96]:name.includes('units-')?[384,120]:[2112,480];
    check(name+' dimensions documented',JSON.stringify(entry?.dimensions)===JSON.stringify(expected));
    check(name+' nonempty on disk',fs.statSync(name).size>2000);
   }
  }catch(err){check('Manifest parsing and provenance failed',false,String(err))}
 }
}
if(release){
 for(const url of [
  'art/cards-creatures-v456.webp','art/units-creatures-v456.png',
  'art/battlefield-frames-v456.webp']){
  check('Published PWA precaches '+url,sw.includes(url));
 }
 check('Release-gate script uses new art identity adapter',
  html.includes('v456-creature-art.js'));
}
console.log(JSON.stringify({pass:failures.length===0,release,sourceAvailable,
 outputCount:outputs.filter(Boolean).length,checks,failures},null,2));
if(failures.length)process.exitCode=1;
