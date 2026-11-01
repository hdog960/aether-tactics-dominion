# Dominion v4.4.3 — Campaign Epilogues and Result Integrity

## Delivered
All 12 story missions and three Crown Trials receive individually authored victory and defeat epilogues voiced by a regional character. The game-over overlay now includes a scrollable story chapter panel, first-clear/replay indicator, actual expedition doctrine, completed round, event count, stars and first-clear reward reminder. It preserves the 396 painted sprite frames, world map, collection and Forge.

The outcome narrative is rendered using textContent so narrative strings cannot inject markup. Result logic is read-only: it does not alter rewards, objectives, unlocks or online multiplayer.

## Save and rewards
The version-4 match store and permanent commander profile schema are unchanged. Existing match-ID guard prevents awarding the same match twice. First clears unlock mission stages and a unique bonus once. Replay victories receive only ordinary match rewards; defeat never opens a stage.

## New 45-case QA
The isolated QA page now offers 45 RESULTS QA: loss, initial win and replay win for each of 15 missions. Objective completion uses the real engine's victory gates, controlled in-memory:
- Assault: enemy Core reduced to zero.
- Capture: allied units holding both Aeth springs for the required turns.
- Defend: survival to the required round.
- Hunt: defeat the actual champion through damage and death handling.

Every case checks game-over status, correct winner, campaign completion, rewards paid only once per match, first-clear status, and authored scene. No personal player saves or online duel data are used.

Other available QA actions: 30 story choice starts, 15 recurring encounter scripts, seven boss transitions, movement/attack checks, original character sprite-frame audits and solo AI checks.

## Caveats
The 45 cases validate controlled objective progression and reward settlement, not full human tactical playthroughs or statistical win-rate balance. Physical iPhone Safari gesture and frame-rate testing remain pending.

## Next
Compare longer campaign challenge results and the six preparation plans before beginning v4.5 card expansion.
