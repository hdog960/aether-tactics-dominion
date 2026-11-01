# Aether Tactics: Dominion — Development Roadmap

## Delivery order
This roadmap is incremental. Future versions below are plans, not completed work.

### v4.3 — The Living Battlefield
- **v4.3 first implemented pass:** distinct spell and buff visual signatures drawn by the actual isometric scene; solo AI positional evaluation (spring control, elevation, hazard avoidance, threat pressure, finishing blows); energy and action legality preserved; battlefield canvas pauses when hidden and supports reduced-motion frame pacing; battle CSS feedback improved.
- **Next within v4.3:** animation keyframes for individual character categories, meaningful animation of spell contacts, timing polish, benchmark under real iPhone Safari, touch/scroll verification and accessibility review.
- **QA:** isolated legal action tests, 12-turn solo AI simulations, screenshots of new spell VFX, existing progression/save stability, two viewport sizes.

### v4.4 — Campaign Depth
Expand existing 12 missions with distinct encounter scripts (reinforcement warnings, objective pressure, region hazards) and authored story beats, without rewriting the world map or unlocking content accidentally. Balance the 3 Crown Trials so each phase feels unique.

### v4.4.6 — Objective Clarity & Focused QA (shipped)
Battle HUD now reports live mission victory conditions in a mobile-readable layout. QA-only objective behavior was corrected and 48 focused battle sessions were run on difficult missions. More human-level Hollow King review remains necessary; no premature champion nerfs. See `V446_OBJECTIVE_QA.md`.

### v4.4.7–v4.4.8 — Crownfall Fairness & Deck Preparation (shipped)
The Hollow King's authored reinforcement waves no longer stack with the generic campaign spawn schedule. A/B combat comparison and uniform-card-level sensitivity QA now exist. Players can inspect their actual loadout and jump to the fully functional deck builder directly from an illustrated campaign briefing. These changes preserve in-progress battles and saved upgrades. See `V448_CROWNFALL_PREPARATION.md`.

### v4.4.9 — Deck-aware Campaign Counsel (shipped)
The real world-map mission briefing now reads the current saved deck, the authored objective and boss counterplay, then shows preparation and upgrade suggestions. No save schema, card levels, enemy balance or artwork changed. See `V449_TACTICIAN_BRIEFINGS.md`.

### v4.5.1 — The Great Card Expansion, first batch (shipped)
Four new illustrated spell cards have been added: **Starfall Lattice, Ashen Reprisal, Undertow and Dawn Edict**. A new art-gated **ASTRAL** playstyle provides the eighth valid premade 24-card deck, with original 32 cards and legacy deck/progression keys intact. Card art is loaded from four distinct 128×96 painted fantasy surfaces, with corresponding battlefield spell effects. Live browser QA passed all 12 spell rules, all four art crops, and 60/60 initial tactical simulations without invalid states. See `V451_RELEASE_AND_QA.md` for verified results and limitations.

### v4.5.2 — Three Saved Deck Loadouts (shipped)
Players can save and name three complete 24-card decks in the existing Armory, preview them safely, then equip one for the next match. Existing current deck and progress save keys remain authoritative and unchanged. All 36 cards, eight preset strategies, upgrade paths and in-progress battles are preserved. Source QA passed 8/8 vault state checks, 60-game campaign regression, and 12/12 spell checks. See `V452_ARMORY_LOADOUT_VAULT.md`.

### v4.5.3 onward — 24 more cards to reach 60 (planned)
Grow the current **36-card** library toward **60** in small polished batches of distinctive units and spells across sacrifice, flying, terrain control, counterplay and frontline archetypes. A creature is not ready to ship until the illustration, transparent battlefield cutout, animation frames, card reference, true behavior and balance tests all match. Continue protecting the 24-card deck restrictions, existing achievements and save progression. First planned batch includes truly different units and matching battlefield art; do not ship flat shape icons, recolors, or concept-only mockups as real assets.

### v4.6 — Progression & Replayability
Rift Gauntlet, milestone rewards, mastery challenges, progression pacing and long-run variety. Include challenge reset safeguards and migration tests.

### v4.7 — Multiplayer Reliability
First prove private duel between actual devices and network configurations. Only then plan authoritative profiles, matchmaking/ranking, and seasonal rewards. Do not advertise ranked matchmaking as currently available.

## Mandatory stopping point after v4.7
**User-approved development boundary:** Complete v4.5 card expansion, v4.6 progression/replayability and v4.7 multiplayer reliability, then **STOP** and ask the creator for fresh direction. Do not begin v5.0, a new expansion, a revised monetization plan, or any post-v4.7 roadmap without the creator's input. This is a future stop condition, **not** a statement that v4.7 is completed.

## Safety and preservation
Protect version 4 match save and existing commander profile keys. Keep all new testing on the separate isolated QA route; do not clear real player saves. Home Screen cache updates must use versioned assets.
