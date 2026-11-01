# Dominion v4.4 — Signature Campaign Encounters (first pass)

## Actual game changes
This release deepens the existing 12-mission campaign and three Crown Trials without changing completion requirements or legacy player saves.

Every encounter now has a distinctive name, a readable world-map briefing, a recurring event type and event cadence:
- Rune Valley: Valley Aethrise, The Wells Awaken, Thornbound Path
- Frostglass Reach: Whiteout Front, Frozen Wellheart, Seer’s Reflection
- Ashen Crucible: Magma Breaks, Crucible Siege, Heart of the Furnace
- Crownfall Sanctum: Ghost Procession, Oathkeeper’s Gift, The Crown Stirs
- Crown Trials: Hollow King’s Hunt, Mirror Court, Sovereign’s Rupture

## Six real tactical event systems
- **Spring pulse:** Aeth springs shield the unit actually occupying each tile, regardless of team. Makes spring control strategically valuable.
- **Thorn roots:** Specified central squares periodically root their occupants, with a visible frost/bind FX.
- **Shifting weather:** Authored frost/ember hazard tile patterns cycle at a scheduled round. New hazards are highlighted on the existing real tactical tiles; region-specific terrain effects resolve on subsequent unit turns. No instant hidden damage at the moment of the switch.
- **Side reinforcement:** Spawn a distinct authored unit from open side lanes on a timer. Respect the 7-unit enemy limit, blocked rocks, occupied squares and normal unit stats.
- **Champion ward:** Boss receives bounded shield, without healing or new attacks.
- **Mirror Court:** The champion and its nearest retainer can receive a small shield together.

All of the above use the authoritative solo match state. Events never fire during Quick Battle or online PvP, never occur more than once in the same round, and never require the user to buy anything. Progress remains earned by completing each mission's original objective.

## Save compatibility
- State remains **version 4**. An optional `S.encounterState` contains last event, next event round, and a short history.
- Saved campaign missions without that property receive the next appropriately scheduled future event when resumed; no retroactive effect runs.
- Saved dynamic hazard tiles are restored after `setArena()` instead of replaced by the region's original static hazard set.
- `startMission` is unchanged for normal play; QA bypass of campaign locks exists only on `qa-v39.html` with its in-memory storage shim.

## Player experience
- The same approved Riftfront world illustration and all original mission crests remain.
- Mission briefings now include a detailed BATTLEFIELD TWIST section identifying the encounter before it starts.
- The small battlefield header shows the encounter name and next event round; after an event, its result is described in the command tip and combat feed.
- All five bottom tabs and the Forge scroll style remain intact.

## Quality gates
- Static assertions: 15/15 authored encounters, no reused missing event rules, valid tiles, bounded cadence, rules loaded before engine, service worker precache, save key unchanged.
- Isolated QA page adds **15 ENCOUNTERS** to execute a live event on each mission in memory and reject illegal positions, duplicate events, unit-cap overflow or shield overflow.
- Existing 264/132 frame audits and combat/AI checks remain available.
- Do not count the release as browser-verified until a real published QA session completes.

## Not yet done
- Extended story scenes, dialog choices, bespoke boss art/animation keyframes, full 15-mission start-to-clear tests, physical iPhone/WebKit touch/performance testing and two-device multiplayer.
- v4.4 will receive further encounter depth and balance tuning before the project moves to v4.5 card expansion.
