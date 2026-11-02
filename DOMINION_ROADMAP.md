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

### v4.5.3 — Four New Painted Creature Cards (shipped)
Expanded the collection **36 → 40** with Zephyr Cartographer, Verdant Bastion, Cragsunder Duelist and Umbral Siphon. Each has unique actual combat mechanics, its own original painting, corresponding transparent battlefield cutout, and 22 motion frames. Isolated Chromium QA at 390px verified four distinct images, asset sizes, all new creature rules, original spell/boss/campaign regressions, 60 legal-action battles, and the normal 40-card collection. All previous saves, presets and three Armory decks remain compatible. See `V453_RELEASE_AND_QA.md`. Physical iPhone and two-device duel QA remain open.

### v4.5.4 — Four Additional Painted Creature Cards (shipped)
Expanded the collection **40 → 44** with Tideglass Oracle (spell-shield synergy), Ashen Harrier (post-flank movement), Gravebloom Warden (defeat-root control), and Stormvault Artificer (trap disarming). Each has a genuine original painted card image, identity-matched transparent battlefield sprite, 22-frame motion row, authoritative bounded mechanics and mobile-sized Chromium QA. Release candidate passed 14/14 new rule checks, previous spell/boss/story/deck checks and 120 total campaign simulations without invalid states. The normal Codex showed 44 cards and the existing three deck slots remain available. See `V454_RELEASE_AND_QA.md`.

### v4.5.5 — Four Painted Tactical Spells (shipped)
Added **Mirror Breach**, **Gale Step**, **Ember Covenant** and **Crescent Refrain**, expanding the collection **44 → 48**. Four distinct original narrative paintings and matching battlefield VFX support real shield breaking, safe one-tile relocation, team-strengthening voluntary sacrifice and status-based chain attacks. Tests passed 15 new spell cases (including ambiguous-target safety), every prior creature, spell, boss and deck-vault regression, 120 simulated campaigns with zero invalid states and the normal mobile-sized 48-card Grimoire. All prior saved player/deck/campaign keys remain unchanged. See `V455_RELEASE_AND_QA.md`.

### v4.5.6 — Four Original Painted Creature Roles (shipped)
Expanded **48 → 52** with Gloam Bellkeeper, Cinderjaw Prowler, Oathmoss Devourer, and Tidebreak Herald. Each uses a distinctive new painted character, original-source-matched full-body transparent battlefield sprite, 22 motion frames, unique triggered combat effect and a bounded real-engine ability. GitHub QA checked the 52-card real Grimoire, 88 actual on-board animation cells, saves/decks/upgrades, all existing mechanics and 120 legal battle simulations without invalid states. See `V456_RELEASE_AND_QA.md`. Physical iPhone and live remote duel tests remain open.

### v4.5.7 — Four Original Painted Tactical Spells (shipped)
Expanded **52 → 56** with Gravemire Ring (two-target root), Prism Relay (transfer 2 shield plus once-round movement refresh), Cinder Bloom (bounded dual burn), and Tidal Reprieve (group healing). All are original painted spells with distinctive live battlefield FX, preserved save/Armory schemas and real-engine team-aware targeting. The 16 new rule tests, all prior regressions, 180 automated simulated battles and mobile-sized painted 56-card Grimoire/Armory tests passed. See `V457_RELEASE_AND_QA.md`. Physical iPhone and long-distance duel verification remain open.

### v4.5.8 — Final Four Painted Creatures (60 cards, completed)
Expanded **56 → 60** with Aether Lanternist (affliction cleanse), Vesper Kestrel (move-triggered debuff), Hollowroot Collector (status-dependent Aeth refund) and Rimeshard Sentinel (survival-triggered warding). All use original painted character images, matched full-body transparent field sprites, 22 pose-derived motion frames per creature and unique combat feedback. Real-engine regressions, 180 AI simulations, strict artwork provenance and 390px/320px browser visual acceptance are recorded in `V458_RELEASE_AND_QA.md`. Physical iPhone and cross-network two-device tests remain open.

### v4.6.0 — Rift Gauntlet and Card Mastery (first replayability release)
Added a complete three-stage **Rift Gauntlet**, accessible from the Commander's Hall: Whispering Gate (verdant), Frostbound Passage (real frost hazards) and Crownfall Reckoning (armored final guardian, real arcane hazards). The 24-card deck and ranks are locked for each run; the player's Core HP carries between victories with only +4 reprieve; failure ends an attempt. Resume and stage rewards use additive, replay-safe profile fields, with a once-only 180 gold/210 XP/Aether Lanternist first-clear reward. Card Mastery now awards Bronze/Silver/Gold at 4/12/30 distinct solo match participations, one-time gold rewards on winning matches, and visible Forge progression. Source of truth: `V460_GAUNTLET_AND_MASTERY_QA.md`. Physical iPhone Safari and long-distance two-device testing remain open.

