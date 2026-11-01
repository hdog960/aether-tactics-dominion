/* Dominion v4.5.3 — exact painted character identity.
 * ONLY four approved M/N/O/P image assets are accepted. The collection must
 * remain art-gated while these files do not exist or fail dimensions.
 * This script never mutates battle state, profile, decks, or network messages.
 */
(()=>{
 'use strict';
 const art=window.AetherArt;
 if(!art)return;
 const ids=['M','N','O','P'],cardW=128,cardH=96,spriteW=96,spriteH=120;
 const atlas={
  cards:{image:new Image(),url:'./art/cards-creatures-v453.webp?v=453',w:cardW*4,h:cardH},
  units:{image:new Image(),url:'./art/units-creatures-v453.png?v=453',w:spriteW*4,h:spriteH}
 };
 const originalCard=art.get.bind(art),originalSprite=art.sprite?.bind(art);
 const transparent='data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
 const failures=[],cache=new Map(),status={cards:false,units:false,errors:failures};
 function refresh(){
  for(const [name,set] of Object.entries(atlas)){
   status[name]=!!(set.image.complete&&set.image.naturalWidth===set.w&&
    set.image.naturalHeight===set.h);
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
 art.v453ArtStatus=()=>({
  ids:ids.slice(),cards:status.cards,units:status.units,
  complete:status.cards&&status.units,
  cardDimensions:[atlas.cards.image.naturalWidth||0,atlas.cards.image.naturalHeight||0],
  unitDimensions:[atlas.units.image.naturalWidth||0,atlas.units.image.naturalHeight||0],
  errors:failures.slice(),sources:[atlas.cards.url,atlas.units.url]
 });
})();
