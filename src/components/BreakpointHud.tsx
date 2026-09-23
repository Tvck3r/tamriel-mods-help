import { useEffect, useState } from 'react'

/** Tailwind's default scale, plus the extra `xs` step defined in index.css. */
const BREAKPOINTS = [
  { name: 'base', min: 0 },
  { name: 'xs', min: 480 },
  { name: 'sm', min: 640 },
  { name: 'md', min: 768 },
  { name: 'lg', min: 1024 },
  { name: 'xl', min: 1280 },
  { name: '2xl', min: 1536 },
] as const

function activeFor(width: number) {
  return [...BREAKPOINTS].reverse().find((bp) => width >= bp.min)!.name
}

/**
 * Fixed readout of the current viewport width and active breakpoint.
 * The point of the whole demo is watching this change as you drag the
 * window edge, so it stays pinned while you scroll.
 */
export function BreakpointHud() {
  const [width, setWidth] = useState(() => window.innerWidth)

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const active = activeFor(width)

  return (
    <div className="fixed bottom-3 right-3 z-50 rounded-lg border border-white/10 bg-ink/95 px-3 py-2 font-mono text-xs text-white shadow-lg backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="tabular-nums text-white/60">{width}px</span>
        <span className="rounded bg-nord px-1.5 py-0.5 font-semibold">{active}</span>
      </div>
      <div className="mt-1.5 flex gap-1">
        {BREAKPOINTS.map((bp) => (
          <span
            key={bp.name}
            className={
              bp.name === active
                ? 'rounded bg-white px-1 text-ink'
                : 'rounded px-1 text-white/30'
            }
          >
            {bp.name}
          </span>
        ))}
      </div>
    </div>
  )
}
