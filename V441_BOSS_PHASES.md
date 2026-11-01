# Dominion v4.4.1 — Champion Phases and Crown Trial Identity

## Production mechanics
The seven hunt encounters have bespoke two-stage reactions at approximately 65% and 30% of champion HP, replacing the previous one-size-fits-all boss escalation.

| Encounter | Phase 1 | Phase 2 | Counterplay |
|---|---|---|---|
| Warden of Thorns | Roots one nearby challenger | Roots up to two nearby challengers | Attack at range, plan movement |
| Glassbound Seer | Adds shield to nearest friendly retainer | Chills nearest challenger within four tiles | Spread attacks, avoid crowding the Seer |
| Ember Colossus | Opens an additional lava fissure | Opens another fissure | Position outside signaled hazards |
| Crown Guardian / Leviathan | Marks closest challenger for enhanced follow-up | Shields up to two defenders | Protect marked ally, prevent the Leviathan from engaging |
| Hollow King | Gains one movement point (max 3) | Brands the nearest challenger | Use blockers and movement control |
| Mirror Court | Arms one reflected point of basic-strike damage | Arms up to two reflection charges | Use guarded units or spell damage; spells do not reflect |
| Rift Sovereign | Opens two volcanic fissures | Opens two additional fissures | Plan safe lanes and finish before the next terrain tick |

- Existing phase-one generic minion and ward support is preserved but lowered from 2 shield to 1 to compensate for added effects.
- Original second-phase +1 attack (maximum 7) remains in place. All adds still obey the existing eight-unit cap and legal tile rules.
- The phase logic runs only for a campaign champion `S.championId` and never on normal quick matches or online duels.
- Mirror retaliation is a **single point of damage after a basic attack** while the champion survives and holds a charge; its counter does not trigger from spells or recursively from reflections.
- Each phase writes a short text event into version-4 mission state so players can understand what happened.
- A readable **BOSS PHASES** section in world-map mission briefings explains both thresholds and how to counter them.
- No changes to roster, decks, card stats, persistent profile, campaign unlocks, reward amounts or saved-game format.

## Quality gates
- Source validation: JS syntax, seven unique boss kits, identical 15 encounter script count, safe phase bounds, caps on shields and movement, dedicated QA restricted to isolated `qa-v39.html`.
- New isolated **7 BOSS PHASES** audit: launch each boss fight in test memory, simulate threshold transitions, ensure exactly two authored phase events, no overlapping/illegal units, and verify that the Mirror Court retaliation consumes a charge and deals exactly one damage.
- Previous **15 ENCOUNTERS**, **AI 12 TURNS**, **COMBAT ENGINE TEST**, and both sprite-frame audits remain available.
- Live browser testing is required before marking deployed gameplay verified.

## Remaining work
This is the second development pass in v4.4, not the complete campaign overhaul. Still planned: richer dialogue scenes, extended balance/performance simulations, end-to-end campaign clear runs, physical iPhone WebKit verification, and multiplayer reliability.

## Live deployment and QA — November 1, 2026
- GitHub Pages successfully deployed commit `8b8e0e21252d89d72d4fd3a11abac934745657ad` and the main public page returned title **Champion Boss Phases v4.4.1**.
- Live test and screenshots: https://agent.tinyfish.ai/runs/50894235-a65e-4290-9a67-15e5d2cccaf4
- **7/7 BOSS PHASES PASS**, each phase-one and phase-two event triggered once, board legal, zero reported JS errors.
- **Mirror Court PASS**, charge consumed, one reflected point after a basic strike; spell retaliation excluded by the authoritative condition.
- **15/15 signature encounter events PASS**, all six event mechanisms still operate.
- **16/16 movement/attack tests PASS** for the eight newer summonable creatures.
- AI legality test ran until the match ended: **11/11 checked turns passed**, ending before 12 because the match concluded; not reported as 12/12.
- The browser reached the campaign map. The locked Warden of Thorns boss-briefing text was **not clearly captured** in that run, although the map source includes boss phases, threshold hints and counterplay.
- No real user save data was touched; QA uses a memory-only storage shim. Physical iPhone WebKit input/performance and complete campaign playthroughs remain outstanding.
