import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import erpImg from "@/assets/service-ai.jpg";
import esgImg from "@/assets/sustainability-bulb.png";

const BLUE = "#1e9eff";
const BLUE_PALETTE = ["#67e8f9", "#22d3ee", "#0ea5e9", "#0369a1", "#1e3a8a"];

const areaData = [
  { name: "Phase 1", v: 30 },
  { name: "Phase 2", v: 40 },
  { name: "Phase 3", v: 65 },
  { name: "Phase 4", v: 98 },
];

const pieData = [
  { name: "Product 1", value: 6.9 },
  { name: "Product 2", value: 20.7 },
  { name: "Product 3", value: 13.8 },
  { name: "Product 4", value: 27.6 },
  { name: "Product 5", value: 31 },
];

const barData = [
  { name: "FY23", v: 295 },
  { name: "M1", v: 315 },
  { name: "M2", v: 345 },
  { name: "M3", v: 385 },
  { name: "M4", v: 370 },
  { name: "M5", v: 372 },
];

type Slide = {
  title: string;
  headline: string;
  body: string;
  timeline: string;
  visual: React.ReactNode;
};

const slides: Slide[] = [
  {
    title: "Listed FMCG Market Leader",
    headline: "Time Saved by 98.2%",
    body: "Developed a regional automation solution streamlining six hours of daily work into several minutes whilst employing Lean principles and practices.",
    timeline: "Project Timeline: 3 Months",
    visual: (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={areaData} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={BLUE} stopOpacity={0.95} />
              <stop offset="100%" stopColor={BLUE} stopOpacity={0.15} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#ffffff10" vertical={false} />
          <XAxis dataKey="name" stroke="#ffffff70" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis stroke="#ffffff70" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
          <Area type="monotone" dataKey="v" stroke={BLUE} strokeWidth={2.5} fill="url(#areaFill)" />
        </AreaChart>
      </ResponsiveContainer>
    ),
  },
  {
    title: "Fortune 500 MNC",
    headline: "Savings of 500,000 USD",
    body: "Developed a sourcing strategy built on robust analysis and a bespoke calculation methodology.",
    timeline: "Project Timeline: 2 Months",
    visual: (
      <div className="relative w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              innerRadius="55%"
              outerRadius="88%"
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              label={({ name, value }) => `${name} · ${value}%`}
              labelLine={false}
              style={{ fontSize: 11, fill: "#fff" }}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={BLUE_PALETTE[i]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] uppercase tracking-widest text-white/60">Total</span>
          <span className="text-2xl font-light text-white">100%</span>
        </div>
      </div>
    ),
  },
  {
    title: "UK Home & Living Company",
    headline: "Software Development",
    body: "Developed an ERP from scratch, overhauling the resource planning system, leading to cost and time savings.",
    timeline: "Project Timeline: 5 Months",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-4 bg-[#1e9eff]/20 blur-3xl rounded-full" />
        <img src={erpImg} alt="ERP system" className="relative max-h-full max-w-full object-contain rounded-xl ring-1 ring-white/10" />
      </div>
    ),
  },
  {
    title: "National Energy Company",
    headline: "Net Positive Carbon Rating",
    body: "Brought a national company with no prior ESG knowledge to a net positive carbon rating.",
    timeline: "Project Timeline: 5 Months",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-4 bg-[#1e9eff]/20 blur-3xl rounded-full" />
        <img src={esgImg} alt="ESG sustainability" className="relative max-h-full max-w-full object-contain rounded-xl" />
      </div>
    ),
  },
  {
    title: "F&B Startup",
    headline: "Sales Growth of 30%",
    body: "Developed and implemented a new route to market strategy alongside a data-driven sales plan leading to 30% sales growth.",
    timeline: "Project Timeline: 3 Months",
    visual: (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData} margin={{ top: 24, right: 16, left: -8, bottom: 8 }}>
          <defs>
            <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor={BLUE} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#ffffff10" vertical={false} />
          <XAxis dataKey="name" stroke="#ffffff70" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis stroke="#ffffff70" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[260, 410]} />
          <Bar dataKey="v" fill="url(#barFill)" radius={[6, 6, 0, 0]} maxBarSize={42}>
            <LabelList dataKey="v" position="top" fill="#ffffffcc" fontSize={10} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    ),
  },
];

export function AchievementsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused) return;
    const id = setInterval(() => {
      api.scrollNext();
    }, 6500);
    return () => clearInterval(id);
  }, [api, paused]);

  return (
    <div
      className="mx-auto max-w-5xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="w-full">
        <CarouselContent>
          {slides.map((s, i) => (
            <CarouselItem key={i}>
              <div className="group relative rounded-3xl bg-gradient-to-br from-[#1a1d24] via-[#13151b] to-[#0a0b0f] border border-[#1e9eff]/30 p-6 md:p-12 shadow-[0_30px_80px_-20px_rgba(30,158,255,0.25)] overflow-hidden">
                {/* Glow */}
                <div className="pointer-events-none absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#1e9eff]/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#1e9eff]/5 blur-3xl" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#1e9eff] font-semibold">
                      Case Study {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-[#1e9eff]/60 to-transparent" />
                  </div>
                  <h3 className="text-2xl md:text-4xl font-light text-white tracking-tight">
                    {s.title}
                  </h3>
                  <div className="h-[2px] w-full bg-gradient-to-r from-[#1e9eff] via-[#1e9eff]/60 to-transparent mt-4 mb-8" />

                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[320px]">
                    <div className="h-[260px] md:h-[340px]">{s.visual}</div>
                    <div className="text-left">
                      <h4 className="text-2xl md:text-3xl font-light text-white leading-tight mb-5">
                        {s.headline}
                      </h4>
                      <p className="text-white/80 text-base md:text-lg leading-relaxed font-light">
                        {s.body}
                      </p>
                    </div>
                  </div>

                  <p className="text-right italic text-white/60 text-sm mt-8">
                    {s.timeline}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={() => api?.scrollPrev()}
          aria-label="Previous"
          className="h-10 w-10 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-[#1e9eff] hover:bg-[#1e9eff]/10 transition-all flex items-center justify-center"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                current === i ? "w-8 bg-[#1e9eff]" : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => api?.scrollNext()}
          aria-label="Next"
          className="h-10 w-10 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-[#1e9eff] hover:bg-[#1e9eff]/10 transition-all flex items-center justify-center"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
