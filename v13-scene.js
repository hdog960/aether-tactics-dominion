/* AETHER TACTICS v1.3 — cached continuous world + smoother combat animations */
(()=>{'use strict';
const W=720,H=960,cn=document.getElementById('battle-canvas'),board=document.getElementById('board');
if(!cn||!board)return;
cn.width=W;cn.height=H;
let c=cn.getContext('2d',{alpha:false});c.imageSmoothingEnabled=false;
// A pre-rendered world removes 56 expensive texture sampling operations PER FRAME.
const floorLayer=document.createElement('canvas');floorLayer.width=W;floorLayer.height=H;
const floorCtx=floorLayer.getContext('2d');floorCtx.imageSmoothingEnabled=false;
let floorValid=false;
let game=null,seat=0,selected=null,selectedCard=-1,tributes=[],frames=0,last=0;
// Logical positions are snapshotted BEFORE state changes reach the renderer.
// That allows client-side walk motion without delaying multiplayer-authoritative moves.
const lastPositions=new Map(),movements=new Map(),healthTweens=new Map();
const cache=new Map(),particles=Array.from({length:56},(_,i)=>({x:(i*479+71)%W,y:(i*337+161)%H,phase:i*2.12,speed:0.13+(i%5)*.075}));
// Art assets are committed binary image files, not runtime-generated mockups.
const scenic=new Image(),groundTexture=new Image(),monsterAtlas=new Image();
scenic.onload=()=>{floorValid=false};
groundTexture.onload=()=>{floorValid=false};
scenic.src='./art/panorama.png';groundTexture.src='./art/terrain-natural.jpg';monsterAtlas.src='./art/units-feet.png';
const monsterFrames={v:0,r:1,b:2,s:3,f:4,g:5};
const col={ink:'#081a2a',stone:'#526775',stone2:'#385363',moss:'#486e66',light:'#bbd3bb',gold:'#ddbc84',magic:'#75efdb',enemy:'#f68fb1'};
function imageFor(id){
 if(!cache.has(id)){let im=new Image();im.src=window.AetherArt.get(id);cache.set(id,im)}return cache.get(id)
}
function poly(pts,fill,stroke,width=2){
 c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)c.lineTo(pts[i][0],pts[i][1]);c.closePath();if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.lineWidth=width;c.strokeStyle=stroke;c.stroke()}
}
function line(a,b,color,width=2){c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(...a);c.lineTo(...b);c.stroke()}
function ellipse(x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill()}
function rnd(x,y,salt=0){const f=Math.sin((x*107.31+y*313.97+salt*27.81)*.318)*43758.5453;return f-Math.floor(f)}
function world(x,row){let t=row/8;let w=430+t*270;return [360+(t-.5)*29+(x/7-.5)*w,237+Math.pow(t,1.21)*518]}
function tile(x,y,lift=0){let a=world(x,y),b=world(x+1,y),d=world(x+1,y+1),e=world(x,y+1);return [a,b,d,e].map(z=>[z[0],z[1]-lift])}
const center=(x,y)=>{const p=world(x+.5,y+.72);return p};
function background(){
 c.fillStyle='#11243e';c.fillRect(0,0,W,H);
 // Illustrations rendered from real production art files, stretched across multiple scenic layers.
 if(scenic.complete&&scenic.naturalWidth){
  c.drawImage(scenic,0,0,W,397);
  c.save();c.globalAlpha=.43;c.drawImage(scenic,0,132,W,810);c.restore();
  const mist=c.createLinearGradient(0,350,0,960);
  mist.addColorStop(0,'#263b58b3');mist.addColorStop(.36,'#547b9370');mist.addColorStop(1,'#091b31cc');
  c.fillStyle=mist;c.fillRect(0,350,W,610);
 }else{
  const sky=c.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#22304e');sky.addColorStop(.35,'#b97c88');sky.addColorStop(.68,'#325170');sky.addColorStop(1,'#13263e');
  c.fillStyle=sky;c.fillRect(0,0,W,H);
 }
 // Crystalline sky islands and waterfalls become genuine parallax layers.
 for(let i=0;i<5;i++){
  const x=80+i*150,y=430+(i%3)*31,w=95+(i%2)*24;
  poly([[x-w/2,y-13],[x+w/2,y-13],[x+w*.43,y+14],[x+9,y+53],[x-15,y+50]],'#253f56b0','#6b8d9470',2);
  poly([[x-w/3,y-14],[x+w/3,y-14],[x+w/4,y+4],[x-w/4,y+4]],'#65857a70');
  if(i%2===0){
   const grad=c.createLinearGradient(x,y,x,y+150);
   grad.addColorStop(0,'#c6ffffac');grad.addColorStop(1,'#5f97ac00');
   poly([[x-14,y+8],[x+9,y+8],[x+14,y+155],[x-10,y+155]],grad);
  }
 }
}
function edgeStructures(t){
 // outer railing and pillars in parallax at platform sides
 for(let side of [0,1]){
 let x=side?W-47:46;
 let y=770;
 let rr=t/650;
 poly([[x-21,y+42],[x+22,y+42],[x+19,y-17],[x+9,y-45],[x-10,y-43],[x-19,y-17]],'#253c4a','#6e877c',4);
 poly([[x-14,y+23],[x+14,y+23],[x+10,y-14],[x-9,y-14]],'#587077');
 poly([[x-17,y-39],[x,y-79],[x+17,y-39],[x+9,y-25],[x-9,y-25]],'#5ee5cbbb','#a3fce0',3);
 ellipse(x,y-40,7+Math.sin(rr)*3,8,'#e3ffe2a8');
 for(let j=0;j<6;j++){line([x-14,y+29+j*4],[x+15,y+29+j*4],'#172c37',2)}
 }
}
function rock(x,y,w,fy,seed){
 const px=x,py=y;
 ellipse(px,py+3,w*.6,9,'#09213495');
 poly([[px-w*.55,py],[px-w*.48,py-20*fy],[px-w*.23,py-34*fy],[px+w*.17,py-41*fy],[px+w*.52,py-27*fy],[px+w*.58,py-3],[px+w*.29,py+7]],'#1e3545','#0e2733',3);
 poly([[px-w*.44,py-11],[px-w*.27,py-30*fy],[px+w*.09,py-37*fy],[px+w*.3,py-16],[px+w*.09,py]],'#587e83');
 poly([[px-w*.27,py-30*fy],[px+w*.08,py-37*fy],[px+w*.29,py-18],[px-w*.11,py-19]],'#acb5a2');
 for(let i=0;i<4;i++){let a=rnd(seed,i);line([px-w*.35+a*w*.2,py-23*fy+i*2],[px-w*.23+a*w*.3,py-11*fy+i*5],'#8ed6b088',2)}
}
function crystal(x,y,scale,hostile=false,t=0){
 ellipse(x,y+3,26*scale,9*scale,'#031a2777');
 poly([[x-25*scale,y],[x-18*scale,y-14*scale],[x+17*scale,y-15*scale],[x+25*scale,y]],'#425d6c','#1a3348',2);
 const col=hostile?'#f4aac7':'#90ffe2',inner=hostile?'#ad4c91':'#2d9fa4';
 poly([[x-13*scale,y-6*scale],[x-6*scale,y-56*scale],[x+10*scale,y-75*scale],[x+18*scale,y-24*scale],[x+11*scale,y-5*scale]],inner,'#c4fff0',2);
 poly([[x-6*scale,y-56*scale],[x+10*scale,y-75*scale],[x+5*scale,y-20*scale]],col);
 poly([[x-10*scale,y-18*scale],[x-23*scale,y-28*scale],[x-21*scale,y-48*scale],[x-7*scale,y-38*scale]],inner,col,2);
 ellipse(x,y-30*scale,5*scale,21*scale,hostile?'#fba2c243':'#80ffff69');
 for(let i=0;i<5;i++){let a=i*2.3+t/1100,rr=(24+i*4)*scale;ellipse(x+Math.sin(a)*rr,y-30*scale+Math.cos(a)*rr*.5,2.5*scale,3*scale,col)}
}
function altar(x,y,scale,hostile=false,t=0){
 const col=hostile?'#c77caa':'#75dbc2';
 ellipse(x,y+5,36*scale,12*scale,'#091e3077');
 poly([[x-38*scale,y],[x-28*scale,y-16*scale],[x+27*scale,y-17*scale],[x+38*scale,y]],'#274456','#9f9780',3);
 poly([[x-25*scale,y-14*scale],[x-19*scale,y-51*scale],[x+18*scale,y-52*scale],[x+25*scale,y-14*scale]],'#5c6a70','#b0af99',3);
 poly([[x-24*scale,y-48*scale],[x,y-88*scale],[x+24*scale,y-48*scale],[x,y-25*scale]],hostile?'#844769':'#267d7f',col,4);
 poly([[x-19*scale,y-50*scale],[x,y-83*scale],[x,y-27*scale]],hostile?'#d490b9':'#b2fff0');
 ellipse(x,y-58*scale,12*scale,18*scale,hostile?'#ed8aac89':'#8efde58c');
 line([x-30*scale,y-40*scale],[x-13*scale,y-40*scale],col,3);
 line([x+13*scale,y-40*scale],[x+30*scale,y-40*scale],col,3);
}

