/* AETHER TACTICS — THE LUMINOUS RIFT, oblique 55° pixel diorama renderer */
(()=>{'use strict';
const W=720,H=960,cn=document.getElementById('battle-canvas'),board=document.getElementById('board');
if(!cn||!board)return;
cn.width=W;cn.height=H;
const c=cn.getContext('2d',{alpha:false});c.imageSmoothingEnabled=false;
let game=null,seat=0,selected=null,selectedCard=-1,tributes=[],frames=0,last=0;
const cache=new Map(),particles=Array.from({length:56},(_,i)=>({x:(i*479+71)%W,y:(i*337+161)%H,phase:i*2.12,speed:0.13+(i%5)*.075}));
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
 c.clearRect(0,0,W,H);
 const sky=c.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#0c213c');sky.addColorStop(.25,'#31526d');sky.addColorStop(.51,'#3b6b71');sky.addColorStop(.67,'#263f57');sky.addColorStop(1,'#0b2035');c.fillStyle=sky;c.fillRect(0,0,W,H);
 // planet, faint cloudbanks and rose-gold atmospheric shafts
 const halo=c.createRadialGradient(513,121,8,513,121,220);halo.addColorStop(0,'#d7efd4ac');halo.addColorStop(.27,'#92ddd26a');halo.addColorStop(1,'#4eb6af00');c.fillStyle=halo;c.fillRect(260,0,440,355);
 ellipse(510,115,56,54,'#ddf0cf');ellipse(491,100,11,7,'#bddbc3');ellipse(532,130,13,8,'#c8e0c3');
 for(let i=0;i<90;i++){let x=rnd(i,8)*W,y=rnd(i,3)*310;c.fillStyle=i%3?'#b6e4dc99':'#f6dcaa99';c.fillRect(x|0,y|0,i%8===0?3:1,i%8===0?3:1)}
 function mountains(ybase,range,fill,salt){
  let p=[[0,ybase+90]];for(let x=-36;x<W+44;x+=22){let z=rnd(x,salt);p.push([x,ybase-z*range-(x%66===0?range*.5:0)])}p.push([W,ybase+130]);poly(p,fill)
 }
 mountains(287,117,'#23415a',4);mountains(310,87,'#2f5767',9);mountains(351,63,'#264d59',13);
 for(let i=0;i<7;i++){let x=43+i*111,y=232+(i%3)*31;poly([[x-17,y+70],[x-8,y+8],[x,y-45],[x+11,y+7],[x+21,y+70]],'#193c4b');poly([[x-8,y+15],[x,y-45],[x+9,y+15]],'#72b2a65c');}
 // dreamlike ruined arches and basalt spires
 function tower(x,y,scale,mirrored){
  c.save();c.translate(x,y);c.scale(mirrored?-scale:scale,scale);
  poly([[-26,125],[-24,-9],[-13,-30],[-7,-68],[5,-82],[22,-40],[33,-11],[35,125]],'#142d3d','#486476',5);
  poly([[-19,122],[-17,-9],[-5,-20],[17,-17],[26,-9],[29,122]],'#335363');
  poly([[-21,-12],[-15,-39],[2,-79],[17,-44],[29,-12]],'#698085','#142c3c',4);
  poly([[-12,0],[-6,-15],[12,-15],[20,0],[18,48],[-10,48]],'#101f32');
  for(let i=0;i<4;i++){let yy=61+i*13;line([-14,yy],[23,yy],'#8b998757',2)}
  line([-3,-53],[1,-20],'#9de8d0',3);ellipse(0,-39,5,7,'#e5e1b7');
  c.restore();
 }
 tower(26,320,.85,false);tower(683,324,.95,true);tower(106,303,.49,false);tower(622,306,.54,true);
 const fog=c.createLinearGradient(0,260,0,490);fog.addColorStop(0,'#a9efcc00');fog.addColorStop(.5,'#81beaa29');fog.addColorStop(1,'#80abca00');c.fillStyle=fog;c.fillRect(0,245,W,290);
 // distant chasm waterfalls on either side of the suspended floating arena
 for(let side of [-1,1]){
  const x=side<0?7:W-7;
  poly([[x-44,345],[x+20,345],[x+35,720],[x-32,741]],'#172c40');
  for(let i=0;i<4;i++){
   let tx=x+side*(i*9-18);let grad=c.createLinearGradient(tx,348,tx+side*18,810);grad.addColorStop(0,'#b6f7eb9e');grad.addColorStop(.7,'#62a8af54');grad.addColorStop(1,'#3c6f9b00');
   poly([[tx,348],[tx+side*5,350],[tx+side*19,806],[tx+side*8,785]],grad)
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
  if(art.complete&&art.naturalWidth){c.save();c.imageSmoothingEnabled=false;c.drawImage(art,z[0]-ww/2,z[1]-hh+18*scale+Math.sin(t/410+u.id)*2.1,ww,hh);c.restore()}
  else if(art.complete===false)art.onload=()=>{};
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
requestAnimationFrame(draw);
})();