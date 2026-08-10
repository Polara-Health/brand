# @polara-health/brand

One source of truth for the Polara Health product family: design tokens, per-app
theme layers, shared component variants, the Inter font, and logo assets.

## Install

```jsonc
// package.json — pinned by tag; no registry needed
"@polara-health/brand": "github:Polara-Health/brand#v2.0.0"
```

Or publish to GitHub Packages under the `@polara-health` scope.

## Use (Tailwind v4, CSS-first)

```css
/* packages/client/src/index.css */
@import "tailwindcss";
@import "@polara-health/brand/css/core.css";
@import "@polara-health/brand/css/theme-myhealth.css"; /* or theme-vitalsign.css / theme-wellkept.css */

/* REQUIRED — see "The @source line is not optional" below. */
@source "../../../node_modules/@polara-health/brand/ts";
```

```ts
import { buttonVariants } from "@polara-health/brand/button-variants";
import { statusBadges } from "@polara-health/brand/status-badges";
```

## The `@source` line is not optional

**Tailwind v4 never scans `node_modules`.** Every utility class that appears
*only* inside this package's `ts/button-variants.ts` and `ts/status-badges.ts`
— `bg-polara-accent`, `ring-polara-ring`, `bg-polara-success-fill`, and the
rest — is therefore never generated in your build, and the affected buttons and
badges render unstyled. There is no error. The class is simply absent from the
output CSS, so the element falls back to whatever it inherits.

Add the `@source` line above, adjusting the relative path to reach your
`node_modules` from the file that declares it. Then **verify it worked** rather
than assuming — a wrong path fails exactly as silently as no line at all:

```bash
# after a build, the utility must exist in the emitted CSS
grep -c 'bg-polara-accent' dist/assets/*.css   # 0 means the @source path is wrong
```

If you cannot add an `@source` (no control over the entry CSS), the fallback is
to restate the affected utilities in your own app CSS so the scanner sees them
as literal strings — uglier, and it drifts.

## The theme contract

Core owns neutrals, type, radius, semantic pairs, component variants. An app's
theme file defines exactly four slots and nothing else:

| Slot | Rule |
|---|---|
| `--color-polara-accent` | primary fill, >= 4.5:1 with white text |
| `--color-polara-accent-hover` | one oklch lightness step down from accent |
| `--color-polara-accent-subtle` | accent at ~6% over white |
| `--color-polara-ring` | focus ring, >= 3:1 on white |

Because the slots live in Tailwind's `--color-*` namespace, they generate
ordinary utilities — write `bg-polara-accent`, not `bg-(--color-polara-accent)`.

Apps never define their own grays, radii, or type sizes. A new product joins the
family with one ~10-line theme file.

**Never drop the `polara-` prefix.** These slots were once named
`--color-accent` / `--color-accent-hover` / `--color-accent-subtle` /
`--color-ring`, which collide head-on with the names shadcn/ui's standard
`@theme inline` block maps. CSS resolves the collision by declaration order, so
a consumer whose shadcn block came after these imports silently lost both slots
— in the myHealth portal that shipped primary buttons as white-on-near-white.
The namespace makes that class of bug impossible instead of merely documented.

## Versioning

- **patch** — value tweaks (a hex changes)
- **minor** — new tokens or slots (additive)
- **major** — renamed/removed tokens (call sites must change)

### Migrating v1.x → v2.0.0

v2.0.0 renames the four theme slots into the `polara-` namespace. Nothing else
changed: every `--color-polara-*` token, the semantic pairs, the grays, the
fonts, and both `ts/` exports keep their v1 names and values.

| v1.x | v2.0.0 |
|---|---|
| `--color-accent` | `--color-polara-accent` |
| `--color-accent-hover` | `--color-polara-accent-hover` |
| `--color-accent-subtle` | `--color-polara-accent-subtle` |
| `--color-ring` | `--color-polara-ring` |
| `bg-(--color-accent)` | `bg-polara-accent` |
| `ring-(--color-ring)` | `ring-polara-ring` |

Consumers only need to change call sites that referenced the slots *by name*.
The theme files in this package are already updated, so an app that merely
imports `theme-myhealth.css` / `theme-vitalsign.css` and uses `buttonVariants`
needs no change at all.

Known call sites at the time of the rename:

- **vitalSign** — `packages/admin/src/index.css` and `packages/client/src/index.css`
  each carry `--color-primary: var(--color-accent);`, which must become
  `var(--color-polara-accent)`. vitalSign is pinned to `#v1.0.0`, so it keeps
  building until someone bumps it deliberately.
- **directHealthPortal** — eight call sites in `packages/client/src` use the
  arbitrary-property form directly: `bg-(--color-accent)`,
  `hover:bg-(--color-accent-hover)` (×4), `focus:bg-(--color-accent-subtle)`,
  and `focus-visible:ring-(--color-ring)` (×2). All become the plain
  `bg-polara-accent` / `hover:bg-polara-accent-hover` /
  `focus:bg-polara-accent-subtle` / `focus-visible:ring-polara-ring` utilities.
  Its `index.css` also carries a workaround comment about the collision that can
  be deleted on upgrade.

Find them with:

```bash
grep -rn -- '--color-accent\|--color-ring' src/
```

Note that these fail silently too: an un-migrated `bg-(--color-accent)` resolves
to an undefined custom property, so the element simply has no background.

## Deliberately NOT in this package

- A React logo component — vitalSign inlines its mark per app (BRAND-GUIDE.md
  §7.3 documents the canonical pattern). Exporting a `.tsx` would take a React
  peer dependency for the whole family and pin a JSX runtime, for one logo. The
  package ships the SVGs; each app owns its ~40-line inline component.
- shadcn/ui components — each app vendors its own; slate stays internal to them
- Email templates — their grays are Tailwind v3 defaults, load-bearing for
  Outlook/Gmail rendering; never merge with the web palette
- Layouts and screens — apps own their own UI

## Known open decisions

Brand red (logo #781732 vs token #87364e), brand dark (#26262e / #37323a /
#1b365d), tagline arithmetic. See BRAND-GUIDE.md §8 — do not "fix" silently.
