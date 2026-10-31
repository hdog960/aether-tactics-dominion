
(()=>{
'use strict';
const $=id=>document.getElementById(id), Art=window.AetherArt;
const D={
v:{name:'Aeth Vanguard',cost:2,hp:5,atk:2,range:1,move:2,role:'Warrior',desc:'Swift rune-blade infantry.'},
b:{name:'Prism Bulwark',cost:3,hp:8,atk:1,range:1,move:1,shield:2,role:'Guardian',desc:'Shielded prism defender.'},
r:{name:'Dawn Ranger',cost:3,hp:4,atk:2,range:3,move:1,role:'Archer',desc:'Piercing distant arrows.'},
s:{name:'Rift Stalker',cost:3,hp:4,atk:3,range:1,move:3,role:'Assassin',desc:'Moves through the shadows.'},
f:{name:'Sky Manta',cost:3,hp:4,atk:2,range:1,move:3,fly:true,role:'Flyer',desc:'Glides across obstacles.'},
g:{name:'Obsidian Golem',cost:4,hp:9,atk:2,range:1,move:1,role:'Juggernaut',desc:'Living stone titanling.'},
t:{name:'Aether Titan',cost:7,hp:13,atk:5,range:1,move:1,tribute:2,role:'Mythic',desc:'Sacrifice TWO allied units.'},
l:{name:'Abyssal Leviathan',cost:7,hp:10,atk:4,range:2,move:2,fly:true,tribute:1,role:'Mythic',desc:'Sacrifice ONE allied unit.'},
a:{name:'Rift Barrage',cost:2,spell:'bolt',power:3,role:'Spell',desc:'3 damage to a target.'},
m:{name:'Planar Meteor',cost:5,spell:'cross',power:3,role:'Spell',desc:'3 damage in a cross.'},
w:{name:'Prismatic Ward',cost:2,spell:'shield',role:'Spell',desc:'Give an ally 4 shield.'},
h:{name:'Aeth Renewal',cost:2,spell:'heal',role:'Spell',desc:'Heal 4; refresh its actions.'}
};
const portraitIndices={v:0,r:1,b:2,s:3,f:4,g:5,a:6};
const portraitPositions={v:0,r:16.6667,b:33.3333,s:50,f:66.6667,g:83.3333,a:100};
const POOL=['v','v','v','b','b','r','r','s','s','f','f','g','t','l','a','a','a','m','w','w','h'];
const rocks=new Set(['0,3','6,3','2,3','4,4']),springs=['1,3','5,4'],high=new Set(['2,2','4,2','3,3','3,4','2,5','4,5']);
let S=null,localSeat=0,mode='ai',net=null,room='',chosenUnit=null,chosenCard=-1,tributes=[],msg='',hint='',log='',connected=false,revision=0;
const K=(x,y)=>x+','+y,P=(x,y)=>({x,y}),d=(a,b)=>Math.abs(a.x-b.x)+Math.abs(a.y-b.y),bounds=(x,y)=>x>=0&&x<7&&y>=0&&y<8;
const entity=(x,y)=>S.units.find(u=>u.x===x&&u.y===y),core=t=>({core:true,team:t,x:3,y:t===0?7:0});
function shuffle(arr){let a=arr.slice();for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a}
function unit(k,team,x,y,ready=false){let e=D[k];return{id:S.next++,k,team,x,y,hp:e.hp,max:e.hp,atk:e.atk,move:e.move,range:e.range,shield:e.shield||0,fly:!!e.fly,moved:!ready,attacked:!ready}}
function draw(t,n=1){for(let i=0;i<n;i++){if(!S.decks[t].length){S.decks[t]=shuffle(S.discards[t]);S.discards[t]=[]}if(S.decks[t].length)S.hands[t].push(S.decks[t].pop())}}
function seed(m){
 S={version:4,mode:m,phase:m==='online'?'waiting':'playing',turn:0,round:1,next:1,hp:[24,24],energy:[3,3],cap:3,units:[],hands:[[],[]],decks:[shuffle(POOL),shuffle(POOL)],discards:[[],[]],cycled:[false,false],winner:null};
 S.units.push(unit('v',0,2,6,true),unit('r',0,4,6,true),unit('v',1,2,1,true),unit('b',1,4,1,true));
 for(let t=0;t<2;t++){for(let k of ['v','r','a']){let i=S.decks[t].indexOf(k);if(i>=0)S.decks[t].splice(i,1);S.hands[t].push(k);}draw(t,1)}
}
function save(){if(mode!=='ai'||!S)return;try{localStorage.setItem('aether-dominion-v04',JSON.stringify(S))}catch(e){}}
function load(){try{let x=JSON.parse(localStorage.getItem('aether-dominion-v04'));if(x?.version===4&&x?.mode==='ai'&&Array.isArray(x.units)&&x.units.length<30){S=x;return true}}catch(e){}return false}
const onSpring=t=>springs.filter(k=>{let [x,y]=k.split(',').map(Number);return entity(x,y)?.team===t}).length;
function deploy(t,x,y){if(!bounds(x,y)||rocks.has(K(x,y))||entity(x,y)||(x===3&&(y===0||y===7)))return false;if(t===0&&y>=5||t===1&&y<=2)return true;return springs.some(k=>{let [sx,sy]=k.split(',').map(Number);return entity(sx,sy)?.team===t&&d(P(sx,sy),P(x,y))<=1})}
function movement(u){let queue=[{x:u.x,y:u.y,n:0}],seen=new Set([K(u.x,u.y)]),out=[];while(queue.length){let z=queue.shift();if(z.n>0)out.push(z);if(z.n>=u.move)continue;for(let [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){let x=z.x+dx,y=z.y+dy,k=K(x,y);if(!bounds(x,y)||seen.has(k)||entity(x,y)||(rocks.has(k)&&!u.fly)||(x===3&&(y===0||y===7)))continue;seen.add(k);queue.push({x,y,n:z.n+1})}}return out}
function los(a,b){let n=Math.max(Math.abs(a.x-b.x),Math.abs(a.y-b.y))*5;if(!n)return true;for(let i=1;i<n;i++){let q=i/n,x=Math.round(a.x+(b.x-a.x)*q),y=Math.round(a.y+(b.y-a.y)*q);if((x!==a.x||y!==a.y)&&(x!==b.x||y!==b.y)&&rocks.has(K(x,y)))return false}return true}
function canAttack(a,b){return b&&a.team!==b.team&&d(a,b)<=a.range&&los(a,b)}
function damage(u,target){return u.atk+(high.has(K(u.x,u.y))&&!high.has(K(target.x,target.y))?1:0)}
function applyDamage(target,n){if(target.core){S.hp[target.team]=Math.max(0,S.hp[target.team]-n);if(S.hp[target.team]===0){S.phase='over';S.winner=1-target.team}}else{let absorb=Math.min(target.shield,n);target.shield-=absorb;target.hp-=n-absorb;if(target.hp<=0)S.units=S.units.filter(u=>u.id!==target.id)}}
function discard(t,idx){let k=S.hands[t].splice(idx,1)[0];S.discards[t].push(k);draw(t,1)}
function next(t){if(t===1){S.round++;S.cap=Math.min(10,2+S.round)}S.turn=1-t;S.energy[S.turn]=Math.min(10,S.cap+onSpring(S.turn));S.cycled[S.turn]=false;S.units.filter(u=>u.team===S.turn).forEach(u=>{u.moved=false;u.attacked=false});draw(S.turn,Math.max(0,4-S.hands[S.turn].length))}
function apply(t,a){
 if(!S||S.phase!=='playing'||S.turn!==t||!a||typeof a.op!=='string')return false;
 let x=a.x,y=a.y,validXY=Number.isInteger(x)&&Number.isInteger(y)&&bounds(x,y),u=S.units.find(v=>v.id===a.id&&v.team===t);
 if(a.op==='move'){if(!u||u.moved||!validXY||!movement(u).some(v=>v.x===x&&v.y===y))return false;u.x=x;u.y=y;u.moved=true;log=D[u.k].name+' advances.'}
 else if(a.op==='attack'){
  if(!u||u.attacked||!validXY)return false;
  let target=entity(x,y)||(x===3&&y===(t===0?0:7)?core(1-t):null);
  if(!target||!canAttack(u,target))return false;
  let hit=damage(u,target);u.attacked=true;applyDamage(target,hit);log=D[u.k].name+' strikes for '+hit+'.'
 }else if(a.op==='card'){
  let idx=a.idx;if(!Number.isInteger(idx)||idx<0||idx>=S.hands[t].length||!validXY)return false;
  let k=S.hands[t][idx],q=D[k];if(S.energy[t]<q.cost)return false;
  if(!q.spell){
   let tribute=q.tribute||0,ids=a.tributes||[];
   if(!Array.isArray(ids)||ids.length!==tribute||new Set(ids).size!==ids.length||!ids.every(id=>S.units.some(v=>v.id===id&&v.team===t)))return false;
   if(S.units.filter(v=>v.team===t).length-tribute>=8||!deploy(t,x,y))return false;
   S.units=S.units.filter(v=>!ids.includes(v.id));S.units.push(unit(k,t,x,y));log=q.name+' summoned!';
  }else{
   let target=entity(x,y);
   if(q.spell==='shield'||q.spell==='heal'){
    if(!target||target.team!==t)return false;
    if(q.spell==='shield')target.shield+=4;
    else{target.hp=Math.min(target.max,target.hp+4);target.moved=false;target.attacked=false}
   }else{
    if(!S.units.some(v=>v.team===t&&d(v,P(x,y))<=3))return false;
    let victims=S.units.filter(v=>v.team!==t&&(q.spell==='bolt'?(v.x===x&&v.y===y):d(v,P(x,y))<=1));
    let coreHit=q.spell==='bolt'?(x===3&&y===(t===0?0:7)):d(P(x,y),core(1-t))<=1;
    if(!victims.length&&!coreHit)return false;
    for(let v of [...victims])applyDamage(v,q.power);
    if(coreHit)applyDamage(core(1-t),q.power)
   }
   log=q.name+' cast!';
  }
  S.energy[t]-=q.cost;discard(t,idx);
 }else if(a.op==='cycle'){
  if(S.cycled[t]||!Number.isInteger(a.idx)||a.idx<0||a.idx>=S.hands[t].length)return false;
  discard(t,a.idx);S.cycled[t]=true;log='Card redrawn.'
 }else if(a.op==='end'){log=t===0?'Your turn ended.':'Opponent turn ended.';next(t)}
 else return false;
 return true;
}
function intent(a){if(!S||S.phase!=='playing'||S.turn!==localSeat){message('<b>Not your turn.</b>','Wait for the opposing commander.');return}
 if(mode==='online'&&localSeat===1){if(net)net.intent(a);message('<b>Order sent.</b>','Waiting for the host to confirm your action.');return}
 if(!apply(localSeat,a)){message('<b>That action is not valid.</b>','Choose a legal highlighted tile.');return}
 chosenUnit=null;chosenCard=-1;tributes=[];revision++;
 if(mode==='online'){publish()}else if(S.phase==='playing'&&S.turn===1){aiTurn()}
 save();render();
}
function aiTurn(){
 if(S.phase!=='playing'||S.turn!==1)return;
 let spots=[];for(let y=1;y<=2;y++)for(let x=0;x<7;x++)if(deploy(1,x,y))spots.push(P(x,y));
 if(S.units.filter(u=>u.team===1).length<7&&spots.length){
  let type=shuffle(['v','r','s','b','f','g']).find(k=>D[k].cost<=S.energy[1]);
  if(type){let sp=spots[Math.floor(Math.random()*spots.length)];S.units.push(unit(type,1,sp.x,sp.y));S.energy[1]-=D[type].cost}
 }
 for(let u of [...S.units].filter(u=>u.team===1)){
  if(S.phase==='over')break;
  let goals=()=>[...S.units.filter(v=>v.team===0),core(0)];
  let eligible=goals().filter(v=>canAttack(u,v));
  if(!eligible.length&&!u.moved){
   let paths=movement(u);
   let score=z=>-Math.min(...goals().map(v=>d(z,v)))+(!entity(z.x,z.y)&&springs.includes(K(z.x,z.y))?2.5:0);
   paths.sort((a,b)=>score(b)-score(a));
   if(paths.length&&score(paths[0])>score(u)-.2){u.x=paths[0].x;u.y=paths[0].y;u.moved=true}
   eligible=goals().filter(v=>canAttack(u,v));
  }
  if(eligible.length){eligible.sort((a,b)=>(a.core?4:0)-(b.core?4:0)||((a.hp||99)-(b.hp||99)));let tar=eligible[0];applyDamage(tar,damage(u,tar));u.attacked=true}
 }
 if(S.phase==='playing')next(1);log='The rival army advances.'
}
function message(m,h){msg=m;hint=h||'Select a card or friendly unit.';renderLabels()}
function clearSelection(){chosenCard=-1;chosenUnit=null;tributes=[]}
function selectCard(i){
 if(!S||S.turn!==localSeat||S.phase!=='playing')return;
 if(chosenCard===i){clearSelection();message('<b>Card deselected.</b>');render();return}
 chosenCard=i;chosenUnit=null;tributes=[];
 let q=D[S.hands[localSeat][i]];
 message('<b>'+q.name+'</b> · '+q.cost+' Aeth',q.tribute?'Tap '+q.tribute+' friendly unit(s) to sacrifice, then a highlighted tile.':q.spell?'Tap a valid spell target.':'Tap a glowing teal tile to summon.');render();
}
function chooseTile(vx,vy){
 if(!S||S.phase!=='playing'||S.turn!==localSeat)return;
 let x=localSeat===0?vx:6-vx,y=localSeat===0?vy:7-vy;
 let here=entity(x,y);
 if(chosenCard>=0){
  let q=D[S.hands[localSeat][chosenCard]];
  if(q.tribute&&here?.team===localSeat){
   if(tributes.includes(here.id))tributes=tributes.filter(z=>z!==here.id);
   else if(tributes.length<q.tribute)tributes.push(here.id);
   message('<b>'+tributes.length+' / '+q.tribute+' tributes selected.</b>',tributes.length===q.tribute?'Tap an open teal tile to summon.':'Tap another ally.');render();return;
  }
  if(q.tribute&&tributes.length<q.tribute){message('<b>Select your tribute units first.</b>');return}
  intent({op:'card',idx:chosenCard,x,y,tributes:tributes.slice()});return;
 }
 let u=S.units.find(z=>z.id===chosenUnit);
 if(here?.team===localSeat&&here?.id!==u?.id){chosenUnit=here.id;message('<b>'+D[here.k].name+'</b> · '+here.hp+'/'+here.max+' HP','Blue tiles move; red tiles attack.');render();return}
 if(u){
  if(here?.id===u.id){message('<b>'+D[u.k].name+' is selected.</b>','Tap a highlighted blue tile to move, or a red enemy to attack.');render();return}
  let target=here?.team===1-localSeat||x===3&&y===(localSeat===0?0:7);
  intent({op:target?'attack':'move',id:u.id,x,y});return
 }
 if(here)message('<b>'+D[here.k].name+'</b> · '+here.hp+'/'+here.max+' HP');
 else message('<b>Select a card or one of your units.</b>');
}
function renderLabels(){
 $('instruction').innerHTML=msg||'<b>Welcome, Commander.</b> Select a card or unit.';
 $('tip').textContent=hint||'Summon, position and conquer.';$('feed').textContent=log||'The Riftfront awaits your orders.';
}
function render(){
 if(!S)return;
 const my=localSeat,enemy=1-my,mirror=my===1;
 $('selfhp').innerHTML=S.hp[my]+' <small>/ 24</small>';$('rivalhp').innerHTML=S.hp[enemy]+' <small>/ 24</small>';
 $('selfmeter').style.width=100*S.hp[my]/24+'%';$('rivalmeter').style.width=100*S.hp[enemy]/24+'%';
 $('round').textContent=S.round;$('turnlabel').textContent=S.phase==='over'?'MATCH OVER':S.phase==='waiting'?'AWAITING FRIEND':S.turn===my?'YOUR TURN':'RIVAL TURN';
 $('aeth').textContent=S.energy[my];$('capacity').textContent=' / '+S.cap;
 $('deckcount').textContent=S.decks[my].length+' IN DRAW PILE';$('cycle').disabled=S.cycled[my]||S.turn!==my||S.phase!=='playing';$('end').disabled=S.turn!==my||S.phase!=='playing';
 const unit=S.units.find(u=>u.id===chosenUnit),walk=new Set(unit&&!unit.moved?movement(unit).map(z=>K(z.x,z.y)):[]),targets=new Set(unit&&!unit.attacked?[...S.units.filter(u=>u.team!==localSeat),core(enemy)].filter(z=>canAttack(unit,z)).map(z=>K(z.x,z.y)):[]);
 const card=chosenCard>=0?D[S.hands[my][chosenCard]]:null;
 for(let b of $('board').children){
  let vx=+b.dataset.x,vy=+b.dataset.y,x=mirror?6-vx:vx,y=mirror?7-vy:vy,u=entity(x,y),k=K(x,y),isRock=rocks.has(k),spring=springs.includes(k),isHigh=high.has(k),isCore=x===3&&y===7,enemyCore=x===3&&y===0;
  let mineCore=x===3&&y===(my===0?7:0),rivalCore=x===3&&y===(my===0?0:7);
  b.className='tile'+(vy<=2?' dark':vy>=5?' lit':'')+(isRock?' rock':'')+(isHigh?' high':'')+(spring?' spring':'')+(u&&u.team!==my?' enemyunit':'')+(walk.has(k)?' showmove':'')+(targets.has(k)?' showattack':'')+(card&&!card.spell&&deploy(my,x,y)?' showdeploy':'')+(u?.id===chosenUnit?' selected':'')+(tributes.includes(u?.id)?' tribute':'');
  b.setAttribute('aria-label',u?(u.team===my?'Your ':'Enemy ')+D[u.k].name+' '+u.hp+' HP':mineCore?'Your core':rivalCore?'Rival core':'Arena tile '+(vx+1)+','+(vy+1));
  if(u){b.innerHTML='<img draggable="false" class="unitimg '+(u.team!==my?'foe ':'')+(['t','l'].includes(u.k)?'boss':'')+'" src="'+Art.get(u.k)+'"><div class="hpstrip"><i style="width:'+Math.max(0,u.hp/u.max*100)+'%"></i></div><div class="num">'+u.hp+(u.shield?' ◇':'')+'</div>'+(u.team===my&&!u.attacked?'<i class="dot"></i>':'')}
  else if(isCore||enemyCore||spring||isRock){b.innerHTML='<img draggable="false" class="terrainimg" src="'+Art.terrain(isCore?(mineCore?'core':'enemycore'):enemyCore?(mineCore?'core':'enemycore'):spring?'spring':'rock')+'">'}
  else b.innerHTML=(isHigh?'<span class="up">⌃</span>':'')+'<span class="rune">✦</span>'
 }
 $('hand').innerHTML=S.hands[my].map((k,i)=>{let q=D[k];return '<button class="card '+(q.spell?'spell':q.tribute?'boss':'')+(chosenCard===i?' picked':'')+(q.cost>S.energy[my]||S.turn!==my?' cant':'')+'" data-card="'+i+'"><div class="cardtop"><span class="cost">'+q.cost+'</span><span>'+(q.tribute?'MYTHIC '+q.tribute+' TRIBUTE':q.role)+'</span></div><div class="portrait">'+(portraitIndices[k]===undefined?'<img alt="" draggable="false" src="'+Art.get(k)+'">':'<div class="illustrated-portrait" aria-hidden="true" style="--card-index:'+portraitIndices[k]+';--art-pos:'+portraitPositions[k]+'%"></div>')+'</div><div class="cardname">'+q.name+'</div><div class="carddesc">'+q.desc+'</div><div class="cardstats">'+(q.spell?'✦ INSTANT SPELL':'♥ '+q.hp+' &nbsp; ⚔ '+q.atk+' &nbsp; ↗ '+q.range)+'</div></button>'}).join('');
 renderLabels();
 if(window.AetherScene?.sync)window.AetherScene.sync(S,my,{unit:chosenUnit,card:chosenCard,tributes:tributes.slice()});
 if(S.phase==='over'){$('resulttitle').textContent=S.winner===my?'DOMINION ACHIEVED':'CORE SHATTERED';$('resultdesc').textContent=(S.winner===my?'Your army captured the Riftfront.':'Your army was defeated.')+' Round '+S.round+'.';$('gameover').classList.remove('hidden')}else $('gameover').classList.add('hidden');
}
function publish(){if(net&&mode==='online'&&localSeat===0){net.state({s:S,rev:revision});}}
function startAI(){
 disconnect();mode='ai';localSeat=0;connected=false;clearSelection();
 $('mode-ai').classList.add('active');$('mode-online').classList.remove('active');$('lobby').classList.add('hidden');
 if(!load())seed('ai');message('<b>Single Player</b> · Rune Valley','Tap a card to summon, or tap an ally to command it.');render();
}
function disconnect(){if(net){try{net.leave()}catch(e){}net=null}room='';connected=false}
function startOnline(){
 disconnect();mode='online';localSeat=0;clearSelection();seed('online');
 $('mode-ai').classList.remove('active');$('mode-online').classList.add('active');$('lobby').classList.remove('hidden');
 $('roomid').value='';$('roomstatus').textContent='Create a room, then send the code to your friend.';message('<b>Online Duel</b> · Private playtest','One player hosts; one joins using the same six-character code.');render();
}
function invite(){const text=location.origin+location.pathname+'?room='+room;if(navigator.share){navigator.share({title:'Aether Tactics',text:'Join my Aether Tactics duel: '+room,url:text}).catch(()=>{})}else if(navigator.clipboard)navigator.clipboard.writeText(text).then(()=>$('roomstatus').textContent='Invitation copied to clipboard.').catch(()=>window.prompt('Copy this invitation link',text));else window.prompt('Copy this invitation link',text)}
function join(code,host){
 if(!window.AetherNet?.ready){$('roomstatus').textContent='Network module is still loading, or unavailable. Try again with internet access.';return}
 disconnect();code=code.replace(/[^A-Z0-9]/g,'').toUpperCase().slice(0,8);if(code.length<5){$('roomstatus').textContent='Enter a room code of at least five characters.';return}
 room=code;localSeat=host?0:1;clearSelection();seed('online');
 $('roomid').value=code;$('roomstatus').textContent='Connecting to public signaling relays…';$('invite').classList.toggle('hidden',!host);
 try{net=window.AetherNet.connect(code,host,{
  join:(peer)=>{connected=true;$('lobby').classList.add('hidden');if(host){S.phase='playing';revision++;$('roomstatus').textContent='Friend connected! Battle is ready.';publish()}else{$('roomstatus').textContent='Connected. Receiving match state…'}render()},
  leave:()=>{connected=false;$('roomstatus').textContent='Other player disconnected. Your match remains open for reconnection.';if(host&&S.phase==='playing'){S.phase='waiting';publish()}render()},
  state:(p)=>{if(host||!p?.s||p.s.version!==4)return;S=p.s;revision=p.rev||0;clearSelection();$('roomstatus').textContent=S.phase==='playing'?'Connected! '+(S.turn===1?'Your turn.':'Waiting for host turn.'):'Waiting for the host…';render()},
  intent:(a)=>{if(!host||S.phase!=='playing'||S.turn!==1)return;if(apply(1,a)){clearSelection();revision++;publish();render()}},
  error:(e)=>{$('roomstatus').textContent='Connection issue: '+String(e).slice(0,140)}
 });}catch(error){$('roomstatus').textContent='Could not open room: '+String(error.message||error);return}message('<b>Private room '+code+'</b>',host?'Waiting for your friend to join.':'Waiting to receive the battlefield from your friend.');render();
}
const board=$('board');board.innerHTML='';for(let y=0;y<8;y++)for(let x=0;x<7;x++){let b=document.createElement('button');b.type='button';b.dataset.x=x;b.dataset.y=y;board.appendChild(b)}
board.addEventListener('click',e=>{let b=e.target.closest('button[data-x]');if(b)chooseTile(+b.dataset.x,+b.dataset.y)});
$('hand').addEventListener('click',e=>{let b=e.target.closest('button[data-card]');if(b)selectCard(+b.dataset.card)});
$('end').addEventListener('click',()=>intent({op:'end'}));
$('cycle').addEventListener('click',()=>{if(chosenCard<0){message('<b>Select a card to redraw.</b>');return}intent({op:'cycle',idx:chosenCard})});
$('reset').addEventListener('click',()=>{if(mode==='online'){if(confirm('Leave this duel and return to solo play?'))startAI()}else if(confirm('Start a fresh solo battle?')){seed('ai');clearSelection();save();render()}});
$('again').addEventListener('click',()=>{if(mode==='online'){startOnline()}else{seed('ai');clearSelection();save();render()}});
$('mode-ai').addEventListener('click',startAI);$('mode-online').addEventListener('click',()=>{if(mode==='online'){$('lobby').classList.toggle('hidden');return}startOnline()});$('close-lobby').addEventListener('click',()=>{$('lobby').classList.add('hidden')});
$('make-room').addEventListener('click',()=>{let alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',code='';const bytes=new Uint8Array(6);crypto.getRandomValues(bytes);for(let b of bytes)code+=alphabet[b%alphabet.length];join(code,true)});
$('join-room').addEventListener('click',()=>join($('roomid').value,false));
$('invite').addEventListener('click',invite);
$('roomid').addEventListener('input',e=>e.target.value=e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,8));
$('rules').addEventListener('click',()=>alert('AETHER TACTICS — COMMANDER GUIDE\n\nTap a card and tap a teal tile to summon. Tap a friendly unit to select; blue tiles are legal movement, red targets can be attacked. Each unit may move once and attack once per turn.\n\nAeth increases from 3 to 10, with bonus energy for occupying springs. Raised terrain adds 1 attack damage. Rocks block ranged fire. Mythic summons require sacrificing friendly units.\n\nOnline: Create a room, share a code or link with your friend, and remain online during the match. The host validates moves. Public WebRTC relays are used for discovery; certain mobile networks may require TURN and could fail to connect.'));
window.addEventListener('aether-network-ready',()=>{if($('roomstatus').textContent.includes('loading'))$('roomstatus').textContent='Network ready. Create or join a room.'});
window.AetherGame={get:()=>S,startAI,startOnline,apply,publish};
startAI();
const inviteCode=new URLSearchParams(location.search).get('room');if(inviteCode){startOnline();$('roomid').value=inviteCode.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,8);$('roomstatus').textContent='Invitation detected. Tap Join Room to connect.'}
})();
