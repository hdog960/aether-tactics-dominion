# Dominion v4.5.6 — Four Creature Roles (staging; not publicly released)

## Current release boundary

The public game remains **v4.5.5 with 48 cards**. The four new creatures are implemented and their targeting rules are tested, but their original painted character source art has **not yet been transferred into GitHub**. Do not activate `DOMINION_V456_ART_RELEASE`, merge this development branch to `main`, publish dummy images, or claim the collection is 52 cards until that artwork is genuinely uploaded, processed, and visually inspected.

## Implemented creatures and combat rules

| Key | Card | Cost, HP, ATK, Range, Move | Actual distinctive interaction |
|---|---|---|---|
| `Y` | **Gloam Bellkeeper** | 3 / 4 / 1 / 2 / 2 | On summoning alive, weaken the nearest nonboss enemy within two tiles by 1 on its next basic attack; preserve a stronger existing hex. Cannot affect champions or enemy Cores. |
| `Z` | **Cinderjaw Prowler** | 3 / 5 / 2 / 1 / 3 | Once per round, striking an already burning enemy creature ignites one different enemy creature within two tiles of the victim. Never spreads from an unburned enemy or a Core. |
| `aa` | **Oathmoss Devourer** | 4 / 7 / 2 / 1 / 1 | After a voluntary ally sacrifice (mythic, Fateful Exchange or Ember Covenant), restore up to 2 HP to the Devourer once per round. Ordinary deaths never count. |
| `ab` | **Tidebreak Herald** | 3 / 5 / 1 / 2 / 3 | On first **move** onto an Aeth spring each round, gain 1 shield and regenerate 1 Aeth (max 10). A lethal hostile snare triggers before any spring reward. Summoning directly on a spring is not a move. |

The two multi-character keys `aa` and `ab` remain ordinary string card keys in the established save/collection schema. No migrations or resets needed.

## Real GitHub verification

- [Actual source-engine combat regression](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41372380559) — **19/19** new checks, 15/15 v4.5.5 spells, 14/14 v4.5.4 creatures, 13/13 v4.5.3 creatures, 12/12 older spells, 8/8 deck vault, 7/7 bosses, 30/30 expedition plans. **120/120** simulated battles with no invalid states.
- In 60 mixed-deck simulated missions, the QA agent played Bellkeeper **37** times, Prowler **37**, Devourer **45**, Herald **29**. The experimental deck won 25/60 and the baseline won 38/60; simulations do not measure human win rates and further balance review is appropriate.
- [Real 390px Chromium staging safety checks](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41372830040) — passed with 48 cards in the ordinary collection, 24 in the active selected deck, all three saved slots, the v4.5.6 art gate explicitly **BLOCKED**, and no browser JS errors.
- `v45-engine.js` and `v45-qa-engine.js` are synchronized, as are `v45-scene.js` and `v45-qa-scene.js`.

## Artwork blocker and one-file import

A fresh original four-character painting has been generated through the connected image generator, showing Gloam Bellkeeper, Cinderjaw Prowler, Oathmoss Devourer and Tidebreak Herald in **that 2×2 order**. The user can save the painting from the generated image preview, name it **`v456-original-characters.png`**, then upload it using the GitHub Files upload interface to **`art/sources/` on branch `dev/v456-four-creatures`**, not `main`:

https://github.com/hdog960/aether-tactics-dominion/upload/dev/v456-four-creatures/art/sources

The [automated import workflow](https://github.com/hdog960/aether-tactics-dominion/blob/dev/v456-four-creatures/.github/workflows/v456-build-from-source.yml) then:
1. Requires the original source image (no silent placeholders).
2. Runs `tools/v456_build_art.py`, extracting transparent cutouts and generating the matched card, cutout and 88-frame animation atlases.
3. Checks portrait uniqueness, alpha transparency, character opacity, exact dimensions and a minimum of 18 distinct frames per character.
4. Commits the artifacts **only to staging**, never public `main`.

Expected verified outputs are `art/cards-creatures-v456.webp` (512×96), `art/units-creatures-v456.png` (384×120), `art/battlefield-frames-v456.webp` (2112×480), `art/v456-art-manifest.json`.

These pose frames are mechanically deformed from the actual hand-painterly original source sheet, **not** independently hand-drawn frames; final mobile visual QA and animation polish are required before claiming polished animation.

## Remaining acceptance before release

- Import original source and verify GitHub artwork-processing workflow succeeds; if the segmentation fails on any creature, fix the masks rather than replacing the real paintings.
- Run a browser QA pass with 52 normal public cards, all four new paintings and sprites/frames loaded and correctly aligned on actual tiles.
- Check status/passive visuals, deck construction including 2-letter keys, save/resume, challenge progression and both teams' use of abilities.
- Then version PWA art files, enable `DOMINION_V456_ART_RELEASE`, run regression again and fast-forward only a clean branch to `main`.
- Perform manual actual iPhone Safari testing, which automated 390px Chromium cannot prove.

## Subsequent milestones and mandatory stopping boundary

After v4.5.6 releases 52 cards, v4.5.7 and v4.5.8 add the final eight toward 60. Then v4.6 progression/replayability and v4.7 multiplayer reliability. **STOP after v4.7 for the creator to decide the future roadmap; do not start v5.0 or any new product direction.**
