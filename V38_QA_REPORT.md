# Aether Tactics: Dominion — v3.8 Browser & Asset QA

Date: November 1, 2026 (America/New_York).
Site: https://hdog960.github.io/aether-tactics-dominion/
Browser session: https://agent.tinyfish.ai/runs/ccc26a89-0895-4533-92df-53a519497df0

## Actual executed browser journey (v3.7)
A browser automation agent navigated the **live deployed site**, completing 26 steps and collecting screenshots/snapshots of real game views. It was not a generated mockup.
- PASS: app loads into Commander's Hall; bottom 5 tabs visible; commander status displays.
- PASS: Story Campaign → First Footsteps; battle board, starting cores, terrain and original four-card hand render without observed blank images.
- PASS: Cards → Collection; 32 entries exist; labels/counts and starter card images visible.
- PASS: Map; four regions and 12 mission entries, appropriate locked/available states.
- PASS: Forge; XP, gold, milestones and upgrade rows visible.
- ISSUE/INCONCLUSIVE: Quick Battle click did not advance during automated test. Source review shows the path uses a native JavaScript `confirm` prompt when an unfinished match exists; automated browsers and iPhone installed PWAs may dismiss or obscure it. **v3.8 replaces this with an in-game confirmation overlay**, with explicit Keep Current Match / Start Quick Battle actions.
- VISUAL REVIEW NOTE: Browser agent flagged some spell artwork/cost overlays; source review confirms card entries include image plus cost overlay, not a cost-only card by design. Further visual review on actual images is useful.

## Real asset inspection (Pillow)
| Atlas | Actual dimensions | Format | Allocation |
|---|---:|---|---|
| `art/cards-character-v37.webp` | 1024 x 96 | RGB | 8 subjects at 128 x 96 |
| `art/units-character-v37.png` | 768 x 120 | RGBA | 8 units at 96 x 120 |
| `art/cards-spells-v37.webp` | 1280 x 96 | RGB | 10 spell cards at 128 x 96 |

All 8 transparent sprite cells have visible nonempty content and transparent pixels. Across the eight 96x120 sprites, opaque coverage ranges approximately 46%–60%. The illustrations and unit cutouts match by character identity. The existing six classic painted sprites and four previously added painted creatures remain in place.

## Non-blocking visual debt identified
- Several of the ten spell illustrations reuse subject paintings from the roster; spell cards do not each have a unique commissioned scene. They are visible, but some choices are less distinctive than their names imply (e.g., Quickstep and Frostbind share lightning-themed scenery).
- The original painterly artwork is higher resolution than the battlefield cutouts. Motion currently uses position/rotation/opacity compositing rather than frame-by-frame animation.
- Browser tester did not summon each of the 8 new units or verify multiplayer/physical iPhone touch ergonomics. DO NOT claim those passed.
- The small orange fish reported by the browser agent is consistent with its own visual cursor overlay; no verified app code uses this as a game character.

## v3.8 changes
- Replace browser-native Quick Battle `confirm()` with an explicit game-themed in-app dialog protecting existing match progress.
- Provide a clearly labeled positive/cancel action, with mobile safe-area support, focus on the primary action, and click-outside cancel.
- Cache-bust JS and CSS in both entrypoints and service-worker precache. Existing storage, card art, campaign state, game rules remain unchanged.

## Recommended next automated QA
1. Re-run Quick Battle against deployed v3.8 and verify both replace and cancel actions.
2. Force two units from the new eight-character atlas into a local practice battlefield (debug-only test harness) and verify transparency, facing, feet alignment, damage FX and health bars.
3. Verify all 32 card images after async image loads, not just default hand.
4. Use iPhone Safari/WebKit emulator for notch, viewport height, on-screen UI, and touch hitbox inspection; a Chromium mobile viewport is not a full substitute.
5. Optional physical two-device multiplayer, since online verification was outside this QA.

**Result:** v3.7 passed a targeted browser smoke test with one obstructed Quick Battle path. v3.8 addresses that path in source, but no post-deploy browser test has yet been completed.
