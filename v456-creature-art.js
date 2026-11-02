/* Dominion v4.5.6 — exact painted character identity.
 * ONLY four approved Y/Z/aa/ab image assets are accepted. The collection must
 * remain art-gated while these files do not exist or fail dimensions.
 * This script never mutates battle state, profile, decks, or network messages.
 */
(()=>{
 'use strict';
 const art=window.AetherArt;
 if(!art)return;
 const ids=['Y','Z','aa','ab'],cardW=128,cardH=96,spriteW=96,spriteH=120;
 const atlas={
  cards:{image:new Image(),url:'./art/cards-creatures-v456.webp?v=456',w:cardW*4,h:cardH},
  units:{image:new Image(),url:'./art/units-creatures-v456.png?v=456',w:spriteW*4,h:spriteH}
 };
 const originalCard=art.get.bind(art),originalSprite=art.sprite?.bind(art);
 const transparent='data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
 const failures=[],cache=new Map(),
  checks={distinctPaintings:false,transparentCutouts:false,nonemptyCutouts:false};
 const status={cards:false,units:false,errors:failures};
 // Real pixel checks are required: correct image dimensions alone cannot
 // distinguish four original paintings from copies or solid backgrounds.
 function inspectSheet(name){
  const source=atlas[name],image=source.image;
  if(!image.complete||image.naturalWidth!==source.w||image.naturalHeight!==source.h)return;
  try{
   const canvas=document.createElement('canvas');
   canvas.width=source.w;canvas.height=source.h;
   const ctx=canvas.getContext('2d',{willReadFrequently:true});
   if(!ctx)throw Error('Image inspection canvas unavailable');
   ctx.drawImage(image,0,0);
   const rgba=ctx.getImageData(0,0,source.w,source.h).data;
   const w=name==='cards'?cardW:spriteW,h=name==='cards'?cardH:spriteH;
   const signatures=[];
   for(let slot=0;slot<4;slot++){
    let hash=2166136261,opaque=0,clear=0;
    for(let y=0;y<h;y+=2)for(let x=0;x<w;x+=2){
     const offset=(y*source.w+slot*w+x)*4,alpha=rgba[offset+3];
     if(alpha>=80)opaque++;else if(alpha<=12)clear++;
     for(let k=0;k<4;k++){hash^=rgba[offset+k];hash=Math.imul(hash,16777619)}
    }
    signatures.push(hash>>>0);
    if(name==='units'){
     if(opaque<70)failures.push('Sprite '+ids[slot]+' is mostly empty');
     if(clear<200)failures.push('Sprite '+ids[slot]+' has no transparent background');
    }
   }
   if(name==='cards'){
    checks.distinctPaintings=new Set(signatures).size===4;
    if(!checks.distinctPaintings)failures.push('Duplicated v4.5.6 card painting crop');
   }else{
    checks.transparentCutouts=Array.from({length:4},(_,slot)=>{
     let clear=0;
     for(let y=0;y<h;y+=2)for(let x=0;x<w;x+=2){
      if(rgba[(y*source.w+slot*w+x)*4+3]<=12)clear++;
     }
     return clear>=200;
    }).every(Boolean);
    checks.nonemptyCutouts=Array.from({length:4},(_,slot)=>{
     let opaque=0;
     for(let y=0;y<h;y+=2)for(let x=0;x<w;x+=2){
      if(rgba[(y*source.w+slot*w+x)*4+3]>=80)opaque++;
     }
     return opaque>=70;
    }).every(Boolean);
   }
  }catch(e){failures.push(name+' pixel inspection: '+String(e))}
 }
 function refresh(){
  for(const [name,set] of Object.entries(atlas)){
   status[name]=!!(set.image.complete&&set.image.naturalWidth===set.w&&
    set.image.naturalHeight===set.h);
   if(status[name])inspectSheet(name);
  }
  cache.clear();
  window.dispatchEvent(new Event('aether-card-art-ready'));
 }
 function slice(name,id){
  const source=atlas[name],idx=ids.indexOf(id);
  if(idx<0)return transparent;
  if(!status[name])return transparent;
  const key=name+'-'+id;
  if(cache.has(key))return cache.get(key);
  try{
   const tile=document.createElement('canvas');
   const w=name==='cards'?cardW:spriteW;
   const h=name==='cards'?cardH:spriteH;
   tile.width=w;tile.height=h;
   const ctx=tile.getContext('2d',{alpha:true});
   if(!ctx)throw Error('Canvas context unavailable');
   ctx.imageSmoothingEnabled=false;
   ctx.drawImage(source.image,idx*w,0,w,h,0,0,w,h);
   const out=tile.toDataURL('image/png');
   cache.set(key,out);
   return out;
  }catch(err){
   failures.push(name+'/'+id+': '+String(err));return transparent;
  }
 }
 for(const [name,source] of Object.entries(atlas)){
  source.image.decoding='async';
  source.image.addEventListener('load',()=>{
   if(source.image.naturalWidth!==source.w||source.image.naturalHeight!==source.h)
    failures.push(name+' atlas: expected '+source.w+'×'+source.h+
     ', got '+source.image.naturalWidth+'×'+source.image.naturalHeight);
   refresh();
  });
  source.image.addEventListener('error',()=>{
   failures.push('Failed to load '+name+' atlas: '+source.url);
   refresh();
  });
  source.image.src=source.url;
 }
 art.get=id=>ids.includes(id)?slice('cards',id):originalCard(id);
 art.card=art.get;
 art.sprite=id=>ids.includes(id)?slice('units',id):originalSprite?.(id)||transparent;
 art.v456ArtStatus=()=>({
  ids:ids.slice(),cards:status.cards,units:status.units,
  complete:status.cards&&status.units&&checks.distinctPaintings&&
   checks.transparentCutouts&&checks.nonemptyCutouts&&failures.length===0,
  checks:{...checks},
  cardDimensions:[atlas.cards.image.naturalWidth||0,atlas.cards.image.naturalHeight||0],
  unitDimensions:[atlas.units.image.naturalWidth||0,atlas.units.image.naturalHeight||0],
  errors:failures.slice(),sources:[atlas.cards.url,atlas.units.url]
 });
})();
