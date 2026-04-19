import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";

const DURATION_MS = 10000;

/**
 * Pinned 10s undo toast. The progress bar lives in a child component
 * keyed by outcome.id so it remounts cleanly per toast — avoiding the
 * setState-inside-effect anti-pattern.
 */
export default function UndoToast({ outcome, onUndo, onDismiss }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <AnimatePresence>
        {outcome && (
          <motion.div
            key={outcome.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-auto relative flex w-full max-w-md items-center gap-3 overflow-hidden rounded-xl border border-line bg-white px-4 py-3 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.25)]"
          >
            <div className="grid h-7 w-7 place-items-center rounded-full bg-green-500/10 text-green-600">
              <Check className="h-4 w-4" />
            </div>
            <div className="flex-1 text-[13px] text-ink-700">
              <span className="font-semibold text-ink-900">
                {outcome.message}
              </span>
            </div>
            <button
              onClick={onUndo}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 text-[12px] font-semibold text-ink-700 transition-colors hover:bg-surface-muted"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Undo
            </button>
            <ProgressBar key={outcome.id} onComplete={onDismiss} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProgressBar({ onComplete }) {
  const [progress, setProgress] = useState(100);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.max(0, 100 - (elapsed / DURATION_MS) * 100);
      setProgress(next);
      if (next <= 0) {
        clearInterval(interval);
        onCompleteRef.current?.();
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="absolute bottom-0 left-0 h-0.5 bg-brand-500 transition-[width]"
      style={{ width: `${progress}%` }}
    />
  );
}