// Visual-only FX. Match actions are immediately authoritative; the renderer
// plays each event afterwards, even when a unit dies and vanishes from state.
const activeFx=[];let fxSeen=0,fxInitialized=false;
const clamp01=v=>Math.max(0,Math.min(1,v));
function screenFor(ref){
 const x=seat===0?ref.x:6-ref.x,y=seat===0?ref.y:7-ref.y;
 const pt=center(x,y);
 const b=board.children[y*7+x];
 if(b?.className.includes('high'))pt[1]-=13;
 return pt;
}
function fxProg(fx,t){return clamp01((t-fx.born)/fx.duration)}
function fxImpact(fx){return fx.data.type==='strike'?(fx.data.kind==='ranged'?.61:.43):fx.data.type==='spell'?.36:.14}
function newFx(data,now,sequenceIndex=0){
 const moving=data.from?.id&&movements.get(data.from.id);
 const windup=moving?.duration||0;
 activeFx.push({data,born:now+sequenceIndex*75+windup,
  duration:data.type==='strike'?510:data.type==='spell'?640:490});
 if(activeFx.length>24)activeFx.splice(0,activeFx.length-24);
}
function unitPose(u,t){
 let dx=0,dy=0,flash=0,rotate=0;
 for(const fx of activeFx){
  const e=fx.data,p=fxProg(fx,t);
  if(t<fx.born||p>=1)continue;
  if(e.type==='strike'&&e.from?.id===u.id){
   const a=screenFor(e.from),b=screenFor(e.to);
   const delta=Math.max(1,Math.hypot(b[0]-a[0],b[1]-a[1]));
   const nx=(b[0]-a[0])/delta,ny=(b[1]-a[1])/delta;
   if(e.kind==='melee'){
    // A continuous rise-and-return lunge replaces the old jerky multiphase jumps.
    const lunge=p<.18?0:p<.43?Math.sin((p-.18)/.25*Math.PI/2)
      :p<.69?Math.cos((p-.43)/.26*Math.PI/2):0;
    const prepare=Math.sin(Math.PI*Math.min(1,p/.18))*.25;
    dx+=nx*(19*lunge-5*prepare);
    dy+=ny*(11*lunge-3*prepare)-3*Math.sin(Math.PI*p);
    rotate+=.052*Math.sin(Math.PI*2*p);
   }else{
    const recoil=p<.14?0:p<.38?Math.sin((p-.14)/.24*Math.PI/2):
     p<.63?Math.cos((p-.38)/.25*Math.PI/2):0;
    dx-=nx*7*recoil;dy-=ny*3*recoil;
    rotate+=.025*Math.sin(Math.PI*2*p);
   }
  }
  if((e.type==='strike'||e.type==='spell')&&e.to?.id===u.id){
   const impact=fxImpact(fx);
   if(p>=impact&&p<.9){
    const q=(p-impact)/(.9-impact);
    const kick=Math.sin(Math.PI*q)*Math.pow(1-q,.55);
    const origin=screenFor(e.from||e.to),point=screenFor(e.to);
    const distance=Math.max(1,Math.hypot(point[0]-origin[0],point[1]-origin[1]));
    dx+=((point[0]-origin[0])/distance*7+Math.sin(q*18)*1.0)*kick;
    dy-=3.2*kick;
    flash=Math.max(flash,Math.min(1,(p-impact)*16)*Math.pow(1-q,2)*.8);
    rotate+=.055*Math.sin(q*16)*(1-q);
   }
  }
 }
 // Clamp additive poses so overlapping attacks cannot teleport or flip sprites.
 return{dx:Math.max(-28,Math.min(28,dx)),dy:Math.max(-15,Math.min(15,dy)),
  flash,rotate:Math.max(-.13,Math.min(.13,rotate))};
}

