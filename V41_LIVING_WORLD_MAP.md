# Dominion v4.1 — Riftfront Living World Atlas

## Goal
Replace the flat, stacked campaign mission list with the **approved illustrated four-region world map** while retaining all functioning mission progression, objectives, campaign rewards, and saves.

## Implementation
- `art/riftfront-atlas-v41.webp`: compressed, game-ready crop of the exact approved full-color map artwork (941 × 1204, 291 KB).
- `v41-campaign-atlas.js`: renders 12 *positioned, clickable* mission markers across the four regions, calculates actual availability, completion, active state and progress from `AetherGame.campaign()`, opens native game-styled mission briefings, and launches `AetherGame.startMission()`.
- `v41-campaign-atlas.css`: illustrated scrollable atlas, accessible 48×48 markers, glowing available missions, completed markers, locked markers, live chapter counters, map panning buttons, Fit Map toggle, and responsive mission-detail dialog.
- Legacy `v30-shell.js` campaign renderer remains as a **hidden compatibility and fallback layer**. The new atlas is rerendered whenever the Map tab opens; the underlying engine/missions have not been replaced.
- `index.html` and `v30.html` load the atlas stylesheet after existing themes and atlas controller after navigation scripts.
- `sw.js` uses a new atomic precache key to load the art, styles, and controller when the Home Screen app updates.

## Playability
- Tap any of 12 mission crests to inspect its name, story, objective and rewards.
- Locked missions show details but cannot be started.
- Available missions show a bright gold crest and can be started.
- Cleared missions show a green crest and can be replayed.
- If the same mission is active, the detail panel has **Continue Battle**, not a restart.
- If another battle has reached an ongoing round, the briefing warns that launching will replace the unfinished match; campaign/collection saves remain intact.
- Crown Trials still use the original engine gating and buttons but open the new mission briefing.
- Four individual chapter completion counts and the overall 12-mission and sigil counters stay synced with existing save state.
- Map can pan horizontally on iPhone and is vertically navigable via the campaign scroller. Optional Fit Map shows the whole image width at once.
- Existing Play / Cards / Forge / Duel navigation is unchanged.

## Art fidelity
This uses the specific AI-generated illustration approved by the player, rather than substituting a simplified CSS or SVG mockup. Original scene text and decorative paths are embedded in the art; actionable mission markers and progress are genuine HTML controls placed over it. The illustrated chapter banners remain part of the same continuous world.

## QA expectations
- Verify the twelve markers and four live chapter counters on Safari-mobile dimensions.
- Check locking, replay, launch, active-mission continuation, and progress refresh on revisit.
- Verify the atlas remains scrollable without changing the fixed bottom navigation.
- Check no image load failures on GitHub Pages / installed Home Screen service worker.
- Verify existing local storage keys, battle engine, AI, and PvP were not modified.

Full iPhone WebKit/physical hardware verification remains a separate step. Never claim completed without a real test.
