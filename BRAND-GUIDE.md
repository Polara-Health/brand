# Polara Health — Brand & Design Guide

Single-file brand reference for Polara Health and its products (directHealth "myHealth Experience
Portal" and VitalSign eSignature). Written to be pasted or uploaded into Claude Design / artifact
prompts as the authoritative style source.

Extracted from the live code on 2026-08-08 — every value below is what actually ships, not an
aspiration. Where the code disagrees with itself, the conflict is flagged in
[Known inconsistencies](#8-known-inconsistencies) rather than silently resolved.

---

## 1. Identity

| | |
|---|---|
| Brand name | **Polara Health** |
| Legal entity | West Yavapai Guidance Clinic, Inc. dba Polara Health |
| Tagline | *Guiding Your Way to Wellness Since 1966* |
| Website | polarahealth.com |
| Address | 3343 N. Windsong Rd, Prescott Valley, AZ 86314 |
| Sector | Behavioral / community health, Arizona. Patient-facing digital health. |

**Product names**
- **myHealth Experience Portal** (a.k.a. myHealth Portal) — the patient portal. Login button reads
  "myHealth Login".
- **VitalSign** — the eSignature service. Product line: *"The signature that's good for your health."*
  In logo art the wordmark is stylised **vitalSign** — deliberate, not a typo; see the casing rule
  in [§7.2](#72-vitalsign--assetsvitalsign).

**Wordmark lockup.** "Polara" in near-black, " Health" in rose. Used as live text in email; as an
image everywhere else.

**Voice.** Warm, plain, reassuring, non-clinical. Second person. Existing copy to match:
- "Empowering You to Live a Healthier, Happier Life"
- "For over 55 years, Polara Health has been providing compassionate and evidence-based care…"

Avoid: hype, urgency language, exclamation points, and anything that reads as marketing pressure —
these surfaces carry PHI and legal disclosures, and the tone has to stay trustworthy over friendly.

---

## 2. Color

### 2.1 Brand palette

The canonical five. Defined as Tailwind v4 `@theme` tokens in
`directHealthPortal/packages/client/src/index.css`.

| Token | Hex | Contrast on white | Role |
|---|---|---|---|
| `polara-deepblue` | `#1b365d` | 12.1:1 ✅ AAA | Primary action, footer ground, headings on light |
| `polara-blue` | `#005b96` | 7.2:1 ✅ AAA | Section headings, links, rules, accent borders |
| `polara-lightblue` | `#0099d8` | 3.2:1 ⚠️ | **Hover / focus / decorative only** — see warning below |
| `polara-rose` | `#87364e` | 7.9:1 ✅ AAA | Brand signature accent; sparing, never a large field |
| `polara-yellow` | `#ffd700` | 1.4:1 ❌ | **Only on `polara-deepblue`** (8.6:1 there) — footer links |

> ⚠️ **`polara-lightblue` fails WCAG AA for body text on white (3.2:1).** It clears the 3:1 bar for
> large text (≥24px, or ≥19px bold) and for non-text UI (borders, focus rings, icons). It is
> currently used as `text-polara-lightblue` 26 times in the portal; treat those as a defect to fix,
> not a pattern to copy. For blue text on white, use `polara-blue` or `polara-deepblue`.

> ⚠️ **`polara-yellow` on white is invisible (1.4:1).** It exists solely as the footer link color
> against `polara-deepblue`. Never place it on a light ground.

### 2.2 Neutral ramp

| Token | Hex | Role |
|---|---|---|
| `polara-gray-50` | `#f5f6f7` | App shell background |
| `polara-gray-100` | `#e6e8eb` | Card borders, dividers |
| `polara-gray-200` | `#cbd2d9` | Stronger borders, disabled surfaces |
| `polara-gray-700` | `#444f5a` | **Default body text** (8.4:1 on white) |

The ramp has holes. `polara-gray-300/400/500/600/900` are referenced in portal code but were never
defined, so those utility classes emit nothing. Proposed fill-in values (interpolated to match the
existing four — adopt or replace, but do not keep using undefined names):

```
--color-polara-gray-300: #aab4bf;
--color-polara-gray-400: #8b95a1;
--color-polara-gray-500: #6d7783;
--color-polara-gray-600: #57626d;
--color-polara-gray-900: #262c33;
```

### 2.3 Copy-paste tokens (Tailwind v4 CSS-first)

There is **no `tailwind.config.js`** in any Polara repo — Tailwind v4, configured in CSS via
`@theme`, with the `@tailwindcss/vite` plugin.

```css
@import "tailwindcss";

@theme {
  /* Brand */
  --color-polara-rose:      #87364e;
  --color-polara-blue:      #005b96;
  --color-polara-lightblue: #0099d8;
  --color-polara-deepblue:  #1b365d;
  --color-polara-yellow:    #ffd700;

  /* Neutrals */
  --color-polara-gray-50:  #f5f6f7;
  --color-polara-gray-100: #e6e8eb;
  --color-polara-gray-200: #cbd2d9;
  --color-polara-gray-700: #444f5a;

  --font-sans: Inter, system-ui, sans-serif;
}
```

### 2.4 Product theme — VitalSign signing ceremony

VitalSign runs a separate, cooler "clinical slate" theme so the signing ceremony reads as a neutral
legal instrument rather than a marketing page. Its primary is a blue tuned to sit next to
`polara-blue` without being it. From `vitalSign/packages/client/src/index.css`:

| Token | oklch | ≈ hex |
|---|---|---|
| `--color-primary` / `--color-ring` | `oklch(0.52 0.115 245)` | `#206ea6` |
| `--color-foreground` | `oklch(0.208 0.042 265.755)` | `#0f172b` |
| `--color-muted-foreground` | `oklch(0.554 0.046 257.417)` | `#62748e` |
| `--color-border` / `--color-input` | `oklch(0.929 0.013 255.508)` | `#e2e8f0` |
| `--color-secondary` / `muted` / `accent` | `oklch(0.968 0.007 247.896)` | `#f1f5f9` |
| `--color-destructive` | `oklch(0.577 0.245 27.325)` | `#e7000b` |
| body background | `oklch(0.984 0.003 247.858)` | `#f8fafc` |

Light mode only — VitalSign ships no dark theme (a signed document must look identical to every
party who views it).

### 2.5 shadcn/ui layer

Both apps vendor shadcn/ui with `style: "new-york"`, `baseColor: "slate"`, `cssVariables: true`,
`iconLibrary: "lucide"`. The portal additionally defines the full slate `:root` / `.dark` oklch
token set with `chart-1..5` and `sidebar-*`.

**This matters:** the shadcn tokens are stock slate and are *not* wired to the Polara hexes — the
portal's `--primary` is slate-900, not `polara-deepblue`. Two parallel color systems coexist. When
building anything new, drive brand surfaces from the `polara-*` tokens and let shadcn primitives
keep slate for their internal neutrals, or explicitly override `--primary` to `#1b365d`. Don't
assume a shadcn `<Button>` is on-brand out of the box.

---

## 3. Typography

- **Family:** `Inter, system-ui, sans-serif` — the only font declaration in the codebase.
- **Email:** `Arial, Helvetica, sans-serif`, deliberately different for client compatibility.
- **Signature capture (VitalSign):** `--font-signature: "Segoe Script", "Bradley Hand", "Snell
  Roundhand", "Apple Chancery", "Brush Script MT", cursive` — the typed-signature preview only.

**Inter is self-hosted by this package.** `fonts/inter-var-latin.woff2` ships with an `@font-face`
in `css/core.css` (`font-weight: 100 900`, `font-display: swap`, latin + product punctuation
range) — present in every tag since v1.0.1. Importing `core.css` is loading Inter: vitalSign
(client + admin, pinned `#v2.0.0`) and wellKept (client, `#v1.0.1`) both do.

> ⚠️ **directHealthPortal still never loads Inter.** It does not consume this package; it names
> Inter in its own `--font-sans` with no `@font-face` behind it, so its users silently get
> `system-ui` unless Inter happens to be installed locally. Fixed by adopting the package (its
> planned migration — see the README's v1→v2 notes) or by self-hosting the same woff2.

**Scale in use**

| Role | Classes |
|---|---|
| Page heading | `text-2xl font-semibold` |
| Card heading | `text-2xl font-semibold text-polara-blue` |
| Body | `text-base text-polara-gray-700` |
| Secondary | `text-sm` |
| Meta / legal | `text-xs` |

In the executive deck only, `<strong>` is restyled to `font-weight: 700; color: polara-rose` — a
deck-local rule, not a global one.

---

## 4. Geometry, elevation, layout

| | |
|---|---|
| Radius scale | `--radius: 0.625rem` (10px) base; `sm` = −4px, `md` = −2px, `lg` = base, `xl` = +4px |
| Cards | `rounded-xl` |
| Buttons / inputs | `rounded-lg` |
| Elevation | `shadow-sm` (sticky header) · `shadow-lg` (cards) — only two levels; no custom shadows |
| Spacing | Tailwind default 4px scale. Card padding `p-8`; section rhythm `py-8` |
| Print | `@page { size: letter; margin: 0.5in; }` — statements and sealed documents are US Letter |

---

## 5. Component patterns

Lifted verbatim from `directHealthPortal/packages/client/src/pages/Root.tsx` and the statement
views. These are the house style; reuse them rather than inventing.

```
App shell        bg-polara-gray-50 text-polara-gray-700 font-sans
Header           bg-white border-b border-polara-gray-100 shadow-sm sticky top-0 z-50
Logo in header   h-10 w-auto
Nav link         text-polara-gray-700 hover:text-polara-lightblue
                 [&.active]:text-polara-deepblue [&.active]:underline
Primary button   bg-polara-deepblue hover:bg-polara-lightblue text-white min-w-[140px]
Card             bg-white border border-polara-gray-100 rounded-xl shadow-lg p-8
Card heading     text-2xl font-semibold text-polara-blue
Footer           bg-polara-deepblue text-white py-8 text-center
Footer link      text-polara-yellow hover:text-white
Letterhead rule  border-b-2 border-polara-blue
Emphasis panel   border-2 border-polara-blue rounded-xl p-6 bg-polara-blue/5
Focus ring       ring-polara-lightblue
```

**Gradients.** Exactly one exists: `from-polara-gray-50 via-white to-polara-lightblue/20`. Treat
gradients as rare and low-contrast; the brand is flat.

**Footer copy.** `© {year} Polara Health. All rights reserved.` / `Visit us at polarahealth.com` /
`Privacy Policy · Terms of Service`

---

## 6. Email

Table-based layout with fully inline styles — required for Outlook/Gmail. The wordmark is **live
text, not an image**; no logo file is ever attached or hotlinked. Shared shell lives in
`directHealthPortal/packages/server/utils/send/emailTemplate.ts` and
`vitalSign/packages/server/utils/brandedEmail.ts`.

| Element | Value |
|---|---|
| Page ground | `#f4f5f7` |
| Card | `#ffffff`, `border-radius: 12px`, `1px solid #e5e7eb`, width `480px` |
| Card padding | `32px 32px 16px` (header) · `28px 32px` (body) · `16px 32px 28px` (footer) |
| Header rule | `border-bottom: 2px solid #87364e` |
| Wordmark | 26px bold — "Polara" `#26262e` + " Health" `#87364e` |
| Tagline | 12px `#6b7280`, `margin-top: 4px` |
| Body text | 15px `#374151`, `line-height: 1.6` |
| CTA button | bg `#1b365d`, text `#ffffff` 16px bold, `border-radius: 8px`, padding `12px 28px` |
| "Or paste" label | 10px bold uppercase `#9ca3af`, `letter-spacing: 0.06em` |
| Link fallback chip | bg `#f9fafb`, `border-radius: 6px`, padding `10px 14px`, text `#005b96` 12px, `word-break: break-all` |
| Footer divider | `border-top: 1px solid #f0f0f0` |
| Footer text | 11px `#9ca3af` |

Footer copy: *"This is an automated message from Polara Health. Please do not reply to this email."*

The grays here (`#26262e #f4f5f7 #e5e7eb #6b7280 #374151 #9ca3af #f9fafb #f0f0f0`) are Tailwind v3
defaults, **not** Polara tokens. They are load-bearing for email rendering; leave them alone in
email, but don't import them into the web palette.

---

## 7. Logo assets

Shipped in this package under `assets/<product>/` — one directory per product, plus `polara/` for
the corporate marks. Import path from any bundler that reads the `exports` map:
`@polara-health/brand/assets/<product>/<file>`. The `./assets/*` wildcard covers nested paths
(confirmed against a scratch consumer, not assumed). A product with no delivered identity gets no
directory — do not invent assets.

### 7.1 Polara (corporate) — `assets/polara/`

| File | Format | Use | Alt text |
|---|---|---|---|
| `logo-full-color-rgb.svg` | SVG, `viewBox="0 0 637.7198 235.0486"`, 49 KB | **Vector master.** The file for anything new. | `Polara Health Logo` |
| `logo-reverse-rgbv2.png` | PNG, 22 KB | Knockout / reverse for dark grounds | `Polara Health Logo` |

On the printed statement letterhead the alt text is
`Polara Health — Guiding Your Way to Wellness Since 1966`.

**Vector master colors:** `#781732` (dominant, 43 fills) and `#37323a` (dark neutral, 6 fills) —
neither is a CSS token; see [Known inconsistencies](#8-known-inconsistencies) 1–2 before "fixing"
either.

directHealthPortal still carries its own pre-package copies in
`packages/client/public/assets/`: `DirectHealth_Full_Logo2.png` (185 KB — its in-app logo today)
and `polara-health-logo.png` (445 KB — printed letterhead, `h-20`); plus a 949 KB `favicon.ico`
one level up in `public/` that should be regenerated. Treat those as historical; the package files
are canonical for new work.

### 7.2 VitalSign — `assets/vitalsign/`

| File | Format | Use | Alt text |
|---|---|---|---|
| `vitalsign-icon.svg` | SVG 96×96, tile `rx 24`, ECG stroke w9 | App icon, splash, any large square context | `VitalSign` — or `aria-hidden="true"` when the product name is adjacent |
| `vitalsign-favicon.svg` | SVG 48×48, tile `rx 10`, stroke w5.5 | Favicon for SVG-capable browsers | — |
| `vitalsign-favicon-16.png` / `-32.png` | PNG 16×16 / 32×32 | Raster favicon fallbacks | — |
| `vitalsign-lockup-full-color.svg` | SVG 252×76 | **Large-format only** (≥ 64 px tall — see minimum sizes): hero, marketing, print, splash | `VitalSign by Polara Health` |
| `vitalsign-lockup-reverse.svg` | SVG 252×76 | Same, on dark grounds only (minimum ground below). Currently unused — both product apps are light-only. | `VitalSign by Polara Health` |

**Token provenance.** The mark's `#206ea6` (tile, ECG stroke, wordmark) **is**
`--color-polara-accent` exactly as `css/theme-vitalsign.css` ships it. They match today; this
sentence is what keeps them matching — a change to either is a change to both. The full-colour
endorsement is `polara-gray-600` `#57626d` (6.2:1 on white — snapped from the delivered `#55606c`
in v2.2.0; both pass AA, but an off-token hex in master art is how palettes fork). The reverse
endorsement `#9fb3cd` is a **deliberate off-token tint** — the palette has no light blue-gray — kept
as delivered.

**Minimum sizes — measured, not guessed.** The endorsement line is 11.5 px on the 76 px artboard,
so it renders at ~15% of lockup height. Rendered and inspected at 1×:

| Lockup height | Endorsement | Verdict |
|---|---|---|
| 40 px (`h-10`, the §5 header spec) | ≈ 6.1 px | Illegible smudge — never |
| 56 px | ≈ 8.5 px | Marginal |
| **64 px** | ≈ 9.7 px | **Minimum height for the full lockup** |
| 96 px | ≈ 14.5 px | Comfortable |

The packaged lockups are therefore **large-format assets only**. In a §5-spec header the canonical
treatment is the inline mark + live text pattern (§7.3), not this file. The mark alone survives
down to 16 px — that is the favicon.

**Minimum ground for the reverse lockup.** The endorsement `#9fb3cd` needs a ground of relative
luminance ≤ 0.058 to clear AA (4.5:1). `polara-deepblue` `#1b365d` (5.7:1) and `polara-gray-900`
`#262c33` (6.6:1) qualify; **the VitalSign accent `#206ea6` does not** (2.6:1) — never place the
reverse lockup on the accent. The wordmark's white passes everywhere the endorsement does.

**Wordmark casing — a rule, not an inconsistency.** The logo art reads **vitalSign**; running text
reads **VitalSign** (§1). Logo stylisation is not prose. Both are correct as they stand; do not
"fix" either into the other.

### 7.3 In-app logo: inline SVG + live text — no packaged component, deliberately

vitalSign renders its logo as an inline SVG React component
(`packages/{client,admin}/src/components/brand/VitalSignLogo.tsx`, currently duplicated per app).
The obvious tidy-up — exporting that component from this package — is **deliberately rejected**:
this package ships CSS, cva variants, fonts, and static assets, with `class-variance-authority` as
its only (optional) peer. A `.tsx` export would take a React peer dependency for the whole product
family and lock every consumer to one JSX runtime, for one logo.

What is canonical is the **pattern**, not a component: in any header-sized surface, composite the
mark with live text rather than `<img src=".../vitalsign-lockup-full-color.svg">`, because

- **the surface renders its identity even if a static asset request fails** — this matters most on
  vitalSign's signing ceremony, which is a legal instrument;
- **`currentColor` on the tile lets the mark follow the app's theme accent** — one source of truth
  (`--color-polara-accent`) instead of a hex frozen in an asset file;
- **it survives header sizes** — live text at `0.625rem` stays legible where the packaged lockup's
  endorsement scales to ~6 px (§7.2 minimum sizes).

Reference implementation, adapted from vitalSign dev (its original uses the app-local `cn()`
helper and `text-primary`; shown here with the family-canonical slot utilities — remember the
[`@source` requirement](README.md) applies to your own source too if these classes appear
nowhere else). Geometry, casing, and letter-spacing match the packaged art exactly:

```tsx
/** The ECG trace on the rounded accent tile. Decorative — the lockup names it. */
export function VitalSignMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} aria-hidden="true" focusable="false">
      <rect width="96" height="96" rx="24" fill="currentColor" />
      <path
        d="M10 60 H28 L42 24 L58 84 L70 48 L76 60 H86"
        fill="none" stroke="#fff" strokeWidth="9"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/** Mark + wordmark + endorsement as one readable unit. */
export function VitalSignLockup({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <VitalSignMark className="size-9 shrink-0 text-polara-accent" />
      <span className="flex flex-col leading-none">
        <span className="text-xl font-semibold tracking-[-0.03em] text-polara-accent">vitalSign</span>
        <span className="mt-1 text-[0.625rem] font-medium tracking-[0.12em] text-polara-gray-600 uppercase">
          by Polara Health
        </span>
      </span>
    </span>
  );
}
```

---

## 8. Known inconsistencies

Carry these forward as-is unless someone with brand authority decides otherwise. Flagged so a
designer doesn't "correct" one into another by accident.

1. **Three brand reds.** Logo `#781732` · CSS token `polara-rose` `#87364e` · nothing reconciles
   them. The SVG master is presumably the true brand red; the token is what every screen renders.
2. **Two brand darks.** Email wordmark `#26262e` · logo `#37323a` · and `polara-deepblue` `#1b365d`
   is a third, though it reads as blue rather than near-black.
3. **Undefined gray steps** — `polara-gray-300/400/500/600/900` used across 10 files, defined
   nowhere. §2.2 proposes values.
4. **Inter not loaded in directHealthPortal** — this package's `core.css` `@font-face` fixes it
   for consumers (§3), but dHP does not consume the package yet.
5. **shadcn slate vs. Polara palette** are disconnected (§2.5).
6. **`polara-lightblue` used as body text** in 26 places at 3.2:1 — an accessibility defect.
7. **Tagline arithmetic.** "Since 1966" vs. "For over 55 years" — as of 2026 that's ~60 years.
8. **`App.css` is dead.** The portal's `App.css` duplicates the `@theme` block but is imported by
   nothing; `main.tsx` loads only `index.css`. Edit `index.css`.
9. **Portal `<title>` is `client`** — never branded.

---

## 9. Quick brief for a design tool

> Polara Health is an Arizona community behavioral-health provider (est. 1966). The digital brand is
> calm, clinical, and trustworthy — flat surfaces, generous whitespace, one accent at a time.
> Primary is deep navy `#1b365d` with `#005b96` for headings and links; `#0099d8` is a hover/focus
> and decorative blue only (it fails contrast as text). Rose `#87364e` is the signature accent, used
> sparingly — a rule under a header, a bold word — never as a large field. Gold `#ffd700` appears
> only as link text on navy. Body copy is `#444f5a` on a `#f5f6f7` shell; cards are white,
> `rounded-xl`, `shadow-lg`, `p-8`, with `#e6e8eb` borders. Type is Inter with a system fallback:
> `text-2xl font-semibold` headings in `#005b96`, plain `text-base` body. Radius base 10px, only two
> shadow levels, one rare low-contrast gradient. Light mode only. Never use urgency or marketing
> pressure — these screens carry patient health information and legal disclosures.

---

**Sources:** `directHealthPortal/packages/client/src/index.css` ·
`directHealthPortal/packages/client/src/pages/Root.tsx` ·
`directHealthPortal/packages/server/utils/send/emailTemplate.ts` ·
`vitalSign/packages/client/src/index.css` · `vitalSign/packages/server/utils/brandedEmail.ts` ·
`directHealthPortal/packages/client/public/assets/` · this package's `css/`, `fonts/`, `assets/` ·
`vitalSign/packages/client/src/components/brand/VitalSignLogo.tsx` (dev, PR #58)

**Generated:** 2026-08-08 · **Updated:** 2026-08-10 (v2.2.0 — product asset landing) ·
**Maintainer:** Polara Health
