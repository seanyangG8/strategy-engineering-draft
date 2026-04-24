import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { ArrowUpRight, Workflow, Cpu, Compass, Leaf } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero-seedling.png";
import { AchievementsCarousel } from "@/components/site/AchievementsCarousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Strategy Engineering — Your Ambition, Our Expertise" },
      { name: "description", content: "Process, automation, and AI engineering for ambitious operators. Measurable impact, engineered." },
      { property: "og:title", content: "Strategy Engineering" },
      { property: "og:description", content: "Process, automation, and AI engineering for ambitious operators." },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Index,
});

const services = [
  {
    icon: Cpu,
    number: "02",
    title: "Automation & AI",
    desc: "Custom automation, AI integrations, and analytics dashboards that turn raw data into compounding advantage.",
    featured: true,
  },
  {
    icon: Workflow,
    number: "01",
    title: "Process Improvement",
    desc: "Lean Six Sigma and Kaizen methodologies to remove bottlenecks, reduce waste, and unlock margin.",
  },
  {
    icon: Compass,
    number: "03",
    title: "Strategy & Transformation",
    desc: "Forward-thinking strategy paired with executable roadmaps that move the business forward.",
  },
  {
    icon: Leaf,
    number: "04",
    title: "Sustainability & Impact",
    desc: "ESG reporting, carbon roadmaps, and operating models that turn sustainability into advantage.",
  },
];

const trustedBy = ["FORTUNE 500 FMCG", "UK HOME & LIVING", "NATIONAL ENERGY", "F&B GROWTH", "GLOBAL LOGISTICS", "RETAIL LEADER"];

const stats = [
  { value: 12, suffix: "+", label: "Transformations delivered" },
  { value: 40, suffix: "M+", prefix: "$", label: "Operational savings" },
  { value: 98, suffix: "%", label: "Time saved on automated workflows" },
  { value: 4, suffix: "", label: "Industries served" },
];

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref} className="font-display text-5xl md:text-6xl font-medium text-white tracking-tight">
      {prefix}{val}{suffix}
    </span>
  );
}

function Index() {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center center" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />
        <Header />
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <p className="eyebrow text-primary mb-6 animate-fade-up">// UNLOCKING POTENTIAL</p>
          <h1 className="font-display text-[40px] sm:text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[0.95] tracking-tight animate-fade-up-delay-1">
            Your ambition.<br />
            <span className="italic font-light text-primary">Our expertise.</span>
          </h1>
          <p className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-white/70 leading-relaxed animate-fade-up-delay-2">
            Process, automation, and AI engineering for ambitious operators — built for measurable impact.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-up-delay-3">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-8 py-3.5 text-sm font-semibold text-primary-foreground tracking-wide transition-all hover:scale-[1.02]"
            >
              Explore our work
              <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white/80 hover:text-white transition-colors story-link"
            >
              Why we're different
            </Link>
          </div>
        </div>

        {/* Trusted-by marquee */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-background/40 backdrop-blur-sm py-5 overflow-hidden">
          <div className="flex items-center gap-3 max-w-7xl mx-auto px-6">
            <span className="eyebrow text-white/50 whitespace-nowrap shrink-0">Trusted by teams at</span>
            <div className="flex-1 overflow-hidden relative">
              <div className="flex gap-12 marquee whitespace-nowrap">
                {[...trustedBy, ...trustedBy].map((name, i) => (
                  <span key={i} className="font-mono text-xs tracking-[0.2em] text-white/40 hover:text-white/70 transition-colors">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-background border-y border-white/5 py-20 px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/50 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES — Bento */}
      <section className="bg-surface text-surface-foreground py-28 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="eyebrow text-primary-foreground/60 mb-3">// WHAT WE DO</p>
              <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight max-w-2xl">
                Engineering your <span className="italic font-light">success.</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Four disciplines, one engineering mindset — focused on precision, efficiency, and outcomes that compound.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.title}
                  to="/services"
                  className={`group relative rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                    s.featured
                      ? "sm:col-span-2 lg:col-span-2 lg:row-span-1 bg-background text-white border-white/10 hover:border-primary/50"
                      : "bg-white border-black/10 hover:border-black/40"
                  }`}
                >
                  <div className="flex items-start justify-between mb-12">
                    <span className={`font-mono text-xs tracking-widest ${s.featured ? "text-primary" : "text-black/40"}`}>
                      {s.number}
                    </span>
                    <Icon className={`size-6 ${s.featured ? "text-primary" : "text-black/70"}`} strokeWidth={1.5} />
                  </div>
                  <h3 className={`font-display text-2xl md:text-3xl font-medium mb-3 ${s.featured ? "text-white" : ""}`}>
                    {s.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-6 ${s.featured ? "text-white/70" : "text-muted-foreground"}`}>
                    {s.desc}
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-mono tracking-wider ${s.featured ? "text-primary" : "text-black/60"}`}>
                    LEARN MORE
                    <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="bg-background text-white py-28 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <p className="eyebrow text-primary mb-3">// PROOF</p>
            <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight mb-5">
              Outcomes, not <span className="italic font-light text-primary">opinions.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-white/65 leading-relaxed">
              A selection of past engagements where we unlocked latent potential. Client names omitted for privacy.
            </p>
          </div>
          <AchievementsCarousel />
          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 mt-12 rounded-full bg-primary hover:bg-primary/90 px-8 py-3.5 text-sm font-semibold text-primary-foreground tracking-wide transition-all hover:scale-[1.02] group"
            >
              See how we work
              <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