function shownHealth(unit,t){
 const h=healthTweens.get(unit.id);
 if(!h)return unit.hp;
 if(t<=h.start)return h.from;
 const p=clamp01((t-h.start)/h.duration),ease=p*p*(3-2*p);
 if(p>=1){healthTweens.delete(unit.id);return h.to}
 return h.from+(h.to-h.from)*ease;
}

function drawMagicRing(pt,rad,color,alpha=1){
 c.save();c.globalAlpha=alpha;c.strokeStyle=color;c.lineWidth=3;
 c.beginPath();c.ellipse(pt[0],pt[1]-12,rad,rad*.43,0,0,Math.PI*2);c.stroke();
 c.restore();
}
function renderBattleFX(t){
 for(let i=activeFx.length-1;i>=0;i--)if(t-activeFx[i].born>activeFx[i].duration+180)activeFx.splice(i,1);
 c.save();
 for(const fx of activeFx){
  const e=fx.data,p=fxProg(fx,t);
  if(t<fx.born||p>=1)continue;
  const to=screenFor(e.to),from=e.from?screenFor(e.from):to;
  const core=!!e.to.core,impact=fxImpact(fx);
  const impactTime=(p-impact)/Math.max(.1,1-impact);
  if(e.type==='strike'&&e.kind==='ranged'){
   const q=clamp01((p-.18)/.43);
   if(p>.18&&p<.66){
    const sx=from[0],sy=from[1]-39,tx=to[0],ty=to[1]-(core?35:58);
    const px=sx+(tx-sx)*q,py=sy+(ty-sy)*q-18*Math.sin(Math.PI*q);
    c.save();c.shadowColor='#b0fcff';c.shadowBlur=16;
    c.strokeStyle='#e8ffff';c.lineWidth=3.2;c.lineCap='round';
    c.beginPath();c.moveTo(px-(tx-sx)*.10,py-(ty-sy)*.10);c.lineTo(px,py);c.stroke();
    ellipse(px,py,4,4,'#e4ffff');ellipse(px,py,8,3,'#72dbe5ad');c.restore();
   }
  }
  if(e.type==='strike'&&e.kind==='melee'&&p>.31&&p<.7){
   const v=clamp01((p-.31)/.39);
   c.save();c.globalAlpha=(1-v)*.9;c.shadowColor='#ffe4a1';c.shadowBlur=12;
   c.strokeStyle='#f9e6bd';c.lineWidth=5;c.lineCap='round';
   c.beginPath();
   const cx=to[0],cy=to[1]-50;
   c.arc(cx,cy,23+v*12,-2.3+v*1.6,-.2+v*1.6);
   c.stroke();c.restore();
  }
  if(e.type==='spell'){
   const col=e.kind==='cross'?'#ffc17e':'#abf8ff';
   const q=clamp01(p/.8);
   drawMagicRing(to,10+q*42,col,(1-q)*.8);
   if(p<.65){
    const beam=c.createLinearGradient(to[0],to[1]-110,to[0],to[1]+5);
    beam.addColorStop(0,col+'00');beam.addColorStop(.5,col+'99');beam.addColorStop(1,col+'00');
    c.fillStyle=beam;c.fillRect(to[0]-8-q*12,to[1]-120,16+q*24,130);
   }
  }
  if(e.type==='buff'){
   const color=e.kind==='heal'?'#93ffc3':'#b6dfff';
   const ring=clamp01(p/.85);
   drawMagicRing(to,8+ring*37,color,(1-ring)*.95);
   for(let n=0;n<6;n++){
    const angle=n*Math.PI/3+p*2;const rr=17+p*20;
    ellipse(to[0]+Math.cos(angle)*rr,to[1]-45+Math.sin(angle)*rr*.7,3,4,color);
   }
  }
  if((e.type==='strike'||e.type==='spell')&&p>=impact&&impactTime<=.7){
   const v=clamp01(impactTime/.5);
   drawMagicRing(to,9+v*27,e.blocked&&!e.amount?'#acd9ff':'#ffb59c',(1-v)*.75);
   const cx=to[0],cy=to[1]-(core?25:47);
   for(let n=0;n<9;n++){
    const angle=n*2.399+e.id*.13,rad=9+v*36;
    const px=cx+Math.cos(angle)*rad,py=cy+Math.sin(angle)*rad*.7;
    c.save();c.globalAlpha=(1-v)*.85;
    ellipse(px,py,2.6+((n*3)%3),2.4,n%2?'#ffe8b4':'#ff8d83');c.restore();
   }
  }
  if(e.lethal&&!e.to.core&&!game?.units?.some(u=>u.id===e.to.id)){
   // The authoritative state removes defeated monsters immediately, but the
   // visual echo remains through impact and collapses gracefully instead of
   // popping out of existence before the player even sees the blow.
   const spriteID=monsterFrames[e.to.k];
   if(spriteID!==undefined&&monsterAtlas.complete&&monsterAtlas.naturalWidth){
    const row=seat===0?e.to.y:7-e.to.y;
    const scale=(.58+row/8*.5)*1.04;
    const w=128*scale,h=152*scale;
    const collapse=clamp01((p-impact)/Math.max(.1,.96-impact));
    const opacity=p<impact?1:Math.pow(1-collapse,1.3);
    c.save();c.globalAlpha=opacity;
    const dy=to[1]-h+7*scale+collapse*25*scale;
    if(p>=impact&&p<impact+.16)c.filter='brightness(2.1) saturate(.45)';
    else if(e.to.team!==seat)c.filter='hue-rotate(135deg) saturate(1.2) brightness(.91)';
    c.drawImage(monsterAtlas,spriteID*128,0,128,148,
     to[0]-w/2,dy,w,h*(1-collapse*.13));
    c.restore();
   }
   if(p>=impact&&p<.91){
    const q=clamp01((p-impact)/(.91-impact));
    drawMagicRing([to[0],to[1]-30],12+48*q,'#ffceac',(1-q)*.75);
   }
  }
  if(e.type==='strike'||e.type==='spell'||e.type==='buff'){
   if(p>=impact&&p<1){
    const q=clamp01((p-impact)/(1-impact));
    const pop=Math.min(1,q/.16),rise=15+47*q;
    const amount=e.amount||0,blocked=e.blocked||0;
    const label=e.type==='buff'?(e.kind==='heal'?'+':'◇ +')+amount:amount?'-'+amount:blocked?'BLOCK':'0';
    if(!label)continue;
    c.save();c.globalAlpha=clamp01((1-q)*1.55)*pop;
    c.font='bold '+(q<.15?28:24)+'px Georgia,serif';
    c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';c.lineWidth=6;
    const y=to[1]-(core?49:94)-rise,x=to[0]+Math.sin(q*Math.PI)*6;
    c.strokeStyle='#0a182b';c.strokeText(label,x,y);
    c.fillStyle=e.type==='buff'?(e.kind==='heal'?'#a0ffc9':'#b5e2ff'):amount?'#ffdb90':'#afd7ff';
    c.shadowColor=c.fillStyle;c.shadowBlur=10;c.fillText(label,x,y);
    if(blocked&&amount){c.font='bold 15px system-ui';c.strokeText('◇ '+blocked,x,y+23);c.fillStyle='#b5e2ff';c.fillText('◇ '+blocked,x,y+23)}
    c.restore();
   }
  }
 }
 c.restore();
}