### v4.6.1 — Three Rift Paths (completed)
Players can select **Wayfinder** (classic +4 recovery), **Stormbound** (+2 Core recovery, tougher enemies, +2 starting Aeth) or **Ironbound** (starts with 20 Core HP, +3 recovery, +1 opening shields, tougher enemies) before starting a new run. Distinct route clears and once-only 70/100-gold challenge trophies persist across reloads, preserve old Wayfinder runs, and never alter competitive PvP rules. The 60-card game and Forge mastery system are unchanged. See `V461_RIFT_PATHS_RELEASE_AND_QA.md`.

### v4.6.2 — Full Mastery Codex & Career Contracts (completed)
Forge now displays mastery progress for **all 60 cards** with PROGRESS, ALL 60 and GOLD filters, instead of only the six most-played cards. Six persistent one-time career contracts reward earning different Bronze/Silver/Gold masteries, winning with eight distinct cards, and clearing two or three Rift Paths. Contract payouts total a bounded 615 gold over the entire account and only claim on actual solo wins; no special multiplayer benefits or saved data reset. The `V462_MASTERY_CODEX_AND_CONTRACTS_QA.md` report covers gameplay, save and mobile browser checks. Physical iPhone and remote two-device play remain unverified.

### v4.6.3 — Optional Rotating Rift Flux (completed)
Added **Rift Flux**: an optional three-omen encounter variant for any Gauntlet path, with three different saved stage conditions per run. Aeth Tide (+2 Aeth both players), Warden Patrol (shielded enemy soldier, +1 player Aeth), Siege Lines (+4 enemy Core, +1 player Aeth and one opening card), and Veil of Wards (+1 shield to early summons on both teams) rotate across attempts. Hall previews each exact omen and locks changes during a run. The first complete Flux clear earns **60 gold only once**; subsequent clears advance a permanent counter. Classic Gauntlet remains the default, and older runs/playthrough saves keep their original rules. The live 60-card collection, Forge Masteries, Rift Paths and level-equalized PvP are unchanged. Source: `V463_RIFT_FLUX_RELEASE_AND_QA.md`.

### v4.6.4 — Rift Chronicle and honest rematch polish (completed)
Twelve-entry per-run Chronicle, separated classic/Flux best surviving Core by path, accurate real-time Core in the Commander’s Hall, true path enemy-Core forecasts, and automatic abandonment records when switching game modes. Fixes a results-screen rematch bug that previously reset route/Flux to classic Wayfinder. No new rewards, game-altering ranks, card IDs, save keys or duel advantages. QA and browser evidence: `V464_CHRONICLE_RELEASE_AND_QA.md`.

### v4.6 — Further Replayability & Progression (in progress)
Continue with more varied Gauntlet challenges, longer-term mastery objectives, progression pacing and anti-repeat safeguards. Never reset existing save keys or inflate stat power in private duels.

### v4.7 — Multiplayer Reliability (in progress)
**v4.7.0:** Bounded and sequenced private duel messages, host revision checks, accepted/rejected ACK snapshots, one-order-at-a-time guest controls, immutable opponent decks after handshake, real match reconnect/recovery, stale room callback guards, clearer battlefield link status and automated mock-peer / browser QA. No solo balance or saved-key changes. Details: `V470_PRIVATE_DUEL_RELIABILITY.md`.

**v4.7.1:** Lost acknowledgment recovery: original-sequence bounded retransmissions, host-specific `ackSeq` receipts on accepted/rejected moves, safe read-only snapshot requests, 700ms transport throttling, manual **SYNC DUEL** action, Safari wake resync, and matching-ACK guest controls. Designed to prevent repeated combat effects and stuck awaiting-host states. Automated QA: `V471_LOST_ACK_RECOVERY_QA.md`.

**Remaining acceptance gate:** Real two-device iPhone Safari duel across independent Wi-Fi/cellular networks, reconnect test matrix and network failure handling; only after independent human/device verification can v4.7 be called complete. No claim of current production matchmaking, authoritative accounts, anti-cheat or ranked mode. Then **STOP** for creator roadmap review.

## Mandatory stopping point after v4.7
**User-approved development boundary:** Complete v4.5 card expansion, v4.6 progression/replayability and v4.7 multiplayer reliability, then **STOP** and ask the creator for fresh direction. Do not begin v5.0, a new expansion, a revised monetization plan, or any post-v4.7 roadmap without the creator's input. This is a future stop condition, **not** a statement that v4.7 is completed.

## Safety and preservation
Protect version 4 match save and existing commander profile keys. Keep all new testing on the separate isolated QA route; do not clear real player saves. Home Screen cache updates must use versioned assets.
