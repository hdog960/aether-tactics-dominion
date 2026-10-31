# Aether Tactics: Dominion — v3.2 Celestial Court

## Release goals
Transform the v3.1 utilitarian five-tab prototype into an illustrated, premium fantasy tactical card game, while preserving the v4-format local match save, commander profile, card roster, deck content, campaign unlocks, networking and combat rules.

## Art and visual system
Seven new original SVG illustrations:
- `art/ui-verdant.svg` — Rune Valley, green-gold temple spires
- `art/ui-frost.svg` — Frostglass Reach, glacial crystals
- `art/ui-ember.svg` — Ashen Crucible, volcanic Aeth
- `art/ui-crown.svg` — Crownfall Sanctum, royal-violet runework
- `art/ui-cards.svg` — luminous grimoire and collection hall
- `art/ui-forge.svg` — anvil, molten light and a forging chamber
- `art/ui-duel.svg` — crossed enchanted blades in the Duel Chamber

These are local assets with no outside hosting dependencies.

## Screens
### Play / Commander's Hall
Large illustrated floating-citadel banner, warm foreground text, jewel-like player status, distinct campaign, quick battle and duel scene cards, expressive continue banner, two preparation shortcuts.

### Map / Riftfront Atlas
Four large illustrated chapter banners with per-region hue and icon, connected glowing quest nodes, visible objectives and replayable sigils. Locked stages remain readable and distinct. Crown Trials have a royal-violet stage treatment. Existing campaign gating logic and stage access remain unchanged.

### Cards / Grimoire
Collection tab now opens with all 32 card types instead of the four-card battle hand. Two-column, art-first gallery, prominent cost and ownership labels, enchanted purple-and-gold presentation. Clicking a card still opens the original detailed read-only inspection panel and existing deck builder.

### Forge / Your Legacy
Forge illustration, circular commander level medallion, luminous XP, stronger battle report and upgrade rows. Six illustrated trophy medallions reflect **actual** achievement unlocks via a read-only addition to profileSummary(). No fabricated unlocks or rewards.

### Duel / The Chamber
Illustrated arena crest, strong primary action, ornate match information and a restyled private-room form. Still **experimental** WebRTC; no ranking or cloud persistence is claimed.

### Battle and navigation
Existing tactical board preserved. Gilded HUD, more legible action deck, selected card glow. Navigation is constrained to a fixed one-row iPhone-safe dock so it does not leave a large empty slab.

## Files and compatibility
- New: `v32-celestial.css`, `v32-details.js`, seven `art/ui-*.svg` assets.
- Modified: `index.html`, `v30.html`, `v30-shell.js` (collection default), `v30-engine.js` (read-only achievements summary), `sw.js` (new cache key plus assets).
- Preserved: `aether-dominion-v04` match save format, local profile key, existing battle/card/campaign/duel logic.
- Scripts use `?v=32` where appropriate to avoid stale Home Screen resource caches.

## Verification checklist
- Confirm syntax of `v30-engine.js`, `v30-shell.js`, `v32-details.js`, and `sw.js`.
- Confirm both production HTML entrypoints reference the new stylesheet and JavaScript, with correct script order.
- Confirm all seven SVG assets are referenced by CSS and cached for offline Home Screen.
- Check all navigation destinations, first campaign unlock, card collection, Forge, and Duel invitation in a real Safari session.
- Check for touch targets, scrollability, visual overlays, and safe-area insets at actual iPhone dimensions.
- Test the campaign map at multiple unlock levels and one live private duel with two physical devices.

The above testing list is a verification plan, not a claim that every item has been verified on hardware.

## Future polish opportunities
Animated unit portrait flourishes, regional boss cinematics, redesigned card-detail layouts, optional sound and haptics with user settings, stronger story interludes, live two-phone multiplayer QA.
