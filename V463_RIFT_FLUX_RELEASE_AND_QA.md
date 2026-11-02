# Dominion v4.6.3 — Optional Rotating Rift Flux

## Design and implemented scope

This is the next replayability increment after v4.6.2: **Rift Flux**, an optional challenge mode layered over any of the existing three three-stage Gauntlet paths. Its toggle and three-stage preview live in the existing Commander’s Hall. It defaults to **OFF**, so existing Wayfinder, Stormbound and Ironbound rules, rewards and saved attempts are unchanged.

Every new Flux attempt is assigned **three different battlefield omens**, in a predictable rotating order. The starting omen shifts by one as the Gauntlet attempt counter increases (rather than re-rolling after reload), and the exact schedule is frozen in the stored run and v4 match snapshot. The Hall previews all three names and detailed tactical effects, and locks the toggle and path controls during an active or ready-to-continue run.

## Four original gameplay modifiers

| Omen | Authentic in-battle effect | Intended decision |
| --- | --- | --- |
| **Aeth Tide** | Both commanders start the encounter with 2 additional Aeth (capped at 10) | Fast spell and creature tempo on both sides |
| **Warden Patrol** | One additional enemy soldier with 1 shield starts near the enemy Core, while the player receives 1 extra starting Aeth | Decide whether to contest the soldier or race the Core |
| **Siege Lines** | Enemy Core starts with 4 additional HP, player gets 1 extra Aeth and one additional opening card (maximum five) | A longer siege in exchange for more opening choices |
| **Veil of Wards** | Both teams' creatures summoned during rounds 1 or 2 gain 1 shield (universal shield cap applies) | Prioritize early deployment and formation protection |

Flux applies only to actual solo Rift Gauntlet engine state. It does **not** affect online matches, normal quick battles or campaign missions, does not add paid power and preserves all 60 existing cards.

### Long-term reward, fair progression and anti-repeat protection

Finishing a full three-stage Flux attempt grants an additional **60 gold on the first full Flux clear only**, regardless of which path is chosen. Repeat clears add to a `fluxClears` counter but never pay another Flux first-clear bonus. This is additional to the original first Gauntlet clear and distinct route-specific rewards, each of which retains its own existing anti-duplicate flag. Lost or abandoned runs cannot claim Flux first-clear rewards.

## Saved data

No changes to the existing `aether-dominion-profile-v21`, `aether-dominion-v04`, `aether-dominion-deck-v20` or `aether-dominion-loadouts-v452` storage keys.

Only additive fields:
- `profile.gauntlet.fluxClears` and `profile.gauntlet.fluxFirstRewarded`
- `profile.gauntlet.current.flux` boolean and `current.omens` three-element immutable schedule
- `S.gauntletOmen` and `S.gauntletOmenDetail` inside the existing version-four match snapshot

Old active and completed Gauntlets without these fields play as before, with no event effects or migrations that clear progress. Existing Card Masteries, Forge contracts, copies, levels and campaign saves remain untouched.

## Testing and limits

- [Real combat, saved-run and 180-battle regression workflow](https://github.com/hdog960/aether-tactics-dominion/actions/workflows/v463-rules-qa.yml): 18 new engine cases covering balanced effects, three distinct rotating omens, stage continuation, 60-card roster, legacy saves, v4 storage, first-clear idempotence, and exclusion from competitive play, plus previous v4.5 and v4.6 mechanics.
- [Actual 390px and 320px Chromium browser QA](https://github.com/hdog960/aether-tactics-dominion/actions/workflows/v463-browser-qa.yml): toggle and preview readability, starting a Flux encounter, persistence after browser reload, inability to alter mode during a run, existing 60-card Forge, normal Ironbound battle, and runtime errors.
- Release guard: both HTML entrypoints, offline service worker, source synchronization, saved-data compatibility, and the mandatory stopping point after v4.7.

Automated phone-sized Chromium is not a physical iPhone Safari performance test. Real long-distance two-device WebRTC duels remain a later v4.7 milestone.

## Roadmap boundary

Continue if necessary with final v4.6 balance/polish, then focus v4.7 on actual private-duel reliability. **Stop after v4.7 for creator review.** Do not proceed into v5.0 unasked.
