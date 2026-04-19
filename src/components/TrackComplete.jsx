import { motion } from "framer-motion";
import {
  CheckCircle2,
  Mail,
  PhoneCall,
  Megaphone,
  RotateCcw,
  ArrowRight,
  Clock,
  Timer,
  TrendingDown,
} from "lucide-react";
import AgentChip from "./AgentChip";
import AnimatedNumber from "./AnimatedNumber";
import BriefAgents from "./BriefAgents";
import { AGENTS } from "../data/briefing";

const KIND_ICON = {
  email: Mail,
  call_script: PhoneCall,
  ad: Megaphone,
};

const KIND_LABEL = {
  email: "Email sent",
  call_script: "Call queued",
  ad: "Campaign live",
};

export default function TrackComplete({
  briefing,
  outcomes,
  stats,
  startedAt,
  endedAt,
  onReplay,
  onOpenClassic,
  onSubmitDebrief,
}) {
  const approved = outcomes.filter((o) => o.action === "approved");
  const elapsedSeconds = computeElapsedSeconds(startedAt, endedAt, outcomes);
  const elapsedDisplay = formatElapsed(elapsedSeconds);
  const classicMinutes = briefing.classicEstimateMinutes ?? 38;
  const earnedMinutes = Math.max(
    1,
    classicMinutes - Math.ceil(elapsedSeconds / 60),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mx-auto flex w-full max-w-[920px] flex-col gap-8 px-6 py-12 lg:py-16"
    >
      {/* Hero */}
      <div className="flex flex-col items-center gap-5 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 18 }}
          className="grid h-14 w-14 place-items-center rounded-full bg-green-500/10 text-green-600"
        >
          <CheckCircle2 className="h-8 w-8" />
        </motion.div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
            Smart Track complete
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-[44px] font-semibold leading-[1.05] tracking-tight text-ink-900 lg:text-[56px]"
          >
            You earned back{" "}
            <span className="bg-gradient-to-br from-brand-600 to-action-600 bg-clip-text text-transparent">
              <AnimatedNumber value={earnedMinutes} duration={1400} /> minutes
            </span>
            .
          </motion.h1>
          <p className="mt-2 max-w-md text-[14.5px] leading-snug text-ink-500">
            You closed{" "}
            <span className="font-semibold text-ink-900">
              {countByType(briefing, approved, "urgent")} deal
            </span>
            , nurtured{" "}
            <span className="font-semibold text-ink-900">
              {countByType(briefing, approved, "nurture")} lead
            </span>
            , and deployed{" "}
            <span className="font-semibold text-ink-900">
              {countByType(briefing, approved, "marketing")} campaign
            </span>
            .
          </p>
        </div>

        {/* Side-by-side comparison */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.45 }}
          className="mt-2 grid w-full max-w-md grid-cols-2 gap-3 text-left"
        >
          <div className="rounded-xl border border-line bg-white p-3.5">
            <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-ink-500">
              <Timer className="h-3 w-3" />
              Smart Track
            </div>
            <div className="mt-1 text-[24px] font-bold leading-none text-ink-900 tabular-nums">
              {elapsedDisplay}
            </div>
            <div className="mt-1 text-[11.5px] text-green-700">
              {stats.approved + stats.skipped} decisions made
            </div>
          </div>
          <div className="rounded-xl border border-dashed border-line bg-surface-muted/40 p-3.5">
            <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-ink-500">
              <TrendingDown className="h-3 w-3" />
              Classic dashboard
            </div>
            <div className="mt-1 text-[24px] font-bold leading-none text-ink-500 line-through tabular-nums">
              {classicMinutes}m
            </div>
            <div className="mt-1 text-[11.5px] text-ink-500">
              same 3 decisions, scanned across 9 widgets
            </div>
          </div>
        </motion.div>
      </div>

      {/* Outcomes list */}
      <div className="rounded-2xl border border-line bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
            Today's outcomes
          </div>
          <div className="flex items-center gap-2 text-[12px] text-ink-500">
            <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
            {stats.approved} approved
            <span className="mx-1 text-ink-400">·</span>
            <span className="inline-flex h-2 w-2 rounded-full bg-ink-400" />
            {stats.skipped} skipped
          </div>
        </div>

        <ul className="divide-y divide-line">
          {outcomes.map((o, i) => {
            const task = briefing.tasks.find((t) => t.id === o.taskId);
            if (!task) return null;
            const Icon = KIND_ICON[task.artifact?.kind] ?? CheckCircle2;
            const isSkipped = o.action === "skipped";
            return (
              <li key={i} className="flex items-center gap-3 py-3">
                <div
                  className={`grid h-8 w-8 place-items-center rounded-lg ${
                    isSkipped
                      ? "bg-surface-muted text-ink-500"
                      : "bg-brand-50 text-brand-600"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 leading-tight">
                  <div className="text-[13.5px] font-semibold text-ink-900">
                    {isSkipped
                      ? `Skipped: ${task.title}`
                      : KIND_LABEL[task.artifact?.kind] ?? task.title}
                  </div>
                  <div className="text-[12px] text-ink-500">
                    {task.lead?.name
                      ? `${task.lead.name} · `
                      : ""}
                    {task.property?.address}
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider ${
                    isSkipped
                      ? "bg-surface-muted text-ink-500"
                      : "bg-green-50 text-green-700 ring-1 ring-inset ring-green-100"
                  }`}
                >
                  {isSkipped ? "Skipped" : "Done"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Queued / agents still working */}
      <div className="rounded-2xl border border-line bg-gradient-to-br from-brand-50/60 via-white to-white p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
          </span>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-700">
            Agents still working
          </div>
        </div>
        <p className="mb-4 text-[13px] text-ink-700">
          {briefing.queuedForTomorrow.length} lower-priority items have been
          queued and will be ranked into tomorrow's Track.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {briefing.queuedForTomorrow.map((q, i) => {
            const agent = AGENTS[q.agentId];
            return (
              <li
                key={i}
                className="flex items-center gap-3 rounded-xl border border-line bg-white p-3"
              >
                <AgentChip agent={agent} size="sm" showRole={false} />
                <div className="flex-1 leading-tight">
                  <div className="text-[12.5px] font-medium text-ink-900">
                    {q.label}
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-[11px] text-ink-500">
                    <Clock className="h-3 w-3" />
                    {q.when}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Brief the agents — closes the agentic loop */}
      <BriefAgents onSubmitDebrief={onSubmitDebrief} />

      {/* Footer actions */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={onOpenClassic}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Open classic dashboard
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={onReplay}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-medium text-ink-700 transition-colors hover:bg-surface-muted"
          >
            <RotateCcw className="h-4 w-4" />
            Replay Track
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center gap-1 text-center text-[11.5px] text-ink-500">
          <div>
            Built with{" "}
            <span className="font-semibold text-ink-700">Cursor</span> +{" "}
            <span className="font-semibold text-ink-700">Claude</span> · Lofty
            Hackathon S1
          </div>
          <div>
            "Real Estate AI-Native PM" track · Morning Briefing entry point
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function countByType(briefing, approved, type) {
  return approved.filter((o) => {
    const t = briefing.tasks.find((t) => t.id === o.taskId);
    return t?.type === type;
  }).length;
}

/**
 * Prefer the explicit timer (set in App when the track starts/ends).
 * Falls back to outcome timestamps for safety.
 */
function computeElapsedSeconds(startedAt, endedAt, outcomes) {
  if (startedAt && endedAt) {
    return Math.max(1, Math.round((endedAt - startedAt) / 1000));
  }
  if (outcomes.length >= 2) {
    const ms = outcomes[outcomes.length - 1].at - outcomes[0].at;
    return Math.max(1, Math.round(ms / 1000));
  }
  return Math.max(1, outcomes.length * 30);
}

function formatElapsed(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s === 0 ? `${m}m` : `${m}m ${s}s`;
}
