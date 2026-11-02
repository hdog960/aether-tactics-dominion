# Dominion v4.7.2 — Reliable First-Join Handshake and True RTC Data-Channel QA

## Problem and implementation
An initial connection could be established successfully while the guest's first 24-card loadout was delivered before the host registered its peer listener. The host then waited forever for the deck, and the guest waited forever for the battle to begin. This is an application-level race; it may occur even if WebRTC is working.

- The host now publishes a **waiting** authoritative snapshot immediately on peer connection, explicitly establishing that it can receive the guest loadout.
- A guest sends their existing 24-card deck on join and makes **up to five total bounded sends**, spaced four seconds apart, until an authoritative **playing** or **over** state arrives.
- A repeated loadout on a started duel returns the current authoritative snapshot and **never rebuilds the opponent's hand/deck**. The original 60 cards, upgrades, XP, gold, campaign and competitive stat balance are unchanged.
- Reconnects, mode switches, lost peer connections and new rooms cancel the old handshake timer. Manual **SYNC DUEL** and Safari foreground recovery can resend the same deck only before a duel starts.
- After exhausting retry attempts, the client displays a specific recovery message instead of silently waiting indefinitely.

## Verification and scope
- `tools/v472_handshake_browser_qa.mjs`: automated Chromium at 320px and 390px, drops the initial deck acknowledgment, confirms a bounded resend after four seconds, checks identical decks across repeated sends, confirms no later resend after host gameplay begins, checks repeat loadout cannot change an active host deck, and tests the host's waiting snapshot.
- `tools/v472_rtc_browser_qa.mjs`: uses **real browser RTCPeerConnection and RTCDataChannel** sessions between two Chromium phone-sized game windows, signaling offers/answers via Playwright's local test harness. It checks host/guest 24-card handshake, five full back-and-forth rounds, authoritative state convergence after every round and the connected indicators. It deliberately uses real encrypted peer-to-peer data transport but **locally exchanged signaling**.
- Current `tools/v464_rules_qa.mjs`, `tools/v471_network_qa.mjs`, and the v4.6.4/v4.7.0/v4.7.1 strict release guards remain mandatory; previous phone/browser suites also remain.
- No play saves, deck IDs, card art, level progression or mission data are migrated. Both production HTML entrypoints use the new engine; the offline PWA cache is versioned to `v472`.

## Limits
This is stronger evidence than a mock network queue, but two Chromium windows sharing a CI machine **do not prove** independent carrier NAT traversal, iOS Safari's lifecycle behavior, or reliability of Trystero's third-party Nostr signaling relays. It does not prove TURN availability (no production TURN credential service exists).

To claim full v4.7 remote reliability we need two real iPhones, one on Wi-Fi and one on cellular or truly independent Wi-Fi, a fresh room-code pairing, at least five full turns, background/resume, and disconnect/reconnect without an invalid turn or deck. Document observable pass/fail results. Restricted networks may require a paid TURN relay with ephemeral credentials. Do **not** embed permanent TURN secrets in static GitHub Pages JavaScript.

## Milestone boundary
Even if every automated QA workflow succeeds, **do not** mark v4.7 complete until real independent-network iPhone evidence exists. Then **STOP** for the creator's planned roadmap review; never begin v5.0 automatically.
