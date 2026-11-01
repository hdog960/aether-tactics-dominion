# Aether Tactics: Dominion

**Current source release: v4.5.2 — Three Saved Armory Loadouts**

**Play:** https://hdog960.github.io/aether-tactics-dominion/

A free, iPhone-first illustrated tactical fantasy card battler. Choose what to play from the Commander's Hall, explore a 12-mission campaign across four unique regions, build one of eight preset strategies or save three custom 24-card deck loadouts from 36 cards, upgrade your commander and collection, or test experimental private duels.

## Start here
- **Play**: Commander's Hall — select Quick Battle, Story Campaign or Private Duel; continue a previously saved solo battle.
- **Map**: Riftfront Conquest — four illustrated regions with 12 sequential missions and 3 endgame Crown Trials.
- **Cards**: the Grimoire — browse the 36-card collection or build a custom deck.
- **Forge**: level, gold, XP, card upgrades and six earnable milestone medallions.
- **Duel**: experimental peer-to-peer private match invitations.

The battlefield uses an angled 55-degree isometric perspective, Aeth springs, tactical movement, high ground, cover, summoning, spells, ritual sacrifices, and innate unit abilities.

## iPhone
Open in Safari; Share → Add to Home Screen. Updates to `main` publish through GitHub Pages. When a new release is published, reconnect while online to let the service worker replace the cached game assets.

## Saves
Commander progression, card upgrades, and campaign completion are stored in the device's local browser storage. Saved solo match snapshots retain the existing v4 format. Private tabs, clearing website data, or changing devices can lose progress. There is no cloud account synchronization yet.

## Multiplayer caveat
The Duel Chamber uses experimental peer-to-peer WebRTC and public signaling relays. Real-device, cross-network testing remains necessary. There is no production ranked matchmaking, anti-cheat server, authoritative player account system, or leaderboards.

## Technical structure
- `index.html` production entrypoint and `v30.html` alternate entry
- `v45-engine.js` live v4.5.1 rules, AI, new spells, progression, campaign execution, profile, and persistence (`v30-engine.js` is retained for historical builds)
- `v30-campaign-data.js` campaign and region definitions
- `v30-shell.js` bottom-tab navigation and campaign selector
- `v45-scene.js` live battlefield canvas with new effects, `v45-spell-art.js` WebP art adapter, and `v30-net.js` private duel networking
- `v32-celestial.css` illustrated v3.2 theme and layout
- `v34-art.js` earlier original art generator (now superseded for 7 cards by the premium v3.5 painted atlas)
- `v35-battle-art.js` premium card-art portraits plus matching transparent painted battlefield units and character-aware render routing
- `v33-art-fixes.css` and `v34-art.css` consistent card-grid proportions, readable names and rarity details
- `v32-details.js` presentation-only decoration and accurate trophy display
- `art/ui-*.svg` seven original self-hosted fantasy scene illustrations
- `sw.js` offline asset cache, `manifest.webmanifest` Home Screen support
- `V32_VISUAL_OVERHAUL.md` initial visual overhaul
- `V33_ART_CONSISTENCY.md` earlier art-pipeline attempt (superseded)
- `V34_ORIGINAL_ART_REBUILD.md` prior art reconstruction
- `V35_BATTLEFIELD_ART_UNITY.md` painted card-to-battlefield integration, spell effects, and limitations
- `V30_RELEASE_AND_TESTING.md` base campaign tests and `BALANCE_AUDIT_v22.md` earlier balance review

The personal domain `huntermakesgame.com` is not altered by this repository.

## v3.4 original art note
All 25 formerly geometric or recolored cards now have independently designed SVG illustration scenes, rasterized locally for a small-pixel look. The original seven richly illustrated atlas cards remain untouched. This is a new hand-drawn-in-code artwork pass, not 25 externally commissioned painted portraits; actual iPhone quality verification remains necessary.

