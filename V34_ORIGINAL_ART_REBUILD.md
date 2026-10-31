# Dominion v3.4 — Original card-art rebuild

## What was wrong
The original seven atlas portraits for Aeth Vanguard (v), Dawn Ranger (r), Prism Bulwark (b), Rift Stalker (s), Sky Manta (f), Obsidian Golem (g), and Rift Barrage (a) used rich illustrated source imagery. Every other card used a flat geometric generator. v3.3 attempted a cosmetic fix by recoloring crops of that atlas. It did not produce distinct artwork, and the user reported the artifacts remained.

## v3.4 correction
- **No recolors or crops of existing artwork.** All 25 non-atlas cards have their own subject-specific, original scene illustrations described and built from scratch in `v34-art.js`.
- Every illustration depicts the appropriate card concept (Titan, Leviathan, Meteor, magical barriers, elemental spells, human and creature characters, rituals, and so forth). There are no inherited original-atlas subject silhouettes.
- Each image is drawn with layered colored scenery, distinct subject geometry, lighting, particle accents, and atmospheric details.
- SVG art is rasterized locally at 102×128 and enlarged with pixelated sampling for a textured retro fantasy aesthetic. The SVG renders as a safe fallback until rasterization completes.
- Keep the seven original illustrated atlas cards completely unchanged, including the three examples the user marked as good.
- Replace `v33-art.js` at startup with `v34-art.js`; the previous recolor art script must not load.
- Correct the old two-column card-grid fixed-height CSS conflict in the final style layer `v34-art.css` so names and descriptions remain visible.
- Maintain original character-transparent sprites in the tactical board; use the new portraits in the card collection, Forge, battle hand, and inspection panels.
- Cache names are versioned for Home Screen refresh.

## Illustrated card roster
| Key | Card |
|---|---|
| t | Aether Titan |
| l | Abyssal Leviathan |
| m | Planar Meteor |
| w | Prismatic Ward |
| h | Aeth Renewal |
| c | Ember Adept |
| j | Thorn Warden |
| p | Tidecaller |
| k | Storm Lancer |
| d | Wisp Familiar |
| q | Quickstep |
| e | Frostbind |
| i | Ember Sigil |
| n | Rallying Cry |
| x | Purifying Rain |
| o | Echo Scribe |
| y | Crypt Keeper |
| z | Rune Conductor |
| A | Dusk Reclaimer |
| B | Oath Sentinel |
| C | Echo Retrieval |
| D | Veil Snare |
| E | Twin Convergence |
| F | Fateful Exchange |
| G | Null Chime |

## Important limitations
These new portraits are **hand-authored original SVG illustrations**, rendered into low-resolution game art; they are not outputs of a trained image-painting model. Their quality and aesthetic equivalence to the original detailed paintings still require on-device review. Seven original premium cards are retained, and no gameplay/card balance or save state is changed.

## Real-device QA
Open Play → Cards → Collection, check Titan/Leviathan/Meteor and scroll all 32. Confirm a new v3.4 HTML entrypoint after clearing stale Home Screen caches by reopening while online. Check the three good original cards are unaffected, check names beneath each image, inspect details and Forge, check battle unit sprites are transparent, and confirm saves persist.
