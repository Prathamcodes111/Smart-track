import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ShieldCheck,
  Home,
  Mail,
  Phone,
  Tag,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import AgentChip from "./AgentChip";
import TaskArtifact from "./TaskArtifact";
import { AGENTS, TASK_TYPE_META } from "../data/briefing";

const SIGNAL_TONE = {
  hot: "text-red-600 bg-red-50 ring-red-100",
  warm: "text-amber-700 bg-amber-50 ring-amber-100",
  cold: "text-ink-500 bg-surface-muted ring-line",
};

const ACCENT_AVATAR = {
  brand: "bg-brand-500",
  warm: "bg-amber-500",
  action: "bg-action-500",
};

export default function TaskCard({ task, onApprove, onSkip, onEdit }) {
  const [signalsOpen, setSignalsOpen] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const agent = AGENTS[task.agentId];
  const meta = TASK_TYPE_META[task.type];

  const handlePrimary = () => {
    if (task.requiresConfirm && !confirming) {
      setConfirming(true);
      return;
    }
    onApprove(task);
  };

  return (
    <motion.div
      key={task.id}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]"
    >
      {/* Type stripe */}
      <div className={`absolute inset-y-0 left-0 w-1 ${meta.stripe}`} />

      <div className="grid gap-0 p-6 lg:grid-cols-[1fr_360px]">
        {/* LEFT: context + signals + artifact */}
        <div className="flex flex-col gap-5 lg:pr-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider ring-1 ring-inset ${meta.badgeBg} ${meta.badgeText} ${meta.badgeRing}`}
                >
                  {meta.label}
                </span>
                {task.consensus && <ConsensusBadge consensus={task.consensus} />}
                <span className="text-[12px] text-ink-500">
                  {task.subtitle}
                </span>
              </div>
              <h2 className="text-[22px] font-semibold leading-tight tracking-tight text-ink-900">
                {task.title}
              </h2>
              {task.consensus && (
                <p className="text-[12.5px] leading-snug text-ink-500">
                  {task.consensus.rationale}
                </p>
              )}
            </div>

            <AgentChip agent={agent} confidence={task.confidence} live />
          </div>

          {/* AI proposed action */}
          <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-4">
            <div className="mb-1.5 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-brand-700">
              <Sparkles className="h-3 w-3" />
              {agent.name}'s proposed action
            </div>
            <p className="text-[14px] leading-snug text-ink-900">
              {task.aiAction}
            </p>
          </div>

          {/* Signals (collapsible) */}
          <div className="rounded-xl border border-line bg-white">
            <button
              onClick={() => setSignalsOpen((v) => !v)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-muted/50"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-500" />
                <span className="text-[13px] font-semibold text-ink-900">
                  Why this task? ({task.signals.length} signals)
                </span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-ink-500 transition-transform ${
                  signalsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {signalsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-1.5 border-t border-line px-4 py-3">
                    {task.signals.map((s, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${
                              SIGNAL_TONE[s.tone]
                            }`}
                          >
                            {s.label}
                          </span>
                          <span className="text-[12px] text-ink-500">
                            {s.detail}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Artifact */}
          <TaskArtifact artifact={task.artifact} />
        </div>

        {/* RIGHT: lead/property + actions */}
        <div className="flex flex-col gap-5 border-line lg:border-l lg:pl-6">
          {task.lead && (
            <div className="rounded-xl border border-line bg-surface-muted/40 p-4">
              <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-wider text-ink-500">
                Lead
              </div>
              <div className="text-[15px] font-semibold text-ink-900">
                {task.lead.name}
              </div>
              <div className="mt-2 space-y-1 text-[12.5px] text-ink-700">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-ink-400" />
                  {task.lead.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-ink-400" />
                  {task.lead.phone}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {task.lead.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10.5px] font-medium text-ink-700 ring-1 ring-inset ring-line"
                  >
                    <Tag className="h-2.5 w-2.5 text-ink-400" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {task.property && (
            <div className="rounded-xl border border-line bg-surface-muted/40 p-4">
              <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-wider text-ink-500">
                Property
              </div>
              <div className="flex items-start gap-2">
                <Home className="mt-0.5 h-4 w-4 shrink-0 text-ink-500" />
                <div>
                  <div className="text-[13.5px] font-semibold leading-tight text-ink-900">
                    {task.property.address}
                  </div>
                  <div className="mt-1 text-[12px] text-ink-500">
                    {task.property.price}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action panel */}
          <div className="mt-auto flex flex-col gap-2 rounded-xl border border-line bg-white p-4">
            {confirming && task.requiresConfirm && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-1 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] text-amber-800"
              >
                {task.confirmCopy} Confirm to proceed.
              </motion.div>
            )}

            <button
              onClick={handlePrimary}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-brand-600 active:scale-[0.99]"
            >
              {confirming && task.requiresConfirm
                ? "Confirm Deploy"
                : task.primaryButton}
              <ArrowRight className="h-4 w-4" />
            </button>

            {confirming ? (
              <button
                onClick={() => setConfirming(false)}
                className="rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-medium text-ink-700 transition-colors hover:bg-surface-muted"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => onEdit(task)}
                className="rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-medium text-ink-700 transition-colors hover:bg-surface-muted"
              >
                {task.secondaryButton}
              </button>
            )}

            <button
              onClick={() => onSkip(task)}
              className="text-[12.5px] font-medium text-ink-500 transition-colors hover:text-ink-900"
            >
              Skip for now
            </button>

            <div className="mt-2 flex items-center justify-between border-t border-line pt-2 text-[11px] text-ink-500">
              <span>Est. {task.estimatedTime}</span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                Reversible · Undo for 10s
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ConsensusBadge({ consensus }) {
  const agents = consensus.agents
    .map((id) => AGENTS[id])
    .filter(Boolean);
  if (agents.length === 0) return null;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-600 to-action-600 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-white shadow-[0_2px_6px_-2px_rgba(91,91,247,0.5)]"
    >
      <span className="flex -space-x-1">
        {agents.map((a) => (
          <span
            key={a.id}
            className={`grid h-4 w-4 place-items-center rounded-full text-[8px] font-bold text-white ring-1.5 ring-white ${
              ACCENT_AVATAR[a.accent] ?? ACCENT_AVATAR.brand
            }`}
          >
            {a.initials.charAt(0)}
          </span>
        ))}
      </span>
      All {agents.length} agents agreed
    </motion.span>
  );
}
