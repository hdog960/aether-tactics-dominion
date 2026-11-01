/* Aether Tactics v3.5 - card identity on the battlefield.
 * Existing illustrated six-unit atlas remains authoritative for the classics.
 * New transparent cutouts are taken from original high-detail card paintings.
 * Each additional summon uses a painted fantasy unit (never flat card art).
 * The battle remains tile-first; this layer is display-only. */
(()=>{
 'use strict';
 const Art=window.AetherArt;if(!Art)return;
 const prior=Art.sprite.bind(Art),previousCard=Art.get.bind(Art),done=new Map(),paintedCards=new Map();
 const cardKeys={t:0,l:1,c:2,j:3,h:4,w:5,m:6};
 const painting=new Image();painting.decoding='async';
 Art.get=id=>{
  const index=cardKeys[id];
  if(index===undefined||!painting.complete||!painting.naturalWidth)return previousCard(id);
  if(!paintedCards.has(id)){
   try{
    const c=document.createElement('canvas');c.width=128;c.height=96;
    const g=c.getContext('2d');g.imageSmoothingEnabled=false;
    g.drawImage(painting,index*128,0,128,96,0,0,128,96);
    paintedCards.set(id,c.toDataURL('image/png'));
   }catch(e){return previousCard(id)}
  }
  return paintedCards.get(id);
 };
 Art.card=Art.get;
 painting.addEventListener('load',()=>{
  paintedCards.clear();window.dispatchEvent(new Event('aether-card-art-ready'));
 });
 painting.src='./art/cards-painted-v35.webp';
 const painted=new Image();painted.decoding='async';painted.src='./art/units-painted-v35.png';
 const classics=new Image();classics.decoding='async';classics.src='./art/units-feet.png';
 const original={v:0,r:1,b:2,s:3,f:4,g:5};
 const special={t:0,l:1,c:2,j:3};
 const akin={
  p:['f','hue-rotate(24deg) saturate(1.4)'],
  k:['v','hue-rotate(18deg) saturate(1.2)'],
  d:['f','hue-rotate(36deg) brightness(1.23)'],
  o:['r','hue-rotate(63deg) saturate(1.12)'],
  y:['s','hue-rotate(72deg) saturate(.75)'],
  z:['b','hue-rotate(45deg) saturate(1.15)'],
  A:['s','hue-rotate(125deg) saturate(.94)'],
  B:['b','hue-rotate(-16deg) brightness(1.1)']
 };
 Art.battleInfo=id=>{
  if(special[id]!==undefined)return {source:'custom',index:special[id],tone:'none',width:64,height:88};
  const match=akin[id];
  if(match)return {source:'classic',index:original[match[0]],tone:match[1],width:128,height:148};
  return original[id]!==undefined?{source:'classic',index:original[id],tone:'none',width:128,height:148}:null;
 };
 function build(id){
  const spec=Art.battleInfo(id);if(!spec)return prior(id);
  const im=spec.source==='custom'?painted:classics;
  if(!im.complete||!im.naturalWidth)return prior(id);
  try{
   const c=document.createElement('canvas');
   c.width=spec.source==='custom'?64:128;c.height=spec.source==='custom'?88:148;
   const g=c.getContext('2d');
   if(!g)return prior(id);
   g.imageSmoothingEnabled=false;
   if(spec.tone!=='none')g.filter=spec.tone;
   g.drawImage(im,spec.index*spec.width,0,spec.width,spec.height,0,0,c.width,c.height);
   return c.toDataURL('image/png');
  }catch(e){return prior(id)}
 }
 Art.sprite=id=>{
  if(original[id]!==undefined)return prior(id);
  if(!Art.battleInfo(id))return prior(id);
  if(!done.has(id))done.set(id,build(id));
  return done.get(id);
 };
 const loaded=()=>{done.clear();window.dispatchEvent(new Event('aether-card-art-ready'))};
 painted.addEventListener('load',loaded);
 classics.addEventListener('load',loaded);
})();
