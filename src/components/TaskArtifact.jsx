import { Paperclip, Mail, PhoneCall, Megaphone } from "lucide-react";

/**
 * Renders the actual artifact the agent produced — never just claim
 * "I drafted an email," show the email. This is the single biggest
 * trust signal in the product.
 */
export default function TaskArtifact({ artifact }) {
  if (!artifact) return null;
  if (artifact.kind === "email") return <EmailArtifact artifact={artifact} />;
  if (artifact.kind === "call_script")
    return <CallScriptArtifact artifact={artifact} />;
  if (artifact.kind === "ad") return <AdArtifact artifact={artifact} />;
  return null;
}

function ArtifactShell({ icon: Icon, label, children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="flex items-center gap-2 border-b border-line bg-surface-muted/60 px-4 py-2">
        <Icon className="h-3.5 w-3.5 text-ink-500" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
          {label}
        </span>
        <span className="ml-auto text-[10.5px] font-medium uppercase tracking-wider text-brand-600">
          AI-drafted preview
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function EmailArtifact({ artifact }) {
  return (
    <ArtifactShell icon={Mail} label="Drafted email">
      <dl className="grid grid-cols-[60px_1fr] gap-y-1 border-b border-line/70 pb-3 text-[12.5px]">
        <dt className="text-ink-400">From</dt>
        <dd className="text-ink-700">{artifact.from}</dd>
        <dt className="text-ink-400">To</dt>
        <dd className="text-ink-700">{artifact.to}</dd>
        <dt className="text-ink-400">Subject</dt>
        <dd className="font-semibold text-ink-900">{artifact.subject}</dd>
      </dl>
      <pre className="mt-3 whitespace-pre-wrap font-sans text-[13px] leading-relaxed text-ink-700">
        {artifact.body}
      </pre>
      {artifact.attachments?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-line/70 pt-3">
          {artifact.attachments.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1 rounded-md border border-line bg-surface-muted/60 px-2 py-1 text-[11.5px] text-ink-700"
            >
              <Paperclip className="h-3 w-3 text-ink-500" />
              {a}
            </span>
          ))}
        </div>
      )}
    </ArtifactShell>
  );
}

function CallScriptArtifact({ artifact }) {
  return (
    <ArtifactShell icon={PhoneCall} label="Call script">
      <div className="grid grid-cols-2 gap-3 border-b border-line/70 pb-3 text-[12px]">
        <div>
          <div className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
            Goal
          </div>
          <div className="mt-0.5 text-ink-700">{artifact.goal}</div>
        </div>
        <div>
          <div className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
            Estimated duration
          </div>
          <div className="mt-0.5 text-ink-700">{artifact.durationEstimate}</div>
        </div>
      </div>

      <div className="mt-3">
        <div className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
          Opener
        </div>
        <p className="mt-1 rounded-lg bg-surface-muted/70 p-3 text-[13px] italic text-ink-700">
          "{artifact.opener}"
        </p>
      </div>

      <div className="mt-3">
        <div className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
          Talking points
        </div>
        <ul className="mt-1.5 space-y-1.5">
          {artifact.talkingPoints.map((p, i) => (
            <li key={i} className="flex gap-2 text-[13px] text-ink-700">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3">
        <div className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
          If she says…
        </div>
        <div className="mt-1.5 grid gap-2">
          {artifact.objectionHandlers.map((o, i) => (
            <div
              key={i}
              className="rounded-lg border border-line bg-surface-muted/40 p-2.5 text-[12.5px]"
            >
              <div className="font-semibold text-ink-900">"{o.q}"</div>
              <div className="mt-0.5 text-ink-700">{o.a}</div>
            </div>
          ))}
        </div>
      </div>
    </ArtifactShell>
  );
}

function AdArtifact({ artifact }) {
  return (
    <ArtifactShell icon={Megaphone} label="Campaign preview">
      <div className="grid grid-cols-3 gap-3 border-b border-line/70 pb-3 text-[12px]">
        <Stat label="Platform" value={artifact.platform} />
        <Stat label="Budget" value={artifact.budget} />
        <Stat label="Reach" value={artifact.reach} />
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-line">
        <div className="aspect-[16/8] bg-gradient-to-br from-amber-200 via-orange-300 to-rose-400 p-4">
          <div className="inline-block rounded-md bg-black/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
            Sponsored · Coastline Realty
          </div>
        </div>
        <div className="space-y-2 bg-white p-3">
          <div className="text-[14px] font-semibold leading-snug text-ink-900">
            {artifact.headline}
          </div>
          <p className="text-[12.5px] leading-snug text-ink-700">
            {artifact.body}
          </p>
          <button className="mt-1 w-full rounded-lg bg-action-500 py-2 text-[12.5px] font-semibold text-white">
            {artifact.cta}
          </button>
        </div>
      </div>

      <div className="mt-3">
        <div className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
          Audience
        </div>
        <ul className="mt-1.5 space-y-1">
          {artifact.audience.map((a, i) => (
            <li key={i} className="flex gap-2 text-[12.5px] text-ink-700">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-action-500" />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </ArtifactShell>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
        {label}
      </div>
      <div className="mt-0.5 text-ink-700">{value}</div>
    </div>
  );
}