function drawCell(x,y,t,staticOnly=false){
 const idx=y*7+x,button=board.children[idx];if(!button)return;
 const flags=button.className,high=flags.includes('high'),rocky=flags.includes('rock'),spring=flags.includes('spring'),danger=y<=2,lift=high?13:0,points=tile(x,y,lift),floor=tile(x,y,lift-14-(high?8:0));
 // One continuous stone floor: tiles only add relief at genuine cliffs and edges.
 if(high||y===7)poly([points[3],points[2],floor[2],floor[3]],high?'#455565':'#354a51','#1c303b',1.4);
 if(high||x===6)poly([points[1],points[2],floor[2],floor[1]],high?'#293f4e':'#344850','#192f3c',1.3);
 const base=danger?'#555c66':y>=5?'#63756b':'#596d6b';
 poly(points,base);
 // Every tile clips a UNIQUE region of a single coherent 896x1024 ground painting.
 // Large moss patches, cracks and paving stones continue across tile boundaries.
 // Texture coordinates are world coordinates, never modulo-based repeated stamps.
 if(groundTexture.complete&&groundTexture.naturalWidth){
  const xx=Math.min(...points.map(p=>p[0])), yy=Math.min(...points.map(p=>p[1]));
  const ww=Math.max(...points.map(p=>p[0]))-xx, hh=Math.max(...points.map(p=>p[1]))-yy;
  c.save();
  c.beginPath();c.moveTo(...points[0]);for(let i=1;i<4;i++)c.lineTo(...points[i]);
  c.closePath();c.clip();
  c.drawImage(groundTexture,x*128,y*128,128,128,xx-1,yy-1,ww+2,hh+2);
  // Subtle faction ambience without replacing actual natural material.
  c.fillStyle=danger?'#83455b12':y>=5?'#54aa8110':'#b9b6a708';
  c.fillRect(xx-1,yy-1,ww+2,hh+2);
  c.restore();
 }
 // Tile boundaries are almost invisible in normal play; legal selections glow clearly.
 if(high){line(points[0],points[1],'#d3c49a97',2.4);line(points[1],points[2],'#1d3b4b99',1.3)}
 else if(y===7)line(points[3],points[2],'#b7c2a34c',1.4);
 const z=center(x,y);z[1]-=lift;
  if(!staticOnly&&(flags.includes('showdeploy')||flags.includes('showmove')||flags.includes('showattack')||flags.includes('selected')||flags.includes('tribute'))){
  const isDeploy=flags.includes('showdeploy'),isAttack=flags.includes('showattack')||flags.includes('tribute');
  let glow=isAttack?'#ffa9b6':flags.includes('selected')?'#ffe6aa':'#9cffe0';
  const pulse=.65+.25*Math.sin(t/240+x*1.1+y*.7);
  c.save();
  c.globalAlpha=pulse;
  poly(points,isDeploy?'#7bffcf4a':'#77ffdc2b',glow,isDeploy?7:5);
  ellipse(z[0],z[1],isDeploy?21:15,isDeploy?8:5,glow+'99');
  if(isDeploy){
   line([z[0]-10,z[1]],[z[0]+10,z[1]],'#ecfff0',2.6);
   line([z[0],z[1]-7],[z[0],z[1]+7],'#ecfff0',2.6);
  }
  c.restore();
 }
 if(rocky){rock(z[0],z[1]+3,35+15*y/8,.8+y/10,x+y*7)}
 if(spring)crystal(z[0],z[1]+6,.67+y*.035,false,t);
 const isHostBase=(y===7&&x===3),isRivalBase=(y===0&&x===3);
 if(isHostBase||isRivalBase)altar(z[0],z[1]+4,.72+y*.045,isRivalBase,t);
}

