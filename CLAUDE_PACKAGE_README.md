# Dominion — Download and Transfer to Claude

This archive was requested as a complete handoff of **Aether Tactics: Dominion**.

## The one-file download

**Primary download (GitHub Release):**  
https://github.com/hdog960/aether-tactics-dominion/releases/download/claude-handoff-2026-11-06/Aether_Tactics_Dominion_FULL_Claude_Handoff_2026-11-06.zip

**Alternative (GitHub source archive, automatically built from the latest main branch):**  
https://github.com/hdog960/aether-tactics-dominion/archive/refs/heads/main.zip

The named GitHub Release ZIP is the preferred transfer. It contains the full tracked game repository plus `TRANSFER_MANIFEST.json` (each file's SHA-256 checksum and the exact Git commit) and `SOURCE_COMMIT.txt`.

## What is included

All tracked source, scripts, CSS, HTML pages, painted WebP/PNG/JPG/SVG art, game icons and manifests, campaign data, historical versions, the entire `.github/workflows/` directory, the `tools/` testing directory, **every existing Markdown document**, plus `CLAUDE_HANDOFF.md` and this instruction file.

The ZIP has one root folder (`aether-tactics-dominion/`) and is not split into volumes. Files within it remain editable by Claude. **It does not include the actual iPhone's local browser saves**, which are stored only in Safari/PWA localStorage, and does not contain Git commit history (`.git/`). Git history remains in the original repository.

## On iPhone

1. Open the GitHub Release ZIP link in Safari and download the ZIP to the iPhone Files app (Downloads).
2. In Claude, attach the ZIP if that Claude client accepts ZIP uploads. If your Claude client cannot extract archives, use the Files app to uncompress the ZIP and provide the essential files (especially `CLAUDE_HANDOFF.md`, `README.md`, `DOMINION_ROADMAP.md`) or use Claude Code with access to the repository.
3. Tell Claude: **"Read CLAUDE_HANDOFF.md first. This is the full working Dominion game. Preserve art and saves, follow the locked roadmap, and do not start v5.0 until I direct you."**

For direct continuation on a computer with git, Claude Code can clone the repo URL rather than use the ZIP. The handoff guide is also available online: https://github.com/hdog960/aether-tactics-dominion/blob/main/CLAUDE_HANDOFF.md

## Current completion and next mandatory gate

The game has 60 cards and the v4.6 replayability systems. v4.7 private duel synchronization, bounded ACK retries, reconnect logic and first-join handshake are implemented. Live browser tests include two independent cloud computers playing cards via real public WebRTC, surviving five full rounds and a guest reload. **A physical two-iPhone Safari test using independent Wi-Fi/cellular networks is still required before declaring v4.7 fully accepted**. Full details: `V47_REAL_IPHONE_ACCEPTANCE.md`.

**User's locked stopping point: after v4.7, stop and request the user's next roadmap decisions.**

## Verify the transfer

If you are using a computer, unzip the archive and read `TRANSFER_MANIFEST.json`. Its `file_manifest` gives a path, byte count, and SHA-256 checksum for every tracked file in the export. If the downloaded ZIP is corrupt, use the source ZIP alternative and compare the files to the repository's `main` branch. No files should need to be invented or reconstructed from screenshots.
