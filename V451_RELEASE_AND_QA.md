# Aether Tactics: Dominion — v4.5.1 First Four Spell Expansion

Released: November 1, 2026
Status: **LIVE on GitHub Pages** — https://hdog960.github.io/aether-tactics-dominion/

## The Great Card Expansion, first batch
The collection grows from **32 to 36 distinct cards**. All four newly playable cards are **spells**, not creature summons; they do not require battlefield character sprite silhouettes. Their card illustrations use four different newly cropped generated fantasy paintings stored in the real 512×96 `art/cards-spells-v45.webp` file, and each action has its own frame-timed effect in `v45-scene.js`. The art is not a screenshot from the early promotional concept board and is not reused as a blanket icon.

| Card | Aeth | Mechanic |
|---|---:|---|
| **Starfall Lattice (H)** | 4 | Choose a legal center within 3 of any ally, then deal 2 damage to enemies on the four diagonally neighboring tiles (not the center). Shield absorption applies; enemy Core can be struck on a diagonal. |
| **Ashen Reprisal (I)** | 2 | Give one allied unit 2 shield up to the global five-shield cap and a single 1-damage retaliation against the next physical attack if it survives that attack. The ward does not stack and expires by that unit's next turn. |
| **Undertow (J)** | 3 | Deal 1 damage to a non-boss enemy and move it one open square closer to the nearest eligible allied creature. No wall, Core, occupied-square, or boss displacement. A legal landing can activate a snare. |
| **Dawn Edict (K)** | 3 | Give an unspent allied creature's next physical attack +1 damage and strip up to 3 shield beforehand, consumed on that strike and expiring by its next turn. No additional attack. |

## New tactical deck and progression
- **ASTRAL — Position & Counterplay** preset is an 8th playable deck archetype. It has 24 legal cards: **16 summons, 8 spells**, using exactly 2 copies of each of H/I/J/K and retaining 16 already-illustrated creature slots.
- Original seven presets, all existing cards, 24-card deck size, 3 copies/card maximum, 12 creature minimum, 3 distinct creature minimum, 2 mythics maximum, Forge upgrades, illustrated map and campaign choices remain.
- Existing deck key `aether-dominion-deck-v20`, profile `aether-dominion-profile-v21`, and battle save `aether-dominion-v04` are unchanged. The expansion does not wipe or migrate user saves. Already-running matches retain their old decks when a new preset is saved; the new deck is used in a **new match**.
- New H/I/J/K can be obtained as card-copy rewards by playing a deck containing them; all are initially available as level-one deck selections, consistent with preexisting cards.

## Engine and art integration
- Normal public `index.html` and `v30.html` now load `v45-engine.js?v=451`, `v45-scene.js?v=451`, and `v45-spell-art.js?v=4502` in addition to the authoritative legacy atlas adapters. Explicit `window.DOMINION_V45_ART_RELEASE=true` enables the four illustrated spells in public decks.
- The native atlas `art/cards-spells-v45.webp?v=4501` is precached alongside the new runtime in a versioned service worker. Missing/loading art does not revert to primitive geometric figures.
- The staging branch `dev/v45-first-spell-batch` remains available. The live `qa-v39.html` deliberately uses isolated copies of the expansion runtime and QA script, with **in-memory saves**, to prevent QA tests from mutating player progression.

## Verified tests
**Source-driven real-engine rules** executed in mock DOM/in-memory storage:
- New spells **12/12 legal-action checks**, including unique area targeting, shield consumption, correct Aeth costs, lethal retaliation, maximum shield, buff expiry, champion immunity, rock collision, and old version-four save roundtrip.
- **7/7** unique boss-phase regression checks, **30/30** expedition preparation plan checks.
- Original balanced deck: **60 completed battles, 38 test-agent wins, 0 invalid states**.
- New Astral card mix: **60 completed battles, 27 test-agent wins, 0 invalid states**. New-card actions logged in the actual legal combat pipeline: I=104, H=93, K=44, J=25 across these trials. These results are deterministic bot tests, **not** human balance estimates.

**Live browser QA, save-isolated route:** https://agent.tinyfish.ai/runs/8775e10c-15ce-4c6a-a748-3fcad4ea49d1
- The committed 512×96 WebP image loaded; all **four independent art crops** generated distinct PNG card surfaces with no errors.
- All **12/12** rule checks passed in the deployed browser.
- 36-card library displayed and the normal 60-game QA suite passed, zero invalid states.

**Live normal-game browser acceptance:** https://agent.tinyfish.ai/runs/dd26561f-b63c-40c2-a404-ec8125eded94
- Normal public page title confirmed **v4.5.1**; all five bottom navigation tabs loaded.
- The full 36-card collection and the four new cards were displayed with art, costs, and mechanics; no broken art placeholders reported.
- Original Balanced preset still 24/24. **ASTRAL** selectable and saved with 16 creatures and 8 spells, including 2 copies of each new spell.
- Solo battle loaded with painted battlefield scenery, current HP, cards, Aeth, and functioning END TURN. A round advanced and rival AI acted, without reported page errors.
- The solo match resumed an existing hand before the new preset was used; that is expected and is NOT proof new cards were dealt in this browser session. The mock-engine scenarios and isolated QA verified their game rules directly.

## Still not verified
- **Physical iPhone Safari and installed Home Screen PWA:** new card targeting, finger touch hitboxes, scroll performance, GPU memory pressure, and offline PWA cache update.
- **Actual live two-device WebRTC private duel** with the expanded decks.
- Human win-rate balance for the new Astral archetype and full campaign/Crown Trial playthroughs.
- Player response to the final painted illustrations at small-screen size.

## Future roadmap
The original longer-term **~60-card** target remains, so **24 additional cards** are still planned after this first four-spell batch. Next batches should include truly distinct creatures with matching portrait AND battlefield cutouts/frames, not flat sprites or recolored placeholders. Build slowly, with legible art and unit/card matching before publication. Additional boss/mode progression and replayability follow the existing v4.6 and v4.7 roadmap. Do not represent any promotional mockup containing unimplemented cards or features as a screenshot from the playable game.
