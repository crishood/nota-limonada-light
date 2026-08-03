# Nota Limonada Light

A light-only Obsidian theme built on **limonada-ds** — CrisHood's design system ("Verde de
Basílica"): a warm paper base, forest-green primary, and a thin gold accent reserved for quiet,
devotional detail. No dark mode: the system's own rule is that light always predominates, so
switching to Obsidian's dark base falls back to its stock dark theme rather than a styled one.

## What v2 brings

- **Typography** — [Libre Franklin](https://fonts.google.com/specimen/Libre+Franklin) for headings,
  [Libre Baskerville](https://fonts.google.com/specimen/Libre+Baskerville) for reading, and
  [Fira Mono](https://fonts.google.com/specimen/Fira+Mono) for technical detail. All three are
  self-hosted, embedded directly in `theme.css` as base64 — Obsidian's Developer policies forbid a
  theme loading remote assets, so nothing is fetched over the network.
- **Color** — the full "Verde de Basílica" palette mapped onto Obsidian's own CSS variables:
  paper/ink, the five structural colors, liturgical alert colors for callouts (success, warning,
  error, info).
- **Layout details** — square corners throughout, callouts and code blocks distinguished by fill
  rather than a frame, tables with a plain hairline border (Obsidian's table renderer doesn't
  support the gap-drawn grid the rest of the system uses elsewhere), and a blockquote treatment
  that swaps voice on purpose: Baskerville Italic with a thin gold rule, reading voice rather than
  brand voice.
- **[Style Settings](https://github.com/obsidian-community/obsidian-style-settings) support** —
  reading font size, line width, an optional film-grain texture, and an optional hairline grid
  backdrop, all off/default until you turn them on.

## Install

From Community themes inside Obsidian: search "Nota Limonada Light" → Install → Use.

## Local development

```
git clone git@github.com:crishood/nota-limonada-light.git "<vault>/.obsidian/themes/Nota Limonada Light"
cd "<vault>/.obsidian/themes/Nota Limonada Light"
node build.mjs   # regenerates theme.css from src/*.css + fonts/
```

Edit files under `src/`, never `theme.css` directly — it's a generated file (kept committed so
Obsidian can read it straight from a release, but the source of truth lives in `src/`).

## Fonts & licensing

Libre Franklin, Libre Baskerville, and Fira Mono are all licensed under the
[SIL Open Font License](https://scripts.sil.org/OFL), which explicitly permits bundling and
redistribution. See [`LICENSES-FONTS.md`](LICENSES-FONTS.md) for full attribution.

The theme itself is MIT-licensed — see [`LICENSE`](LICENSE).

---

#### **Antiqua et Nova: Ad Maiorem Dei Gloriam et in Honorem Beatissimae Virginis Mariae.**

> _"Sic luceat lux vestra coram hominibus, ut videant opera vestra bona et glorificent Patrem vestrum, qui in caelis est."_
> — _Matthaeus 5:16_
