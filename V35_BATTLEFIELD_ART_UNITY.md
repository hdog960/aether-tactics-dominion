# Aether Tactics: Dominion — v3.5 Battlefield Art Unity
## Objective
Connect the fantasy art direction to real, playable tactical units and spells. This release updates the rendering path and asset pipeline rather than just providing concept images. No card balance, tactical rules, unlocks, or save schema are modified.

## New built-in image assets
- `art/units-painted-v35.png`: 5-frame RGBA sprite strip, 64×88 per frame. These are transparent cutouts derived directly from the high-detail original illustrations generated for Aether Titan, Abyssal Leviathan, Ember Adept, Thorn Warden, and the Aeth Renewal cleric. Four are summoned creatures; the cleric appears as a healing effect.
- `art/cards-painted-v35.webp`: 7-panel illustrated card-art strip. Card keys in order: `t,l,c,j,h,w,m` = Titan, Leviathan, Ember Adept, Thorn Warden, Aeth Renewal, Prismatic Ward, Planar Meteor. These are the exact painting sources used when deriving the new unit cutouts.
- All images are self-hosted, precached, and have no runtime image generation or third-party image services.

## In-game integration
- New `v35-battle-art.js` is loaded after `v34-art.js` and before the game engine. It exposes premium card paintings for the seven keys, routes the matching four new units to their transparent painted cutouts, and exposes a fifth cleric sprite for the heal effect.
- The six existing original high-quality painted units are preserved from `art/units-feet.png`.
- Additional summon types without bespoke high-resolution art (`p,k,d,o,y,z,A,B`) now use painted, transparent fantasy unit silhouettes with differentiated magical lighting instead of the previous simplistic geometric fallback. This is temporary: their card-to-unit shape is **not yet a bespoke match** and requires an additional 8-sprite illustration pass.
- `v30-scene.js` renders all summoned units with feet planted on the projected tiles, perspective scaling, idle movement, footstep motion, attack lunges and recoil, hit flashes, collapse/death animations, ally/enemy feedback, and consistent selection/health indicators.
- Specialized combat effects: Planar Meteor (descending comet), Frostbind (ice spikes), Ignite (flame tongues), Silence/Exchange (arcane suppression), Aeth Renewal (same radiant cleric as the card), and Ward/Shield (protective magic shell).
- Artwork is not a clickable overlay: tactical pointer events remain tile-first.

## Compatibility
Original local save keys, collection upgrades, campaign gating, modes, peer networking, and battle actions are unchanged. Service worker bumped to `aether-dominion-v35-painted-battlefield-unity-20261031`. Both production HTML entrypoints have versioned `v35` resources.

## QA / limitations
- Syntax and resource references can be source-tested automatically.
- Physical iPhone battle rendering, practical sprite identification, and two-phone multiplayer remain unverified until playtesting.
- The 4 newly extracted creatures use authentic matching painting subjects but are small low-resolution cutouts and will need pose-by-pose animation sheets for production-level smoothness. Current idle, walk, hit, attack and death behavior is compositor motion around each sprite, not independently illustrated animation poses.
- Eight additional summon types still use themed painted-base stand-ins (never the old flat polygon art). Full 1:1 card-to-battlefield identity for them is **not complete yet**.
- The non-upgraded card illustrations outside the seven new paintings and seven earlier premium cards remain on the preceding art system; those are outside this battlefield integration pass.
