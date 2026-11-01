/* Dominion v4.5: native painted card art for the first four spells.
 * EXACTLY four 128x96 crops in art/cards-spells-v45.webp, order H/I/J/K.
 * Presentation only: no card data, energy, save, or network mutation.
 * Cards do not fall back to old procedural silhouettes during loading. */
(()=>{
 'use strict';
 const A=window.AetherArt;
 if(!A)return;
 const oldGet=A.get.bind(A);
 const ids=['H','I','J','K'],width=128,height=96;
 const atlas=new Image();atlas.decoding='async';
 const cache=new Map();
 const transparent='data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
 const state={loaded:false,error:null,width:0,height:0,source:'./art/cards-spells-v45.webp'};
 function update(){
  cache.clear();
  state.loaded=atlas.naturalWidth===width*4&&atlas.naturalHeight===height;
  state.width=atlas.naturalWidth||0;
  state.height=atlas.naturalHeight||0;
  if(!state.loaded)state.error='Spell atlas must be exactly 512×96.';
  window.dispatchEvent(new Event('aether-card-art-ready'));
 }
 atlas.addEventListener('load',update);
 atlas.addEventListener('error',()=>{
  state.loaded=false;state.error='Failed to fetch painted spell atlas';
  window.dispatchEvent(new Event('aether-card-art-ready'));
 });
 atlas.src='./art/cards-spells-v45.webp?v=4501';
 function painting(k){
  if(!state.loaded)return transparent;
  if(cache.has(k))return cache.get(k);
  try{
   const canvas=document.createElement('canvas');
   canvas.width=width;canvas.height=height;
   const cx=canvas.getContext('2d');
   if(!cx)return transparent;
   cx.imageSmoothingEnabled=false;
   cx.drawImage(atlas,ids.indexOf(k)*width,0,width,height,0,0,width,height);
   const result=canvas.toDataURL('image/png');
   cache.set(k,result);
   return result;
  }catch(err){state.error=String(err);return transparent}
 }
 A.get=k=>ids.includes(k)?painting(k):oldGet(k);
 A.card=A.get;
 A.v45SpellPainting=()=>({...state,ids:ids.slice()});
})();