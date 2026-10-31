# Aether Tactics: Dominion

**Current public release: v3.1 — Commander's Hall and Riftfront Conquest**

**Play on iPhone:** https://hdog960.github.io/aether-tactics-dominion/

A mobile-first, tactical fantasy card battler with a 55-degree isometric battlefield, 32 original cards, upgradeable 24-card decks, a four-region campaign, and experimental private duels.

## Getting started
1. Open the game in Safari. The **Commander's Hall** lets you choose what to play.
2. Tap **Story Campaign** or **Map** to select from 12 missions spanning Rune Valley, Frostglass Reach, Ashen Crucible, and Crownfall Sanctum. The first mission is *First Footsteps*.
3. Choose **Quick Battle** for a fresh solo AI skirmish, or **Private Duel** to host or join a friend's room (experimental).
4. Use **Cards** to inspect and construct decks; use **Forge** to review XP, gold, achievements, mastery, and upgrade cards.
5. From a battle, tap **MENU** to return to the Hall, then **Continue Your Battle** to resume.

The Map loads as a scrollable four-region mission selector with objectives, lock/unlock status, sigils, and Crown Trials after completing the story.

## Game systems
- Tactical positioning, movement, cover, elevation, Aeth springs, spells, sacrifices, and unit abilities
- 32 card types with seven 24-card deck archetypes, each with counterplay
- Local commander XP, gold, card duplicates, upgrades, and six achievements
- Twelve campaign missions with distinct victory objectives and regions; three multi-phase endgame Crown Trials
- Save/resume support using browser local storage on the same device
- Private peer-to-peer duel experiments with level equalization; **not production-grade matchmaking**

## Important limitations
- **Online:** WebRTC via public relay signaling may fail across some cellular/Wi-Fi configurations. Two-device live verification is still required. There is no ranked matchmaking, anti-cheat backend, cloud account sync, leaderboards, or server-persisted recovery.
- **Offline:** Home Screen caching is supported. After an update, reopening the app while online allows the new cache to be installed.
- **Saves:** Browser device data is local. Clearing Safari website data or using a private tab may lose progress.
- **Quality assurance:** Automated progression and mission checks passed for v3.0; the v3.1 navigation regression fix has been source and syntax checked, but exact iPhone layout and multiplayer still need hands-on testing.

## Repository layout
- `index.html`: main release; `v30.html`: parallel entrypoint
- `v30-shell.js`, `v30-shell.css`: Hall, tabs, campaign selector and Duel hub
- `v30-campaign-data.js`: region layouts, twelve missions, and three Crown Trials
- `v30-engine.js`: battle engine, cards, persistence, progression, and AI
- `v30-scene.js`, `v30-net.js`: renderer and peer networking
- `sw.js`: local offline asset cache; `manifest.webmanifest`: Home Screen support
- `V30_RELEASE_AND_TESTING.md`: release and verification notes
- `BALANCE_AUDIT_v22.md`: prior balance and exploit review

The existing GitHub Pages domain remains independent of huntermakesgame.com. Source changes on `main` update the hosted game. Historical versions are retained for recovery and reference.
