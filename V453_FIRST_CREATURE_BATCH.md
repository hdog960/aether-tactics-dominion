# Dominion v4.5.3 — Four-Creature Mechanics (staging, not released)

**Status: DEV BRANCH ONLY.** Public Dominion is still v4.5.2 / 36 cards. The new cards are **not** considered finished and must not be advertised as playable until they have matching painted art, battlefield silhouettes, animation, and live mobile testing.

## Four new creatures, authoritative mechanics

| ID | Name | Cost | Stats (level 1) | Mechanical identity |
| --- | --- | ---: | --- | --- |
| M | Zephyr Cartographer | 3 | HP 4, ATK 1, range 2, movement 3, flight | On summon, once per team each round, refresh the movement of the closest already-moved, unrooted nonflying ally within two tiles. No attack refresh. A creature immediately defeated by a placement trap cannot activate this ability. |
| N | Verdant Bastion | 4 | HP 8, ATK 1, range 1, movement 1, shield 1 | At the start of its owner's turn, **while standing on an Aeth spring**, grant one shield to the nearest allied creature within two tiles with space under the cap. If no other eligible ally, shield itself. Maximum five shield. |
| O | Cragsunder Duelist | 3 | HP 5, ATK 2, range 1, movement 2 | First basic strike each round **from high ground** removes up to two opposing unit shield before the ordinary damage, independent of elevation's normal attack benefit. Does not pierce cores or grant attacks. |
| P | Umbral Siphon | 4 | HP 5, ATK 2, range 2, movement 2 | First basic strike each round against a shielded opposing creature moves one of its shield points to this hunter, only if the hunter is below five shield. Then resolves ordinary damage. Cannot steal from enemy core or manufacture shield. |

## Source and rules
- `v45-engine.js`: adds records M–P and four distinct innate ability descriptions, Grimoire details and strategic tips.
- Authoritative `apply('card')` summons, `startStatusTurn` shield triggers, `basicStrike` elevation/shield interactions, and `trapImpact` death handling contain the actual rule code; no purely decorative card effects.
- The existing battle snapshot model remains `version:4`. Unit passive state is stored as match-local properties, preserving ordinary JSON saves and authoritative host messages. No profile, upgrade, collection, achievement, campaign or deck save migration.
- **HARD ART GATE:** `V453_UNIT_KEYS=['M','N','O','P']`, with `V453_ENABLED` true only for the **memory-isolated QA page** or if an explicit future `window.DOMINION_V453_ART_RELEASE===true` release flag is supplied after complete art. Normal players cannot see the four unfinished cards.
- Eight original deck presets and three saved loadouts are preserved. Existing spell art is unmodified.

## Tested now
- `qaV453Creatures()`: **13/13 targeted rules passed** in an actual-engine, mocked-DOM, in-memory-save environment: summon refresh, once/team/round, root exemption, trap death, spring qualification, defensive cap, high-ground armor piercing, once-per-round limits, and shield-steal cap.
- Existing `qaV45Spells()`: **12/12** passed. Boss-phase audit **7/7** and story doctrine audit **30/30** passed.
- `qaBalance(2)`: **60/60** complete campaign test sessions, **38** heuristic bot wins, **zero** invalid states.
- A legal 24-card test loadout containing M/N/O/P plus familiar units and spells ran **60/60** simulated campaign sessions, **34** heuristic bot wins, **zero** invalid states. These bot outcomes should **not** be interpreted as human win rates or balance proof.
- `v45-qa-engine.js` mirrors the staged source, `v45-qa.js` adds **13 NEW CREATURE RULE TESTS**, and the isolated `qa-v39.html` loads the staged QA script versions. Since this branch is not published, these tests were run at the engine level, **not** in the live browser.

## Art production requirements — blocking release
The new creature must have a **unique portrait and its identical subject as a transparent battlefield sprite**, with readable anatomy, feet/contact, materials, and in-world scale. Never replace any of the four with a geometric icon, stock character, recolored stand-in, or an unrelated sprite. This is an explicit art integrity gate.

Create the following original character designs for future release:
1. **M Zephyr Cartographer:** windborne avian scout with two believable feathered wings, cobalt-and-sand travel leather, brass survey compass, folded star charts, wind-stream motif. Visually distinct from existing Sky Manta and Wisp Familiar.
2. **N Verdant Bastion:** broad ancient bark-and-moss guardian, root-bound articulated legs, dark emerald canopy armor and a natural crystal shield. Distinct from Obsidian Golem and Thorn Warden.
3. **O Cragsunder Duelist:** compact granite-armored alpine swordfighter, cleft stone pauldron, twin practical blades, red climbing sash, crisp combat footwork; distinct from Rift Stalker and Storm Lancer.
4. **P Umbral Siphon:** lithe dusky-purple occult shield hunter, weathered violet cloth and readable human anatomy, translucent ward-collector lantern and restrained dark magic; visually distinct from Dusk Reclaimer.

