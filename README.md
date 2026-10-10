# Kargaburga

The studio's site, kargaburga.com: plain static files in `public/`, served by Vercel with no build
step (`vercel.json`). A push to `main` deploys.

- `public/index.html` and `public/tr/index.html`: the studio's home, English and Turkish.
- `public/leblebi/`, `public/tr/leblebi/`: Leblebi's pages. Generated, never edited by hand: run
  `python tools/site/leblebi_site.py <this folder>` from the Leblebi repository. The game page is
  built from the Play listing, the privacy policy from `docs/PRIVACY.md`.
- `public/site.css`, `public/reveal.js`: the look. Monochrome with one red, light or dark by the
  visitor's system. `reveal.js` fades blocks marked `data-reveal` up as they scroll into view; without
  it nothing is hidden.
- `public/crow.svg`: the studio's mark. The pages draw it inline so it takes the page's ink, and
  Leblebi's generator reads its paths from this file.
- `public/fonts/Geist-Variable.woff2`: Geist, SIL Open Font License 1.1, its licence beside it.

A new game gets `public/<game>/` and `public/tr/<game>/`, a card on both home pages, and its
lines in `public/sitemap.xml`.

Preview locally: `python -m http.server 8000 --directory public`.
