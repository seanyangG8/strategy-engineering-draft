## Goal

Mint and Lime currently feel mono-green because the dark surfaces, foreground text, secondary blocks, and the `bg-bronze-flow` gradient all carry the green hue. Re-tune both themes so green appears only as the *accent*, with neutral / complementary tones (warm charcoal, soft beige cream, near-neutral grays) carrying the bulk of the surface area — the same balance Bronze and Crimson already achieve.

## Approach (design reasoning)

Look at why Bronze works:
- Background is a **warm near-neutral charcoal** (chroma ~0.012) — reads as "dark", not "amber".
- Cards are a **warm off-white**, not amber-tinted.
- Cream (`--cream`) is a soft beige used for non-featured cards — a complementary neutral.
- The accent (burnt amber) appears only on text-primary, buttons, eyebrows, dot indicators, gradients.

Mint and Lime today break this by pushing chroma into background (0.025), foreground, secondary, muted-foreground, AND cream. So large painted regions (`bg-bronze-flow` hero/footer/achievements card, `bg-surface` sections) all wash green.

### Fix per theme

**Mint** — soft, calmer green pairing:
- Background → **warm charcoal with a whisper of green** (chroma ~0.008, hue 165) so the page reads dark-neutral, not emerald.
- Foreground / muted-foreground → **near-neutral warm off-white / gray** (chroma ~0.005).
- Cream → **soft warm beige** (hue ~80, low chroma) — complementary neutral that lets mint accents pop on non-featured cards (the Bento grid).
- Secondary → low-chroma charcoal.
- Primary / accent / ring → keep the bright mint (#8cf2a6 ≈ oklch(0.88 0.17 152)).
- `bg-bronze-flow` already tracks `--primary`, so reducing the background's green chroma automatically calms the gradient.

**Lime** — high-contrast techy pairing:
- Background → **near-pure neutral charcoal** (chroma ~0.005, hue 145) — like Crimson's black-and-white base. Lime accent then reads as electric.
- Foreground → **pure off-white** (chroma ~0).
- Cream → **cool light gray** (chroma ~0.005) — neutral complement; keeps non-featured cards from looking pastel-green.
- Secondary → near-black neutral.
- Muted-foreground → neutral gray.
- Primary / accent / ring → keep vivid lime (#5FED83 ≈ oklch(0.85 0.21 145)).

This mirrors how Crimson uses pure black + white + a single saturated red, but tuned for green.

## Technical changes

Single file: `src/styles.css` — rewrite the two existing `[data-theme="mint"]` and `[data-theme="lime"]` blocks. No component changes needed; `bg-bronze-flow`, `bg-cream`, `bg-surface` will all rebalance automatically.

### Mint (revised tokens)
```text
--background:        oklch(0.16 0.008 165)   # warm charcoal, barely green
--foreground:        oklch(0.96 0.005 140)   # near-neutral off-white
--surface / card:    oklch(0.965 0.006 90)   # warm off-white (complementary)
--surface-fg / card-fg: oklch(0.16 0.008 165)
--primary / accent / ring: oklch(0.88 0.17 152)   # mint stays bright
--primary-foreground: oklch(0.16 0.008 165)
--cream:             oklch(0.90 0.025 80)    # soft warm beige
--cream-foreground:  oklch(0.16 0.008 165)
--secondary:         oklch(0.22 0.01 165)    # low-chroma charcoal
--secondary-foreground: oklch(0.96 0.005 140)
--muted:             oklch(0.92 0.006 90)
--muted-foreground:  oklch(0.5 0.008 90)     # neutral gray, not green
--border / input:    oklch(0.86 0.008 90)
```

### Lime (revised tokens)
```text
--background:        oklch(0.14 0.005 145)   # near-neutral charcoal
--foreground:        oklch(0.97 0 0)         # pure off-white
--surface / card:    oklch(0.97 0.003 100)   # cool-neutral light
--surface-fg / card-fg: oklch(0.14 0.005 145)
--primary / accent / ring: oklch(0.85 0.21 145)   # lime stays vivid
--primary-foreground: oklch(0.13 0.005 145)
--cream:             oklch(0.92 0.004 100)   # cool light gray complement
--cream-foreground:  oklch(0.14 0.005 145)
--secondary:         oklch(0.20 0.005 145)
--secondary-foreground: oklch(0.97 0 0)
--muted:             oklch(0.92 0.003 100)
--muted-foreground:  oklch(0.5 0.005 145)    # neutral gray
--border / input:    oklch(0.86 0.004 100)
```

## What stays the same

- `THEMES` order, `THEME_META` swatches, bootstrap script, and theme toggle UI — no edits.
- All component code — no edits.
- Other themes (Bronze, Midnight, Forest, Plum, Crimson, Mono) — untouched.

## Verification

After applying, both themes should feel like Bronze/Crimson in structure: a near-neutral dark page with a single confident green accent, soft beige/gray cards as complements, and the `bg-bronze-flow` gradient reading as "dark with a hint of green" rather than solid green.
