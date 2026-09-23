# TamrielMods — responsive grid prototype

A throwaway mirror of the [Armor & Clothing listing](https://www.tamrielmods.com/armorclothing),
rebuilt in Vite + React + Tailwind v4 so the responsive behaviour can be demonstrated by
dragging a window instead of described in a chat message.

It is **not** a replacement for the Wix site. It exists to show what the card grid and tag
rows should do at each breakpoint, so the same rules can be translated into whatever Wix
lets you edit (custom CSS panel, or an embedded HTML block).

## Run it

```bash
pnpm install
pnpm dev
```

## Deploy it

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to
`main`. After the first push, enable it once at **Settings → Pages → Build and deployment →
Source: GitHub Actions**.

`vite.config.ts` uses `base: './'`, so the build works from `user.github.io/<repo>/` without
the repo name being hardcoded.

## What the prototype demonstrates

The toolbar switches between three grid strategies, and prints the exact class string for the
active one. The readout pinned to the bottom-right corner shows the live viewport width and
which breakpoint is active.

### 1. Before

```
flex flex-wrap gap-6
```

Fixed-width cards (`w-[320px]`) in a wrapping flex row. The cards cannot shrink, so a 375px
phone gets a horizontal scrollbar, and on a wide screen the final row leaves a ragged gap
where the wrap fell. This is the failure mode to point at.

### 2. Breakpoint grid — the one to copy

```
grid gap-4 sm:gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4
```

Explicit column counts, so you control exactly when the grid steps up. Note `xs` — a custom
30rem breakpoint added in `src/index.css`:

```css
@theme {
  --breakpoint-xs: 30rem;
}
```

Tailwind's stock scale jumps 40rem → 48rem → 64rem. Between a 375px phone and `sm` there is a
wide band where two columns already fit comfortably, and without `xs` the grid goes straight
from 1 column to 3.

### 3. Auto-fit grid

```
grid gap-4 sm:gap-6 [grid-template-columns:repeat(auto-fill,minmax(16rem,1fr))]
```

No breakpoints at all — the track list decides. A column appears whenever 16rem will fit.
A great default that needs no maintenance; the trade-off is that you no longer control the
exact column count at a given width.

## The six rules that actually fix the tags

1. **`min-w-0` on every flex and grid child in the chain.** A flex item defaults to
   `min-width: auto` and refuses to shrink below its content, so `truncate` silently does
   nothing and one long tag (`Needs Conversion`, `Armor Full Set`) widens the entire column.
   This is the single most common cause of a grid that "breaks" at one breakpoint.
2. **Never put a width on the card.** `grid-cols-*` already sized the track. A `w-[320px]`
   card fights the track and wins, which is what produces horizontal overflow on phones.
3. **Reserve the image box** with `aspect-[4/3]` + `object-cover`. The row height is then
   known before any image loads, so cards stay aligned and nothing reflows.
4. **`line-clamp-2` on the title.** A two-line title next to a one-line title leaves every
   tag row below misaligned across the row.
5. **Container queries for card internals.** Tag rows and the meta grid should respond to how
   wide *the card* is (`@container/card` on the card, then `@[22rem]/card:grid-cols-2`), not to
   the viewport. A card in a 4-column desktop grid is *narrower* than the single card on a
   phone — viewport breakpoints get that backwards.
6. **Equal-height cards need `flex flex-col` + `flex-1` + `mt-auto`.** Grid already stretches
   cards to the row height; making the body a flex column and pushing the CTA with `mt-auto`
   is what lines every button up.

The "Clamp tag rows" checkbox toggles the other half of the tag problem: with 4 tag categories
and up to 4 values each, an unclamped card can be twice the height of its neighbour. Clamping
to two tags plus a `+N` pill (hover it for the rest) keeps every card the same height.

## Notes / caveats

- Tailwind v4 expresses breakpoints in `rem`, so they scale with the browser's root font size.
  The width readout in the corner reports `window.innerWidth` in px; at the default 16px root
  they line up exactly, but they can diverge if a visitor has changed their font size.
- Mod names, authors and thumbnails are invented placeholders. Thumbnails are CSS gradients so
  the demo has no external image dependencies.