## v3.5 battlefield visuals
Aether Titan, Abyssal Leviathan, Ember Adept and Thorn Warden now have painted transparent unit cutouts derived from their high-detail card paintings; Aeth Renewal uses the matching cleric as its heal effect. Six classic painted monsters are kept, while eight other new summons use themed painted stand-ins pending bespoke pose art. Meteor, ice, fire, shield, silence and heal effects have dedicated battlefield signatures. The tactical combat engine, XP, collection and saves remain unchanged. Real iPhone QA is still required.

## v3.6 painted roster and translation pass
- Introduces eight independent transparent pixel-fantasy sprite cutouts for Tidecaller, Storm Lancer, Wisp Familiar, Echo Scribe, Crypt Keeper, Rune Conductor, Dusk Reclaimer, and Oath Sentinel. These are painterly game sprites extracted from an illustrated 18-character sprite study, not eight independently hand-animated animations.
- All eight use their identical character cutout as the subject in the card library, over illustrated region backgrounds. This removes mismatched blocky card illustrations and hue-shifted unit stand-ins for those eight.
- The scene draws six existing classic painted monsters, four previously painted new creatures, and eight additional character sprites. The renderer no longer uses the eight recolored classic characters.
- Enemy affiliation is shown by red HP bars and ground auras without recoloring a character's actual artwork.
- Unit poses remain composited idle, movement, hit, attack and defeat transitions, not hand-drawn frame-by-frame animation sets. Sixteen-to-thirty-two-frame pose atlas work remains a future goal.
- No combat rules, save keys, player collections or campaign progression changed. iPhone hardware QA is still required.
- See `V36_PAINTED_ROSTER.md` for source mapping, limitations and tests.

## v3.7 art integrity update
Eight previously borrowed/recolored unit sprites (`p,k,d,o,y,z,A,B`) now render from eight individually illustrated character cutouts sourced from their exact card paintings. Ten previously geometric spell cards (`q,e,i,n,x,C,D,E,F,G`) have painted spell scenes in a separate self-hosted atlas. Seven classic original illustrations and seven prior premium illustrations are retained. `v37-art-unity.js` replaces v36's borrowed-card pipeline; `v30-scene.js` renders the correct eight-character atlas.

Artwork is precached for iPhone. Existing save schemas, campaign, match logic, AI and multiplayer code are unmodified. On-device visual regression testing and manually drawn per-frame animation remain outstanding.

## v3.8 QA and usability
A live browser smoke test checked the Commander's Hall, campaign battle, 32-card collection, map, and Forge. It also identified a Quick Battle flow obstructed by a browser-native confirmation. v3.8 replaces that prompt with an explicit in-game dialog that preserves existing match progress until the player chooses to replace it. See `V38_QA_REPORT.md` for results, supporting browser-session link, actual sprite transparency checks, and outstanding limitations. GitHub Pages may lag behind the latest `main` source commit while deployment/caches update.

## v4.0: ten distinct painted spell scenes
Quickstep, Frostbind, Ember Sigil, Rallying Cry, Purifying Rain, Echo Retrieval, Veil Snare, Twin Convergence, Fateful Exchange, and Null Chime now use ten original spell-themed painted images instead of reusing portraits of summonable creatures. New art is in `art/cards-spells-v40.webp` (1280×96; ten 128×96 cells). v37's character cards and painted battlefield sprites remain unchanged. The browser QA suite verified the eight new summons' movement and attacks (16/16) and confirmed the v3.8 Quick Battle confirmation works in live production. See the QA environment `qa-v39.html` (save-isolated) and `V40_RELEASE_QA.md` for full details.

## v4.1 — Interactive Riftfront world map
The Map tab is now a fully interactive illustrated four-region fantasy world matching the approved design. Twelve correctly gated campaign mission crests open real mission briefs (name, objectives, story, XP and gold), can launch battles, resume an unfinished mission or replay cleared missions, and preserve previous progression. Four chapter progress counters and the global sigil and mission totals remain live; horizontal pan and Fit Map work on mobile. Crown Trials retain their existing gated endgame controls. A dedicated source QA report is in `V41_LIVING_WORLD_MAP.md`.

