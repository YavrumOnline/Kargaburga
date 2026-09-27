# Kargaburga

The studio's site, kargaburga.com: plain static files in `public/`, served by Vercel with no build
step (`vercel.json`). A push to `main` deploys.

- `public/index.html` and `public/tr/index.html`: the studio's home, English and Turkish.
- `public/leblebi/`, `public/tr/leblebi/`: Leblebi's pages. Generated, never edited by hand: run
  `python tools/site/leblebi_site.py <this folder>` from the Leblebi repository. The game page is
  built from the Play listing, the privacy policy from `docs/PRIVACY.md`.
- `public/site.css`, `public/grid.svg`, `public/snap.js`: the look, graph paper and words written on
  it. `snap.js` grows blocks and frames to whole cells so they sit on the grid's lines.
- `public/fonts/Inter-Bold.ttf`: Inter, SIL Open Font License 1.1, its licence beside it.

A new game gets `public/<game>/` and `public/tr/<game>/`, a card on both home pages, and its
lines in `public/sitemap.xml`.

Preview locally: `python -m http.server 8000 --directory public`.
