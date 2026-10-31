# Aether Tactics: Dominion v2.2 — Balance Audit

## Objective
Eliminate exploit-level interactions and dead picks without removing strategic archetypes. v2.2 retains all 32 playable card types, seven valid 24-card presets, original visual assets, and v4-format local match saves.

## Confirmed defects and corrections

1. **Unlimited defensive stacking.** Shield effects previously accumulated without bound. Every new shield gain now caps total shield at 5; excessive shield values from older saved matches are normalized during migration. Casting a shield spell on a fully shielded unit is disallowed.
2. **Aeth Renewal repeat attacks.** Healing and refreshing actions for 2 Aeth could be repeated on the same major creature in a turn. Renewal now costs 3, heals 3 (plus modest PvE upgrades), requires a useful target, and can refresh a given unit only once per round.
3. **Same-turn card recycling.** A discarded spell could be immediately shuffled back and replayed in the same turn after the deck emptied. Discards now reshuffle only as a turn begins; hands have a five-card hard limit, with a responsive five-column presentation.
4. **Fateful Exchange refund at the cap.** Refunding Aeth before paying the cost led to inconsistent prices. It now costs 3 and refunds 2 **after** paying, for a consistent net cost of 1 Aeth plus the sacrificed unit. Once per round; up to two extra draws subject to the five-card hand cap.
5. **Wisp Familiar rush.** Its Aeth rebate formerly applied to every Wisp, allowing cheap mass deployment. Only the first Wisp summoned per round refunds 1 Aeth. Wisp has 1-tile attack range, preserving its inexpensive scout role.
6. **Aether Titan dominated by Leviathan.** Titan kept its heavy 7-Aeth cost but now needs one sacrifice and has 14 health. Its 1-tile movement keeps a distinct slow-heavy niche.
7. **Low-impact combo/support characters.** Rune Conductor, Crypt Keeper, Oath Sentinel, Dusk Reclaimer, Echo Scribe, and Tidecaller received limited durability, movement, or attack improvements. Sky Manta gets 1 shield itself after moving when no adjacent ally needs protection.
8. **Echo Scribe unreliable draw.** Instead of attempting to add a card to a full hand, Scribe now returns the last discarded spell to the top of the draw pile once per round, or gains 1 shield if no eligible spell exists.
9. **Underpowered delayed trap and counterspell.** Veil Snare now deals 3 damage and lasts four rounds; tile-entry traps resolve before arrival-based shield effects. Null Chime strips up to 3 shield and weakens the next basic strike by 2 (minimum 1).
10. **Indefinite stalemates.** After 24 completed rounds, the match is scored by Core integrity first, then spring control and surviving unit health. An exact tie is a draw and still grants modest solo progress.
11. **Progression mismatch.** Solo AI combat levels increase gradually with the average card level of the player's saved deck, avoiding completely unscaled opponents at high upgrade levels. Private online duels continue to normalize card levels to one.
12. **Unfair or missing card rewards.** Match copies are drawn from the entire starting deck, including units already played, rather than only cards left in hand/discards. Progress rewards are limited to single-player until server-authoritative online verification exists. Completed matches cannot claim rewards twice.

## Automated verification

- **32/32** distinct cards found a legal playable position when supplied appropriate Aeth, units, and targets.
- **7/7** ready-made archetype decks passed size, copy, unit diversity, and mythic rules.
- **49 exploratory AI-versus-heuristic-bot matches** were run before the pace correction. Several ended unfinished at the simulation cutoff, which motivated the 24-round score limit. These are diagnostic bot matches, **not** empirically calibrated human win rates.
- Tests passed for capped shielding, once-per-round Renewal, net ritual price, Wisp rebate limits, prevention of instant recycling, trap detonation ordering, Echo Scribe spell recycling, Sky Manta support/self-protection, scoring, tie rewards, and prevention of online progression farming.
- **12 consecutive solo AI turn cycles** completed successfully in a regression scenario.
- v2.2 uses existing v4 battle snapshots and repairs old oversized hands safely (excess cards go back into the draw pile).

## Limits / future playtesting

Balance is not mathematically guaranteed. Human testing should monitor deck win rates, card inclusion rates, average match length, damage per Aeth, and whether later card levels create unwanted difficulty spikes. The current player profile is stored locally; online duels are experimental and have not been verified across two physical devices. Remote anti-cheat, rankings and server-stored account progression are not yet implemented.

No user save was deleted or wiped by the audit.
