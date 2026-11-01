# Aether Tactics: Dominion — Development Roadmap

## Delivery order
This roadmap is incremental. Future versions below are plans, not completed work.

### v4.3 — The Living Battlefield
- **v4.3 first implemented pass:** distinct spell and buff visual signatures drawn by the actual isometric scene; solo AI positional evaluation (spring control, elevation, hazard avoidance, threat pressure, finishing blows); energy and action legality preserved; battlefield canvas pauses when hidden and supports reduced-motion frame pacing; battle CSS feedback improved.
- **Next within v4.3:** animation keyframes for individual character categories, meaningful animation of spell contacts, timing polish, benchmark under real iPhone Safari, touch/scroll verification and accessibility review.
- **QA:** isolated legal action tests, 12-turn solo AI simulations, screenshots of new spell VFX, existing progression/save stability, two viewport sizes.

### v4.4 — Campaign Depth
Expand existing 12 missions with distinct encounter scripts (reinforcement warnings, objective pressure, region hazards) and authored story beats, without rewriting the world map or unlocking content accidentally. Balance the 3 Crown Trials so each phase feels unique.

### v4.5 — The Great Card Expansion
Grow to ~60 carefully balanced cards, designed across distinct viable archetypes (sacrifice, flying, terrain control, spells, counterspells, frontline). Create bespoke card/battlefield matching art and descriptions before shipping each batch. Regression test existing 24-card deck construction and local progression.

### v4.6 — Progression & Replayability
Rift Gauntlet, milestone rewards, mastery challenges, progression pacing and long-run variety. Include challenge reset safeguards and migration tests.

### v4.7 — Multiplayer Reliability
First prove private duel between actual devices and network configurations. Only then plan authoritative profiles, matchmaking/ranking, and seasonal rewards. Do not advertise ranked matchmaking as currently available.

## Safety and preservation
Protect version 4 match save and existing commander profile keys. Keep all new testing on the separate isolated QA route; do not clear real player saves. Home Screen cache updates must use versioned assets.
