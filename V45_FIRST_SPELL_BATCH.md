# Dominion v4.5 — First Four-Spell Batch (development branch)

**Status:** Engine prototype and QA; **NOT released to live players**. This branch is intentionally independent from the deployed `main` branch.

## Existing 32-card library preserved
The 24-card deck builder, max 3 copies, min 12 summonable units, max 2 mythic cards, version-4 battle saves, collection save key and progression remain unchanged. Existing card names and rules are not replaced. Four new spell IDs are reserved: H, I, J, K. Do not show these to real players before the final art atlas is committed.

## Cards (art and title must match gameplay)
| Key | Name | Cost | Mechanic |
|---|---|---:|---|
| H | **Starfall Lattice** | 4 | Choose a tile within 3 Manhattan spaces of an allied creature. Deal **2** damage at its four diagonal neighboring squares; the center tile is unaffected. Damage respects shields. Can strike the Core only if it is diagonally adjacent to the chosen tile. |
| I | **Ashen Reprisal** | 2 | Give an allied creature **2 shield** (maximum global 5), plus one use of **1 retaliatory damage** when struck by an enemy's basic attack. The ward expires at the start of its next turn; multiple charges do not stack. |
| J | **Undertow** | 3 | Choose a **non-boss** enemy within 3 of your army if it has a genuinely open neighboring tile closer to the nearest allied attacker. Deal **1 damage** (shields absorb it); if the enemy survives, pull it one legal tile. Cannot move through a rock, another unit, or a Core, and triggers a trap on the landing square. |
| K | **Dawn Edict** | 3 | Choose an allied creature that has not attacked. Its next basic attack gains **+1 damage** and strips up to **3 existing target shield points** before applying ordinary damage. One attack only, nonstacking, expires when the recipient starts its next turn. No extra attack is granted. |

## Code paths implemented
- Production-authoritative `apply`, `validSpellSpot`, `resolveSpell`, `basicStrike`, `startStatusTurn`.
- Opposing AI spell targeting and simulated player tactical spell scoring.
- Existing Grimoire explanatory text and combat stat labels.
- Four dedicated frame-timed battlefield VFX cues in `v30-scene.js`.
- Save-isolated `qaV45Spells()` with 7 targeted checks; stage QA panel button available only on isolated QA page.
- **Release gate:** `V45_ENABLED` is false for ordinary public pages by default. QA isolated page enables tests. A production rollout must explicitly opt in with `window.DOMINION_V45_ART_RELEASE=true` *after* painting integration and final verification. An unapproved merge cannot reveal the four unfinished cards in public deck creation.

## Original painted artwork specification (NOT DONE)
Create **four distinct authored fantasy spell illustrations**, each exactly 128×96 pixels in the final shipping sprite atlas, with 4 independent paintings side by side (512×96 native or high-resolution master reduced to that layout). Painterly fantasy atmosphere, natural anatomy and physical materials; no emoji, word labels, geometric symbols, flat gradient icons, recolors, or use of old character portraits.

1. **Starfall Lattice:** a crumbling crystal observatory at night under a violet starstorm; four golden comet trails plunge diagonally around an empty stone square. Strong silhouette even at iPhone card size.
2. **Ashen Reprisal:** an armored defender in richly detailed bronze and crimson mail, braced behind a scorched shield as the attacker recoils from a ribbon of returning flame. Clearly depicts a reactive defense, not a generic fireball.
3. **Undertow:** luminous teal seawater winding up a blackstone stair into an ancient ritual plaza, pulling a heavily armored warrior toward a tidecaller while leaving physical foam trails.
4. **Dawn Edict:** a solemn dawn battlefield with a knight holding a gilded sunlit blade that shatters the violet ward around a towering armored foe; grounded character scale and atmospheric gold light.

Paintings must be original to Dominion and visibly related to the real in-game spell VFX. Use the actual `art/cards-spells-v45.webp` atlas once approved; then extend `v37-art-unity.js` or add a specific art adapter to return distinct painted crops for H/I/J/K. Do not ship procedural fallback, SVG shapes in place of character art, empty artwork, or the previously generated concept mockup containing unbuilt features.

## Minimum acceptance tests
- QA: all 7 new spell checks, all 7 existing boss phase regressions and all 30 story plan checks.
- Full 60-game simulation with 0 invalid states, with second run using at least one deck containing H–K.
- iPhone Safari: each card painting loads, legible costs and art are not obscured, swipe/tap targeting works at narrow widths, no WebRTC or save migration regression.
- Both teams can legally use the spells; invalid actions spend **zero** energy and consume **zero** cards; buff expiry survives saved-game load.
- Verify no placeholders with network/art asset check. After all pass, integrate via explicit release gate and versioned service-worker cache.

## Release limitations
The generated v4.5 promotional concept board is **not** a screenshot of the actual game and depicts numerous features that are not implemented. It must never be published as evidence of what the game currently contains. Completion here means engine prototyping, **not** user-facing v4.5 release.
