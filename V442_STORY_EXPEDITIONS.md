# Dominion v4.4.2 — Story Expeditions and Tactical Preparations

## New player-facing system
All 12 Riftfront missions and 3 Crown Trials have authored pre-battle scenes with a named speaker, mission-specific dialogue and **two meaningful tactical preparation options**. In the illustrated world-map briefing, choose one before starting a mission. The choice is carried into the current battle, not permanently added to the player's inventory.

Six preparation doctrines offer different tradeoffs, so no single option is strictly free:
| Doctrine | Actual opening advantage | Real cost |
|---|---|---|
| Daring Vanguard | Player begins with 5 instead of 3 Aeth | Player Core starts at 22, not 24 HP |
| Shieldwall Advance | Both starting allies receive +1 shield | Player begins with 2 instead of 3 Aeth |
| Read the Omens | Player starts with a 5-card hand | Player begins with 2 instead of 3 Aeth |
| Cut Their Supply | Opponent Core begins 2 HP lower | Player Core begins at 22 HP |
| Hold the Line | On the first scripted mission event, wounded allies each recover 1 HP | Player starts with 2 Aeth |
| Rift Gambit | Player starts with 5 cards and 4 Aeth | Enemy also starts with 4 Aeth |

Each encounter offers only two appropriately narrated doctrine choices. The original mission story, rewards, time limits, enemy boss and special battlefield events remain intact.

## Technical integration
- `v30-campaign-data.js` adds 15 authored story scenes and 30 different dialogue decision prompts.
- `v41-campaign-atlas.js` renders a new story panel and two big, accessible decision buttons; an active mission displays the plan it originally used and does not allow changing it mid-match.
- `v30-engine.js` applies the valid selected plan during `startMission(id,false,planKind)`, stores its choice in `S.expeditionPlan`, and enforces bounded starting resources. The optional third parameter preserves previous callers.
- The Hold the Line reactive heal triggers at the first scheduled mission event, with the result added to the normal combat feed. No healing of already-full-health units.
- `v442-story.css` adds the tactical briefing treatment while keeping the approved world-map art, mobile scrolling and fixed tab bar.
- The new art-free UI does not introduce geometric icons or substitute any character artwork.
- The version-4 save format, existing localStorage key, card data, commander profile, mission completion status, Forge, and online multiplayer rules are unchanged. Existing in-progress matches are not reinitialized.

## Testing
- The save-isolated QA page includes **30 STORY CHOICES**, which actually starts every mission with both offered doctrines and verifies energy, shields, opening hand and Core health against expectations.
- Existing QA for 15 scheduled encounter events, 7 individual boss phases, 16 movement and attack actions, AI turns and sprite-frame integrity remains accessible.
- Browser QA must confirm the player can switch between the two decisions and start the mission with the selected benefits.
- Physical iPhone touch and full campaign-completion testing remain outstanding; this release does not claim them completed.

## Roadmap follow-up
Next is completing and balancing the remaining v4.4 campaign work through end-to-end mission challenge testing, richer post-battle story outcomes, and an optional repeatable strategy challenge. v4.5 card expansion is planned only after campaign balance and stability are satisfactory.
