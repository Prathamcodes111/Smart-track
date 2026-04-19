/**
 * Mock briefing service.
 *
 * In production this would be a thin wrapper over the FastAPI / InsForge
 * agentic backend. The shape returned here is the contract the frontend
 * is built against — swap the body of `getBriefing()` for a real `fetch`
 * and nothing else changes.
 */

export const AGENTS = {
  aria: {
    id: "aria",
    name: "Aria",
    role: "Sales Specialist",
    initials: "AR",
    accent: "brand",
    description: "Watches inbound leads & live deal signals.",
  },
  milo: {
    id: "milo",
    name: "Milo",
    role: "Personal Assistant",
    initials: "MI",
    accent: "warm",
    description: "Manages relationships, follow-ups, and cadence.",
  },
  vox: {
    id: "vox",
    name: "Vox",
    role: "Marketing Specialist",
    initials: "VX",
    accent: "action",
    description: "Promotes listings & monitors campaign performance.",
  },
};

export const USER = {
  name: "James",
  firstName: "James",
  brokerage: "Coastline Realty Group",
  market: "Half Moon Bay, CA",
};

const TASKS = [
  {
    id: 1,
    type: "urgent",
    agentId: "aria",
    title: "Hot Lead Activity: Sarah's Email",
    subtitle: "Inbound · 6:42am · 182 Saint Peter St",
    context:
      "Sarah just emailed wanting to lock in the deal for 182 Saint Peter St. She is requesting the preliminary paperwork.",
    aiAction:
      "I have drafted a confirmation email and queued up the standard preliminary paperwork for 182 Saint Peter St.",
    confidence: 0.94,
    consensus: {
      agents: ["aria", "milo", "vox"],
      rationale:
        "All 3 agents independently ranked this #1 — buying intent, cadence overdue, and competitive pressure all aligned.",
    },
    estimatedTime: "30 sec",
    requiresConfirm: false,
    primaryButton: "Approve & Send",
    secondaryButton: "Edit Draft",
    signals: [
      {
        label: "Lead score 91",
        detail: "+18 this week",
        tone: "hot",
      },
      {
        label: "Inbound email at 6:42am",
        detail: "explicit buying intent",
        tone: "hot",
      },
      {
        label: "2 other leads viewing 182 Saint Peter",
        detail: "competitive pressure",
        tone: "warm",
      },
    ],
    lead: {
      name: "Sarah Chen",
      email: "sarah.chen@gmail.com",
      phone: "(415) 555-0182",
      tags: ["Buyer", "Pre-approved", "Cash-flexible"],
    },
    property: {
      address: "182 Saint Peter St, Riverside, CA 10192",
      price: "$1,245,000",
    },
    artifact: {
      kind: "email",
      from: "james@coastlinerealty.com",
      to: "sarah.chen@gmail.com",
      subject: "Re: 182 Saint Peter St — Next Steps",
      body: `Hi Sarah,

Thrilled to hear you're ready to move forward on 182 Saint Peter St. I've attached the preliminary paperwork — the buyer disclosure, agency agreement, and pre-offer checklist.

A few quick notes so we can move fast:
  • Two other parties have toured this week, so I'd suggest we get an offer drafted by Wednesday.
  • Your pre-approval letter from First Republic is still current — we're good there.
  • I've pencilled in a 30-min call tomorrow at 10am PT to walk through terms. Let me know if that works.

Talk soon,
James`,
      attachments: [
        "Preliminary Disclosure.pdf",
        "Buyer Agency Agreement.pdf",
        "182 Saint Peter — Pre-offer Checklist.pdf",
      ],
    },
  },
  {
    id: 2,
    type: "nurture",
    agentId: "milo",
    title: "High Interest: Kristin Watson",
    subtitle: "Returning visitor · 3 sessions today · 3931 Via Montalvo",
    context:
      "Kristin Watson has viewed 3931 Via Montalvo 3 times this morning. Her lead score is now 85.",
    aiAction:
      "Lofty AOS pulled her viewing history. She heavily prefers modern kitchens. Recommend an immediate phone call.",
    confidence: 0.87,
    estimatedTime: "5 min call",
    requiresConfirm: false,
    primaryButton: "Call Kristin",
    secondaryButton: "Skip for Later",
    signals: [
      {
        label: "Lead score 85",
        detail: "+12 today",
        tone: "hot",
      },
      {
        label: "3 sessions on 3931 Via Montalvo",
        detail: "first one was 7:14am",
        tone: "hot",
      },
      {
        label: "Saved 4 listings with modern kitchens",
        detail: "consistent preference signal",
        tone: "warm",
      },
      {
        label: "Last contacted 6 days ago",
        detail: "cadence overdue",
        tone: "cold",
      },
    ],
    lead: {
      name: "Kristin Watson",
      email: "kristin.w@outlook.com",
      phone: "(408) 555-0931",
      tags: ["Buyer", "Investor", "Engaged"],
    },
    property: {
      address: "3931 Via Montalvo, Campbell, CA 95008",
      price: "$2,180,000",
    },
    artifact: {
      kind: "call_script",
      durationEstimate: "5 min",
      goal: "Convert today's browsing into a tour booking for this weekend.",
      opener:
        "Hi Kristin, it's James from Coastline. I noticed you've been spending time on the Via Montalvo listing this morning — wanted to catch you while it's fresh.",
      talkingPoints: [
        "Confirm she's still in market for the $2M–$2.4M range",
        "Highlight the kitchen renovation (matches her saved pattern)",
        "Mention the seller is reviewing offers Sunday — light urgency, not pressure",
        "Offer Saturday or Sunday morning showing slots",
      ],
      objectionHandlers: [
        {
          q: "I'm still just looking.",
          a: "Totally — no pressure. Touring in person actually helps you rule things out faster than browsing online.",
        },
        {
          q: "Price feels high.",
          a: "Comparable Via Verde sold last month at $2.31M — Via Montalvo is priced under that. Happy to share the comp.",
        },
      ],
    },
  },
  {
    id: 3,
    type: "marketing",
    agentId: "vox",
    title: "Boost New Listing: 87 Valencia St",
    subtitle: "Underperforming · 48hrs live · 31% below median impressions",
    context:
      "Your listing at 87 Valencia St has been active for 48 hours with below-average impressions.",
    aiAction:
      "The Marketing Agent has prepared a Facebook Ad campaign targeting buyers looking for Spanish-style homes in Half Moon Bay.",
    confidence: 0.81,
    estimatedTime: "instant deploy",
    requiresConfirm: true,
    confirmCopy: "This will charge $50 to your Lofty marketing wallet.",
    primaryButton: "Deploy Campaign · $50",
    secondaryButton: "Review Assets",
    signals: [
      {
        label: "412 impressions in 48hr",
        detail: "vs. 600 median for this price tier",
        tone: "cold",
      },
      {
        label: "0 lead inquiries",
        detail: "needs paid distribution",
        tone: "cold",
      },
      {
        label: "1,240 matching buyer profiles",
        detail: "warm audience available",
        tone: "hot",
      },
    ],
    lead: null,
    property: {
      address: "87 Valencia St, Half Moon Bay, CA 94019",
      price: "$1,895,000",
    },
    artifact: {
      kind: "ad",
      platform: "Meta (Facebook + Instagram)",
      budget: "$50 over 7 days",
      reach: "Estimated 4,800–6,200 impressions",
      audience: [
        "Buyers in Half Moon Bay + 25mi radius",
        "Saved searches matching: Spanish-style, 3+ bd, $1.5M–$2.2M",
        "Recent IDX activity in the last 30 days",
      ],
      headline: "Spanish Revival in Half Moon Bay — Just Listed",
      body: "Hand-troweled stucco, arched doorways, and a tile-roof courtyard — minutes from the coast. Schedule a tour this weekend.",
      cta: "See Photos & Book Tour",
    },
  },
];

