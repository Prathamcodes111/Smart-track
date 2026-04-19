const HINTS = [
  { keys: ["↵"], label: "Approve" },
  { keys: ["→"], label: "Skip" },
  { keys: ["←"], label: "Back" },
  { keys: ["Esc"], label: "Exit Track" },
];

export default function KeyboardHints() {
  return (
    <div className="mx-auto mt-6 flex max-w-fit flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-line bg-white px-4 py-2 text-[11.5px] text-ink-500">
      {HINTS.map((h, i) => (
        <span key={h.label} className="flex items-center gap-1.5">
          {h.keys.map((k) => (
            <kbd
              key={k}
              className="rounded border border-line bg-surface-muted px-1.5 py-px font-sans text-[11px] font-semibold text-ink-700"
            >
              {k}
            </kbd>
          ))}
          <span className="text-ink-500">{h.label}</span>
          {i < HINTS.length - 1 && (
            <span className="ml-2 h-3 w-px bg-line" aria-hidden />
          )}
        </span>
      ))}
    </div>
  );
}
