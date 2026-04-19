# Screenshot capture checklist

Drop captured PNGs into this folder with the **exact filenames** below. The deck will auto-swap each placeholder for the real image — no code changes needed, just refresh the browser.

## Capture setup (do this once)

1. Resize your Chrome window to **1280×800** (use a resizer extension or just eyeball it). Keep this size for every screenshot so they look consistent in the deck.
2. The app is already running at `http://localhost:5175` (or whichever port Vite reports).
3. Capture tool: **CleanShot X** (`cmd+shift+4` then space) or macOS native (`cmd+shift+4` then space). Window-only captures look cleanest.
4. Save each PNG into this folder.

## The 6 captures

| # | Filename | What to capture | App state |
|---|---|---|---|
| 1 | `01-classic.png` | The classic Lofty 9-widget dashboard | From the briefing screen, click the "View classic dashboard" link in the footer. Capture the full window. |
| 2 | `02-briefing-hero.png` | Top of the Smart Track briefing | Fresh load. Capture from the top so the greeting + 3 summary pills + first row of agents are all visible. |
| 3 | `03-while-you-slept.png` | "While you slept" panel, **expanded** | On the briefing screen, click the chevron on the dark "While you slept" panel to expand the list. Capture so the full list of overnight items is visible. |
| 4 | `04-focus-card.png` | One focus card in detail | Click "Start Daily Smart Track". The Sarah Chen card lands. Capture so the title, signals, and the email artifact preview are all visible. The consensus badge in the corner is a bonus. |
| 5 | `05-earned-time.png` | TrackComplete hero | Approve all 3 cards (or skip them). When the "You earned back X minutes" hero lands, capture immediately so the animation has finished but the page is still at the top. |
| 6 | `06-debrief-routing.png` | Brief the agents → routing animation OR receipt | On TrackComplete, scroll to "Brief the agents". Click a sample chip, then "Brief the agents". The 3-stage routing animation plays. Either capture mid-animation (looks dynamic) or wait for the receipt to land (looks definitive). Receipt is the safer choice. |

## Tips for cleaner captures

- **Hide your bookmarks bar** in Chrome (`cmd+shift+B`) so the screenshot is just the app.
- **Zoom to 100%** (`cmd+0`) — any other zoom will look weird in the deck.
- **Toggle dark mode off** in macOS so colors match (the app is light-themed).
- **Close the React DevTools panel** if it's open.
- **Don't include the URL bar** — use window capture, not full-screen.
- For screenshot 1 (classic dashboard), if widgets look cut off, scroll to top first.
- For screenshot 4 (focus card), if the card looks cramped, you can capture in a wider window — it'll scale gracefully in the deck.

## Verify

After dropping files in:

1. Refresh `http://localhost:5175/pitch/` in your browser.
2. Walk through with `→` arrow key.
3. If a placeholder is still showing, the filename doesn't match. Check spelling and case (lowercase only).