/**
 * Work the agents completed autonomously overnight — surfaced to the user
 * BEFORE the action queue, to make the agentic-vs-assistive distinction
 * concrete. Every entry is a thing Lofty AOS would already do; we just
 * make it visible.
 */
const OVERNIGHT_ACTIVITY = {
  totalActions: 23,
  windowLabel: "Since 11:00pm yesterday",
  items: [
    {
      id: "ov-1",
      agentId: "milo",
      icon: "mail",
      title: "Sent 4 Smart Plan follow-ups",
      detail: "Day-3 nurture cadence · 2 opens already",
    },
    {
      id: "ov-2",
      agentId: "aria",
      icon: "users",
      title: "Qualified 7 new inbound leads",
      detail: "3 hot · 4 cold · routed by lead score",
    },
    {
      id: "ov-3",
      agentId: "vox",
      icon: "image",
      title: "Refreshed creative on 87 Valencia ad",
      detail: "Swapped underperforming hero photo · auto A/B",
    },
    {
      id: "ov-4",
      agentId: "aria",
      icon: "shield",
      title: "Auto-removed 2 spam inquiries",
      detail: "Confidence 99% · flagged from inbox",
    },
    {
      id: "ov-5",
      agentId: "vox",
      icon: "refresh",
      title: "MLS sync · 14 new matches against your Hot Sheets",
      detail: "Tagged to 9 buyer profiles overnight",
    },
  ],
};

/**
 * Demo dictation samples and their pre-routed agent reactions.
 *
 * In production this would be: speech → Whisper → LLM router → entity
 * resolution → patch the right Lofty CRM field. For the demo, we
 * pattern-match the input and play back a hand-scripted routing
 * outcome. The animation is the story; the LLM is implementation
 * detail no judge will care about.
 */
