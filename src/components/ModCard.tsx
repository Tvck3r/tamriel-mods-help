import type { Mod } from '../data/mods';
import { TagRow } from './TagRow';

function Thumb({ mod }: { mod: Mod }) {
  return (
    // aspect-[4/3] reserves the box before anything loads, so the grid never
    // reflows and cards in a row always line up. Fixed pixel heights are what
    // make the live site's rows ragged.
    <div
      className='relative aspect-[4/3] w-full overflow-hidden rounded-t-xl'
      style={{
        background: `linear-gradient(135deg, ${mod.swatch[0]}, ${mod.swatch[1]})`,
      }}
    >
      <span className='absolute left-2 top-2 rounded bg-black/45 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur'>
        {mod.date}
      </span>
      <span className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-2 text-[10px] uppercase tracking-widest text-white/70'>
        <p>{mod.title}</p>
        <p>by {mod.author}</p>
      </span>
    </div>
  );
}

export function ModCard({ mod, clamp }: { mod: Mod; clamp: boolean }) {
  return (
    // `@container/card` turns the card into a query container. Everything
    // inside can then react to how wide THIS CARD is, which is the honest
    // question — a card in a 4-column grid on a 1440px screen is narrower
    // than the single card on a 400px phone, even though the viewport
    // breakpoint says the opposite.
    <article className='@container/card group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md'>
      <Thumb mod={mod} />

      <div className='flex min-w-0 flex-1 flex-col gap-3 p-3 @sm/card:p-4'>
        {/* The meta strip is a container-query grid: one column in a narrow
            card, two once the card itself passes 22rem. */}
        <dl className='grid grid-cols-1 gap-x-4 gap-y-1 text-xs @[22rem]/card:grid-cols-2'>
          <div className='flex min-w-0 justify-between gap-2'>
            <dt className='text-slate-400'>Class</dt>
            <dd className='truncate font-medium text-slate-700'>
              {mod.className}
            </dd>
          </div>
          <div className='flex min-w-0 justify-between gap-2'>
            <dt className='text-slate-400'>Coverage</dt>
            <dd className='truncate font-medium text-slate-700'>
              {mod.coverage}
            </dd>
          </div>
          <div className='flex min-w-0 justify-between gap-2'>
            <dt className='text-slate-400'>Physics</dt>
            <dd className='font-medium text-slate-700'>
              {mod.physics ? 'Yes' : 'No'}
            </dd>
          </div>
          <div className='flex min-w-0 justify-between gap-2'>
            <dt className='text-slate-400'>Host</dt>
            <dd className='truncate font-medium text-slate-700'>{mod.host}</dd>
          </div>
        </dl>

        <div className='flex flex-col gap-1.5'>
          <TagRow
            label='Body'
            tone='body'
            values={mod.bodyTypes}
            clamp={clamp}
            visible={2}
          />
          <TagRow
            label='Type'
            tone='type'
            values={mod.types}
            clamp={clamp}
            visible={2}
          />
          <TagRow
            label='Role'
            tone='role'
            values={mod.roles}
            clamp={clamp}
            visible={2}
          />
          <TagRow
            label='Theme'
            tone='theme'
            values={mod.themes}
            clamp={clamp}
            visible={2}
          />
        </div>

        {/* mt-auto pins the button to the bottom of every card regardless of
            how much tag content sits above it — needs the card to be a
            flex column with flex-1 on this wrapper. */}
        <a
          href='#'
          onClick={(e) => e.preventDefault()}
          className='mt-auto inline-flex items-center justify-center rounded-lg bg-nord px-3 py-2 text-sm font-semibold text-white transition hover:bg-nord-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nord'
        >
          View on {mod.host}
        </a>
      </div>
    </article>
  );
}
