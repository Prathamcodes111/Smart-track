/**
 * Lead-score pill matching Lofty's existing dashboard treatment
 * (green >70, amber 40–70, red <40). Used in BriefingOverview summary
 * and inside TaskCard signals.
 */
export default function ScorePill({ score, size = "md", className = "" }) {
  const tone =
    score >= 70 ? "hot" : score >= 40 ? "warm" : "cold";

  const styles = {
    hot: "bg-green-100 text-green-700 ring-green-200",
    warm: "bg-amber-100 text-amber-700 ring-amber-200",
    cold: "bg-red-100 text-red-700 ring-red-200",
  }[tone];

  const sizing =
    size === "sm"
      ? "px-1.5 py-0.5 text-[10px]"
      : "px-2 py-0.5 text-[11px]";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ring-1 ring-inset ${styles} ${sizing} ${className}`}
    >
      {score}
    </span>
  );
}
