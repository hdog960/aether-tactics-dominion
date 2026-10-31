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
 const all=[...missions,...trials];
 window.AetherConquest={regions,missions,trials,all};
})();