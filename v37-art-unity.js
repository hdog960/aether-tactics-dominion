/* Aether Tactics: Dominion v3.7 — unified painted card and battlefield art.
 * Eight individually illustrated units come from the exact same scene paintings
 * as their card portraits. Ten spell cards use painted fantasy effects.
 * This is visual-only: no match rules, network messages, or save keys change. */
(()=>{
 'use strict';
 const A=window.AetherArt;
 if(!A)return;
 const oldCard=A.get.bind(A),oldSprite=A.sprite.bind(A);
 const oldInfo=A.battleInfo?.bind(A),oldPainting=A.paintingInfo?.bind(A);
 const units=['p','k','d','o','y','z','A','B'];
 const spells=['q','e','i','n','x','C','D','E','F','G'];
 const sources={
  characters:{image:new Image(),ids:units,src:'./art/cards-character-v37.webp?v=37',w:128,h:96},
  spells:{image:new Image(),ids:spells,src:'./art/cards-spells-v40.webp?v=40',w:128,h:96},
  sprites:{image:new Image(),ids:units,src:'./art/units-character-v37.png?v=37',w:96,h:120}
 };
 const cache=new Map(),transparent='data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
 const index=(arr,id)=>arr.indexOf(id);
 let notified=false;
 function notify(){
  cache.clear();
  window.dispatchEvent(new Event('aether-card-art-ready'));
 }
 for(const group of Object.values(sources)){
  group.image.decoding='async';
  group.image.addEventListener('load',notify);
  group.image.addEventListener('error',()=>{if(!notified){notified=true;console.warn('Dominion art atlas unavailable:',group.src)}});
  group.image.src=group.src;
 }
 function frame(group,id){
  const i=index(group.ids,id);
  if(i<0||!group.image.complete||!group.image.naturalWidth)return transparent;
  const key=group.src+':'+id;
  if(cache.has(key))return cache.get(key);
  try{
   const canvas=document.createElement('canvas');
   canvas.width=group.w;canvas.height=group.h;
   const context=canvas.getContext('2d');
   if(!context)return transparent;
   context.imageSmoothingEnabled=false;
   context.drawImage(group.image,i*group.w,0,group.w,group.h,0,0,group.w,group.h);
   const data=canvas.toDataURL('image/png');
   cache.set(key,data);return data;
  }catch(e){return transparent}
 }
 A.get=id=>{
  if(units.includes(id))return frame(sources.characters,id);
  if(spells.includes(id))return frame(sources.spells,id);
  return oldCard(id);
 };
 A.card=A.get;
 A.sprite=id=>units.includes(id)?frame(sources.sprites,id):oldSprite(id);
 A.battleInfo=id=>units.includes(id)?
  {source:'v37',index:index(units,id),tone:'none',width:96,height:120}:
  oldInfo?.(id)||null;
 A.paintingInfo=()=>({
  ...oldPainting?.(),
  matchingBattlefieldUnits:units.slice(),
  newPaintedSpellCards:spells.slice(),
  source:'./art/units-character-v37.png'
 });
})();