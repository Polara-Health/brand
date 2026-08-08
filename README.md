# @polara-health/brand

One source of truth for the Polara Health product family: design tokens, per-app
theme layers, shared component variants, the Inter font, and logo assets.

## Install

```jsonc
// package.json — pinned by tag; no registry needed
"@polara-health/brand": "github:Polara-Health/brand#v1.0.0"
```

Or publish to GitHub Packages under the `@polara-health` scope.

## Use (Tailwind v4, CSS-first)

```css
/* packages/client/src/index.css */
@import "tailwindcss";
@import "@polara-health/brand/css/core.css";
@import "@polara-health/brand/css/theme-myhealth.css"; /* or theme-vitalsign.css */
```

```ts
import { buttonVariants } from "@polara-health/brand/button-variants";
import { statusBadges } from "@polara-health/brand/status-badges";
```

## The theme contract

Core owns neutrals, type, radius, semantic pairs, component variants. An app's
theme file defines exactly four slots and nothing else:

| Slot | Rule |
|---|---|
| `--color-accent` | primary fill, >= 4.5:1 with white text |
| `--color-accent-hover` | one oklch lightness step down from accent |
| `--color-accent-subtle` | accent at ~6% over white |
| `--color-ring` | focus ring, >= 3:1 on white |

Apps never define their own grays, radii, or type sizes. A new product joins the
family with one ~10-line theme file.

## Versioning

- **patch** — value tweaks (a hex changes)
- **minor** — new tokens or slots (additive)
- **major** — renamed/removed tokens (call sites must change)

## Deliberately NOT in this package

- shadcn/ui components — each app vendors its own; slate stays internal to them
- Email templates — their grays are Tailwind v3 defaults, load-bearing for
  Outlook/Gmail rendering; never merge with the web palette
- Layouts and screens — apps own their own UI

## Known open decisions

Brand red (logo #781732 vs token #87364e), brand dark (#26262e / #37323a /
#1b365d), tagline arithmetic. See BRAND-GUIDE.md §8 — do not "fix" silently.
