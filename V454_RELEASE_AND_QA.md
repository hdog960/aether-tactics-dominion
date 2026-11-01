# Dominion v4.5.4 — Painted Second Creature Batch · Release and QA

**Release candidate:** 44 collectible cards, up from 40. Prepared and tested on `dev/v454-second-creatures`, then promoted to GitHub Pages only after all browser QA checks were green.

## Four original creature cards
| Card | Cost | Character art | Actual ability |
| --- | ---: | --- | --- |
| **Tideglass Oracle** (Q) | 3 | Blue-green seafaring astrologer with a physical astrolabe and cresting tide | First successful allied spell per round grants one nearby *other* ally a shield, maximum five |
| **Ashen Harrier** (R) | 3 | Jackal-headed copper-armored flanking fighter with a hooked blade | First basic strike against a creature next to another ally each round refreshes **movement only** |
| **Gravebloom Warden** (S) | 4 | Black-bark porcelain and glowing plum flower guardian | On defeat, roots the nearest non-boss enemy within two squares; does not prevent attacking |
| **Stormvault Artificer** (T) | 3 | Cobalt-coated mechanic with electrical coil and specialized disarming tools | On surviving a summon, disarms the nearest enemy snare within two squares, earning one shield |

Their logic runs in authoritative saved-game/online-host combat rules, not merely the Grimoire descriptions. Nonstacking limits, maximum shield, flanking geometry, trap ownership, boss immunity and placement-trap death are enforced.

## Real production assets and exact dimensions
- Original commissioned-for-this-game AI-generated **source sheet**: `art/sources/v454-original-characters.png`, archived in the repository to make the assets reproducible.
- Four card crops: `art/cards-creatures-v454.webp`, 512×96 (4 x 128×96).
- Transparent full-body sprites: `art/units-creatures-v454.png`, 384×120 (4 x 96×120).
- 88-frame motion atlas: `art/battlefield-frames-v454.webp`, 2112×480 (4 rows x 22 frames).
- `art/v454-art-manifest.json` has v4.5.4 dimensions and source mapping.
- `v454-creature-art.js` independently validates four distinct image crops and real transparent nonempty sprites, while the renderer uses exact, non-recycled frame rows Q/R/S/T.
- Animation frames were derived from each original painted character by systematic pose deformation (idle 4, walk 6, strike 4, hit 3, defeat 5). They are **not 22 individually hand-painted frames**; hand-authored fluid animation polish remains appropriate later.

## Verified GitHub tests
- [Original painted art generation and asset acceptance](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41362265146) — source image downloaded, four different character cutouts extracted and all 88 animation cells generated; unique-image, alpha-transparency, dimension and frame-diversity tests passed.
- [Source and game-engine staging regression](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41362844968) — **14/14** new creature-rule checks, **13/13** previous creature tests, **12/12** spell checks, **8/8** Armory loadout checks, **7/7** boss-phase checks, **30/30** pre-mission plan checks. Existing and mixed-deck automated simulations each finished **60/60** matches, **0** invalid battle states.
- [Real 390px mobile Chromium visual QA](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41362611086) — all four original portraits linked correctly to their full-body transparent counterparts; actual game-battlefield screenshots captured, sprites legible and feet visible on tiles, no JS errors.
- [Staged 44-card release acceptance](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41362808661) — real browser loaded standard `index.html` and exactly **44** Grimoire entries including Q/R/S/T; all painted art and frame sources loaded; selected active deck remained **24 cards** and all **three saved loadout slots** remained available; no browser errors.
- New experimental deck usage in 60 simulated battles: Q 37 summons, R 40, S 47, T 34. The bot won 25 of 60 compared with the baseline's 38 of 60, **not a controlled human win-rate or fully conclusive balance measurement**.

## Progress and storage safety
- **Unchanged keys**: `aether-dominion-deck-v20`, `aether-dominion-loadouts-v452`, `aether-dominion-profile-v21`, and version-4 match snapshots.
- No forced deck modifications, XP/reward resets, campaign progress resets, or collection substitutions. Unlocked old cards and eight deck presets remain intact.
- PWA service-worker cache changed to `aether-dominion-v454-four-painted-creatures-20261101` and now includes all three image atlases, after they passed art tests.
- GitHub staging kept separate until acceptance, then a non-force fast-forward to public `main`.

## Known limits and next milestones
Physical iPhone Safari/Homescreen device memory, touch ergonomics and multiple-device WebRTC are **not** yet proven by CI's simulated mobile viewport. Source-level AI simulations do not represent human difficulty tuning. Card art was inspected visually at actual display scale, and more sophisticated individualized hand-authored animation may be desirable.

Continue v4.5.5–v4.5.8 to reach **60 cards**, then v4.6 progression/replayability and v4.7 multiplayer reliability. **Mandatory STOP when v4.7 is complete for the creator to decide the subsequent roadmap.**
