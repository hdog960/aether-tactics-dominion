/* Aether Tactics: Dominion v3.3 — unified illustrated card-art pipeline.
   Replaces flat polygon card portraits using the game's original detailed
   fantasy atlas as a source for themed, textured variants. No save changes.
   Battle sprites remain on their transparent sprite pipeline. */
(()=>{
'use strict';
const A=window.AetherArt;
if(!A)return;
const sprite=A.get.bind(A),terrain=A.terrain.bind(A);
const baseKeys={v:0,r:1,b:2,s:3,f:4,g:5,a:6};
const profiles={
 t:{base:'g',hue:15,color:'#ffbd5e',mode:'embers',seed:19},l:{base:'f',hue:155,color:'#87eaf8',mode:'tide',seed:27},
 m:{base:'a',hue:160,color:'#ffb274',mode:'meteor',seed:21},w:{base:'b',hue:90,color:'#bba5ff',mode:'ward',seed:11},h:{base:'r',hue:61,color:'#fee3a0',mode:'healing',seed:37},
 c:{base:'r',hue:260,color:'#ffc06a',mode:'embers',seed:45},j:{base:'v',hue:75,color:'#9bee9e',mode:'vines',seed:56},p:{base:'f',hue:173,color:'#87f1de',mode:'tide',seed:68},
 k:{base:'v',hue:200,color:'#b5e5ff',mode:'storm',seed:79},d:{base:'f',hue:128,color:'#c9fcff',mode:'wisp',seed:83},
 q:{base:'s',hue:96,color:'#94f6d5',mode:'speed',seed:92},e:{base:'a',hue:49,color:'#b3f1ff',mode:'frost',seed:105},
 i:{base:'a',hue:190,color:'#ffb76e',mode:'embers',seed:118},n:{base:'b',hue:275,color:'#ffe29d',mode:'rally',seed:123},
 x:{base:'a',hue:110,color:'#adffe6',mode:'healing',seed:132},o:{base:'r',hue:105,color:'#d1b1ff',mode:'echo',seed:143},
 y:{base:'g',hue:120,color:'#a8e8b5',mode:'crypt',seed:154},z:{base:'b',hue:74,color:'#aabaff',mode:'runes',seed:165},
 A:{base:'s',hue:237,color:'#ffa6bb',mode:'shadow',seed:174},B:{base:'b',hue:37,color:'#fff1b9',mode:'rally',seed:182},
 C:{base:'a',hue:120,color:'#c1b6ff',mode:'echo',seed:199},D:{base:'s',hue:55,color:'#d2acff',mode:'shadow',seed:208},
 E:{base:'f',hue:75,color:'#bbfbf3',mode:'twin',seed:217},F:{base:'g',hue:266,color:'#ff9f98',mode:'ritual',seed:229},
 G:{base:'a',hue:33,color:'#cce6f9',mode:'runes',seed:241}
};
const shades={
 v:'#427eb6',r:'#648f52',b:'#ad8e52',s:'#764694',f:'#3173ba',g:'#b16c44',a:'#559cde'
};
const ready=new Map(),source=new Image();
let atlasReady=false;
const clamp=(x,min,max)=>Math.max(min,Math.min(max,x));
function rng(seed){let s=seed|0;return ()=>{s=(s*1664525+1013904223)|0;return (s>>>0)/4294967296}}
function pix(ctx,x,y,w,h,fill){ctx.fillStyle=fill;ctx.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h))}
function hexRgb(hex){return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16))}
function build(id){
 const spec=profiles[id];if(!spec||!atlasReady)return null;
 const w=112,h=152,cv=document.createElement('canvas'),g=cv.getContext('2d',{willReadFrequently:true});
 if(!g)return null;cv.width=w;cv.height=h;g.imageSmoothingEnabled=false;
 const r=rng(spec.seed),col=hexRgb(spec.color);
 // Rich low-resolution battlefield environment painted in layered steps.
 const bd=g.createLinearGradient(0,0,w,h);bd.addColorStop(0,'#11162b');bd.addColorStop(.43,'#263348');bd.addColorStop(1,'#0d1226');
 g.fillStyle=bd;g.fillRect(0,0,w,h);
 for(let i=0;i<125;i++){
  const x=r()*w,y=r()*h,alpha=(r()*.2+.08).toFixed(3);
  pix(g,x,y,r()>0.8?3:1,r()>0.75?3:1,'rgba('+col.join(',')+','+alpha+')');
 }
 // Carved ruins + halo, always behind the detailed figure.
 g.save();g.globalAlpha=.3;
 for(let i=0;i<6;i++){const xx=-2+i*23;pix(g,xx,47,11,95,'#172137');pix(g,xx+3,47,3,57,'#536070')}
 g.globalAlpha=.22;
 for(let i=0;i<5;i++){g.strokeStyle=spec.color;g.lineWidth=2;g.beginPath();g.arc(56,73,18+i*11,-Math.PI*.8,Math.PI*.73);g.stroke()}
 g.restore();
 // Composited original hand-painted pixels, not geometric placeholders.
 const frame=source.naturalWidth/7,srcH=source.naturalHeight;
 const sx=frame*baseKeys[spec.base],sy=srcH*.17;
 const srcX=sx+frame*.18,srcW=frame*.78,srcY=sy,srcHeight=srcH*.81;
 g.save();
 g.filter='hue-rotate('+spec.hue+'deg) saturate(1.23) contrast(1.12)';
 g.globalAlpha=.98;
 g.drawImage(source,srcX,srcY,srcW,srcHeight,-4,14,120,135);
 g.restore();
 // Radial composited lighting ties each portrait to its own spell/biome.
 const rad=g.createRadialGradient(56,82,7,56,82,79);
 rad.addColorStop(0,'rgba('+col.join(',')+',0.00)');rad.addColorStop(.7,'rgba('+col.join(',')+',0.06)');rad.addColorStop(1,'rgba(8,10,24,.76)');
 g.fillStyle=rad;g.fillRect(0,0,w,h);
 // Distinctive pixel-art effects for each named role. Positioned away
 // from the central character face/body and readable at iPhone size.
 const kind=spec.mode,ct=spec.color;
 if(['embers','meteor','ritual'].includes(kind)){
   for(let i=0;i<55;i++){
     const x=r()*w,y=r()*150,flame=r()*6+2;
     pix(g,x,y,2,flame,i%5===0?'#fff3b8':ct);
     if(i%7===0)pix(g,x-2,y+3,1,6,'#db664c');
   }
   if(kind==='meteor'){
     for(let j=0;j<3;j++){
       g.strokeStyle='#ffcf86';g.lineWidth=3+j;g.beginPath();
       g.moveTo(16+j*27,20);g.lineTo(40+j*24,55+j*4);g.stroke()
     }
   }
 }
 if(['frost','storm','speed','twin'].includes(kind)){
   for(let i=0;i<11;i++){
     const x=r()*w,y=r()*h;
     g.strokeStyle=i%2===0?'#f3f9ff':ct;g.lineWidth=1+i%3;
     g.beginPath();g.moveTo(x,y);g.lineTo(x+(kind==='speed'?25:10),y-(kind==='frost'?18:26));g.stroke();
   }
   if(kind==='frost'){
     for(let i=0;i<9;i++){let x=r()*w,y=68+r()*70;g.strokeStyle='#ddfaff';g.lineWidth=2;g.beginPath();g.moveTo(x-9,y+8);g.lineTo(x,y-18);g.lineTo(x+9,y+8);g.stroke()}
   }
 }
 if(['healing','ward','runes','echo','rally','twin','ritual','wisp'].includes(kind)){
   for(let i=0;i<8;i++){
     const ang=(i/8)*Math.PI*2+.2,rr=35+(i%3)*9;
     const x=56+Math.cos(ang)*rr,y=73+Math.sin(ang)*rr*1.25;
     g.strokeStyle=i%3===0?'#fff5d5':ct;g.lineWidth=i%3===0?2:1;
     g.beginPath();g.moveTo(x-4,y);g.lineTo(x+4,y);g.moveTo(x,y-4);g.lineTo(x,y+4);g.stroke()
   }
 }
 if(['vines','crypt','shadow','tide'].includes(kind)){
   for(let i=0;i<8;i++){
     const startX=i%2?104:7,startY=25+i*16;
     g.strokeStyle=i%3===0?'#c5efb1':ct;g.lineWidth=2+i%2;
     g.beginPath();g.moveTo(startX,startY);g.quadraticCurveTo(56,48+r()*110,52+r()*21,95+r()*30);g.stroke();
   }
 }
 if(kind==='wisp'){
   g.save();g.globalCompositeOperation='screen';
   for(let i=0;i<17;i++){const x=r()*110,y=r()*130;pix(g,x,y,3+r()*3,3+r()*3,i%3?'#afe7ff':'#fffbd6')}
   g.restore()
 }
 // Frame highlight and dense pixel grain; card cost is an HTML overlay,
 // never baked into generated artwork.
 g.strokeStyle='rgba(250,219,164,.32)';g.lineWidth=2;g.strokeRect(2,2,108,148);
 g.fillStyle='rgba(7,12,26,.60)';g.fillRect(0,0,34,25);
 for(let i=0;i<130;i++){
  const x=(r()*w)|0,y=(r()*h)|0;
  pix(g,x,y,1,1,i%3===0?'rgba(255,245,218,.18)':'rgba(10,15,32,.32)');
 }
 return cv.toDataURL('image/png');
}
function card(id){
 if(!profiles[id])return sprite(id);
 if(ready.has(id))return ready.get(id);
 if(!atlasReady)return sprite(id); // Offline-safe transient fallback.
 const url=build(id);if(url)ready.set(id,url);
 return url||sprite(id);
}
source.onload=()=>{
 if(!source.naturalWidth||source.naturalWidth<7){return}
 atlasReady=true;
 Object.keys(profiles).forEach(id=>card(id));
 window.dispatchEvent(new Event('aether-card-art-ready'));
};
source.src='./art/cards.png';
window.AetherArt={get:card,sprite,terrain,card,ready:()=>atlasReady,
 coverage:()=>Object.keys(profiles)};
})();