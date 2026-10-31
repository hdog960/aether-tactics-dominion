
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
h:{name:'Aeth Renewal',cost:2,spell:'heal',role:'Spell',desc:'Heal 4; refresh its actions.'},
c:{name:'Ember Adept',cost:3,hp:3,atk:2,range:2,move:1,role:'Pyromancer',desc:'Ranged mage; burns targets.'},
j:{name:'Thorn Warden',cost:3,hp:6,atk:1,range:1,move:2,role:'Controller',desc:'Root enemies it hits.'},
p:{name:'Tidecaller',cost:4,hp:5,atk:1,range:2,move:1,role:'Support',desc:'Heals an ally each turn.'},
k:{name:'Storm Lancer',cost:4,hp:5,atk:3,range:1,move:2,role:'Cavalier',desc:'Charge for bonus damage.'},
d:{name:'Wisp Familiar',cost:2,hp:2,atk:1,range:2,move:3,fly:true,role:'Familiar',desc:'Fast, cheap flying utility.'},
q:{name:'Quickstep',cost:1,spell:'dash',role:'Spell',desc:'Refresh allied movement once per round.'},
e:{name:'Frostbind',cost:2,spell:'frost',power:1,role:'Spell',desc:'Damage and briefly root an enemy.'},
i:{name:'Ember Sigil',cost:2,spell:'ignite',power:2,role:'Spell',desc:'Deal 2 and inflict 1 burn.'},
n:{name:'Rallying Cry',cost:3,spell:'rally',role:'Spell',desc:'Give nearby allies +1 next attack.'},
x:{name:'Purifying Rain',cost:2,spell:'cleanse',role:'Spell',desc:'Remove debuffs and give 2 shield.'},
o:{name:'Echo Scribe',cost:3,hp:3,atk:1,range:2,move:2,role:'Archivist',desc:'Draw a card when summoned (up to five in hand).'},
y:{name:'Crypt Keeper',cost:4,hp:6,atk:2,range:1,move:1,role:'Guardian',desc:'On defeat, give 2 shield to a nearby ally.'},
z:{name:'Rune Conductor',cost:4,hp:4,atk:1,range:2,move:2,role:'Runecaster',desc:'Your spells charge its next attack.'},
A:{name:'Dusk Reclaimer',cost:5,hp:6,atk:3,range:1,move:2,role:'Reclaimer',desc:'Defeating a unit restores 2 health.'},
B:{name:'Oath Sentinel',cost:4,hp:6,atk:2,range:1,move:1,role:'Oathkeeper',desc:'Allied sacrifices empower its next attack.'},
C:{name:'Echo Retrieval',cost:2,spell:'recall',role:'Spell',desc:'Recover your latest discarded non-mythic unit.'},
D:{name:'Veil Snare',cost:2,spell:'snare',role:'Trap',desc:'Hide a rune that strikes an enemy entering its tile.'},
E:{name:'Twin Convergence',cost:3,spell:'bond',role:'Spell',desc:'Shield and briefly empower nearby allies.'},
F:{name:'Fateful Exchange',cost:2,spell:'exchange',role:'Ritual',desc:'Sacrifice an ally to draw two and regain 2 Aeth.'},
G:{name:'Null Chime',cost:2,spell:'silence',role:'Hex',desc:'Strip enemy shield and weaken its next attack.'}
};
// Core and stat revisions; existing v4 match snapshots remain loadable.
const BALANCE_PATCH={"t":{"tribute":1,"hp":14},"h":{"cost":3,"desc":"Restore 3 HP and refresh actions once per round."},"w":{"desc":"Give up to 4 shield, maximum 5 total."},"z":{"hp":5,"atk":2},"y":{"hp":7,"move":2},"A":{"hp":8},"B":{"hp":7,"move":2},"F":{"cost":3,"desc":"Sacrifice one ally, draw up to two and regain 2 Aeth."},"D":{"desc":"Place a concealed 3-damage snare lasting four rounds."},"G":{"desc":"Remove 3 shield and reduce the next strike by 2."},"f":{"hp":3},"d":{"range":1},"p":{"move":2},"o":{"hp":4,"desc":"On summon, return your last spent spell to the top of your deck, or gain 1 shield."}};
for(const [k,patch]of Object.entries(BALANCE_PATCH))Object.assign(D[k],patch);
const ABILITIES={"v":{"name":"Forward Guard","desc":"Once each round, moving next to an enemy gives this Vanguard 1 shield (never stacks above 1)."},"b":{"name":"Prism Cover","desc":"Adjacent friendly units take 1 less damage from basic attacks (minimum 1). Multiple Bulwarks do not stack."},"r":{"name":"Longshot","desc":"Basic attacks at exactly 3 tiles deal +1 damage if this Ranger has not moved this turn."},"s":{"name":"Pack Hunter","desc":"Deal +1 damage to an enemy unit if another friendly unit is adjacent to that enemy."},"f":{"name":"Slipstream","desc":"After moving, protect a nearby ally or self with 1 shield, once per round."},"g":{"name":"Stoneheart","desc":"The first hit received each round deals 1 less damage (minimum 1), including spells."},"t":{"name":"Aftershock","desc":"After each basic attack on a unit, deal 1 splash damage to one different enemy unit adjacent to the target."},"l":{"name":"Tidal Brand","desc":"A basic attack on a surviving enemy unit marks it; the next allied basic attack against that enemy gains +1 damage. The mark expires at your next turn."},"c":{"name":"Searing Shot","desc":"Basic attacks burn enemies for 1 damage at the start of their next turn. Burn does not stack."},"j":{"name":"Entangling Strike","desc":"Basic attacks root their target for its next turn. Rooted units can attack but cannot move."},"p":{"name":"Soothing Current","desc":"At the end of your turn, heal 1 HP on the most injured adjacent ally."},"k":{"name":"Thunder Charge","desc":"After moving 2 squares, deal +1 damage with your next basic attack that turn."},"d":{"name":"Aeth Spark","desc":"The first Wisp summoned each round refunds 1 Aeth; later Wisps cost 2."}};
Object.assign(ABILITIES,{
 o:{name:'Margin Note',desc:'Once per round, recycle the last spent spell on summon; otherwise gain 1 shield.'},
 y:{name:'Parting Lantern',desc:'On defeat, grant 2 shield to the closest surviving ally, within 2 tiles.'},
 z:{name:'Rune Echo',desc:'Your first spell cast each round gives this unit +1 on its next attack that round.'},
 A:{name:'Dusk Harvest',desc:'If this unit defeats another creature with a basic attack, restore 2 health (up to maximum).'},
 B:{name:'Oathbound',desc:'When you sacrifice an allied unit, this Sentinel gains 2 shield and +1 on its next attack, once each round.'}
});
for(const [key,a] of Object.entries(ABILITIES)){D[key].ability=a.name;D[key].abilityText=a.desc}
const portraitIndices={v:0,r:1,b:2,s:3,f:4,g:5,a:6};
const portraitPositions={v:0,r:16.6667,b:33.3333,s:50,f:66.6667,g:83.3333,a:100};
const OLD_POOL=['v','v','v','b','b','r','r','s','s','f','f','g','t','l','a','a','a','m','w','w','h'];
const PACKS={"Balanced":["v","v","v","b","b","r","r","s","s","f","f","g","t","l","a","a","a","m","w","w","h","c","p","e"],"Assault":["v","v","v","s","s","s","k","k","k","d","d","d","j","j","f","f","r","r","a","a","a","q","q","q"],"Fortress":["b","b","b","g","g","g","p","p","p","j","j","v","v","v","r","r","c","c","w","w","w","h","h","x"],"Arcane":["r","r","r","c","c","c","p","p","p","d","d","d","b","b","v","v","a","a","a","m","m","i","i","n"],"Skirmish":["f","f","f","s","s","s","k","k","k","d","d","r","r","r","v","v","l","j","q","q","e","e","a","a"]};
Object.assign(PACKS,{"Echo":["v","v","o","o","o","z","z","z","p","p","b","b","r","r","d","d","y","y","C","C","E","E","q","x"],"Ritual":["v","v","v","B","B","B","y","y","A","A","o","o","j","j","t","l","F","F","C","C","D","D","G","w"]});
const CARD_KEYS=Object.keys(D),DECK_SIZE=24,MAX_COPIES=3,DECK_STORE='aether-dominion-deck-v20';
function checkDeck(deck){
 if(!Array.isArray(deck)||deck.length!==DECK_SIZE||deck.some(k=>!CARD_KEYS.includes(k)))return false;
 const copies={},units=deck.filter(k=>!D[k].spell),mythics=units.filter(k=>D[k].tribute);
 for(const k of deck){copies[k]=(copies[k]||0)+1;if(copies[k]>MAX_COPIES)return false}
 return units.length>=12&&mythics.length<=2&&new Set(units).size>=3;
}
function loadDeck(){try{const d=JSON.parse(localStorage.getItem(DECK_STORE));if(checkDeck(d))return d}catch(e){}return PACKS.Balanced.slice()}
let chosenDeck=loadDeck(),draftDeck=chosenDeck.slice();
function persistDeck(){try{localStorage.setItem(DECK_STORE,JSON.stringify(chosenDeck))}catch(e){}}

// Independent persistent progression. Match snapshots remain v4-compatible.
// Local-only profile; server-backed authentication and anti-cheat are future work.
const PROFILE_STORE='aether-dominion-profile-v21',MAX_CARD_LEVEL=8;
function freshProfile(){return{version:1,level:1,xp:0,gold:0,matches:0,wins:0,
 copies:{v:2,r:2,a:2},levels:{},claimed:{},last:null}}
