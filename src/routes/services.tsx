import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Workflow, Cpu, Compass, Leaf, ChevronRight } from "lucide-react";
import heroServices from "@/assets/hero-services.webp";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Strategy Engineering" },
      { name: "description", content: "Process improvement, automation & AI, strategy & transformation, sustainability & impact." },
      { property: "og:title", content: "Services — Strategy Engineering" },
      { property: "og:description", content: "Transforming businesses, one solution at a time." },
      { property: "og:image", content: heroServices },
      { name: "twitter:image", content: heroServices },
    ],
  }),
  component: Services,
});

const services = [
  {
    icon: Workflow,
    number: "01",
    title: "Process Improvement",
    tagline: "Optimise. Simplify. Excel.",
    intro: "We elevate your business operations to their full potential with proven methodologies — Lean Six Sigma, Kaizen, and continuous improvement techniques.",
    bullets: [
      "Eliminate inefficiencies by identifying bottlenecks and redundancies in your workflows.",
      "Reduce waste to enhance environmental and operational sustainability.",
      "Streamline workflows that increase productivity and customer satisfaction.",
      "Cut costs by optimising resource allocation and minimising unnecessary expenditure.",
      "Increase profitability through smarter, more efficient operations.",
    ],
    closing: "Hands-on, data-driven process improvement that delivers measurable, long-term value.",
  },
  {
    icon: Cpu,
    number: "02",
    title: "Automation & AI",
    tagline: "Innovate smarter, not harder.",
    intro: "Stay ahead with comprehensive automation and AI services designed to improve efficiency, productivity, and innovation.",
    bullets: [
      "Custom automation development to optimise processes and eliminate manual tasks.",
      "AI integrations like ChatGPT to enhance decision-making and customer interactions.",
      "Data analytics dashboards that turn raw data into actionable insights.",
      "Workflow orchestration that connects disparate tools into seamless pipelines.",
      "Continuous optimisation through machine learning feedback loops.",
    ],
    closing: "We help you adopt the right technology — not just the newest — so every investment compounds.",
  },
  {
    icon: Compass,
    number: "03",
    title: "Strategy & Transformation",
    tagline: "Vision into action.",
    intro: "We partner with leadership to translate ambition into clear, executable roadmaps that move the business forward.",
    bullets: [
      "Market positioning and competitive analysis grounded in real data.",
      "Operating model redesign aligned to long-term strategy.",
      "Change management programs that bring teams along for the journey.",
      "M&A integration and post-merger value capture.",
      "KPI frameworks that make progress measurable and accountable.",
    ],
    closing: "Strategy that lives in slide decks fails. We make sure yours lives in execution.",
  },
  {
    icon: Leaf,
    number: "04",
    title: "Sustainability & Impact",
    tagline: "Profit with purpose.",
    intro: "We help organisations turn sustainability from a compliance cost into a strategic advantage.",
    bullets: [
      "ESG reporting aligned to GRI, SASB, and TCFD frameworks.",
      "Carbon footprint measurement and reduction roadmaps.",
      "Circular economy and waste-reduction operating models.",
      "Sustainable supply chain audits and supplier engagement.",
      "Brand and stakeholder communication strategies that build trust.",
    ],
    closing: "Sustainability done well is good business. We help you prove it.",
  },
];

function Services() {
  return (
    <main>
      <PageHero eyebrow="TRANSFORMING BUSINESSES, ONE SOLUTION AT A TIME" title="Services" backgroundImage={heroServices} objectPosition="center 100%" compact />

      <section className="bg-surface text-surface-foreground py-28 px-6">
        <div className="mx-auto max-w-5xl">
          {/* Anchor nav */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-20 pb-6 border-b border-black/10 font-mono text-xs tracking-wider text-black/60">
            {services.map((s) => (
              <a key={s.number} href={`#service-${s.number}`} className="hover:text-primary-foreground transition-colors story-link">
                {s.number} · {s.title}
              </a>
            ))}
          </div>

          <div className="space-y-28">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.title}
                  id={`service-${s.number}`}
                  className="grid md:grid-cols-[180px_1fr] gap-10 scroll-mt-24"
                >
                  <div className="flex md:flex-col items-center md:items-start gap-4">
                    <span className="font-display text-7xl md:text-8xl font-light text-primary-foreground/15 leading-none">
                      {s.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl border border-black/10 flex items-center justify-center bg-background text-primary">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl font-medium mb-2 tracking-tight">{s.title}</h2>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/70 mb-6">{s.tagline}</p>
                    <p className="text-muted-foreground leading-relaxed mb-6">{s.intro}</p>
                    <ul className="space-y-3 mb-7">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-muted-foreground leading-relaxed">
                          <ChevronRight className="size-4 text-primary mt-1 shrink-0" strokeWidth={2.5} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="font-display text-lg md:text-xl font-light leading-snug border-l-2 border-primary pl-5 text-surface-foreground">
                      {s.closing}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