function drawHighlightLayer(t){
 for(let y=0;y<8;y++)for(let x=0;x<7;x++){
  const btn=board.children[y*7+x];if(!btn)continue;
  const flags=btn.className||'';
  if(!flags.includes('showdeploy')&&!flags.includes('showmove')&&!flags.includes('showattack')&&!flags.includes('selected')&&!flags.includes('tribute'))continue;
  const raise=flags.includes('high')?13:0,pts=tile(x,y,raise),point=center(x,y);point[1]-=raise;
  const deploy=flags.includes('showdeploy'),attack=flags.includes('showattack')||flags.includes('tribute'),picked=flags.includes('selected');
  const glow=attack?'#ffafb2':picked?'#ffe3a2':'#9bffe0';
  const alpha=.64+.18*Math.sin(t/270+x*.7+y*.4);
  c.save();c.globalAlpha=alpha;
  poly(pts,deploy?'#73ffd83b':'#5ed6ff21',glow,deploy?5:4);
  ellipse(point[0],point[1],deploy?20:14,deploy?7:5,glow+'7a');
  if(deploy){line([point[0]-8,point[1]],[point[0]+8,point[1]],'#ffffff',2);
   line([point[0],point[1]-5],[point[0],point[1]+5],'#ffffff',2)}
  c.restore();
 }
}
function drawCachedWorld(){
 if(!floorValid){
  const context=c;
  try{
   c=floorCtx;c.imageSmoothingEnabled=false;
   background();
   poly([[94,260],[626,260],[700,770],[633,823],[67,823],[10,774]],'#172e3e','#345261',7);
   poly([[94,263],[626,263],[693,760],[625,788],[80,788],[23,764]],'#385965');
   for(let y=0;y<8;y++)for(let x=0;x<7;x++)drawCell(x,y,0,true);
   edgeStructures(0);
   floorValid=true;
  }finally{c=context}
 }
 c.drawImage(floorLayer,0,0);
}

