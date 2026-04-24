import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import heroImg from "@/assets/hero-seedling.png";
import iconProcess from "@/assets/service-process.jpg";
import iconAi from "@/assets/service-ai.jpg";
import iconStrategy from "@/assets/service-strategy.jpg";
import iconSustain from "@/assets/sustainability-bulb.png";
import { AchievementsCarousel } from "@/components/site/AchievementsCarousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Strategy Engineering — Your Ambition, Our Expertise" },
      { name: "description", content: "Unlocking potential through process improvement, automation & AI, strategy, and sustainability." },
      { property: "og:title", content: "Strategy Engineering" },
      { property: "og:description", content: "Your Ambition. Our Expertise." },
    ],
  }),
  component: Index,
});

const services = [
  { icon: iconProcess, title: "Process Improvement", desc: "Streamline workflows and implement continuous improvement to eliminate inefficiencies and reduce costs, ensuring optimal performance" },
  { icon: iconAi, title: "Automation & AI Solutions", desc: "Harness technology, automate repetitive tasks and deliver smarter, data-driven insights for strategic decision-making" },
  { icon: iconStrategy, title: "Strategy & Transformation", desc: "Develop forward-thinking strategies and drive transformative change to help your business adapt and thrive" },
  { icon: iconSustain, title: "Sustainability & Impact", desc: "Help organisations embrace sustainability through eco-friendly operations, detailed reporting, and strategies for profitability and brand growth" },
];

function Index() {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-[99%] object-cover" style={{ objectPosition: "center 80%" }} />
        <div className="absolute inset-0 bg-[oklch(0.25_0.02_240)]/65" />
        <Header />
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <p className="text-white text-base md:text-lg font-medium mb-3">Unlocking Potential</p>
          <div className="w-20 h-[3px] bg-primary mx-auto mb-8" />
          <h1 className="text-4xl md:text-7xl font-extrabold text-white uppercase leading-tight tracking-tight">
            Your Ambition<br />Our Expertise
          </h1>
          <Link
            to="/about"
            className="inline-flex items-center justify-center mt-10 rounded-full bg-primary hover:bg-primary/90 px-10 py-4 text-sm font-bold text-primary-foreground uppercase tracking-wider transition-all hover:scale-105"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">Engineering Your Success</h2>
          <div className="w-20 h-[3px] bg-primary mx-auto mb-16" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {services.map((s) => (
              <div key={s.title} className="text-center flex flex-col items-center">
                <img src={s.icon} alt={s.title} loading="lazy" className="w-40 h-40 rounded-full object-cover mb-6 shadow-lg" />
                <h3 className="text-base font-bold uppercase tracking-wide mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
                <Link to="/services" className="text-primary text-xs font-bold uppercase tracking-wider hover:underline">Learn More →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="bg-background text-white py-24 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Achievements</h2>
          <div className="w-20 h-[3px] bg-primary mx-auto mb-8" />
          <p className="max-w-3xl mx-auto text-white/80 leading-relaxed mb-12">
            Some examples of our past achievements in successfully unlocking the untapped potential latent in all organisations. Names of our clients have been omitted for privacy
          </p>
          <AchievementsCarousel />
          <Link
            to="/services"
            className="inline-flex items-center justify-center mt-12 rounded-full bg-primary hover:bg-primary/90 px-10 py-4 text-sm font-bold text-primary-foreground uppercase tracking-wider"
          >
            Learn More
          </Link>
        </div>
      </section>
    </main>
  );
}
