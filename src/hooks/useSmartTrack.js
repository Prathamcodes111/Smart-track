import { useCallback, useMemo, useState } from "react";

/**
 * Smart Track state machine.
 *
 * outcomes is an ordered log of {taskId, action: 'approved' | 'skipped'}
 * — used for the completion summary and (eventually) for the learning
 * loop that retrains the agent ranker.
 */
export function useSmartTrack(tasks) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [outcomes, setOutcomes] = useState([]);

  const currentTask = tasks[currentIndex] ?? null;
  const isComplete = currentIndex >= tasks.length;

  const advance = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, tasks.length));
  }, [tasks.length]);

  const back = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const approve = useCallback(
    (task) => {
      setOutcomes((prev) => [
        ...prev,
        { taskId: task.id, action: "approved", at: Date.now() },
      ]);
      advance();
    },
    [advance]
  );

  const skip = useCallback(
    (task) => {
      setOutcomes((prev) => [
        ...prev,
        { taskId: task.id, action: "skipped", at: Date.now() },
      ]);
      advance();
    },
    [advance]
  );

  const undoLast = useCallback(() => {
    setOutcomes((prev) => prev.slice(0, -1));
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setOutcomes([]);
  }, []);

  const stats = useMemo(() => {
    const approved = outcomes.filter((o) => o.action === "approved");
    const skipped = outcomes.filter((o) => o.action === "skipped");
    return {
      approved: approved.length,
      skipped: skipped.length,
      total: tasks.length,
    };
  }, [outcomes, tasks.length]);

  return {
    currentTask,
    currentIndex,
    isComplete,
    outcomes,
    stats,
    approve,
    skip,
    advance,
    back,
    undoLast,
    reset,
  };
}
