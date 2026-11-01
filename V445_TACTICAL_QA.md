# Aether Tactics: Dominion v4.4.5 — Tactical Playtest & Spell Balance

## Production gameplay changes
1. **Purifying Rain shield overflow fixed.** Its cleanse effect previously directly added 2+bonus shield to a target, bypassing the global maximum of 5. Now it uses the same bounded shield-grant function as every other effect. Existing saved units above the limit are already normalized on loading. Cleanse still removes root and burning and pays its normal card cost.
2. **Enemy area-spell target priority fixed.** The rival AI previously considered only squares occupied by enemy units as Planar Meteor blast centers. That missed formations where the best area-spell placement is an *empty square between targets*. It now evaluates every legal blast center and scores multi-unit hits and relevant Core damage. No free energy, spells or attacks are created.

## Richer automated campaign evaluation (QA only)
- The balance bot now chooses from legal, actual **card spells** (single-target damage, area hits, frost/root, burns, cleansing, healing, shields, rally/bond, and other situational spells).
- It can summon mythic creatures by selecting actual allied tribute units, paying the full card cost, and retaining control of key Aeth springs where possible.
- The bot still deploys only one creature per turn. It casts at most two useful, affordable spells before issuing validated moves and attacks. All orders use the same authoritative apply() legality checks as the production game.
- Each of 60 seeded games reports the player plan, mission objective, victory, turn, Core health, unit counts, scripted event count, and **actual cast/spell, tribute summon, regular summon, movement and attack counts**. Matched random seeds make comparisons across a mission's two preparation plans repeatable.
- The browser QA panel offers **60 TACTICAL BATTLES** and **SPELL & MYTHIC QA**. The latter exercises real authorized in-game actions in a forced, memory-only scenario: Rift Barrage damages a rival creature at the legal position and spends Aeth; Aether Titan consumes one friendly unit, costs seven Aeth, and appears on the actual board; Purifying Rain clears root/burn without pushing shields above five; enemy Planar Meteor targets an empty legal center that hits two units.

## Boundaries
- The tactical player is an automated testing agent, **not a player-facing autopilot**.
- Its win rates are indicators for further investigation, not predictions of human results. It may still be less capable than a skilled player; two random seeds per choice is too little for statistically reliable balancing.
- Only the two explicitly described rule fixes affect live game balance. Campaign mission rewards, version-4 saves, deck constraints, existing 396 animation frames, world map, tab bar, Forge scrolling, and multiplayer protocol stay unchanged.
- QA uses qa-v39.html's isolated in-memory storage and never overwrites user progression.

## Pending
Live browser verification and any fixes it reveals. After passing, review harder campaign scenarios and begin carefully scoped v4.5 card-expansion batches with original art, source checks and gameplay simulations.
