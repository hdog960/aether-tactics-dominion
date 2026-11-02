
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
G:{name:'Null Chime',cost:2,spell:'silence',role:'Hex',desc:'Strip enemy shield and weaken its next attack.'},
// v4.5 experimental spell designs. This branch is not released until painted
// spell art and interactive QA are verified. Never ship placeholder portraits.
H:{name:'Starfall Lattice',cost:4,spell:'diagonal',power:2,role:'Astral Spell',
 desc:'Deal 2 damage at the four diagonal tiles around an aimed square.'},
I:{name:'Ashen Reprisal',cost:2,spell:'reprisal',role:'Battle Ward',
 desc:'Give an ally 2 shield and a one-use 1-damage basic-attack retaliation.'},
J:{name:'Undertow',cost:3,spell:'undertow',power:1,role:'Tide Hex',
 desc:'Deal 1 damage and pull a non-boss enemy one open tile toward your army.'},
K:{name:'Dawn Edict',cost:3,spell:'edict',role:'War Blessing',
 desc:'Empower an ally’s next basic attack by 1 and strip up to 3 shield first.'},
// v4.5.3 CREATURE PROTOTYPES. NOT PUBLIC — unique painted portraits, matching
// battlefield silhouettes and frame atlas must ship before the release flag.
M:{name:'Zephyr Cartographer',cost:3,hp:4,atk:1,range:2,move:3,fly:true,
 role:'Winged Scout',desc:'On summon, refresh one nearby grounded ally’s movement.'},
N:{name:'Verdant Bastion',cost:4,hp:8,atk:1,range:1,move:1,shield:1,
 role:'Spring Guardian',desc:'On a spring, shield a nearby ally at turn start.'},
O:{name:'Cragsunder Duelist',cost:3,hp:5,atk:2,range:1,move:2,
 role:'Highland Duelist',desc:'First high-ground strike each round pierces 2 shield.'},
P:{name:'Umbral Siphon',cost:4,hp:5,atk:2,range:2,move:2,
 role:'Hex Hunter',desc:'First attack on a shielded enemy steals 1 shield.'},
// v4.5.4: Source-only unit candidates. No portraits = no public cards.
Q:{name:'Tideglass Oracle',cost:3,hp:4,atk:1,range:2,move:2,
 role:'Tidal Seer',desc:'Once per round, a friendly spell lets this seer shield a nearby ally.'},
R:{name:'Ashen Harrier',cost:3,hp:4,atk:2,range:1,move:3,
 role:'Flank Duelist',desc:'After its first flanking attack, refresh its movement.'},
S:{name:'Gravebloom Warden',cost:4,hp:7,atk:2,range:1,move:1,
 role:'Briar Sentinel',desc:'On defeat, briefly root the closest non-boss enemy.'},
T:{name:'Stormvault Artificer',cost:3,hp:4,atk:2,range:2,move:2,
 role:'Arcane Sapper',desc:'On summon, disarm a nearby enemy snare and gain 1 shield.'},
// v4.5.5 — New spells require distinct painted card art to be publicly visible.
U:{name:'Mirror Breach',cost:2,spell:'breach',power:1,role:'Wardbreaker',
 desc:'Strip 2 shield from an enemy creature, then deal 1 damage.'},
V:{name:'Gale Step',cost:2,spell:'gale',role:'Tactical Movement',
 desc:'Shift an unrooted nearby ally to an empty adjacent tile. Preserve actions.'},
W:{name:'Ember Covenant',cost:3,spell:'covenant',role:'Sacrifice Rite',
 desc:'Sacrifice an ally to shield and rally up to two nearby allies.'},
X:{name:'Crescent Refrain',cost:3,spell:'refrain',power:2,role:'Status Finisher',
 desc:'Hit a burning or rooted enemy for 2, chaining 1 damage to another enemy.'},
// v4.5.6 painted creature expansion. Release gated until art/QA pass.
Y:{name:'Gloam Bellkeeper',cost:3,hp:4,atk:1,range:2,move:2,
 role:'Debuff Support',desc:'On summon, weaken the closest nonboss enemy within two tiles.'},
Z:{name:'Cinderjaw Prowler',cost:3,hp:5,atk:2,range:1,move:3,
 role:'Burn Hunter',desc:'First strike on a burning foe spreads burn to a nearby enemy.'},
aa:{name:'Oathmoss Devourer',cost:4,hp:7,atk:2,range:1,move:1,
 role:'Sacrifice Survivor',desc:'After a voluntary ally sacrifice, restore 2 HP once each round.'},
ab:{name:'Tidebreak Herald',cost:3,hp:5,atk:1,range:2,move:3,
 role:'Spring Runner',desc:'First move onto a spring each round gains 1 shield and 1 Aeth.'},
// v4.5.7: control, shield economy, burn setup and group recovery.
ac:{name:'Gravemire Ring',cost:3,spell:'gravemire',role:'Gravity Hex',
 desc:'Root up to two nearby non-champion enemies; no damage.'},
ad:{name:'Prism Relay',cost:2,spell:'prismrelay',role:'Ward Transfer',
 desc:'Transfer 2 shield to a nearby ally; refresh its movement once per round.'},
ae:{name:'Cinder Bloom',cost:3,spell:'cinderbloom',role:'Ember Hex',
 desc:'Ignite a foe and one nearby unburned foe; no immediate damage.'},
af:{name:'Tidal Reprieve',cost:3,spell:'tidalreprieve',role:'Group Restoration',
 desc:'Restore 2 HP to an injured ally and 1 HP to two injured nearby allies.'},
ag:{name:'Aether Lanternist',cost:3,hp:4,atk:1,range:2,move:2,
 role:'Purifier',desc:'On summon, cleanse a nearby afflicted ally and grant 1 shield.'},
ah:{name:'Vesper Kestrel',cost:3,hp:4,atk:2,range:1,move:3,fly:true,
 role:'Skirmish Hexer',desc:'First move near a foe each round weakens its next attack.'},
ai:{name:'Hollowroot Collector',cost:4,hp:6,atk:2,range:1,move:2,
 role:'Status Harvester',desc:'First attack on a rooted or burning foe each round refunds 1 Aeth.'},
aj:{name:'Rimeshard Sentinel',cost:4,hp:8,atk:1,range:1,move:1,shield:1,
 role:'Ward Guardian',desc:'First basic attack survived each round cleanses self and gains 1 shield.'}
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
 B:{name:'Oathbound',desc:'When you sacrifice an allied unit, this Sentinel gains 2 shield and +1 on its next attack, once each round.'},
 M:{name:'Tailwind Dispatch',desc:'When summoned, refresh the movement (never attack) of the closest ground ally within 2 tiles. Once per round per team.'},
 N:{name:'Spring Sentinel',desc:'At the beginning of your turn, if holding an Aeth spring, grant 1 shield to the nearest allied creature within 2 tiles (or self). Respect the 5-shield cap.'},
 O:{name:'Summit Breaker',desc:'Your first basic strike launched from elevated terrain each round removes up to 2 enemy shield before normal damage. No extra attack.'},
 P:{name:'Shadow Tithe',desc:'Your first basic strike against a shielded creature each round transfers 1 shield from that target to this unit, if below the 5-shield cap.'}
});
for(const [key,a] of Object.entries(ABILITIES)){D[key].ability=a.name;D[key].abilityText=a.desc}
const portraitIndices={v:0,r:1,b:2,s:3,f:4,g:5,a:6};
const portraitPositions={v:0,r:16.6667,b:33.3333,s:50,f:66.6667,g:83.3333,a:100};
const OLD_POOL=['v','v','v','b','b','r','r','s','s','f','f','g','t','l','a','a','a','m','w','w','h'];
const PACKS={"Balanced":["v","v","v","b","b","r","r","s","s","f","f","g","t","l","a","a","a","m","w","w","h","c","p","e"],"Assault":["v","v","v","s","s","s","k","k","k","d","d","d","j","j","f","f","r","r","a","a","a","q","q","q"],"Fortress":["b","b","b","g","g","g","p","p","p","j","j","v","v","v","r","r","c","c","w","w","w","h","h","x"],"Arcane":["r","r","r","c","c","c","p","p","p","d","d","d","b","b","v","v","a","a","a","m","m","i","i","n"],"Skirmish":["f","f","f","s","s","s","k","k","k","d","d","r","r","r","v","v","l","j","q","q","e","e","a","a"]};
Object.assign(PACKS,{"Echo":["v","v","o","o","o","z","z","z","p","p","b","b","r","r","d","d","y","y","C","C","E","E","q","x"],"Ritual":["v","v","v","B","B","B","y","y","A","A","o","o","j","j","t","l","F","F","C","C","D","D","G","w"]});
// The first v4.5 spells stay invisible to real player inventories until a
// release with verified painted spell art explicitly enables the batch.
const V45_SPELL_KEYS=['H','I','J','K'];
const V45_QA=window.__qaIsolatedStorage===true&&location.pathname.endsWith('/qa-v39.html');
const V45_ENABLED=V45_QA||window.DOMINION_V45_ART_RELEASE===true;
// v4.5.3 units are specifically art-gated. QA may exercise real mechanics
// in memory without introducing missing sprites to the released collection.
const V453_UNIT_KEYS=['M','N','O','P'];
const V453_ENABLED=V45_QA||window.DOMINION_V453_ART_RELEASE===true;
const V454_UNIT_KEYS=['Q','R','S','T'];
const V454_ENABLED=V45_QA||window.DOMINION_V454_ART_RELEASE===true;
const V455_SPELL_KEYS=['U','V','W','X'];
const V455_ENABLED=V45_QA||window.DOMINION_V455_ART_RELEASE===true;
const V456_UNIT_KEYS=['Y','Z','aa','ab'];
const V456_ENABLED=V45_QA||window.DOMINION_V456_ART_RELEASE===true;
const V457_SPELL_KEYS=['ac','ad','ae','af'];
const V457_ENABLED=V45_QA||window.DOMINION_V457_ART_RELEASE===true;
const V458_UNIT_KEYS=['ag','ah','ai','aj'];
const V458_ENABLED=V45_QA||window.DOMINION_V458_ART_RELEASE===true;
const CARD_KEYS=Object.keys(D).filter(k=>
 (V45_ENABLED||!V45_SPELL_KEYS.includes(k))&&
 (V453_ENABLED||!V453_UNIT_KEYS.includes(k))&&
 (V454_ENABLED||!V454_UNIT_KEYS.includes(k))&&
 (V455_ENABLED||!V455_SPELL_KEYS.includes(k))&&
 (V456_ENABLED||!V456_UNIT_KEYS.includes(k))&&
 (V457_ENABLED||!V457_SPELL_KEYS.includes(k))&&
 (V458_ENABLED||!V458_UNIT_KEYS.includes(k))),
 DECK_SIZE=24,MAX_COPIES=3,DECK_STORE='aether-dominion-deck-v20';
// Two copies of each new spell leave room for 16 distinct existing creature
// slots. The preset is invisible until artwork is explicitly available.
if(V45_ENABLED)PACKS.Astral=['v','v','v','b','b','r','r','s','s','f','f',
 'g','c','j','p','k','H','H','I','I','J','J','K','K'];
function checkDeck(deck){
 if(!Array.isArray(deck)||deck.length!==DECK_SIZE||deck.some(k=>!CARD_KEYS.includes(k)))return false;
 const copies={},units=deck.filter(k=>!D[k].spell),mythics=units.filter(k=>D[k].tribute);
 for(const k of deck){copies[k]=(copies[k]||0)+1;if(copies[k]>MAX_COPIES)return false}
 return units.length>=12&&mythics.length<=2&&new Set(units).size>=3;
}
function loadDeck(){try{const d=JSON.parse(localStorage.getItem(DECK_STORE));if(checkDeck(d))return d}catch(e){}return PACKS.Balanced.slice()}
let chosenDeck=loadDeck(),draftDeck=chosenDeck.slice();
function persistDeck(){try{localStorage.setItem(DECK_STORE,JSON.stringify(chosenDeck))}catch(e){}}

// v4.5.2 Armory loadout vault: additive storage only, no schema migration of
// existing match, commander, or canonical selected-deck keys.
const LOADOUT_STORE='aether-dominion-loadouts-v452',SLOT_COUNT=3;
const safeSlotName=v=>String(v||'').replace(/[<>\\\u0000-\u001f]/g,'').trim().slice(0,24);
const sameDeck=(a,b)=>Array.isArray(a)&&Array.isArray(b)&&
 a.length===b.length&&a.every((k,i)=>k===b[i]);
function loadDeckSlots(){
 let saved=null;
 try{saved=JSON.parse(localStorage.getItem(LOADOUT_STORE))}catch(e){}
 const slots=Array.from({length:SLOT_COUNT},(_,i)=>{
  const item=saved?.version===1&&saved?.slots?.[i];
  return item&&checkDeck(item.cards)?
   {name:safeSlotName(item.name)||'DECK '+(i+1),cards:item.cards.slice()}:null;
 });
 const active=Number.isInteger(saved?.active)&&saved.active>=0&&saved.active<SLOT_COUNT?
  saved.active:0;
 // The v20 canonical selected-deck value remains authoritative if older code
 // or a prior version changed it. Existing saved secondary slots survive.
 if(!slots[active]||!sameDeck(slots[active].cards,chosenDeck))
  slots[active]={name:slots[active]?.name||'PRIMARY',cards:chosenDeck.slice()};
 return{version:1,active,slots};
}
let deckSlots=loadDeckSlots(),selectedSlot=deckSlots.active;
function persistDeckSlots(){
 try{localStorage.setItem(LOADOUT_STORE,JSON.stringify(deckSlots));return true}
 catch(e){return false}
}
function renderDeckSlots(){
 const mount=$('deck-slots');if(!mount)return;
 mount.innerHTML=deckSlots.slots.map((entry,i)=>{
  const selected=i===selectedSlot,active=i===deckSlots.active;
  const name=entry?.name||'EMPTY SLOT';
  // Use text-only display values. Slot names are user-controlled input.
  const safe=name.replace(/&/g,'&amp;').replace(/</g,'&lt;')
   .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  return '<button type="button" data-slot="'+i+'" class="'+(selected?'selected ':'')+
   (active?'equipped':'')+'" aria-pressed="'+selected+'" aria-label="Deck slot '+(i+1)+
   ', '+safe+', '+(active?'equipped':entry?'saved':'empty')+'">'+
   '<span class="vault-ordinal">DECK '+['I','II','III'][i]+'</span>'+
   '<strong>'+safe+'</strong><small>'+(active?'EQUIPPED':entry?'SAVED':'EMPTY')+
   '</small></button>';
 }).join('');
 const title=$('deck-slot-name');
 if(title)title.value=deckSlots.slots[selectedSlot]?.name||
  (selectedSlot===0?'PRIMARY':'CUSTOM '+(selectedSlot+1));
}
function selectDeckSlot(i){
 if(!Number.isInteger(i)||i<0||i>=SLOT_COUNT)return false;
 selectedSlot=i;
 draftDeck=(deckSlots.slots[i]?.cards||chosenDeck).slice();
 renderDeckSlots();deckStatus();
 $('deck-status').textContent=deckSlots.slots[i]?
  'Loaded saved deck '+(i+1)+' into the editor. SAVE FOR NEXT MATCH to equip it.':
  'Empty slot '+(i+1)+'. Edit this copy and SAVE FOR NEXT MATCH to create it.';
 return true;
}

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
if(!profile.campaign||!Array.isArray(profile.campaign.completed))profile.campaign={completed:[],stars:{},best:{}};
if(!profile.mastery||typeof profile.mastery!=='object')profile.mastery={};
if(!profile.achievements||typeof profile.achievements!=='object')profile.achievements={};
// v4.6: additive only. Do not migrate or erase saved v21 profiles.
if(!profile.masteryClaims||typeof profile.masteryClaims!=='object')profile.masteryClaims={};
if(!profile.gauntlet||profile.gauntlet.version!==1)profile.gauntlet={
 version:1,attempts:0,clears:0,bestStage:0,firstClearRewarded:false,current:null
};
// Optional v4.6.1 branches: preserve all old runs, counters and rewards.
if(!profile.gauntlet.pathClears||typeof profile.gauntlet.pathClears!=='object')
 profile.gauntlet.pathClears={};
