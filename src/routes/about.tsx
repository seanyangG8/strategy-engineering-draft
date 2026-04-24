import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import lightbulb from "@/assets/lightbulb-sky.webp";
import seanGoh from "@/assets/team-sean-goh.png";
import nadzim from "@/assets/team-nadzim-zahari.png";
import jonQuah from "@/assets/team-jon-quah.png";
import seanMorais from "@/assets/team-sean-morais.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Strategy Engineering" },
      { name: "description", content: "Where engineering meets business. Built for impact." },
      { property: "og:title", content: "About — Strategy Engineering" },
      { property: "og:description", content: "Where engineering meets business." },
      { property: "og:image", content: lightbulb },
      { name: "twitter:image", content: lightbulb },
    ],
  }),
  component: About,
});

const team = [
  { name: "Sean Goh", role: "Senior Business Process Manager", edu: "MEng Electrical & Electronic Engineering", photo: seanGoh },
  { name: "Nadzim Zahari", role: "Senior Sustainability Manager", edu: "BSc Economics & Finance", photo: nadzim },
  { name: "Jon Quah", role: "Business Development Head", edu: "BSc Civil Engineering", photo: jonQuah },
  { name: "Sean Morais", role: "Lead Design Engineer", edu: "MEng Astronautics Engineering", photo: seanMorais },
];

function About() {
  return (
    <main>
      <PageHero title="Where engineering meets business." backgroundImage={lightbulb} compact objectPosition="center 65%" />

      <section className="bg-surface text-surface-foreground py-28 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-12 gap-12 mb-24">
            <div className="md:col-span-4">
              <p className="eyebrow text-primary-foreground/60 mb-3">// OUR MISSION</p>
              <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight">Built for impact.</h2>
            </div>
            <div className="md:col-span-8">
              <p className="font-display text-2xl md:text-3xl font-light leading-snug tracking-tight mb-6">
                "We unlock the full potential of businesses with practical, sustainable, engineered solutions."
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We bring an engineering mindset — focused on precision, efficiency, and scalability — to every challenge we tackle. Potential alone isn't enough. It's about transforming ambition into measurable results.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 border-t border-black/10 pt-16">
            <div>
              <p className="eyebrow text-primary-foreground/60 mb-3">// WHY WE'RE DIFFERENT</p>
              <h3 className="font-display text-2xl md:text-3xl font-medium mb-4 tracking-tight">Engineering solutions for real-world challenges</h3>
              <p className="text-muted-foreground leading-relaxed">
                With a foundation in engineering and a deep understanding of business operations, we design solutions that are visionary, actionable, and impactful — not just slide-deck strategy.
              </p>
            </div>
            <div>
              <p className="eyebrow text-primary-foreground/60 mb-3">// WHY CHOOSE US</p>
              <h3 className="font-display text-2xl md:text-3xl font-medium mb-4 tracking-tight">Built on strong foundations</h3>
              <p className="text-muted-foreground leading-relaxed">
                We're not just consultants — we're builders. With expertise in engineering, strategy, and innovation, we're uniquely equipped to tackle the toughest challenges and unlock the greatest opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background text-white py-28 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="eyebrow text-primary mb-3">// THE TEAM</p>
              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight">
                People who <span className="italic font-light text-primary">build.</span>
              </h2>
            </div>
            <p className="text-white/60 max-w-md leading-relaxed">
              Engineers and operators with a track record of turning ambition into measurable advantage.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <div key={m.name} className="group">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white/5 mb-5">
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <h4 className="font-display text-xl font-medium">{m.name}</h4>
                <p className="text-primary text-sm mt-1">{m.role}</p>
                <p className="text-white/40 text-xs mt-1.5 font-mono">{m.edu}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
