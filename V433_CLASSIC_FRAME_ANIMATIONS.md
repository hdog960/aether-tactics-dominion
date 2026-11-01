# Dominion v4.3.3 — Complete 18-Creature Frame Coverage

## Implementation
- Six classic creature types **v, r, b, s, f, g** now have 22 sprite frames each, covering the five animation states already supported in v4.3.2:
  - Idle: 4 frames
  - Walk: 6 frames
  - Attack: 4 frames
  - Hurt: 3 frames
  - Defeat: 5 frames
- These **132 new classic frames** are rendered to an offscreen bitmap atlas (2816 × 888) once from the **original `art/units-feet.png`**, which is already cached and used by the game's renderer. That avoids uploading another huge image and maintains consistency with classic creature appearances.
- All 18 summonable creatures now select distinct raster frames during game events: 12 illustrated premium units use the existing committed 264-frame v4.3.2 WebP strip, six originals use the new pre-rendered classic sheet.
- The classic frames are derived from the existing illustration through segmented torso/lower-body poses, timed foot motion, squash/stretch and controlled defeat collapse; they are *not* newly hand-painted frame-by-frame artwork. They maintain fully transparent backgrounds and do not introduce placeholder shapes or recolored unit identities.
- Combat state and character selection remain engine-authoritative; added a brief death animation for the six classics using the same existing lethal-event infrastructure.
- Rendering still falls back to the unmodified original classic sprite until the new canvas atlas has finished generating. No blank character when image loading is slow.
- The canvas frame atlas is generated once and then reused, instead of rebuilding on each animation tick. Its 2816×888 RGBA buffer occupies roughly 10 MB in memory; frame processing only occurs after the asset is available.

## QA
- New **CLASSIC 132 FRAMES** button on the separate save-isolated QA route verifies all six classic rows, all 132 cells nonempty, frame image fingerprints, and the exact generated dimensions.
- Existing **264 FRAME AUDIT**, **COMBAT ENGINE TEST**, **AI 12 TURNS**, and **AI STRESS** remain available.
- No changes to version 4 save schema, upgrades, deck lists, map progression, gameplay rules, AI decisions, or multiplayer network protocol.

## Limitations / Future work
- This work adds actual discrete raster poses but cannot substitute for bespoke artist-drawn limb articulation and weapon cycles. The six classic frames are synthesized from their original art at runtime, not stored as a separate standalone WebP file.
- Still need prolonged iPhone Safari GPU/memory/performance measurements and real-device touch checks, especially under repeated combat FX.
- End-to-end multiplayer QA requires two actual devices.
