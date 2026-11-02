# Dominion v4.6.4 — Rift Chronicle, Honest Rematches and Challenge Clarity

## Goal
Finish v4.6 by improving progression feedback and making repeat Gauntlet attempts honest and meaningful without introducing extra grind rewards, inflation, PvP advantages, or an additional mandatory mode.

## Real engine changes
- The Commander’s Hall previews exact enemy Core HP for stages I, II and III and the selected path's starting Core/recovery rules. Wayfinder: 24/27/30, Stormbound: 27/30/33, Ironbound: 26/29/32.
- During an active run, Hall status shows live player Core HP from the current match rather than the stale value saved at the start of the stage. A won stage still shows the carried-over Core HP.
- The last **12 terminal attempts** are stored in an additive `profile.gauntlet.chronicle` list. Each result is stamped once per run ID and records path, Flux opt-in, stages reached, wins, surviving Core and whether it was cleared, defeated or abandoned. The Hall shows the latest four.
- Each path tracks its best surviving Core on a full three-stage clear. **Classic and Flux high-water marks are independent**. A weaker new run never overwrites a stronger result. Older successful attempts remain counted in the existing path clear counters, but no fabricated historical Chronicle entries are synthesized for old saves.
- Exiting a live run to quick battle, another campaign mission or private duel now records the old run as abandoned instead of leaving the Hall falsely locked to it.
- The results-screen REPLAY action retains the completed route and optional Flux choice. It no longer silently returns an Ironbound/Stormbound replay to Wayfinder or turns Flux OFF.
- Recording history does not grant gold, XP, card copies, upgrade ranks, trophies or online advantages. All old v4, v21, v20 and v452 storage keys remain unchanged.

## Save and cache protection
The Chronicle and two best-by-path dictionaries are additive fields inside the existing `aether-dominion-profile-v21` key. Missing fields in a saved older profile default safely to empty data. Records are bounded to twelve. The source and QA engines are kept identical. The production HTML entrypoints load versioned v4.6.4 engine, new Hall CSS, and Hall script; the service worker uses a new cache namespace.

## Tests and release gates
- `node tools/v464_rules_qa.mjs`: 12 new real-engine Chronicle tests plus the previous v4.6.3 Flux, v4.6.2 contracts, v4.6.1 paths, v4.6.0 Gauntlet, card releases, bosses, story plan and 180 simulated combat regressions.
- `node tools/v464_release_guard.mjs`: fails on missing UI/offline dependencies, broken source sync, renamed saves, missing 60-card roster, mode-reset regression or lost mandatory v4.7 stopping point.
- `node tools/v464_browser_qa.mjs`: actual Chromium rendering at 390px and 320px, correct enemy Core forecasts for all three paths, Flux interactions, latest four Chronicle records, Forge filters, run resume and actual abandoned-run registration.

**Important limits:** Passing automated simulations/Chromium does not prove physical iPhone Safari tap, storage lifetime or thermal performance. True remote two-device private WebRTC duels still require v4.7 verification.

## Milestone boundary
This is final v4.6 replayability/clarity work. Next is **v4.7 multiplayer reliability**. **STOP after v4.7** for the creator's review; do not begin v5.0 without explicit direction.
