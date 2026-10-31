/* AETHER TACTICS: DOMINION v2.0 - distinct palettes and effects for 10 expansion cards */
(()=>{'use strict';
const sprites={};const rgb=(hex)=>{hex=hex.replace('#','');return [0,2,4].map(x=>parseInt(hex.slice(x,x+2),16))};
const pals={
v:['#14283d','#31616f','#5998a5','#a4dde0','#ebf9dc','#61e8cb','#dfae6c'],
b:['#1d2d44','#3d6075','#678b9e','#adc9d0','#f2e8d6','#8bf6e4','#e5b976'],
r:['#142c39','#2d5260','#4c898a','#96c8b2','#efe5b5','#c2e896','#f3ca6e'],
s:['#211936','#4b315c','#775385','#b290c6','#ddd0eb','#f68dc5','#d9a7ee'],
f:['#1b3150','#286a91','#459bb4','#86cedc','#e0fcf5','#91eff9','#e5c79b'],
g:['#192b34','#3e5c64','#637f82','#abc1bd','#d5e2ca','#6cf2ce','#d0b284'],
t:['#342734','#714859','#b87a6a','#efb781','#fff0c0','#f5db7a','#91f5ea'],
l:['#133449','#245e74','#3b8c98','#77c8c1','#ddf8db','#a3f4e4','#e0b987'],
a:['#123e57','#257e91','#4ac9d5','#99faed','#ecfff0','#a4e8fb','#f5dc9b'],
m:['#462338','#975162','#de876e','#ffbc8b','#ffe7c4','#ffdc76','#fff1c0'],
w:['#243451','#476b8b','#6caac5','#b2eff4','#edfffa','#a1ffe2','#e9bf79'],
h:['#184a46','#37846c','#67b88a','#bbebae','#efffd5','#a2ffda','#ffeaa5'],
c:['#2d253c','#684b67','#b16561','#efaa72','#fff0c6','#ff8860','#ffdc90'],
j:['#213a3a','#3d6d5e','#629d76','#a4d7a1','#f2f3c7','#84e39e','#d1b77a'],
p:['#14394a','#2d7881','#55a8a4','#a6dfd0','#ecfff2','#78e6db','#d0e9b2'],
k:['#292940','#566a87','#839fb9','#ccddec','#f0f5ff','#9ec8ff','#e3ba85'],
d:['#222c53','#4f6d95','#8298cf','#c2c8ff','#f0faff','#a2d6ff','#dbc8ff'],
q:['#234153','#4a8a9b','#91c8d3','#d5f5fb','#efffff','#9eeaff','#f1de9b'],
e:['#293e63','#467bb9','#7fbded','#d1efff','#f2fcff','#8ce6ff','#d3e3ff'],
i:['#502732','#b64d3d','#e57b43','#ffc280','#fff1cd','#ffac64','#fff3ac'],
n:['#50402c','#9d8652','#d4b979','#fae5a0','#fff8d9','#e4d7a0','#bcf0da'],
x:['#26434c','#488b8b','#86cabb','#d3f5e3','#f0fff3','#84f7d9','#e9f6bb'],
o:['#273750','#4c6d88','#8eacb4','#d1eadf','#fff6d4','#6bdbe7','#ecda9e'],
y:['#34263c','#674b78','#93719a','#e0bdd5','#f1e5f7','#b996e5','#ebc28e'],
z:['#262c57','#4d5d97','#778bd0','#c4d1fa','#f8f9ff','#9cd4ff','#e0bdff'],
A:['#302539','#755267','#ba7a82','#f3bbc1','#fbe4d4','#de8bb1','#facb9c'],
B:['#1e3945','#346b75','#67a5a5','#b0dbcf','#edf9df','#8fefd4','#d8ba78'],
C:['#193b50','#3b7795','#79b9d4','#d4eef8','#f4fcff','#93e0fa','#e8d8a0'],
D:['#2f2948','#63508a','#997bc4','#e2caf8','#f7eeff','#c0a8ff','#edcc95'],
E:['#23473d','#42816e','#7cc9a1','#cff3d2','#f3ffec','#abfbd2','#e8d3a2'],
F:['#50352d','#9d6751','#cf9470','#ffd7a5','#fff1df','#ffbc78','#f1d3a3'],
G:['#263e4a','#4f7180','#8caab0','#d8e3e1','#f5fbec','#a5e6dd','#e7d3a5']
};
const mk=(w=112,h=152)=>{let cv=document.createElement('canvas');cv.width=w;cv.height=h;let c=cv.getContext('2d');c.imageSmoothingEnabled=false;return [cv,c]};
const pixel=(c,x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
const poly=(c,points,fill,edge)=>{c.beginPath();c.moveTo(...points[0]);for(let i=1;i<points.length;i++)c.lineTo(...points[i]);c.closePath();if(edge){c.strokeStyle=edge;c.lineWidth=3;c.stroke()}c.fillStyle=fill;c.fill()};
const ell=(c,x,y,rx,ry,color)=>{c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill()};
const line=(c,p,q,col,w=2)=>{c.beginPath();c.moveTo(...p);c.lineTo(...q);c.lineWidth=w;c.strokeStyle=col;c.stroke()};
function generate(id){
const template=({c:'r',j:'b',p:'r',k:'v',d:'f',o:'r',y:'b',z:'v',A:'s',B:'b'})[id]||id;
const [cv,c]=mk(),p=pals[id]||pals.v;const [ink,dark,mid,light,white,glow,gold]=p;
const armor=(x,y,w,h)=>{pixel(c,x,y,w,h,ink);pixel(c,x+4,y+3,w-8,h-8,mid);pixel(c,x+6,y+3,w-11,6,light);pixel(c,x+5,y+11,5,h-16,dark);pixel(c,x+w-12,y+8,5,h-18,light)};
const gem=(x,y,size=12)=>{poly(c,[[x,y-size],[x+size*.7,y],[x,y+size],[x-size*.7,y]],glow,ink);poly(c,[[x-2,y-size+3],[x+2,y-2],[x-1,y+size-6],[x-5,y]],white)};
const sword=(x,y,height=67)=>{pixel(c,x-3,y,7,height,ink);pixel(c,x-1,y+1,3,height-15,white);pixel(c,x-2,y+3,2,height-14,glow);pixel(c,x-10,y+height-19,22,6,gold);pixel(c,x-3,y+height-14,6,17,dark)};
const boot=(x,y)=>{armor(x,y,20,30);pixel(c,x-4,y+24,27,8,ink);pixel(c,x,y+26,22,3,gold)};
const cape=(color)=>poly(c,[[35,55],[75,56],[90,128],[78,143],[49,126],[21,145],[20,115]],color,ink);
if(['v','b','r','s','t'].includes(template)){
// layered cloth and lower limbs
cape(template==='s'?dark:template==='r'?dark:p[1]);boot(30,111);boot(64,111);
poly(c,[[31,90],[82,90],[73,119],[38,119]],dark,ink);pixel(c,42,99,26,7,gold);
armor(30,60,55,50);poly(c,[[35,59],[80,59],[89,71],[70,84],[42,82],[25,70]],mid,ink);
pixel(c,44,71,27,4,light);pixel(c,38,88,37,5,ink);gem(57,79,11);
armor(15,62,22,52);armor(77,62,22,52);
poly(c,[[22,63],[42,60],[33,85],[12,88]],light,ink);poly(c,[[73,61],[94,60],[101,88],[80,83]],light,ink);
ell(c,56,41,25,28,ink);ell(c,56,40,21,24,mid);
poly(c,[[32,40],[40,23],[73,23],[81,40],[77,61],[36,61]],dark,ink);
pixel(c,39,40,35,11,light);pixel(c,45,44,23,4,ink);
pixel(c,45,46,8,3,glow);pixel(c,63,46,7,3,glow);
poly(c,[[38,25],[46,12],[67,12],[76,26]],mid,ink);pixel(c,49,19,17,5,white);
}
switch(template){
case 'v':
poly(c,[[37,17],[48,1],[58,15],[72,8],[77,25]],gold,ink);
poly(c,[[33,89],[13,73],[7,110],[31,105]],mid,ink);gem(20,91,12);
sword(94,30,88);line(c,[37,69],[43,94],white,2);break;
case 'b':
poly(c,[[27,19],[32,4],[47,15],[56,3],[69,15],[79,1],[86,24]],gold,ink);
poly(c,[[2,70],[26,66],[42,94],[36,140],[4,143]],ink,glow);
poly(c,[[6,73],[25,70],[38,95],[32,136],[8,139]],mid,light);
gem(22,99,18);pixel(c,80,74,27,12,light);pixel(c,84,88,20,20,white);break;
case 'r':
poly(c,[[34,8],[61,0],[83,16],[83,40],[75,49],[32,44]],dark,ink);
poly(c,[[30,20],[56,5],[81,19],[78,45],[55,22],[36,46]],mid,ink);
pixel(c,42,36,31,5,ink);pixel(c,49,37,10,2,glow);
line(c,[97,28],[100,112],gold,4);line(c,[97,28],[76,70],white,2);line(c,[76,70],[100,112],white,2);
line(c,[82,74],[111,65],white,3);poly(c,[[109,62],[112,67],[106,73]],glow);
poly(c,[[5,66],[27,65],[20,100],[0,118]],dark,ink);break;
case 's':
poly(c,[[27,29],[15,2],[50,14],[74,3],[97,28],[80,39]],dark,ink);
poly(c,[[27,29],[15,2],[50,14],[74,3],[97,28],[80,39]],mid);
pixel(c,40,42,13,5,glow);pixel(c,63,42,12,5,glow);
sword(5,77,60);sword(104,76,59);line(c,[25,65],[9,35],glow,2);break;
case 't':
// huge crowned titan with spine-spikes and runic greatsword
poly(c,[[25,54],[6,16],[33,29],[42,4],[55,22],[78,2],[82,28],[107,13],[90,59]],gold,ink);
poly(c,[[17,70],[8,49],[35,47],[40,73]],gold,ink);poly(c,[[80,71],[80,47],[103,47],[109,69]],gold,ink);
pixel(c,40,86,34,5,gold);gem(56,79,17);sword(103,0,135);
for(let i=0;i<5;i++)pixel(c,36+i*10,105+i%2*3,5,7,glow);
break;
case 'f':
// curved wings, inner fins, expressive glowing eyes
ell(c,56,78,26,40,ink);ell(c,57,72,22,33,mid);
poly(c,[[46,57],[18,37],[0,9],[9,71],[26,99],[49,89]],dark,ink);
poly(c,[[68,57],[96,35],[112,8],[105,71],[90,99],[65,89]],dark,ink);
poly(c,[[43,60],[12,27],[12,68],[32,83],[47,83]],light,ink);
poly(c,[[69,60],[100,27],[100,68],[80,83],[65,83]],light,ink);
for(let i=0;i<5;i++){line(c,[20+i*4,53+i*3],[39+i*2,71+i*2],glow,1.5);line(c,[92-i*4,53+i*3],[73-i*2,71+i*2],glow,1.5)}
gem(56,64,13);ell(c,45,80,5,3,white);ell(c,69,80,5,3,white);
poly(c,[[48,105],[61,105],[67,149],[56,133],[44,151]],mid,ink);break;
case 'g':
for(const [x,y,w,h] of [[37,17,38,38],[28,53,55,57],[6,59,27,53],[78,58,29,54],[26,113,25,33],[63,113,25,33]]){poly(c,[[x+6,y],[x+w-5,y+3],[x+w,y+h-10],[x+w-6,y+h],[x+3,y+h-3],[x,y+13]],dark,ink);pixel(c,x+6,y+7,w-14,h-21,mid);pixel(c,x+7,y+6,w-19,5,light)}
poly(c,[[42,14],[68,13],[78,26],[66,41],[35,41]],light,ink);
gem(57,82,18);pixel(c,40,34,9,4,glow);pixel(c,65,34,9,4,glow);
for(let i=0;i<8;i++){let x=23+(i*17)%65,y=58+(i*29)%68;pixel(c,x,y,4,8,glow)}
break;
case 'l':
// coiling oceanic leviathan
for(let j=0;j<6;j++){let x=29+j*8,y=127-Math.sin(j*.8)*19;ell(c,x,y,23-j*2,16-j/2,ink);ell(c,x,y-4,19-j*2,10,mid)}
poly(c,[[73,93],[67,61],[77,30],[95,20],[108,29],[106,50],[91,59],[92,85],[100,112]],dark,ink);
poly(c,[[76,91],[73,61],[83,34],[98,26],[104,31],[100,45],[87,57],[86,85],[95,109]],mid,light);
poly(c,[[76,41],[61,16],[88,21],[94,9],[101,28]],gold,ink);
for(let i=0;i<5;i++)poly(c,[[22+i*10,114-i*3],[30+i*10,87-i*4],[37+i*10,118-i*3]],glow,ink);
pixel(c,92,36,8,5,glow);pixel(c,79,50,11,4,white);break;
default:
if(['a','m','w','h','q','e','i','n','x','C','D','E','F','G'].includes(id)){
const halo=c.createRadialGradient(56,70,3,56,70,66);halo.addColorStop(0,glow);halo.addColorStop(.3,mid);halo.addColorStop(.8,dark);halo.addColorStop(1,'#10182b00');c.fillStyle=halo;c.fillRect(0,0,112,152);
for(let i=0;i<26;i++){const a=i*2.399,d=25+(i*7)%39;ell(c,56+Math.sin(a)*d,72+Math.cos(a)*d,1+i%3,2+i%3,i%2?gold:white)}
if(id==='a'){for(let i=0;i<4;i++)poly(c,[[50+i*5,10+i*4],[29+i*8,68],[45+i*4,80],[37+i*4,138],[83+i*2,62]],i%2?glow:white,ink)}
if(id==='m'){ell(c,56,66,36,34,glow);ell(c,48,57,27,27,gold);ell(c,44,50,17,18,white);for(let i=0;i<7;i++)poly(c,[[34+i*8,84],[28+i*8,113],[54+i*4,91]],mid,ink)}
if(id==='w'){poly(c,[[56,11],[97,40],[91,101],[56,136],[19,101],[13,40]],mid,ink);poly(c,[[56,22],[83,45],[78,95],[56,121],[29,95],[26,45]],glow,white);gem(56,70,22)}
if(id==='h'){pixel(c,47,26,18,88,glow);pixel(c,16,61,80,19,glow);pixel(c,51,29,11,80,white);pixel(c,18,65,75,10,white);gem(56,72,25)}
if(id==='q'){for(let n=0;n<4;n++){let y=30+n*22;line(c,[26,y],[89,y-10],glow,6);ell(c,89,y-10,6,6,white)}gem(55,82,18)}
if(id==='e'){for(let n=0;n<6;n++){let a=n*Math.PI/3;line(c,[56,74],[56+Math.cos(a)*46,74+Math.sin(a)*46],white,4)}gem(56,74,25)}
if(id==='i'){for(let n=0;n<5;n++)poly(c,[[26+n*11,118],[39+n*7,37],[48+n*8,122]],n%2?gold:glow,ink);gem(56,62,19)}
if(id==='n'){for(let n=0;n<3;n++){ell(c,56,76,17+n*15,17+n*15,n===0?glow:mid);line(c,[23+n*8,117],[56,74],gold,3)}gem(56,73,15)}
if(id==='x'){poly(c,[[56,11],[95,43],[93,108],[56,142],[19,110],[17,40]],mid,ink);line(c,[29,124],[83,29],glow,9);gem(56,73,25)}
if(id==='C'){for(let j=0;j<5;j++){let yy=35+j*17;line(c,[28,yy],[87,yy-6],j%2?white:gold,3)}gem(55,78,21)}
if(id==='D'){for(let j=0;j<4;j++){let rr=15+j*11;ell(c,56,76,rr,rr*.65,j%2?glow:mid)}gem(56,76,17)}
if(id==='E'){for(let j=0;j<3;j++){gem(31+j*25,75+(j%2)*12,13);line(c,[31+j*25,75+(j%2)*12],[56,54],glow,3)}}
if(id==='F'){poly(c,[[29,31],[55,15],[83,33],[73,71],[87,119],[57,133],[27,113],[39,70]],glow,ink);line(c,[30,39],[79,110],gold,4)}
if(id==='G'){for(let j=0;j<3;j++){ell(c,56,75,18+j*13,22+j*11,j%2?mid:glow)}line(c,[34,29],[82,124],white,8);gem(56,75,15)}

}
}
// intricate material details, pixel dithering and rim lighting 
if(!['a','m','w','h','q','e','i','n','x','C','D','E','F','G'].includes(id)){
for(let i=0;i<180;i++){const x=(i*47+17)%112,y=(i*71+29)%149;let a=c.getImageData(x,y,1,1).data;if(a[3]>128){const h=(i*53)%9; if(h===0||h===1)pixel(c,x,y,1,1,light); else if(h===2)pixel(c,x,y,1,1,ink)}}
}
return cv.toDataURL('image/png');
}
function get(id){return sprites[id]||(sprites[id]=generate(id))}
window.AetherArt={get,terrain(id){return sprites['terrain_'+id]||(sprites['terrain_'+id]=get(id==='core'?'w':id==='enemycore'?'m':id==='spring'?'h':'g'))}};
})();