# Dominion v4.2 — Forge iPhone Scroll Repair

## User-reported bug
On iPhone, the Forge tab was visible, but vertical swipes did not allow scrolling through commander progression and the full card-upgrade catalogue.

## Root cause
Earlier progression CSS applied `overflow:hidden` to `.profile-body` and `overflow-y:auto` only to `.profile-upgrade-list`. Combined with the later Forge layout styles and a fixed-height iPhone application shell, this created a nested/clipped scroll surface rather than a natural Forge page.

## Fix
New last-loaded `v42-forge-scroll.css`:
- Sets the **whole Forge body** to `overflow-y:auto !important` with `-webkit-overflow-scrolling:touch` and `touch-action:pan-y`.
- Makes the upgrade list part of regular document flow, no longer a second nested scroll area.
- Ensures the profile panel is flex-height constrained with a `min-height:0` scroll child.
- Keeps the illustrated Forge title, footer actions and the persistent bottom navigation visible.
- Provides a small 'Scroll for more upgrades' hint and clear space below the last card.
- Updates both `index.html` and `v30.html` and bumps the service-worker cache to v4.2.

## Safety
No changes to game rules, card upgrades, profile data, localStorage keys, campaign, multiplayer or save logic. CSS-only functional patch.

## Required QA
Open the production site at a mobile-sized viewport, go to Forge, swipe upward on the cards, and verify the Commander Level panel scrolls out of view while later upgrade cards become visible. Then swipe down to the top. Check bottom navigation remains reachable and other tabs function. Recheck iPhone Home Screen version after refreshed cache.
