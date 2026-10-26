# Bundled site fonts

The layout loads these files through `next/font/local`. Production builds and
visitors do not need access to Google Fonts.

The normal variable fonts are the same families used previously: Fraunces,
Inter Tight, and JetBrains Mono. Fraunces retains its optical-size and softness
axes used by `globals.css`. Inter Tight and JetBrains Mono retain Cyrillic
coverage. The original glyph sets and axes are preserved; the upstream TTFs
were only compressed to WOFF2.

Each family is distributed under its adjacent SIL Open Font License. Exact
upstream URLs, the pinned Google Fonts commit, source/output SHA-256 hashes,
and conversion tool versions are recorded in `sources.json`.

To reproduce a WOFF2 file after downloading its recorded source:

```python
from fontTools.ttLib import TTFont
font = TTFont("source.ttf", recalcTimestamp=False)
font.flavor = "woff2"
font.save("output.woff2")
```

When updating a font, preserve the license, refresh `sources.json`, and run
`npm run build`. The full static build also runs on pull requests; deployment
runs only for pushes and manual workflow runs.
