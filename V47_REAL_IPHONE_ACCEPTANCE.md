# Dominion v4.7 — Final Remote iPhone Multiplayer Acceptance

**Status:** Automated source, browser, real local RTCDataChannel, and public Trystero signaling evidence exists. This document records the still-required real Safari-on-device acceptance gate. Mark v4.7 complete **only** when results are recorded.

## Setup (two real iPhones)
1. Use normal Safari tabs (not private). Both visit `https://hdog960.github.io/aether-tactics-dominion/` while online and confirm the visible app build is **v4.7.2 or later**.
2. The host taps **PRIVATE DUEL → OPEN DUEL CHAMBER → CREATE ROOM**, then uses **SHARE INVITE LINK** or sends the six-character room code.
3. The guest opens the invitation or taps **JOIN** with that same code. Start with one iPhone on home Wi-Fi and the other on a separately routed cellular network. If possible repeat with players at separate addresses/cities.
4. Note the connection result and approximate elapsed wait (not an estimated promise). Never record personal IPs or location details in screenshots.

## Required pass / fail checks
- [ ] Both peers enter the same live battlefield and see **PRIVATE LINK ACTIVE** (not indefinite "Connecting…", "Waiting for deck…", or "RECONNECTING").
- [ ] Both see the same starting Core HP, round number and legal first turn; the host's deck and guest's chosen deck are accepted.
- [ ] Host ends a turn; guest receives the active turn without refreshing; guest ends a turn; host receives the next round. Do **five full rounds**.
- [ ] Both players can select, play, and target at least one card and watch the same consequences (not only press END TURN).
- [ ] Guest intentionally double-taps END TURN. No extra turn occurs, no copied cards and no duplicate rewards.
- [ ] Guest briefly backgrounds Safari, returns, and uses **SYNC DUEL** if necessary. There is no duplicate action or frozen turn.
- [ ] Guest switches networks Wi-Fi ↔ cellular, reconnects to the *same* room if necessary, and can continue the original match without opponent deck reshuffle or skipped round.
- [ ] Repeat disconnect/reconnect from the host side while guest is waiting; the current match is preserved (or a clear, actionable failure is shown).
- [ ] Complete a match. Both sides agree on the outcome. No PvP deck/rank buffs leak from solo upgrades and no campaign/save corruption occurs.
- [ ] Repeat on two different networks where possible; ideally an out-of-state friend. Collect the actual pass/fail results for each pairing.

## What to send to the developer if a check fails
Save only: version, device/browser family, Wi-Fi versus cellular (without provider or IP), whether **CREATE ROOM** or **JOIN** failed, message shown in the Duel Chamber, which numbered step failed, and a screenshot of the **link ribbon / room status**. Avoid posting room codes while active.

## Failure diagnosis
- **Room never pairs:** check both users have the same build, actual internet connectivity and code; try a fresh room. If only cellular fails repeatedly, likely NAT/firewall: a TURN relay may be necessary.
- **Connected but stuck awaiting deck:** use **SYNC DUEL**, then retry creating/joining a fresh room if needed. v4.7.2 retries the initial deck automatically.
- **Guest action stuck awaiting host:** wait for the bounded retry or use **SYNC DUEL**. If it persists, report the displayed message and round.
- **Disconnect loses match:** record the exact round and whether the guest/host disconnected; this fails acceptance.
- **TURN:** Do not add static TURN passwords to GitHub Pages. A TURN service with ephemeral credentials requires a backend, a cost decision, and separate setup.

## Acceptance rule and creator stop
Green automated workflows **are not a substitute for physical iOS Safari and cross-network tests**. Only a documented real two-device session satisfying the checks can be marked **v4.7 complete**. After that, stop for the creator's agreed roadmap review. Do not implement v5.0 or additional card expansion without explicit direction.
