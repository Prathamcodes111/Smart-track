import { motion } from "framer-motion";
import {
  Flame,
  Phone,
  Megaphone,
  Play,
  ArrowRight,
  Clock,
  Sparkles,
  Quote,
} from "lucide-react";
import AgentChip from "./AgentChip";
import OvernightActivity from "./OvernightActivity";
import HeldBackPanel from "./HeldBackPanel";
import { AGENTS } from "../data/briefing";

const ACCENT_AVATAR = {
  brand: "bg-brand-500",
  warm: "bg-amber-500",
  action: "bg-action-500",
};

export default function BriefingOverview({
  briefing,
  lastDebrief,
  onStart,
  onOpenClassic,
}) {
  const {
    user,
    summary,
    agents,
    avgConfidence,
    estimatedDuration,
    tasks,
    overnight,
    heldBack,
  } = briefing;

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-10 px-6 py-12 lg:py-16">
      {/* Yesterday's debrief — proves the loop closed across sessions */}
      {lastDebrief && <DebriefBanner debrief={lastDebrief} />}

      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-line bg-white px-3 py-1 text-[12px] font-medium text-ink-500">
          <Sparkles className="h-3.5 w-3.5 text-brand-500" />
          Your Smart Track for {today()}
        </div>
        <h1 className="text-[34px] font-semibold leading-[1.1] tracking-tight text-ink-900 lg:text-[44px]">
          Good morning, {user.firstName}.
          <span className="block font-normal text-ink-500">
            Your 3 agents worked through the night.
          </span>
        </h1>
      </motion.div>

      {/* While You Slept — autonomous work proof */}
      <OvernightActivity overnight={overnight} />

      {/* Summary stat pills */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
        }}
        className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      >
        <SummaryPill
          icon={Flame}
          label="Hot Leads"
          value={summary.hotLeads}
          tone="red"
        />
        <SummaryPill
          icon={Phone}
          label="Follow-ups Due"
          value={summary.followUps}
          tone="amber"
        />
        <SummaryPill
          icon={Megaphone}
          label="Marketing Actions"
          value={summary.marketingActions}
          tone="blue"
        />
      </motion.div>

      {/* Agent roster */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="rounded-2xl border border-line bg-white p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-ink-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Agents Live
          </div>
          <div className="text-[12px] text-ink-500">
            {tasks.length} actions queued ·{" "}
            <span className="font-semibold text-ink-700">
              {Math.round(avgConfidence * 100)}% avg confidence
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {agents.map((agent) => {
            const taskForAgent = tasks.find((t) => t.agentId === agent.id);
            return (
              <div
                key={agent.id}
                className="flex flex-col gap-3 rounded-xl border border-line/70 bg-surface-muted/40 p-4"
              >
                <AgentChip agent={agent} live />
                <p className="text-[12.5px] leading-snug text-ink-500">
                  {agent.description}
                </p>
                {taskForAgent && (
                  <div className="mt-1 flex items-start gap-1.5 text-[12px] text-ink-700">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                    <span className="line-clamp-2">
                      {taskForAgent.title.replace(/^[^:]+:\s*/, "")}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Held-back curation — editorial judgment proof */}
      <HeldBackPanel heldBack={heldBack} />

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="flex flex-col items-center gap-4"
      >
        <button
          onClick={onStart}
          className="cta-glow group relative inline-flex items-center gap-3 rounded-2xl bg-brand-500 px-8 py-4 text-[16px] font-semibold text-white transition-transform hover:bg-brand-600 active:scale-[0.99]"
        >
          <Play className="h-5 w-5 fill-white" />
          Start Daily Smart Track
        </button>
        <div className="flex items-center gap-2 text-[12.5px] text-ink-500">
          <Clock className="h-3.5 w-3.5" />
          {estimatedDuration} · {tasks.length} decisions ·{" "}
          <kbd className="rounded border border-line bg-white px-1.5 py-px font-sans text-[11px] text-ink-700 shadow-sm">
            Enter
          </kbd>
          to begin
        </div>

        <button
          onClick={onOpenClassic}
          className="mt-2 text-[12.5px] font-medium text-ink-500 underline-offset-4 transition-colors hover:text-ink-700 hover:underline"
        >
          Open classic dashboard instead
        </button>
      </motion.div>
    </div>
  );
}

function SummaryPill({ icon: Icon, label, value, tone }) {
  const tones = {
    red: {
      bg: "bg-red-50",
      ring: "ring-red-100",
      iconBg: "bg-red-500/10 text-red-600",
      value: "text-red-700",
    },
    amber: {
      bg: "bg-amber-50",
      ring: "ring-amber-100",
      iconBg: "bg-amber-500/10 text-amber-600",
      value: "text-amber-700",
    },
    blue: {
      bg: "bg-blue-50",
      ring: "ring-blue-100",
      iconBg: "bg-blue-500/10 text-blue-600",
      value: "text-blue-700",
    },
  }[tone];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
      }}
      className={`flex items-center gap-3 rounded-xl ${tones.bg} px-4 py-3 ring-1 ring-inset ${tones.ring}`}
    >
      <div
        className={`grid h-9 w-9 place-items-center rounded-lg ${tones.iconBg}`}
      >
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`text-[20px] font-bold ${tones.value}`}>
          {value}
        </span>
        <span className="text-[11.5px] font-medium uppercase tracking-wider text-ink-500">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

function today() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function DebriefBanner({ debrief }) {
  const routed = AGENTS[debrief.routedTo];
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/80 via-white to-white p-4"
    >
      <div className="flex items-start gap-3">
        <div
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12px] font-bold text-white ring-4 ring-white ${
            ACCENT_AVATAR[routed?.accent] ?? ACCENT_AVATAR.brand
          }`}
        >
          {routed?.initials}
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="text-[10.5px] font-semibold uppercase tracking-wider text-brand-700">
            Yesterday {routed?.name} heard
          </div>
          <div className="mt-1 flex items-start gap-1.5 text-[13.5px] italic text-ink-700">
            <Quote className="mt-1 h-3 w-3 shrink-0 text-brand-400" />
            <span className="line-clamp-2">{debrief.transcript}</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11.5px] text-ink-700">
            <ArrowRight className="h-3 w-3 text-brand-500" />
            <span className="font-semibold text-ink-900">
              Reflected in today's track:
            </span>
            {debrief.tomorrowChanges.map((c, i) => {
              const a = AGENTS[c.agentId];
              return (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-2 py-0.5 text-[10.5px] font-medium text-ink-700"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      ACCENT_AVATAR[a?.accent] ?? ACCENT_AVATAR.brand
                    }`}
                  />
                  {a?.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