Asset contract:
- `art/cards-creatures-v453.webp`: four separate painterly narrative scenes, cropped exactly **4×128×96 = 512×96**, M/N/O/P left to right.
- `art/units-creatures-v453.png`: four original transparent full-body cutouts, exactly **4×96×120 = 384×120**. Each cutout must depict the **same character design as its own card portrait**.
- `art/battlefield-frames-v453.webp`: 4 distinct rows × 22 frames each at **96×120** per cell = 2112×480, with 4 idle, 6 walk, 4 attack, 3 hit and 5 defeat frames. Frame key mapping must match M/N/O/P, not reuse unrelated unit poses.
- Extend the existing card-art adapter to supply correct card crop and transparent sprite per ID. Add a v4.5.3 frame renderer that checks exact dimensions and never silently substitutes a classic or unrelated character. Apply versioned service-worker cache only upon real deployment.

**Status of artwork: NOT PRODUCED.** The previously generated graphic saying "v4.7 Complete" is a speculative poster with inaccurate claims and is *not* an asset or game QA screenshot. Do not use it as art, release evidence or marketing.

## Release checklist
1. Complete all three art atlases and verify cropped portraits/sprite identity on the actual battlefield, under real card names.
2. Keep existing 36 cards fully functional; then test all 40 cards in a live browser at multiple viewport widths and real physical iPhone touch.
3. Test direct summon/attack/save/resume with all four units, AI use and online host serialization.
4. Run 60+ candidate-deck tactical matches, check no balance outliers, and re-run existing 12 spell, 7 boss, 30 mission-doctrine, save and vault checks.
5. Explicitly enable gated release only after artwork and gameplay pass. **Do not merge this incomplete branch into public main**.

## Creator's roadmap stopping boundary
Continue in order through v4.5 card expansion, v4.6 replayability and progression, then v4.7 multiplayer reliability. **Stop immediately after completing v4.7** and request the creator's revisions before contemplating v5.0 or any later milestone.

## Subsequent development: strict painted-art integration and tactical QA

**Implemented but still staging only**
- New `v453-creature-art.js` attaches M/N/O/P directly to their four exact **128×96** card crops and corresponding **96×120 transparent** battlefield sprites, preserving the old artwork adapter for all earlier cards.
- The adapter checks atlas dimensions, checks that all four card painting cells have different pixel signatures, and verifies that all four sprite cells contain both meaningful opaque foreground and transparent background pixels. A missing, duplicated, or solid-background asset never passes `v453ArtStatus().complete`.
- `v45-scene.js` and the identical `v45-qa-scene.js` now map M/N/O/P to four new 22-frame rows in the expected **2112×480** frame atlas. They never map to another monster's existing animation frames. If animated frames have not loaded, only the same creature's verified transparent static cutout is eligible as fallback.
- Staging `index.html`, `v30.html`, and the isolated `qa-v39.html` have the versioned adapter/engine/renderer wired in. The service worker precaches only the **staged scripts**, deliberately NOT the absent image files (precaching a missing file would break offline installation).
- The QA page now has `4 CREATURE ART GATE`. It will show **BLOCKED** until both real image atlases and all 88 animation frames are available and valid. This is a real release gate, not a decorative green check.
- JavaScript syntax validation passed for all staged engine, scene, art and QA files; production and QA engines were synchronized; production and QA renderers were synchronized.
- Synthetic asset-validator unit tests proved that missing images produce a transparent card result and an incomplete status; exact-size unique portraits with genuinely transparent nonempty sprites produce a complete status under mock pixels. These tests **do not** constitute real generated character artwork.

**Improved 60-match tactical deck exercise**
The heuristic test agent initially undervalued Zephyr because it always summoned before moving. It now can legally move a grounded creature first, then summon the Cartographer within two tiles, using the existing authoritative action rules. The simulated character-ability synergy is therefore meaningfully exercised without changing actual player card stats.
- Existing Balanced deck: **60 simulated battles, 38 agent wins, 0 invalid states**.
- 24-card mixed deck containing M/N/O/P: **60 simulated battles, 36 wins, 0 invalid states**.
- Recorded player summons across mixed-deck test: **M 40, N 40, O 46, P 40**. These are **card uses, not human win-rate estimates**.
- Targeted new creature rule tests: **13/13 pass**; existing v4.5 spell rules **12/12 pass** and Armory vault regression **8/8 pass**.
- Tests use the actual Javascript rules running in mocked-DOM, save-isolated memory; they do not establish physical iPhone quality or online room reliability.

**Explicit unmet blocker:** The required `art/cards-creatures-v453.webp`, `art/units-creatures-v453.png` and `art/battlefield-frames-v453.webp` have **not yet been created or uploaded**. The attempted image generators returned a false promotional dashboard or were not configured; neither is suitable as a production asset. No art has been silently replaced with an old character. Until all three files are completed and visually inspected, keep v4.5.3 unmerged and the public release at **v4.5.2 / 36 cards**.
