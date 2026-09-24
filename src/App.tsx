import { useState } from 'react';
import { BreakpointHud } from './components/BreakpointHud';
import { FilterSidebar } from './components/FilterSidebar';
import { ModCard } from './components/ModCard';
import { ModCardNaive } from './components/ModCardNaive';
import { SiteHeader } from './components/SiteHeader';
import { MODS } from './data/mods';

type Layout = 'naive' | 'breakpoints' | 'autofit';

const LAYOUTS: Record<
  Layout,
  { label: string; blurb: string; classes: string; naiveCards: boolean }
> = {
  naive: {
    label: '1. Before',
    blurb:
      'Fixed-width cards in a wrapping flex row. Cards cannot shrink, so on a phone the row overflows sideways and on a wide screen the last row leaves a ragged gap.',
    classes: 'flex flex-wrap gap-6',
    naiveCards: true,
  },
  breakpoints: {
    label: '2. Breakpoint grid',
    blurb:
      'Explicit column counts per breakpoint. This is the one to copy: you control exactly when the grid steps up, and the extra xs step avoids the 1 → 3 column jump.',
    classes:
      'grid gap-1 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4',
    naiveCards: false,
  },
  autofit: {
    label: '3. Auto-fit grid',
    blurb:
      'No breakpoints at all — the track list does the work. Columns appear whenever 16rem will fit. Great default, but you give up control of the exact column count.',
    classes:
      'grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fill,minmax(16rem,1fr))]',
    naiveCards: false,
  },
};

function Toolbar({
  layout,
  setLayout,
  clamp,
  setClamp,
}: {
  layout: Layout;
  setLayout: (l: Layout) => void;
  clamp: boolean;
  setClamp: (c: boolean) => void;
}) {
  const active = LAYOUTS[layout];

  return (
    <div className='mb-6 rounded-xl border border-slate-200 bg-white p-4'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex min-w-0 flex-wrap gap-1 rounded-lg bg-slate-100 p-1'>
          {(Object.keys(LAYOUTS) as Layout[]).map((key) => (
            <button
              key={key}
              type='button'
              onClick={() => setLayout(key)}
              className={[
                'rounded-md px-3 py-1.5 text-sm font-medium transition',
                key === layout
                  ? 'bg-white text-ink shadow-sm'
                  : 'text-slate-500 hover:text-slate-700',
              ].join(' ')}
            >
              {LAYOUTS[key].label}
            </button>
          ))}
        </div>

        <label className='flex shrink-0 cursor-pointer items-center gap-2 text-sm text-slate-600'>
          <input
            type='checkbox'
            checked={clamp}
            onChange={(e) => setClamp(e.target.checked)}
            className='size-4 rounded border-slate-300 accent-nord'
          />
          Clamp tag rows to 2 + overflow pill
        </label>
      </div>

      <p className='mt-3 text-sm leading-relaxed text-slate-600'>
        {active.blurb}
      </p>
      <pre className='mt-2 overflow-x-auto rounded-lg bg-ink p-3 text-[12px] leading-relaxed text-emerald-200'>
        <code>{active.classes}</code>
      </pre>
    </div>
  );
}

function Notes() {
  const items = [
    [
      'Add an xs breakpoint',
      'Tailwind jumps 640 → 768 → 1024. Between a 375px phone and a 640px sm there is a lot of dead space where two columns already fit. `--breakpoint-xs: 30rem` in the @theme block adds it.',
    ],
    [
      'min-w-0 on every flex/grid child',
      'A flex item defaults to min-width:auto and will not shrink below its content, so `truncate` silently does nothing and one long tag widens the whole column. This is the single most common cause of a grid that "breaks" at a breakpoint.',
    ],
    [
      'Let the track size the card',
      'Never put a width on the card. `grid-cols-*` already sized the track; a `w-[320px]` card fights it and wins, which is what causes horizontal overflow on phones.',
    ],
    [
      'Reserve the image box',
      'aspect-[4/3] + object-cover means the row height is known before images load, so cards stay aligned and nothing reflows.',
    ],
    [
      'Container queries for card internals',
      'Tag rows and the meta grid should react to the card width (`@container/card` + `@[22rem]/card:grid-cols-2`), not the viewport. A card in a 4-column desktop grid is narrower than a card on a phone — viewport breakpoints get that exactly backwards.',
    ],
    [
      'Equal-height cards need flex column + mt-auto',
      'Grid stretches cards to the row height by default. Make the card `flex flex-col`, give the body `flex-1`, and `mt-auto` on the CTA so every button lines up.',
    ],
  ];

  return (
    <section className='mt-10 rounded-xl border border-slate-200 bg-white p-4 sm:p-6'>
      <h2 className='text-lg font-semibold text-ink'>
        What to change on the real site
      </h2>
      <dl className='mt-4 grid gap-x-8 gap-y-5 md:grid-cols-2'>
        {items.map(([term, def]) => (
          <div key={term} className='min-w-0'>
            <dt className='font-mono text-sm font-semibold text-nord-dark'>
              {term}
            </dt>
            <dd className='mt-1 text-sm leading-relaxed text-slate-600'>
              {def}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function App() {
  const [layout, setLayout] = useState<Layout>('breakpoints');
  const [clamp, setClamp] = useState(true);

  const active = LAYOUTS[layout];

  return (
    <div className='min-h-screen bg-parchment text-ink'>
      <SiteHeader />

      <main className='mx-auto px-4 py-6 sm:px-6 sm:py-8'>
        <div className='mb-6'>
          <h1 className='font-serif text-2xl font-bold tracking-tight sm:text-3xl'>
            Armor &amp; Clothing
          </h1>
          <p className='mt-1 max-w-2xl text-sm text-slate-600'>
            Responsive-layout prototype for the card grid and tag rows. Drag the
            window narrow and wide, and watch the breakpoint readout in the
            bottom-right corner.
          </p>
        </div>

        {/* The page shell itself is a breakpoint decision: stacked below lg,
            sidebar + content row at lg and up. `min-w-0` on the content
            column is what stops a wide card from pushing the sidebar off. */}
        <div className='flex flex-col gap-2 lg:flex-row'>
          <FilterSidebar />

          <div className='min-w-0 flex-1'>
            <div className={active.classes}>
              {MODS.map((mod) =>
                active.naiveCards ? (
                  <ModCardNaive key={mod.id} mod={mod} />
                ) : (
                  <ModCard key={mod.id} mod={mod} clamp={clamp} />
                ),
              )}
            </div>
          </div>
        </div>

        {/* <Notes /> */}
      </main>

      <BreakpointHud />
    </div>
  );
}
