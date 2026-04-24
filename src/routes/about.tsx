import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import lightbulb from "@/assets/lightbulb-sky.webp";
import seanGoh from "@/assets/team-sean-goh.png";
import nadzim from "@/assets/team-sean-morais.png";
import jonQuah from "@/assets/team-jon-quah.png";
import seanMorais from "@/assets/team-nadzim-zahari.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Strategy Engineering" },
      { name: "description", content: "Where engineering meets business. Built for impact." },
      { property: "og:title", content: "About — Strategy Engineering" },
      { property: "og:description", content: "Where engineering meets business." },
    ],
  }),
  component: About,
});

const team = [
  { name: "Sean Goh", role: "Senior Business Process Manager", edu: "MEng Electrical and Electronic Engineering", photo: seanGoh },
  { name: "Nadzim Zahari", role: "Senior Sustainability Manager", edu: "BSc Economics and Finance", photo: nadzim },
  { name: "Jon Quah", role: "Business Development Head", edu: "BSc Civil Engineering", photo: jonQuah },
  { name: "Sean Morais", role: "Lead Design Engineer", edu: "MEng Astronautics Engineering", photo: seanMorais },
];

function About() {
  return (
    <main>
      <PageHero title="Where Engineering Meets Business" backgroundImage={lightbulb} />

      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Our Mission</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for Impact</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground leading-relaxed text-lg">
              Our mission is simple: to unlock the full potential of businesses by providing innovative, practical, and sustainable solutions. We bring an engineering mindset—focused on precision, efficiency, and scalability—to every challenge we tackle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Why We're Different</p>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Engineering Solutions for Real-World Challenges</h3>
              <p className="text-muted-foreground leading-relaxed">
                We know that potential alone is not enough. It's about transforming ambition into measurable results. With a foundation in engineering and a deep understanding of business operations, we design solutions that are not only visionary but also actionable and impactful.
              </p>
            </div>
            <div>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Why Choose Us</p>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Built on Strong Foundations</h3>
              <p className="text-muted-foreground leading-relaxed">
                We're not just consultants; we're builders. With expertise in engineering, strategy, and innovation, we're uniquely equipped to tackle the toughest challenges and unlock the greatest opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background text-white py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">Our Team</h2>
          <div className="w-20 h-[3px] bg-primary mx-auto mb-16" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map((m) => (
              <div key={m.name} className="text-center">
                <img src={m.photo} alt={m.name} loading="lazy" className="w-36 h-36 rounded-full mx-auto mb-5 shadow-lg object-cover" />
                <h4 className="font-bold text-lg">{m.name}</h4>
                <p className="text-primary text-sm font-medium mt-1">{m.role}</p>
                <p className="text-white/60 text-xs italic mt-2">{m.edu}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
