# Dominion v4.5.6 — Four Painted Creature Roles (historical staging log)

## Original staging release boundary (historical)

**November 2 update:** Source art, all three atlases, real browser QA and a 52-card release candidate have now passed. See `V456_RELEASE_AND_QA.md` for the completed release evidence. The following paragraph describes the *former* art-blocked stage, before this update:

At that earlier time, the public game remained **v4.5.5 with 48 cards**. The four new creatures are implemented and their targeting rules are tested, but their original painted character source art has **not yet been transferred into GitHub**. Do not activate `DOMINION_V456_ART_RELEASE`, merge this development branch to `main`, publish dummy images, or claim the collection is 52 cards until that artwork is genuinely uploaded, processed, and visually inspected.

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

## Latest development session — save compatibility and actual Grimoire/Armory interactions

The developer resumed work on the original `dev/v456-four-creatures` branch, with no public release or real player save changes.

- [Real game-engine and save-compatibility GitHub CI](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41384197095) **passed**. It reran all existing v4.5.6 combat/legacy regressions and added **15 independent persistence checks**, including the ordinary 48-card artwork gate, three named decks, mixed 24-card loadouts with both two-letter IDs `aa` and `ab`, card rank persistence, fresh v4 match snapshot, save/reload into the same match, and preserving legacy storage when the v4.5.6 art flag is disabled. See `tools/v456_save_compatibility_qa.mjs`.
- [Isolated 390px Chromium interaction QA](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41384351847) **passed**. The regular player UI remains 48 cards. A **disposable in-memory/browser-only preview**, with the future 52-card flag set specifically inside that test page, browsed all four new card details, then removed two existing cards, added both `aa` and `ab` through the actual Armory buttons, saved the valid 24-card deck, and verified the canonical saved key. The test never publishes or displays fake artwork in public. See `tools/v456_browser_safety_qa.mjs`.
- Art acceptance **remains blocked**. No `art/sources/v456-original-characters.png` source exists on this branch yet. Do **not** claim the painted 52-card release is complete, enable `DOMINION_V456_ART_RELEASE` on production, merge staging, or count passing interaction tests as substitute for original-image/actual-battlefield-image review.
- In-chat promotional mockups are **not** production image files, do not match the required 2x2 figure source, and must never be uploaded or represented as validated game art.

**Next step:** transfer the genuine four-figure source sheet to `art/sources/v456-original-characters.png` on the staging branch through the [GitHub upload form](https://github.com/hdog960/aether-tactics-dominion/upload/dev/v456-four-creatures/art/sources), then inspect the source-conversion workflow and its three actual screenshot artifacts. Any failure in matte extraction should be fixed in the builder against the real art, not bypassed. Continue to require manual quality approval before any public release. The v4.7 stopping boundary remains unchanged.

## Extended development session — source integrity, distinctive combat VFX and real mobile QA

Development continued on the existing staging branch; public `main` was deliberately not modified.

### Source and release safety
- Added `tools/v456_release_guard.mjs`, running in the [GitHub creature rules workflow](https://github.com/hdog960/aether-tactics-dominion/actions/workflows/v456-rules-qa.yml). This fail-closed check verifies synchronized live/QA engine and renderer files, distinct Y/Z/aa/ab mappings, the v4.7 hard stop and the release-art flag. A complete release requires the original input plus all generated outputs, a valid manifest and original PNG SHA-256, and precaching the new atlases.
- Updated `tools/v456_build_art.py` to embed the original image SHA-256 and dimensions in the generated manifest. The original source must be retained without replacing it with card mockups.
- Strengthened `tools/v456_real_art_acceptance.mjs`: actual 2D canvas drawImage calls must show **all four separate 120px rows** from the new 2112×480 battle animation atlas before the 52-card art acceptance passes. Merely loading the images is not sufficient. **This acceptance is pending the genuine source PNG and has not yet been run successfully.**

### Creature-specific passive visual signatures
- Gloam Bellkeeper: purple bell resonance, curved bell and spreading sound rings.
- Cinderjaw Prowler: branching fire tracers and ember points after a successful burning-target propagation.
- Oathmoss Devourer: green vine growth and leaves when a legitimate sacrifice heals it.
- Tidebreak Herald: cyan wave crests and Aeth-spring flow after its first successful spring move each round.

These effects are emitted by the same real authoritative ability triggers, drawn in both synchronized production and QA canvases, and **do not change card stats or mechanics**. The previous generic buff rings are no longer the only visual feedback for these four passives.

### Verified testing
- [Creature rules + persistent-storage + static release guard GitHub CI](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41390122861) **passed** on the latest synchronized gameplay source. Intermediate workflow failures during one-at-a-time source synchronization were superseded by this final successful pass.
- [Actual 390px Chromium field/VFX and 320px menu regression](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41390527895) **passed**, with no JavaScript page exceptions. The 320px test checked bottom tabs, the normal 48-card Codex and Armory geometry. The effects screenshot test was tightened after review showed its initial image accidentally captured the home screen. The corrected screenshot **shows the active real battlefield** with generated feedback effects.
- Evidence artifacts: `art/v456-staged-public-safety-390px.png`, `art/v456-320px-mobile-dock-qa.png`, and `art/v456-four-ability-fx-390px.png`, stored as downloadable artifacts of the latest isolated browser CI. These are staging QA screenshots, not shipped image assets.
- Exact four-figure art direction, mandatory on-tile visual approval and no-premature-release rules are preserved in `V456_ART_DIRECTION_AND_RELEASE.md`.

**Release hold remains mandatory:** Until genuine `art/sources/v456-original-characters.png` exists, builds, survives the four-image identity and on-field frame tests, and is visually approved, v4.5.6 is a staging candidate only, not a playable public 52-card release. Preserve all local browser saves and the post-v4.7 stop.
