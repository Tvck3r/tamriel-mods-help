import type { Mod } from '../data/mods'

/**
 * The "before" card — deliberately written the way a drag-and-drop builder
 * emits it. Every problem here is one you can see by dragging the window:
 *
 *  1. `w-[320px]` instead of letting the grid track size the card, so the
 *     card can't shrink on a phone and the row overflows sideways.
 *  2. No `min-w-0` anywhere, so nothing inside is allowed to shrink and a
 *     long tag pushes the whole column wider.
 *  3. No `truncate` / `line-clamp`, so a two-line title in one card and a
 *     one-line title in its neighbour leave the tags misaligned.
 *  4. A fixed-height image (`h-[180px]` with `object-cover` missing) that
 *     distorts instead of cropping.
 *  5. The CTA sits wherever the content ends, so buttons never line up.
 */
export function ModCardNaive({ mod }: { mod: Mod }) {
  return (
    <article className="w-[320px] overflow-hidden rounded-xl border border-red-200 bg-white shadow-sm">
      <div
        className="h-[180px] w-full"
        style={{ background: `linear-gradient(135deg, ${mod.swatch[0]}, ${mod.swatch[1]})` }}
      />
      <div className="p-3">
        <p className="text-xs text-slate-400">{mod.date}</p>
        <h3 className="text-lg font-semibold text-ink">{mod.title}</h3>
        <p className="text-sm text-slate-500">by {mod.author}</p>

        <div className="mt-2 text-xs text-slate-600">
          <p>Class: {mod.className}</p>
          <p>Coverage: {mod.coverage}</p>
          <p>Physics: {mod.physics ? 'Yes' : 'No'}</p>
        </div>

        {/* No wrap control and no shrink control: one long value and the row
            runs past the card edge. */}
        <div className="mt-2 flex gap-1">
          {[...mod.bodyTypes, ...mod.types, ...mod.roles, ...mod.themes].map((t) => (
            <span
              key={t}
              className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700"
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="mt-3 inline-block rounded bg-slate-700 px-3 py-2 text-sm text-white"
        >
          View on {mod.host}
        </a>
      </div>
    </article>
  )
}
