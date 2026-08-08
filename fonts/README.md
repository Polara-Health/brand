# Fonts

`inter-var-latin.woff2` — the Inter variable font (weight axis 100–900, latin subset,
upright). Vendored from [`@fontsource-variable/inter`](https://www.npmjs.com/package/@fontsource-variable/inter)
**5.2.8**, file `files/inter-latin-wght-normal.woff2`. Inter is OFL-licensed
(`LICENSE-Inter.txt`); self-hosting is permitted and required here — no runtime Google
Fonts calls from pages that carry PHI.

To refresh after an upstream release:

```bash
npm pack @fontsource-variable/inter@<version>   # or bun add in a scratch dir
cp .../files/inter-latin-wght-normal.woff2 fonts/inter-var-latin.woff2
cp .../LICENSE fonts/LICENSE-Inter.txt
```

Referenced by `css/core.css` via a relative URL, so serve this directory
alongside the CSS. Bundlers (Vite) resolve and fingerprint it automatically once
`css/core.css` is imported; plain static hosts should copy
`node_modules/@polara-health/brand/fonts/` next to the CSS.