if(!profile.gauntlet.pathFirstRewards||typeof profile.gauntlet.pathFirstRewards!=='object')
 profile.gauntlet.pathFirstRewards={};
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
function combatLevel(k,t){return mode==='ai'?(t===0?(S?.cardRanks?.[k]||1):(S?.aiTier||1)):1}
function unitBonuses(k,t){const lv=combatLevel(k,t);return{hp:Math.floor(lv/2),atk:Math.floor((lv-1)/4)}}
function spellBonus(k,t){return Math.min(2,Math.floor(combatLevel(k,t)/2))}
function awardMatch(){
 if(!S||mode!=='ai'||S.mode!=='ai'||S.phase!=='over'||![0,1,-1].includes(S.winner))return null;
 if(profile.claimed[S.matchId])return typeof profile.claimed[S.matchId]==='object'?profile.claimed[S.matchId]:profile.last||null;
 const victory=S.winner===localSeat,drawn=S.winner===-1,rounds=Math.min(12,S.round||1);
 let xp=(victory?95:drawn?38:45)+rounds*3,coins=(victory?85:drawn?35:40)+rounds*3;
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
 // First campaign clears unlock stages, one-time rewards and replayable stars.
 let storyClear=false,stars=0,missionTitle='';
 const mission=MISSION_BY_ID[S.missionId];
 if(mission&&victory){
  missionTitle=mission.name;
  stars=S.round<=Math.ceil((mission.rounds||24)*.52)&&S.hp[0]>=19?3:
   S.round<=Math.ceil((mission.rounds||24)*.78)&&S.hp[0]>=13?2:1;
  profile.campaign.stars[mission.id]=Math.max(profile.campaign.stars[mission.id]||0,stars);
  profile.campaign.best[mission.id]=Math.min(profile.campaign.best[mission.id]||99,S.round);
  if(!profile.campaign.completed.includes(mission.id)){
   profile.campaign.completed.push(mission.id);storyClear=true;
   xp+=mission.bonusXP;coins+=mission.bonusGold;
   profile.xp+=mission.bonusXP;profile.gold+=mission.bonusGold;
   if(mission.card&&D[mission.card]){profile.copies[mission.card]=(profile.copies[mission.card]||0)+1;rewards.push(mission.card)}
  }
 }
 const played=S.usedCards?.[0]||[];
 const masteryRewards=[];
 const tiers=[{uses:4,gold:30},{uses:12,gold:65},{uses:30,gold:125}];
 for(const k of new Set(played)){
  if(!D[k])continue;
  profile.mastery[k]=(Number(profile.mastery[k])||0)+1;
  // A mastery bonus is one-time per card/tier and only unlocks on a WIN.
  if(!victory)continue;
  let claimed=Math.max(0,Math.min(3,Number(profile.masteryClaims[k])||0));
  for(let tier=claimed;tier<tiers.length;tier++){
   if(profile.mastery[k]<tiers[tier].uses)break;
   profile.gold+=tiers[tier].gold;coins+=tiers[tier].gold;
   masteryRewards.push({card:k,tier:tier+1,gold:tiers[tier].gold});
   claimed=tier+1;
  }
  profile.masteryClaims[k]=claimed;
 }
 // The current run/stage and won match ID must match. Never grant stage
 // rewards for a stale saved match, an abandoned run, or a repeat render.
 let gauntletResult=null;
 const run=profile.gauntlet.current;
 if(S.gauntletRunId&&run&&S.gauntletRunId===run.id&&
    S.gauntletStage===run.stage&&run.status==='active'){
  run.core=Math.max(0,Math.min(24,Number(S.hp[0])||0));
  if(victory){
   run.status='ready';run.wins++;profile.gauntlet.bestStage=Math.max(profile.gauntlet.bestStage,run.stage);
   if(run.stage===3){
    run.status='cleared';profile.gauntlet.clears++;
    if(!profile.gauntlet.firstClearRewarded){
     profile.gauntlet.firstClearRewarded=true;
     profile.gold+=180;profile.xp+=210;xp+=210;coins+=180;
     const copy='ag';
     profile.copies[copy]=(profile.copies[copy]||0)+1;rewards.push(copy);
     gauntletResult={status:'cleared',stage:3,firstClear:true,bonusGold:180,bonusXP:210,copy};
    }else gauntletResult={status:'cleared',stage:3,firstClear:false};
    const path=GAUNTLET_PATHS[run.path]||GAUNTLET_PATHS.wayfinder;
    profile.gauntlet.pathClears[path.id]=(profile.gauntlet.pathClears[path.id]||0)+1;
    // Only optional challenge paths award a small one-time trophy bonus.
    const bonus=path.firstGold||0;
    if(bonus&&!profile.gauntlet.pathFirstRewards[path.id]){
     profile.gauntlet.pathFirstRewards[path.id]=true;
     profile.gold+=bonus;coins+=bonus;
     gauntletResult.pathBonusGold=bonus;
    }
    gauntletResult.path=path.id;
   }else gauntletResult={status:'ready',stage:run.stage};
  }else{
   run.status='failed';
   gauntletResult={status:'failed',stage:run.stage};
  }
 }

 const achievementChecks={
  firstVictory:profile.wins>=1,fieldTactician:new Set(played).size>=5,
  pathfinder:profile.campaign.completed.length>=4,
  relicSeeker:profile.campaign.completed.length>=12,
  crownBreaker:CONQUEST.trials.every(t=>profile.campaign.completed.includes(t.id)),
  collector:CARD_KEYS.filter(k=>cardLevel(k)>=2).length>=8
 };
 const newlyEarned=[];
 for(const [key,unlocked]of Object.entries(achievementChecks))
  if(unlocked&&!profile.achievements[key]){profile.achievements[key]=1;newlyEarned.push(key)}
 while(profile.xp>=xpNeeded(profile.level)&&profile.level<100){profile.xp-=xpNeeded(profile.level);profile.level++}
 const record={matchId:S.matchId,victory,drawn,xp,gold:coins,rewards,
   missionTitle,storyClear,stars,newlyEarned,gauntlet:gauntletResult,masteryRewards,
   levelUp:profile.level>oldLevel,level:profile.level};
 profile.claimed[S.matchId]=record;profile.last=record;
 // Keep a limited anti-duplicate history across reloads.
 const ids=Object.keys(profile.claimed);
 if(ids.length>200)for(const id of ids.slice(0,ids.length-200))delete profile.claimed[id];
 saveProfile();return record;
}
function masteryStatus(){
 const tiers=[4,12,30];
 return CARD_KEYS.map(k=>{
  const uses=Math.max(0,Number(profile.mastery[k])||0);
  const claimed=Math.max(0,Math.min(3,Number(profile.masteryClaims[k])||0));
  return{key:k,name:D[k].name,uses,rank:tiers.filter(n=>uses>=n).length,
   claimed,next:tiers.find(n=>uses<n)||null};
 }).sort((a,b)=>b.rank-a.rank||b.uses-a.uses||a.name.localeCompare(b.name));
}
function gauntletStatus(){
 const g=profile.gauntlet,run=g.current;
 return{attempts:g.attempts,clears:g.clears,bestStage:g.bestStage,
   firstClearRewarded:g.firstClearRewarded,
   pathClears:{...g.pathClears},pathFirstRewards:{...g.pathFirstRewards},
   paths:Object.values(GAUNTLET_PATHS).map(v=>({id:v.id,name:v.name,description:v.description,
    firstGold:v.firstGold,clears:g.pathClears[v.id]||0})),
   current:run?{id:run.id,stage:run.stage,wins:run.wins,core:run.core,
    status:run.status,deckSize:run.deck?.length||0,path:run.path||'wayfinder'}:null};
}
function profileSummary(){
 return {level:profile.level,xp:profile.xp,xpNext:xpNeeded(profile.level),gold:profile.gold,
 wins:profile.wins,matches:profile.matches,last:profile.last,achievements:{...profile.achievements},
 gauntlet:gauntletStatus(),masteryTop:masteryStatus().slice(0,8)}
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
 const averageRank=chosenDeck.reduce((sum,k)=>sum+(cardRanks[k]||1),0)/chosenDeck.length;
 const aiTier=Math.max(1,Math.min(MAX_CARD_LEVEL,Math.floor(averageRank+.15)));
 S={version:4,usedCards:[[],[]],rewardPool:chosenDeck.slice(),cardRanks,aiTier,matchId:'m'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10),mode:m,phase:m==='online'?'waiting':'playing',turn:0,round:1,next:1,hp:[24,24],energy:[3,3],cap:3,units:[],hands:[[],[]],aiStyle,decks:[shuffle(chosenDeck),shuffle(PACKS[aiStyle])],discards:[[],[]],traps:[],cycled:[false,false],winner:null};
 setArena('verdant');
 S.units.push(unit('v',0,2,6,true),unit('r',0,4,6,true),unit('v',1,2,1,true),unit('b',1,4,1,true));
 for(let t=0;t<2;t++){for(let k of ['v','r','a']){let i=S.decks[t].indexOf(k);if(i>=0){S.decks[t].splice(i,1);S.hands[t].push(k)}}draw(t,Math.max(0,4-S.hands[t].length))}
}
const CONQUEST=window.AetherConquest||{regions:[],missions:[],trials:[],all:[]};
const MISSION_BY_ID=Object.fromEntries(CONQUEST.all.map(m=>[m.id,m]));
function campaignAvailable(id){
 const i=CONQUEST.missions.findIndex(m=>m.id===id),t=CONQUEST.trials.findIndex(m=>m.id===id);
 if(i>=0)return i===0||profile.campaign.completed.includes(CONQUEST.missions[i-1].id);
 if(t>=0)return CONQUEST.missions.every(m=>profile.campaign.completed.includes(m.id))&&
  (t===0||profile.campaign.completed.includes(CONQUEST.trials[t-1].id));
 return false;
}
// Read-only mission-preparation guidance. Uses the currently saved 24-card
// loadout and published campaign rules; never modifies a match or collection.
function campaignCounsel(id){
 const m=MISSION_BY_ID[id];if(!m)return null;
 const count=fn=>chosenDeck.filter(k=>fn(D[k],k)).length;
 const mobility=count(q=>!!q.fly||q.move>=3);
 const guards=count(q=>!q.spell&&(q.shield||q.hp>=7||q.role==='Guardian'));
 const damageSpells=count(q=>['bolt','cross','frost','ignite'].includes(q.spell));
 const healShields=count(q=>['heal','shield','cleanse','bond'].includes(q.spell));
 const average=+(chosenDeck.reduce((n,k)=>n+cardLevel(k),0)/DECK_SIZE).toFixed(1);
 const advice=[];
 if(m.objective==='capture'){
  advice.push(mobility>=4?
   'You have '+mobility+' fast or flying creatures. Split your pressure between both springs; the hold counter resets if you lose control.':
   'Only '+mobility+' of your cards are fast or flying. Add Sky Manta, Rift Stalker, or Wisp Familiar to reach both springs sooner.');
 }else if(m.objective==='hunt'){
  advice.push(damageSpells>=4?
   'Your deck contains '+damageSpells+' direct-damage spells. Save finishing damage for the champion after its next phase warning.':
   'Your deck has '+damageSpells+' direct-damage spells. Consider more Rift Barrage, Frostbind, or Ember Sigil before this champion.');
 }else if(m.objective==='defend'){
  advice.push(guards+healShields>=7?
   'Your '+guards+' defenders and '+healShields+' protective spells give you options to hold the approaches.':
   'You have '+guards+' durable defenders and '+healShields+' protective spells. Consider Bulwark, Golem, Ward, or Renewal to protect your Core.');
 }else{
  advice.push('Pressure the rival Core, but keep a defender on an Aeth spring to fund later summons.');
 }
 if(m.trial&&average<2){
  advice.push('Your average card level is '+average+' versus a tier-'+m.tier+' Crown Trial. Upgrading your most-used creatures may help; the encounter is not tuned around equal levels.');
 }else if(m.tier>=3&&average<2){
  advice.push('Your average card level is '+average+' in this tier-'+m.tier+' encounter. Concentrate upgrades on the units and spells you actually play.');
 }else{
  advice.push('Average deck level '+average+'. Match preparation still matters more than simply having the highest-cost cards.');
 }
 if(m.bossKit?.counter)advice.push('Champion counterplay: '+m.bossKit.counter);
 else if(m.encounter?.description)advice.push('Field condition: '+m.encounter.description);
 return{mission:id,averageLevel:average,fastOrFlying:mobility,durable:guards,
  directDamage:damageSpells,defenseSpells:healShields,tips:advice.slice(0,3)};
}
function campaignStatus(){
 return{completed:profile.campaign.completed.slice(),stars:{...profile.campaign.stars},
   storyTotal:CONQUEST.missions.length,storyDone:CONQUEST.missions.filter(m=>profile.campaign.completed.includes(m.id)).length,
   trialsDone:CONQUEST.trials.filter(m=>profile.campaign.completed.includes(m.id)).length,
   sigils:Object.values(profile.campaign.stars).reduce((a,v)=>a+v,0),
   available:CONQUEST.all.filter(m=>campaignAvailable(m.id)).map(m=>m.id),
   missions:CONQUEST.missions,trials:CONQUEST.trials,regions:CONQUEST.regions};
}
function setArena(id='verdant'){
 const region=CONQUEST.regions.find(r=>r.id===id)||CONQUEST.regions[0];
 if(!region)return;
 rocks.clear();region.rocks.forEach(v=>rocks.add(v));
 high.clear();region.high.forEach(v=>high.add(v));
 springs.length=0;springs.push(...region.springs);
 if(S){S.arenaId=region.id;S.hazards=region.hazardTiles?.slice()||[];}
}
function missionWin(){
 if(!S||S.phase!=='playing')return;
 S.phase='over';S.winner=0;S.missionSuccess=true;log='Objective completed! '+(MISSION_BY_ID[S.missionId]?.name||'');
}
function missionCheck(t){
 if(!S?.missionId||S.phase!=='playing')return;
 const mission=MISSION_BY_ID[S.missionId];if(!mission)return;
 if(t===0&&mission.objective==='capture'){
  S.missionProgress=onSpring(0)>=2?(S.missionProgress||0)+1:0;
  if(S.missionProgress>=mission.needed)missionWin();
 }
 if(t===1&&mission.objective==='defend'&&S.round>=mission.needed)missionWin();
}
function terrainTurn(team){
 // Rift Gauntlet uses the existing safe campaign terrain effects; quick
 // battles and competitive duels remain unchanged.
 if((!S?.missionId&&!S?.gauntletRunId)||S.phase!=='playing')return;
 const region=CONQUEST.regions.find(v=>v.id===S.arenaId);
 if(!region||region.hazard==='none')return;
 for(const u of [...S.units].filter(v=>v.team===team&&(S.hazards||[]).includes(K(v.x,v.y)))){
  if(region.hazard==='ember'){
   fxSpell(u,1,'ignite',u.x,u.y,1-team);applyDamage(u,1);
  }else if(region.hazard==='frost'){
   u.frosted=true;fxPush({type:'buff',kind:'frost',to:fxTarget(u),amount:0});
  }else if(region.hazard==='arcane'){
   if(u.shield>0)u.shield=Math.max(0,u.shield-1);
   else {fxSpell(u,1,'silence',u.x,u.y,1-team);applyDamage(u,1)}
  }
 }
}
// v4.4 campaign scripts: deterministic events on the player's next round.
// No new save version or online duel logic. Old unfinished missions migrate
// lazily: they receive their next future event, never retroactive damage.
function encounterTick(){
 if(!S?.missionId||S.phase!=='playing'||S.mode!=='ai')return false;
 const mission=MISSION_BY_ID[S.missionId],e=mission?.encounter;
 if(!e)return false;
 const state=S.encounterState||(S.encounterState={events:0,lastRound:0,notice:'',
  nextRound:e.first+Math.ceil(Math.max(0,S.round-e.first)/e.cadence)*e.cadence});
 const nextRound=Number.isInteger(state.nextRound)?state.nextRound:
  e.first+Math.ceil(Math.max(0,S.round-e.first)/e.cadence)*e.cadence;
 state.nextRound=nextRound;
 if(S.round<nextRound||S.round===state.lastRound)return false;
 const id=S.round,phase=state.events;
 let description='';
 if(phase===0&&S.expeditionPlan?.kind==='pledge'){
  const rescued=S.units.filter(u=>u.team===0&&u.hp<u.max);
  for(const u of rescued){u.hp=Math.min(u.max,u.hp+1);abilityPulse(u,'heal',1)}
  S.expeditionPlan.pledgeTriggered=true;
  S.expeditionPlan.pledgeRecovered=rescued.length;
 }
 if(e.type==='spring'){
  const holders=springs.map(k=>{const [x,y]=k.split(',').map(Number);return entity(x,y)})
   .filter(Boolean);
  for(const u of holders){const value=grantShield(u,1);
   if(value)abilityPulse(u,'shield',value);
  }
  description=holders.length?'The Aeth wells pulse. '+holders.length+' controlling unit(s) gain shield.':
   'The Aeth wells pulse, but neither side controls them.';
 }else if(e.type==='roots'){
  const targets=S.units.filter(u=>e.tiles.includes(K(u.x,u.y)));
  for(const u of targets){u.rooted=true;abilityPulse(u,'frost',0)}
  description=targets.length?targets.length+' creature(s) bound by creeping roots.':
   'Briars spread across the central pathway.';
 }else if(e.type==='weather'){
  const pattern=e.patterns[phase%e.patterns.length];
  const region=CONQUEST.regions.find(r=>r.id===mission.region);
  const legal=pattern.filter(k=>{
   const [x,y]=k.split(',').map(Number);
   return bounds(x,y)&&!rocks.has(k)&&!(x===3&&(y===0||y===7));
  });
  S.hazards=legal;
  description=(region?.hazard==='frost'?'A whiteout sweeps across new tiles.':
   region?.hazard==='ember'?'Magma fractures move to new tiles.':
   'Unstable arcane ground shifts.')+' Move before the next terrain pulse.';
 }else if(e.type==='ward'||e.type==='mirror'){
  const boss=S.units.find(u=>u.id===S.championId&&u.team===1);
  let targets=boss?[boss]:[];
  if(e.type==='mirror'&&boss){
   const ally=S.units.filter(u=>u.team===1&&u.id!==boss.id)
     .sort((a,b)=>d(a,boss)-d(b,boss)||a.id-b.id)[0];
   if(ally)targets.push(ally);
  }
  for(const u of targets){const shield=grantShield(u,1);
   if(shield)abilityPulse(u,'shield',shield);
  }
  description=targets.length?e.type==='mirror'?'The Court grants a mirror ward to its defenders.':
   'The champion renews its ancient protective ward.':
   'The ancient ward flickers with no champion left.';
 }else if(e.type==='wave'){
  const sites=[[0,1],[6,1],[1,2],[5,2],[2,1],[4,1]];
  let recruited=false;
  if(S.units.filter(u=>u.team===1).length<7){
   for(let j=0;j<sites.length;j++){
    const [x,y]=sites[(j+phase*2)%sites.length];
    if(rocks.has(K(x,y))||entity(x,y)||x===3&&(y===0||y===7))continue;
    const type=e.pool[phase%e.pool.length];
    S.units.push(unit(type,1,x,y,false));recruited=true;break;
   }
  }
  description=recruited?'Enemy reinforcements emerge from the side passages.':
   'Enemy reinforcements are delayed by the crowded battlefield.';
 }
 state.events++;state.lastRound=id;state.nextRound=id+e.cadence;
 state.notice=e.name+' — '+description+
  (phase===0&&S.expeditionPlan?.kind==='pledge'?
   ' · Oath of endurance restores '+S.expeditionPlan.pledgeRecovered+' wounded ally(s).':'');
 state.history=(state.history||[]).slice(-2);state.history.push({round:id,text:state.notice});
 log=state.notice;
 return true;
}
function commanderReinforce(){
 if(!S?.missionId||S.phase!=='playing'||S.round%4!==0||S.round>16)return;
 const m=MISSION_BY_ID[S.missionId];if(!m||m.tier<=1)return;
 // Signature encounter waves replace generic reinforcements; do not stack
 // independent spawning every 3 and 4 rounds on the Hollow King trial.
 const isolatedQA=window.__qaIsolatedStorage===true&&location.pathname.endsWith('/qa-v39.html');
 if(m.encounter?.type==='wave'&&!(isolatedQA&&S.qaAllowGenericReinforcements))return;
 if(S.units.filter(v=>v.team===1).length>=7)return;
 const pool=(PACKS[m.style]||PACKS.Balanced).filter(k=>!D[k].spell&&!D[k].tribute&&D[k].cost<=Math.min(4,m.tier));
 const type=pool[(Math.floor(S.round/4)+m.tier)%pool.length]||'v';
 for(const [x,y]of [[0,1],[6,1],[1,2],[5,2]]){
  if(!entity(x,y)&&!rocks.has(K(x,y))){
   S.units.push(unit(type,1,x,y,false));
   if(isolatedQA)S.qaGenericCount=(S.qaGenericCount||0)+1;
   log='Enemy commander calls reinforcements.';break;
  }
 }
}
function startMission(id,qa=false,planKind=null){
 const m=MISSION_BY_ID[id];
 const testMode=qa===true&&window.__qaIsolatedStorage===true&&
  location.pathname.endsWith('/qa-v39.html');
 if(!m||(!testMode&&!campaignAvailable(id)))return false;
 const choices=m.storyScene?.choices||[];
 const selected=choices.find(p=>p.kind===planKind)||choices[0]||null;
 disconnect();mode='ai';localSeat=0;connected=false;clearSelection();
 seed('ai');S.missionId=id;S.missionProgress=0;S.arenaId=m.region;S.missionGoal=m.objective;
 S.missionRoundLimit=m.rounds;S.aiStyle=m.style;
 S.aiTier=Math.max(S.aiTier||1,m.tier);
 S.hazards=[];
 S.bossHistory=[];S.bossNotice='';
 S.encounterState=m.encounter?{events:0,lastRound:0,notice:'',
  nextRound:m.encounter.first}:null;
 setArena(m.region);
 S.decks[1]=shuffle(PACKS[m.style]||PACKS.Balanced);
 S.hands[1]=[];S.discards[1]=[];
 for(const k of ['v','r','a']){
  const index=S.decks[1].indexOf(k);if(index>=0){S.decks[1].splice(index,1);S.hands[1].push(k)}
 }
 draw(1,Math.max(0,4-S.hands[1].length));
 if(m.champion){
  const champion=unit(m.champion,1,3,2,true);
  champion.hp=champion.max=m.champHP;
  champion.atk=m.champATK||Math.min(6,champion.atk+Math.floor(m.tier/2));
  champion.boss=true;
  S.championId=champion.id;
  S.units.push(champion);
 }
 S.hp[1]=m.objective==='assault'?24+Math.max(0,m.tier-2)*2:24;
 S.coreMax=[24,Math.max(24,S.hp[1])];
 // The expedition doctrine belongs to this match only; existing v4 saves
 // and commander profile need no migration.
 if(selected){
  S.expeditionPlan={kind:selected.kind,name:selected.name,description:selected.description};
  switch(selected.kind){
   case 'rush':S.energy[0]=Math.min(10,S.energy[0]+2);S.hp[0]=22;break;
   case 'ward':
    S.energy[0]=Math.max(0,S.energy[0]-1);
    for(const u of S.units.filter(v=>v.team===0).slice(0,2))grantShield(u,1);
    break;
   case 'lore':S.energy[0]=Math.max(0,S.energy[0]-1);draw(0,1);break;
   case 'sabotage':S.hp[0]=22;S.hp[1]=Math.max(1,S.hp[1]-2);break;
   case 'pledge':S.energy[0]=Math.max(0,S.energy[0]-1);break;
   case 'gambit':
    S.energy[0]=Math.min(10,S.energy[0]+1);
    S.energy[1]=Math.min(10,S.energy[1]+1);draw(0,1);break;
  }
 }
 $('mode-ai').classList.add('active');$('mode-online').classList.remove('active');
 $('lobby').classList.add('hidden');
 message('<b>'+m.name+'</b> · '+m.story+(selected?' · '+selected.name+' selected.':''),
  m.objective==='capture'?'Capture BOTH Aeth springs for '+m.needed+' consecutive turns.':
  m.objective==='defend'?'Keep your Core intact until round '+m.needed+'.':
  m.objective==='hunt'?'Defeat the marked boss to complete the mission.':
  'Reduce the enemy Core to zero.');
 save();render();return true;
}

