export default function LoftyLogo({ className = "h-7 w-auto" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
        <rect width="32" height="32" rx="7" fill="#5b5bf7" />
        <path
          d="M10 9 L16 9 L22 23 L16 23 L13 16 L10 23 L4 23 Z"
          fill="#fff"
          opacity="0.95"
        />
        <circle cx="22.5" cy="9.5" r="2.5" fill="#2f7bff" />
      </svg>
      <span className="text-[17px] font-semibold tracking-tight text-ink-900">
        Lofty
      </span>
    </div>
  );
}
