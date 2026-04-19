# Smart Track — Pitch Deck

Self-contained, single-file HTML deck designed to match the Smart Track app's brand. Six slides, ~4:35 runtime including the live demo beat.

## Run it

The deck is served by your existing Vite dev server. Just open:

```
http://localhost:5175/pitch/
```

(Replace `5175` with whatever port Vite is on. Check your terminal — if multiple Vite servers are running, it might be 5173, 5174, or 5175.)

If the dev server isn't running:

```bash
cd smart-track
npm run dev
```

## Present it

| Key | Action |
|---|---|
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `1` – `6` | Jump to slide |
| `F` | Fullscreen |
| `S` | Toggle speaker notes overlay |
| `?` | Toggle keyboard help |
| `Home` / `End` | First / last slide |

## Slide map

| # | Slide | Judge question answered | Duration |
|---|---|---|---|
| 1 | Hook | "Should I pay attention?" | 0:25 |
| 2 | Problem | "Is this a real problem?" | 0:30 |
| 3 | The thesis | "What's the one-sentence idea?" | 0:25 |
| 4 | Live demo lead-in | "Show me." | 0:10 + **2:00 demo** |
| 5 | The moat | "Why isn't this a wrapper?" | 0:35 |
| 6 | Traction + ask | "What do you want from me?" | 0:30 |
| | **Total** | | **~4:35** |

## Add screenshots

The deck shows striped placeholders where each screenshot goes. To replace them:

1. Read `screenshots/README.md` for the capture checklist.
2. Drop PNGs into the `public/pitch/screenshots/` folder with the exact filenames listed.
3. Refresh the deck in your browser. Placeholders auto-swap for real images.

## Customize before presenting

Search the file for these placeholders and replace:

- `[City]` (slide 2) — city of the realtor you're quoting
- `[N] working realtors` (slide 6) — actual count of demo recipients
- `"[insert top quote here ...]"` (slide 6) — verbatim realtor quote
- `[your-handle]` and `[your-url]` (slide 6 footer) — your repo + live URL

## Export to PDF (backup)

If a venue requires a PDF backup:

1. Open the deck in Chrome.
2. `cmd+P`.
3. Set: **Destination** = Save as PDF, **Layout** = Landscape, **Margins** = None, **Background graphics** = ON.
4. The current slide is what prints. To export all 6, you'll need to print each one — or just trust the live HTML, which is more reliable anyway.

Brand tokens, fonts, gradients, and shadows are all pulled from the live app's `src/index.css` so the deck and the demo feel like the same product.
