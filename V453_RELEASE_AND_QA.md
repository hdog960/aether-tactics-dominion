# Dominion v4.5.3 — Four Painted Creatures

## Four genuinely distinct cards
The collection expands from **36 to 40** cards with the same stable deck rules, upgrades, and collection persistence.

| Card | Cost | Innate gameplay |
|---|---:|---|
| **Zephyr Cartographer** (M) | 3 | On summon, refresh a nearby previously moved grounded ally's movement, once per round, without granting attacks or ignoring roots. |
| **Verdant Bastion** (N) | 4 | When holding an Aeth spring at turn start, give 1 shield to the nearest allied creature in range, up to the global shield cap. |
| **Cragsunder Duelist** (O) | 3 | First strike each round from elevated terrain strips up to 2 enemy unit shield before normal damage. |
| **Umbral Siphon** (P) | 4 | First strike each round against a shielded enemy transfers 1 shield to this creature, if below the cap. |

## Complete original character art
All four creatures have original, visually related **card portraits (512×96 shared atlas)**, **transparent full-body battlefield sprites (384×120 shared atlas)**, and **22 motion frames per unit (2112×480 shared atlas)**. Original art files:
- `art/cards-creatures-v453.webp`
- `art/units-creatures-v453.png`
- `art/battlefield-frames-v453.webp`
- `art/v453-art-manifest.json`

The staged code uses explicit M/N/O/P image mappings; no earlier unit sprites are used as fallback. The artwork pipeline rejects copied card crops, solid-background images, empty characters and insufficient pose variation. The 22 frames are derived through controlled character-art pose deformation from the same painted sprite, **not 22 independently hand-painted redrawings**. That limitation matters for future animation polish.

## Browser test evidence
GitHub Actions staging browser runs:
- **Artwork build**: https://github.com/hdog960/aether-tactics-dominion/actions/runs/41357754762 — three binary assets generated and committed after transparency, uniqueness, dimensions, and frame validation.
- **390px real Chromium smoke test**: https://github.com/hdog960/aether-tactics-dominion/actions/runs/41358036582 — art gate PASSED, four unique cards and sprites, original art dimensions valid, 13/13 creature rules, 12/12 spell rules, 8/8 vault checks, 7/7 boss cases, 30/30 story choices, 60 actual-engine tactical simulations, 36 bot wins and 0 invalid combat states. **No page JS errors.**
- **Real battlefield visual capture**: https://github.com/hdog960/aether-tactics-dominion/actions/runs/41358234411 — all four characters displayed together inside actual 390px game board; feet, silhouettes, shields, blades and flight details visibly distinct.
- **Normal production entrypoint/collection check PASSED**: https://github.com/hdog960/aether-tactics-dominion/actions/runs/41358509289 — the non-QA `index.html` displayed **exactly 40** collectible cards, including all four named M/N/O/P creatures with working painted artwork. Existing deck size remained **24**, all browser JavaScript checks passed. QA also re-ran staged 13/13 creature rules, 12/12 spell rules, 8/8 vault, 7/7 bosses, 30/30 doctrines, and 60/60 tactical simulations with **zero invalid states**.

These are automated browser, engine and visually reviewed screenshot checks, not physical iPhone Safari or human balance playtests.

## Persistence and compatibility
- Existing canonical 24-card selected deck: `aether-dominion-deck-v20`.
- Existing 3-slot vault: `aether-dominion-loadouts-v452`.
- Existing profile and campaign progress: `aether-dominion-profile-v21`.
- Saved match snapshot: `aether-dominion-v04` (version 4).

The build makes no destructive migrations, resets or changes to these keys. The four new cards are *available for deck building* but never forcibly inserted into a previously saved deck or an in-progress battle. The game retains the existing eight presets.

## Important remaining tests
Real physical iPhone Safari and installed Home Screen app GPU/memory/touch testing have not yet been performed. True two-device WebRTC remains a v4.7 goal. The automated 60-battle heuristic is not a human win-rate claim.

## Next scheduled work
Continue the staged roster expansion toward **60 cards** during v4.5.4–v4.5.8; then v4.6 Rift Gauntlet, mastery/replayability and progression; then v4.7 real-device private duels/multiplayer reliability. **STOP immediately after completing v4.7 and wait for the creator to determine the next direction.**
