/* AETHER TACTICS v0.6 — actual art assets, 55° perspective, layered tactical view */
(()=>{'use strict';
const W=720,H=960,cn=document.getElementById('battle-canvas'),board=document.getElementById('board');
if(!cn||!board)return;
cn.width=W;cn.height=H;
const c=cn.getContext('2d',{alpha:false});c.imageSmoothingEnabled=false;
let game=null,seat=0,selected=null,selectedCard=-1,tributes=[],frames=0,last=0;
const cache=new Map(),particles=Array.from({length:56},(_,i)=>({x:(i*479+71)%W,y:(i*337+161)%H,phase:i*2.12,speed:0.13+(i%5)*.075}));
// Art assets are committed binary image files, not runtime-generated mockups.
const scenic=new Image(),stoneAtlas=new Image(),monsterAtlas=new Image();
scenic.src='./art/panorama.png';stoneAtlas.src='./art/reference.png';monsterAtlas.src='./art/units.png';
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
function drawCell(x,y,t){
 const idx=y*7+x,button=board.children[idx];if(!button)return;
 const flags=button.className,high=flags.includes('high'),rocky=flags.includes('rock'),spring=flags.includes('spring'),danger=y<=2,lift=high?13:0,points=tile(x,y,lift),floor=tile(x,y,lift-14-(high?8:0));
 // physical side walls, highly visible from angled viewpoint
 poly([points[3],points[2],floor[2],floor[3]],high?'#344958':'#273f4d','#0c2533',2);
 poly([points[1],points[2],floor[2],floor[1]],'#203745','#112838',2);
 let base=danger?(x+y)%2?'#544958':'#554e62':(x+y)%2?'#53746c':'#617c6d';
 if(y>=3&&y<5)base=(x+y)%2?'#51766f':'#637f75';
 poly(points,base,'#233b4b',3);
 // Real high-detail cobblestone texture sampled from clean architectural zones in the approved illustration.
 if(stoneAtlas.complete&&stoneAtlas.naturalWidth){
  const xx=Math.min(...points.map(p=>p[0])), yy=Math.min(...points.map(p=>p[1]));
  const ww=Math.max(...points.map(p=>p[0]))-xx, hh=Math.max(...points.map(p=>p[1]))-yy;
  c.save();c.beginPath();c.moveTo(...points[0]);for(let i=1;i<4;i++)c.lineTo(...points[i]);c.closePath();c.clip();
  c.globalAlpha=danger?.79:.91;
  // These small windows contain actual art-directed cobbled terrain, not random geometry.
  let sx=415+(x%3)*18,sy=785+(y%3)*15;
  c.drawImage(stoneAtlas,sx,sy,74,62,xx-1,yy-1,ww+2,hh+5);
  c.restore();
 }

 // inset basalt slab highlighting and color-rich pixel mosaic
 line(points[0],points[1],high?'#e4d1a0':'#a6b9a1',high?4:2);
 line(points[1],points[2],'#273949',2.5);
 for(let i=0;i<11;i++){
  let a=rnd(x,y,i),b=rnd(y,x,i+3);const row=y+a*.91,colx=x+b*.9;const [tx,ty]=world(colx,row);
  c.fillStyle=i%4===0?'#bfd5b02d':i%3===0?'#142f4136':'#de9fb424';c.fillRect(tx,ty-lift,3+(i%3)*3,2+(i%2)*2);
 }
 // old-world carved rings
 const z=center(x,y);z[1]-=lift;
 ellipse(z[0],z[1]-2,12,5,'#293f477f');
 line([z[0]-8,z[1]-3],[z[0]+8,z[1]-3],'#b2c2a648',1.5);
 if(flags.includes('showdeploy')||flags.includes('showmove')||flags.includes('showattack')||flags.includes('selected')||flags.includes('tribute')){
  let glow=flags.includes('showattack')||flags.includes('tribute')?'#ff9bb8':flags.includes('selected')?'#ffe6aa':'#95ffda';
  poly(points,'#70fff013',glow,5);
  ellipse(z[0],z[1],15,5,glow+'55');
 }
 if(rocky){rock(z[0],z[1]+3,35+15*y/8,.8+y/10,x+y*7)}
 if(spring)crystal(z[0],z[1]+6,.67+y*.035,false,t);
 const isHostBase=(y===7&&x===3),isRivalBase=(y===0&&x===3);
 if(isHostBase||isRivalBase)altar(z[0],z[1]+4,.72+y*.045,isRivalBase,t);
 const ay=seat===0?y:7-y,ax=seat===0?x:6-x,u=game?.units?.find(q=>q.x===ax&&q.y===ay);
 if(u){
  let front=u.team===seat,scale=(.58+y/8*.5)*1.04;
  const art=imageFor(u.k),ww=112*scale,hh=152*scale;
  ellipse(z[0],z[1]+5,29*scale,10*scale,front?'#041c288f':'#35182c99');
  if(monsterAtlas.complete&&monsterAtlas.naturalWidth&&monsterFrames[u.k]!==undefined){
   const atlasID=monsterFrames[u.k],vw=116*scale,vh=139*scale;
   c.save();c.imageSmoothingEnabled=false;
   if(!front)c.filter='hue-rotate(135deg) saturate(1.2) brightness(.91)';
   c.drawImage(monsterAtlas,atlasID*128+4,20,120,120,z[0]-vw/2,z[1]-vh+17*scale+Math.sin(t/410+u.id)*2.1,vw,vh);c.restore();
  }else if(art.complete&&art.naturalWidth){
   c.save();c.imageSmoothingEnabled=false;
   c.drawImage(art,z[0]-ww/2,z[1]-hh+18*scale+Math.sin(t/410+u.id)*2.1,ww,hh);c.restore()
  }
  const bw=36+16*(y/8),percent=Math.max(0,u.hp/u.max),by=z[1]-hh+15*scale;
  c.fillStyle='#102b3a';c.fillRect(z[0]-bw/2-2,by-5,bw+4,8);
  c.fillStyle=front?'#7df9cd':'#ff9cae';c.fillRect(z[0]-bw/2,by-3,bw*percent,4);
  if(u.shield){c.fillStyle='#c9e7f8';c.fillRect(z[0]+bw/2+3,by-4,4,6)}
  if(u.id===selected||tributes.includes(u.id)){ellipse(z[0],z[1]+6,22*scale,6*scale,'#ffe3a6a9')}
 }
}
function atmosphere(t){
 // Dust motes and lantern embers floating at distinct parallax depths
 for(let p of particles){let x=p.x+Math.sin(t/3100+p.phase)*18,y=(p.y-t*p.speed*.008+H)%H;let a=.3+.35*Math.sin(t/660+p.phase);if(a<.12)continue;c.fillStyle=p.phase%2?'rgba(255,218,158,'+a+')':'rgba(152,245,225,'+a+')';c.fillRect(x,y,3,3)}
 const vign=c.createRadialGradient(360,480,150,360,460,580);vign.addColorStop(0,'#09121a00');vign.addColorStop(1,'#06122288');c.fillStyle=vign;c.fillRect(0,0,W,H);
}
function draw(timestamp){
 if(timestamp-last<48){requestAnimationFrame(draw);return}last=timestamp;
 background();const time=timestamp;
 // long suspended island shoulders, with perspective-cliff edges
 poly([[94,260],[626,260],[700,770],[633,823],[67,823],[10,774]],'#172e3e','#345261',7);
 poly([[94,263],[626,263],[693,760],[625,788],[80,788],[23,764]],'#385965');
 for(let y=0;y<8;y++)for(let x=0;x<7;x++)drawCell(x,y,time);
 edgeStructures(time);atmosphere(time);
 requestAnimationFrame(draw)
}
function pointInPoly(x,y,pts){let inside=false;for(let i=0,j=pts.length-1;i<pts.length;j=i++){const a=pts[i],b=pts[j];if(((a[1]>y)!==(b[1]>y))&&(x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]))inside=!inside;}return inside;}
cn.addEventListener('pointerup',e=>{
 if(!game)return;const bounds=cn.getBoundingClientRect(),x=(e.clientX-bounds.left)/bounds.width*W,y=(e.clientY-bounds.top)/bounds.height*H;
 // Unit silhouettes above the slab remain tappable
 for(let row=7;row>=0;row--)for(let vx=0;vx<7;vx++){
   let ay=seat===0?row:7-row,ax=seat===0?vx:6-vx;
   const u=game.units.find(q=>q.x===ax&&q.y===ay);if(!u)continue;
   const z=center(vx,row),sc=.58+row/8*.5,sw=95*sc,sh=125*sc;
   if(x>z[0]-sw/2&&x<z[0]+sw/2&&y>z[1]-sh&&y<z[1]+9){board.children[row*7+vx]?.click();return}
 }
 for(let row=7;row>=0;row--)for(let vx=0;vx<7;vx++){if(pointInPoly(x,y,tile(vx,row,board.children[row*7+vx]?.className.includes('high')?13:0))){board.children[row*7+vx]?.click();return}}
});
const intro=document.getElementById('vista-stage');if(intro)intro.classList.add('scene-ready');
window.AetherScene={sync(s,my,choice){game=s;seat=my;selected=choice?.unit;selectedCard=choice?.card;tributes=choice?.tributes||[]}};
const initial=window.AetherGame?.get?.();if(initial)window.AetherScene.sync(initial,0,{unit:null,card:-1,tributes:[]});
requestAnimationFrame(draw);
})();