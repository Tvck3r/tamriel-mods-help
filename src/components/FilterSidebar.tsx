import { useState } from 'react'
import { FILTER_GROUPS } from '../data/mods'

/**
 * The sidebar is the other half of the breakpoint story: below `lg` it has to
 * stop being a column and become a collapsed panel above the grid, otherwise
 * it eats half the width on a phone.
 *
 * The trick worth stealing: the toggle only controls the *mobile* state. The
 * panel is `hidden lg:block` when collapsed, so at `lg` and up it is always
 * visible no matter what the user tapped on their phone earlier. One piece of
 * state, no resize listener, no flash of the wrong layout.
 */
export function FilterSidebar() {
  const [openOnMobile, setOpenOnMobile] = useState(false)

  return (
    <aside className="lg:w-64 lg:shrink-0">
      <div className="rounded-xl border border-slate-200 bg-white">
        <button
          type="button"
          onClick={() => setOpenOnMobile((v) => !v)}
          aria-expanded={openOnMobile}
          className="flex w-full items-center justify-between px-4 py-3 text-left font-semibold text-ink lg:hidden"
        >
          Filters
          <span className="text-sm font-normal text-slate-400">
            {openOnMobile ? 'hide' : 'show'}
          </span>
        </button>

        <div
          className={[
            openOnMobile ? 'block' : 'hidden lg:block',
            'space-y-5 px-4 pb-4 pt-1 lg:pt-4',
          ].join(' ')}
        >
          <p className="hidden font-semibold text-ink lg:block">Filters</p>
          {FILTER_GROUPS.map((group) => (
            <fieldset key={group.label} className="min-w-0">
              <legend className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                {group.label}
              </legend>
              {/* Two columns of checkboxes on tablet where there is width to
                  spare, back to one inside the narrow desktop rail. */}
              <div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2 lg:grid-cols-1">
                {group.options.map((opt) => (
                  <label
                    key={opt}
                    className="flex min-w-0 cursor-pointer items-center gap-2 text-sm text-slate-600"
                  >
                    <input
                      type="checkbox"
                      className="size-3.5 shrink-0 rounded border-slate-300 accent-nord"
                    />
                    <span className="truncate">{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      </div>
    </aside>
  )
}
