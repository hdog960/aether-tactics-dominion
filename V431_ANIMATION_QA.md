# Dominion v4.3.1 — Creature Motion and Combat Verification

## Scope
Continues the approved v4.3 Living Battlefield roadmap. This update improves the actual battle scene, not a concept image.

## Combat presentation
- Seven motion profiles: guardian, colossus, skirmisher, flyer, ranger, caster, and warrior.
- All 18 currently summonable creatures use their existing **illustrated battlefield sprites**. No borrowed symbols, new geometric placeholders, or new character identities.
- Motion dynamically interpolates mild foot-pivot scale, lean, stride and hover. Heavy guardians keep grounded weight; colossi show heavy windup; skirmishers lean during fast attacks; flyers float; ranged and caster types add distinctive projectile and casting marks.
- Attack trails use the same type-specific painted sprite's color; assassins use paired arcs, colossi have larger impacts, archers show projectile fletching, casters show moving arcane motes.
- Attacks/damage still resolve via the authoritative engine unchanged. The animation is visual only; no new action or spell balance values introduced.
- Foot-relative transform keeps the sprite silhouette anchored to its tile with maximum scale bounds, avoiding giant/misaligned art and restoring after each canvas draw.

## Tests
- Updated isolated QA panel now includes **ANIMATION AUDIT**: checks all 18 units for finite, bounded idle/walk transforms and counts the distinct motion roles.
- Added **AI STRESS**: simulates 12 new, isolated solo matches for up to 12 rounds each; checks turn ownership, coordinates, occupancy, shield limits, resources, core HP, and per-side unit caps. Counts damage and summons. No player's localStorage is read or overwritten.
- Existing **COMBAT ENGINE TEST** (8 newer units × move and attack) and **AI 12 TURNS** remain available.
- Old game files and all existing save keys, card levels, campaign flags, map, progression and duel mechanics unchanged.

## Artistic limitations and next steps
These are **role-specific animation transforms and canvas effects of still pixel-art creatures**, not individually repainted spritesheet frames or skeletal rigs. They add readability now without compromising the cards' art standard. Frame-authored walking/attack/hurt/death animations and real Safari iPhone touch/performance measurements remain future milestones.

## Verified release — November 1, 2026
- GitHub Pages deployment completed for the game commit `4a80c225811edbfa9dcf350f885b3c24700df6ac`.
- The public production URL returned title **Creature Animation & Combat QA v4.3.1**, confirming new version deployment.
- Browser automation used the isolated QA scene and confirmed the exact test title. See https://agent.tinyfish.ai/runs/d5641631-5452-4017-93b3-2d4c5a98cf6e
- **ANIMATION AUDIT: 18/18 PASS**, 7 movement roles, no nonfinite or out-of-bounds transforms.
- **AI STRESS: PASS**, 138 legal turns across 12 initialized games; 80 turns included core damage, 72 included summons, 3 matches ended early; zero failed state checks.
- **COMBAT ENGINE TEST: 16/16 PASS**, new eight roster units each successfully executed movement and basic attack orders.
- **SPELL FX:** 14 spell kinds queued, nonblank scene and no observed clipping or JavaScript errors. This is smoke coverage, not validated per-frame film-quality animation.
- Save, campaign and card progression were not mutated by tests because the dedicated QA page shadows localStorage in memory.
- Remaining: physical iPhone performance/scroll gestures, full end-to-end campaign, two-device network battles and statistically meaningful balance testing. Distinct motion **transforms** are not painted character animation frames.

