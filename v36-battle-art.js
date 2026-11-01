/* AETHER TACTICS: DOMINION v3.6 — Eight painted unit identities.
 * Painted characters from the 18-character art study become exact transparent
 * battle sprites AND the subjects of their matching playable card portraits.
 * Display only: no rules, card definitions, saves or network changes. */
(()=>{
 'use strict';
 const Art=window.AetherArt;if(!Art)return;
 const oldCard=Art.get.bind(Art),oldSprite=Art.sprite.bind(Art),oldInfo=Art.battleInfo?.bind(Art);
 const ids=['p','k','d','o','y','z','A','B'];
 const profiles={
  p:{label:'Tidecaller',aura:'#8de5e7',bg:'frost',icon:'tide'},
  k:{label:'Storm Lancer',aura:'#c0d7ff',bg:'crown',icon:'storm'},
  d:{label:'Wisp Familiar',aura:'#a3e6ff',bg:'frost',icon:'wisp'},
  o:{label:'Echo Scribe',aura:'#d6edb0',bg:'verdant',icon:'script'},
  y:{label:'Crypt Keeper',aura:'#ce9df6',bg:'crown',icon:'crypt'},
  z:{label:'Rune Conductor',aura:'#a0baff',bg:'crown',icon:'rune'},
  A:{label:'Dusk Reclaimer',aura:'#efa4ff',bg:'crown',icon:'shadow'},
  B:{label:'Oath Sentinel',aura:'#f5da93',bg:'verdant',icon:'oath'}
 };
 const newAtlas=new Image();newAtlas.decoding='async';
 const landscapes={};
 const cache=new Map();
 const transparent='data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
 const notify=()=>{
  cache.clear();
  if(typeof Event==='function')window.dispatchEvent(new Event('aether-card-art-ready'));
 };
 newAtlas.addEventListener('load',notify);
 newAtlas.src='./art/units-painted-v36.png';
 const bgLoad=['verdant','frost','crown'];
 for(const type of bgLoad){
  const image=new Image();image.decoding='async';
  image.addEventListener('load',notify);
  image.src='./art/ui-'+type+'.svg';
  landscapes[type]=image;
 }
 function getScene(id){
  if(cache.has(id))return cache.get(id);
  if(!newAtlas.complete||!newAtlas.naturalWidth)return transparent;
  const profile=profiles[id],index=ids.indexOf(id);
  if(!profile||index<0)return oldCard(id);
  const canvas=document.createElement('canvas');canvas.width=160;canvas.height=120;
  const c=canvas.getContext('2d');if(!c)return transparent;
  c.imageSmoothingEnabled=false;
  const bg=landscapes[profile.bg];
  if(bg&&bg.complete&&bg.naturalWidth){
   c.save();c.imageSmoothingEnabled=true;
   // Region illustration adds landscape depth without a flat icon backdrop.
   const ratio=Math.max(160/bg.naturalWidth,120/bg.naturalHeight);
   const w=bg.naturalWidth*ratio,h=bg.naturalHeight*ratio;
   c.drawImage(bg,(160-w)/2,(120-h)/2,w,h);c.restore();
  }else{
   const g=c.createLinearGradient(0,0,160,120);
   g.addColorStop(0,'#182b46');g.addColorStop(.45,'#4b3a64');g.addColorStop(1,'#0d1224');
   c.fillStyle=g;c.fillRect(0,0,160,120);
  }
  const vign=c.createLinearGradient(0,0,0,120);
  vign.addColorStop(0,'#10122622');vign.addColorStop(.5,'#070a1744');vign.addColorStop(1,'#090b18ee');
  c.fillStyle=vign;c.fillRect(0,0,160,120);
  // A softly glowing aura is not used to replace missing detail; this is the
  // very same real painted sprite that appears on the tactical battlefield.
  c.save();c.shadowColor=profile.aura;c.shadowBlur=22;
  c.drawImage(newAtlas,index*96,0,96,120,28,2,104,120);
  c.restore();
  c.strokeStyle=profile.aura;c.globalAlpha=.6;c.lineWidth=1.7;
  c.strokeRect(1,1,158,118);
  c.globalAlpha=1;
  let url;
  try{url=canvas.toDataURL('image/png')}catch(e){url=transparent}
  cache.set(id,url);return url;
 }
 Art.get=id=>profiles[id]?getScene(id):oldCard(id);
 Art.card=Art.get;
 Art.sprite=id=>{
  if(!profiles[id]||!newAtlas.complete||!newAtlas.naturalWidth)return oldSprite(id);
  // Individual cutouts for the DOM renderer and other art consumers.
  const key='sprite:'+id;
  if(cache.has(key))return cache.get(key);
  const cv=document.createElement('canvas');cv.width=96;cv.height=120;
  const c=cv.getContext('2d');c.imageSmoothingEnabled=false;
  c.drawImage(newAtlas,ids.indexOf(id)*96,0,96,120,0,0,96,120);
  const uri=cv.toDataURL('image/png');cache.set(key,uri);return uri;
 };
 Art.battleInfo=id=>profiles[id]?{source:'v36',index:ids.indexOf(id),tone:'none',width:96,height:120}:oldInfo?.(id)||null;
 Art.paintingInfo=()=>({painted:ids.slice(),cards:ids.length,source:'./art/units-painted-v36.png'});
})();
