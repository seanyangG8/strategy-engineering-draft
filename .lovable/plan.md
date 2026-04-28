# Calm down the Mint theme — green as accent, not as wallpaper

## The root cause

In `src/styles.css`, every theme uses the **same `.bg-primary-flow`** which mixes `--primary` into the background. For mint, `--primary` is a vivid `oklch(0.88 0.17 152)` (very saturated green), so anywhere we mark a surface as "featured" — the achievements carousel, the featured Services card on home, the executive highlight on About, the pull-quote in Services, and the entire Footer CTA — the surface becomes a glowing green panel. Combined with `text-primary` eyebrows, dots, dividers, hovers and 10+ decorative SVG strokes, the page reads as "all green."

Other themes (bronze/plum/forest) get away with it because their primaries are low-chroma. Mint and Lime are high-chroma and need a different treatment.

## What stays green (intentional accent)

- Eyebrows (`// LABEL`)
- Italic emphasis words in headlines
- Primary CTA buttons
- Active carousel dot, active service-rail dot, timeline dot
- Hover ring on links/cards
- One-off decorative bits (counter sparklines, etc.)

## What needs to change

### 1. Split the "flow" gradient into two tokens (`src/styles.css`)

Right now featured surfaces use `.bg-primary-flow`, which always mixes the active primary into the background. Replace with two utilities:

- `.bg-primary-flow` — keep current behaviour for themes where primary is low-chroma (bronze, plum, forest, crimson, mono, midnight).
- For high-chroma themes (mint, lime), override `.bg-primary-flow` so it uses a **neutral charcoal-on-charcoal gradient with only a *whisper* of primary** (≤ 8% mix instead of 20–45%). The featured surface then reads as deep neutral with a subtle green sheen — primary returns to being the typographic accent on top.

```css
[data-theme="mint"] .bg-primary-flow,
[data-theme="lime"] .bg-primary-flow {
  background:
    linear-gradient(135deg,
      color-mix(in oklab, var(--background) 94%, var(--primary) 6%) 0%,
      var(--background) 40%,
      color-mix(in oklab, var(--background) 88%, var(--primary) 12%) 100%);
  background-size: 200% 200%;
  animation: primary-flow 14s ease-in-out infinite;
}
```

This single change calms the Achievements carousel slide, the About executive-highlight card, the home "featured" Services card, the Services pull-quote tile, and the Footer CTA panel — all at once.

### 2. Achievements carousel container (`src/components/site/AchievementsCarousel.tsx`, ~line 985)

Currently: `border-primary/30 shadow-2xl shadow-primary/20` plus two `bg-primary/10` and `bg-primary/5` glow blobs and a `from-primary via-primary/60` divider.

- Border → `border-white/10` (keep the primary-tinted variant only for low-chroma themes via a CSS variable, or just drop it — neutral is fine).
- Shadow → `shadow-black/40` instead of `shadow-primary/20`.
- The two corner glow blobs → reduce to `bg-primary/5` and `bg-primary/[0.03]`. They're the main thing painting the card green right now.
- Divider line under the title → `from-white/30 to-transparent` (neutral); keep the small ticker line above (`from-primary/60`) so primary still shows as a hairline accent.

### 3. The visual SVG illustrations inside each slide

There are 4 inline visuals (chatbot, invoice 3-way match, email automation, omnichannel chat). Many of their fill/stroke colours are `var(--primary)` or `bg-primary/*`. Audit each one and:

- Keep ~1 primary-coloured element per visual as the focal point (e.g. the active match line, the AI sparkline, the sent-email badge).
- Re-skin the rest in `text-white/70`, `white/40`, `white/20`, dashed neutrals. The visuals will read as technical diagrams with a single green highlight rather than green-on-green.

### 4. Footer CTA panel (`src/components/site/Footer.tsx`, line 12)

Same `bg-primary-flow` panel — it inherits the fix from §1 automatically. No further change needed unless we want to additionally swap the inner button to a neutral outline style on mint (optional).

### 5. Home "Outcomes" featured Services card (`src/routes/index.tsx`, ~line 287)

Inherits §1. Additionally: the `text-primary` number/icon on this dark featured card stays green (good — that's the accent doing its job).

### 6. About executive-highlight card (`src/routes/about.tsx`, ~line 235)

Inherits §1. The `text-primary` eyebrow inside it remains the accent.

### 7. Services pull-quote tile (`src/routes/services.tsx`, ~line 303)

Inherits §1. Reduce the giant decorative quotation mark from `text-primary opacity-70` to `text-primary/50` so it doesn't dominate.

### 8. Mint primary itself — small chroma trim

Currently `--primary: oklch(0.88 0.17 152)`. Drop chroma slightly to `oklch(0.86 0.13 152)` so even where it *should* appear (eyebrows, buttons, dots) it reads as confident mint rather than neon. Keep contrast on cream surfaces verified.

### 9. Optional: secondary neutral accent for mint

Mint pairs well with warm sand / off-white. The `--cream` token (`oklch(0.90 0.025 80)`) already provides a complementary warm neutral on light surfaces. On dark surfaces, introduce a single warm-white tint variable (e.g. `--accent-warm: oklch(0.9 0.02 80)`) that visuals and dividers can reach for instead of always defaulting to primary. This is the "blend with other colours" the user asked for. Roll out only in places currently overusing primary on dark backgrounds (carousel divider, visual strokes).

## Out of scope

- Other themes (bronze / plum / etc.) — they look correct.
- Layout, copy, or structural changes — purely a colour-balance pass.

## Verification

After implementing, switch theme to **mint** and review:
- Home: hero, Services grid (featured tile), Outcomes carousel
- Services page: pull-quote tile, sticky rail
- About page: timeline, executive highlight card
- Footer CTA on every page

Then repeat on **lime** (same fix applies) and **bronze** (regression check — should look identical to before).
