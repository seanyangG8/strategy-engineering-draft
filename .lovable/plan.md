## Add 4 new AI case studies to the Achievements Carousel

Extend `src/components/site/AchievementsCarousel.tsx` with four new slides, each paired with a bespoke animated SVG visual built in the same style as the existing `ErpDiagram`, `EsgDiagram`, `GrowthArea`, and `GrowthBars` components — theme-aware (uses `var(--primary)`), play-on-active, no extra deps.

### The 4 new case studies

1. **Agentic AI Sales Assistant** — *"30 hours saved monthly"*
   - Body: Agentic chatbot that answers salesperson queries about internal product details, pricing, specs, and stock — replacing manual lookups across siloed systems with instant, sourced responses.
   - Visual: **ChatAgentDiagram** — A central AI node pulsing, with three "knowledge source" pills (Product DB, Pricing, Specs) flowing animated dots into it, and an outgoing chat bubble that types out a response on activation.

2. **AI Invoice 3-Way Matching** — *"50 hours saved monthly"*
   - Body: AI-driven PDF parser that automatically reconciles invoices against POs and goods-received notes, flags exceptions, and auto-approves clean matches.
   - Visual: **InvoiceMatchDiagram** — Three stacked document cards (Invoice / PO / GRN) animate inward and snap together; a check-mark seal stamps in with a satisfying spring; small "matched line items" tick down a counter.

3. **AI Email Automation** — *"30 hours saved monthly"*
   - Body: An LLM-powered triage and reply engine that classifies inbound mail, drafts contextual responses, and routes edge cases to humans — clearing the inbox while you sleep.
   - Visual: **EmailFlowDiagram** — A stack of envelope icons funnel into a sorting prism that splits them into 3 lanes (Auto-reply / Route / Escalate), each lane filling its bar in sequence.

4. **Omnichannel Chat Management Platform** — *"Unified customer outreach"*
   - Body: Built a unified inbox consolidating WhatsApp, Instagram, Messenger, Email, and SMS into a single agent workspace — with shared context, SLA tracking, and AI-suggested replies.
   - Visual: **OmnichannelDiagram** — Five channel icons (WhatsApp/IG/Messenger/Email/SMS) on the left send animated message dots converging into a single central "Unified Inbox" node, which then radiates outward as one consolidated stream.

### Implementation details

- All four new visual components added inline above the `slides` array in `AchievementsCarousel.tsx`, following the existing `({ play }: { play: boolean })` signature and pure-SVG approach.
- Use `PRIMARY` (`var(--primary)`) and `PRIMARY_PALETTE` constants already defined in the file for theme consistency (works across all 6 themes including the new mint/lime).
- Use staggered transitions identical in style to existing diagrams (cubic-bezier(0.22,1,0.36,1), 200–1600ms windows, dashoffset/opacity/transform animations).
- Append the four new slide objects to the `slides` array (so they appear after the existing five), each with `title`, `headline`, `body`, `timeline`, and `visual`.
- The carousel auto-rotation, dots, prev/next, and animation re-trigger logic already handles N slides — no other changes required.
- Section heading on the home page ("Outcomes, not opinions.") and copy already fits — no edits to `index.tsx`.

### Files changed
- `src/components/site/AchievementsCarousel.tsx` — add 4 SVG visual components + 4 slide entries.
