# diceforge-site

**DiceForge Studios — public website and tools.**
Deployed via Cloudflare Pages at [diceforgestudios.pages.dev](https://diceforgestudios.pages.dev)

## Contents

```
index.html        Landing page — DiceForge Studios branding
builder.html      Character Forge — free SWADE character builder
swade-core.js     SWADE core rules data module (generated from swade-canon)
```

## Deployment

Pushes to `main` auto-deploy via Cloudflare Pages (~30 seconds).

## Data Pipeline

```
swade-canon (private)     →  generates  →  swade-core.js (this repo)
  core/*.json                               ↓
                                          builder.html consumes at runtime
```

The Character Builder displays summary-level reference data (one-line descriptions)
to support character creation decisions. Full rules text remains in the published
Savage Worlds rulebook.

## Exports

The Character Builder exports to Fantasy Grounds Unity XML, PDF, HTML, and RTF.

## Legal

Savage Worlds and all related marks © Pinnacle Entertainment Group.
Used under the Savage Worlds Fan License.
The Tribute Lands: Paradise Lost © DiceForge Studios Ltd.

