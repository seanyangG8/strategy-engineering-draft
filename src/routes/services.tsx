import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Workflow, Cpu, Compass, Leaf, ArrowUpRight } from "lucide-react";
import heroServices from "@/assets/hero-services.webp";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { CountUpText } from "@/components/motion/CountUpText";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Strategy Engineering" },
      { name: "description", content: "Process improvement, automation & AI, strategy & transformation, sustainability & impact." },
      { property: "og:title", content: "Services — Strategy Engineering" },
      { property: "og:description", content: "Transforming businesses, one solution at a time." },
      { property: "og:image", content: heroServices },
      { name: "twitter:image", content: heroServices },
      { rel: "canonical", href: "https://strategyengineering.co/services" },
    ],
  }),
  component: Services,
});

const services = [
  {
    icon: Workflow,
    number: "01",
    slug: "process",
    title: "Process Improvement",
    tagline: "Optimise. Simplify. Excel.",
    intro: "We elevate your business operations to their full potential with proven methodologies — Lean Six Sigma, Kaizen, and continuous improvement techniques.",
    bullets: [
      { h: "Eliminate inefficiencies", b: "Identify bottlenecks and redundancies in your workflows." },
      { h: "Reduce waste", b: "Enhance environmental and operational sustainability." },
      { h: "Streamline workflows", b: "Increase productivity and customer satisfaction." },
      { h: "Cut costs", b: "Optimise resource allocation and minimise unnecessary expenditure." },
      { h: "Increase profitability", b: "Smarter, more efficient operations across the board." },
    ],
    outcomes: [
      { v: "↓ 38%", l: "Cycle time" },
      { v: "↑ 22%", l: "Throughput" },
      { v: "$4.2M", l: "Annual saving" },
    ],
    closing: "Hands-on, data-driven process improvement that delivers measurable, long-term value.",
  },
  {
    icon: Cpu,
    number: "02",
    slug: "automation",
    title: "Automation & AI",
    tagline: "Innovate smarter, not harder.",
    intro: "Stay ahead with comprehensive automation and AI services designed to improve efficiency, productivity, and innovation.",
    bullets: [
      { h: "Custom automation", b: "Optimise processes and eliminate manual tasks." },
      { h: "AI integrations", b: "LLMs and ML to enhance decisions and customer interactions." },
      { h: "Analytics dashboards", b: "Turn raw data into actionable, real-time insights." },
      { h: "Workflow orchestration", b: "Connect disparate tools into seamless pipelines." },
      { h: "Continuous optimisation", b: "Machine learning feedback loops that compound." },
    ],
    outcomes: [
      { v: "98%", l: "Manual hours removed" },
      { v: "5 wks", l: "To first live workflow" },
      { v: "4×", l: "ROI in year one" },
    ],
    closing: "We help you adopt the right technology — not just the newest — so every investment compounds.",
  },
  {
    icon: Compass,
    number: "03",
    slug: "strategy",
    title: "Strategy & Transformation",
    tagline: "Vision into action.",
    intro: "We partner with leadership to translate ambition into clear, executable roadmaps that move the business forward.",
    bullets: [
      { h: "Market positioning", b: "Competitive analysis grounded in real data." },
      { h: "Operating model", b: "Redesign aligned to long-term strategy." },
      { h: "Change management", b: "Programs that bring teams along for the journey." },
      { h: "M&A integration", b: "Post-merger value capture and synergy realisation." },
      { h: "KPI frameworks", b: "Make progress measurable and accountable." },
    ],
    outcomes: [
      { v: "12+", l: "Transformations led" },
      { v: "↑ 31%", l: "Margin uplift" },
      { v: "100%", l: "On-time delivery" },
    ],
    closing: "Strategy that lives in slide decks fails. We make sure yours lives in execution.",
  },
  {
    icon: Leaf,
    number: "04",
    slug: "sustainability",
    title: "Sustainability & Impact",
    tagline: "Profit with purpose.",
    intro: "We help organisations turn sustainability from a compliance cost into a strategic advantage.",
    bullets: [
      { h: "ESG reporting", b: "Aligned to GRI, SASB, and TCFD frameworks." },
      { h: "Carbon roadmaps", b: "Measurement and reduction pathways to net zero." },
      { h: "Circular operating models", b: "Waste reduction designed into the business." },
      { h: "Sustainable supply chain", b: "Audits and supplier engagement programs." },
      { h: "Stakeholder communication", b: "Strategies that build trust and brand equity." },
    ],
    outcomes: [
      { v: "↓ 42%", l: "CO₂e baseline" },
      { v: "A-rated", l: "MSCI ESG score" },
      { v: "3 yrs", l: "To net-zero pilot" },
    ],
    closing: "Sustainability done well is good business. We help you prove it.",
  },
];

