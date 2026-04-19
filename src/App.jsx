import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoftyChrome from "./components/LoftyChrome";
import BriefingOverview from "./components/BriefingOverview";
import SmartTrackPlayer from "./components/SmartTrackPlayer";
import TrackComplete from "./components/TrackComplete";
import UndoToast from "./components/UndoToast";
import ClassicDashboard from "./components/ClassicDashboard";
import { useSmartTrack } from "./hooks/useSmartTrack";
import { getBriefing } from "./data/briefing";

const VIEWS = {
  BRIEFING: "briefing",
  FOCUS: "focus",
  COMPLETE: "complete",
  CLASSIC: "classic",
};

export default function App() {
  const [briefing, setBriefing] = useState(null);
  const [view, setView] = useState(VIEWS.BRIEFING);
  const [toast, setToast] = useState(null);
  const [trackStartedAt, setTrackStartedAt] = useState(null);
  const [trackEndedAt, setTrackEndedAt] = useState(null);
  const [lastDebrief, setLastDebrief] = useState(null);

  useEffect(() => {
    let mounted = true;
    getBriefing().then((b) => mounted && setBriefing(b));
    return () => {
      mounted = false;
    };
  }, []);

  const track = useSmartTrack(briefing?.tasks ?? []);

  const isLastTask = (task) =>
    briefing && briefing.tasks[briefing.tasks.length - 1]?.id === task.id;

  const handleApprove = (task) => {
    track.approve(task);
    setToast({
      id: `${task.id}-approve-${Date.now()}`,
      message: toastMessage(task, "approved"),
      action: "approved",
    });
    if (isLastTask(task)) {
      setTrackEndedAt(Date.now());
      setView(VIEWS.COMPLETE);
    }
  };

  const handleSkip = (task) => {
    track.skip(task);
    setToast({
      id: `${task.id}-skip-${Date.now()}`,
      message: `Skipped — ${task.title}`,
      action: "skipped",
    });
    if (isLastTask(task)) {
      setTrackEndedAt(Date.now());
      setView(VIEWS.COMPLETE);
    }
  };

  const handleUndo = () => {
    track.undoLast();
    setToast(null);
  };

  const handleReplay = () => {
    track.reset();
    setTrackStartedAt(null);
    setTrackEndedAt(null);
    setView(VIEWS.BRIEFING);
  };

  if (!briefing) return <BootScreen />;

  return (
    <div className="min-h-screen bg-surface text-ink-900">
      <LoftyChrome muted={view === VIEWS.FOCUS} />

      <main>
        <AnimatePresence mode="wait">
          {view === VIEWS.BRIEFING && (
            <motion.div
              key="briefing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <BriefingOverview
                briefing={briefing}
                lastDebrief={lastDebrief}
                onStart={() => {
                  track.reset();
                  setTrackStartedAt(Date.now());
                  setTrackEndedAt(null);
                  setView(VIEWS.FOCUS);
                }}
                onOpenClassic={() => setView(VIEWS.CLASSIC)}
              />
            </motion.div>
          )}

          {view === VIEWS.FOCUS && !track.isComplete && (
            <motion.div
              key="focus"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <SmartTrackPlayer
                tasks={briefing.tasks}
                currentIndex={track.currentIndex}
                currentTask={track.currentTask}
                onApprove={handleApprove}
                onSkip={handleSkip}
                onBack={track.back}
                onExit={() => setView(VIEWS.BRIEFING)}
                onEdit={() => {
                  /* In production this opens the artifact editor. */
                }}
              />
            </motion.div>
          )}

          {view === VIEWS.COMPLETE && (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TrackComplete
                briefing={briefing}
                outcomes={track.outcomes}
                stats={track.stats}
                startedAt={trackStartedAt}
                endedAt={trackEndedAt}
                onReplay={handleReplay}
                onOpenClassic={() => setView(VIEWS.CLASSIC)}
                onSubmitDebrief={(sample) => setLastDebrief(sample)}
              />
            </motion.div>
          )}

          {view === VIEWS.CLASSIC && (
            <motion.div
              key="classic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ClassicDashboard onReturn={() => setView(VIEWS.BRIEFING)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <UndoToast
        outcome={toast}
        onUndo={handleUndo}
        onDismiss={() => setToast(null)}
      />
    </div>
  );
}

function BootScreen() {
  return (
    <div className="grid min-h-screen place-items-center bg-surface text-ink-500">
      <div className="flex items-center gap-3 text-[13px]">
        <div className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />
        Waking up your agents…
      </div>
    </div>
  );
}

function toastMessage(task, action) {
  if (action !== "approved") return `Skipped — ${task.title}`;
  switch (task.artifact?.kind) {
    case "email":
      return `Email sent to ${task.lead?.name ?? "recipient"}`;
    case "call_script":
      return `Call queued with ${task.lead?.name ?? "lead"}`;
    case "ad":
      return `Campaign deployed for ${task.property?.address ?? "listing"}`;
    default:
      return "Action approved";
  }
}
