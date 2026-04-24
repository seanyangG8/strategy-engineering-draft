import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import iconProcess from "@/assets/service-process.jpg";
import iconAi from "@/assets/service-ai.jpg";
import iconStrategy from "@/assets/service-strategy.jpg";
import iconSustain from "@/assets/sustainability-bulb.png";
import heroServices from "@/assets/hero-services.webp";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Strategy Engineering" },
      { name: "description", content: "Process improvement, automation & AI, strategy & transformation, sustainability & impact." },
      { property: "og:title", content: "Services — Strategy Engineering" },
      { property: "og:description", content: "Transforming Businesses, One Solution at a Time." },
    ],
  }),
  component: Services,
});

const services = [
  {
    icon: iconProcess,
    title: "Process Improvement",
    tagline: "Optimise, Simplify, Excel.",
    intro: "We focus on elevating your business operations to their full potential with proven methodologies like Lean Six Sigma, Kaizen, and other continuous improvement techniques. Our approach ensures:",
    bullets: [
      "Elimination of inefficiencies by identifying bottlenecks and redundancies in your workflows.",
      "Waste reduction to enhance environmental and operational sustainability.",
      "Streamlined workflows that increase productivity and enhance customer satisfaction.",
      "Cost savings by optimising resource allocation and minimising unnecessary expenditures.",
      "Increased profitability through smarter, more efficient operations.",
    ],
    closing: "Our hands-on, data-driven process improvement solutions deliver measurable outcomes that create long-term value.",
  },
  {
    icon: iconAi,
    title: "Automation & AI Solutions",
    tagline: "Innovate Smarter, Not Harder.",
    intro: "Stay ahead of the curve with our comprehensive automation and AI services designed to improve efficiency, productivity, and innovation:",
    bullets: [
      "Custom automation development to optimise processes and eliminate manual tasks.",
      "AI integrations like ChatGPT to enhance decision-making and customer interactions.",
      "Data analytics dashboards that turn raw data into actionable insights.",
      "Workflow orchestration to connect disparate tools into seamless pipelines.",
      "Continuous optimisation through machine learning feedback loops.",
    ],
    closing: "We help you adopt the right technology — not just the newest — so every investment compounds.",
  },
  {
    icon: iconStrategy,
    title: "Strategy & Transformation",
    tagline: "Vision Into Action.",
    intro: "We partner with leadership to translate ambition into clear, executable roadmaps that move the business forward:",
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
    icon: iconSustain,
    title: "Sustainability & Impact",
    tagline: "Profit With Purpose.",
    intro: "We help organisations turn sustainability from a compliance cost into a strategic advantage:",
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
      <PageHero eyebrow="Transforming Businesses, One Solution at a Time" title="Services" backgroundImage={heroServices} objectPosition="center 100%" compact />

      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="mx-auto max-w-5xl space-y-24">
          {services.map((s, i) => (
            <article key={s.title} className={`grid md:grid-cols-[240px_1fr] gap-10 items-start ${i % 2 === 1 ? "md:[&>img]:order-last" : ""}`}>
              <img src={s.icon} alt={s.title} loading="lazy" className="w-48 h-48 md:w-60 md:h-60 rounded-full mx-auto shadow-xl object-cover" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-1">{s.title}</h2>
                <p className="text-primary font-semibold mb-5">{s.tagline}</p>
                <p className="text-muted-foreground leading-relaxed mb-5">{s.intro}</p>
                <ul className="space-y-2 mb-5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-muted-foreground leading-relaxed">
                      <span className="text-primary font-bold mt-1">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-surface-foreground font-medium leading-relaxed">{s.closing}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