export const DEBRIEF_SAMPLES = [
  {
    id: "sample-sarah",
    transcript:
      "Just got off the phone with Sarah Chen — she's expanding her budget to 1.4 million and wants to see something with a guest house.",
    routedTo: "aria",
    leadName: "Sarah Chen",
    updates: [
      "Budget bumped: $1.245M → $1.4M",
      "Preference added: detached guest house",
      "Lead score recomputed: 91 → 94",
    ],
    tomorrowChanges: [
      {
        agentId: "aria",
        change:
          "Pulling 6 new matches at $1.4M+ with guest-house or ADU potential",
      },
      {
        agentId: "milo",
        change:
          "Drafted a follow-up referencing the expanded budget and guest-house preference",
      },
    ],
    summary:
      "Sarah's profile updated. Tomorrow's track will lead with new matches at her new price band.",
  },
  {
    id: "sample-kristin",
    transcript:
      "Kristin came to the Via Montalvo showing — she loves the kitchen but the backyard is too small. Wants something with at least a quarter acre.",
    routedTo: "milo",
    leadName: "Kristin Watson",
    updates: [
      "Showing logged: Via Montalvo · positive on kitchen",
      "New requirement: lot size ≥ 0.25 acre",
      "Saved-search filter updated automatically",
    ],
    tomorrowChanges: [
      {
        agentId: "aria",
        change:
          "Re-ranking active inventory against Kristin's new lot-size filter",
      },
      {
        agentId: "milo",
        change:
          "Will draft a 'thanks for touring' note + 3 new matches on Sunday",
      },
    ],
    summary:
      "Kristin's saved search updated. Sunday morning track will include the new matches and a follow-up draft.",
  },
];

/**
 * Things the agents *deliberately chose not* to put on today's track —
 * with their reasoning. This is the editorial-judgment proof: it shows
 * the agent isn't just ranking, it's saying "no, not today, here's why."
 *
 * The most experienced agents trust an assistant that can confidently
 * say "no" more than one that just dumps everything in front of them.
 */
const HELD_BACK = [
  {
    id: "hb-1",
    agentId: "milo",
    title: "4 cold leads from last week",
    reason:
      "Smart Plan day-3 nurture is still running. Human touch lands better at day 5–7.",
    surfaceWhen: "Tuesday morning",
  },
  {
    id: "hb-2",
    agentId: "aria",
    title: "Comp pricing review · 1824 Saint Peter",
    reason:
      "Only 2 comps closed in the last 30 days. Holding for 3rd comp before recommending a price change.",
    surfaceWhen: "When the next comp closes",
  },
  {
    id: "hb-3",
    agentId: "vox",
    title: "Open-house promo · 26096 Dougherty Pl",
    reason:
      "Listing is 9 days out — paid promo performs ~40% better when launched 5 days before.",
    surfaceWhen: "Thursday morning",
  },
];

const QUEUED_FOR_TOMORROW = [
  {
    label: "Birthday outreach: Annette Black",
    agentId: "milo",
    when: "Tomorrow 9am",
  },
  {
    label: "Comp pricing review: 1824 Saint Peter St",
    agentId: "aria",
    when: "Tomorrow 9am",
  },
  {
    label: "Re-engage: Michael Scott (cold 14 days)",
    agentId: "milo",
    when: "Tomorrow 9am",
  },
  {
    label: "Open house promo: 26096 Dougherty Pl",
    agentId: "vox",
    when: "Tomorrow 9am",
  },
];

/**
 * The single contract this prototype is built against. Swap the body
 * for `await fetch('/api/briefing')` to go live.
 */
export async function getBriefing() {
  return {
    user: USER,
    generatedAt: new Date().toISOString(),
    summary: {
      hotLeads: TASKS.filter((t) => t.type === "urgent" || t.type === "nurture")
        .length,
      followUps: 3,
      marketingActions: TASKS.filter((t) => t.type === "marketing").length,
    },
    agents: Object.values(AGENTS),
    avgConfidence:
      TASKS.reduce((acc, t) => acc + t.confidence, 0) / TASKS.length,
    estimatedDuration: "~4 min",
    /**
     * Time the same 3 decisions would take in the classic dashboard.
     * Sourced from the Lofty PDF's own characterization of the workflow:
     * scan 9 widgets → context-switch → decide → act. We're conservative.
     */
    classicEstimateMinutes: 38,
    overnight: OVERNIGHT_ACTIVITY,
    heldBack: HELD_BACK,
    tasks: TASKS,
    queuedForTomorrow: QUEUED_FOR_TOMORROW,
  };
}

export const TASK_TYPE_META = {
  urgent: {
    label: "Urgent",
    accent: "score-cold",
    badgeBg: "bg-red-50",
    badgeText: "text-red-700",
    badgeRing: "ring-red-200",
    stripe: "bg-red-500",
  },
  nurture: {
    label: "Nurture",
    accent: "score-warm",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    badgeRing: "ring-amber-200",
    stripe: "bg-amber-500",
  },
  marketing: {
    label: "Marketing",
    accent: "action",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    badgeRing: "ring-blue-200",
    stripe: "bg-blue-500",
  },
};