**Published browser QA:** [v4.1 world map smoke test](https://agent.tinyfish.ai/runs/a2893c3e-0396-4017-ac27-6ce59394d4b6) confirmed the map asset, 12 markers, First Footsteps battle launch, locked Two Wells mission, in-progress mission return, and five tabs. iPhone hardware verification remains outstanding.

## v4.2 — Forge scroll fix
The Forge now scrolls the entire progression content as one touch-enabled panel rather than trapping vertical scrolling in a nested card list. The title, back action, and bottom tab dock stay visible. The `v42-forge-scroll.css` stylesheet is last-loaded, with a new service-worker cache. No saves or combat rules changed. Live-browser smoke testing confirmed v4.2 deploy and navigation; physical iPhone finger-swiping could not be simulated and still needs verification. See `V42_FORGE_SCROLL_FIX.md`.

## v4.3 — Living Battlefield (first pass)
New spell-specific canvas effects for 14 battle actions, smarter deterministic solo AI that evaluates springs, hazards, height, exposure, and decisive attacks, reduced redraw work outside combat, and refined combat HUD feedback. The 32-card roster and existing save format remain unchanged. This is the beginning of the v4.3 combat work—not the full animation overhaul. See `DOMINION_ROADMAP.md` and `V43_LIVING_BATTLEFIELD.md`.

**Live browser QA:** [v4.3 combat run](https://agent.tinyfish.ai/runs/60355e35-d0bd-43c3-81f2-e98a1270b8f4) reported 12/12 AI-turn legality checks, 16/16 movement and attack checks for eight newer summons, fourteen spell-effect types queued and visible battlefield rendering, and zero JS errors. Physical iPhone swipe/performance testing, longer balance audits, and real multiplayer are still pending.

## v4.3.1 motion and quality assurance
Seven character-role animation profiles now modify stride, hovering, hit anticipation and recoil for all 18 summonable units, keeping the original painted sprite artwork. Attack effects now differentiate archers, casters, assassins and mythic creatures. An isolated QA page adds an 18-unit animation-bound audit and multi-match solo AI stress checks. These are sprite transforms, not bespoke illustrated multi-frame spritesheets. Physical iPhone performance and gameplay balance remain outstanding. See V431_ANIMATION_QA.md.

## v4.3.2 — Real frame-sequence animations
Twelve painted character types now use an actual 264-cell WebP sprite atlas: 4 idle frames, 6 walking frames, 4 attack frames, 3 damage frames and 5 defeat frames per creature. The combat renderer selects real bitmap frames from movement and hit events, including a brief defeat sequence. Six remaining original painted units continue with the previous safe transform system. These are digitally reconstructed key poses from existing art, not separately illustrated art frames. The v4.3.2 isolated QA page has a **264 FRAME AUDIT** control. See `V432_SPRITE_FRAMES.md` for mappings and remaining art goals. Saves, card stats, campaign and multiplayer are unchanged.

## v4.3.3 — Six classic creatures gain discrete frames
The original six painted characters (v, r, b, s, f, g) now use 22 raster animation frames per creature, completing frame coverage for all 18 playable creatures (396 frames in total). A reusable offscreen canvas builds the 132 classic bitmap cells once from the original transparent art, using segmented motion for idle, walk, attack, hurt and defeat. These frames are synthesized from original artwork, rather than individually hand-drawn. The dedicated QA page adds a **CLASSIC 132 FRAMES** check. Gameplay rules, saves and upgrades are unchanged. See `V433_CLASSIC_FRAME_ANIMATIONS.md`.

## v4.4 — Mission-specific campaign encounters
All 12 Riftfront story missions and three Crown Trials now have named, scheduled tactical events: spring surges, rooted lanes, rotating frost/lava hazards, enemy flank reinforcements, guardian wards and the Mirror Court. These events run inside the real single-player game, are described in map briefings and displayed during battles, and keep the existing win conditions. The QA sandbox adds a 15-encounter audit. Existing version-4 solo saves, decks, upgrade profiles and online duel rules are preserved. See `V44_CAMPAIGN_DEPTH.md` for specifics and testing caveats.

## v4.4.1 — Signature champion and Crown Trial mechanics
Seven boss fights now include distinctive behavior at 65% and 30% HP: briar snares, reflection chills, volcanic fissures, Leviathan marks, Hollow King pursuit, Mirror Court retaliations, and Sovereign eruptions. Both phases and counterplay hints are explained in the illustrated world map before battle. A dedicated isolated QA action validates each boss and Mirror Court's 1-point reaction without changing real progression. Existing 15 signature battlefield encounters, 396 frames, and all saved content remain intact. See `V441_BOSS_PHASES.md`.

## v4.4.2 — Narrative campaign and tactical choices
All 15 campaign missions have a character-led opening scene and two authored preparation strategies. Players select a plan in the illustrated world-map mission briefing and start with meaningful benefits balanced by opening energy, Core health, or enemy resources. The chosen doctrine is saved inside the version-4 current match, without altering upgrades, mission unlocks, permanent collection or PvP. The isolated QA page tests all 30 doctrine/mission combinations. See `V442_STORY_EXPEDITIONS.md`.

## v4.4.3 — Post-battle stories and mission completion QA
Every campaign mission and Crown Trial now has its own narrated victory and defeat epilogue, displayed in a mobile-scrollable match-end panel alongside the expedition doctrine, event count, stars and one-time clear status. A 45-case save-isolated mission audit exercises loss, first victory and replay for all 15 missions, checking correct objective completion, unlocks, reward idempotence, and no double-claim. See `V443_CAMPAIGN_RESULTS_QA.md`. Physical iPhone Safari and statistical balancing remain pending.

## v4.4.4 — Strategy retry and tactical balance diagnostics
Restarting a mission now keeps the chosen preparation doctrine instead of reverting to the default. A dedicated, save-isolated QA control runs 60 actual-engine simulated campaign battles, matching two seeds across both available plans for all 15 missions. It checks battle legality and compares results by choice, mission and Core preservation. This is a basic bot benchmark rather than human win-rate data; no unvalidated card nerfs or boss buffs are introduced. See `V444_BALANCE_AUDIT.md`.

## v4.4.4 battlefield telegraphs
Campaign battles now show clear, read-only advance warnings before scripted spring pulses, reinforcements, thorn snares, changing frost/lava tiles, and champion ward effects. Weather telegraphs identify the next affected grid squares. Boss warnings announce approaching health-threshold phases; they are informational and never change battle mechanics. The warning banner is styled for mobile and ignores pointer input, preserving battlefield tile touch targets. An isolated QA control checks 15 encounter warnings and seven boss warnings, with optional live weather/boss previews. See `V444_BALANCE_AUDIT.md`.

## v4.4.5 — Tactical playtesting and targeted combat fixes
The save-isolated campaign testing bot now plays actual spell cards, chooses legal area targets, and can summon mythic creatures by sacrificing its own units, spending normal energy and preserving spring holders where possible. The 60-game QA report includes spell, summon, move and attack usage. The game itself now enforces the five-shield cap for Purifying Rain, and rival Planar Meteor AI considers empty blast centers between multiple targets rather than only enemy-occupied tiles. The QA panel includes SPELL & MYTHIC QA tests for those rules. All existing v4 saves, missions, cards, collection, premium painted art and Forge remain intact. See `V445_TACTICAL_QA.md`.

## v4.4.6 — Tactical objective clarity and focused balance verification
- Production battlefield status now displays real capture control/hold turns, defense survival/Core, champion HP, and enemy Core HP. The two-line responsive header avoids the previous single-line clipping of objective details.
- Improved **QA-only** objective priorities for capture/hunt, and added a memory-isolated **48 HARD-ENCOUNTER BATTLES** action for Oaths in Shadow, Crown Guardian and Hollow King. None of these bot changes affect real rival AI, card stats, campaign progression or rewards.
- In a published isolated browser test, 48 games completed with **21 wins and 0 invalid states**; 366 spells and 68 mythic summons were exercised. **4/4** targeted spell/mythic regression checks passed. The Hollow King remains challenging (1/16 bot wins); further human-caliber testing is required before balance changes.
- See `V446_OBJECTIVE_QA.md` for full details and testing limitations. Real iPhone Safari layout and touch performance have not yet been verified.

## v4.4.7–v4.4.8 — Crownfall fairness and campaign armory
The Hollow King's unique scheduled shadow-hunter reinforcement event now **replaces** generic reinforcement waves rather than stacking with them. His HP, attacks, boss transitions, and signature wave cadence remain unchanged. A memory-isolated 32-battle A/B check is available and documented in `V448_CROWNFALL_PREPARATION.md`.

In the illustrated mission briefing, **EDIT DECK** opens the existing functional 24-card builder. The briefing displays your real saved deck's unit/spell breakdown and average card upgrade level. Saved decks apply on the next new match and do not modify an ongoing battle. The new touch-friendly armory panel does not replace or overlay the painted map or tactical board.

The isolated QA page adds **KING CARD LEVELS · 96 BATTLES**, a deterministic test of uniform simulated card ranks. Source-executed logic checks passed 7/7 boss-phase cases and 30/30 preparation plans. The Hollow King outcomes varied sharply between hypothetical card levels, so no further unverified boss nerfs or new card art substitutes were shipped. Physical iPhone and final visual-browser QA are outstanding. See `V448_CROWNFALL_PREPARATION.md`.

## v4.4.9 — The Tactician's Note
The illustrated campaign briefing now reads your real selected 24-card deck and offers objective-aware preparation advice for capture, defend, hunt and assault, including authored boss counterplay and card-upgrade guidance for difficult trials. The panel sits directly before the real EDIT DECK action. It does not modify match saves, campaign progress or card upgrades. See `V449_TACTICIAN_BRIEFINGS.md`.

**v4.5 is being developed separately**, in `dev/v45-first-spell-batch`, with four experimental spells, tested mechanics and VFX. They are *not released* until their painted portraits and iPhone integration are finished. No existing card art has been replaced by procedural fallback.

## v4.5.1 — Four original spell additions (live)
The **first batch of the Great Card Expansion is shipped**: Starfall Lattice, Ashen Reprisal, Undertow and Dawn Edict add diagonal area attacks, one-use retaliation, positional displacement and shield-piercing attack setups. Each uses its own painted fantasy card art and battlefield effect. The total library now has **36 cards**, with a new eighth preset **ASTRAL — Position & Counterplay** (a legal 24-card deck with 16 summons and 8 spells).

**Testing:** Published isolated-browser QA passed all 12 targeted spell cases and 4/4 painted-image checks; 60 original-deck and 60 Astral-deck simulated battles had zero invalid states. A separate normal-game browser verified all 36 cards, the Astral preset, functional deck saving, and a progressing solo battle. Live physical iPhone touch/performance and two-device WebRTC still require verification.

Your original deck, upgrades, campaign clears and in-progress matches are preserved by the same local save keys; saving a different deck applies to your **next NEW match**, not a resumed battle. The long-term 60-card target has **24 additional cards still planned**. See `V451_RELEASE_AND_QA.md` for mechanics, limitations, and test evidence.

## v4.5.2 — Three-Deck Armory Vault
In the Commander's Armory, **DECK I, II and III** now store distinct, named 24-card combinations. Selecting a slot previews its cards, and **SAVE FOR NEXT MATCH** equips that slot; canceling does not change active strategy. The previously saved deck is automatically adopted as the primary slot without modifying the v20 deck key or any active battle, Forge XP, collection, campaign or profile save. The vault uses an additive local-only `aether-dominion-loadouts-v452` save key, and preserves all eight original/Astral deck presets. See `V452_ARMORY_LOADOUT_VAULT.md` for tests and limitations.
