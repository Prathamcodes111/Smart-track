import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Wand2,
} from "lucide-react";
import { AGENTS, DEBRIEF_SAMPLES } from "../data/briefing";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

const ACCENT_AVATAR = {
  brand: "bg-brand-500",
  warm: "bg-amber-500",
  action: "bg-action-500",
};

/**
 * "Tell the agents what you learned" — closes the agentic loop.
 *
 * The third leg of the system: not just AI working autonomously
 * (overnight panel) and AI deciding with you (the track), but AI
 * learning from you. This is what separates a learning system
 * from a smart dashboard.
 *
 * The actual routing is hand-scripted per demo input. The animation
 * is the message.
 */
export default function BriefAgents({ onSubmitDebrief }) {
  const speech = useSpeechRecognition();
  const [phase, setPhase] = useState("idle"); // idle | routing | done
  const [matchedSample, setMatchedSample] = useState(null);
  const fallbackTimer = useRef(null);

  // If mic is on but nothing transcribed within 3s, gently prefill demo text.
  useEffect(() => {
    if (!speech.listening) {
      if (fallbackTimer.current) {
        clearTimeout(fallbackTimer.current);
        fallbackTimer.current = null;
      }
      return;
    }
    const setManual = speech.setManualTranscript;
    fallbackTimer.current = setTimeout(() => {
      if (!speech.transcript.trim()) {
        setManual(DEBRIEF_SAMPLES[0].transcript);
      }
    }, 3000);
    return () => clearTimeout(fallbackTimer.current);
  }, [speech.listening, speech.transcript, speech.setManualTranscript]);

  const draft = speech.transcript;

  const handleMicToggle = () => {
    if (!speech.supported) {
      speech.setManualTranscript(DEBRIEF_SAMPLES[0].transcript);
      return;
    }
    if (speech.listening) speech.stop();
    else speech.start();
  };

  const handleUseSample = (sample) => {
    if (speech.listening) speech.stop();
    speech.setManualTranscript(sample.transcript);
  };

  const matchSample = (text) => {
    const t = text.toLowerCase();
    if (t.includes("kristin")) return DEBRIEF_SAMPLES[1];
    return DEBRIEF_SAMPLES[0];
  };

  const handleSend = () => {
    if (!draft.trim()) return;
    if (speech.listening) speech.stop();
    const matched = matchSample(draft);
    setMatchedSample(matched);
    setPhase("routing");
  };

  const handleRoutingComplete = () => {
    setPhase("done");
    onSubmitDebrief?.(matchedSample);
  };

  const reset = () => {
    speech.reset();
    setMatchedSample(null);
    setPhase("idle");
  };

  if (phase === "routing" && matchedSample) {
    return (
      <RoutingReveal
        sample={matchedSample}
        onComplete={handleRoutingComplete}
      />
    );
  }

  if (phase === "done" && matchedSample) {
    return <DebriefReceipt sample={matchedSample} onReset={reset} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="overflow-hidden rounded-2xl border border-line bg-white p-5"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="leading-tight">
          <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-brand-700">
            <Sparkles className="h-3 w-3" />
            Brief the agents
          </div>
          <h3 className="text-[16px] font-semibold tracking-tight text-ink-900">
            Anything from today the agents should know?
          </h3>
          <p className="mt-1 text-[12.5px] text-ink-500">
            Tap the mic and talk. Aria, Milo, and Vox will route it to the
            right lead, listing, or campaign — and tomorrow's track will
            reflect it.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        {/* Mic button */}
        <button
          onClick={handleMicToggle}
          className={`relative grid h-[88px] w-full place-items-center rounded-xl border transition-all sm:w-[88px] sm:shrink-0 ${
            speech.listening
              ? "border-red-300 bg-red-50 text-red-600"
              : "border-line bg-surface-muted/40 text-ink-700 hover:border-brand-300 hover:bg-brand-50/50 hover:text-brand-700"
          }`}
          aria-label={speech.listening ? "Stop dictation" : "Start dictation"}
        >
          {speech.listening ? (
            <>
              <MicOff className="h-7 w-7" />
              <span className="absolute inset-0 rounded-xl ring-4 ring-red-200/60 ring-inset animate-pulse" />
            </>
          ) : (
            <Mic className="h-7 w-7" />
          )}
        </button>

        {/* Textarea */}
        <textarea
          value={draft}
          onChange={(e) => speech.setManualTranscript(e.target.value)}
          placeholder={
            speech.listening
              ? "Listening…"
              : speech.supported
                ? "Tap the mic, or type your note here."
                : "Type your debrief here, or pick a sample below."
          }
          rows={3}
          className="flex-1 resize-none rounded-xl border border-line bg-white px-4 py-3 text-[13.5px] leading-relaxed text-ink-900 placeholder:text-ink-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {/* Sample dictations + send */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-[11.5px] text-ink-500">
          <Wand2 className="h-3.5 w-3.5" />
          <span>Sample:</span>
          {DEBRIEF_SAMPLES.map((s) => (
            <button
              key={s.id}
              onClick={() => handleUseSample(s)}
              className="rounded-full border border-line bg-white px-2.5 py-0.5 text-[11px] font-medium text-ink-700 transition-colors hover:border-brand-300 hover:bg-brand-50/60 hover:text-brand-700"
            >
              {s.leadName}
            </button>
          ))}
        </div>

        <button
          onClick={handleSend}
          disabled={!draft.trim()}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send className="h-3.5 w-3.5" />
          Brief the agents
        </button>
      </div>

      {!speech.supported && (
        <div className="mt-3 rounded-md border border-line bg-surface-muted/40 px-3 py-2 text-[11.5px] text-ink-500">
          Dictation requires Chrome / Safari. You can still type the note or
          pick a sample.
        </div>
      )}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Routing animation — the demo's "loop closes" moment             */
/* ────────────────────────────────────────────────────────────── */

function RoutingReveal({ sample, onComplete }) {
  const [stage, setStage] = useState(0);
  // 0: routing → 1: agent picked → 2: updates landing
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 900);
    const t2 = setTimeout(() => setStage(2), 1700);
    const t3 = setTimeout(() => onComplete(), 2900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const routedAgent = AGENTS[sample.routedTo];
  const agentList = Object.values(AGENTS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-[#0f172a] via-[#1f1d6b] to-brand-700 p-5 text-white shadow-[0_8px_28px_-12px_rgba(31,29,107,0.45)]"
    >
      {/* Quoted dictation */}
      <blockquote className="mb-5 border-l-2 border-white/30 pl-3 text-[13px] italic leading-snug text-white/90">
        "{sample.transcript}"
      </blockquote>

      {/* Stage 0: routing across all agents */}
      <div className="flex items-center gap-4">
        <div className="flex -space-x-2">
          {agentList.map((a) => {
            const isPicked = stage >= 1 && a.id === routedAgent.id;
            const isDimmed = stage >= 1 && a.id !== routedAgent.id;
            return (
              <motion.div
                key={a.id}
                animate={{
                  scale: isPicked ? 1.15 : 1,
                  opacity: isDimmed ? 0.3 : 1,
                  y: isPicked ? -2 : 0,
                }}
                transition={{ duration: 0.4 }}
                className={`grid h-9 w-9 place-items-center rounded-full text-[11px] font-bold text-white ring-2 ring-white/30 ${
                  ACCENT_AVATAR[a.accent] ?? ACCENT_AVATAR.brand
                } ${stage === 0 ? "animate-pulse" : ""}`}
              >
                {a.initials}
              </motion.div>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="routing"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-[13px] text-white/70"
            >
              Routing to the right agent…
            </motion.div>
          )}
          {stage >= 1 && (
            <motion.div
              key="picked"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[13.5px] leading-tight"
            >
              <div className="font-semibold text-white">
                {routedAgent.name} received this.
              </div>
              <div className="text-[12px] text-white/70">
                Updating {sample.leadName}'s profile.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stage 2: updates land */}
      <AnimatePresence>
        {stage >= 2 && (
          <motion.ul
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
            className="mt-5 space-y-1.5 border-t border-white/10 pt-4"
          >
            {sample.updates.map((u, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -8 },
                  show: { opacity: 1, x: 0 },
                }}
                className="flex items-center gap-2 text-[12.5px] text-white/85"
              >
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-400" />
                {u}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Receipt + tomorrow preview                                      */
/* ────────────────────────────────────────────────────────────── */

function DebriefReceipt({ sample, onReset }) {
  const routed = AGENTS[sample.routedTo];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/70 via-white to-white p-5"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-green-500/10 text-green-600">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div className="flex-1 leading-tight">
          <div className="text-[10.5px] font-semibold uppercase tracking-wider text-brand-700">
            Briefed · routed to {routed?.name}
          </div>
          <h3 className="mt-1 text-[15px] font-semibold tracking-tight text-ink-900">
            {sample.summary}
          </h3>
        </div>
      </div>

      {/* Tomorrow's track preview */}
      <div className="mt-4 rounded-xl border border-line bg-white p-4">
        <div className="mb-2 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-ink-500">
          <ArrowRight className="h-3 w-3" />
          What's different in tomorrow's track
        </div>
        <ul className="space-y-2">
          {sample.tomorrowChanges.map((c, i) => {
            const a = AGENTS[c.agentId];
            return (
              <li key={i} className="flex items-start gap-2.5">
                <span
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[9px] font-bold text-white ${
                    ACCENT_AVATAR[a?.accent] ?? ACCENT_AVATAR.brand
                  }`}
                >
                  {a?.initials.charAt(0)}
                </span>
                <div className="text-[12.5px] leading-snug text-ink-800">
                  <span className="font-semibold text-ink-900">{a?.name}:</span>{" "}
                  {c.change}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          onClick={onReset}
          className="text-[12px] font-medium text-ink-500 underline-offset-4 transition-colors hover:text-ink-900 hover:underline"
        >
          Add another note
        </button>
      </div>
    </motion.div>
  );
}
