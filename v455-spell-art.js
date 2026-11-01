/* Dominion v4.5.5 — four genuinely distinct painted spell-card scenes.
 * Rendering only; never mutate cards, saves, energy, matchmaking or profiles.
 * No old artwork or shape-based substitute while asset is loading.
 */
(()=>{
 'use strict';
 const A=window.AetherArt;if(!A)return;
 const oldGet=A.get.bind(A),keys=['U','V','W','X'],tileW=128,tileH=96;
 const atlas=new Image(),cache=new Map();
 const blank='data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
 const state={ready:false,distinct:false,error:null,dimensions:[0,0],
  source:'./art/cards-spells-v455.webp?v=455'};
 const check=()=>{
  cache.clear();state.dimensions=[atlas.naturalWidth||0,atlas.naturalHeight||0];
  state.ready=atlas.complete&&atlas.naturalWidth===512&&atlas.naturalHeight===96;
  state.distinct=false;state.error=null;
  if(!state.ready)state.error='Four spell scenes require exact 512×96 atlas';
  else try{
   const canvas=document.createElement('canvas');canvas.width=512;canvas.height=96;
   const ctx=canvas.getContext('2d',{willReadFrequently:true});
   ctx.drawImage(atlas,0,0);
   const rgba=ctx.getImageData(0,0,512,96).data;
   const signatures=[];
   for(let i=0;i<4;i++){
    let hash=2166136261,variance=0;
    for(let y=0;y<96;y+=3)for(let x=0;x<128;x+=3){
     const z=(y*512+i*128+x)*4;
     for(let b=0;b<3;b++){hash^=rgba[z+b];hash=Math.imul(hash,16777619)}
     variance+=(rgba[z]-rgba[z+1])**2;
    }
    if(variance<10000)throw Error('Unfinished or flat painting '+keys[i]);
    signatures.push(hash>>>0);
   }
   state.distinct=new Set(signatures).size===4;
   if(!state.distinct)throw Error('Duplicated spell paintings');
  }catch(err){state.error=String(err)}
  window.dispatchEvent(new Event('aether-card-art-ready'));
 };
 atlas.decoding='async';atlas.addEventListener('load',check);
 atlas.addEventListener('error',()=>{
  state.ready=false;state.error='Failed to load v4.5.5 painted spell atlas';
  window.dispatchEvent(new Event('aether-card-art-ready'));
 });
 atlas.src=state.source;
 function painting(k){
  if(!state.ready||!state.distinct)return blank;
  if(cache.has(k))return cache.get(k);
  try{
   const tile=document.createElement('canvas');
   tile.width=128;tile.height=96;
   tile.getContext('2d').drawImage(atlas,keys.indexOf(k)*128,0,128,96,0,0,128,96);
   const src=tile.toDataURL('image/png');cache.set(k,src);return src;
  }catch(e){state.error=String(e);return blank}
 }
 A.get=k=>keys.includes(k)?painting(k):oldGet(k);
 A.card=A.get;
 A.v455ArtStatus=()=>({ids:keys.slice(),loaded:state.ready,
  distinct:state.distinct,complete:state.ready&&state.distinct&&!state.error,
  dimensions:state.dimensions.slice(),source:state.source,error:state.error});
})();
