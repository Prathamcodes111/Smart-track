import {
  Search,
  ShoppingBag,
  Bell,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import LoftyLogo from "./LoftyLogo";

const NAV = [
  { label: "People", hasMenu: true },
  { label: "Transactions" },
  { label: "Calendar" },
  { label: "Listings" },
  { label: "Marketing" },
  { label: "Reporting" },
  { label: "Website" },
  { label: "Marketplace" },
  { label: "Settings" },
];

/**
 * The thin top nav, matching the live Lofty dashboard. We render it
 * de-emphasized when the user is in Focus Mode so the chrome reads as
 * "still inside Lofty" without competing for attention.
 */
export default function LoftyChrome({ muted = false }) {
  return (
    <header
      className={`sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur transition-opacity ${
        muted ? "opacity-60" : "opacity-100"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-6 px-6">
        <LoftyLogo />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[13px] font-medium text-ink-700 transition-colors hover:bg-surface-muted hover:text-ink-900"
            >
              {item.label}
              {item.hasMenu && <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <IconBtn>
            <Search className="h-4 w-4" />
          </IconBtn>
          <IconBtn>
            <ShoppingBag className="h-4 w-4" />
          </IconBtn>
          <IconBtn dot>
            <Bell className="h-4 w-4" />
          </IconBtn>
          <IconBtn>
            <HelpCircle className="h-4 w-4" />
          </IconBtn>
          <div className="ml-2 grid h-8 w-8 place-items-center rounded-full bg-brand-500 text-[12px] font-semibold text-white ring-2 ring-white">
            JM
          </div>
        </div>
      </div>
    </header>
  );
}

function IconBtn({ children, dot = false }) {
  return (
    <button className="relative grid h-8 w-8 place-items-center rounded-md text-ink-500 transition-colors hover:bg-surface-muted hover:text-ink-900">
      {children}
      {dot && (
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white" />
      )}
    </button>
  );
}
