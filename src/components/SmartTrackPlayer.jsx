import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, X, Mic, MicOff } from "lucide-react";
import TaskCard from "./TaskCard";
import KeyboardHints from "./KeyboardHints";
import { useSpeech } from "../hooks/useSpeech";
import { AGENTS } from "../data/briefing";

function buildSpokenScript(task) {
  if (!task) return "";
  const agent = AGENTS[task.agentId];
  const parts = [
    `${task.title.replace(/^[^:]+:\s*/, "")}.`,
    agent ? `${agent.name} suggests:` : "",
    task.aiAction,
  ];
  const top = (task.signals || []).slice(0, 2);
  if (top.length) {
    parts.push("Top signals:");
    top.forEach((s) => parts.push(`${s.label}, ${s.detail}.`));
  }
  parts.push("Approve, or skip.");
  return parts.filter(Boolean).join(" ");
}

export default function SmartTrackPlayer({
  tasks,
  currentIndex,
  currentTask,
  onApprove,
  onSkip,
  onBack,
  onExit,
  onEdit,
}) {
  const { supported: voiceSupported, enabled: voiceOn, toggle: toggleVoice, speak, cancel } = useSpeech();

  useEffect(() => {
    if (!voiceOn || !currentTask) return;
    speak(buildSpokenScript(currentTask));
    return () => cancel();
  }, [currentTask, voiceOn, speak, cancel]);

  useEffect(() => {
    return () => cancel();
  }, [cancel]);
  // Keyboard nav. Disabled when typing inside an input/textarea (none yet,
  // but defensive for the future).
  useEffect(() => {
    const handler = (e) => {
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "Enter" && currentTask) {
        e.preventDefault();
        onApprove(currentTask);
      } else if (e.key === "ArrowRight" && currentTask) {
        onSkip(currentTask);
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        onBack();
      } else if (e.key === "Escape") {
        onExit();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentTask, currentIndex, onApprove, onSkip, onBack, onExit]);

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-6 py-8">
      {/* Progress + exit */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          disabled={currentIndex === 0}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12.5px] font-medium text-ink-500 transition-colors hover:bg-surface-muted hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        <div className="flex flex-1 items-center gap-3">
          <div className="flex flex-1 gap-1.5">
            {tasks.map((t, i) => (
              <div
                key={t.id}
                className={`progress-seg h-1 flex-1 rounded-full ${
                  i < currentIndex
                    ? "bg-brand-500"
                    : i === currentIndex
                      ? "bg-brand-300"
                      : "bg-line"
                }`}
              />
            ))}
          </div>
          <div className="text-[12px] font-semibold tabular-nums text-ink-500">
            Task {Math.min(currentIndex + 1, tasks.length)} of {tasks.length}
          </div>
        </div>

        {voiceSupported && (
          <button
            onClick={toggleVoice}
            title={
              voiceOn
                ? "Hands-free mode on — agents read each card aloud"
                : "Turn on hands-free mode — agents read each card aloud"
            }
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12.5px] font-medium transition-colors ${
              voiceOn
                ? "bg-brand-500 text-white hover:bg-brand-600"
                : "text-ink-500 hover:bg-surface-muted hover:text-ink-900"
            }`}
          >
            {voiceOn ? (
              <>
                <Mic className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Hands-free</span>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </>
            ) : (
              <>
                <MicOff className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Hands-free</span>
              </>
            )}
          </button>
        )}

        <button
          onClick={onExit}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12.5px] font-medium text-ink-500 transition-colors hover:bg-surface-muted hover:text-ink-900"
        >
          <X className="h-4 w-4" />
          Exit
        </button>
      </div>

      {/* Card stack */}
      <div className="relative min-h-[640px]">
        <AnimatePresence mode="wait">
          {currentTask && (
            <TaskCard
              key={currentTask.id}
              task={currentTask}
              onApprove={onApprove}
              onSkip={onSkip}
              onEdit={onEdit}
            />
          )}
        </AnimatePresence>
      </div>

      <KeyboardHints />
    </div>
  );
}
