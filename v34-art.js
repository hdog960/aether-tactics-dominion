/* DOMINION v3.4 — 25 original, self-contained illustrated fantasy portraits.
   No recolored atlas, no blocky procedural fallback. Seven original art-atlas
   cards remain unchanged. Save state and battlefield sprites untouched. */
(()=>{
'use strict';
const old=window.AetherArt;if(!old)return;
const originalSprite=(old.sprite||old.get).bind(old);
const terrain=old.terrain.bind(old);
const theme={
 t:['#eeb66e','#744455'],l:['#79d9f4','#1c587b'],m:['#ffb36f','#71344e'],
 w:['#cfb9ff','#47518a'],h:['#ffe29b','#7a6683'],c:['#ffbe69','#893a4b'],
 j:['#bfe78d','#325b43'],p:['#7af4e0','#346d87'],k:['#bcddff','#3b4e80'],
 d:['#c9f3ff','#39518b'],q:['#b1f6c8','#335c61'],e:['#b9f0ff','#446d91'],
 i:['#ffc77e','#923d3d'],n:['#ffe4aa','#64527c'],x:['#afffe9','#236e87'],
 o:['#dec0fa','#5b4a8e'],y:['#b5ecbd','#4b5366'],z:['#c7c8ff','#4e5887'],
 A:['#f7a8ce','#6d4065'],B:['#ffe0ad','#65728a'],C:['#cfbfff','#514e86'],
 D:['#c8afff','#403664'],E:['#a1f7ed','#285d7d'],F:['#ffaaa7','#75405a'],
 G:['#d1e6ff','#45466a']
};
const q=(d,f,s='#151626',w=2)=>'<path d="'+d+'" fill="'+f+'" stroke="'+s+'" stroke-width="'+w+'" stroke-linejoin="round" stroke-linecap="round"/>';
const ell=(x,y,rx,ry,f,s='#19213a',w=2)=>'<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" fill="'+f+'" stroke="'+s+'" stroke-width="'+w+'"/>';
const line=(d,c,w=2)=>q(d,'none',c,w);
const diamond=(x,y,r,c)=>q('M'+x+' '+(y-r)+'L'+(x+r*.8)+' '+y+'L'+x+' '+(y+r)+'L'+(x-r*.8)+' '+y+'Z',c,'#ffe2a4',2)+q('M'+(x-3)+' '+(y-r+4)+'L'+(x+3)+' '+(y-2)+'L'+x+' '+(y+r-8)+'Z','#fff7dc','none',0);
const halo=(col,rad=55)=>'<circle cx="80" cy="88" r="'+rad+'" stroke="'+col+'" stroke-width="2.5" fill="none" opacity=".7"/><circle cx="80" cy="88" r="'+(rad-12)+'" stroke="'+col+'" stroke-width="1" fill="none" opacity=".5"/>'+Array.from({length:12},(_,i)=>{const a=Math.PI*2*i/12,x=80+Math.cos(a)*(rad+5),y=88+Math.sin(a)*(rad+5);return line('M'+x.toFixed(1)+' '+y.toFixed(1)+'l'+(Math.cos(a)*7).toFixed(1)+' '+(Math.sin(a)*7).toFixed(1),col,2)}).join('');
function warrior({x=80,y=138,s=.77,coat='#5b4965',steel='#b5bcc7',shine='#ffe6ae',hood=false,weapon='staff',shield=false}={}){
let a='<g transform="translate('+x+' '+y+') scale('+s+')">';
a+=q('M-29 -47Q-54 5 -52 60L-12 73L0 38L15 70L51 62Q54 8 27 -47Z',coat);
a+=q('M-34 28L-35 80L-8 80L-6 26Z',steel)+q('M9 24L18 80L44 80L32 23Z',steel);
a+=q('M-45 74L-9 75L-7 86L-51 86Z','#27253c')+q('M15 74L47 75L54 86L12 86Z','#27253c');
a+=q('M-30 -47L-40 3L-22 28L20 28L40 3L28 -47Z',steel);
a+=q('M-17 -40L-25 0L0 22L25 0L16 -40Z',coat)+diamond(0,-11,10,shine);
a+=q('M-30 -40L-55 -26L-59 23L-38 31L-20 -11Z',steel)+q('M30 -40L55 -26L59 23L38 31L20 -11Z',steel);
a+=q('M-59 17L-64 38L-41 43L-32 25Z',coat)+q('M39 25L34 43L64 37L58 17Z',coat);
a+=ell(0,-70,27,28,hood?'#29243e':steel);
if(hood)a+=q('M-32 -86Q-8 -122 17 -107Q42 -83 29 -51L17 -44L-22 -46Z',coat)+ell(0,-68,18,18,'#171828')+line('M-13 -69L-3 -67M4 -67L16 -69',shine,3);
else a+=q('M-24 -83Q-3 -113 24 -82L24 -58L10 -46L-12 -46L-25 -58Z',steel)+q('M-20 -73H22V-60H-20Z','#1b2440')+line('M-14 -68L-2 -67M5 -67L17 -68',shine,2);
if(shield)a+=q('M-62 -8L-103 -20L-97 35L-75 62L-43 35L-40 -18Z',steel,'#f3d19b',4)+q('M-73 1L-87 6L-84 30L-72 42L-56 29L-53 3Z',coat)+line('M-87 12L-59 34M-59 10L-84 35',shine,3);
if(weapon==='sword')a+=q('M58 5L83 -105L93 -123L99 -105L76 8Z',steel,shine,3)+line('M90 -101L67 7',shine,3)+q('M49 1L92 1L88 10L52 10Z','#b9956c');
if(weapon==='spear')a+=line('M62 42L94 -119','#e4c99e',6)+q('M94 -149L78 -119L96 -80L112 -121Z',steel,shine,3);
if(weapon==='staff')a+=line('M59 45L73 -111','#e3bb81',6)+ell(73,-119,13,18,shine,'#eed3ab',4)+ell(73,-119,5,7,'#fff7e1','none');
if(weapon==='scythe')a+=line('M62 46L80 -115','#ddbf91',6)+q('M78 -117Q130 -135 137 -87Q112 -111 90 -91Z',steel,shine,3);
a+=line('M-21 -32L-10 -18M23 -31L10 -16M-23 42L-18 67M24 44L29 67','#e5d2c2',2);
return a+'</g>'
}
function subject(k,a){
switch(k){
case't':return '<g transform="translate(78 43) scale(1.05)">'+q('M-62 87L-60 5L-30 -35L-8 -16L17 -49L54 -2L66 86Z','#7d667a')+q('M-44 80L-51 151L-11 150L-3 83Z','#ad8a77')+q('M17 84L12 151L55 151L43 79Z','#ad8a77')+q('M-65 15L-87 -18L-57 -51L-36 -3Z','#bd9073')+q('M40 -7L72 -50L94 -19L68 22Z','#bd9073')+ell(0,-31,35,35,'#8b8595')+q('M-39 -41L-23 -64L-8 -41L7 -68L26 -38L38 -50L33 -17L-34 -15Z','#e3b779')+line('M-21 -25H-6M8 -25H24',a,5)+diamond(0,45,17,a)+q('M62 5L91 -106L106 -124L111 -94L82 27Z','#c3c5c7')+'</g>';
case'l':return q('M-21 207Q24 114 69 154Q152 205 146 109Q130 45 74 61Q9 79 66 129Q126 149 107 65Q92 22 148 22','none','#11385b',24)+q('M-21 207Q24 114 69 154Q152 205 146 109Q130 45 74 61Q9 79 66 129Q126 149 107 65Q92 22 148 22','none',a,13)+q('M118 43L144 15L161 44L140 66L159 79L124 75Z','#6cb9d6')+ell(143,45,5,4,'#ffe9a9')+Array.from({length:7},(_,i)=>q('M'+(31+i*17)+' '+(133+i%3*9)+'l-20 -21l6 35Z','#8de4d7')).join('');
case'm':return halo(a,67)+q('M-22 0L34 53L111 86L129 129L77 109L25 86Z','#f6ae67','none',0)+q('M41 58L89 70L119 112L82 147L26 114L20 85Z','#71505a','#fcd2a1',3)+q('M45 73L77 83L99 110L74 128L41 102Z','#c47b56')+Array.from({length:8},(_,i)=>line('M'+(i*19-25)+' '+(i*12-14)+'L'+(50+i*7)+' '+(86+i*3),i%2?'#fff3ba':'#ffb46f',3)).join('');
case'w':return halo(a,70)+q('M80 33L134 61L129 147L80 182L33 144L29 59Z','#7289b8',a,5)+q('M80 48L118 70L116 137L80 161L49 135L44 71Z','#b1b3dd')+diamond(80,106,39,a);
case'h':return halo(a,65)+warrior({x:77,y:135,s:.56,hood:true,coat:'#d8b583',steel:'#fcdfae',shine:a})+line('M80 18V69M55 41H105',a,9);
case'c':return warrior({x:77,y:142,s:.75,hood:true,coat:'#7c414a',steel:'#b57a6b',shine:a})+q('M124 66Q110 43 130 16Q155 42 145 65Q170 72 147 102Z','#f37e4e')+q('M137 84Q125 60 142 43Q152 68 147 88Z','#ffe9b2');
case'j':return q('M12 198Q24 140 29 107Q19 64 49 47L85 62L117 41Q157 61 142 113Q166 157 161 198Z','#335b49')+warrior({x:80,y:141,s:.72,coat:'#4b7458',steel:'#9aab7c',shine:a,shield:true,weapon:'spear'})+Array.from({length:11},(_,i)=>q('M'+(i*19-5)+' '+(75+i%3*42)+'l6 -17l8 12Z','#a2d58a')).join('');
case'p':return q('M0 181Q30 121 53 161Q80 204 99 149Q126 111 160 155L160 219H0Z','#2c83a2','none',0)+warrior({x:82,y:145,s:.72,coat:'#3a7e92',steel:'#87d7d7',shine:a,hood:true})+Array.from({length:5},(_,i)=>line('M'+(i*31-10)+' '+(152+i%3*10)+'Q'+(18+i*27)+' '+(116+i%2*15)+' '+(47+i*32)+' '+(149+i%3*12),'#a9f6e8',4)).join('');
case'k':return q('M19 173Q15 120 60 139Q82 105 110 128Q156 115 158 161L131 188L101 176L78 189L47 174Z','#6f7c9a')+warrior({x:77,y:125,s:.69,coat:'#3d5588',steel:'#b7d1e7',shine:a,weapon:'spear'})+line('M14 65L38 93L18 110L68 95M111 26L129 57L109 82L151 67','#d1f7ff',5);
case'd':return halo(a,58)+q('M80 39Q38 70 55 104Q39 145 80 179Q121 150 108 105Q126 70 80 39Z','#addce7',a,4)+q('M80 60Q61 91 65 119L82 150L97 114Q103 92 80 60Z','#638abb')+ell(68,94,5,4,'#fff0b1')+ell(92,94,5,4,'#fff0b1');
case'q':return warrior({x:83,y:142,s:.65,coat:'#437e71',steel:'#9bcca9',shine:a,weapon:'sword'})+Array.from({length:9},(_,i)=>line('M'+(i*7-12)+' '+(74+i*13)+'l'+(44+i*2)+' -19',a,2)).join('');
case'e':return warrior({x:78,y:141,s:.58,coat:'#3a5872',steel:'#9bcbe2',shine:a,weapon:'sword'})+Array.from({length:11},(_,i)=>q('M'+(i*17-2)+' 207l8 -'+(67+i%3*16)+'l11 '+(67+i%2*19)+'Z','#a5e4f9','#64aac5',2)).join('');
case'i':return halo(a,69)+q('M80 36L132 88L126 142L80 183L34 141L27 89Z','#b26b52','#edc98c',5)+diamond(80,107,35,a)+Array.from({length:21},(_,i)=>ell((i*37)%160,(i*59)%180,1+i%2,2+i%3,a,'none')).join('');
case'n':return q('M41 213L53 24L61 20L65 211Z','#d9bd90')+q('M61 27L142 37L129 92L59 80Z','#bd5c60','#f2b17e',3)+warrior({x:82,y:146,s:.64,coat:'#65485c',steel:'#c8aeaa',shine:a,weapon:'sword'});
case'x':return halo(a,62)+q('M18 133Q48 79 75 123Q112 67 151 106L160 155Q130 173 93 156Q57 178 17 153Z','#67c2c3')+Array.from({length:25},(_,i)=>line('M'+((i*37)%166)+' '+((i*9)%73)+'l-9 33',i%3?'#c6fff6':a,2)).join('');
case'o':return warrior({x:81,y:144,s:.68,hood:true,coat:'#624a7f',steel:'#a58ac0',shine:a})+q('M23 132L71 115L86 133L65 168L18 156Z','#debda1')+q('M73 116L116 124L144 160L92 167L76 144Z','#f6dec6')+line('M71 119L90 155M33 140L61 132M103 143L129 151','#8769bb',2);
case'y':return q('M2 206L35 174L56 184L82 156L105 172L132 151L160 190V220H0Z','#334b52')+warrior({x:80,y:136,s:.73,hood:true,coat:'#315555',steel:'#74918d',shine:a,weapon:'scythe'})+Array.from({length:5},(_,i)=>q('M'+(i*35-4)+' 205l6 -37l13 5l5 32Z','#8b929b')).join('');
case'z':return halo(a,63)+warrior({x:80,y:145,s:.6,coat:'#454f7f',steel:'#a8a6d1',shine:a})+Array.from({length:10},(_,i)=>{const an=2*Math.PI*i/10;return diamond(80+62*Math.cos(an),89+61*Math.sin(an),6,a)}).join('');
case'A':return warrior({x:81,y:142,s:.8,hood:true,coat:'#3e2c50',steel:'#88677d',shine:a,weapon:'scythe'})+q('M24 180Q4 114 36 68L58 133L46 212Z','#543651');
case'B':return halo(a,62)+warrior({x:80,y:146,s:.8,coat:'#75634c',steel:'#d9c48c',shine:a,weapon:'sword',shield:true})+q('M66 36L80 9L94 36L118 32L107 56H53L41 32Z','#f7da8c');
case'C':return halo(a,64)+q('M27 136Q61 112 80 129Q109 113 143 139L134 184Q103 171 81 193Q54 171 28 187Z','#dfbca4','#d7b9f5',3)+line('M80 130V188M39 147L69 138M94 141L130 150','#9e84cc',2)+q('M54 107Q82 68 84 39Q120 72 112 105L96 138Z','#bfa9ef');
case'D':return q('M6 186Q37 95 74 131Q113 91 153 145L160 217H0Z','#54466b')+line('M6 132L148 51M23 80L158 166M16 185L130 109','#d4adff',4)+Array.from({length:7},(_,i)=>diamond((i*43)%158,71+(i*19)%101,6,a)).join('');
case'E':return halo(a,65)+q('M39 68Q10 81 31 113Q44 140 72 126L82 98Z','#70c4d5')+q('M122 68Q149 86 126 113Q119 137 91 126L82 98Z','#e8ac78')+ell(62,98,18,23,'#addef0')+ell(101,98,18,23,'#f6c990')+diamond(82,101,22,a);
case'F':return halo(a,64)+line('M81 42V169M40 64H121','#e9c893',6)+q('M40 67L19 108L58 108Z','#e7acb2')+q('M123 67L104 108L142 108Z','#aeabd7')+ell(39,109,19,7,'#f9d9a9')+ell(122,109,18,7,'#e3cbeb')+q('M50 168H110L128 190H34Z','#c8a088')+diamond(80,54,12,a);
case'G':return halo(a,63)+Array.from({length:3},(_,i)=>{const x=37+i*43,y=64+i%2*14;return line('M'+x+' 27V'+y,'#e9bd86',4)+q('M'+(x-17)+' '+y+'Q'+x+' '+(y-16)+' '+(x+17)+' '+y+'L'+(x+13)+' '+(y+43)+'Q'+x+' '+(y+58)+' '+(x-13)+' '+(y+43)+'Z','#9aa7c1','#f3d7b0',3)+line('M'+(x-11)+' '+(y+26)+'h22',a,3)}).join('');
}
return '';
}
function starNoise(seed,col){
let x=seed|0,s='';
for(let i=0;i<70;i++){
x=(Math.imul(x,1664525)+1013904223)|0;const xx=(x>>>0)%157;
x=(Math.imul(x,1664525)+1013904223)|0;const yy=(x>>>0)%195;
const size=i%7===0?2:1;s+='<rect x="'+xx+'" y="'+yy+'" width="'+size+'" height="'+size+'" fill="'+(i%5===0?'#fff1ce':col)+'" opacity="'+(.2+(i%4)*.14)+'"/>';
}
return s;
}
function makeSvg(k){
const c=theme[k];if(!c)return null;
const [accent,base]=c;
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" width="160" height="200">'+
'<defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="'+base+'"/><stop offset=".48" stop-color="#354058"/><stop offset="1" stop-color="#0c142a"/></linearGradient>'+
'<radialGradient id="light"><stop stop-color="'+accent+'" stop-opacity=".81"/><stop offset=".4" stop-color="'+accent+'" stop-opacity=".22"/><stop offset="1" stop-color="'+accent+'" stop-opacity="0"/></radialGradient></defs>'+
'<rect width="160" height="200" fill="url(#sky)"/><circle cx="83" cy="78" r="97" fill="url(#light)"/>'+starNoise(k.charCodeAt(0)*17,accent)+
q('M-10 126L24 82L49 104L73 62L97 101L133 72L171 113V205H-10Z','#29304b','none',0)+
q('M-5 169L31 133L51 161L84 119L118 164L147 129L170 159V205H-5Z','#172439','none',0)+
Array.from({length:7},(_,i)=>'<g opacity=".42"><rect x="'+(i*25-7)+'" y="'+(70+i%3*13)+'" width="9" height="89" fill="#424c66"/><rect x="'+(i*25-9)+'" y="'+(69+i%3*13)+'" width="13" height="5" fill="#a5a9b0"/></g>').join('')+
'<path d="M0 180Q19 163 46 186T95 190Q137 169 160 188V200H0Z" fill="#0d182e"/>'+
subject(k,accent)+starNoise(k.charCodeAt(0)*391,accent)+
'<path d="M0 191Q57 182 105 191T160 191V200H0Z" fill="#091226" opacity=".75"/>'+
'<rect x="1" y="1" width="158" height="198" fill="none" stroke="'+accent+'" stroke-opacity=".4" stroke-width="2"/></svg>';
}
const cache={},pixels={};
function art(id){
 if(!theme[id])return originalSprite(id);
 if(pixels[id])return pixels[id];
 if(!cache[id])cache[id]='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(makeSvg(id));
 return cache[id];
}
// Bake each newly drawn illustration to a deliberately small original-size
// bitmap. Pixelated CSS enlargement gives the low-res painted appearance,
// not infinitely crisp vectors. SVG remains the fallback until art is ready.
window.addEventListener('load',()=>{
 let pending=Object.keys(theme).length;
 const finished=()=>{
  if(--pending===0)window.dispatchEvent(new Event('aether-card-art-ready'));
 };
 for(const id of Object.keys(theme)){
  const im=new Image();
  im.onload=()=>{
   try{
    const canvas=document.createElement('canvas');
    canvas.width=102;canvas.height=128;
    const g=canvas.getContext('2d');
    g.imageSmoothingEnabled=true;
    g.imageSmoothingQuality='high';
    g.drawImage(im,0,0,102,128);
    pixels[id]=canvas.toDataURL('image/png');
   }catch(e){/* Keep the original hand-authored SVG if rasterization fails. */}
   finished();
  };
  im.onerror=finished;
  im.src=art(id);
 }
});
window.AetherArt={get:art,card:art,sprite:originalSprite,terrain,coverage:()=>Object.keys(theme)};
})();