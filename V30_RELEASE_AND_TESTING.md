# Aether Tactics Dominion v3.0 — Riftfront Conquest

## Release summary
Five permanent bottom tabs: **Battle / Map / Cards / Forge / Duel**. Battle remains a single-screen tactical view; Cards and Forge are direct pages rather than successive dialog overlays. The top has a compact solo/campaign/duel status chip and no duplicated mode controls. iPhone Home Screen safe-area insets are included.

## Campaign: four regions, twelve missions
1. **Rune Valley**: First Footsteps, The Two Wells, Warden of Thorns.
2. **Frostglass Reach**: Icebound Approach, Frozen Crossing, Glassbound Seer.
3. **Ashen Crucible**: Cinder Rush, The Forge Vigil, The Ember Colossus.
4. **Crownfall Sanctum**: Whispers of the Crown, Oaths in Shadow, The Crown Guardian.

Objectives are Core assault, consecutive spring capture, survive a set number of rounds, or defeat a champion. Stage unlocks are sequential; replay improves 1–3 sigil scores. Story opponents use different actual card decks, mission tiers, and occasional controlled reinforcements. Non-assault missions cannot be circumvented by rushing the enemy Core.

## Battlefield variety
Four different rock, high-ground and Aeth spring arrangements. The game renders distinct atmospheric hues and tactical hazard tiles. Frost reduces movement one tile without trapping the unit; ember damages units at turn end; arcane strips shield then health. The world render invalidates cached terrain after a region change. The original detailed floating island art and animations remain.

## Collection and account progression
Existing local account level, XP, gold, card copies, card upgrades, custom 24-card decks and 32 card types are preserved. Story first-clears reward extra XP, gold and a thematic card copy. The Forge now displays card mastery (times used in finished solo matches) and six persistent milestone achievements. Existing v4 match snapshots and progression are not wiped.

## Private multiplayer
Dedicated Duel hub, independent custom-deck exchange, version-isolated peer protocol, clearer connection errors, measured one-time ping where supported, stale-revision rejection and match pause on disconnect. Online card levels remain equalized and online matches do not generate unverified local XP rewards.

**Limitations:** The WebRTC multiplayer architecture still needs actual two-phone verification. Ranked matchmaking, authoritative server infrastructure, cloud account saves, leaderboards, and robust reconnect recovery across failed networks are not implemented. We do not claim production-grade ranked multiplayer.

## Endgame
Three unlockable Crown Trials follow all twelve story missions: Hollow King, Mirror Court, Rift Sovereign. Every boss has extra health, strong attacks, a first phase at 65 percent HP with shield and reinforcements, and a final phase at 30 percent HP with increased aggression. The last trial introduces extra terrain danger.

## QA
- 15 out of 15 campaign story and trial scenarios passed an automated sequential unlock and completion run. Profile XP, gold, stars and unlocks persisted.
- Mission objective tests: assault, capture, defend, boss defeat, non-bypassable objective, ice movement and boss transition mechanics passed.
- Desktop browser smoke test confirmed five tabs, campaign list and locks, full-height Cards/Forge pages, Duel hub, and functional Battle view. Exact iPhone hardware layout is not yet verified.
- Staging page: v30.html. Main page: index.html. Files: v30-shell.js/css, v30-campaign-data.js, v30-engine.js, v30-scene.js, v30-net.js, sw.js.

## Recommended playtest
Confirm five-tab sizing on iPhone first. Clear Rune Valley missions normally. Test at least one frost and ember map, forge mastery rewards, save/reload in a mission, boss phase changes, and private Duel on two real devices. Continue future balance tuning against actual player behavior.
