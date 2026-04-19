import { motion } from "framer-motion";

const ACCENTS = {
  brand: {
    avatarBg: "bg-brand-500",
    avatarRing: "ring-brand-100",
    text: "text-brand-700",
    dot: "bg-brand-500",
  },
  warm: {
    avatarBg: "bg-amber-500",
    avatarRing: "ring-amber-100",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  action: {
    avatarBg: "bg-action-500",
    avatarRing: "ring-action-100",
    text: "text-action-700",
    dot: "bg-action-500",
  },
};

/**
 * Inline agent identity. Used in the briefing roster and on every TaskCard.
 * The "live" green dot reinforces that agents are continuously running,
 * not just batched once at login.
 */
export default function AgentChip({
  agent,
  size = "md",
  showRole = true,
  live = false,
  confidence,
}) {
  const accent = ACCENTS[agent.accent] ?? ACCENTS.brand;
  const dim = size === "sm";

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative">
        <div
          className={`grid place-items-center rounded-full font-semibold text-white ring-4 ${
            accent.avatarBg
          } ${accent.avatarRing} ${
            dim ? "h-7 w-7 text-[10px]" : "h-9 w-9 text-[12px]"
          }`}
        >
          {agent.initials}
        </div>
        {live && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -bottom-0.5 -right-0.5 grid h-3 w-3 place-items-center rounded-full bg-white"
          >
            <span className="h-2 w-2 rounded-full bg-green-500" />
          </motion.span>
        )}
      </div>

      <div className="flex min-w-0 flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span
            className={`truncate font-semibold text-ink-900 ${
              dim ? "text-[12px]" : "text-[13px]"
            }`}
          >
            {agent.name}
          </span>
          {confidence != null && (
            <span className="rounded-full bg-surface-muted px-1.5 py-px text-[10px] font-medium text-ink-500">
              {Math.round(confidence * 100)}%
            </span>
          )}
        </div>
        {showRole && (
          <span
            className={`truncate text-ink-500 ${
              dim ? "text-[10.5px]" : "text-[11.5px]"
            }`}
          >
            {agent.role}
          </span>
        )}
      </div>
    </div>
  );
}
