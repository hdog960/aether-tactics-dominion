# Aether Tactics: Dominion

**Current release: v3.3 — Unified Pixel-Fantasy Card Art**

**Play:** https://hdog960.github.io/aether-tactics-dominion/

A free, iPhone-first illustrated tactical fantasy card battler. Choose what to play from the Commander's Hall, explore a 12-mission campaign across four unique regions, build one of seven different 24-card deck strategies from 32 original cards, upgrade your commander and collection, or test experimental private duels.

## Start here
- **Play**: Commander's Hall — select Quick Battle, Story Campaign or Private Duel; continue a previously saved solo battle.
- **Map**: Riftfront Conquest — four illustrated regions with 12 sequential missions and 3 endgame Crown Trials.
- **Cards**: the Grimoire — browse the 32-card collection or build a custom deck.
- **Forge**: level, gold, XP, card upgrades and six earnable milestone medallions.
- **Duel**: experimental peer-to-peer private match invitations.

The battlefield uses an angled 55-degree isometric perspective, Aeth springs, tactical movement, high ground, cover, summoning, spells, ritual sacrifices, and innate unit abilities.

## iPhone
Open in Safari; Share → Add to Home Screen. Updates to `main` publish through GitHub Pages. When a new release is published, reconnect while online to let the service worker replace the cached game assets.

## Saves
Commander progression, card upgrades, and campaign completion are stored in the device's local browser storage. Saved solo match snapshots retain the existing v4 format. Private tabs, clearing website data, or changing devices can lose progress. There is no cloud account synchronization yet.

## Multiplayer caveat
The Duel Chamber uses experimental peer-to-peer WebRTC and public signaling relays. Real-device, cross-network testing remains necessary. There is no production ranked matchmaking, anti-cheat server, authoritative player account system, or leaderboards.

## Technical structure
- `index.html` production entrypoint and `v30.html` alternate entry
- `v30-engine.js` rules, AI, progression, campaign execution, profile, and persistence
- `v30-campaign-data.js` campaign and region definitions
- `v30-shell.js` bottom-tab navigation and campaign selector
- `v30-scene.js` game canvas, `v30-net.js` private duel networking
- `v32-celestial.css` illustrated v3.2 theme and layout
- `v33-art.js` illustrated card variants for all 25 previously geometric placeholders, derived from the existing painted card atlas
- `v33-art-fixes.css` consistent card-grid proportions, readable card names, and duplicate mana badge corrections
- `v32-details.js` presentation-only decoration and accurate trophy display
- `art/ui-*.svg` seven original self-hosted fantasy scene illustrations
- `sw.js` offline asset cache, `manifest.webmanifest` Home Screen support
- `V32_VISUAL_OVERHAUL.md` initial visual overhaul
- `V33_ART_CONSISTENCY.md` art-pipeline analysis, changes, and remaining individual-portrait art goals
- `V30_RELEASE_AND_TESTING.md` base campaign tests and `BALANCE_AUDIT_v22.md` earlier balance review

The personal domain `huntermakesgame.com` is not altered by this repository.

## v3.3 Art note
All 32 card portraits now use the original seven painted atlas frames or illustrated variants derived from them. This replaces the 25 former flat geometric fallback portraits and corrects clipped card names. The new derived illustrations share base source archetypes rather than each having independently painted character art. The battlefield keeps transparent unit sprites to avoid drawing full rectangular portraits on the tactical grid.