function StickyServiceNav() {
  const [active, setActive] = useState(services[0].number);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const num = (e.target as HTMLElement).dataset.num;
            if (num) setActive(num);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    services.forEach((s) => {
      const el = document.getElementById(`service-${s.number}`);
      if (el) obs.observe(el);
    });

    const onScroll = () => {
      const first = document.getElementById(`service-${services[0].number}`);
      const last = document.getElementById(`service-${services[services.length - 1].number}`);
      if (!first || !last) return;
      const startY = first.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.4;
      const endY = last.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.4;
      const cur = window.scrollY;
      const p = Math.max(0, Math.min(1, (cur - startY) / Math.max(1, endY - startY)));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* Desktop: vertical sticky on left */}
      <aside className="hidden lg:block sticky top-28 h-fit">
        <p className="eyebrow text-cream-foreground/55 mb-5">// SERVICES</p>
        <div className="relative pl-5">
          {/* Rail */}
          <div className="absolute left-0 top-1 bottom-1 w-px bg-cream-foreground/10" aria-hidden />
          <div
            className="absolute left-0 top-1 w-px bg-primary origin-top"
            aria-hidden
            style={{ height: "calc(100% - 0.5rem)", transform: `scaleY(${progress})`, transition: "transform 0.15s linear" }}
          />
          <ul className="space-y-3">
            {services.map((s) => {
              const isActive = active === s.number;
              return (
                <li key={s.number}>
                  <a
                    href={`#service-${s.number}`}
                    className={`flex items-center gap-3 group transition-colors ${
                      isActive ? "text-cream-foreground" : "text-cream-foreground/55 hover:text-cream-foreground/85"
                    }`}
                  >
                    <span
                      className={`h-px transition-all duration-500 ${
                        isActive ? "w-8 bg-primary" : "w-3 bg-cream-foreground/25 group-hover:w-6"
                      }`}
                    />
                    <span className="font-mono text-[11px] tracking-[0.2em] uppercase">
                      {s.number} · {s.title}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Mobile/tablet: sticky top bar with progress */}
      <div className="lg:hidden sticky top-[68px] z-30 -mx-6 px-6 pt-3 pb-2 bg-surface/95 backdrop-blur-md border-y border-cream-foreground/10 mb-10">
        <div className="flex gap-5 overflow-x-auto no-scrollbar font-mono text-[11px] tracking-wider mb-2">
          {services.map((s) => (
            <a
              key={s.number}
              href={`#service-${s.number}`}
              className={`whitespace-nowrap transition-colors ${
                active === s.number ? "text-primary" : "text-cream-foreground/65"
              }`}
            >
              {s.number} · {s.title}
            </a>
          ))}
        </div>
        <div className="h-px bg-cream-foreground/10 relative">
          <div
            className="absolute inset-y-0 left-0 bg-primary origin-left"
            style={{ width: "100%", transform: `scaleX(${progress})`, transition: "transform 0.15s linear" }}
          />
        </div>
      </div>
    </>
  );
}

function Services() {
  return (
    <main>
      <PageHero eyebrow="TRANSFORMING BUSINESSES, ONE SOLUTION AT A TIME" title="Services" backgroundImage={heroServices} objectPosition="center 100%" compact />

      <section className="bg-surface text-surface-foreground py-24 px-6 relative">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[220px_1fr] gap-16">
          <StickyServiceNav />

          <div className="space-y-32 lg:space-y-40">
            {services.map((s, i) => {
              const Icon = s.icon;
              const reverse = i % 2 === 1;
              return (
                <article
                  key={s.title}
                  id={`service-${s.number}`}
                  data-num={s.number}
                  className="scroll-mt-32 relative"
                >
                  {/* Oversized backdrop number */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -top-12 ${
                      reverse ? "right-0" : "left-0"
                    } font-display text-[180px] md:text-[260px] font-light leading-none text-cream-foreground/[0.05] select-none`}
                  >
                    {s.number}
                  </div>

                  <div className={`relative grid md:grid-cols-12 gap-10 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
                    {/* Header column */}
                    <Reveal className="md:col-span-5">
                      <div className="w-14 h-14 rounded-2xl border border-cream-foreground/10 flex items-center justify-center bg-background text-primary mb-6">
                        <Icon className="size-6" strokeWidth={1.5} />
                      </div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-3">
                        {s.number} · {s.tagline}
                      </p>
                      <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-6">{s.title}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-8">{s.intro}</p>

                      <div className="grid grid-cols-3 gap-px bg-cream-foreground/10 rounded-xl overflow-hidden border border-cream-foreground/10">
                        {s.outcomes.map((o) => (
                          <div key={o.l} className="bg-surface p-4 text-center">
                            <p className="font-display text-2xl md:text-3xl font-medium text-primary tracking-tight">
                              <CountUpText value={o.v} />
                            </p>
                            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream-foreground/60 mt-1.5">{o.l}</p>
                          </div>
                        ))}
                      </div>
                    </Reveal>

                    {/* Bullets column */}
                    <Reveal delay={120} className="md:col-span-7">
                      <ul className="grid sm:grid-cols-2 gap-px bg-cream-foreground/10 rounded-2xl overflow-hidden border border-cream-foreground/10">
                        {s.bullets.map((b, idx) => (
                          <li key={b.h} className="bg-surface p-6 hover:bg-background hover:text-white transition-colors group">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-mono text-[10px] tracking-[0.22em] text-primary">
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <span className="h-px flex-1 bg-current opacity-10 group-hover:opacity-30 transition-opacity" />
                            </div>
                            <h4 className="font-display text-lg font-medium mb-1.5 tracking-tight">{b.h}</h4>
                            <p className="text-sm leading-relaxed opacity-70">{b.b}</p>
                          </li>
                        ))}
                        <li className="bg-bronze-flow text-white p-6 relative overflow-hidden">
                          <div className="absolute inset-0 opacity-[0.06] bg-grain pointer-events-none" />
                          <p className="relative font-display text-lg md:text-xl font-light italic leading-snug">
                            {s.closing}
                          </p>
                        </li>
                      </ul>
                    </Reveal>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background text-white py-24 px-6 border-t border-white/5">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow text-primary mb-4">// NEXT STEP</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Have a challenge worth <span className="italic font-light text-primary">engineering?</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-9 leading-relaxed">
              30-minute discovery call, no obligation. We'll listen, ask sharp questions, and tell you whether we're the right fit.
            </p>
            <MagneticButton
              to="/contact"
              className="group items-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-8 py-3.5 text-sm font-semibold text-primary-foreground tracking-wide"
            >
              Start a conversation
              <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