function loadProfile(){
 try{
  const saved=JSON.parse(localStorage.getItem(PROFILE_STORE));if(!saved||saved.version!==1)return freshProfile();
  return{...freshProfile(),...saved,levels:saved.levels||{},copies:saved.copies||{},claimed:saved.claimed||{}};
 }catch(e){return freshProfile()}
}
let profile=loadProfile();
function saveProfile(){try{localStorage.setItem(PROFILE_STORE,JSON.stringify(profile))}catch(e){}}
function xpNeeded(level){return 90+(level-1)*45}
function cardLevel(k){return Math.max(1,Math.min(MAX_CARD_LEVEL,profile.levels[k]||1))}
function cardUpgradeCost(k){const lv=cardLevel(k);return{copies:lv+1,gold:lv*60}}
function canUpgrade(k){const cost=cardUpgradeCost(k);return CARD_KEYS.includes(k)&&cardLevel(k)<MAX_CARD_LEVEL&&profile.gold>=cost.gold&&(profile.copies[k]||0)>=cost.copies}
function upgradeCard(k){
 if(!canUpgrade(k))return false;
 const cost=cardUpgradeCost(k);profile.gold-=cost.gold;profile.copies[k]-=cost.copies;
 profile.levels[k]=cardLevel(k)+1;saveProfile();return true;
}
// Solo upgrades are deliberately gentle. Competitive online battles run base
// stats so a veteran cannot overpower a new opponent through progression.
function combatLevel(k,t){return mode==='ai'&&t===0?(S?.cardRanks?.[k]||1):1}
function unitBonuses(k,t){const lv=combatLevel(k,t);return{hp:Math.floor(lv/2),atk:Math.floor((lv-1)/4)}}
function spellBonus(k,t){return Math.min(2,Math.floor(combatLevel(k,t)/2))}
function awardMatch(){
 if(!S||mode!=='ai'||S.mode!=='ai'||S.phase!=='over'||![0,1,-1].includes(S.winner))return null;
 if(profile.claimed[S.matchId])return profile.last||null;
 const victory=S.winner===localSeat,drawn=S.winner===-1,rounds=Math.min(12,S.round||1);
 const xp=(victory?95:drawn?38:45)+rounds*3,coins=(victory?85:drawn?35:40)+rounds*3;
 profile.matches++;if(victory)profile.wins++;
 profile.gold+=coins;profile.xp+=xp;
 const oldLevel=profile.level;
 while(profile.xp>=xpNeeded(profile.level)&&profile.level<100){
  profile.xp-=xpNeeded(profile.level);profile.level++;
 }
 const rewards=[];
 const pool=Array.isArray(S.rewardPool)&&S.rewardPool.length?S.rewardPool:[...(S.decks[localSeat]||[]),...(S.hands[localSeat]||[]),...(S.discards[localSeat]||[]),...S.units.filter(u=>u.team===localSeat).map(u=>u.k)];
 for(let i=0;i<(victory?3:2);i++){
  const k=pool.length?pool[Math.floor(Math.random()*pool.length)]:CARD_KEYS[Math.floor(Math.random()*CARD_KEYS.length)];
  if(!D[k])continue;profile.copies[k]=(profile.copies[k]||0)+1;rewards.push(k);
 }
 const record={matchId:S.matchId,victory,drawn,xp,gold:coins,rewards,
   levelUp:profile.level>oldLevel,level:profile.level};
 profile.claimed[S.matchId]=1;profile.last=record;
 // Keep a limited anti-duplicate history across reloads.
 const ids=Object.keys(profile.claimed);
 if(ids.length>200)for(const id of ids.slice(0,ids.length-200))delete profile.claimed[id];
 saveProfile();return record;
}
function profileSummary(){
 return {level:profile.level,xp:profile.xp,xpNext:xpNeeded(profile.level),gold:profile.gold,
 wins:profile.wins,matches:profile.matches,last:profile.last}
}

