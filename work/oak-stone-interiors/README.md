# Oak & Stone Interiors (concept website)

A portfolio concept by Evolve Web Studios. Oak & Stone Interiors is fictional: no real company, projects, clients or contact details.

## Run / deploy
Open `index.html` directly, or upload the folder to `/demos/oak-stone-interiors/`. All paths are relative, so it works in a subfolder and on GitHub Pages. No build step.

## Swapping in photography
Room visuals are inline SVG illustrations (symbols `#s1`–`#s4` in `index.html`), so there are no broken image links. To use photos, save licensed images in `assets/images/`, then replace each `<svg><use href="#sN"/></svg>` with `<img src="assets/images/name.webp" alt="..." loading="lazy">` styled with `object-fit:cover`. In `script.js`, the lightbox copies the `svg` inside each project's `.ph`. Change `$('svg',p)` to `$('img',p)` when you switch.

## Notes
Google Fonts load from the web. The form is front-end only and sends nothing. Social links are text placeholders.
