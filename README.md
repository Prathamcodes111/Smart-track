# Lofty · Smart Track

Hackathon prototype for **GlobeHack Season 1 — "Real Estate AI-Native PM"** track.

> **The pitch.** Lofty's current dashboard answers *what's happening*.
> Smart Track answers *what to do next*. We turned 9 widgets into 1 decision.

---

## What this is

The current Lofty dashboard surfaces ~9 widgets (New Updates, Need Keep In Touch,
Today's New Leads, Today's Opportunities, Transactions, Today's Tasks,
Appointments & Showings, My Listings, Hot Sheets) and forces every agent to
mentally re-rank their day from scratch every morning.

**Smart Track is a replacement morning entry point.** Three named AI agents
(Aria · Sales, Milo · Personal Assistant, Vox · Marketing) work autonomously
overnight, propose ranked actions with drafted artifacts, and present them as
a focus-mode "playlist" the agent walks through in ~4 minutes.

It is built directly on top of Lofty's existing **Agentic AI Operating System
(AOS)**. No new capability is invented — we expose AOS as the *primary surface*
instead of a secondary feature buried behind menus.

---

## Stack

- **Vite + React 19** — fastest path to a coded demo
- **Tailwind CSS v4** — design tokens sampled from the live Lofty dashboard
- **Framer Motion** — card transitions, agent-status pulses, completion reveal
- **lucide-react** — iconography matching the Lofty visual language

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the production bundle
npm run lint
```

---

## Architecture

```
src/
├── App.jsx                       # state machine: briefing → focus → complete
├── data/
│   └── briefing.js               # mock backend: getBriefing() + AGENTS + meta
├── hooks/
│   └── useSmartTrack.js          # currentIndex, outcomes log, approve/skip/back
└── components/
    ├── LoftyChrome.jsx           # top nav, faithful to the live dashboard
    ├── LoftyLogo.jsx
    ├── BriefingOverview.jsx      # state 1: greeting + summary + agent roster + CTA
    ├── SmartTrackPlayer.jsx      # state 2: progress bar + keyboard nav + card stack
    ├── TaskCard.jsx              # the action card (signals, artifact, two-step confirm)
    ├── TaskArtifact.jsx          # renders email / call_script / ad previews
    ├── AgentChip.jsx             # named agent identity + confidence + live indicator
    ├── ScorePill.jsx             # green/amber/red lead-score pill
    ├── KeyboardHints.jsx         # ↵ / →  / ←  / Esc legend
    ├── UndoToast.jsx             # 10-second Gmail-style undo
    └── TrackComplete.jsx         # state 3: outcomes + queued items + footer
```

### The contract with the backend

The entire app is driven by a single async function:

```js
import { getBriefing } from './data/briefing'
const briefing = await getBriefing()
```

To swap the mock for the real FastAPI backend, replace the body
of `getBriefing()` with `fetch('/api/briefing').then(r => r.json())`. No other
file changes.

---

## Trust mechanics (the differentiator)

The judging brief explicitly asks: *"How does your prototype build trust with
users who may be skeptical of AI?"* Every task card ships six discrete trust
mechanics:

1. **"Why this task?" expandable signals** — three ranked, color-coded data
   points with sources, shown by default not hidden.
2. **Rendered artifact previews** — never claim "I drafted an email" without
   showing the actual draft. Same for call scripts and ad creative.
3. **Per-card confidence score** — calibrated, visible next to the agent name.
4. **Two-step confirm for irreversible / paid actions** — the $50 campaign
   deploy requires a second click with a cost reminder.
5. **10-second undo on every approval** — Gmail-style toast, animated progress.
6. **Persistent "Open classic dashboard" escape hatch** — the user is never
   forced into AI-only mode. Choice is the trust signal.

---
AI USED:
cursor: primary IDE
claude: planning, slide deck, motion element

See `RATIONALE.md` for the full design and GTM rationale.
