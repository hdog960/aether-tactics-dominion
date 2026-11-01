# Aether Tactics: Dominion v3.6 — Painted Battlefield Roster

## Goal
Advance from v3.5's six original sprite paintings, four bespoke card-illustration cutouts and eight recolored stand-ins to an **18-character painted sprite roster** with one-to-one card-to-battlefield cutouts for the eight former stand-ins. This is a visual-only release.

## Eight character cutouts added
The pixel-fantasy artwork was extracted, alpha-matted and packed from a previously generated, detailed 18-character promotional art study, using an eight-column transparent 96×120 atlas. The designs were selected as the closest existing matching fantasy character types. They have been inspected as one transparent sprite sheet.

| ID | Card | Source column |
|---|---|---|
| p | Tidecaller | 0: white-blue caster with staff |
| k | Storm Lancer | 1: blue armored knight |
| d | Wisp Familiar | 2: small blue winged familiar |
| o | Echo Scribe | 3: sage caster in gold and green |
| y | Crypt Keeper | 4: dark sorcerer with violet arcane staff |
| z | Rune Conductor | 5: blue-and-gold arcane caster |
| A | Dusk Reclaimer | 6: purple shadow assassin |
| B | Oath Sentinel | 7: gold-and-ivory plated defender |

### Art identity
The eight new battlefield cutouts use **exactly the same transparent painted sprite source** drawn on their card art, with fantasy region scenery behind the card portrait. This avoids a card showing an abstract geometric icon while the battlefield shows a different generic pawn.

**Caveat:** Character selection is a best-fit from the already painted character study rather than eight independently commissioned bespoke poses. Some designs (notably Tidecaller, Storm Lancer and Wisp Familiar) still need closer concept fidelity to their card names. This is a meaningful improvement over color-reused stand-ins, not a declaration of perfect final art.

## Integration
- New `art/units-painted-v36.png`: transparent 768×120, eight 96×120 columns.
- New `v36-battle-art.js`: overrides artwork routing for exactly those eight card IDs. Draws the same pixel character as the card illustration in a background scene from `art/ui-*.svg`.
- Updated `v30-scene.js`: accesses the v3.6 sprite atlas by precise source rectangles; removes the old `unitAliases` hue-recolor map entirely.
- Enemy ownership is indicated by red team ground glow and HP bar, not by changing the sprite hue (this preserves visual identity).
- Wisp Familiar floats, and ranged shots adopt the acting unit's magical color when available.
- The existing v3.5 special summons, original painted classics, campaign, gameplay and persistent saves are preserved.
- Both HTML entrypoints load the new art script after v3.5 artwork and before the game engine.
- Service worker cache key updated and new assets added for offline refresh.

## Animation honesty
Movement, attacks, hit reactions and defeat are animated using transformations, recoil, interpolation, flashes and fades around a static transparent sprite. These are **not hand-drawn independent animation-frame sequences**. A later premium animation pass should add actual idle/walk/attack/damage/death sprite sheets per unit.

## QA
1. Check 18 unit identities route into original six, v3.5 four, and v3.6 eight, with no old alias fallbacks.
2. Confirm source atlas has exactly 768×120 pixels and transparent RGBA alpha.
3. Check all eight new card illustrations use the same character sprite source as their summoned battlefield figure.
4. Verify safe-area layout, hand portraits, card collection and Forge, and battle pointer accuracy on a real iPhone.
5. Test campaign victory, saved progress, offline reopens, and a private duel on two actual phones.
6. Audit visual alignment especially for the eight newly selected art designs.

The remaining items are **hardware QA and dedicated frame animation**, not changes to gameplay balance.
