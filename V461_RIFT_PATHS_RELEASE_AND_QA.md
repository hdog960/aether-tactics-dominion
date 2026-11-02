# Dominion v4.6.1 — Three Distinct Rift Paths

**Scope:** First major replayability expansion after v4.6.0. The live game already has 60 painted cards, three linked Gauntlet battles, an additive v21 commander profile and v4 local battle saves. This release adds three selectable Gauntlet variants, not new card IDs, not new PvP bonuses and not a save reset.

## Choose a path in the Commander's Hall

The path selection appears directly below **RIFT GAUNTLET** with three explicit buttons, clear records, an illustrated original Hall style, risk descriptions and first-clear gold previews. It is locked while a run is active or ready to continue. The selected path is stored on the run and the saved v4 battle; stage continuation cannot switch it.

| Rift Path | Starting player Core | Restored Core HP between victories | Enemy Core modifier | Additional starting resources | One-time extra gold on first full route clear |
|---|---:|---:|---:|---|---:|
| **Wayfinder** (original mode) | 24 | +4 | None | Original rules | None |
| **Stormbound** | 24 | +2 | +3 each stage | +2 starting Aeth each stage | 70 |
| **Ironbound** | 20 | +3 | +2 each stage | 1 extra shield for each of your two initial creatures | 100 |

The Stormbound and Ironbound rewards are **one-time, per path**, additive to the existing global first Gauntlet clear reward of 180 gold, 210 XP and one Aether Lanternist. Repeat path clears record successes but never reproduce route reward bonuses. These modifiers apply exclusively to Gauntlet PvE. Competitive private duels still equalize levels and do not use Gauntlet Core modifiers, shield bonuses or extra Aeth.

## Save compatibility and protection

Existing profile and save keys remain unchanged: `aether-dominion-profile-v21`, `aether-dominion-v04`, `aether-dominion-deck-v20`, and `aether-dominion-loadouts-v452`. Under the existing `profile.gauntlet` object, v4.6.1 adds only `pathClears` and `pathFirstRewards` dictionaries, and new runs store a `path` ID. Existing v4.6.0 runs without a path are treated as **Wayfinder** without wiping stage progress, previous first-clear rewards, decks or ranks.

The old v4.6.0 Gauntlet's anti-repeat guards remain in place: stage 2 and stage 3 require a claimed win against the matching run ID and stage, first-clear rewards cannot be duplicated by re-rendering, and abandoning a run does not permit stage skipping.

## Verification targets

- [v4.6.1 real-engine Rift Path tests](https://github.com/hdog960/aether-tactics-dominion/actions/workflows/v461-rules-qa.yml): new route behaviors, once-only bonuses, old profile compatibility, reload persistence and all older v4.6.0 stage/mastery scenarios; 180 simulated baseline and mixed matches; unchanged 60-card rules.
- [v4.6.1 actual phone-sized Chromium tests](https://github.com/hdog960/aether-tactics-dominion/actions/workflows/v461-browser-qa.yml): 390px Hall and 320px Hall with three selectable button targets; Stormbound and Ironbound start correctly; a saved Stormbound run resumes locked to the right route; the Forge mastery section remains functional; no JS errors.
- `tools/v461_release_guard.mjs` prevents changes to the 60-card artwork release flags, saved-data keys, synchronized production/QA sources or missing versioned PWA assets.

Real-device iPhone Safari and long-distance two-device WebRTC playtests still remain open. Browser and simulation QA cannot establish human multiplayer balance.

## Roadmap

Further v4.6 replayability and progression balancing can continue, followed by v4.7 multiplayer reliability. **Mandatory stop after v4.7** for the creator's roadmap review. Do not begin post-v4.7 work without that input.
