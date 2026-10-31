# Aether Tactics: Dominion

**v0.5 — The Luminous Rift** is a public iPhone-friendly tactical card battler hosted on GitHub Pages.

**Play:** https://hdog960.github.io/aether-tactics-dominion/

## What's in v0.5
- True oblique 55-degree camera rendered on a pixel-accurate canvas, not a flat top-down grid
- Depth-sorted monster sprites on raised, perspective-projected floating stone tiles, with near/far perspective scaling
- Multi-layer atmospheric world: floating cliffs, carved ruins, moonlit mountains, chasm waterfalls, glowing crystals and altar architecture
- Replaced 32×40 placeholders with new richly shaded 112×152 pixel sprites for eight units and four spells, rendered using nearest-neighbor scaling
- Crystal pillars, springs, Aeth Cores, and redesigned illustrated card hand
- AI solo matches, automatic local solo save
- Experimental **online two-player duels** via private room codes and invite links
- Host-authoritative move validation, shared turns, synchronized Aeth, hands, HP, units, and reconnect when both clients return

## How to test online
1. Both players open the game in Safari.
2. Host taps **ONLINE DUEL** then **CREATE ROOM**.
3. Host taps **SHARE INVITE LINK**, or sends the displayed six-character room code.
4. Friend opens the link and taps **JOIN**, or enters the code and taps **JOIN**.
5. After the connection succeeds, host plays first; friend plays second. Both should see the same battlefield.
6. Note any bugs, connection issues, visual feedback, and balance concerns.

**Note:** The online mode uses Trystero over WebRTC with public Nostr signaling relays. No separate paid service is needed for this experiment, but peer-to-peer connectivity is not guaranteed on all Wi-Fi/cellular networks. There is currently no TURN fallback, cloud-saved match history, account system, or anti-cheat server. The host must stay connected. Never use this as ranked/public matchmaking without stronger backend support.

## Engineering
- \`index.html\`: v0.5 production entrypoint; \`v05.html\`: staged release; \`v04.html\`: previous version backup
- \`v04-style.css\` and \`v05-style.css\`: responsive card, HUD, and angled scene framing
- \`v05-art.js\`: 112×152 shaded pixel monster/portrait renderer
- \`v05-scene.js\`: perspective tile projection, lighting, architecture, particle effects, interactive hit tests and unit depth sorting
- \`v04-engine.js\`: game logic, validation, display, AI, multiplayer integration
- \`v04-net.js\`: WebRTC room networking
- \`sw.js\`: offline service worker and update cache
- \`manifest.webmanifest\` and icons: iPhone Home Screen support

Repository intentionally has no custom \`CNAME\`; **huntermakesgame.com stays unchanged**. Updates to \`main\` deploy through GitHub Pages. To install on iPhone, open the game in Safari and choose Share → Add to Home Screen.

## Visual QA & rollout
A targeted browser automation QA of v0.5 confirmed the angled canvas renders, the game loads with both opposing factions, all four cards and controls are populated, and card selection updates the interface. This is not a full iPhone graphics/performance audit or a verified cross-state, two-phone multiplayer test. An additional card-portrait visibility safeguard was incorporated before production promotion.
