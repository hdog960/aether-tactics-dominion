# Dominion v4.6.0 — Rift Gauntlet and Card Masteries

## What actually ships in this first v4.6 slice

**Rift Gauntlet** is a new optional solo mode in the Commander's Hall. Its linked three-battle structure reuses the published, fully painted 60-card catalogue and the existing actual tactical game. The Hall has a dedicated richly styled activity, a three-segment progress indicator and an explicit resume/continue route. No changes to the five bottom navigation tabs are necessary.

Three sequential encounters must be won in one run, using the **same saved 24-card deck and frozen card ranks for the entire run**:

| Stage | Arena | Opponent | Opponent Core | Player Core |
| --- | --- | --- | ---: | --- |
| I — **Whispering Gate** | Rune Valley (verdant) | Skirmish-oriented AI | 24 | Starts at 24 |
| II — **Frostbound Passage** | Frostglass Reach | Arcane AI plus real frost hazard tiles | 27 | Starts at previous battle's surviving HP +4, capped at 24 |
| III — **Crownfall Reckoning** | Crownfall Sanctum | Fortress AI with a separately rendered armored sentinel, plus real arcane hazard tiles | 30 | Starts at surviving HP after stage II +4, capped at 24 |

A loss or draw ends the current run, and replay starts a new attempt at Stage I. Choosing a new standard skirmish abandons the current Gauntlet; if a saved stage is subsequently replaced by another battle, the Hall safely restarts a new run rather than leaving an orphaned continuation. Completed stages do not skip a future run. Player health never resets fully between stages unless the player earns enough health through survival plus the bounded +4 reprieve. A defeated enemy Core ends an encounter under the same basic battle rules as existing solo play.

### Saves, fairness and idempotence

Existing save keys and schemas remain intact: `aether-dominion-v04` match snapshots, `aether-dominion-profile-v21` commander profile, `aether-dominion-deck-v20` selected deck, and `aether-dominion-loadouts-v452` three named Armory slots. The profile receives only additive `gauntlet` and `masteryClaims` fields. Prior card levels, copies, commander XP, campaign chapter completion and normal matchmaking behavior are preserved.

A Gauntlet records its own run ID, locked deck, initial ranks, stage, wins and surviving Core health. Reloading the page resumes the saved actual match and associated run. A completed stage advances only if its run ID and stage match the claimed, victorious, completed match. Repeated result rendering cannot advance stages or pay out another copy. Starting a fresh quick battle intentionally abandons an unfinished run. The New Match control asks for confirmation before abandoning a Gauntlet.

Solo stat increases remain limited to the ordinary PvE system. **Private duels still equalize levels and never receive Gauntlet bonuses.**

### First-clear reward

The first full three-stage clear grants **180 extra gold, 210 extra XP, and one Aether Lanternist card copy**, in addition to the normal per-match rewards. The profile's `gauntlet.firstClearRewarded` flag makes this bonus once per player profile, even after restarts, repeat wins or page reloads. Future successful runs count toward the permanent clears statistic but do not repeat that bonus.

## Card Masteries

The existing per-card usage history is now shown in a dedicated, scrollable **CARD MASTERIES** section of Forge. Only distinct cards used in a given completed solo match add a mastery mark; multiple copies played in one match do not multiply that mark. Previous mastery history is preserved.

| Mastery rank | Total solo match participation marks | One-time gold reward on a victory |
| --- | ---: | ---: |
| Bronze | 4 | 30 |
| Silver | 12 | 65 |
| Gold | 30 | 125 |

Rewards are one time per card per tier. A rank may be reached during a defeat, but its reward is claimed only on a subsequent victory that uses the card. Every milestone is recorded independently in `masteryClaims`. Mastery rewards never change competitive stats, unlock extra attacks or create paid advantages.

The Forge shows each used card's rank, a progress rail, next threshold and claimed tier count. The results and profile reward descriptions identify Gauntlet and mastery bonuses.

## Automated verification

- [Rift Gauntlet real-engine CI](https://github.com/hdog960/aether-tactics-dominion/actions/workflows/v460-rules-qa.yml): 20 focused persistence, stage, environmental hazard, mastery and reward-idempotence checks, with all previous v4.5.3–v4.5.8 spell/creature regressions, campaign bosses, mission plans, decks and **180 simulated normal battles**. A test failure blocks release.
- [Mobile-sized Chromium screenshots and UI](https://github.com/hdog960/aether-tactics-dominion/actions/workflows/v460-browser-qa.yml): actual Hall launch at 390px, actual first battlefield, page reload and Gauntlet resume, visible Forge mastery section, 320px Hall/tabs geometry, an isolated QA run of all stage/claim tests, and no JavaScript page errors.
- `tools/v460_release_guard.mjs`: both entrypoints loaded the new UI; production/QA engine and scene parity; existing card collection and version-4 save keys unchanged; stop after v4.7; PWA precaches the Gauntlet script, styles, and versioned game engine.

**Limitations:** Mobile Chromium viewports do not prove physical iPhone Safari touch/thermal/memory use. Real private duel testing across two distant devices remains a separate v4.7 objective. 180 simulation results are not competitive human-versus-human balance evidence. The Gauntlet is v4.6's *first* replayability feature, not completion of the entire v4.6 progression roadmap.

## Continued roadmap

v4.6 still includes deeper replay variety, extra mastery challenges and progression pacing beyond this first polished Gauntlet release. v4.7 prioritizes actual two-device WebRTC reliability. **Stop after finishing v4.7 for the creator's roadmap review.** Do not automatically begin v5.0.
