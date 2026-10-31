# Aether Tactics: Dominion

**Public mobile web-app prototype, version 0.3** — fantasy/sci-fi tactical card battler.

## Website setup (one-time)

All game files are already committed to the repository root on `main`.

1. Open **Settings → Pages** for this repository: https://github.com/hdog960/aether-tactics-dominion/settings/pages
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Set **Branch** to `main` and folder to `/(root)`, then **Save**.
4. Once published, test: https://hdog960.github.io/aether-tactics-dominion/
5. On an iPhone, open the game in **Safari** and use Share → **Add to Home Screen**.

### Connecting huntermakesgame.com (not done yet)

This GitHub repository intentionally does **not** contain a CNAME file yet. The user's existing main website has not been changed. After verifying the new GitHub Pages site, configure the custom domain in GitHub Pages settings, then update the authoritative DNS records. Moving the domain will replace the currently hosted site at that address.

## Gameplay

Single-player 7×8 tactical grid, collectible card cycling, Aeth resource scaling, terrain height and cover, springs, monster summoning, instant spells, tribute boss units and AI opponent. Local battle saves and offline cache included.

**Multiplayer is not implemented.** Online PvP requires a realtime backend, shared-match synchronization and validated turns.

## Updating

Publishing new commits to `main` updates GitHub Pages. The installed Home Screen app loads fresh content on a subsequent online launch or reload; its offline cache may require a relaunch. Battle state is in local browser storage and is not synced across devices.

No API keys or private secrets belong in this public repository.
