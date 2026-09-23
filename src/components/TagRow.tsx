type TagTone = 'body' | 'class' | 'coverage' | 'type' | 'role' | 'theme'

const TONE: Record<TagTone, string> = {
  body: 'bg-nord/10 text-nord-dark ring-nord/20',
  class: 'bg-ebony/10 text-ebony ring-ebony/20',
  coverage: 'bg-amber-500/10 text-amber-800 ring-amber-500/20',
  type: 'bg-slate-900/5 text-slate-700 ring-slate-900/10',
  role: 'bg-emerald-600/10 text-emerald-800 ring-emerald-600/20',
  theme: 'bg-fuchsia-600/10 text-fuchsia-800 ring-fuchsia-600/20',
}

export function Tag({ tone, children }: { tone: TagTone; children: React.ReactNode }) {
  return (
    <span
      className={[
        // `max-w-full` + `truncate` is the pair that stops one long tag
        // ("Needs Conversion", "Armor Full Set") from forcing the card wider
        // than its grid track. Without it the whole column blows out.
        'inline-flex max-w-full shrink-0 items-center truncate rounded-full px-2 py-0.5',
        'text-[11px] font-medium leading-5 ring-1 ring-inset',
        TONE[tone],
      ].join(' ')}
    >
      {children}
    </span>
  )
}

type TagRowProps = {
  label: string
  tone: TagTone
  values: string[]
  /**
   * When true the row collapses to a single scroll-free line and hides the
   * overflow behind a "+N" pill. This is the fixed behaviour; the broken
   * variant just lets every tag wrap and the cards end up different heights.
   */
  clamp: boolean
  /** How many tags stay visible before the "+N" pill at the narrowest size. */
  visible?: number
}

export function TagRow({ label, tone, values, clamp, visible = 2 }: TagRowProps) {
  if (values.length === 0) return null

  const shown = clamp ? values.slice(0, visible) : values
  const hidden = values.length - shown.length

  return (
    // `min-w-0` on every flex/grid child in the chain is what actually lets
    // `truncate` work — a flex item defaults to min-width:auto and refuses to
    // shrink below its content.
    <div className="flex min-w-0 items-start gap-2">
      <span className="w-16 shrink-0 pt-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <div className="flex min-w-0 flex-wrap items-center gap-1">
        {shown.map((v) => (
          <Tag key={v} tone={tone}>
            {v}
          </Tag>
        ))}
        {hidden > 0 && (
          <span
            title={values.slice(visible).join(', ')}
            className="shrink-0 rounded-full bg-slate-900/5 px-2 py-0.5 text-[11px] font-medium leading-5 text-slate-500 ring-1 ring-inset ring-slate-900/10"
          >
            +{hidden}
          </span>
        )}
      </div>
    </div>
  )
}
