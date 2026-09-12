# Monster Tracker

A log of Monster flavors: a card per taste, plus a world map of finds.

Built with [Astryx](https://github.com/facebook/astryx) (Neutral theme) and Next.js.

## Pages

- **Flavors** — card grid with photo, place, and date
- **Flavor card** — GPS, tasting notes, date/time, photo, mini-map
- **World map** — pins that open flavor cards

## Add a flavor

Drop a markdown file in `content/flavors/`. The filename becomes the URL slug (`original.md` → `/flavors/original`). Put photos in `public/cans/`.

```md
---
name: Original Green
lat: 35.6595
lng: 139.7004
place: Lawson, Shibuya, Japan
# Local time of the photo / purchase (timezone of the place, not yours)
capturedAt: "2024-06-12T14:30:00+09:00"
photo: /cans/original.jpg
accent: "#95F204"
notes: Dense, sweet, grapefruit finish.
---

Tasting notes go here. This body text is the main description on the card.
```

Put the full location in `place`.

`capturedAt` is local time where the can was bought / the photo was taken:

`"YYYY-MM-DDTHH:MM:SS+HH:MM"` — 24-hour clock, offset of that place (Germany summer `+02:00`, winter `+01:00`). The site shows that clock time as written, it does not convert to your laptop timezone.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Static site

```bash
npm run build
```

Ready HTML lands in `docs/` (and `out/`). GitHub Pages: **Settings → Pages → Deploy from a branch → `main` / `/docs`**. Custom domain is `monster.rudnkh.me` (`CNAME` in `docs/`).