function unitVisual(u,t){
 // All units use the same 55-degree projected tile coordinates. A unit may move
 // across rows while the authoritative state has already reached its destination.
 const x=seat===0?u.x:6-u.x, y=seat===0?u.y:7-u.y;
 const target=board.children[y*7+x],lift=target?.className.includes('high')?13:0;
 const z=center(x,y);z[1]-=lift;
 let walking=false,progress=1,stepPhase=0;
 const motion=movements.get(u.id);
 if(motion){
  progress=Math.max(0,Math.min(1,(t-motion.start)/motion.duration));
  const smooth=progress*progress*(3-2*progress);
  const original=center(motion.fromX,motion.fromY);
  original[1]-=motion.fromLift;
  z[0]=original[0]+(z[0]-original[0])*smooth;
  z[1]=original[1]+(z[1]-original[1])*smooth;
  walking=progress<1;
  stepPhase=progress*Math.PI*2*motion.steps;
  if(!walking)movements.delete(u.id);
 }
 // Scale by the animated foot position, not instantly by the destination row.
 // That prevents sudden size jumps when crossing perspective depth boundaries.
 const smoothDepth=progress*progress*(3-2*progress);
 const rowDepth=motion&&walking?motion.fromY+(y-motion.fromY)*smoothDepth:y;
 const scale=(.58+rowDepth/8*.5)*1.04;
 return{u,x,y,z,scale,walking,stepPhase};
}
function drawUnit(view,t){
 const {u,x,y,z,scale,walking,stepPhase}=view;
 const front=u.team===seat;
 const art=imageFor(u.k),ww=112*scale,hh=152*scale;
 const pose=unitPose(u,t);
  // A ground-contact shadow sits UNDER the painted boots; a second small halo
  // fixes the illusion of the character hovering above or ending in mid-air.
  const isFlying=u.k==='f';
  const stepLift=walking&&!isFlying?Math.abs(Math.sin(stepPhase))*3.0*scale:0;
  ellipse(z[0],z[1]+5,38*scale-(walking?3*scale:0),12*scale,'#0b223e7c');
  ellipse(z[0],z[1]+2,24*scale,7*scale,front?'#65e1d42b':'#e77eaf2b');
  if(walking&&!isFlying){
   // Brief alternating footfall sparks/dust remain attached to the moving ground point.
   const beat=Math.abs(Math.cos(stepPhase));
   ellipse(z[0]-9*scale,z[1]+3,3.5*scale*beat,1.6*scale,'#d1d3bb6b');
   ellipse(z[0]+9*scale,z[1]+2,3.5*scale*(1-beat),1.6*scale,'#8adbc65c');
  }
  if(monsterAtlas.complete&&monsterAtlas.naturalWidth&&monsterFrames[u.k]!==undefined){
   const atlasID=monsterFrames[u.k],vw=128*scale,vh=152*scale;
   c.save();c.imageSmoothingEnabled=false;
   c.shadowColor=front?'#69f7da':'#fc839e';c.shadowBlur=10*scale;
   if(!front)c.filter='hue-rotate(135deg) saturate(1.2) brightness(.91)';
   // Per-character transparent cutouts. No card backdrop and no cropped rectangle.
   // The feet land at the shadow plane (z + 3px), with just a 1px idle bob.
   // Each 128x148 frame includes the complete body, shins and painted boots.
   // The last 3px are transparent; boots land exactly on the stone surface.
   // Armored units stand still. Sky Manta is the sole naturally hovering summon.
   const footY=z[1]+4*scale;
   const idleBob=isFlying?Math.sin(t/620+u.id)*1.8:walking?-stepLift:Math.sin(t/780+u.id)*.22;
   // Each footstep shifts the body slightly, rather than snapping or teleporting.
   const sway=walking?Math.sin(stepPhase)*2.0*scale:0;
   // Attack lunges, hit knockback and impact flashes are layered on the original
   // sprite (no hard rectangular overlay, no missing boots).
   const dx=z[0]-vw/2+sway+pose.dx,dy=footY-vh+3*scale+idleBob+pose.dy;
   if(pose.rotate){c.translate(z[0]+pose.dx,footY+pose.dy);c.rotate(pose.rotate);
     c.translate(-z[0]-pose.dx,-footY-pose.dy)}
   c.drawImage(monsterAtlas,atlasID*128,0,128,148,dx,dy,vw,vh);
   if(pose.flash>.03){
    c.save();c.globalAlpha=Math.min(.75,pose.flash*.75);c.filter='brightness(3.2) saturate(0.2)';
    c.drawImage(monsterAtlas,atlasID*128,0,128,148,dx,dy,vw,vh);c.restore();
   }
   c.restore();
  }else if(art.complete&&art.naturalWidth){
   c.save();c.imageSmoothingEnabled=false;
   c.drawImage(art,z[0]-ww/2,z[1]-hh+18*scale+Math.sin(t/410+u.id)*2.1,ww,hh);c.restore()
  }
  const bw=36+16*(y/8),percent=Math.max(0,shownHealth(u,t)/u.max),by=z[1]-152*scale-7*scale;
  if(pose.flash>.15){c.save();c.globalAlpha=pose.flash*.5;
   c.fillStyle='#ffdd9f';c.fillRect(z[0]-bw/2-3,by-7,bw+6,11);c.restore()}
  c.fillStyle='#102b3a';c.fillRect(z[0]-bw/2-2,by-5,bw+4,8);
  c.fillStyle=front?'#7df9cd':'#ff9cae';c.fillRect(z[0]-bw/2,by-3,bw*percent,4);
  if(u.shield){c.fillStyle='#c9e7f8';c.fillRect(z[0]+bw/2+3,by-4,4,6)}
  if(u.id===selected||tributes.includes(u.id)){ellipse(z[0],z[1]+6,22*scale,6*scale,'#ffe3a6a9')}
}
function atmosphere(t){
 // Dust motes and lantern embers floating at distinct parallax depths
 for(let p of particles){let x=p.x+Math.sin(t/3100+p.phase)*18,y=(p.y-t*p.speed*.008+H)%H;let a=.3+.35*Math.sin(t/660+p.phase);if(a<.12)continue;c.fillStyle=p.phase%2?'rgba(255,218,158,'+a+')':'rgba(152,245,225,'+a+')';c.fillRect(x,y,3,3)}
 const vign=c.createRadialGradient(360,480,150,360,460,580);vign.addColorStop(0,'#09121a00');vign.addColorStop(1,'#06122288');c.fillStyle=vign;c.fillRect(0,0,W,H);
}
function draw(timestamp){
 if(timestamp-last<15){requestAnimationFrame(draw);return}last=timestamp;
 const time=timestamp;
 drawCachedWorld();
 drawHighlightLayer(time);
 // Pass two: sort every sprite by its ANIMATED foot position (rear to front).
 // This prevents the next row's floor from painting over a walking unit, and
 // preserves proper overlap between neighboring monsters as they pass.
 if(game?.units?.length){
  const layers=game.units.map(u=>unitVisual(u,time))
   .sort((a,b)=>a.z[1]-b.z[1]||a.z[0]-b.z[0]);
  for(const view of layers)drawUnit(view,time);
 }
 renderBattleFX(time);atmosphere(time);
 requestAnimationFrame(draw)
}
function pointInPoly(x,y,pts){let inside=false;for(let i=0,j=pts.length-1;i<pts.length;j=i++){const a=pts[i],b=pts[j];if(((a[1]>y)!==(b[1]>y))&&(x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]))inside=!inside;}return inside;}
cn.addEventListener('pointerup',e=>{
 if(!game)return;const bounds=cn.getBoundingClientRect();
 // The canvas retains its native 720×960 drawing resolution.
 // Convert touch coordinates through object-fit cropping, never stretch controls or art.
 const fit=getComputedStyle(cn).objectFit;
 const scale=(fit==='contain'?Math.min:Math.max)(bounds.width/W,bounds.height/H);
 const padX=(bounds.width-W*scale)/2,padY=(bounds.height-H*scale)/2;
 const x=(e.clientX-bounds.left-padX)/scale,y=(e.clientY-bounds.top-padY)/scale;
 // PRIORITY: legal movement and attack destinations always beat oversized
 // overlapping monster silhouettes. This fixes one-step forward movement on phones.
 if(selected!==null&&selected!==undefined&&selectedCard<0){
  let best=null,bestScore=Infinity;
  for(let row=0;row<8;row++)for(let vx=0;vx<7;vx++){
   const tileButton=board.children[row*7+vx];
   const flags=tileButton?.className||'';
   if(!flags.includes('showmove')&&!flags.includes('showattack'))continue;
   const lift=flags.includes('high')?13:0;
   const q=center(vx,row);q[1]-=lift;
   const dx=x-q[0],dy=y-q[1];
   const polyHit=pointInPoly(x,y,tile(vx,row,lift));
   // Small mobile finger-target tolerance beyond the painted polygon.
   const near=(dx/39)**2+(dy/29)**2<1;
   if(!polyHit&&!near)continue;
   const score=(dx/48)**2+(dy/34)**2;
   if(score<bestScore){bestScore=score;best=tileButton}
  }
  if(best){best.click();return}
 }
 // A selected summon/spell targets the actual ground tile FIRST.
 // Large illustrative sprites must not steal deployment taps from neighboring cells.
 if(selectedCard>=0){
  for(let row=7;row>=0;row--)for(let vx=0;vx<7;vx++){
   const tileButton=board.children[row*7+vx];
   const lift=tileButton?.className.includes('high')?13:0;
   if(pointInPoly(x,y,tile(vx,row,lift))){tileButton?.click();return}
  }
 }
 // With no selected card, painted monster silhouettes remain tappable.
 for(let row=7;row>=0;row--)for(let vx=0;vx<7;vx++){
   let ay=seat===0?row:7-row,ax=seat===0?vx:6-vx;
   const u=game.units.find(q=>q.x===ax&&q.y===ay);if(!u)continue;
   const z=center(vx,row),sc=(.58+row/8*.5)*1.04,sw=138*sc,sh=163*sc;
   if(x>z[0]-sw/2&&x<z[0]+sw/2&&y>z[1]-sh&&y<z[1]+9){board.children[row*7+vx]?.click();return}
 }
 for(let row=7;row>=0;row--)for(let vx=0;vx<7;vx++){if(pointInPoly(x,y,tile(vx,row,board.children[row*7+vx]?.className.includes('high')?13:0))){board.children[row*7+vx]?.click();return}}
});
const intro=document.getElementById('vista-stage');if(intro)intro.classList.add('scene-ready');
window.AetherScene={sync(s,my,choice){
 // Update movement before queuing attacks: the actor finishes stepping into
 // position before its sword swing/projectile begins.
 if(my!==seat){lastPositions.clear();movements.clear();healthTweens.clear();floorValid=false;activeFx.length=0;fxInitialized=false}
 const now=performance.now(),live=new Set(),hpChanges=[];
 for(const unit of s.units){
  live.add(unit.id);
  const prev=lastPositions.get(unit.id);
  if(prev&&(prev.x!==unit.x||prev.y!==unit.y)&&prev.team===unit.team){
   const fromX=my===0?prev.x:6-prev.x,fromY=my===0?prev.y:7-prev.y;
   const toX=my===0?unit.x:6-unit.x,toY=my===0?unit.y:7-unit.y;
   const oldTile=board.children[fromY*7+fromX];
   const dist=Math.abs(toX-fromX)+Math.abs(toY-fromY);
   movements.set(unit.id,{fromX,fromY,fromLift:oldTile?.className.includes('high')?13:0,
     start:now,duration:Math.min(720,340+dist*105),steps:Math.max(1,dist)});
  }
  if(prev&&prev.hp!==unit.hp){
   hpChanges.push({unit,from:shownHealth({id:unit.id,hp:prev.hp},now)});
  }
  lastPositions.set(unit.id,{x:unit.x,y:unit.y,team:unit.team,hp:unit.hp});
 }
 for(const id of lastPositions.keys())if(!live.has(id)){lastPositions.delete(id);movements.delete(id);healthTweens.delete(id)}
 const seq=s.fxSeq||0;
 if(!fxInitialized||seq<fxSeen){fxInitialized=true;fxSeen=seq;activeFx.length=0}
 else{
  const next=(s.fxEvents||[]).filter(e=>e.id>fxSeen).sort((a,b)=>a.id-b.id);
  for(let i=0;i<next.length;i++)newFx(next[i],now,i);
  fxSeen=seq;
 }
 // Drain HP when the blow visually connects, not at the moment the game state
 // advances. Preserve an ongoing tween when consecutive attacks overlap.
 for(const h of hpChanges){
  const matches=activeFx.filter(f=>f.data.to?.id===h.unit.id&&
   (f.data.type==='strike'||f.data.type==='spell')&&f.born>=now-100);
  const hit=matches[matches.length-1];
  const start=hit?Math.max(now,hit.born+fxImpact(hit)*hit.duration-25):now+100;
  healthTweens.set(h.unit.id,{from:h.from,to:h.unit.hp,start,duration:290});
 }
 game=s;seat=my;selected=choice?.unit;selectedCard=choice?.card;tributes=choice?.tributes||[];
},activeWalks:()=>movements.size,activeCombat:()=>activeFx.length};
const initial=window.AetherGame?.get?.();if(initial)window.AetherScene.sync(initial,0,{unit:null,card:-1,tributes:[]});
requestAnimationFrame(draw);
})();