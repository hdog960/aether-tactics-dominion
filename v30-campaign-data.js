/* AETHER TACTICS v3.0 — 12 missions, 4 distinct maps, 3 endgame trials */
(()=>{
 const regions=[
 {id:'verdant',title:'Rune Valley',subtitle:'The first breach',color:['#315b53','#18394f'],icon:'🌿',hazard:'none',rocks:['0,3','6,3','2,3','4,4'],springs:['1,3','5,4'],high:['2,2','4,2','3,3','3,4','2,5','4,5']},
 {id:'frost',title:'Frostglass Reach',subtitle:'Stillness beneath the ice',color:['#477f95','#1c3757'],icon:'❄',hazard:'frost',rocks:['0,3','6,4','2,2','4,5'],springs:['1,4','5,3'],high:['3,2','2,3','4,4','3,5'],hazardTiles:['0,4','6,3','3,3']},
 {id:'ember',title:'Ashen Crucible',subtitle:'Fire on the shattered path',color:['#7d4a48','#462b46'],icon:'🔥',hazard:'ember',rocks:['1,2','5,5','0,4','6,3'],springs:['1,4','5,3'],high:['3,2','2,4','4,3','3,5'],hazardTiles:['0,3','6,4','3,3']},
 {id:'ruins',title:'Crownfall Sanctum',subtitle:'Old magic wakes',color:['#635982','#263851'],icon:'✧',hazard:'arcane',rocks:['1,3','5,4','2,2','4,5'],springs:['2,4','4,3'],high:['1,2','3,3','3,4','5,5'],hazardTiles:['0,4','6,3','3,2']}
 ];
 const missions=[
 {id:'v1',region:'verdant',name:'First Footsteps',story:'A rogue captain lays claim to the eastern spring.',objective:'assault',style:'Balanced',rounds:24,tier:1,bonusXP:45,bonusGold:35,card:'v'},
 {id:'v2',region:'verdant',name:'The Two Wells',story:'Hold both Aeth springs for two of your turns to break the siege.',objective:'capture',needed:2,style:'Skirmish',rounds:18,tier:1,bonusXP:55,bonusGold:45,card:'f'},
 {id:'v3',region:'verdant',name:'Warden of Thorns',story:'Defeat the briar champion before his roots cover the valley.',objective:'hunt',champion:'j',champHP:13,style:'Fortress',rounds:22,tier:1,bonusXP:75,bonusGold:55,card:'j'},
 {id:'f1',region:'frost',name:'Icebound Approach',story:'Hold the front against a frost mage until relief arrives.',objective:'defend',needed:7,style:'Arcane',rounds:16,tier:2,bonusXP:60,bonusGold:55,card:'e'},
 {id:'f2',region:'frost',name:'Frozen Crossing',story:'Capture the frozen springs while preserving your Core.',objective:'capture',needed:3,style:'Skirmish',rounds:20,tier:2,bonusXP:70,bonusGold:60,card:'p'},
 {id:'f3',region:'frost',name:'Glassbound Seer',story:'A runic commander holds the crystal citadel.',objective:'hunt',champion:'z',champHP:16,style:'Echo',rounds:23,tier:2,bonusXP:95,bonusGold:75,card:'z'},
 {id:'e1',region:'ember',name:'Cinder Rush',story:'Keep your army mobile across the burning Riftfront.',objective:'assault',style:'Assault',rounds:21,tier:3,bonusXP:75,bonusGold:70,card:'c'},
 {id:'e2',region:'ember',name:'The Forge Vigil',story:'Survive the siege before the Crucible loses its Aeth.',objective:'defend',needed:9,style:'Ritual',rounds:17,tier:3,bonusXP:90,bonusGold:80,card:'k'},
 {id:'e3',region:'ember',name:'The Ember Colossus',story:'Confront a titan formed from molten stone.',objective:'hunt',champion:'t',champHP:23,style:'Assault',rounds:24,tier:3,bonusXP:120,bonusGold:95,card:'t'},
 {id:'r1',region:'ruins',name:'Whispers of the Crown',story:'A spectral commander has seized the oldest passage.',objective:'assault',style:'Echo',rounds:22,tier:4,bonusXP:95,bonusGold:85,card:'o'},
 {id:'r2',region:'ruins',name:'Oaths in Shadow',story:'Secure the twin springs against a ritual army.',objective:'capture',needed:3,style:'Ritual',rounds:22,tier:4,bonusXP:110,bonusGold:100,card:'B'},
 {id:'r3',region:'ruins',name:'The Crown Guardian',story:'Defeat the Leviathan and unseal the Crown Trials.',objective:'hunt',champion:'l',champHP:25,style:'Fortress',rounds:24,tier:4,bonusXP:140,bonusGold:120,card:'l'}
 ];
 const trials=[
 {id:'t1',region:'ruins',name:'Trial I — The Hollow King',story:'A royal guardian attacks with ruthless momentum.',objective:'hunt',champion:'A',champHP:28,champATK:5,style:'Assault',rounds:24,tier:4,bonusXP:135,bonusGold:125,card:'A',trial:true},
 {id:'t2',region:'frost',name:'Trial II — The Mirror Court',story:'Crystalline defenders return every advantage to the enemy.',objective:'hunt',champion:'y',champHP:31,champATK:5,style:'Fortress',rounds:24,tier:5,bonusXP:165,bonusGold:145,card:'y',trial:true},
 {id:'t3',region:'ember',name:'Trial III — The Rift Sovereign',story:'Face the last titan of the sundering in the burning sky.',objective:'hunt',champion:'t',champHP:36,champATK:6,style:'Ritual',rounds:24,tier:6,bonusXP:210,bonusGold:185,card:'t',trial:true}
 ];
 // v4.4: Every campaign battle has a distinct authored battlefield rule.
 // Descriptions appear in the world map; events execute via the solo engine.
 const signatures={
  v1:{name:'Valley Aethrise',description:'Held Aeth springs grant a brief shield every four rounds.',type:'spring',first:4,cadence:4},
  v2:{name:'The Wells Awaken',description:'The two wells pulse shields every third round. Control both.',type:'spring',first:3,cadence:3},
  v3:{name:'Thornbound Path',description:'Briar roots periodically bind anyone occupying the contested center.',type:'roots',first:3,cadence:3,tiles:['2,3','3,3','4,3','3,4']},
  f1:{name:'Whiteout Front',description:'Advancing cold lanes shift across the battlefield every third round.',type:'weather',first:3,cadence:3,patterns:[['1,3','2,4','3,4'],['3,2','4,3','5,4'],['1,4','3,3','5,3']]},
  f2:{name:'Frozen Wellheart',description:'Each spring pulses protective magic for whoever holds it.',type:'spring',first:3,cadence:3},
  f3:{name:'Seer’s Reflection',description:'The wounded Seer periodically summons a crystal ward.',type:'ward',first:4,cadence:3},
  e1:{name:'Magma Breaks',description:'New lava lanes activate on a repeating cycle. Move before they ignite.',type:'weather',first:3,cadence:3,patterns:[['1,3','3,3','5,4'],['1,4','3,4','5,3'],['0,3','3,2','6,4']]},
  e2:{name:'Crucible Siege',description:'Foundry raiders arrive from the side approaches at regular intervals.',type:'wave',first:3,cadence:3,pool:['v','k','c']},
  e3:{name:'Heart of the Furnace',description:'The Colossus awakens moving volcanic fault lines.',type:'weather',first:3,cadence:3,patterns:[['1,3','3,3','5,4'],['2,4','3,4','4,3'],['0,3','3,4','6,4']]},
  r1:{name:'Ghost Procession',description:'Spectral guards march from the old portals every four rounds.',type:'wave',first:4,cadence:4,pool:['o','v','d']},
  r2:{name:'Oathkeeper’s Gift',description:'Both contested springs ward their controlling armies every three rounds.',type:'spring',first:3,cadence:3},
  r3:{name:'The Crown Stirs',description:'The Leviathan’s ancient shield returns during prolonged battle.',type:'ward',first:4,cadence:4},
  t1:{name:'Hollow King’s Hunt',description:'Relentless shadow skirmishers reinforce the King on the flanks.',type:'wave',first:3,cadence:3,pool:['s','A','v']},
  t2:{name:'Mirror Court',description:'Crystal warding reflects into the champion and a nearby retainer.',type:'mirror',first:3,cadence:3},
  t3:{name:'Sovereign’s Rupture',description:'The final Titan rotates searing fault lines as the fight escalates.',type:'weather',first:2,cadence:2,patterns:[['1,3','3,3','5,4'],['2,4','3,4','4,3'],['0,3','3,5','6,4']]}
 };
 // v4.4.1: individual boss phases, not merely a HP threshold and minion.
 // Every phase is previewed in the mission briefing before the player starts.
 const bossKits={
  v3:{name:'Briarheart Warden',phase1:'Root one nearby attacker with awakening briars.',
   phase2:'Snare up to two nearby attackers as the thorn crown blooms.',
   counter:'Keep ranged units outside the briar reach and save movement-refresh spells.'},
  f3:{name:'The Glassbound Reflection',phase1:'Grant a nearby crystal defender an additional shield.',
   phase2:'Freeze the closest enemy of the Seer for one movement phase.',
   counter:'Bring multiple attack angles; frost control is strongest near the champion.'},
  e3:{name:'Furnace Heart',phase1:'A glowing fault opens by the southern approach.',
   phase2:'A second magma fault opens, narrowing the safe lanes.',
   counter:'Read the glowing hazard tiles and reposition before the fire ticks.'},
  r3:{name:'Deepwater Oath',phase1:'The Leviathan marks the nearest challenger for a stronger follow-up.',
   phase2:'Its remaining defenders gain one protective shield.',
   counter:'Spread out from the Leviathan and protect whichever unit receives the mark.'},
  t1:{name:'The King’s Pursuit',phase1:'The Hollow King gains a longer stride and calls a hunter.',
   phase2:'The King brands a vulnerable challenger for extra damage.',
   counter:'Use roots, summons and blockers to stop the King reaching fragile allies.'},
  t2:{name:'The Mirror’s Verdict',phase1:'The mirror charges one counterattack against a basic strike.',
   phase2:'The mirror gains two additional reflection charges, up to two stored.',
   counter:'Break the mirror’s charges using armored attackers; spells never reflect.'},
  t3:{name:'Sovereign’s Reckoning',phase1:'A volcanic fissure tears through a flank of the arena.',
   phase2:'More fissures appear as the Sovereign enters its final rage.',
   counter:'Do not cluster on the center line; time your final attack before the next eruption.'}
 };
 for(const m of [...missions,...trials]){
  m.encounter=signatures[m.id];
  if(bossKits[m.id])m.bossKit=bossKits[m.id];
 }
 // v4.4.2 - the player chooses an expedition doctrine BEFORE each mission.
 // Each option is narrated in-world and presents an actual tradeoff in combat.
 const doctrines={
  rush:{name:'Daring Vanguard',description:'Start with +2 Aeth, but your Core begins at 22 HP.',cost:'CORE −2 · OPENING AETH +2'},
  ward:{name:'Shieldwall Advance',description:'Both starting soldiers gain +1 shield, but you start with 1 less Aeth.',cost:'STARTER SHIELDS +1 · OPENING AETH −1'},
  lore:{name:'Read the Omens',description:'Draw a fifth starting card, but begin with 1 less Aeth.',cost:'OPENING CARD +1 · OPENING AETH −1'},
  sabotage:{name:'Cut Their Supply',description:'Enemy Core starts 2 HP lower, but yours starts 2 HP lower too.',cost:'ENEMY CORE −2 · YOUR CORE −2'},
  pledge:{name:'Hold the Line',description:'Your Core starts at 24 HP and both soldiers recover 1 HP when the first event fires.',cost:'OPENING AETH −1 · REACTIVE HEAL +1'},
  gambit:{name:'Rift Gambit',description:'Your first hand has five cards. Both sides start with +1 Aeth.',cost:'OPENING CARD +1 · BOTH AETH +1'}
 };
 const chapters={
  v1:['Captain Ellin','An outlaw captain guards the spring. A narrow causeway leads into his camp.',[['rush','Charge before the watchers summon help.'],['ward','Advance behind old valley shields.']]],
  v2:['Wellkeeper Sera','Two springs feed the valley. The raiders count on you splitting your force.',[['lore','Study the spring glyphs before dividing the army.'],['pledge','Swear to defend the springs at any cost.']]],
  v3:['Thorn Hermit','The Warden binds roots to the stones. His grove answers every careless footstep.',[['ward','Guard your front line against thorn snares.'],['lore','Read the ancient briar runes first.']]],
  f1:['Scout Ysra','A blizzard swallows the northern passage. A signal fire must survive until dawn.',[['pledge','Hold the ridge and preserve the signal.'],['gambit','Risk the storm to seek a decisive opening hand.']]],
  f2:['Frostfarer Kael','The frozen springs hide beneath mirrored ice. One crack could split the march.',[['lore','Trace the buried ley lines beneath the ice.'],['rush','Cross before the weather can close the path.']]],
  f3:['Crystal Chronicler','The Seer reads each spell in the reflections. His court remembers every misstep.',[['gambit','Break symmetry with a wild first spell.'],['ward','Trust shield and steel over reflected predictions.']]],
  e1:['Forge-Rider Tor','The ground glows red. Smoke conceals the enemy Core across a broken bridge.',[['rush','Sprint the bridge before its supports fail.'],['ward','Make a guarded crossing through the lava.']]],
  e2:['Crucible Marshal','Foundry horns announce reinforcements. Every minute invites another assault.',[['sabotage','Cut the enemy’s furnace fuel before the siege.'],['pledge','Protect the workers and hold the gate.']]],
  e3:['Ash Sage','The molten Colossus wakes beneath the temple. Each step of its march shakes the land.',[['lore','Study the pattern of the furnace heartbeat.'],['rush','Strike its unguarded Core before it wakes fully.']]],
  r1:['Crown Archivist','Spectral soldiers march to an oath they can no longer remember.',[['gambit','Use an unexpected spell to interrupt the procession.'],['ward','March under a ward against the dead.']]],
  r2:['Oathkeeper Veya','Two ancient springs lie between rival ritual armies. Neither side will retreat.',[['pledge','Bind the army to the old protective oath.'],['sabotage','Disrupt the ritual before it can gather strength.']]],
  r3:['Keeper of the Tide','The Leviathan guards the Crown gate, and the water itself obeys its command.',[['lore','Find the gap between its tidal wards.'],['ward','Hold a shieldwall against its marked strikes.']]],
  t1:['The Hollow Herald','The King of Shadows hunts the weak first. His hall has no refuge for the slow.',[['rush','Challenge the King before his hunters gather.'],['ward','Set a defensive line against his pursuit.']]],
  t2:['Mirror Oracle','Every blade faces its own reflection in the Court. The first strike may be returned.',[['lore','Seek a spell the mirror cannot reflect.'],['gambit','Take a risky hand full of unexpected answers.']]],
  t3:['Rift Witness','The Sovereign tears the land apart. This is the last approach to the heart of the Rift.',[['pledge','Swear the final oath and protect the Core.'],['rush','Spend everything on an early decisive assault.']]]
 };
 for(const m of [...missions,...trials]){
  const chapter=chapters[m.id];
  if(!chapter)continue;
  m.storyScene={speaker:chapter[0],intro:chapter[1],
   choices:chapter[2].map(([kind,prompt])=>({kind,prompt,
    name:doctrines[kind].name,description:doctrines[kind].description,
    tradeoff:doctrines[kind].cost}))};
 }
 // v4.4.3 — authored result scenes. They are narrative, never progression gates.
 const outcomes={
  v1:['Captain Ellin','The eastern spring runs clear. Villagers return to the causeway under your colors.','The captain drives your forces back. The spring remains under outlaw watch.'],
  v2:['Wellkeeper Sera','The twin wells sing in harmony, their Aeth carrying warmth into the valley.','The two wells fall out of tune. The raiders split the valley once again.'],
  v3:['Thorn Hermit','The Warden’s grip releases. Paths long buried under roots open toward Frostglass.','Thorns reclaim the path. The Warden waits beneath a crown of briars.'],
  f1:['Scout Ysra','The signal fires survive the whiteout. Relief answers from the far side of the pass.','The last signal disappears under the snow. The ridge remains exposed.'],
  f2:['Frostfarer Kael','The frozen crossings hold firm beneath your banners, and the buried springs awaken.','Cracking ice forces a retreat. The ancient crossing is not yet safe.'],
  f3:['Crystal Chronicler','The Seer’s mirrors grow still. The reflections finally reveal the way to the Crucible.','Your army retreats in a maze of glittering reflections. The Seer keeps its secrets.'],
  e1:['Forge-Rider Tor','Your vanguard crosses the burning span. The foundries see a path through the smoke.','The bridge belongs to the enemy. Fire and falling stone seal the road.'],
  e2:['Crucible Marshal','The siege horns fall silent. The foundry workers keep their home and their forge.','The Crucible gates tremble under another siege. The defenders must regroup.'],
  e3:['Ash Sage','The Colossus falls to its knees. Its furnace light dims, revealing the Crown road.','The furnace roars back to life. The Colossus remains undefeated.'],
  r1:['Crown Archivist','The ghostly procession rests. The oldest passage opens without a single whisper.','The specters resume their march. Their forgotten oath still bars the way.'],
  r2:['Oathkeeper Veya','Both springs shine with a shared oath. The last defenders recognize your claim.','The ritual remains divided. The springs answer to rival voices.'],
  r3:['Keeper of the Tide','The Leviathan slips beneath quiet waters. The Crown gate swings open.','The ancient guardian drives you from the gate with a final tidal roar.'],
  t1:['The Hollow Herald','The King’s shadow recedes. His hunters kneel before a living commander.','The Hollow King keeps his throne; his hunters stalk the halls again.'],
  t2:['Mirror Oracle','The last mirror fractures into starlight. No reflection can bind your will.','The mirrors close around the Court. Your army leaves its echoes behind.'],
  t3:['Rift Witness','The Sovereign’s storm breaks. A new dawn settles over the restored Riftfront.','The Rift roars across the sky. The Sovereign’s final challenge remains.']
 };
 for(const m of [...missions,...trials]){
  const scene=outcomes[m.id];
  if(scene)m.epilogue={speaker:scene[0],victory:scene[1],defeat:scene[2],
   replay:'Your latest victory strengthens the legend, but the first-clear prize cannot be earned twice.'};
 }
 const all=[...missions,...trials];
 window.AetherConquest={regions,missions,trials,all};
})();