// Rift Gauntlet v4.6.0: three consecutive autonomous solo battles.
// A run snapshots the deck and ranks and uses only additive profile fields.
// Three genuinely different PvE routes. Pure stage modifiers, never PvP.
const GAUNTLET_PATHS={
 wayfinder:{id:'wayfinder',name:'Wayfinder',description:'Classic Gauntlet. Restore 4 Core HP between battles.',heal:4,
  startHP:24,enemyHP:0,bonusAeth:0,shield:0,firstGold:0},
 stormbound:{id:'stormbound',name:'Stormbound',description:'Restore only 2 Core HP. Enemy Cores gain 3 HP; begin each stage with 2 extra Aeth.',heal:2,
  startHP:24,enemyHP:3,bonusAeth:2,shield:0,firstGold:70},
 ironbound:{id:'ironbound',name:'Ironbound',description:'Start at 20 Core HP; restore 3 between battles. Enemy Cores gain 2 HP; your two starters gain 1 shield.',heal:3,
  startHP:20,enemyHP:2,bonusAeth:0,shield:1,firstGold:100}
};
const GAUNTLET_STAGES=[
 {name:'Whispering Gate',region:'verdant',style:'Skirmish',enemyHP:24,tier:1,
  detail:'The green breach tests the mobility of your 24-card deck.'},
 {name:'Frostbound Passage',region:'frost',style:'Arcane',enemyHP:27,tier:2,
  detail:'Carry your wounded Core into a frostglass ambush.'},
 {name:'Crownfall Reckoning',region:'ruins',style:'Fortress',enemyHP:30,tier:3,
  detail:'An armored guardian protects the final Core.'}
];
function buildGauntletStage(run){
 const stage=GAUNTLET_STAGES[run.stage-1];
 const path=GAUNTLET_PATHS[run.path]||GAUNTLET_PATHS.wayfinder;
 if(!stage||!checkDeck(run.deck)||run.status!=='active')return false;
 disconnect();mode='ai';localSeat=0;connected=false;clearSelection();
 seed('ai');
 const frozen=run.ranks||{};
 S.cardRanks=Object.fromEntries(CARD_KEYS.map(k=>[k,Math.max(1,Math.min(8,frozen[k]||1))]));
 S.rewardPool=run.deck.slice();S.decks[0]=shuffle(run.deck);S.hands[0]=[];S.discards[0]=[];
 for(const k of ['v','r','a']){
  const idx=S.decks[0].indexOf(k);
  if(idx>=0){S.decks[0].splice(idx,1);S.hands[0].push(k)}
 }
 draw(0,Math.max(0,4-S.hands[0].length));
 S.aiStyle=stage.style;S.aiTier=Math.max(1,Math.min(8,(run.tier||1)+run.stage-1));
 S.decks[1]=shuffle(PACKS[stage.style]||PACKS.Balanced);S.hands[1]=[];S.discards[1]=[];
 for(const k of ['v','r','a']){
  const idx=S.decks[1].indexOf(k);
  if(idx>=0){S.decks[1].splice(idx,1);S.hands[1].push(k)}
 }
 draw(1,Math.max(0,4-S.hands[1].length));
 S.gauntletRunId=run.id;S.gauntletStage=run.stage;S.gauntletName=stage.name;
 S.gauntletPath=path.id;
 S.gauntletDetail=stage.detail;
 S.hp[0]=run.stage===1?path.startHP:Math.min(24,Math.max(1,run.core+path.heal));
 S.hp[1]=stage.enemyHP+path.enemyHP;S.coreMax=[24,S.hp[1]];
 if(path.bonusAeth)S.energy[0]=Math.min(10,S.energy[0]+path.bonusAeth);
 if(path.shield)for(const u of S.units.filter(u=>u.team===0).slice(0,2))grantShield(u,path.shield);
 setArena(stage.region);
 if(run.stage===3){
  const guard=unit('aj',1,3,2,true);
  guard.hp=guard.max=11;guard.atk=2;guard.boss=true;
  S.units.push(guard);
 }
 $('mode-ai').classList.add('active');$('mode-online').classList.remove('active');
 $('lobby').classList.add('hidden');
 message('<b>RIFT GAUNTLET · '+path.name.toUpperCase()+' · '+run.stage+'/3 · '+stage.name+'</b>',
  stage.detail+' · CORE '+S.hp[0]+'/24 · '+path.description);
 save();render();return true;
}
function startGauntlet(chosenPath='wayfinder'){
 if(!Object.prototype.hasOwnProperty.call(GAUNTLET_PATHS,chosenPath))return false;
 const current=profile.gauntlet.current;
 if(current?.status==='active'&&S?.gauntletRunId===current.id&&
  S.gauntletStage===current.stage&&S.phase==='playing')return true;
 if(current?.status==='ready'){
  if(S?.gauntletRunId===current.id&&S.gauntletStage===current.stage&&
     S.phase==='over'&&profile.claimed[S.matchId]?.victory)return continueGauntlet();
  current.status='abandoned';
 }
 if(current?.status==='active')current.status='abandoned';
 const run={id:'rift-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,9),
  stage:1,wins:0,core:GAUNTLET_PATHS[chosenPath].startHP,
  path:chosenPath,status:'active',deck:chosenDeck.slice(),
  ranks:Object.fromEntries(chosenDeck.map(k=>[k,cardLevel(k)])),
  tier:Math.max(1,Math.min(5,Math.floor(chosenDeck.reduce((n,k)=>n+cardLevel(k),0)/24)))};
 profile.gauntlet.attempts++;profile.gauntlet.current=run;
 saveProfile();
 return buildGauntletStage(run);
}
function continueGauntlet(){
 const run=profile.gauntlet.current;
 if(!run||run.status!=='ready'||run.stage>=3||S?.phase!=='over'||
  S.gauntletRunId!==run.id||S.gauntletStage!==run.stage||
  S.winner!==0||!profile.claimed[S.matchId]?.victory)return false;
 run.stage++;run.status='active';
 saveProfile();
 return buildGauntletStage(run);
}
function save(){if(mode!=='ai'||!S)return;try{localStorage.setItem('aether-dominion-v04',JSON.stringify(S))}catch(e){}}
function load(){try{let x=JSON.parse(localStorage.getItem('aether-dominion-v04'));if(x?.version===4&&x?.mode==='ai'&&Array.isArray(x.units)&&x.units.length<30){S=x;let migrated=false;if(!S.matchId){S.matchId='legacy-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8);migrated=true}if(!Array.isArray(S.traps)){S.traps=[];migrated=true}for(const u of S.units){if((u.shield||0)>5){u.shield=5;migrated=true}}for(let t=0;t<2;t++){if(S.hands?.[t]?.length>5){const excess=S.hands[t].splice(5);S.decks[t].push(...excess);migrated=true}}if(migrated)save();return true}}catch(e){}return false}
const onSpring=t=>springs.filter(k=>{let [x,y]=k.split(',').map(Number);return entity(x,y)?.team===t}).length;
function deploy(t,x,y){if(!bounds(x,y)||rocks.has(K(x,y))||entity(x,y)||(x===3&&(y===0||y===7)))return false;if(t===0&&y>=5||t===1&&y<=2)return true;return springs.some(k=>{let [sx,sy]=k.split(',').map(Number);return entity(sx,sy)?.team===t&&d(P(sx,sy),P(x,y))<=1})}
function movement(u){let queue=[{x:u.x,y:u.y,n:0}],seen=new Set([K(u.x,u.y)]),out=[];const maxMove=Math.max(1,u.move-(u.frosted?1:0));while(queue.length){let z=queue.shift();if(z.n>0)out.push(z);if(z.n>=maxMove)continue;for(let [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){let x=z.x+dx,y=z.y+dy,k=K(x,y);if(!bounds(x,y)||seen.has(k)||entity(x,y)||(rocks.has(k)&&!u.fly)||(x===3&&(y===0||y===7)))continue;seen.add(k);queue.push({x,y,n:z.n+1})}}return out}
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
// On-summon movement assistance does not create a new attack, affect flyers
// or ignore roots. Its round quota is shared between cards of the same team.
function onCreatureSummoned(u){
 if(u.k==='ag'){
  const ally=S.units.filter(v=>v.team===u.team&&v.id!==u.id&&v.hp>0&&
   (v.rooted||v.burning)&&d(v,u)<=2)
   .sort((a,b)=>(a.hp/a.max)-(b.hp/b.max)||d(a,u)-d(b,u)||a.id-b.id)[0];
  if(ally){
   ally.rooted=false;ally.burning=false;
   const shield=grantShield(ally,1);
   abilityPulse(ally,'lanternist',shield);
  }
 }
 if(u.k==='Y'){
  const target=S.units.filter(v=>v.team!==u.team&&!v.boss&&v.hp>0&&d(v,u)<=2)
   .sort((a,b)=>d(a,u)-d(b,u)||a.id-b.id)[0];
  if(target){
   target.weakened=Math.max(Number(target.weakened)||0,1);
   abilityPulse(target,'bellkeeper',0);
  }
 }
 if(u.k==='T'){
  const traps=S.traps||[];
  const idx=traps.map((trap,i)=>({...trap,index:i}))
   .filter(t=>t.team!==u.team&&d(t,u)<=2)
   .sort((a,b)=>d(a,u)-d(b,u)||a.y-b.y||a.x-b.x)[0]?.index;
  if(idx!==undefined){
   traps.splice(idx,1);
   const shield=grantShield(u,1);
   if(shield)abilityPulse(u,'shield',shield);
  }
 }
 if(u.k!=='M'||S.zephyrRound?.[u.team]===S.round)return;
 const ally=S.units.filter(v=>v.team===u.team&&v.id!==u.id&&
  !v.fly&&v.moved&&!v.rooted&&d(v,u)<=2)
  .sort((a,b)=>d(a,u)-d(b,u)||a.id-b.id)[0];
 if(!ally)return;
 ally.moved=false;ally.stride=0;
 S.zephyrRound||=[-1,-1];S.zephyrRound[u.team]=S.round;
 abilityPulse(ally,'dash',0);
}
// Only spring-holding Bastions produce their shield, once at the start
// of their own side's turn. No ongoing aura and never above shield cap.
function springBastionPulse(team){
 for(const keeper of S.units.filter(v=>v.team===team&&v.k==='N'&&
  springs.includes(K(v.x,v.y)))){
  const allies=S.units.filter(v=>v.team===team&&v.id!==keeper.id&&
   d(v,keeper)<=2&&v.shield<MAX_SHIELD)
   .sort((a,b)=>d(a,keeper)-d(b,keeper)||a.shield-b.shield||a.id-b.id);
  const beneficiary=allies[0]||(keeper.shield<MAX_SHIELD?keeper:null);
  if(!beneficiary)continue;
  const n=grantShield(beneficiary,1);
  if(n)abilityPulse(beneficiary,'shield',n);
 }
}
function onUnitDeath(u){
 if(u.k==='S'){
  const target=S.units.filter(v=>v.team!==u.team&&!v.boss&&v.hp>0&&d(v,u)<=2)
   .sort((a,b)=>d(a,u)-d(b,u)||a.id-b.id)[0];
  if(target){target.rooted=true;abilityPulse(target,'frost',0)}
 }
 if(S?.missionId&&u.id===S.championId&&u.team===1&&S.missionGoal==='hunt')missionWin();
 if(u.k==='y'){const ally=nearestAlly(u,2);
  if(ally){const amt=grantShield(ally,2);abilityPulse(ally,'shield',amt)}
 }
}
// Multi-phase campaign champions: meaningful changes to positioning and
// survival rather than simply oversized health bars.
// v4.4.1 — signature boss transitions. No new attacks are granted by
// these helpers. They only change bounded positional/status state.
function bossSignature(boss,mission,phase){
 const foes=S.units.filter(u=>u.team===0)
  .sort((a,b)=>d(a,boss)-d(b,boss)||a.hp-b.hp||a.id-b.id);
 const friends=S.units.filter(u=>u.team===1&&u.id!==boss.id)
  .sort((a,b)=>d(a,boss)-d(b,boss)||a.id-b.id);
 const id=mission.id;
 let text='';
 if(id==='v3'){
  const targets=foes.filter(u=>d(u,boss)<=4).slice(0,phase===1?1:2);
  for(const u of targets){u.rooted=true;abilityPulse(u,'frost',0)}
  text=targets.length?'Briars catch '+targets.length+' challenger(s).':'Briars surround the Warden, but reach no one.';
 }else if(id==='f3'){
  if(phase===1){
   const u=friends[0];
   if(u){const n=grantShield(u,1);if(n)abilityPulse(u,'shield',n)}
   text=u?'The Seer shields its closest retainer.':'The Seer finds no ally to shield.';
  }else{
   const u=foes.find(v=>d(v,boss)<=4);
   if(u){u.frosted=true;abilityPulse(u,'frost',0)}
   text=u?'An icy reflection slows the closest challenger.':'The Seer projects an icy reflection.';
  }
 }else if(id==='e3'||id==='t3'){
  const candidates=id==='e3'?
   (phase===1?['2,3']:['4,4']):(phase===1?['2,3','4,3']:['2,4','4,4']);
  const legal=candidates.filter(k=>{
   const [x,y]=k.split(',').map(Number);
   return bounds(x,y)&&!rocks.has(k)&&!(x===3&&(y===0||y===7));
  });
  S.hazards=Array.from(new Set([...(S.hazards||[]),...legal])).slice(0,8);
  text=legal.length?'New glowing fissures open. Avoid them before the next terrain tick.':
   'The furnace shakes, but the fissures remain blocked.';
 }else if(id==='r3'){
  if(phase===1){
   const u=foes.find(v=>d(v,boss)<=4);
   if(u){u.brandedFor=1;abilityPulse(u,'silence',0)}
   text=u?'The Leviathan brands a challenger for its next strike.':'The Leviathan searches for a challenger to brand.';
  }else{
   for(const u of friends.slice(0,2)){
    const n=grantShield(u,1);if(n)abilityPulse(u,'shield',n);
   }
   text='The deepwater oath shields the Leviathan’s defenders.';
  }
 }else if(id==='t1'){
  if(phase===1){
   boss.move=Math.min(3,boss.move+1);
   text='The Hollow King strides farther on its next move.';
  }else{
   const u=foes[0];
   if(u){u.brandedFor=1;abilityPulse(u,'silence',0)}
   text=u?'The King marks its nearest challenger.':'The King seeks a challenger to mark.';
  }
 }else if(id==='t2'){
  boss.mirrorCharge=Math.min(2,(boss.mirrorCharge||0)+1);
  if(phase===2)boss.mirrorCharge=2;
  abilityPulse(boss,'shield',0);
  text='The Court’s mirror stores '+boss.mirrorCharge+' retaliation'+
   (boss.mirrorCharge===1?'':'s')+' against basic attacks.';
 }
 if(text){
  S.bossHistory=(S.bossHistory||[]).slice(-3);
  S.bossHistory.push({phase,id,text,round:S.round});
  S.bossNotice='PHASE '+phase+' · '+text;
 }
 return text;
}
function bossReaction(boss){
 if(!S.missionId||boss.id!==S.championId||boss.hp<=0)return;
 const ratio=boss.hp/Math.max(1,boss.max),phase=boss.bossPhase||0;
 const mission=MISSION_BY_ID[S.missionId];if(!mission)return;
 if(ratio<=.65&&phase<1){
  boss.bossPhase=1;
  const shield=grantShield(boss,1);if(shield)abilityPulse(boss,'shield',shield);
  // Bosses call a distinct defender. At most one minion per phase.
  const minion=mission.id==='t1'?'s':mission.id==='t2'?'b':mission.id==='t3'?'c':
   mission.region==='frost'?'j':mission.region==='ember'?'c':'v';
  for(const [xx,yy]of [[boss.x-1,boss.y],[boss.x+1,boss.y],[boss.x,boss.y-1],[boss.x,boss.y+1]]){
   if(bounds(xx,yy)&&!rocks.has(K(xx,yy))&&!entity(xx,yy)&&
      !(xx===3&&(yy===0||yy===7))&&S.units.filter(u=>u.team===1).length<8){
    S.units.push(unit(minion,1,xx,yy,false));break;
   }
  }
  const special=bossSignature(boss,mission,1);
  log=mission.name+' — PHASE TWO! '+(special||'The guardian calls its defenders.');
 }
 if(ratio<=.3&&(boss.bossPhase||0)<2){
  boss.bossPhase=2;
  boss.atk=Math.min(7,boss.atk+1);
  grantShield(boss,1);
  const special=bossSignature(boss,mission,2);
  log=mission.name+' — FINAL PHASE! '+(special||'The guardian draws on the Rift.');
 }
}
function onSacrifice(t){
 // A voluntary sacrifice is distinct from an ordinary combat death.
 // Each surviving Devourer may heal at most once during a round.
 for(const devourer of S.units.filter(v=>v.team===t&&v.k==='aa'&&
   v.devourRound!==S.round&&v.hp<v.max)){
  const healed=Math.min(2,devourer.max-devourer.hp);
  if(healed){
   devourer.hp+=healed;devourer.devourRound=S.round;
   abilityPulse(devourer,'oathmoss',healed);
  }
 }
 for(const u of S.units.filter(v=>v.team===t&&v.k==='B'&&v.oathRound!==S.round)){
  u.oathRound=S.round;const amt=grantShield(u,2);u.oathBonus=1;abilityPulse(u,'shield',amt);
 }
}
function onFriendlySpell(t){
 for(const u of S.units.filter(v=>v.team===t&&v.k==='z'&&v.runeRound!==S.round)){
  u.runeRound=S.round;u.runeCharge=1;abilityPulse(u,'rally',0);
 }
 // Tideglass Oracle requires an actually resolved, friendly spell.
 // Each individual Oracle can activate once a round; it cannot shield itself
 // or select opponents, and never pushes shield above the universal cap.
 for(const oracle of S.units.filter(v=>v.team===t&&v.k==='Q'&&v.oracleRound!==S.round)){
  const ally=S.units.filter(v=>v.team===t&&v.id!==oracle.id&&
   d(v,oracle)<=2&&(v.shield||0)<MAX_SHIELD)
   .sort((a,b)=>(a.shield||0)-(b.shield||0)||d(a,oracle)-d(b,oracle)||a.id-b.id)[0];
  if(!ally)continue;
  const gained=grantShield(ally,1);
  if(gained){
   oracle.oracleRound=S.round;
   abilityPulse(ally,'shield',gained);
  }
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
 if(u.k==='ah'&&u.kestrelRound!==S.round){
  const foe=S.units.filter(v=>v.team!==u.team&&!v.boss&&v.hp>0&&d(v,u)<=2)
   .sort((a,b)=>d(a,u)-d(b,u)||a.id-b.id)[0];
  if(foe){
   u.kestrelRound=S.round;foe.weakened=Math.max(1,Number(foe.weakened)||0);
   abilityPulse(foe,'kestrel',0);
  }
 }
 if(u.k==='ab'&&springs.includes(K(u.x,u.y))&&u.heraldRound!==S.round){
  u.heraldRound=S.round;
  const n=grantShield(u,1);
  S.energy[u.team]=Math.min(10,S.energy[u.team]+1);
  abilityPulse(u,'tidebreak',n);
 }
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
 const collectorHarvest=attacker.k==='ai'&&!target.core&&
  (target.rooted||target.burning)&&attacker.collectRound!==S.round;
 // A burning target may pass its flame to ONE other unburned enemy
 // creature within 2 tiles, once per Prowler per round. Never to a Core.
 const flameTarget=attacker.k==='Z'&&!target.core&&!!target.burning&&
  attacker.prowlerRound!==S.round?
  S.units.filter(v=>v.team!==attacker.team&&v.id!==target.id&&
   !v.burning&&v.hp>0&&d(v,target)<=2)
   .sort((a,b)=>d(a,target)-d(b,target)||a.id-b.id)[0]:null;
 // Harrier: moving after a successful flank is a single tactical action.
 // An attack is never refreshed, and core strikes cannot trigger the bonus.
 const harrierFlank=attacker.k==='R'&&!target.core&&
  attacker.harrierRound!==S.round&&S.units.some(v=>
   v.team===attacker.team&&v.id!==attacker.id&&d(v,target)===1);
 // Cragsunder Duelist: high-ground advantage *instead* of a raw power
 // multiplier. Applies once per round, and never against a Core.
 if(attacker.k==='O'&&!target.core&&high.has(K(attacker.x,attacker.y))&&
    attacker.summitRound!==S.round){
  attacker.summitRound=S.round;
  target.shield=Math.max(0,(target.shield||0)-2);
  abilityPulse(attacker,'edict',0);
 }
 // Umbral Siphon transfers actual existing shield before ordinary damage,
 // once per round. It creates no shield if the opponent had none or the
 // siphon was already capped, and never affects Cores.
 if(attacker.k==='P'&&!target.core&&(target.shield||0)>0&&
    (attacker.shield||0)<MAX_SHIELD&&attacker.siphonRound!==S.round){
  target.shield=Math.max(0,target.shield-1);
  const gained=grantShield(attacker,1);
  attacker.siphonRound=S.round;
  if(gained)abilityPulse(attacker,'shield',gained);
 }
 // Dawn Edict is a single-use offensive effect. It removes at most three
 // existing shield points, without touching unit health or creating attacks.
 const edict=!!attacker.edict;
 const raw=damage(attacker,target)+(edict?1:0);
 if(edict){
  attacker.edict=false;
  if(!target.core)target.shield=Math.max(0,(target.shield||0)-3);
  abilityPulse(attacker,'edict',1);
 }
 const actual=mitigate(target,raw,true);
 fxStrike(attacker,target,actual);
 const wasUnit=!target.core&&S.units.some(v=>v.id===target.id);
 applyDamage(target,actual);
 if(collectorHarvest&&S.units.some(v=>v.id===attacker.id)){
  attacker.collectRound=S.round;
  S.energy[attacker.team]=Math.min(10,S.energy[attacker.team]+1);
  abilityPulse(attacker,'hollowroot',1);
 }
 if(wasUnit&&target.k==='aj'&&target.hp>0&&
  S.units.some(v=>v.id===target.id)&&target.rimeRound!==S.round){
  target.rimeRound=S.round;target.burning=false;target.rooted=false;
  const shield=grantShield(target,1);
  abilityPulse(target,'rimeshard',shield);
 }
 if(flameTarget&&S.units.some(v=>v.id===attacker.id)&&
    S.units.some(v=>v.id===flameTarget.id)){
  flameTarget.burning=true;
  attacker.prowlerRound=S.round;
  abilityPulse(flameTarget,'cinderwake',0);
 }
 if(harrierFlank&&S.units.some(v=>v.id===attacker.id)){
  attacker.harrierRound=S.round;attacker.moved=false;attacker.stride=0;
  abilityPulse(attacker,'dash',0);
 }
 // Ashen Reprisal triggers only once against a genuine physical strike.
 // It never recurses: its 1-damage return is a spell impact, not a strike.
 if(wasUnit&&S.units.some(v=>v.id===target.id)&&target.reprisal&&S.units.some(v=>v.id===attacker.id)){
  target.reprisal=0;
  fxSpell(attacker,1,'reprisal',target.x,target.y,target.team);
  applyDamage(attacker,1);
 }
 // Mirror Court reflects at most one point per stored charge. It does not
 // reflect spells, hit an already defeated striker, or chain into itself.
 if(S.missionId==='t2'&&!target.core&&target.id===S.championId&&
    target.hp>0&&target.mirrorCharge>0&&attacker.team===0&&
    S.units.some(u=>u.id===attacker.id)){
  target.mirrorCharge--;
  fxSpell(attacker,1,'exchange',target.x,target.y,1);
  applyDamage(attacker,1);
  S.bossNotice='MIRROR COUNTER · The Court reflects 1 damage. '+
   target.mirrorCharge+' charge(s) remain.';
  log=S.bossNotice;
 }
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
function applyDamage(target,n){if(target.core){
  const objectiveCore=S.missionId&&target.team===1&&S.missionGoal!=='assault';
  S.hp[target.team]=Math.max(objectiveCore?1:0,S.hp[target.team]-n);
  if(S.hp[target.team]===0){S.phase='over';S.winner=1-target.team}
 }else{let absorb=Math.min(target.shield,n);target.shield-=absorb;target.hp-=n-absorb;if(target.hp>0&&target.boss)bossReaction(target);
  if(target.hp<=0){onUnitDeath(target);S.units=S.units.filter(u=>u.id!==target.id)}}}

function endSupportTurn(team){
 const supports=S.units.filter(u=>u.team===team&&u.k==='p');
 for(const healer of supports){
  const allies=S.units.filter(v=>v.team===team&&v.id!==healer.id&&d(v,healer)===1&&v.hp<v.max)
    .sort((a,b)=>(b.max-b.hp)-(a.max-a.hp)||a.id-b.id);
  if(allies.length){allies[0].hp++;abilityPulse(allies[0],'heal',1)}
 }
 for(const u of S.units.filter(u=>u.team===team)){
  u.rooted=false;u.frosted=false;u.stride=0;
 }
 terrainTurn(team);
}
function startStatusTurn(team){
 for(const u of S.units.filter(v=>v.team===team)){
  if(u.reprisal&&S.round>=(u.reprisalUntil||0))u.reprisal=0;
  if(u.edict&&S.round>=(u.edictUntil||0))u.edict=false;
 }
 for(const u of [...S.units].filter(u=>u.team===team&&u.burning)){
  u.burning=false;
  fxSpell(u,1,'ignite',u.x,u.y,1-team);
  applyDamage(u,1);
 }
 springBastionPulse(team);
}
// Pull only into genuinely free, legal adjacent tiles. Never relocate bosses
// or bypass collision, even if the target has flying movement.
function undertowLanding(v,t){
 if(!v||v.boss)return null;
 const allies=S.units.filter(u=>u.team===t&&d(u,v)<=3)
  .sort((a,b)=>d(a,v)-d(b,v)||a.id-b.id);
 if(!allies.length)return null;
 const anchor=allies[0],before=d(v,anchor);
 const directions=[[0,1],[-1,0],[1,0],[0,-1]];
 return directions.map(([dx,dy])=>P(v.x+dx,v.y+dy))
  .filter(p=>bounds(p.x,p.y)&&d(p,anchor)<before&&!rocks.has(K(p.x,p.y))&&
   !(p.x===3&&(p.y===0||p.y===7))&&!entity(p.x,p.y))
  .sort((a,b)=>d(a,anchor)-d(b,anchor)||a.y-b.y||a.x-b.x)[0]||null;
}
// A Gale Step is a displacement, not an action refresh.
function galePassenger(t,x,y){
 const dest=P(x,y);
 if(!bounds(x,y)||entity(x,y)||rocks.has(K(x,y))||
    (x===3&&(y===0||y===7)))return null;
 // Because the player taps only the destination, multiple adjacent allies
 // would make the passenger ambiguous. Reject that square instead of moving
 // an arbitrary unit selected by internal ID.
 const eligible=S.units.filter(u=>u.team===t&&!u.rooted&&!u.boss&&
  u.id!==S.championId&&d(u,dest)===1);
 return eligible.length===1?eligible[0]:null;
}
// Stable eligibility helpers are shared by highlighting, the AI and execution.
function prismReceiver(donor,t){
 return S.units.filter(v=>v.team===t&&v.id!==donor.id&&v.hp>0&&
  (v.shield||0)<=MAX_SHIELD-2&&d(v,donor)<=2)
  .sort((a,b)=>(a.shield||0)-(b.shield||0)||d(a,donor)-d(b,donor)||a.id-b.id)[0]||null;
}
function gravemireVictims(target,t){
 return S.units.filter(v=>v.team===1-t&&!v.boss&&v.hp>0&&
  !v.rooted&&d(v,target)<=1)
  .sort((a,b)=>d(a,target)-d(b,target)||a.id-b.id).slice(0,2);
}
function cinderBloomVictims(target,t){
 if(!target||target.core||target.team===t||target.boss||target.burning)return[];
 const other=S.units.filter(v=>v.team===1-t&&v.id!==target.id&&
  v.hp>0&&!v.boss&&!v.burning&&d(v,target)<=2)
  .sort((a,b)=>d(a,target)-d(b,target)||a.id-b.id)[0]||null;
 return other?[target,other]:[target];
}
function tidalReprieveVictims(target,t){
 if(!target||target.core||target.team!==t||target.hp>=target.max)return[];
 return [target,...S.units.filter(v=>v.team===t&&v.id!==target.id&&
  v.hp<v.max&&d(v,target)<=2)
   .sort((a,b)=>(b.max-b.hp)-(a.max-a.hp)||d(a,target)-d(b,target)||a.id-b.id).slice(0,2)];
}
function validSpellSpot(q,t,x,y){
 const target=entity(x,y),type=q.spell;
 if(['shield','heal','dash','cleanse','rally','bond','exchange','recall','reprisal','edict'].includes(type)){
  if(type==='recall'){
   const discarded=S.discards[t].some(k=>!D[k].spell&&!D[k].tribute);
   return discarded&&S.hands[t].length<=5&&S.echoRound?.[t]!==S.round&&
    (!!target&&target.team===t||x===3&&y===(t===0?7:0));
  }
  if(!target||target.team!==t)return false;
  if(type==='dash'&&target.dashRound===S.round)return false;
  if(type==='heal'&&(target.renewedRound===S.round||target.hp>=target.max&&!target.moved&&!target.attacked))return false;
  if(type==='shield'&&target.shield>=MAX_SHIELD)return false;
  if(type==='reprisal'&&target.reprisal)return false;
  if(type==='edict'&&(target.edict||target.attacked))return false;
  if(type==='exchange'&&(S.exchangeRound?.[t]===S.round||S.units.filter(v=>v.team===t).length<2||target.id===S.championId))return false;
  return true;
 }
 if(type==='gravemire')return !!target&&!target.core&&target.team===1-t&&!target.boss&&
  S.units.some(v=>v.team===t&&d(v,target)<=3)&&gravemireVictims(target,t).length>0;
 if(type==='prismrelay')return !!target&&!target.core&&target.team===t&&
  (target.shield||0)>=2&&!!prismReceiver(target,t);
 if(type==='cinderbloom')return !!target&&!target.core&&target.team===1-t&&!target.boss&&
  S.units.some(v=>v.team===t&&d(v,target)<=3)&&cinderBloomVictims(target,t).length>0;
 if(type==='tidalreprieve')return !!target&&!target.core&&target.team===t&&
  tidalReprieveVictims(target,t).length>0;
 if(type==='gale')return !!galePassenger(t,x,y);
 if(type==='breach')return !!target&&!target.core&&target.team===1-t&&
  (target.shield||0)>0&&S.units.some(u=>u.team===t&&d(u,target)<=3);
 if(type==='covenant')return !!target&&target.team===t&&!target.boss&&
  target.id!==S.championId&&S.units.some(v=>v.team===t&&v.id!==target.id&&d(v,target)<=2);
 if(type==='refrain')return !!target&&target.team===1-t&&!target.core&&
  (target.burning||target.rooted)&&S.units.some(v=>v.team===t&&d(v,target)<=3);
 if(type==='snare'){
  return !target&&!rocks.has(K(x,y))&&!(x===3&&(y===0||y===7))&&
    !S.traps?.some(v=>v.team===t)&&
    S.units.some(v=>v.team===t&&d(v,P(x,y))<=2);
 }
 if(!S.units.some(v=>v.team===t&&d(v,P(x,y))<=3))return false;
 if(['frost','ignite','silence'].includes(type))return !!target&&target.team!==t;
 if(type==='undertow')return !!target&&target.team!==t&&!target.boss&&!!undertowLanding(target,t);
 if(type==='diagonal'){
  return S.units.some(v=>v.team!==t&&Math.abs(v.x-x)===1&&Math.abs(v.y-y)===1)||
   (Math.abs(core(1-t).x-x)===1&&Math.abs(core(1-t).y-y)===1);
 }
 if(type==='bolt')return target?.team===1-t||(x===3&&y===(t===0?0:7));
 if(type==='cross')return S.units.some(v=>v.team!==t&&d(v,P(x,y))<=1)||d(P(x,y),core(1-t))<=1;
 return false;
}
function resolveSpell(q,t,x,y){
 const target=entity(x,y),type=q.spell;
 if(!validSpellSpot(q,t,x,y))return false;
 const power=powerFor(q,t),boost=spellBonus(CARD_KEYS.find(k=>D[k]===q),t);
 if(type==='gravemire'){
  for(const victim of gravemireVictims(target,t)){
   victim.rooted=true;abilityPulse(victim,'gravemire',0);
  }
 }else if(type==='prismrelay'){
  const receiver=prismReceiver(target,t);
  if(!receiver)return false;
  target.shield-=2;
  const gained=grantShield(receiver,2);
  // Strategic reason to use the relay instead of the cheaper-to-aim Ward:
  // movement tempo is returned only once per recipient per round, never attack.
  if(receiver.moved&&!receiver.rooted&&receiver.relayRound!==S.round){
   receiver.moved=false;receiver.stride=0;receiver.relayRound=S.round;
  }
  abilityPulse(target,'prismrelay',-2);abilityPulse(receiver,'prismrelay',gained);
 }else if(type==='cinderbloom'){
  for(const victim of cinderBloomVictims(target,t)){
   victim.burning=true;abilityPulse(victim,'cinderbloom',0);
  }
 }else if(type==='tidalreprieve'){
  const victims=tidalReprieveVictims(target,t);
  for(let i=0;i<victims.length;i++){
   const ally=victims[i],amount=Math.min(i===0?2:1,ally.max-ally.hp);
   ally.hp+=amount;abilityPulse(ally,'tidalreprieve',amount);
  }
 }else if(type==='breach'){
  target.shield=Math.max(0,(target.shield||0)-2);
  const impact=mitigate(target,power,false);
  fxSpell(target,impact,'breach',x,y,t);applyDamage(target,impact);
 }else if(type==='gale'){
  const mover=galePassenger(t,x,y);
  if(!mover)return false;
  mover.x=x;mover.y=y;
  fxPush({type:'buff',kind:'gale',to:fxTarget(mover),amount:0});
  trapImpact(mover);
 }else if(type==='covenant'){
  const targets=S.units.filter(u=>u.team===t&&u.id!==target.id&&
   d(u,target)<=2).sort((a,b)=>d(a,target)-d(b,target)||a.id-b.id).slice(0,2);
  if(!targets.length)return false;
  onSacrifice(t);
  S.units=S.units.filter(u=>u.id!==target.id);
  fxPush({type:'spell',kind:'covenant',to:fxTarget(target),amount:0});
  for(const ally of targets){
   const n=grantShield(ally,2);
   ally.rallied=1;abilityPulse(ally,'covenant',n);
  }
 }else if(type==='refrain'){
  const origin=P(x,y);
  const follow=S.units.filter(u=>u.team===1-t&&u.id!==target.id&&d(u,origin)<=2)
   .sort((a,b)=>d(a,origin)-d(b,origin)||a.id-b.id)[0]||null;
  const impact=mitigate(target,power,false);
  fxSpell(target,impact,'refrain',x,y,t);applyDamage(target,impact);
  if(follow&&S.units.some(u=>u.id===follow.id)){
   const chain=mitigate(follow,1,false);
   fxSpell(follow,chain,'refrain',x,y,t);applyDamage(follow,chain);
  }
 }else if(type==='reprisal'){
  const n=grantShield(target,2);
  target.reprisal=1;target.reprisalUntil=S.round+1;
  abilityPulse(target,'reprisal',n);
 }else if(type==='edict'){
  target.edict=true;target.edictUntil=S.round+1;
  abilityPulse(target,'edict',1);
 }else if(type==='undertow'){
  const landing=undertowLanding(target,t);
  if(!landing)return false;
  const impact=mitigate(target,power,false);
  fxSpell(target,impact,'undertow',x,y,t);applyDamage(target,impact);
  if(S.units.some(u=>u.id===target.id)){
   target.x=landing.x;target.y=landing.y;
   fxPush({type:'buff',kind:'undertow',to:fxTarget(target),amount:0});
   trapImpact(target);
  }
 }else if(type==='diagonal'){
  const victims=S.units.filter(v=>v.team!==t&&
   Math.abs(v.x-x)===1&&Math.abs(v.y-y)===1);
  for(const victim of [...victims]){
   const impact=mitigate(victim,power,false);
   fxSpell(victim,impact,'diagonal',x,y,t);applyDamage(victim,impact);
  }
  const enemyCore=core(1-t);
  if(Math.abs(enemyCore.x-x)===1&&Math.abs(enemyCore.y-y)===1){
   fxSpell(enemyCore,power,'diagonal',x,y,t);applyDamage(enemyCore,power);
  }
 }else if(type==='shield'){const n=grantShield(target,4+boost);abilityPulse(target,'shield',n)}
 else if(type==='heal'){const heal=Math.min(3+boost,target.max-target.hp);target.hp+=heal;
  target.moved=false;target.attacked=false;target.renewedRound=S.round;abilityPulse(target,'heal',heal)}
 else if(type==='dash'){target.moved=false;target.stride=0;target.dashRound=S.round;if(boost)grantShield(target,boost);abilityPulse(target,'dash',0)}
 else if(type==='cleanse'){target.rooted=false;target.burning=false;const amt=grantShield(target,2+boost);abilityPulse(target,'cleanse',amt)}
 else if(type==='rally'){
  for(const ally of S.units.filter(v=>v.team===t&&d(v,target)<=1)){
   ally.rallied=1;if(boost)grantShield(ally,boost);abilityPulse(ally,'rally',0)
  }
 }else if(type==='bond'){
  for(const ally of S.units.filter(v=>v.team===t&&d(v,target)<=1).slice(0,3)){
   const amt=grantShield(ally,1+boost);ally.rallied=1;abilityPulse(ally,'bond',amt)
  }
 }else if(type==='recall'){
  S.echoRound||(S.echoRound=[0,0]);
  const i=S.discards[t].findLastIndex(k=>!D[k].spell&&!D[k].tribute);
  if(i<0)return false;
  const card=S.discards[t].splice(i,1)[0];
  S.hands[t].push(card);S.echoRound[t]=S.round;S.energy[t]=Math.min(10,S.energy[t]+Math.min(1,boost));
  fxPush({type:'buff',kind:'recall',to:{x,y,team:t},amount:0});
 }else if(type==='snare'){
  S.traps||(S.traps=[]);
  S.traps.push({team:t,x,y,expires:S.round+4,damage:3+boost});
  fxPush({type:'buff',kind:'snare',to:{x,y,team:t},amount:0});
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
 if(S.phase!=='playing')return;
 missionCheck(t);
 if(S.phase!=='playing')return;
 if(t===1){S.round++;S.cap=Math.min(10,2+S.round);
  if(S.missionId){
   commanderReinforce();encounterTick();missionCheck(t);if(S.phase!=='playing')return;
   if(S.round>(S.missionRoundLimit||ROUND_LIMIT)){
    S.winner=1;S.phase='over';log='The enemy held out until the mission timer expired.';return
   }
  }else if(S.round>ROUND_LIMIT){endByScore();return}
 }
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
   const spawned=S.units[S.units.length-1];
   trapImpact(spawned);
   if(S.units.some(v=>v.id===spawned.id))onCreatureSummoned(spawned);
   log=q.name+' summoned!';
  }else{
   if(!resolveSpell(q,t,x,y))return false;
   onFriendlySpell(t);
   log=q.name+' cast!';
  }
  if(!S.usedCards)S.usedCards=[[],[]];S.usedCards[t].push(k);
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
// v4.3: bounded deterministic tactical evaluations. These score only legal
// moves and existing stats; they do not change any player-facing rules.
function aiPositionScore(u,pos,foes){
 const k=K(pos.x,pos.y);
 const distance=foes.length?Math.min(...foes.map(v=>d(pos,v))):7;
 const fromCore=d(pos,core(0));
 const spring=springs.includes(k)?4.1:0;
 const elevation=high.has(k)?(u.range>1?1.8:.7):0;
 const hazards=(S.hazards||[]).includes(k)?(u.hp<=3?6:3.8):0;
 const enemyUnits=S.units.filter(v=>v.team===0);
 let threatened=0;
 for(const enemy of enemyUnits){
  // A threat evaluates line of sight from the candidate position, without
  // mutating unit state or assuming the enemy can move and attack twice.
  if(!enemy.attacked&&d(pos,enemy)<=enemy.range&&los(pos,enemy))
   threatened+=Math.min(4,enemy.atk)*(.45+(u.hp<=enemy.atk?1.1:0));
 }
 const readyShot=enemyUnits.some(enemy=>d(pos,enemy)<=u.range&&los(pos,enemy))?2.5:0;
 // If a mission asks the player to defend a spring, the rival should
 // contest it rather than blindly charge the core.
 const contest=S.missionGoal==='capture'&&spring?1.8:0;
 return -distance*1.65-fromCore*.11+spring+contest+elevation+readyShot
   -hazards-threatened*.65;
}
function aiAttackScore(attacker,target){
 const coreTarget=!!target.core;
 const raw=attacker.atk+(high.has(K(attacker.x,attacker.y))&&!high.has(K(target.x,target.y))?1:0);
 const shield=coreTarget?0:(target.shield||0);
 const remaining=coreTarget?S.hp[0]:target.hp;
 const lethal=remaining>0&&raw-shield>=remaining;
 let score=Math.min(9,raw-shield)+ (lethal?17:0);
 if(coreTarget)return score+(lethal?90:1.5);
 score+=(target.atk||0)*1.45+(target.range||1)*.55;
 if(springs.includes(K(target.x,target.y)))score+=3;
 if(target.id===S.championId)score+=3;
 if(target.k==='r'||target.k==='c')score+=1.2;
 return score-Math.max(0,remaining-(raw-shield))*.24;
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
   if(['ignite','frost','bolt','silence','undertow','breach','refrain','gravemire','cinderbloom'].includes(q.spell)){
    const opportunities=enemies.filter(u=>validSpellSpot(q,1,u.x,u.y))
     .sort((a,b)=>(a.hp-b.hp)||((b.k==='r'?1:0)-(a.k==='r'?1:0)));
    spot=opportunities.find(u=>q.spell==='gravemire'?gravemireVictims(u,1).length>=2:
    q.spell==='cinderbloom'?cinderBloomVictims(u,1).length>=2:
    q.spell==='frost'?!u.rooted:
    q.spell==='ignite'?!u.burning:
    q.spell==='refrain'?!!(u.rooted||u.burning):true);
   }else if(q.spell==='diagonal'){
    const options=[];
    for(let cy=0;cy<8;cy++)for(let cx=0;cx<7;cx++){
     if(!validSpellSpot(q,1,cx,cy))continue;
     const affected=enemies.filter(v=>Math.abs(v.x-cx)===1&&Math.abs(v.y-cy)===1);
     const coreHit=Math.abs(core(0).x-cx)===1&&Math.abs(core(0).y-cy)===1;
     const strength=affected.reduce((v,u)=>v+Math.min(powerFor(q,1),u.hp+u.shield),0)+
      (coreHit?powerFor(q,1)*1.3:0);
     if(affected.length>=2||coreHit)options.push({x:cx,y:cy,strength});
    }
    options.sort((a,b)=>b.strength-a.strength||a.y-b.y||a.x-b.x);
    spot=options[0]||null;
   }else if(q.spell==='cross'){
    // Target valid *empty* blast centres too. Previously only an occupied
    // enemy tile could be the centre, missing some two-unit formations.
    const blasts=[];
    for(let cy=0;cy<8;cy++)for(let cx=0;cx<7;cx++){
     if(!validSpellSpot(q,1,cx,cy))continue;
     const center=P(cx,cy),victims=enemies.filter(v=>d(v,center)<=1);
     const coreHit=d(center,core(0))<=1;
     const raw=Math.max(1,powerFor(q,1));
     const value=victims.reduce((sum,v)=>sum+
      Math.min(raw,v.hp+v.shield)+(raw>=v.hp+v.shield?1.8:0),0)+
      (coreHit?raw*1.3:0);
     if(victims.length>=2||(coreHit&&victims.length>=1))
      blasts.push({x:cx,y:cy,value});
    }
    blasts.sort((a,b)=>b.value-a.value||a.y-b.y||a.x-b.x);
    spot=blasts[0]||null;
   }else if(q.spell==='covenant'){
    spot=friends.filter(u=>u.hp<=3&&u.id!==S.championId&&!u.boss&&
      friends.some(v=>v.id!==u.id&&d(u,v)<=2)).sort((a,b)=>a.hp-b.hp||a.id-b.id)[0];
   }else if(q.spell==='gale'){
    const moves=[];
    for(let cy=0;cy<8;cy++)for(let cx=0;cx<7;cx++){
     if(!validSpellSpot(q,1,cx,cy))continue;
     const mover=galePassenger(1,cx,cy);
     if(springs.includes(K(cx,cy))&&!springs.includes(K(mover.x,mover.y)))
      moves.push({x:cx,y:cy,score:4});
    }
    moves.sort((a,b)=>b.score-a.score||a.y-b.y||a.x-b.x);
    spot=moves[0];
   }else if(q.spell==='prismrelay'){
    spot=friends.filter(u=>(u.shield||0)>=3&&prismReceiver(u,1)&&
     (prismReceiver(u,1).shield||0)<=1&&prismReceiver(u,1).moved&&
     !prismReceiver(u,1).rooted&&prismReceiver(u,1).relayRound!==S.round)
     .sort((a,b)=>(b.shield||0)-(a.shield||0)||a.id-b.id)[0];
   }else if(q.spell==='tidalreprieve'){
    spot=friends.filter(u=>tidalReprieveVictims(u,1).length>=2)
     .sort((a,b)=>tidalReprieveVictims(b,1).length-tidalReprieveVictims(a,1).length||a.id-b.id)[0];
   }else if(q.spell==='heal'){
    spot=friends.filter(u=>u.hp<=u.max-2).sort((a,b)=>(a.hp/a.max)-(b.hp/b.max))[0];
   }else if(q.spell==='reprisal'){
    spot=friends.filter(u=>!u.reprisal&&u.shield<5)
     .sort((a,b)=>(a.hp/a.max)-(b.hp/b.max))[0];
   }else if(q.spell==='edict'){
    spot=friends.filter(u=>!u.edict&&!u.attacked)
     .sort((a,b)=>b.atk-a.atk||a.id-b.id)[0];
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
   const sacrificial=S.units.filter(u=>u.team===1&&!u.attacked&&u.id!==S.championId)
      .sort((a,b)=>a.hp-b.hp||a.atk-b.atk);
   if(sacrificial.length<tribute||S.units.filter(u=>u.team===1).length-tribute>=8)continue;
   const ids=sacrificial.slice(0,tribute).map(u=>u.id);
   const enemyUnits=S.units.filter(v=>v.team===0);
   // Prefer contested springs, high ground for ranged summons, and squares
   // outside hazards. Preserve deterministic ties to avoid AI jitter.
   const score=z=>{
    const nearest=enemyUnits.length?Math.min(...enemyUnits.map(v=>d(z,v))):5;
    return (springs.includes(K(z.x,z.y))?3.2:0)+
      (high.has(K(z.x,z.y))?(o.q.range>1?2:1):0)-
      ((S.hazards||[]).includes(K(z.x,z.y))?5:0)-
      Math.abs(nearest-(o.q.range>1?3:2))*.9+z.y*.16;
   };
   positions.sort((a,b)=>score(b)-score(a)||a.y-b.y||a.x-b.x);
   if(apply(1,{op:'card',idx:o.idx,x:positions[0].x,y:positions[0].y,tributes:ids}))break;
  }
 }
 for(const u of [...S.units].filter(u=>u.team===1)){
  if(S.phase==='over')break;
  const goals=()=>[...S.units.filter(v=>v.team===0),core(0)];
  let eligible=goals().filter(v=>canAttack(u,v));
  if(!eligible.length&&!u.moved&&!u.rooted){
   const foes=goals(),paths=movement(u);
   paths.sort((a,b)=>aiPositionScore(u,b,foes)-aiPositionScore(u,a,foes)||
      a.n-b.n||a.y-b.y||a.x-b.x);
   if(paths.length&&aiPositionScore(u,paths[0],foes)>aiPositionScore(u,u,foes)+.15){
    const path=paths[0];
    // Use the same authoritative validation as a player's move.
    apply(1,{op:'move',id:u.id,x:path.x,y:path.y});
   }
   if(!S.units.some(v=>v.id===u.id))continue;
   eligible=goals().filter(v=>canAttack(u,v));
  }
  if(eligible.length){
   eligible.sort((a,b)=>aiAttackScore(u,b)-aiAttackScore(u,a)||
     (a.id||0)-(b.id||0));
   basicStrike(u,eligible[0]);u.attacked=true;u.stride=0;
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
const SPELL_LABELS={"heal":"♥ HEAL","shield":"◇ SHIELD","dash":"➜ MOVE","frost":"❄ ROOT","ignite":"🔥 BURN","rally":"⚔ RALLY","cleanse":"◇ CLEANSE","bolt":"⚡ BARRAGE","cross":"☄ AREA","recall":"✦ RECALL","snare":"◇ TRAP 2","bond":"✦ FORMATION","exchange":"✧ RITUAL","silence":"◇ SILENCE","diagonal":"✧ DIAGONAL","reprisal":"♜ RIPOSTE","undertow":"≈ PULL","edict":"☼ PIERCE",
 "gravemire":"◉ GRAVITY","prismrelay":"◇ RELAY","cinderbloom":"♨ EMBERS",
 "tidalreprieve":"♥ TIDAL HEAL"};
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
 H:{feature:'Diagonal area denial.',detail:'Choose a focal tile within 3 of an ally. Enemies on its four diagonal neighboring squares take 2 damage. The center tile is untouched.',tip:'Aim into the empty gap between diagonally clustered enemies.'},
 I:{feature:'One-hit reactive defense.',detail:'Grant an ally 2 shield up to the global five-shield cap. The first enemy basic strike against it before its next turn takes 1 retaliation damage. Does not stack.',tip:'Protect an exposed spring holder; the ward is consumed on its first incoming basic strike.'},
 J:{feature:'Controlled positional displacement.',detail:'Deal 1 damage to a non-boss enemy within 3 of your army; move it one clear tile toward its nearest allied-side challenger when possible. The target must have a valid open landing tile.',tip:'Pull ranged enemies off high ground into melee range, or disturb a fortified formation.'},
 K:{feature:'Counter-protection attack blessing.',detail:'The next basic attack from one allied creature gains 1 damage and strips up to 3 shield before the hit. Expires at the start of that creature’s next turn.',tip:'Time this immediately before striking a heavily shielded boss or frontline guardian.'},
 U:{feature:'Spell-based shield breaking.',detail:'Choose an enemy creature with at least 1 shield within 3 tiles of your army. Remove up to 2 of its shield, then resolve 1 normal spell damage. Never targets an enemy Core.',tip:'Counter defensive frontlines without wasting an expensive area spell.'},
 V:{feature:'One-square formation shift.',detail:'Choose an empty tile adjacent to an unrooted friendly unit within army reach. Move the only adjacent eligible ally by one square; contested destinations with multiple eligible allies are invalid. Do not refresh attacks or movement. Landing triggers traps normally.',tip:'Slip a guardian onto a spring or save a threatened support unit without granting extra turns.'},
 W:{feature:'Sacrifice-powered warding.',detail:'Choose an allied non-champion creature with another ally within 2 tiles. Remove the chosen ally as a deliberate sacrifice, then give 2 shield and Rally to up to two nearest surviving allies. No defeat trigger.',tip:'Trade a low-health unit for protection and damage pressure on two important allies.'},
 X:{feature:'Exploit roots and burning.',detail:'Deal 2 spell damage to a burning or rooted enemy creature within 3 of your army. If another enemy creature stands within 2 of that target, chain 1 spell damage to the closest one. No enemy Core targeting.',tip:'Combine Thorn Warden or Frostbind with a follow-up spell for efficient conditional damage.'},
 Y:{feature:'Close-range opening hex.',detail:'On summon, give the nearest enemy nonboss creature within 2 tiles -1 on its next basic strike. Can never overwrite a stronger weakening effect or suppress a champion.',tip:'Deploy by an opposing frontline attacker before it swings.'},
 Z:{feature:'Burn propagation via successful strike.',detail:'Once per round, a basic attack against an already burning enemy creature ignites one other non-burning enemy creature within 2 tiles of the first victim. Never spreads to a Core or boosts base strike damage.',tip:'Pair with Ember Sigil to pressure clustered creatures.'},
 aa:{feature:'Survive through voluntary sacrifice.',detail:'Whenever you voluntarily sacrifice a friendly unit to a mythic, Fateful Exchange or Ember Covenant, restore up to 2 missing HP to this Devourer once per round. Defeat of any creature never qualifies.',tip:'Keep this slow beast alive on a contested lane while using sacrifice cards.'},
 ac:{feature:'Control a clustered enemy advance.',detail:'Select an opposing non-champion creature within three tiles of your army. Root up to two unrooted opposing non-champions within one tile of that target, nearest first. Deals no immediate damage, excludes Cores and never affects champions.',tip:'Interrupt a pair of advancing skirmishers before their next movement.'},
 ad:{feature:'Redistribute shields and movement tempo.',detail:'Choose an allied creature holding at least two shields. Move exactly two of its shield points to the most weakly shielded different ally within two tiles who has space for both. If that ally already moved, is unrooted and has not been refreshed by Prism Relay this round, it may move once more, but never gains another attack. Never exceeds the five-shield cap and cannot target a Core.',tip:'Transfer your backline protection to a fast spring runner after its first move.'},
 ae:{feature:'Set up an Ember combination.',detail:'Choose an unburned enemy non-champion creature within three tiles of your army. Ignite it and the nearest other unburned non-champion enemy within two tiles. Deals no immediate damage; existing burn is never stacked.',tip:'Set up Cinderjaw Prowler or force enemies to spend a cleanse.'},
 af:{feature:'Recover a wounded squad.',detail:'Choose one injured allied creature. Restore up to two HP to it, plus one HP each to the two most injured different allies within two tiles. Healing never refreshes their movement or attack and cannot exceed maximum HP.',tip:'Best when several allied creatures survive a tough round together.'},
 ag:{feature:'Cleansing support on entry.',detail:'On summon, remove burn and root from the most injured afflicted friendly creature within two tiles other than the Lanternist, and grant it one shield if space remains. Never cleanses enemies or resurrects defeated units.',tip:'Summon after opposing control effects while keeping the fragile Lanternist safe.'},
 ah:{feature:'Movement-triggered disruptive flight.',detail:'After its first successful move each round ending within two tiles of an enemy nonchampion, weaken the nearest eligible enemy next basic attack by one. Does not stack or trigger when summoned.',tip:'Fly toward a dangerous striker before its turn.'},
 ai:{feature:'Harvest a status without extra damage.',detail:'Its first basic attack each round against a rooted or burning enemy creature restores one Aeth, capped at ten. Never activates on Cores or unmarked targets.',tip:'Follow Gravemire Ring or Cinder Bloom with a melee engagement.'},
 aj:{feature:'Resilient reactive warding.',detail:'The first time this Sentinel survives an enemy basic attack each round, remove its burning and root, then grant one shield, capped at five. Cannot retaliate with extra attacks and cannot trigger when killed.',tip:'Anchor the frontline against repeated control attacks.'},
 ab:{feature:'Earn momentum from spring control.',detail:'The first time this Herald moves onto an Aeth spring each round, it gains 1 shield and restores 1 Aeth to its owner, capped at 10. Triggered after any hostile snare damage; summoning directly on a spring does not count.',tip:'Move from another tile onto a spring when your Aeth is below the cap.'},
 M:{feature:'Flying squad mobility support.',detail:'When summoned, restore movement to the nearest grounded, unrooted ally within two tiles that already moved. Once per round for your entire army; attacks are never refreshed.',tip:'Move your frontline, then summon the Cartographer close enough to dispatch it again.'},
 N:{feature:'Spring-based fortification.',detail:'If this defender is standing on an Aeth spring when your turn begins, grant one shield to a nearby ally within two tiles. If none qualifies, shield itself. Maximum five shield per creature.',tip:'Hold contested springs rather than using it as an ordinary slow bruiser.'},
 O:{feature:'Elevation-based shield breaker.',detail:'Its first basic attack launched from high ground each round removes up to two enemy shield before ordinary damage. A Core cannot be pierced this way.',tip:'Use elevation to counter ward-heavy opponents without dealing more raw damage.'},
 P:{feature:'Steal an opponent’s defenses.',detail:'The first basic attack against a shielded creature each round transfers exactly one shield from the target to this unit, provided the hunter is below the five-shield cap.',tip:'Pick protected targets to swing shield advantage, rather than finishing unshielded weaklings.'},
 Q:{feature:'Spell-linked tidecraft.',detail:'After the first friendly spell each round, the Oracle shields one other ally within 2 tiles by 1. Does not trigger on enemy spells or a failed cast. No shield above 5.',tip:'Cast a low-cost spell with another ally near the Oracle to shore up your front line.'},
 R:{feature:'Attack then escape.',detail:'After this Harrier first strikes an opposing creature that also has an allied creature adjacent to it, refresh the Harrier’s movement once per round. It never refreshes an attack.',tip:'Land a flank alongside your frontline, then leave the danger zone.'},
 S:{feature:'Roots after defeat.',detail:'When defeated, root the closest opposing non-boss creature within 2 tiles, if one is available. The enemy can still attack but cannot move during its upcoming turn.',tip:'Hold a choke point even if the Warden falls. Enemy Cores and bosses cannot be rooted.'},
 T:{feature:'Disarm concealed ground traps.',detail:'On summon, remove the closest enemy Veil Snare within 2 tiles, if one exists, then gain 1 shield. Does not reveal or remove friendly traps. No trap means no bonus.',tip:'Deploy it near a contested spring to counter surprise snares.'},

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
 (portraitIndices[k]===undefined?'<span class="art-cost" aria-label="'+D[k].cost+' Aeth">'+D[k].cost+'</span>':'');
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
  if(d.spell==='diagonal')extras.push(['✧','4 diagonal tiles']);
  if(d.spell==='reprisal')extras.push(['♜','2 shield · 1 riposte']);
  if(d.spell==='undertow')extras.push(['≈','Pull 1 tile']);
  if(d.spell==='edict')extras.push(['☼','+1 strike · pierce 3']);
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
 selectedSlot=deckSlots.active;
 if(V45_ENABLED&&!$('deck-presets').querySelector('[data-preset="Astral"]')){
  const button=document.createElement('button');
  button.type='button';button.dataset.preset='Astral';
  button.innerHTML='ASTRAL<small>Position & Counterplay</small>';
  $('deck-presets').appendChild(button);
 }
 closeGuide();draftDeck=chosenDeck.slice();$('deck-builder').classList.remove('hidden');
 $('deck-status').textContent='Choose a deck slot, edit it, then save for your NEXT match. Your battle is untouched.';
 renderDeckSlots();deckStatus();
}
function closeBuilder(){
 selectedSlot=deckSlots.active;draftDeck=chosenDeck.slice();
 $('deck-builder').classList.add('hidden')
}
function saveBuilder(){
 if(!checkDeck(draftDeck))return false;
 chosenDeck=draftDeck.slice();
 const i=selectedSlot;
 deckSlots.slots[i]={name:safeSlotName($('deck-slot-name')?.value)||
  (deckSlots.slots[i]?.name||'DECK '+(i+1)),cards:chosenDeck.slice()};
 deckSlots.active=i;
 persistDeck();persistDeckSlots();
 $('deck-status').textContent='Saved deck '+(i+1)+' for your next NEW MATCH.';
 closeBuilder();
 message('<b>Deck slot '+(i+1)+' equipped for your next match.</b>',
  'The current battle and other saved decks remain unchanged.');
 return true;
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
 const stats=d.spell?(d.power?'⚡ '+(d.power+Math.min(2,Math.floor(lv/2)))+' DAMAGE':'✧ SUPPORT'):
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
    m.rewards.map(k=>D[k]?.name||k).join(', ')+(m.missionTitle?' · '+m.missionTitle+(m.storyClear?' FIRST CLEAR':'')+' · '+m.stars+' SIGILS':'')+(m.levelUp?' · LEVEL UP!':'')+
    (m.gauntlet?' · GAUNTLET '+m.gauntlet.stage+'/3 '+m.gauntlet.status.toUpperCase():'')+
    (m.masteryRewards?.length?' · '+m.masteryRewards.length+' NEW MASTERIES':''):
    'Finish a match to earn XP, gold and copies of cards from your deck.';
 if($('profile-achievements')){
  const earned=Object.keys(profile.achievements).filter(k=>profile.achievements[k]);
  $('profile-achievements').textContent='MILESTONES · '+earned.length+'/6  '+earned.map(k=>k.replace(/([A-Z])/g,' $1').toUpperCase()).join(' ✦ ');
 }
 const items=CARD_KEYS.slice().sort((a,b)=>cardLevel(b)-cardLevel(a)||D[a].cost-D[b].cost||D[a].name.localeCompare(D[b].name));
 $('profile-upgrade-list').innerHTML=items.map(k=>{
  const card=D[k],lv=cardLevel(k),copies=profile.copies[k]||0,cost=cardUpgradeCost(k);
  return '<div class="profile-card-row" data-card="'+k+'">'+
   '<span class="profile-card-art">'+guideImage(k)+'</span>'+
   '<div class="profile-card-meta"><strong>'+card.name+'</strong>'+
   '<small>LV '+lv+' / '+MAX_CARD_LEVEL+' · '+profileCardSummary(k)+'</small>'+
   '<span>'+(lv===MAX_CARD_LEVEL?'MAX LEVEL':copies+'/'+cost.copies+' COPIES · '+cost.gold+' GOLD')+'</span><span class="mastery-label">✦ MASTERY '+(profile.mastery[k]||0)+' USES</span></div>'+
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

// v4.4.4: advance notice for scripted events and boss thresholds.
// Pure read-only briefing. It does not reveal hidden hands, change the
// battle state, consume a turn, or run in competitive PvP.
function battleWarning(){
 if(!S||S.phase!=='playing'||S.mode!=='ai'||!S.missionId||S.turn!==0)
  return null;
 const mission=MISSION_BY_ID[S.missionId];if(!mission)return null;
 const boss=S.units.find(u=>u.id===S.championId&&u.team===1);
 if(boss&&mission.bossKit){
  const phase=boss.bossPhase||0,ratio=boss.hp/Math.max(1,boss.max);
  const phaseTwo=phase===1&&ratio>.3&&ratio<=.43;
  const phaseOne=phase<1&&ratio>.65&&ratio<=.8;
  if(phaseOne||phaseTwo){
   const next=phaseTwo?2:1;
   return{kind:'boss',title:'CHAMPION PREPARES · PHASE '+next,
    text:next===1?mission.bossKit.phase1:mission.bossKit.phase2};
  }
 }
 const e=mission.encounter,progress=S.encounterState;
 if(!e||!progress||progress.nextRound-S.round!==1)return null;
 let text=e.description;
 if(e.type==='weather'&&e.patterns?.length){
  const next=e.patterns[(progress.events||0)%e.patterns.length];
  const spots=next.map(k=>{const [x,y]=k.split(',').map(Number);
   return String.fromCharCode(65+x)+(y+1)}).join(' · ');
  text='NEXT HAZARD LANES: '+spots+'. Reposition before the terrain shifts.';
 }else if(e.type==='wave')text='Enemy troops will enter from the side lanes next round.';
 else if(e.type==='spring')text='Occupied Aeth springs will grant 1 shield next round.';
 else if(e.type==='roots')text='Briar roots will bind creatures on the central path next round.';
 else if(e.type==='ward'||e.type==='mirror')
  text='The champion’s protective magic will strengthen next round.';
 return{kind:e.type,title:'NEXT ROUND · '+e.name.toUpperCase(),text};
}
function renderLabels(){
 $('instruction').innerHTML=msg||'<b>Welcome, Commander.</b> Select a card or unit.';
 $('tip').textContent=(S?.bossNotice?S.bossNotice+' · ':'')+
  (S?.missionId&&S.encounterState?.notice?S.encounterState.notice+' · ':'')+
  (hint||'Summon, position and conquer.');
 $('feed').textContent=log||'The Riftfront awaits your orders.';
}
function render(){
 if(!S)return;
 const my=localSeat,enemy=1-my,mirror=my===1;
 if($('battle-mode-tag'))$('battle-mode-tag').textContent=S.mode==='online'?'♜ PRIVATE DUEL':S.gauntletRunId?'✦ RIFT '+(GAUNTLET_PATHS[S.gauntletPath]?.name||'Gauntlet')+' '+S.gauntletStage+'/3':S.missionId?'🗺 CAMPAIGN':'⚔ SOLO BATTLE';
 const coreMax=[Math.max(24,S.coreMax?.[0]||24),Math.max(24,S.coreMax?.[1]||24)];
 $('selfhp').innerHTML=S.hp[my]+' <small>/ '+coreMax[my]+'</small>';
 $('rivalhp').innerHTML=S.hp[enemy]+' <small>/ '+coreMax[enemy]+'</small>';
 $('selfmeter').style.width=Math.min(100,100*S.hp[my]/coreMax[my])+'%';
 $('rivalmeter').style.width=Math.min(100,100*S.hp[enemy]/coreMax[enemy])+'%';
 const warning=battleWarning(),warningBox=$('battle-warning');
 if(warningBox){
  warningBox.classList.toggle('hidden',!warning);
  warningBox.dataset.kind=warning?.kind||'';
  const title=warning?.title||'',detail=warning?.text||'';
  if($('battle-warning-title').textContent!==title)$('battle-warning-title').textContent=title;
  if($('battle-warning-text').textContent!==detail)$('battle-warning-text').textContent=detail;
 }
 const mission=MISSION_BY_ID[S.missionId];
 if($('arena-label')){
  $('arena-label').textContent=S.gauntletName?'✦ '+S.gauntletName.toUpperCase():mission?'✦ '+mission.name.toUpperCase():'✦ RIFTFRONT';
  $('arena-label').classList.toggle('rift-label',!!S.gauntletRunId);
 }
 if($('arena-details'))$('arena-details').textContent=mission?
  mission.objective==='capture'?'HOLD BOTH SPRINGS · '+onSpring(0)+'/2 CONTROL · '+(S.missionProgress||0)+'/'+mission.needed+' TURNS':
  mission.objective==='defend'?'SURVIVE · ROUND '+S.round+'/'+mission.needed+' · CORE '+S.hp[0]+' HP':
  mission.objective==='hunt'? 'SLAY CHAMPION · '+(S.units.find(u=>u.id===S.championId)?.hp||0)+'/'+(S.units.find(u=>u.id===S.championId)?.max||0)+' HP':
  'BREAK ENEMY CORE · '+S.hp[1]+' HP LEFT':'BLUE MOVE · RED ATTACK · VIOLET SPELL';
 if(S.gauntletRunId&&$('arena-details'))
  $('arena-details').textContent='GAUNTLET '+S.gauntletStage+'/3 · CORE '+S.hp[0]+'/24 · '+S.gauntletDetail;
 if(mission?.encounter&&$('arena-details')){
  const event=S.encounterState;
  $('arena-details').textContent+=' · '+mission.encounter.name.toUpperCase()+
   (S.phase==='playing'?' · NEXT RD '+(event?.nextRound||mission.encounter.first):'');
 }
 $('round').textContent=S.round;$('turnlabel').textContent=S.phase==='over'?'MATCH OVER':S.phase==='waiting'?'AWAITING FRIEND':S.turn===my?'YOUR TURN':'RIVAL TURN';
 $('aeth').textContent=S.energy[my];$('capacity').textContent=' / '+Math.max(S.cap,S.energy[my]);
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
  b.className='tile'+(vy<=2?' dark':vy>=5?' lit':'')+(isRock?' rock':'')+(isHigh?' high':'')+(spring?' spring':'')+((S.hazards||[]).includes(k)?' hazard':'')+(u&&u.team!==my?' enemyunit':'')+(walk.has(k)?' showmove':'')+(targets.has(k)?' showattack':'')+(card&&!card.spell&&deploy(my,x,y)?' showdeploy':'')+(castTiles.has(k)?' showcast':'')+(u?.id===chosenUnit?' selected':'')+(inspectedTile?.vx===vx&&inspectedTile?.vy===vy?' focused':'')+(tributes.includes(u?.id)?' tribute':'');
  b.setAttribute('aria-label',u?(u.team===my?'Your ':'Enemy ')+D[u.k].name+' '+u.hp+' HP':mineCore?'Your core':rivalCore?'Rival core':'Arena tile '+(vx+1)+','+(vy+1));
  if(u){b.innerHTML='<img draggable="false" class="unitimg '+(u.team!==my?'foe ':'')+(['t','l'].includes(u.k)?'boss':'')+'" src="'+(Art.sprite?Art.sprite(u.k):Art.get(u.k))+'"><div class="hpstrip"><i style="width:'+Math.max(0,u.hp/u.max*100)+'%"></i></div><div class="num">'+u.hp+(u.shield?' ◇':'')+'</div>'+(u.team===my&&!u.attacked?'<i class="dot"></i>':'')}
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
   '<div class="portrait">'+portrait+(portraitIndices[k]===undefined?'<span class="portrait-cost" aria-hidden="true">'+q.cost+'</span>':'')+
   '<span class="portrait-type'+(q.ability?' ability-label':'')+'">'+(q.ability?'✦ '+q.ability:q.spell?'SPELL':q.tribute?'MYTHIC':'UNIT')+'</span></div>'+
   '<div class="card-foot"><div class="cardname">'+q.name+'</div>'+
   '<div class="cardstats">'+stats+'</div></div></button>'+
   '<button type="button" class="card-info" data-card-info="'+i+'" aria-label="Inspect '+q.name+' without playing it">i</button></div>';
 }).join('');
 renderLabels();
 if(window.AetherScene?.sync)window.AetherScene.sync(S,my,{unit:chosenUnit,card:chosenCard,focus:inspectedTile,tributes:tributes.slice()});
 if(S.phase==='over'){
  const reward=awardMatch();
  if($('next-mission'))$('next-mission').classList.toggle('hidden',!S.missionId||S.winner!==0);
  $('resulttitle').textContent=S.winner===-1?'RIFTFRONT DRAW':S.winner===my?'DOMINION ACHIEVED':'CORE SHATTERED';
  $('resultdesc').textContent=(S.winner===-1?'Both armies remain evenly matched.':S.winner===my?'Your army captured the Riftfront.':'Your army was defeated.')+' Round '+S.round+'.'+(mode==='ai'&&reward?
  '  ✦ +'+reward.xp+' XP · +'+reward.gold+' gold · '+reward.rewards.length+' card copies'+
  (reward.missionTitle?' · '+reward.missionTitle+(reward.storyClear?' FIRST CLEAR':'')+' · '+reward.stars+'★':'')+
  (reward.levelUp?' · LEVEL UP!':'')+
  (reward.gauntlet?' · RIFT GAUNTLET '+reward.gauntlet.stage+'/3 · '+reward.gauntlet.status.toUpperCase():'')+
  (reward.masteryRewards?.length?' · '+reward.masteryRewards.length+' MASTERY REWARD(S)':''):'');
  // Authored campaign result, grounded in this actual match and settled rewards.
  // Avoid modifying match outcomes, progression, or already-claimed rewards.
  const epilogue=$('campaign-epilogue'),tale=mission?.epilogue;
  if(epilogue)epilogue.classList.toggle('hidden',!tale||S.mode!=='ai');
  if(tale&&S.mode==='ai'){
   const cleared=S.winner===0,first=cleared&&!!reward?.storyClear;
   $('epilogue-kicker').textContent=cleared?(first?'✦ CHAPTER CLEARED · FIRST VICTORY':
    '✧ CAMPAIGN REPLAY COMPLETE'):'✦ THE CAMPAIGN CONTINUES';
   $('epilogue-speaker').textContent=tale.speaker;
   $('epilogue-narrative').textContent=cleared?tale.victory:tale.defeat;
   const approach=S.expeditionPlan?.name||'The Commander’s original approach';
   const effects=S.encounterState?.events||0;
   const plan=cleared?'✦ '+(reward?.stars||1)+'★ earned':
    'Regroup and try a different strategy';
   $('epilogue-footnote').textContent='APPROACH · '+approach+'  ·  '+
    'ROUND '+S.round+'  ·  '+effects+' RIFT EVENTS  ·  '+plan+
    (cleared&&!first?'  ·  FIRST-CLEAR REWARDS ALREADY CLAIMED':'');
  }
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
 if(window.DominionRift?.render)window.DominionRift.render();
}
function publish(){if(net&&mode==='online'&&localSeat===0){net.state({s:S,rev:revision});}}
function startQuickMatch(){
 // A fresh skirmish intentionally ends any unresolved Gauntlet; never
 // leave an apparently resumable run pointing to a different match.
 if(['active','ready'].includes(profile.gauntlet.current?.status)&&
    S?.gauntletRunId===profile.gauntlet.current.id){
  profile.gauntlet.current.status='abandoned';saveProfile();
 }
 disconnect();mode='ai';localSeat=0;connected=false;clearSelection();
 seed('ai');setArena('verdant');
 $('mode-ai').classList.add('active');$('mode-online').classList.remove('active');$('lobby').classList.add('hidden');
 message('<b>Quick Battle</b> · Fresh skirmish','Your 24-card deck is ready. Summon, position and conquer.');
 save();render();
}
function startAI(){
 disconnect();mode='ai';localSeat=0;connected=false;clearSelection();
 $('mode-ai').classList.add('active');$('mode-online').classList.remove('active');$('lobby').classList.add('hidden');
 const resumed=load();
 if(!resumed)seed('ai');
 // Do not erase shifting weather from a saved, in-progress campaign match.
 const activeHazards=resumed&&S.missionId&&S.encounterState?.events>0?
  S.hazards?.slice():null;
 setArena(S?.arenaId||'verdant');
 if(activeHazards)S.hazards=activeHazards;
 message('<b>Single Player</b> · Rune Valley','Tap a card to summon, or tap an ally to command it.');render();
}
function disconnect(){if(net){try{net.leave()}catch(e){}net=null}room='';connected=false}
function startOnline(){
 disconnect();mode='online';localSeat=0;clearSelection();seed('online');setArena('verdant');
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
  leave:()=>{connected=false;$('roomstatus').textContent='Other player disconnected. Your match is paused for reconnection.';if(host&&S.phase==='playing'){S.phase='waiting';revision++;publish()}render()},
  state:(p)=>{
   if(host||!p?.s||p.s.version!==4||p.s.mode!=='online'||!Array.isArray(p.s.units)||p.s.units.length>30)return;
   if(!Number.isInteger(p.rev)||p.rev<revision)return;
   S=p.s;revision=p.rev;clearSelection();$('roomstatus').textContent=S.phase==='playing'?'Connected! '+(S.turn===1?'Your turn.':'Waiting for host turn.'):'Waiting for the host…';render()},
  intent:(a)=>{if(!host||S.phase!=='playing'||S.turn!==1)return;if(apply(1,a)){clearSelection();revision++;publish();render()}},
  error:(e)=>{$('roomstatus').textContent='Connection issue: '+String(e).slice(0,140)},
  quality:(ms)=>{$('roomstatus').textContent='Connected · '+ms+' ms ping'}
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
$('reset').addEventListener('click',()=>{
 if(S?.gauntletRunId){
  if(confirm('Abandon this Rift Gauntlet run and begin a normal skirmish?')){
   if(profile.gauntlet.current?.id===S.gauntletRunId&&
     profile.gauntlet.current.status==='active'){
    profile.gauntlet.current.status='abandoned';saveProfile();
   }
   startQuickMatch();
  }
  return;
 }
 if(mode==='online'){if(confirm('Leave this duel and return to solo play?'))startAI()}
 else if(confirm(S.missionId?'Restart this campaign mission?':'Start a fresh solo battle?')){
  if(S.missionId)startMission(S.missionId,false,S.expeditionPlan?.kind||null);else{seed('ai');clearSelection();save();render()}
 }
});
$('again').addEventListener('click',()=>{
 if(S?.gauntletRunId){
  const status=profile.gauntlet.current;
  if(status?.id===S.gauntletRunId&&status.status==='ready'){
   continueGauntlet();return;
  }
  if(status?.id===S.gauntletRunId&&['failed','cleared'].includes(status.status)){
   startGauntlet();return;
  }
 }
 if(mode==='online')startOnline();
 else if(S.missionId)startMission(S.missionId,false,S.expeditionPlan?.kind||null);
 else {seed('ai');clearSelection();save();render()}
});
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
$('deck-slots')?.addEventListener('click',e=>{
 const btn=e.target.closest('button[data-slot]');
 if(btn)selectDeckSlot(Number(btn.dataset.slot));
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
window.addEventListener('aether-card-art-ready',()=>{
 // Replace any temporary fallback images after the illustrated atlas loads.
 // This is a display-only refresh: match state and progression are unchanged.
 if(!$('codex').classList.contains('hidden')){
  if(guideKey)inspectCard(guideKey);else guideDrawList();
 }
 if(!$('player-profile').classList.contains('hidden'))renderProfile();
 if(!$('deck-builder').classList.contains('hidden'))deckStatus();
 render();
});
window.AetherGame={get:()=>S,startAI,startQuickMatch,startOnline,startMission,startGauntlet,continueGauntlet,gauntletStatus,masteryStatus,campaign:campaignStatus,missions:CONQUEST,apply,publish,profile:profileSummary,upgradeCard,cardLevel,
 campaignCounsel,
 loadouts:()=>({active:deckSlots.active,selected:selectedSlot,
  slots:deckSlots.slots.map(slot=>slot?
   {name:slot.name,cards:slot.cards.slice()}:null),
  currentDeck:chosenDeck.slice()}),
 deckInfo:()=>({cards:chosenDeck.length,units:chosenDeck.filter(k=>!D[k].spell).length,
  spells:chosenDeck.filter(k=>!!D[k].spell).length,
  mythics:chosenDeck.filter(k=>!!D[k].tribute).length,
  averageLevel:+(chosenDeck.reduce((total,k)=>total+cardLevel(k),0)/Math.max(1,chosenDeck.length)).toFixed(1)}),
 ...(window.__qaIsolatedStorage===true&&location.pathname.endsWith('/qa-v39.html')?{
 // v4.5.2: Execute real Armory save, preview and cancel paths against
 // isolated in-memory storage, then restore the QA player's initial state.
 qaDeckVault:()=>{
  const results=[],check=(name,ok)=>results.push({name,pass:!!ok});
  const oldDeck=chosenDeck.slice(),oldDraft=draftDeck.slice(),
   oldSlots=JSON.stringify(deckSlots),oldSelected=selectedSlot;
  const keys=[DECK_STORE,LOADOUT_STORE],stored=keys.map(k=>localStorage.getItem(k));
  const gameBefore=JSON.stringify(S);
  try{
   const active=deckSlots.active,target=(active+1)%SLOT_COUNT;
   check('Old selected deck migrated into Deck I–III',checkDeck(deckSlots.slots[active]?.cards)&&
    sameDeck(deckSlots.slots[active].cards,chosenDeck));
   selectDeckSlot(target);
   check('Preview never equips a deck',deckSlots.active===active&&sameDeck(chosenDeck,oldDeck));
   draftDeck=PACKS.Fortress.slice();
   $('deck-slot-name').value='<FORTRESS&TEST>';
   const success=saveBuilder();
   check('Save creates and equips a separate valid slot',success&&deckSlots.active===target&&
    checkDeck(deckSlots.slots[target]?.cards)&&sameDeck(chosenDeck,PACKS.Fortress));
   check('Names are sanitized before rendering',deckSlots.slots[target]?.name==='FORTRESS&TEST');
   check('Legacy v20 selected deck stays synchronized',sameDeck(
    JSON.parse(localStorage.getItem(DECK_STORE)),chosenDeck));
   check('Other saved slots survive switching',sameDeck(deckSlots.slots[active]?.cards,oldDeck));
   openBuilder();selectDeckSlot(active);closeBuilder();
   check('Cancel does not switch the equipped deck',deckSlots.active===target&&
    sameDeck(chosenDeck,PACKS.Fortress));
   check('An in-progress battle is never modified',gameBefore===JSON.stringify(S));
  }catch(error){results.push({name:'Runtime error',pass:false,info:String(error)})}
  finally{
   chosenDeck=oldDeck;draftDeck=oldDraft;deckSlots=JSON.parse(oldSlots);
   selectedSlot=oldSelected;
   keys.forEach((k,i)=>{try{
    if(stored[i]===null)localStorage.removeItem(k);
    else localStorage.setItem(k,stored[i]);
   }catch(e){}});
   renderDeckSlots();deckStatus();
  }
  return{pass:results.length===8&&results.every(r=>r.pass),results};
 },
 // v4.5 staging — verify four actual spell cards using legal apply()
 // actions in memory-isolated scenario states. No player profile is touched.
 // v4.5.3 authored creature-mechanic QA. Runs against the *actual* combat
 // helpers in a memory-isolated build. Never touches normal player saves.
 // v4.5.4 four-unit isolated legality and balance boundary checks.
 qaV454Creatures:()=>{
  const checks=[],check=(name,pass,detail='')=>
   checks.push({name,pass:!!pass,detail});
  const setup=()=>{
   if(!startMission('v1',true,'rush'))throw Error('Isolated v454 mission setup failed');
   S.turn=0;S.energy[0]=10;S.hands[0]=[];S.traps=[];
   S.units=[];S.next=Math.max(S.next||1,800);
  };
  const add=(k,team,x,y)=>{
   const u=unit(k,team,x,y,true);S.units.push(u);return u;
  };
  try{
   {
    setup();
    const oracle=add('Q',0,2,5),ally=add('v',0,2,6),enemy=add('b',1,2,2);
    S.hands[0]=['I'];
    const old=S.energy[0],cast=apply(0,{op:'card',idx:0,x:2,y:6,tributes:[]});
    check('Oracle responds to a valid allied spell with exactly one bonus shield',
     cast&&ally.shield===3&&oracle.oracleRound===S.round&&S.energy[0]===old-2);
    S.hands[0]=['K'];S.energy[0]=10;
    const second=apply(0,{op:'card',idx:0,x:2,y:6,tributes:[]});
    check('Oracle cannot give a second shield on another spell in same round',
     second&&ally.shield===3);
   }
   {
    setup();
    const oracle=add('Q',0,2,5),ally=add('v',0,2,6);
    S.hands[0]=['I'];const before=S.energy[0];
    const rejected=apply(0,{op:'card',idx:0,x:6,y:2,tributes:[]});
    check('Rejected spell does not activate Oracle or spend Aeth',
     !rejected&&ally.shield===0&&!oracle.oracleRound&&S.energy[0]===before);
   }
   {
    setup();
    const oracle=add('Q',1,2,2),ally=add('v',1,2,3);
    onFriendlySpell(0);
    check('Oracle never triggers from an opponent spell',ally.shield===0&&!oracle.oracleRound);
   }
   {
    setup();
    const oracle=add('Q',0,2,5),ally=add('v',0,2,6);ally.shield=5;
    onFriendlySpell(0);
    check('Oracle respects max shield and does not produce free health',
     ally.shield===5&&!oracle.oracleRound);
   }
   {
    setup();
    const harrier=add('R',0,2,5),friend=add('v',0,3,4),enemy=add('b',1,3,5);
    enemy.max=enemy.hp=20;harrier.moved=true;
    basicStrike(harrier,enemy);
    check('Harrier refreshes movement after a real flank',!harrier.moved&&
     harrier.harrierRound===S.round);
    harrier.moved=true;basicStrike(harrier,enemy);
    check('Harrier flank movement cannot refresh twice same round',harrier.moved);
   }
   {
    setup();
    const harrier=add('R',0,2,5),enemy=add('b',1,3,5);
    harrier.moved=true;basicStrike(harrier,enemy);
    check('Harrier receives no refresh without a flanking ally',
     harrier.moved&&!harrier.harrierRound);
   }
   {
    setup();
    const warden=add('S',0,2,5),enemy=add('b',1,3,5);
    const other=add('v',1,4,5),boss=add('g',1,2,4);boss.boss=true;
    applyDamage(warden,40);
    check('Defeated Warden roots nearest nonboss enemy only',
     !S.units.some(v=>v.id===warden.id)&&enemy.rooted&&!other.rooted&&!boss.rooted);
   }
   {
    setup();
    const warden=add('S',0,2,5),enemy=add('g',1,2,4);enemy.boss=true;
    applyDamage(warden,40);
    check('Warden death cannot root boss or Core',!enemy.rooted);
   }
   {
    setup();
    const art=add('T',0,2,5);
    S.traps=[{team:1,x:3,y:5,damage:3,expires:S.round+3},
             {team:0,x:2,y:4,damage:3,expires:S.round+3}];
    onCreatureSummoned(art);
    check('Artificer removes one enemy snare and leaves friendly trap',
     S.traps.length===1&&S.traps[0].team===0&&art.shield===1);
   }
   {
    setup();
    const art=add('T',0,2,5);
    S.traps=[{team:1,x:6,y:6,damage:3,expires:S.round+3}];
    onCreatureSummoned(art);
    check('Artificer cannot disarm remote traps or gain free shield',
     S.traps.length===1&&art.shield===0);
   }
   {
    setup();
    S.traps=[{team:1,x:3,y:5,damage:9,expires:S.round+3}];
    S.hands[0]=['T'];const before=S.energy[0];
    const cast=apply(0,{op:'card',idx:0,x:3,y:5,tributes:[]});
    check('Artificer killed on its summoning tile cannot disarm afterward',
     cast&&S.energy[0]===before-3&&
      !S.units.some(v=>v.k==='T')&&S.traps.length===0);
   }
   {
    setup();
    S.traps=[{team:1,x:4,y:5,damage:3,expires:S.round+3}];
    S.hands[0]=['T'];
    const cast=apply(0,{op:'card',idx:0,x:3,y:5,tributes:[]});
    const u=S.units.find(v=>v.k==='T');
    check('Actual legal Artificer summon activates trap counterplay',
     cast&&u&&u.shield===1&&S.traps.length===0);
   }
  }catch(err){checks.push({name:'Runtime exception',pass:false,detail:String(err)})}
  finally{startQuickMatch()}
  return{pass:checks.length===14&&checks.every(v=>v.pass),checks};
 },
 qaV453Creatures:()=>{
  const checks=[],check=(name,ok,detail='')=>
   checks.push({name,pass:!!ok,detail});
  const setup=()=>{
   if(!startMission('v1',true,'rush'))throw Error('Could not start isolated mission');
   S.energy[0]=10;S.turn=0;S.hands[0]=[];
   return{ally:S.units.find(u=>u.team===0),
    other:S.units.filter(u=>u.team===0)[1],enemy:S.units.find(u=>u.team===1)};
  };
  try{
   {
    const{ally,other}=setup();
    ally.moved=true;ally.attacked=true;other.moved=false;
    S.hands[0]=['M'];const cost=S.energy[0];
    const ok=apply(0,{op:'card',idx:0,x:3,y:5,tributes:[]});
    check('Zephyr summon refreshes movement, not attacks',ok&&
      !ally.moved&&ally.attacked&&S.energy[0]===cost-3&&
      S.units.some(v=>v.k==='M'&&v.team===0));
    ally.moved=true;S.hands[0]=['M'];S.energy[0]=10;
    const second=apply(0,{op:'card',idx:0,x:1,y:5,tributes:[]});
    check('Zephyr same-team bonus cannot trigger twice per round',
      second&&ally.moved&&S.zephyrRound[0]===S.round);
   }
   {
    const {ally}=setup();
    ally.moved=true;ally.rooted=true;
    onCreatureSummoned({k:'M',team:0,x:3,y:5,id:-100});
    check('Zephyr cannot remove roots or refresh rooted movement',ally.moved&&ally.rooted);
   }
   {
    const {ally}=setup();
    ally.moved=true;S.hands[0]=['M'];
    S.traps=[{team:1,x:3,y:5,damage:9,expires:S.round+2}];
    const used=apply(0,{op:'card',idx:0,x:3,y:5,tributes:[]});
    check('A destroyed Zephyr cannot grant movement',used&&ally.moved&&
      !S.units.some(u=>u.k==='M')&&S.traps.length===0);
   }
   {
    setup();
    const [x,y]=springs[0].split(',').map(Number);
    const keeper=unit('N',0,x,y,true);
    const ally=unit('v',0,x+1,y,true);ally.shield=0;
    S.units=[keeper,ally];S.traps=[];startStatusTurn(0);
    check('Bastion gives nearest ally one shield while on spring',
      ally.shield===1&&keeper.shield===1);
    startStatusTurn(0);
    check('Bastion grants at most one shield per turn start',
      ally.shield===2); // second call emulates a new turn, not a passive aura
   }
   {
    setup();
    const keeper=unit('N',0,0,5,true);
    const ally=unit('v',0,1,5,true);
    S.units=[keeper,ally];const initial=ally.shield;
    springBastionPulse(0);
    check('Bastion off spring cannot shield',ally.shield===initial);
   }
   {
    setup();
    const [x,y]=springs[0].split(',').map(Number);
    const keeper=unit('N',0,x,y,true);keeper.shield=5;
    S.units=[keeper];springBastionPulse(0);
    check('Bastion never breaks five-shield cap',keeper.shield===5);
   }
   {
    setup();
    const [x,y]=[...high][0].split(',').map(Number);
    const duelist=unit('O',0,x,y,true);
    const enemy=unit('b',1,x+1,y,true);
    enemy.shield=3;enemy.hp=enemy.max=8;
    S.units=[duelist,enemy];
    basicStrike(duelist,enemy);
    check('Cragsunder first elevated strike pierces two shield',
      duelist.summitRound===S.round&&enemy.shield===0);
    enemy.shield=3;const before=enemy.hp,expected=Math.max(0,3-damage(duelist,enemy));
    basicStrike(duelist,enemy);
    check('Cragsunder cannot pierce a second time in the same round',
      enemy.shield===expected&&enemy.hp===before,
      'shield='+enemy.shield+' hp='+enemy.hp+' before='+before);
   }
   {
    setup();
    const hunter=unit('P',0,2,5,true);
    const enemy=unit('b',1,3,5,true);
    hunter.shield=0;enemy.shield=4;S.units=[hunter,enemy];
    const initialHit=damage(hunter,enemy);
    basicStrike(hunter,enemy);
    check('Umbral siphon transfers real opponent shield once',
      hunter.shield===1&&enemy.shield===Math.max(0,3-initialHit)&&hunter.siphonRound===S.round,
      'hunter='+hunter.shield+' foe='+enemy.shield+' round='+hunter.siphonRound);
    enemy.shield=4;basicStrike(hunter,enemy);
    check('Umbral siphon cannot trigger again in same round',
      hunter.shield===1&&enemy.shield===Math.max(0,4-initialHit),
      'hunter='+hunter.shield+' foe='+enemy.shield);
   }
   {
    setup();
    const hunter=unit('P',0,2,5,true);
    const enemy=unit('b',1,3,5,true);
    hunter.shield=5;enemy.shield=4;S.units=[hunter,enemy];
    const initialHit=damage(hunter,enemy);
    basicStrike(hunter,enemy);
    check('Umbral siphon cannot create shield above cap',
      hunter.shield===5&&enemy.shield===Math.max(0,4-initialHit)&&!hunter.siphonRound,
      'hunter='+hunter.shield+' foe='+enemy.shield+' siphon='+hunter.siphonRound);
   }
  }catch(e){checks.push({name:'Runtime exception',pass:false,detail:String(e)})}
  finally{startQuickMatch()}
  return{pass:checks.length===13&&checks.every(q=>q.pass),checks};
 },
 // Isolated real v4.6.0 progression tests; all local keys restored.
 qaV46Gauntlet:()=>{
  const checks=[],test=(name,ok,detail='')=>checks.push({name,pass:!!ok,detail});
  const before=JSON.stringify(profile),beforeState=S,beforeMode=mode,beforeSeat=localSeat,
   keys=[PROFILE_STORE,'aether-dominion-v04'],
   storage=keys.map(k=>localStorage.getItem(k));
  const settle=(win,hp)=>{
   S.phase='over';S.winner=win?0:1;S.hp[0]=hp;
   return awardMatch();
  };
  try{
   profile.gauntlet={version:1,attempts:0,clears:0,bestStage:0,firstClearRewarded:false,current:null};
   profile.claimed={};profile.last=null;profile.mastery={};profile.masteryClaims={};
   profile.gold=0;profile.xp=0;profile.level=1;profile.copies={};
   const deck=chosenDeck.slice();
   test('Gauntlet starts only with a valid 24-card deck',checkDeck(deck)&&startGauntlet());
   const one=profile.gauntlet.current;
   test('Stage one is a true solo battle and a locked run',
    one?.stage===1&&one.status==='active'&&S.gauntletStage===1&&
    S.gauntletRunId===one.id&&S.arenaId==='verdant'&&
    S.decks[0].every(k=>deck.includes(k)));
   test('Cannot skip first battle to stage two',continueGauntlet()===false&&one.stage===1);
   test('Game save retains original version four schema with run identification',
    (()=>{save();const old=S;S=null;const ok=load();return ok&&S.version===4&&
      S.gauntletRunId===one.id&&S.gauntletStage===1&&S.matchId===old.matchId})());
   profile.mastery.v=3;profile.masteryClaims.v=0;
   S.usedCards=[['v','v'],[]];
   const first=settle(true,16),initialGold=profile.gold;
   test('First stage records victory and original Core attrition exactly once',
     first?.victory&&one.status==='ready'&&one.wins===1&&one.core===16);
   test('One card used twice gains one mastery mark per match',
     profile.mastery.v===4&&profile.masteryClaims.v===1&&
     first.masteryRewards?.filter(x=>x.card==='v').length===1);
   const claimedAgain=awardMatch();
   test('Duplicate gameover render cannot award stage or gold twice',
     claimedAgain?.matchId===first.matchId&&profile.gold===initialGold&&one.wins===1);
   test('A correctly claimed win permits stage progression',
     continueGauntlet()===true&&one.stage===2&&one.status==='active'&&
     S.gauntletStage===2&&S.arenaId==='frost'&&S.hp[0]===20&&S.hp[1]===27);
   test('Stage two keeps original deck and frozen rank snapshot',
     S.rewardPool.length===24&&deck.every((k,i)=>S.rewardPool[i]===k)&&
     deck.every(k=>S.cardRanks[k]===one.ranks[k]));
   {
    const scout=S.units.find(u=>u.team===0),old={x:scout.x,y:scout.y};
    scout.x=0;scout.y=4;scout.frosted=false;terrainTurn(0);
    test('Frost Gauntlet terrain imposes its actual slowing hazard',
      scout.frosted===true&&S.arenaId==='frost');
    scout.x=old.x;scout.y=old.y;scout.frosted=false;
   }
   const second=settle(true,7);
   test('Stage two updates wounded Core and unlocks only stage three',
     second?.gauntlet?.stage===2&&one.status==='ready'&&one.core===7&&one.wins===2);
   test('Third stage starts on ruins with capped carry heal and a guarded Core',
     continueGauntlet()&&S.arenaId==='ruins'&&S.gauntletStage===3&&
     S.hp[0]===11&&S.hp[1]===30&&S.units.some(u=>u.boss&&u.team===1));
   {
    const scout=S.units.find(u=>u.team===0),old={x:scout.x,y:scout.y};
    scout.x=0;scout.y=4;scout.shield=0;
    const originalHP=scout.hp;terrainTurn(0);
    test('Crownfall Gauntlet uses real damaging arcane hazard tiles',
      scout.hp===originalHP-1&&S.arenaId==='ruins');
    scout.x=old.x;scout.y=old.y;
   }
   const third=settle(true,3);
   test('Full Gauntlet clear yields one-time first-clear rewards',
     third.gauntlet?.status==='cleared'&&third.gauntlet?.firstClear===true&&
     one.status==='cleared'&&profile.gauntlet.clears===1&&
     profile.gauntlet.firstClearRewarded===true&&third.gauntlet.bonusGold===180&&
     third.gauntlet.bonusXP===210);
   const gold=profile.gold,xp=profile.xp,copies=profile.copies.ag||0;
   awardMatch();
   test('Repeated completion never duplicates bonus gold, XP or card copies',
     gold===profile.gold&&xp===profile.xp&&copies===(profile.copies.ag||0));
   test('Cleared final match never advances into nonexistent stage four',
     continueGauntlet()===false&&one.stage===3);
   test('New run resets stage without resetting career-wide best and clears',
     startGauntlet()===true&&profile.gauntlet.current.stage===1&&
     profile.gauntlet.attempts===2&&profile.gauntlet.clears===1&&
     profile.gauntlet.bestStage===3);
   const retry=profile.gauntlet.current;
   settle(false,0);
   test('Losing a stage ends the run without a bonus or continuation',
     retry.status==='failed'&&continueGauntlet()===false&&
     profile.gauntlet.clears===1&&profile.gauntlet.firstClearRewarded);
   const newTry=startGauntlet(),newId=profile.gauntlet.current?.id;
   test('New attempt can start after a completed failed run',newTry&&newId!==retry.id);
   startQuickMatch();
   test('Switching to normal skirmish abandons active run rather than leaving orphan stages',
     profile.gauntlet.current.status==='abandoned'&&S.gauntletRunId===undefined);
  }catch(e){checks.push({name:'Unhandled QA exception',pass:false,detail:String(e.stack||e)})}
  finally{
   profile=JSON.parse(before);S=beforeState;mode=beforeMode;localSeat=beforeSeat;
   keys.forEach((k,i)=>{if(storage[i]===null)localStorage.removeItem(k);
    else localStorage.setItem(k,storage[i])});
  }
  return{pass:checks.length===20&&checks.every(c=>c.pass),checks};
 },
 // v4.5.8 final four creatures. Exercises actual unit and combat state.
 qaV458Creatures:()=>{
  const tests=[],check=(name,pass,detail='')=>tests.push({name,pass:!!pass,detail});
  const setup=()=>{
   if(!startMission('v1',true,'rush'))throw Error('Cannot start v458 isolated mission');
   S.turn=0;S.round=1;S.energy=[7,7];S.hands=[[],[]];S.units=[];
   return(k,t,x,y,options={})=>{
    const u=unit(k,t,x,y,true);Object.assign(u,options);S.units.push(u);return u;
   };
  };
  try{
   {
    const add=setup(),friend=add('v',0,2,5,{hp:2,rooted:true,burning:true}),
     other=add('v',0,6,6,{rooted:true}),lantern=add('ag',0,3,5);
    onCreatureSummoned(lantern);
    check('Lanternist clears two statuses and provides only one shield on ally',
     !friend.rooted&&!friend.burning&&friend.shield===1&&other.rooted&&lantern.shield===0);
   }
   {
    const add=setup(),enemy=add('v',1,2,5,{rooted:true,burning:true}),
     lantern=add('ag',0,3,5);
    onCreatureSummoned(lantern);
    check('Lanternist never cleanses enemy status or generates a shield on self',
      enemy.rooted&&enemy.burning&&!lantern.shield);
   }
   {
    const add=setup(),ally=add('v',0,2,5,{rooted:true,shield:5}),
     lantern=add('ag',0,3,5);
    onCreatureSummoned(lantern);
    check('Lanternist cleanses capped ally without exceeding shield cap',
      !ally.rooted&&ally.shield===5);
   }
   {
    const add=setup(),kestrel=add('ah',0,2,4),enemy=add('r',1,4,4),
     remote=add('r',1,6,6);
    kestrel.x=3;kestrel.y=4;afterMove(kestrel);
    check('Kestrel first movement weakens nearest enemy only',
      enemy.weakened===1&&!remote.weakened&&kestrel.kestrelRound===1);
   }
   {
    const add=setup(),kestrel=add('ah',0,2,4),enemy=add('r',1,4,4),
     other=add('v',1,5,4);
    kestrel.x=3;kestrel.y=4;afterMove(kestrel);
    kestrel.x=4;kestrel.y=5;afterMove(kestrel);
    check('Kestrel cannot apply another movement hex in same round',
      enemy.weakened===1&&!other.weakened);
   }
   {
    const add=setup(),kestrel=add('ah',0,2,4),boss=add('g',1,3,4,{boss:true});
    kestrel.x=2;kestrel.y=5;afterMove(kestrel);
    check('Kestrel never weakens protected champions',!boss.weakened);
   }
   {
    const add=setup(),collector=add('ai',0,2,4),
     enemy=add('g',1,3,4,{burning:true,hp:12,max:12});
    const before=S.energy[0],hit=basicStrike(collector,enemy);
    check('Hollowroot successful marked strike restores one Aeth',
      hit>=1&&S.energy[0]===before+1&&collector.collectRound===1);
   }
   {
    const add=setup(),collector=add('ai',0,2,4),
     enemy=add('g',1,3,4,{rooted:true,hp:12,max:12});
    S.energy[0]=10;basicStrike(collector,enemy);
    check('Hollowroot energy recovery cannot exceed universal cap',S.energy[0]===10);
   }
   {
    const add=setup(),collector=add('ai',0,2,4),
     first=add('g',1,3,4,{burning:true,hp:12,max:12}),
     second=add('g',1,2,5,{rooted:true,hp:12,max:12});
    S.energy[0]=5;basicStrike(collector,first);basicStrike(collector,second);
    check('Hollowroot recovers at most one energy per round',S.energy[0]===6);
   }
   {
    const add=setup(),collector=add('ai',0,2,4),
     enemy=add('v',1,3,4,{hp:12,max:12});
    S.energy[0]=5;basicStrike(collector,enemy);
    check('Hollowroot gains no Aeth from an unmarked creature',S.energy[0]===5);
   }
   {
    const add=setup(),sentinel=add('aj',0,2,4,{hp:8,max:8,burning:true,rooted:true}),
     enemy=add('v',1,3,4,{atk:2});
    const hp=sentinel.hp;basicStrike(enemy,sentinel);
    check('Rimeshard survives one strike, clears both statuses and gains one shield',
      sentinel.hp<hp&&!sentinel.burning&&!sentinel.rooted&&sentinel.shield===1);
   }
   {
    const add=setup(),sentinel=add('aj',0,2,4,{hp:8,max:8}),
     enemy=add('v',1,3,4,{atk:1});
    basicStrike(enemy,sentinel);const shield=sentinel.shield;
    basicStrike(enemy,sentinel);
    check('Rimeshard reactive shield is limited to once each round',
      shield===1&&sentinel.shield<shield&&sentinel.rimeRound===1);
   }
   {
    const add=setup(),sentinel=add('aj',0,2,4,{hp:1,max:8,shield:0}),
     enemy=add('v',1,3,4,{atk:4});
    basicStrike(enemy,sentinel);
    check('Defeated Rimeshard does not revive itself or gain reactive shield',
      !S.units.some(u=>u.id===sentinel.id)&&sentinel.shield===0);
   }
   {
    const add=setup(),sentinel=add('aj',0,2,4,{hp:8,max:8,shield:5}),
     enemy=add('v',1,3,4,{atk:2});
    basicStrike(enemy,sentinel);
    check('Rimeshard cannot gain shield over the universal cap',
      sentinel.shield<=5);
   }
   {
    setup();S.energy[0]=7;S.hands[0]=['ag'];S.units=[];
    const ally=unit('v',0,2,5,true);ally.rooted=true;
    S.units.push(ally);
    const cast=apply(0,{op:'card',idx:0,x:3,y:5,tributes:[]});
    check('Casting an actual Lanternist card triggers cleanse and uses 3 Aeth',
      cast&&!ally.rooted&&S.energy[0]===4);
   }
   {
    const add=setup(),collector=add('ai',0,2,4),
     enemy=add('v',1,3,4,{burning:true,hp:9,max:9});
    S.energy[0]=5;basicStrike(collector,enemy);
    save();S=null;const ok=load(),restored=S?.units.find(u=>u.id===collector.id);
    check('Version-4 battle save retains per-round harvest quota',
      ok&&restored?.collectRound===1&&S.energy[0]===6);
   }
  }catch(e){tests.push({name:'Unhandled regression exception',pass:false,detail:String(e.stack||e)})}
  finally{startQuickMatch()}
  return{pass:tests.length===16&&tests.every(v=>v.pass),checks:tests};
 },
 // v4.5.7: actual card application, legal target, ownership, limits & persistence.
 qaV457Spells:()=>{
  const checks=[],check=(name,pass,detail='')=>checks.push({name,pass:!!pass,detail});
  const setup=k=>{
   if(!startMission('v1',true,'rush'))throw Error('QA mission not started');
   S.turn=0;S.round=1;S.energy=[10,10];S.hands=[[k],[]];S.units=[];S.traps=[];
   return(k,t,x,y,opts={})=>{
    const u=unit(k,t,x,y,true);Object.assign(u,opts);S.units.push(u);return u;
   };
  };
  const cast=(t,x,y)=>apply(t,{op:'card',idx:0,x,y,tributes:[]});
  try{
   {
    const add=setup('ac');add('v',0,2,5);
    const first=add('v',1,3,4),second=add('r',1,4,4),
      far=add('s',1,6,4),before=S.energy[0];
    const ok=cast(0,3,4);
    check('Gravemire roots two nearby enemies without damage',
      ok&&first.rooted&&second.rooted&&!far.rooted&&first.hp===first.max&&
      second.hp===second.max&&S.energy[0]===before-3);
   }
   {
    const add=setup('ac');add('v',0,2,5);
    const boss=add('g',1,3,4,{boss:true}),other=add('v',1,4,4);
    const old=S.energy[0],ok=cast(0,3,4);
    check('Gravemire rejects champion focus, consumes no resources',
      !ok&&!boss.rooted&&!other.rooted&&S.energy[0]===old&&S.hands[0][0]==='ac');
   }
   {
    const add=setup('ac');add('v',0,2,5);
    const prior=add('v',1,3,4,{rooted:true}),other=add('v',1,4,4);
    const ok=cast(0,3,4);
    check('Gravemire never consumes its two-target limit on already-rooted units',
      ok&&prior.rooted&&other.rooted);
   }
   {
    const add=setup('ad');const donor=add('v',0,2,4,{shield:4});
    const needy=add('v',0,3,4,{shield:0}),safe=add('r',0,2,5,{shield:3});
    const ok=cast(0,2,4);
    check('Prism Relay transfers exactly two real shields to lowest-shield ally',
      ok&&donor.shield===2&&needy.shield===2&&safe.shield===3);
   }
   {
    const add=setup('ad');const donor=add('v',0,2,4,{shield:1});
    const needy=add('r',0,3,4,{shield:0}),energy=S.energy[0];
    const ok=cast(0,2,4);
    check('Prism Relay refuses donor below two shields without spending Aeth',
      !ok&&donor.shield===1&&needy.shield===0&&S.energy[0]===energy);
   }
   {
    const add=setup('ad');add('v',0,2,4,{shield:4});add('r',0,3,4,{shield:4});
    const ok=cast(0,2,4);
    check('Prism Relay refuses receiver with no two-shield capacity',
      !ok&&S.energy[0]===10);
   }
   {
    const add=setup('ad');const donor=add('v',0,2,4,{shield:4});
    const receiver=add('r',0,3,4,{shield:0,moved:true,attacked:true});
    const ok=cast(0,2,4);
    check('Prism Relay refreshes recipient movement but never its attack',
      ok&&donor.shield===2&&receiver.shield===2&&!receiver.moved&&receiver.attacked&&
      receiver.relayRound===S.round);
   }
   {
    const add=setup('ad');const donor=add('v',0,2,4,{shield:4});
    const receiver=add('r',0,3,4,{shield:0,moved:true,attacked:true,relayRound:1});
    const ok=cast(0,2,4);
    check('Prism Relay cannot refresh same recipient movement twice in a round',
      ok&&receiver.moved&&receiver.attacked&&donor.shield===2&&receiver.shield===2);
   }
   {
    const add=setup('ae');add('r',0,2,4);
    const first=add('v',1,3,4),second=add('v',1,4,4),far=add('v',1,6,6);
    const ok=cast(0,3,4);
    check('Cinder Bloom ignites two foes without immediate damage or extra flames',
      ok&&first.burning&&second.burning&&!far.burning&&first.hp===first.max&&
      second.hp===second.max);
   }
   {
    const add=setup('ae');add('r',0,2,4);
    const enemy=add('v',1,3,4,{burning:true}),other=add('v',1,4,4);
    const energy=S.energy[0],ok=cast(0,3,4);
    check('Cinder Bloom rejects already burning focus and leaves secondary untouched',
      !ok&&enemy.burning&&!other.burning&&S.energy[0]===energy);
   }
   {
    const add=setup('ae');add('v',0,2,4);
    const boss=add('g',1,3,4,{boss:true}),other=add('v',1,4,4);
    const ok=cast(0,3,4);
    check('Cinder Bloom cannot target boss or ignite indirectly from it',
      !ok&&!boss.burning&&!other.burning);
   }
   {
    const add=setup('af');
    const target=add('v',0,2,4,{hp:2,max:5});
    const ally=add('v',0,3,4,{hp:3,max:5});
    const third=add('r',0,2,5,{hp:3,max:4});
    const enemy=add('r',1,4,4);
    const ok=cast(0,2,4);
    check('Tidal Reprieve heals two on focus and one each on two wounded allies',
      ok&&target.hp===4&&ally.hp===4&&third.hp===4&&enemy.hp===enemy.max);
   }
   {
    const add=setup('af');add('v',0,2,4,{hp:5,max:5});add('v',0,3,4,{hp:2,max:5});
    const energy=S.energy[0],ok=cast(0,2,4);
    check('Tidal Reprieve refuses fully healed focus with no Aeth cost',
      !ok&&S.energy[0]===energy);
   }
   {
    const add=setup('af');const ally=add('v',0,2,4,{hp:1,max:5,moved:true,attacked:true});
    const ok=cast(0,2,4);
    check('Tidal Reprieve never grants extra movement or attacks',
      ok&&ally.hp===3&&ally.moved&&ally.attacked);
   }
   {
    const add=setup('ac');const ally=add('v',0,2,4),enemy=add('v',1,3,4);
    S.turn=1;S.hands[1]=['ac'];S.energy[1]=10;const ok=cast(1,2,4);
    check('Opponent uses the same zone-control rules without team inversion',
      ok&&ally.rooted&&!enemy.rooted);
   }
   {
    const add=setup('ae');add('r',0,2,4);
    const target=add('v',1,3,4);
    const ok=cast(0,3,4);save();S=null;const loaded=load();
    const restored=S?.units.find(u=>u.id===target.id);
    check('Version-four match save and reload preserve new burning state',
      ok&&loaded&&S?.version===4&&restored?.burning===true);
   }
  }catch(e){checks.push({name:'Unhandled test exception',pass:false,detail:String(e.stack||e)})}
  finally{startQuickMatch()}
  return{pass:checks.length===16&&checks.every(v=>v.pass),checks};
 },
 // v4.5.5 exact battle-law checks on real engine, isolated from public saves.
 qaV456Creatures:()=>{
  const checks=[],check=(name,pass,detail='')=>checks.push({name,pass:!!pass,detail});
  const setup=()=>{
   if(!startMission('v1',true,'rush'))throw Error('QA mission not started');
   S.turn=0;S.energy[0]=6;S.energy[1]=6;S.hands=[[],[]];
   S.traps=[];S.units=[];S.next=800;S.round=1;
  };
  const add=(k,t,x,y)=>{
   const u=unit(k,t,x,y,true);S.units.push(u);return u;
  };
  try{
   {
    setup();const bell=add('Y',0,2,5),enemy=add('r',1,3,5),other=add('v',1,5,5);
    onCreatureSummoned(bell);
    check('Bellkeeper weakens closest enemy by exactly one',enemy.weakened===1&&!other.weakened);
   }
   {
    setup();const bell=add('Y',0,2,5),boss=add('g',1,3,5),enemy=add('v',1,4,5);
    boss.boss=true;onCreatureSummoned(bell);
    check('Bellkeeper ignores champion and chooses eligible creature',!boss.weakened&&enemy.weakened===1);
   }
   {
    setup();const bell=add('Y',0,2,5),enemy=add('r',1,6,2);
    onCreatureSummoned(bell);
    check('Bellkeeper cannot curse out-of-range enemies',!enemy.weakened);
   }
   {
    setup();const bell=add('Y',0,2,5),enemy=add('r',1,3,5);
    enemy.weakened=2;onCreatureSummoned(bell);
    check('Bellkeeper never weakens a stronger existing hex',enemy.weakened===2);
   }
   {
    setup();const bell=add('Y',1,2,3),enemy=add('v',0,2,4);
    onCreatureSummoned(bell);
    check('Enemy Bellkeeper uses identical team-aware debuff',enemy.weakened===1);
   }
   {
    setup();const hunter=add('Z',0,2,5),burn=add('g',1,3,5),spread=add('v',1,4,5);
    burn.burning=true;burn.hp=burn.max=20;
    basicStrike(hunter,burn);
    check('Prowler spreads ignition to one second enemy after burning-target hit',
     spread.burning&&hunter.prowlerRound===S.round);
    const second=add('v',1,3,4);
    second.burning=false;basicStrike(hunter,burn);
    check('Prowler only propagates once per round',!second.burning);
   }
   {
    setup();const hunter=add('Z',0,2,5),enemy=add('g',1,3,5),other=add('v',1,4,5);
    enemy.hp=enemy.max=20;basicStrike(hunter,enemy);
    check('Prowler requires burning target to ignite a second enemy',!other.burning);
   }
   {
    setup();const hunter=add('Z',0,3,1),enemy=add('v',1,2,1);
    hunter.prowlerRound=0;
    basicStrike(hunter,core(1));
    check('Prowler never spreads burn from a Core attack',!enemy.burning&&!hunter.prowlerRound);
   }
   {
    setup();const dev=add('aa',0,2,5);dev.hp=3;dev.max=7;
    onSacrifice(0);
    check('Devourer heals by exactly two on voluntary ally sacrifice',
      dev.hp===5&&dev.devourRound===S.round);
    onSacrifice(0);
    check('Devourer cannot heal twice within the same round',dev.hp===5);
   }
   {
    setup();const dev=add('aa',0,2,5),ally=add('v',0,3,5);
    dev.hp=2;applyDamage(ally,999);
    check('Normal nearby battle death never heals Devourer',dev.hp===2);
   }
   {
    setup();const dev=add('aa',0,2,5);dev.hp=6;dev.max=7;onSacrifice(0);
    check('Devourer sacrifice healing never exceeds printed health',dev.hp===7);
   }
   {
    setup();const dev=add('aa',0,2,5),sac=add('v',0,3,5);
    dev.hp=3;S.energy[0]=10;S.hands[0]=['W'];
    const cast=apply(0,{op:'card',idx:0,x:sac.x,y:sac.y,tributes:[]});
    check('Real Ember Covenant sacrifice activates Devourer passive',
     cast&&dev.hp===5&&!S.units.some(v=>v.id===sac.id));
   }
   {
    setup();const herald=add('ab',0,1,4);
    S.energy[0]=4;const moved=apply(0,{op:'move',id:herald.id,x:1,y:3});
    check('Moving Herald onto spring gains 1 shield and exactly 1 Aeth',
      moved&&herald.shield===1&&S.energy[0]===5&&herald.heraldRound===S.round);
    herald.x=1;herald.y=4;afterMove(herald);
    herald.x=1;herald.y=3;afterMove(herald);
    check('Herald cannot exploit repeated movement onto spring same round',
      herald.shield===1&&S.energy[0]===5);
   }
   {
    setup();const herald=add('ab',0,1,4);
    S.traps=[{team:1,x:1,y:3,damage:99,expires:S.round+4}];
    S.energy[0]=5;const moved=apply(0,{op:'move',id:herald.id,x:1,y:3});
    check('A lethal trap resolves before Herald gains spring reward',
      moved&&!S.units.some(v=>v.id===herald.id)&&S.energy[0]===5);
   }
   {
    setup();const herald=add('ab',0,1,3);S.energy[0]=10;
    onCreatureSummoned(herald);
    check('Summoning Herald directly on spring never grants movement reward',
      herald.shield===0&&S.energy[0]===10);
   }
   {
    setup();S.energy[0]=6;S.hands[0]=['Y'];
    add('v',1,3,5);
    const cast=apply(0,{op:'card',idx:0,x:2,y:5,tributes:[]});
    check('Legal Bellkeeper card summon activates same combat rule',
      cast&&S.units.find(v=>v.k==='v')?.weakened===1&&S.energy[0]===3);
   }
  }catch(err){checks.push({name:'Runtime exception',pass:false,detail:String(err)})}
  finally{startQuickMatch()}
  return{pass:checks.length===19&&checks.every(x=>x.pass),checks};
 },
 qaV455Spells:()=>{
  const tests=[],check=(name,ok,info='')=>tests.push({name,pass:!!ok,info});
  const setup=k=>{
   if(!startMission('v1',true,'rush'))throw Error('Isolated v455 setup failed');
   S.turn=0;S.energy[0]=10;S.hands[0]=[k];S.traps=[];
   const [ally,wing]=S.units.filter(u=>u.team===0),
     [enemy,guard]=S.units.filter(u=>u.team===1);
   ally.x=2;ally.y=4;wing.x=4;wing.y=5;
   enemy.x=3;enemy.y=2;guard.x=5;guard.y=2;
   return{ally,wing,enemy,guard};
  };
  try{
   {
    const {enemy}=setup('U');
    enemy.shield=3;const hp=enemy.hp,before=S.energy[0];
    const cast=apply(0,{op:'card',idx:0,x:3,y:2,tributes:[]});
    check('Mirror Breach strips two shields then deals one shield-first hit',
      cast&&enemy.shield===0&&enemy.hp===hp&&S.energy[0]===before-2);
   }
   {
    const {enemy}=setup('U');enemy.shield=0;
    const before=S.energy[0],cast=apply(0,{op:'card',idx:0,x:3,y:2,tributes:[]});
    check('Breach rejects unshielded target without consuming card/Aeth',
      !cast&&S.energy[0]===before&&S.hands[0][0]==='U');
   }
   {
    const {ally}=setup('V');ally.moved=true;ally.attacked=true;
    const before=S.energy[0],cast=apply(0,{op:'card',idx:0,x:3,y:4,tributes:[]});
    check('Gale Step shifts exactly one tile and preserves spent actions',
      cast&&ally.x===3&&ally.y===4&&ally.moved&&ally.attacked&&S.energy[0]===before-2);
   }
   {
    const {ally,wing}=setup('V');
    wing.x=4;wing.y=4; // Both could land at (3,4): that is ambiguous.
    const energy=S.energy[0];
    const cast=apply(0,{op:'card',idx:0,x:3,y:4,tributes:[]});
    check('Gale refuses ambiguous tiles with multiple eligible allies',
      !cast&&ally.x===2&&wing.x===4&&S.energy[0]===energy);
   }
   {
    const {ally}=setup('V');ally.rooted=true;
    const before=S.energy[0],cast=apply(0,{op:'card',idx:0,x:3,y:4,tributes:[]});
    check('Gale Step cannot bypass roots or spend energy illegally',
      !cast&&ally.x===2&&ally.y===4&&S.energy[0]===before);
   }
   {
    const {ally}=setup('V');
    S.traps=[{team:1,x:3,y:4,damage:99,expires:S.round+3}];
    const cast=apply(0,{op:'card',idx:0,x:3,y:4,tributes:[]});
    check('Gale landing triggers hostile snare and true defeat',
      cast&&!S.units.some(v=>v.id===ally.id)&&S.traps.length===0);
   }
   {
    const {ally,wing}=setup('W');wing.x=3;wing.y=5;wing.shield=0;
    const third=unit('v',0,1,4,true);third.shield=0;S.units.push(third);
    const before=S.energy[0],cast=apply(0,{op:'card',idx:0,x:2,y:4,tributes:[]});
    check('Ember Covenant sacrifices one real ally and wards two survivors',
      cast&&!S.units.some(v=>v.id===ally.id)&&wing.shield>=2&&third.shield>=2&&
      wing.rallied===1&&third.rallied===1&&S.energy[0]===before-3);
   }
   {
    const {ally,wing}=setup('W');wing.x=6;wing.y=6;
    const before=S.energy[0],cast=apply(0,{op:'card',idx:0,x:2,y:4,tributes:[]});
    check('Covenant rejects isolated sacrifice without altering battlefield',
      !cast&&S.units.some(v=>v.id===ally.id)&&S.energy[0]===before);
   }
   {
    const {enemy}=setup('W');
    const before=S.energy[0],cast=apply(0,{op:'card',idx:0,x:enemy.x,y:enemy.y,tributes:[]});
    check('Covenant cannot sacrifice enemy units',!cast&&S.energy[0]===before);
   }
   {
    const {ally,wing,enemy}=setup('W');
    ally.x=2;ally.y=4;wing.x=2;wing.y=5;enemy.x=3;enemy.y=4;
    ally.k='S';ally.hp=2;enemy.rooted=false;
    const cast=apply(0,{op:'card',idx:0,x:2,y:4,tributes:[]});
    check('Voluntary Covenant sacrifice does not trigger Gravebloom defeat roots',
      cast&&!enemy.rooted&&!S.units.some(v=>v.id===ally.id));
   }
   {
    const {enemy,guard}=setup('X');enemy.rooted=true;enemy.shield=0;
    enemy.hp=enemy.max=12;guard.shield=0;guard.hp=guard.max=12;guard.x=4;guard.y=2;
    const energy=S.energy[0],cast=apply(0,{op:'card',idx:0,x:3,y:2,tributes:[]});
    check('Crescent Refrain hits rooted foe and nearest secondary foe',
      cast&&enemy.hp===10&&guard.hp===11&&S.energy[0]===energy-3);
   }
   {
    const {enemy}=setup('X');enemy.rooted=false;enemy.burning=false;
    const energy=S.energy[0],cast=apply(0,{op:'card',idx:0,x:enemy.x,y:enemy.y,tributes:[]});
    check('Refrain requires real prior status and rejects unsupported casts',
      !cast&&S.energy[0]===energy&&S.hands[0][0]==='X');
   }
   {
    const {enemy,guard}=setup('X');enemy.burning=true;enemy.shield=0;
    enemy.hp=enemy.max=12;guard.x=6;guard.y=5;
    const cast=apply(0,{op:'card',idx:0,x:enemy.x,y:enemy.y,tributes:[]});
    check('Refrain with no secondary enemy deals only primary damage',
      cast&&enemy.hp===10&&guard.hp===guard.max);
   }
   {
    const {ally,enemy}=setup('U');ally.shield=3;enemy.shield=0;
    S.turn=1;S.hands[1]=['U'];S.energy[1]=10;enemy.x=3;enemy.y=2;
    const cast=apply(1,{op:'card',idx:0,x:2,y:4,tributes:[]});
    check('Opposing team uses same shield-breaking logic',
      cast&&ally.shield===0&&S.energy[1]===8);
   }
   {
    const {ally}=setup('V');ally.moved=true;ally.attacked=true;
    const cast=apply(0,{op:'card',idx:0,x:3,y:4,tributes:[]});
    save();const snapshot=localStorage.getItem('aether-dominion-v04');
    S=null;const restored=load();const copy=S?.units.find(u=>u.id===ally.id);
    check('Version-4 saved match restores Gale relocation and action flags',
      cast&&!!snapshot&&restored&&S.version===4&&copy?.x===3&&copy?.y===4&&
      copy?.moved&&copy?.attacked);
   }
  }catch(err){tests.push({name:'Runtime exception',pass:false,info:String(err)})}
  finally{startQuickMatch()}
  return{pass:tests.length===15&&tests.every(t=>t.pass),tests};
 },
 qaV45Spells:()=>{
  const results=[],check=(name,pass,info='')=>results.push({name,pass:!!pass,info});
  const setup=(card)=>{
   if(!startMission('v1',true,'rush'))throw Error('QA mission setup failed');
   S.hands[0]=[card];S.energy[0]=10;S.turn=0;
   const [ally,wing]=S.units.filter(u=>u.team===0);
   const [enemy,guard]=S.units.filter(u=>u.team===1);
   ally.x=2;ally.y=4;wing.x=4;wing.y=5;
   enemy.x=3;enemy.y=2;guard.x=5;guard.y=2;
   return{ally,wing,enemy,guard};
  };
  try{
   {
    const {ally,enemy,guard}=setup('H');
    enemy.x=1;enemy.y=3;guard.x=3;guard.y=3;
    const hp=[enemy.hp+(enemy.shield||0),guard.hp+(guard.shield||0),ally.hp],start=S.energy[0];
    const cast=apply(0,{op:'card',idx:0,x:2,y:2,tributes:[]});
    check('Starfall Lattice damages two diagonal enemies, not the ally',
     cast&&enemy.hp+(enemy.shield||0)===hp[0]-2&&
     guard.hp+(guard.shield||0)===hp[1]-2&&ally.hp===hp[2]&&S.energy[0]===start-4);
   }
   {
    const {ally,enemy}=setup('I');
    enemy.x=3;enemy.y=4;enemy.moved=false;enemy.attacked=false;
    const start=S.energy[0],oldHp=enemy.hp;
    const cast=apply(0,{op:'card',idx:0,x:2,y:4,tributes:[]});
    S.turn=1;
    const attack=apply(1,{op:'attack',id:enemy.id,x:2,y:4});
    check('Ashen Reprisal shields and responds exactly once to a legal basic strike',
     cast&&attack&&ally.reprisal===0&&enemy.hp===oldHp-1&&S.energy[0]===start-2);
   }
   {
    const {ally,enemy}=setup('J');
    ally.x=3;ally.y=4;enemy.x=3;enemy.y=2;
    const oldHp=enemy.hp,start=S.energy[0];
    const cast=apply(0,{op:'card',idx:0,x:3,y:2,tributes:[]});
    check('Undertow deals damage and moves target only to a legal open tile',
     cast&&enemy.x===3&&enemy.y===3&&enemy.hp===oldHp-1&&S.energy[0]===start-3);
   }
   {
    const {ally,enemy}=setup('J');
    ally.x=2;ally.y=4;enemy.x=2;enemy.y=2;
    const initial=S.energy[0],before={x:enemy.x,y:enemy.y,hp:enemy.hp};
    const cast=apply(0,{op:'card',idx:0,x:2,y:2,tributes:[]});
    check('Undertow refuses to cross a rock and spends no energy',!cast&&
      enemy.x===before.x&&enemy.y===before.y&&enemy.hp===before.hp&&S.energy[0]===initial);
   }
   {
    const {ally,enemy}=setup('K');
    enemy.x=3;enemy.y=4;enemy.shield=4;
    const hp=enemy.hp,energy=S.energy[0];
    const cast=apply(0,{op:'card',idx:0,x:2,y:4,tributes:[]});
    const hit=apply(0,{op:'attack',id:ally.id,x:3,y:4});
    check('Dawn Edict buffs one attack, strips at most three shield and consumes charge',
      cast&&hit&&enemy.shield===0&&enemy.hp===hp-2&&!ally.edict&&S.energy[0]===energy-3);
   }
   {
    const {ally,enemy}=setup('I');
    const before=S.energy[0];
    const illegal=apply(0,{op:'card',idx:0,x:enemy.x,y:enemy.y,tributes:[]});
    check('Team ownership enforced; invalid defensive target never pays Aeth',
      !illegal&&S.energy[0]===before&&S.hands[0][0]==='I');
   }
   {
    const {ally,enemy}=setup('I');
    ally.shield=5;
    const cast=apply(0,{op:'card',idx:0,x:2,y:4,tributes:[]});
    check('Ashen Reprisal respects the five-shield cap',cast&&ally.shield===5);
   }
   {
    const {ally,enemy}=setup('I');
    enemy.x=3;enemy.y=4;enemy.atk=12;enemy.moved=false;enemy.attacked=false;
    ally.hp=1;ally.shield=0;
    const initial=enemy.hp;
    const cast=apply(0,{op:'card',idx:0,x:ally.x,y:ally.y,tributes:[]});
    S.turn=1;
    const hit=apply(1,{op:'attack',id:enemy.id,x:ally.x,y:ally.y});
    check('Defeated Reprisal bearer never retaliates from beyond death',
     cast&&hit&&!S.units.some(u=>u.id===ally.id)&&enemy.hp===initial);
   }
   {
    const {ally}=setup('I');
    const cast=apply(0,{op:'card',idx:0,x:ally.x,y:ally.y,tributes:[]});
    S.round++;startStatusTurn(0);
    check('Reprisal expires by the next allied turn',cast&&!ally.reprisal);
   }
   {
    const {ally}=setup('K');
    const cast=apply(0,{op:'card',idx:0,x:ally.x,y:ally.y,tributes:[]});
    S.round++;startStatusTurn(0);
    check('Dawn Edict does not persist beyond recipient next turn',cast&&!ally.edict);
   }
   {
    const mission=startMission('t1',true,'rush');
    const boss=S.units.find(u=>u.id===S.championId);
    S.turn=0;S.energy[0]=10;S.hands[0]=['J'];
    const ally=S.units.find(u=>u.team===0);
    if(ally&&boss){ally.x=boss.x;ally.y=Math.min(7,boss.y+2)}
    const before=boss?{x:boss.x,y:boss.y,hp:boss.hp}:null;
    const energy=S.energy[0];
    const cast=boss&&apply(0,{op:'card',idx:0,x:boss.x,y:boss.y,tributes:[]});
    check('Undertow cannot displace a champion or consume a failed card',
     mission&&boss&&!cast&&S.energy[0]===energy&&
      boss.x===before.x&&boss.y===before.y&&boss.hp===before.hp&&S.hands[0][0]==='J');
   }
   {
    const {ally}=setup('I');
    const cast=apply(0,{op:'card',idx:0,x:ally.x,y:ally.y,tributes:[]});
    save();const expected=S.units.find(u=>u.id===ally.id)?.reprisal;
    const serialized=localStorage.getItem('aether-dominion-v04');
    S=null;const restored=load();
    check('Legacy version-four save restores new ward state without a schema migration',
     cast&&!!serialized&&restored&&expected===1&&
      S.units.find(u=>u.id===ally.id)?.reprisal===1&&S.version===4);
   }
  }catch(err){results.push({name:'Runtime error',pass:false,info:String(err)})}
  finally{startQuickMatch()}
  return{pass:results.length===12&&results.every(r=>r.pass),results};
 },
 // v4.4.4: deterministic, self-contained tactical playtest, restricted to
 // save-isolated QA. Both choices for a mission use the SAME seeded RNG and
 // actual apply()/aiTurn() pipeline. This is a heuristic bot, not a human.
 qaPreviewWarning:(id='f1',kind='event')=>{
  const m=MISSION_BY_ID[id];
  if(!m||!startMission(id,true))return{pass:false,reason:'mission setup'};
  S.turn=0;
  if(kind==='boss'&&m.bossKit){
   const boss=S.units.find(u=>u.id===S.championId);
   if(!boss)return{pass:false,reason:'boss missing'};
   boss.hp=Math.floor(boss.max*.75);
  }else S.round=m.encounter.first-1;
  const warning=battleWarning();
  render();
  return{pass:!!warning,id,kind,warning};
 },
 qaWarnings:()=>{
  const result=[];
  for(const m of CONQUEST.all){
   if(!startMission(m.id,true))continue;
   S.round=m.encounter.first-1;S.turn=0;
   const w=battleWarning();
   result.push({id:m.id,kind:m.encounter.type,pass:!!w&&
    w.title.includes(m.encounter.name.toUpperCase())&&!!w.text,
    title:w?.title});
  }
  for(const m of CONQUEST.all.filter(z=>z.bossKit)){
   if(!startMission(m.id,true))continue;
   S.turn=0;const boss=S.units.find(u=>u.id===S.championId);
   boss.hp=Math.floor(boss.max*.76);
   const w=battleWarning();
   result.push({id:m.id,kind:'boss',pass:!!w&&w.kind==='boss'&&
    w.title.includes('PHASE 1'),title:w?.title});
  }
  startQuickMatch();
  const noQuick=!battleWarning();
  return{pass:result.length===22&&result.every(z=>z.pass)&&noQuick,
   checked:result.length,results:result,noQuick};
 },
 // v4.4.5: prove the actual legal-action pipeline, including spell
 // damage, one-tribute mythic and bounded cleanse. QA route only.
 qaTacticalProbe:()=>{
  const findings=[];
  if(!startMission('v1',true,'rush'))return{pass:false,error:'mission start'};
  S.hands[0]=['a','t'];S.energy[0]=10;S.turn=0;
  const ally=S.units.find(u=>u.team===0);
  const sacrifice=S.units.filter(u=>u.team===0&&u.id!==ally.id)[0];
  const enemy=S.units.find(u=>u.team===1&&u.x===2&&u.y===1);
  ally.x=2;ally.y=4;
  const beforeHp=enemy?.hp||0;
  const spell=!!enemy&&apply(0,{op:'card',idx:0,x:enemy.x,y:enemy.y,tributes:[]});
  findings.push({name:'Legal targeted spell reduces enemy HP and pays Aeth',
   pass:spell&&enemy.hp<beforeHp&&S.energy[0]===8});
  const mythicIndex=S.hands[0].indexOf('t'),before=S.units.filter(u=>u.team===0).length;
  const mythic=mythicIndex>=0&&!!sacrifice&&apply(0,
   {op:'card',idx:mythicIndex,x:3,y:5,tributes:[sacrifice.id]});
  findings.push({name:'Real 1-tribute mythic summon costs 7 and removes one ally',
   pass:mythic&&S.energy[0]===1&&
    S.units.some(u=>u.team===0&&u.k==='t'&&u.x===3&&u.y===5)&&
    !S.units.some(u=>u.id===sacrifice.id)&&
    S.units.filter(u=>u.team===0).length===before});
  startMission('v1',true,'rush');S.hands[0]=['x'];S.energy[0]=10;
  const v=S.units.find(u=>u.team===0);v.rooted=true;v.burning=true;v.shield=4;
  const cleanse=apply(0,{op:'card',idx:0,x:v.x,y:v.y,tributes:[]});
  findings.push({name:'Purifying Rain removes debuffs without violating max shield',
   pass:cleanse&&!v.rooted&&!v.burning&&v.shield===MAX_SHIELD});
  // Rival AI must use an empty yet legal centre to splash two units.
  startMission('v1',true,'rush');
  const duo=S.units.filter(u=>u.team===0),rivals=S.units.filter(u=>u.team===1);
  duo[0].x=3;duo[0].y=3;duo[1].x=3;duo[1].y=5;
  rivals[0].x=3;rivals[0].y=2;
  S.hands[1]=['m'];S.energy[1]=10;S.turn=1;
  const firstHP=duo.map(u=>u.hp);
  aiTurn();
  const aiCast=(S.usedCards?.[1]||[]).includes('m');
  const bothDamaged=duo.every((u,i)=>u.hp<firstHP[i]||
   !S.units.some(v=>v.id===u.id));
  findings.push({name:'Enemy AI hits two units through empty legal area centre',
   pass:aiCast&&bothDamaged});
  startQuickMatch();
  return{pass:findings.length===4&&findings.every(f=>f.pass),findings};
 },
 qaBalance:(samples=2,missionIds=null,options=null)=>{
  const originalRandom=Math.random,originalDeck=chosenDeck;
  const reports=[],errors=[];
  const trials=Math.max(1,Math.min(12,Math.floor(samples)||2));
  const scenarios=Array.isArray(missionIds)&&missionIds.length?
   CONQUEST.all.filter(m=>missionIds.includes(m.id)):CONQUEST.all;
  const useLegacyWaves=options?.legacyWaves===true;
  const testRank=Number.isInteger(options?.testRank)?Math.max(1,Math.min(8,options.testRank)):1;
  const testOnly=window.__qaIsolatedStorage===true&&location.pathname.endsWith('/qa-v39.html');
  if(!testOnly)return{pass:false,errors:['Requires memory-isolated QA page'],reports:[]};
  if(options?.testDeck!==undefined){
   if(!checkDeck(options.testDeck))return{pass:false,errors:['Invalid 24-card QA test deck'],reports:[]};
   chosenDeck=options.testDeck.slice();
  }
  const rng=(seed)=>{
   let x=(seed>>>0)||1;
   Math.random=()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return(x>>>0)/4294967296};
  };
  const scoreTarget=(u,v,mission)=>{
   const coreHit=!!v.core,lethal=coreHit?S.hp[1]<=u.atk:v.hp-v.shield<=u.atk;
   let sc=(lethal?12:0)+(coreHit?mission.objective==='assault'?16:1:Math.max(0,6-v.hp)*.65);
   if(mission.objective==='hunt'&&v.id===S.championId)sc+=18;
   if(coreHit&&mission.objective!=='assault')return -Infinity;
   if(mission.objective==='capture'&&!coreHit&&springs.includes(K(v.x,v.y)))sc+=10;
   if(!coreHit)sc+=Math.min(4,v.atk)*.55;
   return sc;
  };
  const objectives=(mission,u)=>{
   if(mission.objective==='capture'){
    const free=springs.map(k=>{const [x,y]=k.split(',').map(Number);return{x,y}})
     .filter(p=>entity(p.x,p.y)?.team!==0);
    return free.length?free:springs.map(k=>{const [x,y]=k.split(',').map(Number);return{x,y}});
   }
   if(mission.objective==='defend')return [...S.units.filter(v=>v.team===1),core(0)];
   if(mission.objective==='hunt'){
    const boss=S.units.find(v=>v.id===S.championId);
    return boss?[boss]:[core(1)];
   }
   return[core(1)];
  };
  const moveScore=(u,p,mission)=>{
   const targets=objectives(mission,u);
   const near=targets.length?Math.min(...targets.map(v=>d(p,v))):9;
   const onSpring=springs.includes(K(p.x,p.y));
   const springWorth=mission.objective==='capture'?11:2.2;
   const nearbyEnemies=S.units.filter(v=>v.team===1);
   const shots=nearbyEnemies.some(v=>d(p,v)<=u.range&&los(p,v))?3.3:0;
   const danger=nearbyEnemies.filter(v=>d(p,v)<=v.range&&los(v,p))
    .reduce((n,v)=>n+Math.min(4,v.atk),0);
   const hazard=(S.hazards||[]).includes(K(p.x,p.y))?6:0;
   const ground=high.has(K(p.x,p.y))&&u.range>1?1.4:0;
   return -near*2+shots+ground+(onSpring?springWorth:0)-hazard-danger*.23;
  };
 // Evaluate spell choices using only information visible to a player.
 // Every proposed action passes through validSpellSpot() and apply(),
 // preserving real card costs, effects and target restrictions.
 const scoreSpell=(q,x,y,mission)=>{
  if(!validSpellSpot(q,0,x,y))return -Infinity;
  const type=q.spell,unit=entity(x,y),self=S.units.filter(u=>u.team===0);
  const foes=S.units.filter(u=>u.team===1),pt=P(x,y);
  const power=Math.max(1,powerFor(q,0));
  const nearby=foes.filter(v=>d(v,pt)<=1);
  const coreHit=x===3&&y===0;
  let value=-Infinity;
  if(type==='bolt'){
   value=unit&&unit.team===1?
    Math.min(power,unit.hp+unit.shield)*1.65+
     (power>=unit.hp+unit.shield?5:0)+(unit.id===S.championId?7:0):
    coreHit?power*1.6+(mission.objective==='assault'?10:0):-Infinity;
  }else if(type==='diagonal'){
   value=foes.filter(v=>Math.abs(v.x-x)===1&&Math.abs(v.y-y)===1)
    .reduce((sum,v)=>sum+Math.min(power,v.hp+v.shield)*1.5+
     (v.id===S.championId?4:0),0);
   if(Math.abs(core(1).x-x)===1&&Math.abs(core(1).y-y)===1)
    value+=power*(mission.objective==='assault'?2:1);
  }else if(type==='cross'){
   value=nearby.reduce((sum,v)=>sum+Math.min(power,v.hp+v.shield)*1.4+
    (v.id===S.championId?6:0),0);
   if(d(pt,core(1))<=1)value+=power*(mission.objective==='assault'?2.5:1);
  }else if(type==='ignite'||type==='frost'){
   value=unit&&unit.team===1?Math.min(power,unit.hp+unit.shield)*1.5+
    (type==='frost'&&!unit.rooted?2.3:0)+
    (type==='ignite'&&!unit.burning?1.4:0)+
    (unit.id===S.championId?5:0):0;
   if(type==='frost'&&unit?.rooted)value-=5;
  }else if(type==='silence'){
   value=unit&&unit.team===1?Math.min(3,unit.shield||0)*1.5+
    (unit.rallied?2:0)+(unit.id===S.championId?3:0):0;
  }else if(type==='undertow'){
   value=unit&&unit.team===1&&undertowLanding(unit,0)?
    Math.min(power,unit.hp+unit.shield)*1.5+
    (unit.range>=2?3:1)+(high.has(K(unit.x,unit.y))?1.5:0):0;
  }else if(type==='breach'){
   value=unit&&unit.team===1&&unit.shield>0?
    Math.min(2,unit.shield)*1.75+Math.min(power,unit.hp+Math.max(0,unit.shield-2))*1.2+
    (unit.atk||0)*.25:0;
  }else if(type==='gale'){
   const mover=galePassenger(0,x,y);
   value=mover?(springs.includes(K(x,y))&&!springs.includes(K(mover.x,mover.y))?6.1:0)+
    ((S.hazards||[]).includes(K(mover.x,mover.y))?3.6:0):0;
  }else if(type==='covenant'){
   const friendCount=self.filter(v=>v.id!==unit?.id&&unit&&d(v,unit)<=2).length;
   value=unit&&unit.team===0&&unit.hp<=3&&friendCount>0?
    Math.min(friendCount,2)*3.1+(unit.hp<=2?2.1:0):0;
  }else if(type==='refrain'){
   const chained=foes.some(v=>unit&&v.id!==unit.id&&d(v,unit)<=2);
   value=unit&&unit.team===1&&(unit.rooted||unit.burning)?
    Math.min(power,unit.hp+unit.shield)*1.75+(chained?3:0):0;
  }else if(type==='reprisal'){
   value=unit&&unit.team===0&&!unit.reprisal?
    Math.min(2,MAX_SHIELD-(unit.shield||0))*1.5+
    (foes.some(v=>d(v,unit)<=v.range+1)?3:0):0;
  }else if(type==='edict'){
   value=unit&&unit.team===0&&!unit.attacked&&!unit.edict?
    (unit.atk||0)*.9+
    (foes.some(v=>d(v,unit)<=unit.range+unit.move)?3:0):0;
  }else if(type==='heal'){
   const gap=unit?Math.max(0,unit.max-unit.hp):0;
   value=Math.min(3,gap)*2.1+(unit?.attacked?1.2:0)+
    (unit?.id===S.championId?1:0);
   if(gap===0)value-=5;
  }else if(type==='shield'){
   value=unit?Math.min(4,MAX_SHIELD-unit.shield)*1.2+
    Math.min(3,unit.atk)*.5+
    (mission.objective==='capture'&&springs.includes(K(x,y))?2:0):0;
  }else if(type==='cleanse'){
   value=unit?(unit.rooted?4.4:0)+(unit.burning?4.2:0)+
    Math.min(2,MAX_SHIELD-unit.shield):0;
  }else if(type==='rally'||type==='bond'){
   const nearbyAllies=self.filter(v=>d(v,pt)<=1);
   value=nearbyAllies.length>=2?nearbyAllies.reduce((sum,v)=>
    sum+(v.rallied?0:2)+(type==='bond'&&v.shield<MAX_SHIELD?1.5:0),0):0;
  }else if(type==='dash'){
   value=unit?.moved&&!unit.rooted?2+Math.min(4,unit.atk)*.55:0;
  }else if(type==='recall'){
   value=S.hands[0].length<5&&S.discards[0].some(k=>!D[k].spell&&!D[k].tribute)?5:0;
  }else if(type==='snare'){
   const threat=foes.length?Math.min(...foes.map(v=>d(v,pt))):9;
   value=threat<=2?4.3:0;
  }else if(type==='exchange'){
   value=unit&&unit.team===0&&unit.hp<=2&&self.length>=4?3.5:0;
  }
  return value-q.cost*.48;
 };
 const castSpell=mission=>{
  const choices=[];
  S.hands[0].forEach((key,idx)=>{
   const q=D[key];
   if(!q?.spell||q.cost>S.energy[0])return;
   // Spells are region/position dependent. Search every legal tile to
   // include both creatures and valid core-targeted/area effects.
   for(let y=0;y<8;y++)for(let x=0;x<7;x++){
    const score=scoreSpell(q,x,y,mission);
    if(score>=3.5)choices.push({idx,x,y,score});
   }
  });
  choices.sort((a,b)=>b.score-a.score||a.idx-b.idx||a.y-b.y||a.x-b.x);
  for(const choice of choices)
   if(apply(0,{op:'card',idx:choice.idx,x:choice.x,y:choice.y,tributes:[]}))
    return true;
  return false;
 };
  const playerTurn=(mission,activity)=>{
   if(S.phase!=='playing'||S.turn!==0)return;
   // A player can move before summoning. Practice that legal sequence when
   // Zephyr is in hand; otherwise the bot never tests Tailwind Dispatch.
   // Move one grounded ally only if it improves the actual mission position
   // and can remain within two tiles of a legal Zephyr deployment square.
   if(S.hands[0].includes('M')&&S.energy[0]>=D.M.cost&&
      S.zephyrRound?.[0]!==S.round){
    const staging=[];
    for(let y=2;y<=6;y++)for(let x=0;x<7;x++)
     if(deploy(0,x,y))staging.push({x,y});
    const candidates=S.units.filter(u=>u.team===0&&!u.moved&&!u.rooted&&!u.fly&&!u.attacked);
    for(const ally of candidates){
     const moves=movement(ally).filter(pt=>staging.some(s=>d(pt,s)<=2))
      .sort((a,b)=>moveScore(ally,b,mission)-moveScore(ally,a,mission)||
       a.n-b.n||a.y-b.y||a.x-b.x);
     const best=moves[0];
     if(best&&moveScore(ally,best,mission)>=moveScore(ally,ally,mission)+.2&&
       apply(0,{op:'move',id:ally.id,x:best.x,y:best.y})){
      activity.moves++;
      break;
     }
    }
   }
   // One legal summon per turn, including tributed mythics. Preserve
   // spring defenders where possible, and never sacrifice an enemy unit.
   const candidates=S.hands[0].map((key,idx)=>({key,idx,q:D[key]}))
    .filter(z=>z.q&&!z.q.spell&&z.q.cost<=S.energy[0])
    .sort((a,b)=>{
     // Genuine positional creature roles deserve credit alongside raw stats.
     // In particular, mobility-support M is worthless only if there is no
     // already-moved, unrooted ground ally to dispatch again.
     const utility=o=>{
      if(o.key==='M'&&S.zephyrRound?.[0]!==S.round&&
       S.units.some(v=>v.team===0&&v.moved&&!v.attacked&&!v.rooted&&!v.fly))return 4.2;
      if(o.key==='N'&&mission.objective==='capture')return 2.2;
      if(o.key==='O'&&S.units.some(v=>v.team===1&&v.shield>=2))return 1.6;
      if(o.key==='P'&&S.units.some(v=>v.team===1&&v.shield>=2))return 1.8;
      if(o.key==='Q'){
       const affordable=S.hands[0].some(k=>D[k].spell&&
        S.energy[0]>=o.q.cost+D[k].cost);
       const eligible=S.units.some(v=>v.team===0&&(v.shield||0)<MAX_SHIELD);
       return affordable&&eligible?5.4:1.5;
      }
      if(o.key==='R'&&S.units.some(v=>v.team===0&&v.k!=='R'))return 2.1;
      if(o.key==='S'&&mission.objective==='defend')return 1.8;
      if(o.key==='T'&&(S.traps||[]).some(t=>t.team===1))return 2.4;
      if(o.key==='Y'&&S.units.some(v=>v.team===1&&!v.boss))return 2.6;
      if(o.key==='Z'&&S.units.some(v=>v.team===1&&v.burning))return 3.2;
      if(o.key==='aa'&&S.hands[0].some(k=>D[k].tribute||k==='W'||k==='F'))return 2.4;
      if(o.key==='ab'&&mission.objective==='capture')return 2.8;
      return 0;
     };
     const sa=a.q.atk*1.7+a.q.hp*.43+a.q.range*.6-a.q.cost*.35-
      (a.q.tribute||0)*3.5+utility(a);
     const sb=b.q.atk*1.7+b.q.hp*.43+b.q.range*.6-b.q.cost*.35-
      (b.q.tribute||0)*3.5+utility(b);
     return sb-sa||a.idx-b.idx;
    });
   for(const choice of candidates){
    const tribute=choice.q.tribute||0,own=S.units.filter(u=>u.team===0);
    if(own.length-tribute>=8||own.length<tribute)continue;
    const sacrificial=own.slice().sort((a,b)=>
     (springs.includes(K(a.x,a.y))?12:0)-
      (springs.includes(K(b.x,b.y))?12:0)||
      (a.hp*1.3+a.atk*1.6)-(b.hp*1.3+b.atk*1.6)||a.id-b.id);
    const ids=sacrificial.slice(0,tribute).map(u=>u.id);
    const slots=[];
    for(let y=2;y<=6;y++)for(let x=0;x<7;x++)
     if(deploy(0,x,y))slots.push({x,y});
    const deployScore=pt=>{
     let score=moveScore({range:choice.q.range||1},pt,mission);
     if(choice.key==='M'&&S.zephyrRound?.[0]!==S.round&&
      S.units.some(v=>v.team===0&&v.moved&&!v.rooted&&!v.fly&&d(v,pt)<=2))score+=9;
     if(choice.key==='N'&&springs.includes(K(pt.x,pt.y)))score+=9;
     if(choice.key==='O'&&high.has(K(pt.x,pt.y)))score+=3;
     if(choice.key==='P'&&S.units.some(v=>v.team===1&&v.shield>0&&
       d(v,pt)<=choice.q.range))score+=3;
     if(choice.key==='Q'&&S.units.some(v=>v.team===0&&d(v,pt)<=2&&
       (v.shield||0)<MAX_SHIELD))score+=6;
     if(choice.key==='R'&&S.units.some(v=>v.team===0&&d(v,pt)<=2))score+=2;
     if(choice.key==='S'&&S.units.some(v=>v.team===1&&d(v,pt)<=2))score+=2;
     if(choice.key==='T'&&(S.traps||[]).some(t=>t.team===1&&d(t,pt)<=2))score+=8;
     if(choice.key==='Y'&&S.units.some(v=>v.team===1&&!v.boss&&d(v,pt)<=2))score+=6;
     if(choice.key==='Z'&&S.units.some(v=>v.team===1&&v.burning&&d(v,pt)<=2))score+=5;
     if(choice.key==='aa'&&S.units.some(v=>v.team===1&&d(v,pt)<=3))score+=1.5;
     if(choice.key==='ab'&&springs.some(k=>{
      const [x,y]=k.split(',').map(Number);
      return d(pt,P(x,y))<=2&&!S.units.some(v=>v.x===x&&v.y===y);
     }))score+=5;
     return score;
    };
    slots.sort((a,b)=>deployScore(b)-deployScore(a)||a.y-b.y||a.x-b.x);
    for(const pos of slots){
     if(apply(0,{op:'card',idx:choice.idx,x:pos.x,y:pos.y,tributes:ids})){
      if(tribute)activity.mythicSummons++;
      else activity.normalSummons++;
      break;
     }
    }
    if(activity.mythicSummons+activity.normalSummons>activity.startSummons)break;
   }
   // Up to two genuinely affordable and useful spells, after reserving
   // enough energy to make a meaningful unit deployment.
   for(let cast=0;cast<2&&S.phase==='playing';cast++){
    if(castSpell(mission))activity.spells++;
    else break;
   }
   for(const u of [...S.units].filter(v=>v.team===0)){
    if(S.phase!=='playing'||!S.units.some(v=>v.id===u.id))break;
    const targets=()=>mission.objective==='assault'?
     [...S.units.filter(v=>v.team===1),core(1)]:
     S.units.filter(v=>v.team===1);
    let eligible=targets().filter(v=>canAttack(u,v));
    // If the unit can attack already, don't sacrifice an attack for
    // movement; attacks are scored rather than always hitting the core.
    const priorityAdvance=mission.objective==='capture'&&
     (!springs.includes(K(u.x,u.y))||onSpring(0)<2)||
     mission.objective==='hunt'&&!eligible.some(v=>v.id===S.championId);
    if((!eligible.length||priorityAdvance)&&!u.moved&&!u.rooted){
     const paths=movement(u).sort((a,b)=>moveScore(u,b,mission)-
       moveScore(u,a,mission)||a.n-b.n||a.y-b.y||a.x-b.x);
     if(paths.length&&moveScore(u,paths[0],mission)>moveScore(u,u,mission)+.12){
      const best=paths[0];
      const hasAttack=eligible.length>0;
      const attacksFromBest=targets().some(v=>d(best,v)<=u.range&&los(best,v));
      // A tactical move may precede an attack, but never throw away a
      // guaranteed strike unless it secures a mission spring or advances
      // toward a hunt champion instead of irrelevant targets.
      const objectiveMove=mission.objective==='capture'&&springs.includes(K(best.x,best.y))||
       mission.objective==='hunt'&&priorityAdvance;
      if((!hasAttack||attacksFromBest||objectiveMove)&&
       apply(0,{op:'move',id:u.id,x:best.x,y:best.y}))activity.moves++;
     }
     if(!S.units.some(v=>v.id===u.id)||S.phase!=='playing')continue;
     eligible=targets().filter(v=>canAttack(u,v));
    }
    eligible.sort((a,b)=>scoreTarget(u,b,mission)-scoreTarget(u,a,mission));
    if(eligible.length&&apply(0,{op:'attack',id:u.id,x:eligible[0].x,y:eligible[0].y}))activity.attacks++;
   }
   if(S.phase==='playing')apply(0,{op:'end'});
   if(S.phase==='playing'&&S.turn===1)aiTurn();
  };
  try{
   for(const m of scenarios){
    for(const plan of m.storyScene?.choices||[]){
     for(let seed=1;seed<=trials;seed++){
      const sampleSeed=0x123ad+seed*137+m.id.charCodeAt(0)*991+
       m.id.charCodeAt(1)*163;
      rng(sampleSeed);
      if(!startMission(m.id,true,plan.kind)){errors.push(m.id+': failed start');continue}
      S.qaAllowGenericReinforcements=useLegacyWaves;
      S.qaGenericCount=0;
      // Bring the QA player's current deck to a reproducible upgrade level.
      // This never edits profile.levels/copies; these are match-local stats.
      if(testRank!==1){
       const ranks=S.cardRanks||{};
       const before=Object.fromEntries(Object.keys(ranks).map(k=>[k,ranks[k]]));
       for(const k of Object.keys(ranks))ranks[k]=testRank;
       for(const u of S.units.filter(v=>v.team===0)){
        const old=before[u.k]||1;
        const hpBoost=Math.floor(testRank/2)-Math.floor(old/2);
        const atkBoost=Math.floor((testRank-1)/4)-Math.floor((old-1)/4);
        u.hp+=hpBoost;u.max+=hpBoost;u.atk+=atkBoost;
       }
      }
      let steps=0,valid=true,orders=0;
      const activity={spells:0,mythicSummons:0,normalSummons:0,
       moves:0,attacks:0,startSummons:0};
      while(S.phase==='playing'&&steps<m.rounds+2){
       const prevRound=S.round;
       activity.startSummons=activity.mythicSummons+activity.normalSummons;
       playerTurn(m,activity);orders++;steps++;
       const occupied=new Set(S.units.map(v=>K(v.x,v.y)));
       const noOverlap=occupied.size===S.units.length;
       valid=valid&&noOverlap&&S.units.every(v=>
        bounds(v.x,v.y)&&v.hp>0&&v.shield>=0&&v.shield<=5)&&
        S.energy.every(e=>e>=0&&e<=10)&&S.hp.every(h=>h>=0&&h<=36)&&
        S.units.every(v=>v.team===0||v.team===1)&&
        S.units.filter(v=>v.team===0).length<=8&&
        S.units.filter(v=>v.team===1).length<=8&&
        S.round>=prevRound&&S.round<=prevRound+1;
       if(!valid){errors.push(m.id+'/'+plan.kind+': invalid board turn '+steps);break}
      }
      reports.push({id:m.id,region:m.region,objective:m.objective,
       plan:plan.kind,seed,win:S.winner===0,ended:S.phase==='over',
       rounds:S.round,playerCore:S.hp[0],enemyCore:S.hp[1],
       playerUnits:S.units.filter(v=>v.team===0).length,
       enemyUnits:S.units.filter(v=>v.team===1).length,
       events:S.encounterState?.events||0,genericWaves:S.qaGenericCount||0,
       newSpellsPlayed:(S.usedCards||[[],[]]).map(hand=>hand.filter(k=>V45_SPELL_KEYS.includes(k))),
       v455SpellsPlayed:(S.usedCards||[[],[]]).map(hand=>hand.filter(k=>V455_SPELL_KEYS.includes(k))),
       newCreaturesPlayed:(S.usedCards||[[],[]]).map(hand=>hand.filter(k=>V453_UNIT_KEYS.includes(k))),
       v454CreaturesPlayed:(S.usedCards||[[],[]]).map(hand=>hand.filter(k=>V454_UNIT_KEYS.includes(k))),
       v456CreaturesPlayed:(S.usedCards||[[],[]]).map(hand=>hand.filter(k=>V456_UNIT_KEYS.includes(k))),
       championHP:S.units.find(v=>v.id===S.championId)?.hp||0,
       remainingBossShield:S.units.find(v=>v.id===S.championId)?.shield||0,
       valid,steps:orders,
       actions:{spells:activity.spells,mythicSummons:activity.mythicSummons,
        normalSummons:activity.normalSummons,moves:activity.moves,attacks:activity.attacks}});
     }
    }
   }
  }catch(error){errors.push('Runtime: '+String(error?.message||error))}
  finally{Math.random=originalRandom;chosenDeck=originalDeck;startQuickMatch()}
  const grouped=scenarios.map(m=>{
   const plans=(m.storyScene?.choices||[]).map(p=>{
    const r=reports.filter(z=>z.id===m.id&&z.plan===p.kind);
    return{kind:p.kind,games:r.length,wins:r.filter(z=>z.win).length,
     winRate:r.length?r.filter(z=>z.win).length/r.length:0,
     averageRounds:r.length?+(r.reduce((sum,z)=>sum+z.rounds,0)/r.length).toFixed(1):0,
     averageCore:r.length?+(r.reduce((sum,z)=>sum+z.playerCore,0)/r.length).toFixed(1):0};
   });
   return{id:m.id,title:m.name,region:m.region,objective:m.objective,plans};
  });
  return{legacyWaves:useLegacyWaves,testRank,pass:!errors.length&&reports.length===scenarios.length*2*trials&&
    reports.every(r=>r.valid&&r.ended),samples:trials,
    games:reports.length,wins:reports.filter(r=>r.win).length,
    errors,grouped,reports,
    actions:reports.reduce((tot,r)=>{
     for(const key of Object.keys(tot))tot[key]+=r.actions?.[key]||0;
     return tot;
    },{spells:0,mythicSummons:0,normalSummons:0,moves:0,attacks:0}),
    v454CreatureUsage:reports.reduce((summary,r)=>{
     (r.v454CreaturesPlayed||[[],[]]).forEach((played,t)=>{
      for(const k of played){
       const holder=t===0?summary.player:summary.rival;
       holder[k]=(holder[k]||0)+1;
      }
     });
     return summary;
    },{player:{},rival:{}}),
    newCreatureUsage:reports.reduce((summary,r)=>{
     (r.newCreaturesPlayed||[[],[]]).forEach((played,t)=>{
      for(const k of played){
       const holder=t===0?summary.player:summary.rival;
       holder[k]=(holder[k]||0)+1;
      }
     });
     return summary;
    },{player:{},rival:{}}),
    v456CreatureUsage:reports.reduce((summary,r)=>{
     (r.v456CreaturesPlayed||[[],[]]).forEach((played,t)=>{
      for(const k of played){const holder=t===0?summary.player:summary.rival;
       holder[k]=(holder[k]||0)+1}
     });return summary;
    },{player:{},rival:{}}),
    v455SpellUsage:reports.reduce((summary,r)=>{
     (r.v455SpellsPlayed||[[],[]]).forEach((played,t)=>{
      for(const k of played){const holder=t===0?summary.player:summary.rival;
       holder[k]=(holder[k]||0)+1}
     });return summary;
    },{player:{},rival:{}}),
    newSpellUsage:reports.reduce((summary,r)=>{
     (r.newSpellsPlayed||[[],[]]).forEach((played,t)=>{
      for(const k of played){const holder=t===0?summary.player:summary.rival;
       holder[k]=(holder[k]||0)+1}
     });return summary;
    },{player:{},rival:{}}),
    agent:'objective-driven legal-action heuristic with spell casting and sacrificial mythics'};
 },
 qaPreviewResult:(id='v1',defeat=false)=>{
  if(!startMission(id,true,'rush'))return{pass:false,reason:'mission start refused'};
  if(defeat)applyDamage(core(0),S.hp[0]);
  else applyDamage(core(1),S.hp[1]);
  render();
  const record=profile.claimed[S.matchId];
  return{pass:S.phase==='over'&&!!record&&!!MISSION_BY_ID[id]?.epilogue,
   id,defeat,result:record,story:MISSION_BY_ID[id]?.epilogue};
 },
 qaMissionOutcome:(id,variant='win')=>{
  const m=MISSION_BY_ID[id];
  if(!m||!startMission(id,true))return{pass:false,id,variant,reason:'mission setup'};
  const beforeComplete=profile.campaign.completed.includes(id);
  const beforeClaims=Object.keys(profile.claimed).length;
  if(variant==='loss'){
   applyDamage(core(0),Math.max(1,S.hp[0]));
  }else if(m.objective==='assault'){
   applyDamage(core(1),Math.max(1,S.hp[1]));
  }else if(m.objective==='hunt'){
   const champion=S.units.find(u=>u.id===S.championId);
   if(!champion)return{pass:false,id,variant,reason:'missing champion'};
   applyDamage(champion,champion.max+champion.shield+999);
  }else if(m.objective==='defend'){
   S.round=m.needed;missionCheck(1);
  }else if(m.objective==='capture'){
   const ours=S.units.filter(u=>u.team===0);
   if(ours.length<2)return{pass:false,id,variant,reason:'missing starters'};
   for(let i=0;i<2;i++){
    const [x,y]=springs[i].split(',').map(Number);
    ours[i].x=x;ours[i].y=y;
   }
   for(let i=0;i<m.needed&&S.phase==='playing';i++)missionCheck(0);
  }
  const ended=S.phase==='over',won=S.winner===0;
  const record=awardMatch(),gold=profile.gold,xp=profile.xp,copies=JSON.stringify(profile.copies);
  const again=awardMatch();
  const duplicateSafe=gold===profile.gold&&xp===profile.xp&&copies===JSON.stringify(profile.copies)&&
   again?.matchId===record?.matchId;
  const nowComplete=profile.campaign.completed.includes(id);
  const pass=ended&&won===(variant!=='loss')&&
   nowComplete===(variant!=='loss'||beforeComplete)&&duplicateSafe&&
   !!record&&record.storyClear===(variant!=='loss'&&!beforeComplete)&&
   Object.keys(profile.claimed).length===beforeClaims+1&&!!m.epilogue?.victory&&!!m.epilogue?.defeat;
  const result={id,objective:m.objective,variant,pass,won,ended,
   storyClear:record?.storyClear,duplicateSafe,completed:nowComplete,
   awardGold:record?.gold,awardXP:record?.xp,star:record?.stars,
   epilogue:m.epilogue?.speaker};
  startQuickMatch();return result;
 },
 qaPlan:(id,kind)=>{
  const m=MISSION_BY_ID[id],choice=m?.storyScene?.choices?.find(x=>x.kind===kind);
  if(!choice||!startMission(id,true,kind))return{pass:false,id,kind,reason:'invalid choice'};
  const p=S.expeditionPlan,units=S.units.filter(u=>u.team===0);
  const expected={
   rush:S.hp[0]===22&&S.energy[0]===5,
   ward:S.energy[0]===2&&units.slice(0,2).every(u=>u.shield>=1),
   lore:S.energy[0]===2&&S.hands[0].length===5,
   sabotage:S.hp[0]===22&&S.hp[1]===Math.max(1,
     (m.objective==='assault'?24+Math.max(0,m.tier-2)*2:24)-2),
   pledge:S.energy[0]===2,
   gambit:S.energy[0]===4&&S.energy[1]===4&&S.hands[0].length===5
  };
  const pass=p?.kind===kind&&expected[kind]===true&&
   S.hp.every(h=>h>0&&h<=28)&&S.energy.every(e=>e>=0&&e<=10);
  const result={pass,id,kind,openingEnergy:S.energy.slice(),
   coreHealth:S.hp.slice(),handSize:S.hands[0].length,
   starterShields:units.slice(0,2).map(u=>u.shield)};
  startQuickMatch();return result;
 },
 qaBoss:(id)=>{
  if(!startMission(id,true))return{pass:false,id,reason:'start refused'};
  const mission=MISSION_BY_ID[id],boss=S.units.find(u=>u.id===S.championId);
  if(!mission?.bossKit||!boss)return{pass:false,id,reason:'no unique champion'};
  const player=S.units.find(u=>u.team===0);
  // Move a challenger into readable range so positional phases activate.
  if(player){player.x=3;player.y=4;}
  boss.hp=Math.max(1,Math.floor(boss.max*.62));
  bossReaction(boss);
  const phaseOne=boss.bossPhase===1&&(S.bossHistory||[]).length===1;
  boss.hp=Math.max(1,Math.floor(boss.max*.26));
  bossReaction(boss);
  const phaseTwo=boss.bossPhase===2&&(S.bossHistory||[]).length===2;
  const unique=new Set(S.units.map(u=>K(u.x,u.y)));
  const legal=unique.size===S.units.length&&S.units.length<=16&&
   S.units.every(u=>bounds(u.x,u.y)&&u.hp>0&&u.shield<=5);
  let mirrorCheck=true,reflection=0;
  if(id==='t2'&&player){
   boss.hp=Math.max(10,boss.hp);boss.shield=0;
   // A basic strike on the mirror must consume exactly one charge.
   player.x=3;player.y=3;player.hp=player.max;player.atk=2;
   const oldHp=player.hp,oldCharge=boss.mirrorCharge;
   basicStrike(player,boss);
   reflection=oldHp-player.hp;
   mirrorCheck=reflection===1&&boss.mirrorCharge===oldCharge-1;
  }
  const result={id,pass:phaseOne&&phaseTwo&&legal&&mirrorCheck,
   phaseOne,phaseTwo,legal,mirrorCheck,reflection,kit:mission.bossKit.name,
   phases:S.bossHistory?.map(x=>x.text),bossShield:boss.shield,bossMove:boss.move};
  startQuickMatch();
  return result;
 },
 qaEncounter:(id,round)=>{
  if(!startMission(id,true))return{pass:false,reason:'mission setup failed'};
  const mission=MISSION_BY_ID[id],state=S.encounterState;
  if(!mission?.encounter||!state)return{pass:false,reason:'missing encounter'};
  S.round=round||mission.encounter.first;
  const before=S.units.length,oldEvent=state.events,oldHazards=S.hazards.slice();
  const fired=encounterTick(),repeated=encounterTick();
  const unique=new Set(S.units.map(u=>K(u.x,u.y)));
  const pass=fired&&!repeated&&state.events===oldEvent+1&&S.units.length<=16&&
   S.units.every(u=>bounds(u.x,u.y)&&u.hp>0&&u.shield<=5)&&unique.size===S.units.length;
  return{pass,id,kind:mission.encounter.type,round:S.round,fired,
   unitCount:S.units.length,unitIncrease:S.units.length-before,
   hazardCount:S.hazards.length,hazardsChanged:oldHazards.join('|')!==S.hazards.join('|'),
   note:state.notice};
 }}:{})};
startAI();
const inviteCode=new URLSearchParams(location.search).get('room');if(inviteCode){startOnline();$('roomid').value=inviteCode.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,8);$('roomstatus').textContent='Invitation detected. Tap Join Room to connect.'}
})();
