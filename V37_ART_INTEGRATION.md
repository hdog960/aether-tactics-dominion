# Aether Tactics: Dominion v3.7 — card and battlefield art integration

## Implemented in the game
- Uploaded real, self-hosted image assets: `art/units-character-v37.png` (768 × 120 RGBA, eight 96 × 120 cells), `art/cards-character-v37.webp` (1024 × 96, eight 128 × 96 frames), and `art/cards-spells-v37.webp` (1280 × 96, ten 128 × 96 frames).
- New `v37-art-unity.js` loads the three atlases. Replaces previously reused geometric or old-unit-based art, with real card illustrations for each character, matching their new transparent battlefield sprites, and painted scenes for ten remaining spells.
- Characters in both portrait and battlefield strips: `p` Tidecaller, `k` Storm Lancer, `d` Wisp Familiar, `o` Echo Scribe, `y` Crypt Keeper, `z` Rune Conductor, `A` Dusk Reclaimer, `B` Oath Sentinel.
- Spell cards: `q` Quickstep, `e` Frostbind, `i` Ember Sigil, `n` Rallying Cry, `x` Purifying Rain, `C` Echo Retrieval, `D` Veil Snare, `E` Twin Convergence, `F` Fateful Exchange, `G` Null Chime.
- `index.html` and `v30.html` load `v37-art-unity.js` in place of v36 and cache-bust the revised `v30-scene.js`.
- `v30-scene.js` now draws the new eight-subject sprite atlas (no borrowing/recoloring existing units); preserve existing battle FX, animations, team HP bar system and all gameplay. Transparent unit sprites keep ground-contact shadows.
- Service worker precaches the new resources; `v36` assets remain in Git history only.

## Artistic honesty
The eight characters are scene-derived cutouts from individual fantasy paintings, with 96×120 resolution and manually refined segmentation. They currently use the existing compositor's idle, move, attack, hit and defeat motions, **not** bespoke multi-pose animation sheets.
The ten new spell cards are crops of detailed fantasy scenes containing appropriate spell imagery; they are not ten independently commissioned originals. Further dedicated art and real iPhone review may still improve quality.
Original seven classic portraits and previous seven detailed painted portraits are unchanged.

## Technical validation
- No changes to save keys, campaign gating, turn logic, collection counts or networking.
- Check 18 new card-asset IDs and matching 8 atlas cells, verify image dimensions and transparent alpha.
- Check both HTML entrypoints have module in correct order, and no v36 script.
- Check scene has direct eight-key mapping and never falls back to recolored classic sprites.
- Check offline precache contains all three new atlases.
- iPhone visual playtest still needed; no claim of completing physical-hardware QA.

## Next quality targets
1. On-device screenshot review, particularly around staff and flowing capes during movement.
2. Bespoke pose sheets (attack/idle/walk/defeat) for each creature.
3. Better independent painted compositions for the ten spell artworks.
