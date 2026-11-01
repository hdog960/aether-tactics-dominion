# Dominion v4.0 — Distinct Spell Art + Browser QA

## Summary
Replaced ten reused character-painting spell-card crops with ten **original spell-specific painted scenes**. The resulting 1280×96 WebP sprite strip uses ten separate 128×96 artworks; the underlying 32-card game roster and gameplay effects have not changed. The new image replaces the former v3.7 spell strip in both the collection and the playable battle hand.

## New spell visuals
1. Quickstep — multiple luminous green motion silhouettes sprinting across a moonlit stone bridge
2. Frostbind — a huge glacial crystal bound in blue magical chains
3. Ember Sigil — fiery ritual circle glowing in volcanic ruins
4. Rallying Cry — sunlit golden victory banner and herald trumpets
5. Purifying Rain — cyan celestial downpour cleansing violet corruption
6. Echo Retrieval — ornate scrolls and pages caught in a violet magic vortex
7. Veil Snare — violet spectral bindings forming a magical trap
8. Twin Convergence — opposing cyan and violet cosmic forces colliding
9. Fateful Exchange — red-and-blue magical hourglass turning fates
10. Null Chime — giant cracked enchanted bell pulsing a pale nullifying shockwave

No generic character portraits were copied into these spells.

## Implementation
- New asset: `art/cards-spells-v40.webp` (1280×96; ten cells at 128×96; 90,720 bytes).
- `v37-art-unity.js` now loads the new spell strip via `?v=40` and keeps the eight matching character/transparent battlefield sprite mappings unchanged.
- Both `index.html` and `v30.html` load the bumped art script.
- `sw.js` refreshes the cache name and precaches the new WebP. The prior spell atlas remains in Git history.
- The diagnostic `qa-v39.html` and script now point at v4.0 for independent verification.
- Player save format, profile, card stats, campaign mission logic, combat AI, deck constraints and networking are unchanged.

## Completed independent browser testing
- Visual battlefield QA: all eight new summon sprites, 10 classic units, 16-unit opposing-side layout, spell card codex, new unit and spell atlases (real site): https://agent.tinyfish.ai/runs/9dfbbb66-3b7b-4253-bb07-11294ca77584
- Combat simulator through actual `AetherGame.apply`: eight new summons × (move, basic attack) = **16/16 PASS**, zero JS errors: https://agent.tinyfish.ai/runs/e09aadd2-1e97-4944-8082-00ebafa22445
- Production Quick Battle regression: campaign First Footsteps -> Hall -> Keep Current Match -> Start Quick Battle; both choices work with custom mobile-styled modal: https://agent.tinyfish.ai/runs/3f34ef86-f774-4953-9623-cd497b3c2b9f

## QA that remains
- The newly replaced v4.0 spell artwork must be checked from the **published** production build once GitHub Pages deployment completes. Visual asset validation was done from the authoring PNG and generated WebP strip.
- Distinct spell art does not, by itself, create unique battlefield spell animation for all ten effects. Their existing engine effects remain; a dedicated VFX quality pass is still an opportunity.
- Tests ran in browser-based automation, not physical iPhone Safari/WebKit. Two-device multiplayer still requires real-device verification.
- Current unit animations are composited motions of painted still sprites, not bespoke multi-frame spritesheets.

## QA diagnostic security
`qa-v39.html` is a separate test page and replaces `localStorage` with an in-memory map before the game engine loads. It does not access or modify production saved progress. It remains available for later game tests; it is not linked from the main game navigation.
