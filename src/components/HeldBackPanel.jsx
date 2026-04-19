import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, Clock3 } from "lucide-react";
import { AGENTS } from "../data/briefing";

const ACCENT_DOT = {
  brand: "bg-brand-500",
  warm: "bg-amber-500",
  action: "bg-action-500",
};

/**
 * "Held for later" — the editorial-judgment trust mechanic.
 *
 * Demonstrates that the ranker isn't just sorting; it's actively
 * suppressing items it thinks aren't ready for human attention,
 * and showing its reasoning. This is what separates a curator
 * from a search engine.
 */
export default function HeldBackPanel({ heldBack }) {
  const [open, setOpen] = useState(false);
  if (!heldBack || heldBack.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.45 }}
      className="overflow-hidden rounded-2xl border border-dashed border-line bg-white/60"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors hover:bg-surface-muted/50"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-surface-muted text-ink-500 ring-1 ring-inset ring-line">
            <Filter className="h-3.5 w-3.5" />
          </div>
          <div className="leading-tight">
            <div className="text-[13.5px] font-semibold text-ink-900">
              {heldBack.length} items held for later
            </div>
            <div className="mt-0.5 text-[11.5px] text-ink-500">
              Your agents chose not to surface these today —{" "}
              <span className="font-medium text-ink-700">
                tap to see why
              </span>
            </div>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-ink-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <ul className="divide-y divide-line border-t border-line/70 px-5 py-1">
              {heldBack.map((item) => {
                const agent = AGENTS[item.agentId];
                const dotColor = ACCENT_DOT[agent?.accent] ?? ACCENT_DOT.brand;
                return (
                  <li key={item.id} className="flex gap-3 py-3">
                    <div className="mt-1.5 flex shrink-0 items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${dotColor}`}
                      />
                    </div>
                    <div className="flex-1 leading-snug">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <span className="text-[13px] font-semibold text-ink-900">
                          {item.title}
                        </span>
                        {agent && (
                          <span className="text-[11px] font-medium text-ink-500">
                            held by {agent.name}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-[12.5px] text-ink-700">
                        {item.reason}
                      </p>
                      <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-ink-500">
                        <Clock3 className="h-3 w-3" />
                        Will resurface: {item.surfaceWhen}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
