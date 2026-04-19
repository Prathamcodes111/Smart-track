import {
  ChevronDown,
  HelpCircle,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  ArrowLeft,
  Home as HomeIcon,
  Sparkles,
} from "lucide-react";

/**
 * Faithful recreation of the current Lofty dashboard the user sees today.
 *
 * Used as the "classic" escape-hatch view from Smart Track. Deliberately
 * NOT responsive — the point of this view in the demo is to show the
 * "before" state: 9 widgets fighting for attention. Width is locked to
 * ~1180px to mirror the source screenshot.
 */
export default function ClassicDashboard({ onReturn }) {
  return (
    <div className="min-h-screen bg-surface pb-16">
      {/* Smart Track callout banner */}
      <div className="border-b border-line bg-brand-50/60">
        <div className="mx-auto flex w-[1180px] items-center justify-between px-6 py-2.5">
          <div className="flex items-center gap-2 text-[12.5px] text-brand-700">
            <Sparkles className="h-3.5 w-3.5" />
            You're viewing the classic dashboard. Your Smart Track is ready —
            3 actions queued.
          </div>
          <button
            onClick={onReturn}
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-500 px-2.5 py-1 text-[12px] font-semibold text-white transition-colors hover:bg-brand-600"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Smart Track
          </button>
        </div>
      </div>

      <div className="mx-auto w-[1180px] px-6 py-5">
        <DashboardHeader />

        <div className="mt-5 grid grid-cols-3 gap-4">
          {/* Row 1 */}
          <NewUpdatesWidget />
          <KeepInTouchWidget />
          <TodaysNewLeadsWidget />

          {/* Row 2 */}
          <TodaysOpportunitiesWidget />
          <TransactionsWidget />
          <TodaysTasksWidget />

          {/* Row 3 */}
          <AppointmentsWidget />
          <MyListingsWidget />
          <HotSheetsWidget />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-[26px]">👋</span>
        <h1 className="text-[24px] font-semibold tracking-tight text-ink-900">
          Good Morning, James
        </h1>
        <button className="ml-2 inline-flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1 text-[12px] font-medium text-ink-700">
          My Dashboard
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-2.5 py-1.5 text-[12px] font-medium text-ink-700">
          Today's Priorities
          <ChevronDown className="h-3 w-3" />
        </button>
        <button className="grid h-7 w-7 place-items-center rounded-md border border-line bg-white text-ink-500">
          <Grid3x3 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Widget shell                                                        */
/* ------------------------------------------------------------------ */

function Widget({ title, action, children, footer = "View All" }) {
  return (
    <div className="flex h-[300px] flex-col rounded-lg border border-line bg-white">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <h3 className="text-[13.5px] font-semibold text-ink-900">{title}</h3>
          <HelpCircle className="h-3 w-3 text-ink-400" />
        </div>
        <div className="flex items-center gap-1">
          {action}
          <button className="grid h-5 w-5 place-items-center rounded text-ink-400 hover:bg-surface-muted">
            <Settings className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
      {footer && (
        <button className="flex items-center justify-between border-t border-line px-4 py-2 text-[12px] text-ink-500 hover:bg-surface-muted">
          {footer}
          <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. New Updates                                                      */
/* ------------------------------------------------------------------ */

function NewUpdatesWidget() {
  return (
    <Widget title="New Updates" footer={null}>
      <div className="p-3">
        <div className="rounded-lg border border-line">
          <div className="flex items-center justify-between border-b border-line px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-brand-500 text-[10px] font-semibold text-white">
                LR
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[12px] font-semibold text-ink-900">
                  Lofty Real Estate Service
                </span>
                <span className="text-[10px] text-ink-400">Sponsored · ⓘ</span>
              </div>
            </div>
            <X className="h-3 w-3 text-ink-400" />
          </div>
          <div className="bg-surface-muted px-3 py-2">
            <p className="text-[11.5px] text-ink-700">
              <span className="text-amber-600">🌟</span> NEW LISTING — NOW
              AVAILABLE! Be the first to check out your new dream home! 3 BD/ 3
              BA, 115 Appian #67, Irvine, CA 92602.
            </p>
            <div className="relative mt-2 h-[80px] overflow-hidden rounded bg-gradient-to-br from-amber-200 via-rose-200 to-orange-300">
              <button className="absolute left-1 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-ink-700">
                <ChevronLeft className="h-3 w-3" />
              </button>
              <button className="absolute right-1 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-ink-700">
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-[11px] text-ink-700">
                Promote your property today to make it sell faster!
              </p>
              <button className="rounded bg-action-500 px-2 py-0.5 text-[10.5px] font-semibold text-white">
                Boost Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Widget>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Need Keep In Touch                                               */
/* ------------------------------------------------------------------ */

function KeepInTouchWidget() {
  return (
    <Widget title="Need Keep In Touch">
      <div className="flex flex-col">
        <div className="grid grid-cols-2 border-b border-line text-center">
          <div className="border-r border-line py-2">
            <div className="text-[10.5px] font-medium text-ink-500">
              Birthday
            </div>
            <div className="mt-0.5 text-[18px] font-bold text-ink-900">8</div>
          </div>
          <div className="py-2">
            <div className="text-[10.5px] font-medium text-ink-500">
              Follow-Up
            </div>
            <div className="mt-0.5 text-[18px] font-bold text-ink-900">3</div>
          </div>
        </div>
        <div className="px-3 py-2">
          <ContactRow
            name="Kristin Watson"
            tags="Buyer | Seller | Renter | Investor"
            sub="Engaged · Follow-up every 14 days"
          />
          <ContactRow
            name="Kristin Watson"
            tags="Buyer | Seller | Renter | Investor"
            sub="Birthday · April 29th"
          />
        </div>
      </div>
    </Widget>
  );
}

function ContactRow({ name, tags, sub }) {
  return (
    <div className="border-b border-line py-1.5 last:border-0">
      <div className="text-[12px] font-semibold text-ink-900">{name}</div>
      <div className="text-[10px] text-ink-500">{tags}</div>
      <div className="text-[10.5px] text-ink-700">{sub}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Today's New Leads                                                */
/* ------------------------------------------------------------------ */

function TodaysNewLeadsWidget() {
  return (
    <Widget title="Today's New Leads">
      <div className="flex flex-col">
        <div className="px-3 pt-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-line">
            <div className="h-full w-[55%] rounded-full bg-green-500" />
          </div>
          <div className="mt-1.5 text-[11px] text-ink-700">
            Total: 23 (12 untouched)
          </div>
        </div>
        <div className="mt-2 px-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-500">
            Leads waiting for touch
          </div>
          <LeadRow name="Rob Adam" sub="Buyer | Seller" sub2="Facebook Ads" score={88} />
          <LeadRow name="Michael Scott" sub="Buyer" sub2="Website" score={48} />
          <LeadRow
            name="Jessica Philips"
            sub="Buyer | Seller | Renter | Investor | Agent"
            sub2="Website"
            score={61}
          />
        </div>
      </div>
    </Widget>
  );
}

function LeadRow({ name, sub, sub2, score }) {
  const tone =
    score >= 70
      ? "bg-green-500"
      : score >= 40
        ? "bg-amber-500"
        : "bg-red-500";
  return (
    <div className="flex items-center justify-between border-b border-line py-1.5 last:border-0">
      <div className="min-w-0">
        <div className="truncate text-[12px] font-semibold text-ink-900">
          {name}
        </div>
        <div className="truncate text-[10px] text-ink-500">{sub}</div>
        <div className="truncate text-[10.5px] text-ink-700">{sub2}</div>
      </div>
      <div
        className={`grid h-7 w-9 place-items-center rounded text-[12px] font-bold text-white ${tone}`}
      >
        {score}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Today's Opportunities                                            */
/* ------------------------------------------------------------------ */

function TodaysOpportunitiesWidget() {
  return (
    <Widget title="Today's Opportunities">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 border-b border-line text-center">
          <Stat label="High Interest" value="8" border />
          <Stat label="Likely Sellers" value="3" border />
          <Stat label="Back to Site" value="12" />
        </div>
        <div className="px-3 py-2">
          <OpRow
            name="Kristin Watson"
            tags="Buyer | Seller | Renter | Investor"
            sub="Lead saves a listing on the website"
          />
          <OpRow
            name="Annette Black"
            tags="Buyer"
            sub="Lead requests a showing (tour request) from a listing page"
          />
          <OpRow
            name="Wade Warren"
            tags="Buyer | Seller | Renter | Investor | Agent"
            sub="Lead requests a home valuation"
          />
          <OpRow name="Wade Warren" tags="" sub="" thin />
        </div>
      </div>
    </Widget>
  );
}

function Stat({ label, value, border }) {
  return (
    <div className={`py-2 ${border ? "border-r border-line" : ""}`}>
      <div className="text-[10.5px] font-medium text-ink-500">{label}</div>
      <div className="mt-0.5 text-[16px] font-bold text-ink-900">{value}</div>
    </div>
  );
}

function OpRow({ name, tags, sub, thin = false }) {
  return (
    <div className="border-b border-line py-1 last:border-0">
      <div className="text-[12px] font-semibold text-ink-900">{name}</div>
      {!thin && (
        <>
          <div className="text-[10px] text-ink-500">{tags}</div>
          <div className="line-clamp-1 text-[10.5px] text-ink-700">{sub}</div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Transactions                                                     */
/* ------------------------------------------------------------------ */

function TransactionsWidget() {
  return (
    <Widget title="Transactions">
      <div className="flex flex-col">
        <div className="grid grid-cols-2 border-b border-line text-center">
          <div className="border-r border-line py-2">
            <div className="text-[10.5px] font-medium text-ink-500">
              Near Deadline
            </div>
            <div className="mt-0.5 text-[16px] font-bold text-ink-900">3</div>
          </div>
          <div className="py-2">
            <div className="text-[10.5px] font-medium text-ink-500">Expired</div>
            <div className="mt-0.5 text-[16px] font-bold text-ink-900">2</div>
          </div>
        </div>
        <div className="px-3 py-2">
          <TxnRow
            address="3931 Via Montalvo, Campbell, CA 95008"
            warning="2 tasks near deadline"
            tone="red"
          />
          <TxnRow
            address="87 Valencia ST, Half Moon Bay, CA 94019"
            warning="2 tasks near deadline"
            tone="red"
          />
          <TxnRow
            address="2118 Thornridge Circus, Syracuse, Connecticut 35..."
            warning="2 tasks near deadline"
            tone="red"
          />
          <TxnRow
            address="26096 Dougherty PL, Carmel, CA 93923"
            warning="Near to transaction date: appointment date, offer date, clo..."
            tone="amber"
          />
        </div>
      </div>
    </Widget>
  );
}

function TxnRow({ address, warning, tone }) {
  const c = tone === "red" ? "text-red-600" : "text-amber-600";
  return (
    <div className="border-b border-line py-1 last:border-0">
      <div className="line-clamp-1 text-[11.5px] text-ink-900">{address}</div>
      <div className={`flex items-center gap-1 text-[10.5px] ${c}`}>
        <span>{tone === "red" ? "❗" : "⚠"}</span>
        <span className="line-clamp-1">{warning}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Today's Tasks                                                    */
/* ------------------------------------------------------------------ */

function TodaysTasksWidget() {
  return (
    <Widget title="Today's Tasks">
      <div className="flex flex-col">
        <div className="grid grid-cols-4 gap-1 border-b border-line p-2 text-center">
          <TaskStat label="Call" value="4" tone="blue" />
          <TaskStat label="Text" value="2" tone="indigo" />
          <TaskStat label="Email" value="1" tone="green" />
          <TaskStat label="Other" value="3" tone="amber" />
        </div>
        <div className="px-3 py-1.5">
          <TaskRow
            done={false}
            label="Call back for more information"
            sub="Rob Adams"
            time="10:00 AM"
            late
          />
          <TaskRow
            done
            label="Call Back"
            sub="James Adam"
            time="Anytime"
          />
          <TaskRow
            done={false}
            label="Spanish speaking only follow up with..."
            sub="Michael Scott"
            time="12:00 AM"
          />
          <TaskRow done={false} label="Text" sub="Dav Smith" time="02:00 PM" />
        </div>
      </div>
    </Widget>
  );
}

function TaskStat({ label, value, tone }) {
  const tones = {
    blue: "bg-blue-50 text-blue-700",
    indigo: "bg-indigo-50 text-indigo-700",
    green: "bg-green-50 text-green-700",
    amber: "bg-amber-50 text-amber-700",
  };
  return (
    <div className={`flex flex-col items-center rounded ${tones[tone]} py-1`}>
      <div className="text-[10.5px] font-medium">{label}</div>
      <div className="text-[14px] font-bold">{value}</div>
    </div>
  );
}

function TaskRow({ done, label, sub, time, late }) {
  return (
    <div className="flex items-start gap-2 border-b border-line py-1 last:border-0">
      <div
        className={`mt-0.5 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-sm border ${
          done ? "border-action-500 bg-action-500" : "border-ink-400"
        }`}
      >
        {done && (
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-white">
            <path d="M3 6 L5 8 L9 4" stroke="white" strokeWidth="1.5" fill="none" />
          </svg>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div
          className={`truncate text-[11.5px] ${
            done ? "text-ink-400 line-through" : "text-ink-900"
          }`}
        >
          {label}
        </div>
        <div
          className={`text-[10px] ${
            done ? "text-ink-400 line-through" : "text-ink-500"
          }`}
        >
          {sub}
        </div>
      </div>
      <div
        className={`text-[10.5px] ${
          late ? "font-semibold text-red-500" : "text-ink-500"
        }`}
      >
        {time}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Appointments / Showings                                          */
/* ------------------------------------------------------------------ */

function AppointmentsWidget() {
  return (
    <Widget title={null} footer="View All">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <div className="flex items-center gap-3 text-[13px]">
            <span className="border-b-2 border-brand-500 pb-1.5 font-semibold text-ink-900">
              Appointments
            </span>
            <span className="pb-1.5 text-ink-500">Showings</span>
          </div>
          <div className="flex items-center gap-1">
            <HelpCircle className="h-3 w-3 text-ink-400" />
            <Settings className="h-3 w-3 text-ink-400" />
          </div>
        </div>
        <div className="px-3 pt-2">
          <div className="h-1.5 overflow-hidden rounded-full bg-line">
            <div className="h-full w-[55%] rounded-full bg-green-500" />
          </div>
          <div className="mt-1 text-[11px] text-ink-700">
            Total: 23 (12 Incomplete)
          </div>
        </div>
        <div className="mt-2 flex-1 px-3">
          <ApptRow done={false} />
          <ApptRow done={false} />
          <ApptRow done />
        </div>
      </div>
    </Widget>
  );
}

function ApptRow({ done }) {
  return (
    <div className="flex items-start gap-2 border-b border-line py-1.5 last:border-0">
      <div
        className={`mt-0.5 h-3.5 w-3.5 shrink-0 rounded-sm border ${
          done ? "border-action-500 bg-action-500" : "border-ink-400"
        }`}
      />
      <div className="min-w-0 flex-1">
        <div
          className={`text-[11.5px] font-semibold ${
            done ? "text-ink-400 line-through" : "text-ink-900"
          }`}
        >
          William Johnson, Annie Campbell
        </div>
        <div
          className={`text-[10.5px] ${
            done ? "text-ink-400 line-through" : "text-action-600"
          }`}
        >
          11:00AM – 02:00PM
        </div>
        <div
          className={`text-[10px] ${
            done ? "text-ink-400 line-through" : "text-ink-500"
          }`}
        >
          I need a meeting to discuss the specific detail on the showing we did
          last friday.
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 8. My Listings                                                      */
/* ------------------------------------------------------------------ */

function MyListingsWidget() {
  return (
    <Widget title="My Listings">
      <div className="flex flex-col gap-2 px-3 py-2">
        <ListingRow address="182 Saint Peter St, Riverside, CA 10192" />
        <ListingRow
          address="1824 Saint Peter St, Riverside, CA 10192"
          warning="This listing has had no engagement in the past 15 days"
        />
        <ListingRow address="182 Saint Peter St, Riverside, CA 10192" />
      </div>
    </Widget>
  );
}

function ListingRow({ address, warning }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="grid h-12 w-16 shrink-0 place-items-center rounded-md bg-gradient-to-br from-amber-200 via-orange-200 to-rose-300">
        <HomeIcon className="h-4 w-4 text-white/80" />
      </div>
      <div className="min-w-0 flex-1 leading-tight">
        <div className="line-clamp-1 text-[11.5px] text-ink-900">{address}</div>
        {warning && (
          <div className="mt-0.5 text-[10px] text-red-500">{warning}</div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Hot Sheets                                                       */
/* ------------------------------------------------------------------ */

function HotSheetsWidget() {
  return (
    <Widget title="Hot Sheets">
      <div className="flex flex-col px-3 py-2">
        <HotSheetRow label="Upcoming Open House" count="758 Listings" />
        <HotSheetRow label="Back on Market" count="20 Listings" />
        <HotSheetRow label="Price Reduced" count="120 Listings" />
        <HotSheetRow label="New Listings" count="2039 Listings" />
        <HotSheetRow label="Upcoming Open House" count="203 Listings" />
      </div>
    </Widget>
  );
}

function HotSheetRow({ label, count }) {
  return (
    <div className="flex items-center justify-between border-b border-line py-1.5 last:border-0">
      <div className="leading-tight">
        <div className="text-[12px] font-semibold text-ink-900">{label}</div>
        <div className="text-[10px] text-ink-500">{count}</div>
      </div>
      <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">
        +12 Listings
      </span>
    </div>
  );
}
