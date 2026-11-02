# Dominion v4.5.6 — Original Creature Artwork and Production Acceptance

**Scope:** Four authentic fantasy creature paintings for the current 48 → 52 card expansion, in `dev/v456-four-creatures`. This file is an art-direction, import, and quality-acceptance contract, **not** a completion claim.

## Source image: one square 2×2 sheet

Commit one genuine 2×2 character painting at `art/sources/v456-original-characters.png`. Target ≥ 1024×1024 square (the builder minimum is 720px per image side). Each quadrant must contain precisely one **fully visible** figure on a consistent plain light gray neutral matte, with ample empty margin around head, feet, weapons and trailing accessories. Avoid typography, labels, card borders, ornate panel frames, staged battlefield screens, mockup UI, colored scenery, watermarks, or composite character groups. Portraits that look attractive but have severed feet, unclear anatomy or unrecoverable silhouettes are unacceptable. **Never use the previously created promotional montages as source art.**

Identity order (the existing crop and battle animation indices are fixed):

| Quadrant | Key | Silhouette and materials | Player recognition cue |
| --- | --- | --- | --- |
| **Top left** | `Y` Gloam Bellkeeper | Tall, hooded, indigo-and-silver spellkeeper with a visibly physical suspended bronze bell, two boots, draping layered cloth | Hanging bell and rippling lilac resonance |
| **Top right** | `Z` Cinderjaw Prowler | Lean, recognizably quadrupedal obsidian jackal/wolf, ember fissures, fiery orange accents, four paws and readable head | Ember-lit muzzle and fiery hunting silhouette |
| **Bottom left** | `aa` Oathmoss Devourer | Heavy, broad moss-and-bark beast with fungal caps, tusks, root claws and legible feet | Living flowers and roots with green renewal accents |
| **Bottom right** | `ab` Tidebreak Herald | Aquatic turquoise/navy armor-clad humanoid herald carrying a trident, long flowing sea mantle, both boots visible | Trident, blue armor and foaming Aeth-spring energy |

**Global art direction:** richly rendered original painterly fantasy illustration, layered materials, strong anatomy, clear contrasting silhouettes, expressive faces, original costume language and carefully drawn hands/feet. Artwork should remain recognizable at approximately 128×96 pixels as a card image and 96×120 pixels as a battlefield cutout. Do not swap identities between cards and field sprites. Faction distinction comes from HP bars and ground auras, not recolored character sprites. Avoid cheap geometric icons, procedural stand-ins and repeating other creatures' illustrations.

## Existing reproducible asset pipeline

`tools/v456_build_art.py` splits the four quadrants, performs neutral-matte foreground extraction, and builds:

- `art/cards-creatures-v456.webp`: four 128×96 painted crops, horizontally stacked to 512×96.
- `art/units-creatures-v456.png`: four 96×120 transparent silhouette tiles, horizontally stacked to 384×120.
- `art/battlefield-frames-v456.webp`: four unit rows of 22 frames each (4 idle, 6 walk, 4 attack, 3 hurt, 5 defeat), 2112×480.
- `art/v456-art-manifest.json`: original source SHA-256 and dimensions, per-atlas size and dimensions, card ID order and animation count.

The 22 movement/combat poses per figure are **derived from the authentic source painting using pose deformation**. They are not 22 separately hand-painted animation drawings. Never describe them as hand-authored frame-by-frame artwork.

## Release acceptance — non-negotiable

1. Import one real source PNG onto the **development branch** and preserve its original bits. The existing GitHub Actions workflow builds the assets and records provenance.
2. The release guard, source-art builder, character uniqueness/alpha/frame checks, gameplay regression, save/resume checks, and normal 52-card Grimoire test must all pass.
3. The `tools/v456_real_art_acceptance.mjs` screenshot test must observe the real renderer drawing **all four unique rows** of the new 2112×480 atlas on the visible battlefield canvas, not just loading files.
4. Inspect the actual `art/v456-card-sprite-identity-390px.png`, `art/v456-battlefield-four-creatures-390px.png`, and `art/v456-future-52-card-grimoire-390px.png` screenshots for recognizable figure identities, legible hands/feet, on-tile placement, full-body silhouettes, portrait quality and detailed terrain separation.
5. Test spell/ability feedback in real browser, both teams' use of the creature passives, mixed decks with `aa`/`ab` IDs, 24-card deck persistence, and v4 save compatibility. Retain both 390px and 320px narrow-phone regression evidence.
6. Only once everything passes and artwork visually looks genuinely finished: enable `DOMINION_V456_ART_RELEASE` in both production entrypoints, version and precache all real new assets in `sw.js`, rerun regression, then fast-forward the clean development branch to `main` (no force push).
7. Actual physical iPhone Safari touch and memory testing, and long-distance two-device WebRTC testing, are **not proven** by simulated Chromium mobile viewports. Call out unverified hardware testing explicitly.

**Public hold:** Public GitHub Pages must stay on v4.5.5 (48 cards) until the art source has arrived, has been built successfully, and the actual game imagery has passed visual inspection.

## Follow-on boundaries

After v4.5.6, v4.5.7 and v4.5.8 add the remaining eight cards toward 60, followed by v4.6 replayability/progression and v4.7 multiplayer reliability. **STOP after completing v4.7 for the creator's roadmap review.** No v5.0 without explicit direction.
