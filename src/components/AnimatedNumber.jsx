import { useEffect, useRef, useState } from "react";

/**
 * Counts a number up from 0 to `value` over `duration` ms with an
 * ease-out curve. Used for the "earned back N minutes" hero metric.
 *
 * Re-runs the animation if `value` changes.
 */
export default function AnimatedNumber({
  value,
  duration = 1400,
  format = (n) => Math.round(n),
}) {
  const [displayed, setDisplayed] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const fromRef = useRef(0);

  useEffect(() => {
    fromRef.current = 0;
    startRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const target = Number(value) || 0;

    const tick = (now) => {
      if (startRef.current == null) startRef.current = now;
      const elapsed = now - startRef.current;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = fromRef.current + (target - fromRef.current) * eased;
      setDisplayed(next);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  return <>{format(displayed)}</>;
}
