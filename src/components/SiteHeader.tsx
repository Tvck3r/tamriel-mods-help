export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-parchment/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:px-6">
        <a href="#" onClick={(e) => e.preventDefault()} className="min-w-0 shrink-0">
          <span className="font-serif text-lg font-bold tracking-tight text-ink sm:text-xl">
            TamrielMods
          </span>
          <span className="ml-2 hidden rounded bg-nord/10 px-1.5 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wide text-nord-dark sm:inline">
            prototype
          </span>
        </a>

        {/* Nav collapses to icons-only text at the narrowest sizes rather than
            wrapping to a second row and pushing the grid down. */}
        <nav className="ml-auto flex min-w-0 items-center gap-1 text-sm sm:gap-4">
          {['Home', 'Armor & Clothing', 'Discord'].map((item, i) => (
            <a
              key={item}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={[
                'truncate rounded px-2 py-1 text-slate-600 hover:text-nord-dark',
                // The middle link is the current page; hide the least useful
                // link first instead of letting the row wrap.
                i === 0 ? 'hidden xs:inline' : '',
                i === 1 ? 'font-semibold text-ink' : '',
              ].join(' ')}
            >
              {item}
            </a>
          ))}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="shrink-0 rounded-lg bg-ink px-3 py-1.5 text-sm font-medium text-white"
          >
            Log in
          </a>
        </nav>
      </div>
    </header>
  )
}
