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

export default function App() {
  const active = LAYOUTS['breakpoints'];

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
                  <ModCard key={mod.id} mod={mod} clamp={true} />
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
