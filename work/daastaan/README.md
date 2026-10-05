# Daastaan — a table of many stories

A fictional, editorial-style dining website for an imagined New Delhi restaurant. There is no real restaurant, booking service, mailing list, event calendar, or menu; all forms are front-end demonstrations and do not send or store information.

## Run

Open `index.html` directly in a browser, or serve this folder from any static web host. There is no build step or package installation.

## Project files

- `index.html` — page structure, illustrated meal chapters, editorial copy, forms, and accessible dialog markup.
- `style.css` — responsive visual system, layout, typography, original inline chapter drawings, and motion.
- `script.js` — photo scenes, menu and gallery data, mood-based menu discovery, tabs, filters, dialogs, form demos, and small interactions.
- `favicon.svg` — the site icon.

## Photography and type

Food and dining-room photos are loaded from `images.unsplash.com` using Unsplash photo IDs. Unsplash's current license is available at [unsplash.com/license](https://unsplash.com/license). The images need an internet connection; the page layout remains usable without them. Google Fonts are also loaded remotely (Playfair Display and DM Sans), with local serif and system sans-serif fallbacks.

To change the imagery, edit the `SCENES` photo-ID arrays near the top of `script.js`. Each scene (`dish`, `fire`, `spice`, `room`, `hands`, and `arch`) can have multiple image IDs; render instances select among them. The image URLs request resized, automatically formatted files from Unsplash.

## Content

The menu, flavour postcards, ingredient notes, rooms, gatherings, house events, journal entries, and gallery captions are data arrays in `script.js`. The menu can be filtered by course or explored by flavour mood. The illustrated four-act dinner guide filters the menu to a matching course. The long-form page copy and form labels are in `index.html`.

## Theme

Edit the custom properties at the top of `style.css` to adjust the ink, parchment, saffron and red palette, typefaces, spacing, or section rhythm.
