# Aether Tactics: Dominion v3.3 — Illustrated Card Consistency

## Reported problem
The iPhone card gallery combined seven polished illustrated frames from `art/cards.png` with twenty-five procedural `v21-art.js` fallbacks made from flat polygons, lines, and gems. This produced a severe mismatch between "pixelated and lovely" original art and simplified geometric icons. Additionally, collection entries inherited a fixed `height:106px!important` from an older layout stylesheet, causing card names and descriptions to disappear below oversized images. Original atlas portraits also displayed overlapping cost badges.

## Changes
1. Add `v33-art.js`: a new local-only, canvas-driven portrait pipeline that uses the original illustrated atlas for 25 missing cards. Each card applies seeded per-card biome coloration and thematic lighting/particle/rune effects (fire, frost, speed, healing, magic, tide, etc.). It reuses the **illustrated source art** rather than falling back to geometric primitives. These are *composited variations*, not 25 independently hand-drawn illustrations; further bespoke art is a future quality goal.
2. Keep the original seven high-quality atlas frames in their existing positions. Remove a redundant HTML cost emblem on those seven because the artwork already contains the cost; keep the emblem for the remaining 25 cards.
3. Add `v33-art-fixes.css`: remove old fixed card heights, ensure the card name, role, stats, and ability remain visibly below each image in an actual 2-column grid on iPhone.
4. Preserve transparent combat sprites in the tactical board by using `AetherArt.sprite` for scene and tile units, rather than introducing full rectangular card illustrations into the battlefield.
5. Refresh card collection, Forge, builder, and battle-hand portraits when the original atlas finishes loading, including from the Home Screen cache.
6. Regenerate offline cache and bump source references to v3.3.

## Scope and limits
- Existing gameplay rules, card definitions, campaign progress, deck saves, and local player saves remain untouched.
- Portrait generation is deterministic from the existing bundled art and contains no network API calls.
- The first-stage artistic correction unifies illustration style, but the 25 derived variants still reuse seven source archetypes. More fully bespoke pixel art should eventually replace the variants, especially for distinct mythic cards.
- Tactical unit sprites intentionally remain transparent procedural unit sprites where the game lacks independent battlefield artwork. They are not replaced by card backgrounds.
- Hardware Safari/iPhone visual verification is still recommended after publishing.

## Test plan
- All 32 cards render illustrated portraits; 7 originals + 25 themed variants.
- Browse the entire Collection list, checking that names, counts, stats and abilities remain visible and no art appears as flat abstract polygons.
- Check Forge card upgrades, battle hand, single-card details and deck builder.
- Reopen after Home Screen cache refresh, and resume a previously saved match.
- Verify unit sprites in tactical battles do not become colored rectangular portraits.
