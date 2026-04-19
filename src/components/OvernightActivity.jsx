import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  ChevronDown,
  Mail,
  Users,
  Image as ImageIcon,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { AGENTS } from "../data/briefing";

const ICONS = {
  mail: Mail,
  users: Users,
  image: ImageIcon,
  shield: ShieldCheck,
  refresh: RefreshCw,
};

const AGENT_TINT = {
  brand: "text-brand-700 bg-brand-50 ring-brand-100",
  warm: "text-amber-700 bg-amber-50 ring-amber-100",
  action: "text-action-700 bg-action-50 ring-action-100",
};

/**
 * The "While you slept" panel — the demo's first wow moment.
 *
 * This is the agentic-vs-assistive proof: by the time the user sees
 * their action queue, the agents have already done 23 things without
 * needing approval. This reframes Smart Track from "AI suggests"
 * to "AI handled — and only escalated what needs you."
 */
export default function OvernightActivity({ overnight }) {
  const [open, setOpen] = useState(true);
  if (!overnight) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.5 }}
      className="overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-[#0f172a] via-[#1f1d6b] to-brand-700 text-white shadow-[0_8px_28px_-12px_rgba(31,29,107,0.45)]"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.04]"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 ring-1 ring-inset ring-white/15">
            <Moon className="h-4.5 w-4.5 text-brand-200" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-semibold tracking-tight">
                While you slept,{" "}
                <span className="text-brand-200">
                  your agents handled {overnight.totalActions} things.
                </span>
              </span>
            </div>
            <div className="mt-0.5 text-[11.5px] text-white/55">
              {overnight.windowLabel} · {overnight.items.length} highlights
              shown · everything else logged silently
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-brand-100 ring-1 ring-inset ring-white/15 sm:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
            </span>
            Autonomous
          </span>
          <ChevronDown
            className={`h-4 w-4 text-white/60 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
              className="divide-y divide-white/10 border-t border-white/10 px-5 py-2"
            >
              {overnight.items.map((item) => {
                const Icon = ICONS[item.icon] ?? CheckCircle2;
                const agent = AGENTS[item.agentId];
                const tint = AGENT_TINT[agent?.accent] ?? AGENT_TINT.brand;
                return (
                  <motion.li
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, x: -8 },
                      show: { opacity: 1, x: 0 },
                    }}
                    className="flex items-center gap-3 py-2.5"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400" />
                    <div
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-md ring-1 ring-inset ${tint}`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 leading-tight">
                      <div className="text-[13px] font-medium text-white">
                        {item.title}
                      </div>
                      <div className="mt-0.5 text-[11.5px] text-white/55">
                        {item.detail}
                      </div>
                    </div>
                    {agent && (
                      <span className="hidden items-center gap-1.5 rounded-full bg-white/8 px-2 py-0.5 text-[10.5px] font-medium text-white/70 ring-1 ring-inset ring-white/10 sm:inline-flex">
                        {agent.name}
                      </span>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>

            <div className="border-t border-white/10 px-5 py-3 text-[11.5px] text-white/50">
              No human approval was needed for these. Below: the{" "}
              <span className="font-semibold text-white/85">3 things</span> that
              do.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