const rocks=new Set(['0,3','6,3','2,3','4,4']),springs=['1,3','5,4'],high=new Set(['2,2','4,2','3,3','3,4','2,5','4,5']);
let S=null,localSeat=0,mode='ai',net=null,room='',chosenUnit=null,chosenCard=-1,inspectedTile=null,tributes=[],msg='',hint='',log='',connected=false,revision=0;
let victoryDelay=null,victoryVisible=false;
const K=(x,y)=>x+','+y,P=(x,y)=>({x,y}),d=(a,b)=>Math.abs(a.x-b.x)+Math.abs(a.y-b.y),bounds=(x,y)=>x>=0&&x<7&&y>=0&&y<8;
const entity=(x,y)=>S.units.find(u=>u.x===x&&u.y===y),core=t=>({core:true,team:t,x:3,y:t===0?7:0});
function shuffle(arr){let a=arr.slice();for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a}
function unit(k,team,x,y,ready=false){
 let e=D[k],bonuses=unitBonuses(k,team),hp=e.hp+bonuses.hp,atk=e.atk+bonuses.atk;
 return{id:S.next++,k,team,x,y,hp,max:hp,atk,move:e.move,range:e.range,shield:e.shield||0,fly:!!e.fly,moved:!ready,attacked:!ready}
}
function draw(t,n=1,allowReshuffle=false){
 for(let i=0;i<n&&S.hands[t].length<5;i++){
  if(!S.decks[t].length){
   if(!allowReshuffle||!S.discards[t].length)break;
   S.decks[t]=shuffle(S.discards[t]);S.discards[t]=[];
  }
  if(S.decks[t].length)S.hands[t].push(S.decks[t].pop());
 }
}
function seed(m){
 const aiStyle=m==='ai'?Object.keys(PACKS)[Math.floor(Math.random()*Object.keys(PACKS).length)]:'Balanced';
 const cardRanks=Object.fromEntries(CARD_KEYS.map(k=>[k,cardLevel(k)]));
 S={version:4,rewardPool:chosenDeck.slice(),cardRanks,matchId:'m'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10),mode:m,phase:m==='online'?'waiting':'playing',turn:0,round:1,next:1,hp:[24,24],energy:[3,3],cap:3,units:[],hands:[[],[]],aiStyle,decks:[shuffle(chosenDeck),shuffle(PACKS[aiStyle])],discards:[[],[]],traps:[],cycled:[false,false],winner:null};
 S.units.push(unit('v',0,2,6,true),unit('r',0,4,6,true),unit('v',1,2,1,true),unit('b',1,4,1,true));
 for(let t=0;t<2;t++){for(let k of ['v','r','a']){let i=S.decks[t].indexOf(k);if(i>=0){S.decks[t].splice(i,1);S.hands[t].push(k)}}draw(t,Math.max(0,4-S.hands[t].length))}
}
function save(){if(mode!=='ai'||!S)return;try{localStorage.setItem('aether-dominion-v04',JSON.stringify(S))}catch(e){}}
function load(){try{let x=JSON.parse(localStorage.getItem('aether-dominion-v04'));if(x?.version===4&&x?.mode==='ai'&&Array.isArray(x.units)&&x.units.length<30){S=x;let migrated=false;if(!S.matchId){S.matchId='legacy-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8);migrated=true}if(!Array.isArray(S.traps)){S.traps=[];migrated=true}for(const u of S.units){if((u.shield||0)>5){u.shield=5;migrated=true}}if(migrated)save();return true}}catch(e){}return false}
const onSpring=t=>springs.filter(k=>{let [x,y]=k.split(',').map(Number);return entity(x,y)?.team===t}).length;
function deploy(t,x,y){if(!bounds(x,y)||rocks.has(K(x,y))||entity(x,y)||(x===3&&(y===0||y===7)))return false;if(t===0&&y>=5||t===1&&y<=2)return true;return springs.some(k=>{let [sx,sy]=k.split(',').map(Number);return entity(sx,sy)?.team===t&&d(P(sx,sy),P(x,y))<=1})}
function movement(u){let queue=[{x:u.x,y:u.y,n:0}],seen=new Set([K(u.x,u.y)]),out=[];while(queue.length){let z=queue.shift();if(z.n>0)out.push(z);if(z.n>=u.move)continue;for(let [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){let x=z.x+dx,y=z.y+dy,k=K(x,y);if(!bounds(x,y)||seen.has(k)||entity(x,y)||(rocks.has(k)&&!u.fly)||(x===3&&(y===0||y===7)))continue;seen.add(k);queue.push({x,y,n:z.n+1})}}return out}
function los(a,b){let n=Math.max(Math.abs(a.x-b.x),Math.abs(a.y-b.y))*5;if(!n)return true;for(let i=1;i<n;i++){let q=i/n,x=Math.round(a.x+(b.x-a.x)*q),y=Math.round(a.y+(b.y-a.y)*q);if((x!==a.x||y!==a.y)&&(x!==b.x||y!==b.y)&&rocks.has(K(x,y)))return false}return true}
function canAttack(a,b){return b&&a.team!==b.team&&d(a,b)<=a.range&&los(a,b)}
// Each unit has one bounded, positional innate ability. All effects happen
// inside authoritative game state so AI, saved matches and online hosts agree.
function abilityPulse(target,kind,amount){
 fxPush({type:'buff',kind,to:fxTarget(target),amount});
}
function nearestAlly(u,radius=2){
 return S.units.filter(v=>v.team===u.team&&v.id!==u.id&&d(v,u)<=radius)
   .sort((a,b)=>d(a,u)-d(b,u)||a.hp/a.max-b.hp/b.max||a.id-b.id)[0]||null;
}
function onUnitDeath(u){
 if(u.k==='y'){const ally=nearestAlly(u,2);
  if(ally){const amt=grantShield(ally,2);abilityPulse(ally,'shield',amt)}
 }
}
function onSacrifice(t){
 for(const u of S.units.filter(v=>v.team===t&&v.k==='B'&&v.oathRound!==S.round)){
  u.oathRound=S.round;const amt=grantShield(u,2);u.oathBonus=1;abilityPulse(u,'shield',amt);
 }
}
function onFriendlySpell(t){
 for(const u of S.units.filter(v=>v.team===t&&v.k==='z'&&v.runeRound!==S.round)){
  u.runeRound=S.round;u.runeCharge=1;abilityPulse(u,'rally',0);
 }
}
function trapImpact(u){
 const list=S.traps||[],i=list.findIndex(t=>t.team!==u.team&&t.x===u.x&&t.y===u.y);
 if(i<0)return;
 const trap=list.splice(i,1)[0];
 const impact=trap.damage||3;fxSpell(u,impact,'snare',u.x,u.y,trap.team);applyDamage(u,impact);
 log='Veil Snare triggered for '+impact+' damage!';
}
const MAX_SHIELD=5,ROUND_LIMIT=24;
function matchValue(team){
 const friends=S.units.filter(u=>u.team===team);
 return S.hp[team]*100+onSpring(team)*20+
  friends.reduce((sum,u)=>sum+(u.hp/Math.max(1,u.max))*4+(u.shield||0)*.25,0);
}
function endByScore(){
 const a=matchValue(0),b=matchValue(1);
 S.winner=Math.abs(a-b)<.001?-1:a>b?0:1;
 S.phase='over';S.resolvedByScore=true;
 log=S.winner===-1?'Riftfront ends in a draw.':'The Riftfront is decided by core health and board control.';
}

function grantShield(u,n){const old=Math.min(MAX_SHIELD,Math.max(0,u.shield||0));u.shield=Math.min(MAX_SHIELD,old+Math.max(0,n));return u.shield-old}
function powerFor(q,t){const k=CARD_KEYS.find(k=>D[k]===q);return(q.power||0)+spellBonus(k,t)}

function afterMove(u){
 // Entering a concealed snare resolves before arrival-based shield bonuses.
 trapImpact(u);
 if(!S.units.some(v=>v.id===u.id))return;
 if(u.k==='v'&&u.braceRound!==S.round&&u.shield<1&&
    S.units.some(v=>v.team!==u.team&&d(v,u)===1)){
  grantShield(u,1);u.braceRound=S.round;abilityPulse(u,'shield',1);
  log='Forward Guard: '+D[u.k].name+' gains 1 shield.';
 }
 if(u.k==='f'&&u.escortRound!==S.round){
  const nearby=S.units.filter(v=>v.team===u.team&&v.id!==u.id&&d(u,v)===1&&v.shield<2)
   .sort((a,b)=>a.shield-b.shield||a.hp/a.max-b.hp/b.max||a.id-b.id);
  if(nearby.length){
   const ally=nearby[0];grantShield(ally,1);u.escortRound=S.round;
   abilityPulse(ally,'shield',1);log='Slipstream: '+D[ally.k].name+' receives a shield.';
  }else if((u.shield||0)<1){
   grantShield(u,1);u.escortRound=S.round;abilityPulse(u,'shield',1);
  }
 }
}
function damage(u,target){
 let n=u.atk+(high.has(K(u.x,u.y))&&!high.has(K(target.x,target.y))?1:0);
 if(u.k==='r'&&!u.moved&&d(u,target)===3)n++;
 if(u.k==='s'&&!target.core&&S.units.some(v=>v.team===u.team&&v.id!==u.id&&d(v,target)===1))n++;
 if(u.k==='k'&&u.stride>=2)n++;
 if(u.k==='z'&&u.runeCharge){n++;u.runeCharge=0}
 if(u.k==='B'&&u.oathBonus){n++;u.oathBonus=0}
 if(u.weakened){n=Math.max(1,n-(u.weakened===true?1:u.weakened));u.weakened=false}
 if(u.rallied){n++;u.rallied=0;}
 if(!target.core&&target.brandedFor===u.team){n++;delete target.brandedFor}
 return n;
}
function mitigate(target,n,physical){
 if(target.core)return n;
 let value=n;
 if(physical&&S.units.some(v=>v.k==='b'&&v.team===target.team&&v.id!==target.id&&d(v,target)===1))
  value=Math.max(1,value-1);
 if(target.k==='g'&&target.stoneRound!==S.round){
  target.stoneRound=S.round;value=Math.max(1,value-1);
 }
 return value;
}
function basicStrike(attacker,target){
 const raw=damage(attacker,target),actual=mitigate(target,raw,true);
 fxStrike(attacker,target,actual);
 const wasUnit=!target.core&&S.units.some(v=>v.id===target.id);
 applyDamage(target,actual);
 if(wasUnit&&attacker.k==='A'&&!S.units.some(v=>v.id===target.id)){
  const heal=Math.min(2,attacker.max-attacker.hp);attacker.hp+=heal;
  if(heal)abilityPulse(attacker,'heal',heal);
 }
 // Leviathan's mark is not allowed to affect cores or already defeated units.
 if(!target.core&&S.units.some(v=>v.id===target.id)){
  if(attacker.k==='c')target.burning=true;
  if(attacker.k==='j')target.rooted=true;
 }
 if(attacker.k==='l'&&!target.core&&S.units.some(v=>v.id===target.id))
  target.brandedFor=attacker.team;
 // Shockwave follows the primary blow, hits only a SECOND enemy unit.
 if(attacker.k==='t'&&!target.core){
  const adjacent=S.units.filter(v=>v.team!==attacker.team&&v.id!==target.id&&d(v,target)===1)
   .sort((a,b)=>a.hp-b.hp||a.id-b.id);
  if(adjacent.length){
   const second=adjacent[0],splash=mitigate(second,1,true);
   fxPush({type:'spell',kind:'aftershock',from:fxTarget(attacker),to:fxTarget(second),
     amount:Math.min(second.hp,Math.max(0,splash-second.shield)),blocked:Math.min(splash,second.shield),lethal:second.hp<=splash-second.shield});
   applyDamage(second,splash);
  }
 }
 return actual;
}
// Purely visual combat log, carried with the authoritative match state so the
// same attack effects reach both phones. No animation delays game rules.
function fxPush(event){
 if(!S)return;
 S.fxSeq=(S.fxSeq||0)+1;
 (S.fxEvents||(S.fxEvents=[])).push({id:S.fxSeq,...event});
 if(S.fxEvents.length>32)S.fxEvents.splice(0,S.fxEvents.length-32);
}
function fxTarget(u){return{id:u.id||null,team:u.team,x:u.x,y:u.y,core:!!u.core,k:u.k||null}}
function fxStrike(attacker,target,n,kind){
 const blocked=target.core?0:Math.min(target.shield||0,n);
 const dealt=target.core?Math.min(S.hp[target.team],n):Math.min(Math.max(0,target.hp),n-blocked);
 const dead=target.core?S.hp[target.team]<=n:target.hp<=n-blocked;
 fxPush({type:'strike',kind:kind||(attacker.range>1||attacker.fly?'ranged':'melee'),
   from:fxTarget(attacker),to:fxTarget(target),
   amount:dealt,blocked,lethal:dead});
}
function fxSpell(target,n,spell,x,y,t){
 const blocked=target.core?0:Math.min(target.shield||0,n);
 const dealt=target.core?Math.min(S.hp[target.team],n):Math.min(Math.max(0,target.hp),n-blocked);
 fxPush({type:'spell',kind:spell,from:{x,y,team:t},to:fxTarget(target),
   amount:dealt,blocked,lethal:target.core?S.hp[target.team]<=n:target.hp<=n-blocked});
}
function applyDamage(target,n){if(target.core){S.hp[target.team]=Math.max(0,S.hp[target.team]-n);if(S.hp[target.team]===0){S.phase='over';S.winner=1-target.team}}else{let absorb=Math.min(target.shield,n);target.shield-=absorb;target.hp-=n-absorb;if(target.hp<=0){onUnitDeath(target);S.units=S.units.filter(u=>u.id!==target.id)}}}

function endSupportTurn(team){
 const supports=S.units.filter(u=>u.team===team&&u.k==='p');
 for(const healer of supports){
  const allies=S.units.filter(v=>v.team===team&&v.id!==healer.id&&d(v,healer)===1&&v.hp<v.max)
    .sort((a,b)=>(b.max-b.hp)-(a.max-a.hp)||a.id-b.id);
  if(allies.length){allies[0].hp++;abilityPulse(allies[0],'heal',1)}
 }
 for(const u of S.units.filter(u=>u.team===team)){
  u.rooted=false;u.stride=0;
 }
}
function startStatusTurn(team){
 for(const u of [...S.units].filter(u=>u.team===team&&u.burning)){
  u.burning=false;
  fxSpell(u,1,'ignite',u.x,u.y,1-team);
  applyDamage(u,1);
 }
}
function validSpellSpot(q,t,x,y){
 const target=entity(x,y),type=q.spell;
 if(['shield','heal','dash','cleanse','rally','bond','exchange','recall'].includes(type)){
  if(type==='recall'){
   const discarded=S.discards[t].some(k=>!D[k].spell&&!D[k].tribute);
   return discarded&&S.hands[t].length<=5&&S.echoRound?.[t]!==S.round&&
    (!!target&&target.team===t||x===3&&y===(t===0?7:0));
  }
  if(!target||target.team!==t)return false;
  if(type==='dash'&&target.dashRound===S.round)return false;
  if(type==='heal'&&(target.renewedRound===S.round||target.hp>=target.max&&!target.moved&&!target.attacked))return false;
  if(type==='shield'&&target.shield>=MAX_SHIELD)return false;
  if(type==='exchange'&&(S.exchangeRound?.[t]===S.round||S.units.filter(v=>v.team===t).length<2))return false;
  return true;
 }
 if(type==='snare'){
  return !target&&!rocks.has(K(x,y))&&!(x===3&&(y===0||y===7))&&
    !S.traps?.some(v=>v.team===t)&&
    S.units.some(v=>v.team===t&&d(v,P(x,y))<=2);
 }
 if(!S.units.some(v=>v.team===t&&d(v,P(x,y))<=3))return false;
 if(['frost','ignite','silence'].includes(type))return !!target&&target.team!==t;
 if(type==='bolt')return target?.team===1-t||(x===3&&y===(t===0?0:7));
 if(type==='cross')return S.units.some(v=>v.team!==t&&d(v,P(x,y))<=1)||d(P(x,y),core(1-t))<=1;
 return false;
}
function resolveSpell(q,t,x,y){
 const target=entity(x,y),type=q.spell;
 if(!validSpellSpot(q,t,x,y))return false;
 const power=powerFor(q,t),boost=spellBonus(CARD_KEYS.find(k=>D[k]===q),t);
 if(type==='shield'){const n=grantShield(target,4+boost);abilityPulse(target,'shield',n)}
 else if(type==='heal'){const heal=Math.min(3+boost,target.max-target.hp);target.hp+=heal;
  target.moved=false;target.attacked=false;target.renewedRound=S.round;abilityPulse(target,'heal',heal)}
 else if(type==='dash'){target.moved=false;target.stride=0;target.dashRound=S.round;if(boost)grantShield(target,boost);abilityPulse(target,'dash',0)}
 else if(type==='cleanse'){target.rooted=false;target.burning=false;target.shield+=2+boost;abilityPulse(target,'shield',2+boost)}
 else if(type==='rally'){
  for(const ally of S.units.filter(v=>v.team===t&&d(v,target)<=1)){
   ally.rallied=1;if(boost)grantShield(ally,boost);abilityPulse(ally,'rally',0)
  }
 }else if(type==='bond'){
  for(const ally of S.units.filter(v=>v.team===t&&d(v,target)<=1).slice(0,3)){
   const amt=grantShield(ally,1+boost);ally.rallied=1;abilityPulse(ally,'shield',amt)
  }
 }else if(type==='recall'){
  S.echoRound||(S.echoRound=[0,0]);
  const i=S.discards[t].findLastIndex(k=>!D[k].spell&&!D[k].tribute);
  if(i<0)return false;
  const card=S.discards[t].splice(i,1)[0];
  S.hands[t].push(card);S.echoRound[t]=S.round;S.energy[t]=Math.min(10,S.energy[t]+Math.min(1,boost));
  fxPush({type:'buff',kind:'rally',to:{x,y,team:t},amount:0});
 }else if(type==='snare'){
  S.traps||(S.traps=[]);
  S.traps.push({team:t,x,y,expires:S.round+4,damage:3+boost});
  fxPush({type:'buff',kind:'rally',to:{x,y,team:t},amount:0});
 }else if(type==='exchange'){
  S.exchangeRound||(S.exchangeRound=[0,0]);S.exchangeRound[t]=S.round;
  onSacrifice(t);
  S.units=S.units.filter(v=>v.id!==target.id);
  fxPush({type:'spell',kind:'exchange',to:fxTarget(target),amount:0});
 }else if(type==='silence'){
  target.shield=Math.max(0,target.shield-3-boost);
  target.rallied=0;target.runeCharge=0;target.oathBonus=0;target.weakened=2;
  fxPush({type:'spell',kind:'silence',to:fxTarget(target),amount:0});
 }else if(['frost','ignite'].includes(type)){
  const amount=mitigate(target,power,false);fxSpell(target,amount,type,x,y,t);applyDamage(target,amount);
  if(S.units.some(v=>v.id===target.id)){if(type==='frost')target.rooted=true;if(type==='ignite')target.burning=true}
 }else{
  const victims=S.units.filter(v=>v.team!==t&&(type==='bolt'?(v.x===x&&v.y===y):d(v,P(x,y))<=1));
  for(const victim of [...victims]){const amount=mitigate(victim,power,false);fxSpell(victim,amount,type,x,y,t);applyDamage(victim,amount)}
  const coreHit=type==='bolt'?(x===3&&y===(t===0?0:7)):d(P(x,y),core(1-t))<=1;
  if(coreHit){const enemyCore=core(1-t);fxSpell(enemyCore,power,type,x,y,t);applyDamage(enemyCore,power)}
 }
 return true;
}
function discard(t,idx){let k=S.hands[t].splice(idx,1)[0];S.discards[t].push(k);draw(t,1)}
function next(t){
 endSupportTurn(t);
 if(t===1){S.round++;S.cap=Math.min(10,2+S.round);if(S.round>ROUND_LIMIT){endByScore();return}}
 S.turn=1-t;S.energy[S.turn]=Math.min(10,S.cap+onSpring(S.turn));
 S.cycled[S.turn]=false;
 S.units.filter(u=>u.team===S.turn).forEach(u=>{u.moved=false;u.attacked=false;u.stride=0;u.runeCharge=0});
 S.units.forEach(u=>{if(u.brandedFor===S.turn)delete u.brandedFor});
 S.traps=(S.traps||[]).filter(v=>v.expires>=S.round);
 startStatusTurn(S.turn);
 draw(S.turn,Math.max(0,4-S.hands[S.turn].length),true);
}
function apply(t,a){
 if(!S||S.phase!=='playing'||S.turn!==t||!a||typeof a.op!=='string')return false;
 let x=a.x,y=a.y,validXY=Number.isInteger(x)&&Number.isInteger(y)&&bounds(x,y),u=S.units.find(v=>v.id===a.id&&v.team===t);
 if(a.op==='move'){if(!u||u.moved||u.rooted||!validXY||!movement(u).some(v=>v.x===x&&v.y===y))return false;const distance=movement(u).find(z=>z.x===x&&z.y===y)?.n||1;
 u.x=x;u.y=y;u.moved=true;u.stride=distance;log=D[u.k].name+' advances.';afterMove(u)}
 else if(a.op==='attack'){
  if(!u||u.attacked||!validXY)return false;
  let target=entity(x,y)||(x===3&&y===(t===0?0:7)?core(1-t):null);
  if(!target||!canAttack(u,target))return false;
  let hit=basicStrike(u,target);u.attacked=true;u.stride=0;log=D[u.k].name+' strikes for '+hit+'.'
 }else if(a.op==='card'){
  let idx=a.idx;if(!Number.isInteger(idx)||idx<0||idx>=S.hands[t].length||!validXY)return false;
  let k=S.hands[t][idx],q=D[k];if(S.energy[t]<q.cost)return false;
  if(!q.spell){
   let tribute=q.tribute||0,ids=a.tributes||[];
   if(!Array.isArray(ids)||ids.length!==tribute||new Set(ids).size!==ids.length||!ids.every(id=>S.units.some(v=>v.id===id&&v.team===t)))return false;
   if(S.units.filter(v=>v.team===t).length-tribute>=8||!deploy(t,x,y))return false;
   if(tribute)onSacrifice(t);
   S.units=S.units.filter(v=>!ids.includes(v.id));S.units.push(unit(k,t,x,y));
   if(k==='o'&&S.scribeRound?.[t]!==S.round){
    const pos=S.discards[t].findLastIndex(v=>!!D[v].spell);
    if(pos>=0){S.scribeRound||(S.scribeRound=[0,0]);S.scribeRound[t]=S.round;
     const spell=S.discards[t].splice(pos,1)[0];S.decks[t].push(spell);
    }else{grantShield(S.units[S.units.length-1],1)}
   }
   trapImpact(S.units[S.units.length-1]);
   log=q.name+' summoned!';
  }else{
   if(!resolveSpell(q,t,x,y))return false;
   onFriendlySpell(t);
   log=q.name+' cast!';
  }
  S.energy[t]-=q.cost;if(k==='F')S.energy[t]=Math.min(10,S.energy[t]+2);if(k==='d'&&S.sparkRound?.[t]!==S.round){S.sparkRound||(S.sparkRound=[0,0]);S.sparkRound[t]=S.round;S.energy[t]=Math.min(10,S.energy[t]+1)}
  discard(t,idx);
  if(k==='F')draw(t,2+Math.min(1,spellBonus(k,t)));
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
 chosenUnit=null;chosenCard=-1;inspectedTile=null;tributes=[];revision++;
 if(mode==='online'){publish()}else if(S.phase==='playing'&&S.turn===1){aiTurn()}
 save();render();
}
function aiTurn(){
 if(S.phase!=='playing'||S.turn!==1)return;
 // AI plays its actual deck rather than conjuring arbitrary units for free.
 // Each preset has different card concentrations and therefore tactics.
 const trySpell=()=>{
  for(let idx=0;idx<S.hands[1].length;idx++){
   const q=D[S.hands[1][idx]];
   if(!q.spell||q.cost>S.energy[1])continue;
   let spot=null;
   const enemies=S.units.filter(u=>u.team===0);
   const friends=S.units.filter(u=>u.team===1);
   if(['ignite','frost','bolt','silence'].includes(q.spell)){
    const opportunities=enemies.filter(u=>validSpellSpot(q,1,u.x,u.y))
     .sort((a,b)=>(a.hp-b.hp)||((b.k==='r'?1:0)-(a.k==='r'?1:0)));
    spot=opportunities.find(u=>q.spell==='frost'?!u.rooted:q.spell==='ignite'?!u.burning:true);
   }else if(q.spell==='cross'){
    const targets=enemies.filter(u=>validSpellSpot(q,1,u.x,u.y));
    targets.sort((a,b)=>enemies.filter(v=>d(v,b)<=1).length-enemies.filter(v=>d(v,a)<=1).length);
    if(targets.length&&enemies.filter(v=>d(v,targets[0])<=1).length>=2)spot=targets[0];
   }else if(q.spell==='heal'){
    spot=friends.filter(u=>u.hp<=u.max-2).sort((a,b)=>(a.hp/a.max)-(b.hp/b.max))[0];
   }else if(q.spell==='shield'){
    spot=friends.filter(u=>u.shield<2).sort((a,b)=>b.atk-a.atk)[0];
   }else if(q.spell==='cleanse'){
    spot=friends.find(u=>u.rooted||u.burning);
   }else if(q.spell==='rally'||q.spell==='bond'){
    spot=friends.find(u=>friends.filter(v=>d(u,v)<=1&&!v.rallied).length>=2);
   }else if(q.spell==='recall'){
    if(S.discards[1].some(k=>!D[k].spell&&!D[k].tribute)&&S.hands[1].length<6&&S.echoRound?.[1]!==S.round)
      spot=friends[0]||core(1);
   }else if(q.spell==='exchange'){
    if(S.units.filter(u=>u.team===1).length>=4&&S.exchangeRound?.[1]!==S.round)
      spot=friends.filter(u=>u.hp<=2)[0];
   }else if(q.spell==='snare'){
    const enemy=S.units.filter(v=>v.team===0).sort((a,b)=>a.y-b.y)[0];
    if(enemy&&!S.traps?.some(v=>v.team===1)){
     for(const pos of [{x:enemy.x,y:enemy.y-1},{x:enemy.x,y:enemy.y-2}]){
      if(bounds(pos.x,pos.y)&&validSpellSpot(q,1,pos.x,pos.y)){spot=pos;break}
     }
    }
   }else if(q.spell==='dash'){
    spot=friends.find(u=>u.moved&&!u.rooted&&u.dashRound!==S.round&&u.move>=2);
   }
   if(spot&&apply(1,{op:'card',idx,x:spot.x,y:spot.y,tributes:[]}))return true;
  }
  return false;
 };
 trySpell();
 // Summon at most one creature per AI turn; respect Aeth, legal squares,
 // the eight-unit cap and every mythic sacrifice.
 let positions=[];for(let y=1;y<=2;y++)for(let x=0;x<7;x++)if(deploy(1,x,y))positions.push(P(x,y));
 if(S.units.filter(u=>u.team===1).length<8&&positions.length){
  const choices=S.hands[1].map((k,idx)=>({k,idx,q:D[k]}))
   .filter(o=>!o.q.spell&&o.q.cost<=S.energy[1])
   .sort((a,b)=>(b.q.cost-a.q.cost)||a.idx-b.idx);
  for(const o of choices){
   const tribute=o.q.tribute||0;
   const sacrificial=S.units.filter(u=>u.team===1&&!u.attacked)
      .sort((a,b)=>a.hp-b.hp||a.atk-b.atk);
   if(sacrificial.length<tribute||S.units.filter(u=>u.team===1).length-tribute>=8)continue;
   const ids=sacrificial.slice(0,tribute).map(u=>u.id);
   positions.sort((a,b)=>Math.min(...S.units.filter(v=>v.team===0).map(v=>d(a,v)))-
                          Math.min(...S.units.filter(v=>v.team===0).map(v=>d(b,v))));
   if(apply(1,{op:'card',idx:o.idx,x:positions[0].x,y:positions[0].y,tributes:ids}))break;
  }
 }
 for(const u of [...S.units].filter(u=>u.team===1)){
  if(S.phase==='over')break;
  const goals=()=>[...S.units.filter(v=>v.team===0),core(0)];
  let eligible=goals().filter(v=>canAttack(u,v));
  if(!eligible.length&&!u.moved&&!u.rooted){
   const paths=movement(u),score=z=>-Math.min(...goals().map(v=>d(z,v)))+
     (springs.includes(K(z.x,z.y))?2.5:0);
   paths.sort((a,b)=>score(b)-score(a));
   if(paths.length&&score(paths[0])>score(u)-.2){
    const path=paths[0];u.x=path.x;u.y=path.y;u.moved=true;u.stride=path.n;afterMove(u);
   }
   if(!S.units.some(v=>v.id===u.id))continue;
   eligible=goals().filter(v=>canAttack(u,v));
  }
  if(eligible.length){eligible.sort((a,b)=>(a.core?4:0)-(b.core?4:0)||((a.hp||99)-(b.hp||99)));
   basicStrike(u,eligible[0]);u.attacked=true;
  }
 }
 if(S.phase==='playing')next(1);
 log='Rival '+(S.aiStyle||'Balanced')+' army advances.';
}
function message(m,h){msg=m;hint=h||'Select a card or friendly unit.';renderLabels()}
function clearSelection(){chosenCard=-1;chosenUnit=null;inspectedTile=null;tributes=[]}
function selectCard(i){
 if(!S||S.turn!==localSeat||S.phase!=='playing')return;
 if(chosenCard===i){clearSelection();message('<b>Card deselected.</b>');render();return}
 chosenCard=i;chosenUnit=null;inspectedTile=null;tributes=[];
 let q=D[S.hands[localSeat][i]];
 message('<b>'+q.name+'</b> · '+q.cost+' Aeth',q.tribute?'Tap '+q.tribute+' friendly unit(s) to sacrifice, then a highlighted tile.':q.spell?'Tap a valid spell target.':'Tap a glowing teal tile to summon.');render();
}
function chooseTile(vx,vy){
 if(!S||S.phase!=='playing'||S.turn!==localSeat)return;
 // Tile is the sole input target. Sprites never determine what a tap selects.
 // A tile is selected first; its occupant determines the next available order.
 const x=localSeat===0?vx:6-vx,y=localSeat===0?vy:7-vy;
 const here=entity(x,y),spot=String.fromCharCode(65+vx)+(vy+1);
 inspectedTile={vx,vy};
 if(chosenCard>=0){
  const cardKey=S.hands[localSeat][chosenCard],q=D[cardKey];
  if(q.tribute&&here?.team===localSeat){
   if(tributes.includes(here.id))tributes=tributes.filter(z=>z!==here.id);
   else if(tributes.length<q.tribute)tributes.push(here.id);
   message('<b>'+q.name+' · '+tributes.length+'/'+q.tribute+' tributes</b>','Tile '+spot+' · '+(tributes.length===q.tribute?'Choose a glowing summon tile.':'Select another allied tile.'));render();return;
  }
  if(q.tribute&&tributes.length<q.tribute){
   message('<b>Choose '+(q.tribute-tributes.length)+' more tribute tile(s).</b>','Tile '+spot+' · Tap a friendly unit tile.');render();return;
  }
  if(q.cost>S.energy[localSeat]){message('<b>Not enough Aeth.</b>','Tile '+spot+' · Need '+q.cost+' Aeth.');render();return}
  intent({op:'card',idx:chosenCard,x,y,tributes:tributes.slice()});render();return;
 }
 const previous=S.units.find(z=>z.id===chosenUnit);
 // Selecting an occupied allied tile switches the commanded unit, even when
 // large nearby character illustrations visually overlap that square.
 if(here?.team===localSeat){
  chosenUnit=here.id;
  const q=D[here.k],moves=here.rooted?'Rooted':here.moved?'Moved':'Ready',attacks=here.attacked?'Attacked':'Ready';
  message('<b>'+q.name+' · '+spot+' · '+here.hp+'/'+here.max+' HP</b>',
          'Move: '+moves+' · Attack: '+attacks+' · '+D[here.k].ability+'.');
  render();return;
 }
 if(previous){
  const enemyTarget=here?.team===1-localSeat||x===3&&y===(localSeat===0?0:7);
  if(enemyTarget){
   if(previous.attacked||!canAttack(previous,here||core(1-localSeat))){
    message('<b>Cannot attack tile '+spot+'.</b>','Red targets show legal attacks.');render();return;
   }
  }else if(previous.moved||!movement(previous).some(p=>p.x===x&&p.y===y)){
   message('<b>Cannot move to '+spot+'.</b>','Blue tiles show legal destinations.');render();return;
  }
  intent({op:enemyTarget?'attack':'move',id:previous.id,x,y});render();return;
 }
 if(here){
  const q=D[here.k];
  message('<b>Tile '+spot+' · Enemy '+q.name+'</b>',here.hp+'/'+here.max+' HP · Select one of your own tiles to command an attack.');
 }else{
  const terrain=rocks.has(K(x,y))?'impassable rock':springs.includes(K(x,y))?'Aeth spring':high.has(K(x,y))?'raised terrain':'open ground';
  message('<b>Tile '+spot+' · '+terrain+'</b>','Tap an allied unit tile or select a card. Blue = move; red = attack; violet = cast.');
 }
 render();
}

// GRIMOIRE INFORMATION: matches current card definitions and actual rules.
// Read-only UI; inspecting cards never submits a move or consumes Aeth.
const SPELL_LABELS={"heal":"♥ HEAL","shield":"◇ SHIELD","dash":"➜ MOVE","frost":"❄ ROOT","ignite":"🔥 BURN","rally":"⚔ RALLY","cleanse":"◇ CLEANSE","bolt":"⚡ BARRAGE","cross":"☄ AREA","recall":"✦ RECALL","snare":"◇ TRAP 2","bond":"✦ FORMATION","exchange":"✧ RITUAL","silence":"◇ SILENCE"};
const GUIDE={
 o:{feature:'Spell-recycling specialist.',detail:'On summon, return the most recently spent spell to the top of your deck, once per round. If there is no spell to retrieve, gain 1 shield.',tip:'Cast a useful spell, then summon Echo Scribe to bring it back in the coming draw.'},
 y:{feature:'Defensive death-trigger.',detail:'When defeated, gives 2 shield to the nearest surviving allied unit within 2 tiles.',tip:'Position beside your carry to make its defeat still valuable.'},
 z:{feature:'Spell-linked attacker.',detail:'The first spell you cast each round empowers this unit’s next basic attack by 1 damage, only for that round.',tip:'Cast a utility spell before committing its attack.'},
 A:{feature:'Sustain after a finishing blow.',detail:'When its basic attack defeats an enemy creature, heal this unit for up to 2 health.',tip:'Use it to finish wounded enemies instead of starting every fight.'},
 B:{feature:'Sacrifice synergy.',detail:'When you sacrifice an ally to summon a mythic or for Fateful Exchange, gain 2 shield and +1 next basic attack, once per round.',tip:'Build around sacrifice cards without relying only on mythics.'},
 C:{feature:'Recover from the spent-card pile.',detail:'Return your most recently discarded non-mythic creature card to your hand, up to five cards. May be used once per round.',tip:'Recycle a key defender or combo creature after playing it.'},
 D:{feature:'Delayed hidden-area control.',detail:'Place a concealed snare on an empty tile within 2 of an ally. The next enemy entering it takes 3 damage. One per player; lasts four rounds.',tip:'Predict an opponent’s route toward a spring.'},
 E:{feature:'Small-group formation payoff.',detail:'Up to three allies within one tile of your selected ally gain 1 shield and +1 on their next attack. Extra attack does not stack.',tip:'Arrange a compact formation, then cast before attacking.'},
 F:{feature:'Trade a creature for more options.',detail:'Sacrifice an allied unit to draw up to two cards and regain 2 Aeth. Costs 3 Aeth, for a net cost of 1 Aeth plus the unit. Once per round.',tip:'Trade a nearly defeated cheap ally into extra choices.'},
 G:{feature:'Disrupt an empowered target.',detail:'Strip up to 3 shield and remove attack bonuses. The target’s next basic attack deals 2 less damage, minimum 1.',tip:'Counter a large attack setup before it is used.'},

 c:{feature:'Ranged elemental pressure.',detail:'Basic attacks burn a target for 1 additional damage at the start of its next turn. Burn does not stack.',tip:'Keep enemies burning while controlling their movement.'},
 j:{feature:'Lock down enemy advances.',detail:'Basic attacks root the target for its next turn. The victim may still attack but cannot move.',tip:'Block a dangerous rush near a choke point.'},
 p:{feature:'Long-term healing support.',detail:'Move up to 2 tiles and heal 1 HP on the most injured adjacent ally at the end of your turn.',tip:'Keep behind your shielded front line.'},
 k:{feature:'Mobile burst attacker.',detail:'Move 2 tiles before attacking to gain +1 damage on that strike.',tip:'Plan a long path ending in melee range.'},
 d:{feature:'Economical flying scout.',detail:'Fly up to 3 tiles. The first Wisp summoned each round refunds 1 Aeth; additional Wisps cost 2 that round.',tip:'Secure springs or facilitate a second summon.'},
 q:{feature:'Extra tactical repositioning.',detail:'Refresh an allied unit’s movement, once per round per target. Attacks are not refreshed.',tip:'Escape a blocker or move twice to secure a spring.'},
 e:{feature:'Disrupt an advancing enemy.',detail:'Deal 1 damage and prevent the target moving during its next turn.',tip:'Root an attacker while your ranged units reposition.'},
 i:{feature:'Fire damage over time.',detail:'Deal 2 damage and burn the target for 1 additional damage at the start of its next turn.',tip:'Finish wounded targets or pressure durable monsters.'},
 n:{feature:'Temporary group attack boost.',detail:'Give an allied target and nearby allies +1 damage on their next basic attack, non-stacking.',tip:'Buff multiple allies before attacking.'},
 x:{feature:'Defensive counterspell.',detail:'Cleanse burn and root from a friendly unit, then grant 2 shield.',tip:'Rescue a rooted unit or save one about to burn.'},

 v:{feature:'Reliable front-line swordsman.',detail:'Summons a fast close-combat warrior. Can move up to 2 tiles and attack once on each turn when ready.',tip:'Advance into cover and use high ground to gain +1 attack damage.'},
 b:{feature:'Shielded defensive front liner.',detail:'Starts with 2 shield points. Incoming damage removes shield before health. Slow movement, high health.',tip:'Place in narrow lanes to protect ranged allies and capture space.'},
 r:{feature:'Long-range physical attacks.',detail:'Fires up to 3 tiles away if line of sight is clear. Rocks obstruct shots. Can move 1 tile.',tip:'Keep the Ranger behind a shielded ally and control sightlines.'},
 s:{feature:'High-damage mobile assassin.',detail:'Moves up to 3 tiles and strikes for 3 base damage from 1 tile away.',tip:'Use its speed to reach vulnerable enemy support units.'},
 f:{feature:'Flying, evasive pathing.',detail:'Moves up to 3 tiles and can travel over obstructing terrain. Attacks adjacent enemies.',tip:'Fly around blockers to pressure weak back-line targets.'},
 g:{feature:'Durable heavy melee monster.',detail:'9 health, 2 attack, and 1 tile of movement. Excellent at holding a vital square.',tip:'Control an Aeth spring or hold a lane while ranged units attack.'},
 t:{feature:'Massive mythic assault unit.',detail:'Requires sacrificing 1 allied unit before summoning. Has 14 health, 5 attack, and splash damage.',tip:'Advance slowly behind defenders, then punish grouped enemies.'},
 l:{feature:'Mobile mythic ranged threat.',detail:'Requires sacrificing 1 allied unit. Flies, moves up to 2 tiles and attacks from 2 tiles away.',tip:'Use its reach and mobility to pressure the opposing Core.'},
 a:{feature:'3 direct spell damage.',detail:'Target an enemy monster or enemy Core within 3 tiles of any of your units. Deals 3 damage instantly.',tip:'Finish a damaged monster or reach the rival Core without moving a unit.'},
 m:{feature:'3 damage over a cross-shaped area.',detail:'Choose a tile within 3 tiles of any friendly unit. Enemies and the enemy Core on that tile and its 4 orthogonal neighbors take 3 damage.',tip:'Aim at packed opponents to strike several enemies in one cast.'},
 w:{feature:'Add 4 protective shield points.',detail:'Cast on any allied unit. Shields absorb incoming damage before health and can be added to existing shield.',tip:'Defend a high-value Ranger or a unit already holding an important tile.'},
 h:{feature:'Heal and renew an ally.',detail:'Restore up to 3 health and refresh its move and attack, at most once per unit per round. Requires the unit to be injured or to have acted.',tip:'Restore a key ally, or earn one extra attack at a meaningful Aeth cost.'}
};
let guideTab='hand',guideKey=null,guideFilter='all';
const codex=(id)=>$(id),guideImage=k=>(portraitIndices[k]===undefined
 ?'<img alt="" draggable="false" src="'+Art.get(k)+'">'
 :'<div class="illustrated-portrait" aria-hidden="true" style="--art-pos:'+portraitPositions[k]+'%"></div>')+
 '<span class="art-cost" aria-label="'+D[k].cost+' Aeth">'+D[k].cost+'</span>';
function guideCount(list,k){return list.reduce((n,id)=>n+(id===k?1:0),0)}
function guideInventory(){
 if(!S)return [];
 if(guideTab==='hand')return [...new Set(S.hands[localSeat])];
 return CARD_KEYS;
}
function guideDrawList(){
 if(!S)return;
 const items=guideInventory().filter(k=>
  guideFilter==='all'||(guideFilter==='spells'?!!D[k].spell:!D[k].spell));
 codex('codex-hand-count').textContent=S.hands[localSeat].length;
 codex('codex-deck-count').textContent=CARD_KEYS.length;
 codex('codex-tabs').querySelectorAll('button[data-tab]').forEach(b=>{
  const on=b.dataset.tab===guideTab;b.classList.toggle('active',on);b.setAttribute('aria-pressed',on?'true':'false');
 });
 codex('codex-filters').querySelectorAll('button[data-filter]').forEach(b=>{
  const on=b.dataset.filter===guideFilter;b.classList.toggle('active',on);b.setAttribute('aria-pressed',on?'true':'false');
 });
 codex('codex-intro').textContent=guideTab==='hand'?'YOUR AVAILABLE CARDS':'ALL CARDS IN YOUR DECK';
 codex('codex-list').innerHTML=items.length?items.map(k=>{
  const d=D[k],qty=guideTab==='hand'?guideCount(S.hands[localSeat],k):guideCount([...S.decks[localSeat],...S.hands[localSeat],...S.discards[localSeat]],k);
  const quick=d.spell?(SPELL_LABELS[d.spell]||'✦ SPELL'):
     '♥ '+d.hp+'  ⚔ '+d.atk+'  ➜ '+d.move;
  return '<button class="codex-entry" type="button" data-inspect="'+k+'" aria-label="Inspect '+d.name+'">'+
    '<span class="codex-entry-image">'+guideImage(k)+'</span>'+
    '<span class="codex-entry-main"><small>'+d.role.toUpperCase()+'</small>'+
    '<strong>'+d.name+'</strong><span class="codex-entry-statline">'+quick+'</span>'+
    (d.ability?'<span class="codex-entry-ability">✦ '+d.ability+'</span>':'')+'</span>'+
    '<span class="codex-quantity">×'+qty+'</span></button>';
 }).join(''):'<p class="codex-empty">No matching cards in this '+(guideTab==='hand'?'hand.':'collection.')+'</p>';
}
function guideStats(k){
 const d=D[k],extras=[];
 if(d.spell){
  extras.push(['✦','SPELL'],['◈',''+d.cost+' Aeth']);
  if(d.power)extras.push(['⚡',d.power+' damage']);
  if(d.spell==='heal')extras.push(['♥','3 HP, once/round']);
  if(d.spell==='shield')extras.push(['◇','4 shield (max 5)']);
  if(d.spell==='dash')extras.push(['➜','Move again']);
  if(d.spell==='frost')extras.push(['❄','Root next turn']);
  if(d.spell==='ignite')extras.push(['🔥','Burn 1']);
  if(d.spell==='rally')extras.push(['⚔','+1 next attack']);
  if(d.spell==='cleanse')extras.push(['◇','Cleanse +2 shield']);
  if(d.spell==='recall')extras.push(['✦','Recover unit']);
  if(d.spell==='snare')extras.push(['◇','3 dmg trap']);
  if(d.spell==='bond')extras.push(['⚔','Formation']);
  if(d.spell==='exchange')extras.push(['♜','Sacrifice']);
  if(d.spell==='silence')extras.push(['◇','Counter buffs']);
 }else{
  extras.push(['◈',d.cost+' Aeth'],['♥',d.hp+' health'],['⚔',d.atk+' attack'],
              ['↗',d.range+' range'],['➜',d.move+' move']);
  if(d.shield)extras.push(['◇',d.shield+' starting shield']);
  if(d.fly)extras.push(['✧','Flying']);
  if(d.tribute)extras.push(['♜',d.tribute+' tributes']);
 }
 return extras.map(v=>'<span class="codex-stat"><b>'+v[0]+'</b> '+v[1]+'</span>').join('');
}
function inspectCard(k){
 if(!D[k]||!GUIDE[k]||!S)return;
 guideKey=k;codex('codex-library').classList.add('hidden');codex('codex-detail').classList.remove('hidden');
 const d=D[k],info=GUIDE[k],held=guideCount(S.hands[localSeat],k);
 const remaining=guideCount(S.decks[localSeat],k);
 codex('codex-detail-body').innerHTML='<div class="codex-hero">'+
   '<div class="codex-illustration">'+guideImage(k)+'</div>'+
   '<div class="codex-hero-copy"><div class="codex-type">'+d.role+' · '+(d.spell?'SPELL':'SUMMON')+'</div>'+
   '<h2>'+d.name+'</h2><p>'+info.feature+'</p></div></div>'+
   '<div class="codex-stats">'+guideStats(k)+'</div>'+
   (d.ability?'<h3>INNATE ABILITY</h3><div class="codex-ability"><strong>✦ '+d.ability+'</strong><p>'+d.abilityText+'</p></div>':'')+
   '<h3>WHAT IT DOES</h3><p>'+info.detail+'</p>'+
   '<h3>TACTICAL TIP</h3><p>'+info.tip+'</p>'+
   '<p class="codex-ownership">In hand: <b>'+held+'</b> · Still in draw pile: <b>'+remaining+'</b></p>'+
 '<div class="codex-card-level">CARD LV '+cardLevel(k)+' · '+(profile.copies[k]||0)+' COPIES HELD <button type="button" data-profile-card="'+k+'">UPGRADES</button></div>';
 codex('codex-title').textContent='CARD DETAILS';
}
function openGuide(k=null){
 if(!S)return;
 codex('codex').classList.remove('hidden');
 if(k){inspectCard(k)}else{
  guideKey=null;codex('codex-title').textContent='YOUR CARDS';
  codex('codex-detail').classList.add('hidden');codex('codex-library').classList.remove('hidden');
  guideDrawList();
 }
}

function deckStatus(){
 const tally={},units=draftDeck.filter(k=>!D[k].spell),mythic=units.filter(k=>D[k].tribute);
 draftDeck.forEach(k=>tally[k]=(tally[k]||0)+1);
 const warning=draftDeck.length!==24?'Build a 24-card deck.':
   units.length<12?'At least 12 unit cards required.':
   new Set(units).size<3?'Use at least 3 different creatures.':
   mythic.length>2?'Only 2 mythic cards allowed.':
   Object.values(tally).some(n=>n>3)?'Maximum 3 of each card.':'Deck ready for the next match.';
 $('deck-validation').textContent=warning;
 $('deck-validation').classList.toggle('ready',checkDeck(draftDeck));
 $('deck-save').disabled=!checkDeck(draftDeck);
 $('deck-size').textContent=draftDeck.length+'/24';
 $('deck-unit-count').textContent=units.length;
 $('deck-spell-count').textContent=draftDeck.length-units.length;
 const cards=CARD_KEYS.slice().sort((a,b)=>Number(!!D[a].spell)-Number(!!D[b].spell)||D[a].cost-D[b].cost||D[a].name.localeCompare(D[b].name));
 $('deck-cards').innerHTML=cards.map(k=>{
  const q=D[k],number=tally[k]||0;
  return '<article class="builder-card'+(number?' owned':'')+'">'+
   '<span class="builder-image">'+guideImage(k)+'</span>'+
   '<div class="builder-meta"><strong>'+q.name+'</strong><small>'+q.cost+' Aeth · '+q.role+
   '</small><span>'+(q.ability||q.desc)+'</span></div>'+
   '<div class="builder-qty"><button data-remove="'+k+'" type="button" aria-label="Remove '+q.name+'"'+(!number?' disabled':'')+'>−</button>'+
   '<b>'+number+'</b><button data-add="'+k+'" type="button" aria-label="Add '+q.name+'"'+
   (number>=MAX_COPIES||draftDeck.length>=24?' disabled':'')+'>+</button></div></article>'
 }).join('');
}
function openBuilder(){
 closeGuide();draftDeck=chosenDeck.slice();$('deck-builder').classList.remove('hidden');
 $('deck-status').textContent='Your saved deck will be used for your next match. This battle stays unchanged.';
 deckStatus();
}
function closeBuilder(){draftDeck=chosenDeck.slice();$('deck-builder').classList.add('hidden')}
function saveBuilder(){
 if(!checkDeck(draftDeck))return;
 chosenDeck=draftDeck.slice();persistDeck();
 $('deck-status').textContent='Saved! Your new deck starts on your next NEW MATCH.';
 closeBuilder();
 message('<b>Deck saved for your next match.</b>','Your current battle and cards are unchanged.');
}
function presetBuilder(name){
 const cards=PACKS[name];if(!cards||!checkDeck(cards))return;
 draftDeck=cards.slice();deckStatus();
 $('deck-status').textContent=name+' style selected. Tap SAVE to use it for your next match.';
}
function closeGuide(){
 codex('codex').classList.add('hidden');guideKey=null;
}

function profileCardSummary(k){
 const d=D[k],lv=cardLevel(k),bonus=unitBonuses(k,0);
 const stats=d.spell?(d.power?'⚡ '+(d.power+spellBonus(k,0))+' DAMAGE':'✧ SUPPORT'):
  '♥ '+(d.hp+Math.floor(lv/2))+' · ⚔ '+(d.atk+Math.floor((lv-1)/4));
 return stats;
}
function renderProfile(){
 $('player-level').textContent=profile.level;
 $('profile-xp-label').textContent=profile.xp+' / '+xpNeeded(profile.level)+' XP';
 $('profile-xp-meter').style.width=Math.min(100,100*profile.xp/xpNeeded(profile.level))+'%';
 $('profile-gold').textContent=profile.gold;
 $('profile-wins').textContent=profile.wins;
 $('profile-matches').textContent=profile.matches;
 const m=profile.last;
 $('profile-reward-text').textContent=m?
   (m.drawn?'DRAW':m.victory?'VICTORY':'DEFEAT')+' · +'+m.xp+' XP · +'+m.gold+' gold · '+
    m.rewards.map(k=>D[k]?.name||k).join(', ')+(m.levelUp?' · LEVEL UP!':''):
    'Finish a match to earn XP, gold and copies of cards from your deck.';
 const items=CARD_KEYS.slice().sort((a,b)=>cardLevel(b)-cardLevel(a)||D[a].cost-D[b].cost||D[a].name.localeCompare(D[b].name));
 $('profile-upgrade-list').innerHTML=items.map(k=>{
  const card=D[k],lv=cardLevel(k),copies=profile.copies[k]||0,cost=cardUpgradeCost(k);
  return '<div class="profile-card-row" data-card="'+k+'">'+
   '<span class="profile-card-art">'+guideImage(k)+'</span>'+
   '<div class="profile-card-meta"><strong>'+card.name+'</strong>'+
   '<small>LV '+lv+' / '+MAX_CARD_LEVEL+' · '+profileCardSummary(k)+'</small>'+
   '<span>'+(lv===MAX_CARD_LEVEL?'MAX LEVEL':copies+'/'+cost.copies+' COPIES · '+cost.gold+' GOLD')+'</span></div>'+
   '<button type="button" data-upgrade="'+k+'"'+(!canUpgrade(k)?' disabled':'')+'>'+
   (lv===MAX_CARD_LEVEL?'MAX':'↑ UPGRADE')+'</button></div>';
 }).join('');
}
function openProfile(k=null){
 closeGuide();$('player-profile').classList.remove('hidden');
 renderProfile();
 if(k){const target=$('profile-upgrade-list').querySelector('[data-card="'+k+'"]');target?.scrollIntoView?.({block:'nearest'})}
}
function closeProfile(){$('player-profile').classList.add('hidden')}

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
 $('deckcount').textContent=S.decks[my].length+' IN DECK';$('profile-open').textContent='LV '+profile.level;$('cycle').disabled=S.cycled[my]||S.turn!==my||S.phase!=='playing';$('end').disabled=S.turn!==my||S.phase!=='playing';
 const unit=S.units.find(u=>u.id===chosenUnit),walk=new Set(unit&&!unit.moved&&!unit.rooted?movement(unit).map(z=>K(z.x,z.y)):[]),targets=new Set(unit&&!unit.attacked?[...S.units.filter(u=>u.team!==localSeat),core(enemy)].filter(z=>canAttack(unit,z)).map(z=>K(z.x,z.y)):[]);
 const card=chosenCard>=0?D[S.hands[my][chosenCard]]:null;
 // Spell targets are tile-based too. Make every legal cast square visible
 // rather than forcing players to guess which body/sprite is the target.
 const castTiles=new Set();
 if(card?.spell&&S.energy[my]>=card.cost){
  for(let gy=0;gy<8;gy++)for(let gx=0;gx<7;gx++){
   const u=entity(gx,gy),pos=P(gx,gy);
   if(['shield','heal','dash','cleanse','rally','bond','exchange','recall'].includes(card.spell)){
    if(validSpellSpot(card,my,gx,gy))castTiles.add(K(gx,gy));
   }else{
    if(validSpellSpot(card,my,gx,gy))castTiles.add(K(gx,gy));
   }
  }
 }
 for(let b of $('board').children){
  let vx=+b.dataset.x,vy=+b.dataset.y,x=mirror?6-vx:vx,y=mirror?7-vy:vy,u=entity(x,y),k=K(x,y),isRock=rocks.has(k),spring=springs.includes(k),isHigh=high.has(k),isCore=x===3&&y===7,enemyCore=x===3&&y===0;
  let mineCore=x===3&&y===(my===0?7:0),rivalCore=x===3&&y===(my===0?0:7);
  b.className='tile'+(vy<=2?' dark':vy>=5?' lit':'')+(isRock?' rock':'')+(isHigh?' high':'')+(spring?' spring':'')+(u&&u.team!==my?' enemyunit':'')+(walk.has(k)?' showmove':'')+(targets.has(k)?' showattack':'')+(card&&!card.spell&&deploy(my,x,y)?' showdeploy':'')+(castTiles.has(k)?' showcast':'')+(u?.id===chosenUnit?' selected':'')+(inspectedTile?.vx===vx&&inspectedTile?.vy===vy?' focused':'')+(tributes.includes(u?.id)?' tribute':'');
  b.setAttribute('aria-label',u?(u.team===my?'Your ':'Enemy ')+D[u.k].name+' '+u.hp+' HP':mineCore?'Your core':rivalCore?'Rival core':'Arena tile '+(vx+1)+','+(vy+1));
  if(u){b.innerHTML='<img draggable="false" class="unitimg '+(u.team!==my?'foe ':'')+(['t','l'].includes(u.k)?'boss':'')+'" src="'+Art.get(u.k)+'"><div class="hpstrip"><i style="width:'+Math.max(0,u.hp/u.max*100)+'%"></i></div><div class="num">'+u.hp+(u.shield?' ◇':'')+'</div>'+(u.team===my&&!u.attacked?'<i class="dot"></i>':'')}
  else if(isCore||enemyCore||spring||isRock){b.innerHTML='<img draggable="false" class="terrainimg" src="'+Art.terrain(isCore?(mineCore?'core':'enemycore'):enemyCore?(mineCore?'core':'enemycore'):spring?'spring':'rock')+'">'}
  else b.innerHTML=(isHigh?'<span class="up">⌃</span>':'')+'<span class="rune">✦</span>'
 }
 $('hand').classList.toggle('five-cards',S.hands[my].length>4);
 $('hand').innerHTML=S.hands[my].map((k,i)=>{
  const q=D[k],type=q.spell?'spell':q.tribute?'boss':'unit';
  const stats=q.spell?(SPELL_LABELS[q.spell]||'✦ SPELL'):
   '♥ '+q.hp+'  ⚔ '+q.atk+'  ↗ '+q.range;
  const portrait=portraitIndices[k]===undefined?'<img alt="" draggable="false" src="'+Art.get(k)+'">'
    :'<div class="illustrated-portrait" aria-hidden="true" style="--card-index:'+portraitIndices[k]+';--art-pos:'+portraitPositions[k]+'%"></div>';
  return '<div class="card-wrap"><button type="button" class="card '+type+
   (chosenCard===i?' picked':'')+(q.cost>S.energy[my]||S.turn!==my?' cant':'')+
   '" data-card="'+i+'" aria-label="Select '+q.name+', '+q.cost+' Aeth">'+
   '<div class="portrait">'+portrait+'<span class="portrait-cost" aria-hidden="true">'+q.cost+'</span>'+
   '<span class="portrait-type'+(q.ability?' ability-label':'')+'">'+(q.ability?'✦ '+q.ability:q.spell?'SPELL':q.tribute?'MYTHIC':'UNIT')+'</span></div>'+
   '<div class="card-foot"><div class="cardname">'+q.name+'</div>'+
   '<div class="cardstats">'+stats+'</div></div></button>'+
   '<button type="button" class="card-info" data-card-info="'+i+'" aria-label="Inspect '+q.name+' without playing it">i</button></div>';
 }).join('');
 renderLabels();
 if(window.AetherScene?.sync)window.AetherScene.sync(S,my,{unit:chosenUnit,card:chosenCard,focus:inspectedTile,tributes:tributes.slice()});
 if(S.phase==='over'){
  const reward=awardMatch();
  $('resulttitle').textContent=S.winner===-1?'RIFTFRONT DRAW':S.winner===my?'DOMINION ACHIEVED':'CORE SHATTERED';
  $('resultdesc').textContent=(S.winner===-1?'Both armies remain evenly matched.':S.winner===my?'Your army captured the Riftfront.':'Your army was defeated.')+' Round '+S.round+'.'+(mode==='ai'&&reward?'  ✦ +'+reward.xp+' XP · +'+reward.gold+' gold · '+reward.rewards.length+' card copies'+(reward.levelUp?' · LEVEL UP!':''):'');
  if(!victoryVisible&&victoryDelay===null){
   // Let the winning blow land, damage number rise and defeated unit fade
   // before a full-screen result panel hides the battlefield.
   $('gameover').classList.add('hidden');
   victoryDelay=setTimeout(()=>{
    victoryDelay=null;
    if(S?.phase==='over'){victoryVisible=true;$('gameover').classList.remove('hidden')}
   },1250);
  }else if(victoryVisible){$('gameover').classList.remove('hidden')}
 }else{
  if(victoryDelay!==null){clearTimeout(victoryDelay);victoryDelay=null}
  victoryVisible=false;$('gameover').classList.add('hidden');
 }
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
  join:(peer)=>{
   connected=true;$('lobby').classList.add('hidden');
   if(host){
    const progressed=S.round>1||S.turn!==0||S.units.length!==4||(S.fxSeq||0)>0;
    S.phase=progressed?'playing':'waiting';
    $('roomstatus').textContent=progressed?'Friend reconnected.':'Friend connected; receiving their chosen deck…';
    if(progressed){revision++;publish()}
   }else{
    $('roomstatus').textContent='Connected. Sending your deck…';
    net?.sendLoadout(chosenDeck.slice());
   }
   render()
  },
  loadout:(cards)=>{
   if(!host||!checkDeck(cards))return;
   // Host installs the guest's deck before any play. Never replace a live deck.
   if(S.round>1||S.units.length!==4||(S.fxSeq||0)>0)return;
   S.decks[1]=shuffle(cards);S.hands[1]=[];S.discards[1]=[];
   for(const k of ['v','r','a']){const i=S.decks[1].indexOf(k);if(i>=0){S.decks[1].splice(i,1);S.hands[1].push(k)}}
   draw(1,Math.max(0,4-S.hands[1].length));
   S.phase='playing';revision++;
   $('roomstatus').textContent='Both decks accepted! Battle ready.';
   publish();render();
  },
  leave:()=>{connected=false;$('roomstatus').textContent='Other player disconnected. Your match remains open for reconnection.';if(host&&S.phase==='playing'){S.phase='waiting';publish()}render()},
  state:(p)=>{if(host||!p?.s||p.s.version!==4)return;S=p.s;revision=p.rev||0;clearSelection();$('roomstatus').textContent=S.phase==='playing'?'Connected! '+(S.turn===1?'Your turn.':'Waiting for host turn.'):'Waiting for the host…';render()},
  intent:(a)=>{if(!host||S.phase!=='playing'||S.turn!==1)return;if(apply(1,a)){clearSelection();revision++;publish();render()}},
  error:(e)=>{$('roomstatus').textContent='Connection issue: '+String(e).slice(0,140)}
 });}catch(error){$('roomstatus').textContent='Could not open room: '+String(error.message||error);return}message('<b>Private room '+code+'</b>',host?'Waiting for your friend to join.':'Waiting to receive the battlefield from your friend.');render();
}
const board=$('board');board.innerHTML='';for(let y=0;y<8;y++)for(let x=0;x<7;x++){let b=document.createElement('button');b.type='button';b.dataset.x=x;b.dataset.y=y;board.appendChild(b)}
board.addEventListener('click',e=>{let b=e.target.closest('button[data-x]');if(b)chooseTile(+b.dataset.x,+b.dataset.y)});
$('hand').addEventListener('click',e=>{
 const more=e.target.closest('button[data-card-info]');
 if(more){const key=S?.hands[localSeat]?.[+more.dataset.cardInfo];if(key)openGuide(key);return}
 const b=e.target.closest('button[data-card]');if(b)selectCard(+b.dataset.card);
});
$('end').addEventListener('click',()=>intent({op:'end'}));
$('cycle').addEventListener('click',()=>{if(chosenCard<0){message('<b>Select a card to redraw.</b>');return}intent({op:'cycle',idx:chosenCard})});
$('reset').addEventListener('click',()=>{if(mode==='online'){if(confirm('Leave this duel and return to solo play?'))startAI()}else if(confirm('Start a fresh solo battle?')){seed('ai');clearSelection();save();render()}});
$('again').addEventListener('click',()=>{if(mode==='online'){startOnline()}else{seed('ai');clearSelection();save();render()}});
$('mode-ai').addEventListener('click',startAI);$('mode-online').addEventListener('click',()=>{if(mode==='online'){$('lobby').classList.toggle('hidden');return}startOnline()});$('close-lobby').addEventListener('click',()=>{$('lobby').classList.add('hidden')});
$('make-room').addEventListener('click',()=>{let alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',code='';const bytes=new Uint8Array(6);crypto.getRandomValues(bytes);for(let b of bytes)code+=alphabet[b%alphabet.length];join(code,true)});
$('join-room').addEventListener('click',()=>join($('roomid').value,false));
$('invite').addEventListener('click',invite);
$('roomid').addEventListener('input',e=>e.target.value=e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,8));
$('card-guide').addEventListener('click',()=>openGuide());
$('open-builder').addEventListener('click',openBuilder);
$('profile-open').addEventListener('click',()=>openProfile());
$('codex-profile').addEventListener('click',()=>openProfile());
$('result-rewards').addEventListener('click',()=>openProfile());
$('profile-close').addEventListener('click',closeProfile);
$('profile-done').addEventListener('click',closeProfile);
$('player-profile').addEventListener('click',e=>{if(e.target===$('player-profile'))closeProfile()});
$('profile-upgrade-list').addEventListener('click',e=>{
 const b=e.target.closest('button[data-upgrade]');if(!b)return;
 if(upgradeCard(b.dataset.upgrade)){renderProfile();render();save()}
});
$('codex-detail').addEventListener('click',e=>{
 const b=e.target.closest('button[data-profile-card]');
 if(b)openProfile(b.dataset.profileCard)
});
$('deck-close').addEventListener('click',closeBuilder);
$('deck-cancel').addEventListener('click',closeBuilder);
$('deck-save').addEventListener('click',saveBuilder);
$('deck-builder').addEventListener('click',e=>{if(e.target===$('deck-builder'))closeBuilder()});
$('deck-presets').addEventListener('click',e=>{
 const btn=e.target.closest('button[data-preset]');if(btn)presetBuilder(btn.dataset.preset)
});
$('deck-cards').addEventListener('click',e=>{
 const add=e.target.closest('button[data-add]'),rem=e.target.closest('button[data-remove]');
 if(!add&&!rem)return;
 const k=add?.dataset.add||rem?.dataset.remove;
 if(!CARD_KEYS.includes(k))return;
 if(add&&draftDeck.length<DECK_SIZE&&draftDeck.filter(x=>x===k).length<MAX_COPIES)draftDeck.push(k);
 if(rem){const i=draftDeck.indexOf(k);if(i!==-1)draftDeck.splice(i,1)}
 deckStatus();
});

$('codex-close').addEventListener('click',closeGuide);
$('codex-back').addEventListener('click',()=>openGuide());
$('codex').addEventListener('click',e=>{if(e.target===codex('codex'))closeGuide()});
$('codex-tabs').addEventListener('click',e=>{
 const button=e.target.closest('button[data-tab]');if(!button)return;
 guideTab=button.dataset.tab;guideDrawList();
});
$('codex-filters').addEventListener('click',e=>{
 const b=e.target.closest('button[data-filter]');if(!b)return;
 guideFilter=b.dataset.filter;guideDrawList();
});
$('codex-list').addEventListener('click',e=>{
 const button=e.target.closest('button[data-inspect]');if(button)inspectCard(button.dataset.inspect)
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('player-profile').classList.contains('hidden'))closeProfile();else if(e.key==='Escape'&&!$('deck-builder').classList.contains('hidden'))closeBuilder();else if(e.key==='Escape'&&!codex('codex').classList.contains('hidden'))closeGuide()});

function closeRules(){
 const modal=$('rules-sheet');modal.classList.add('hidden');
 $('rules').focus?.();
}
function showRules(){
 closeGuide();
 $('rules-sheet').classList.remove('hidden');
 $('rules-close').focus?.();
}
$('rules').addEventListener('click',showRules);
$('rules-close').addEventListener('click',closeRules);
$('rules-done').addEventListener('click',closeRules);
$('rules-sheet').addEventListener('click',e=>{if(e.target===$('rules-sheet'))closeRules()});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&!$('rules-sheet').classList.contains('hidden')){e.preventDefault();closeRules()}
});
window.addEventListener('aether-network-ready',()=>{if($('roomstatus').textContent.includes('loading'))$('roomstatus').textContent='Network ready. Create or join a room.'});
window.AetherGame={get:()=>S,startAI,startOnline,apply,publish,profile:profileSummary,upgradeCard,cardLevel};
startAI();
const inviteCode=new URLSearchParams(location.search).get('room');if(inviteCode){startOnline();$('roomid').value=inviteCode.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,8);$('roomstatus').textContent='Invitation detected. Tap Join Room to connect.'}
})();
