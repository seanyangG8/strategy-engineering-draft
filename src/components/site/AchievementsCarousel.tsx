import { useEffect, useState } from "react";
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
} from "recharts";
import erpImg from "@/assets/service-ai.jpg";
import esgImg from "@/assets/sustainability-bulb.png";

const BLUE = "#1e9eff";
const BLUE_PALETTE = ["#5eead4", "#22d3ee", "#0ea5e9", "#0369a1", "#1e40af"];

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
  { name: "Month 1", v: 315 },
  { name: "Month 2", v: 345 },
  { name: "Month 3", v: 385 },
  { name: "Month 4", v: 370 },
  { name: "Month 5", v: 372 },
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
    body: "Developed a regional automation solution streamlining six hours of daily work into several minutes whilst employing Lean principles and practices",
    timeline: "Project Timeline: 3 Months",
    visual: (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid stroke="#ffffff15" vertical={false} />
          <XAxis dataKey="name" stroke="#ffffff80" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis stroke="#ffffff80" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
          <Area type="monotone" dataKey="v" stroke={BLUE} fill={BLUE} fillOpacity={0.95} strokeWidth={0} />
        </AreaChart>
      </ResponsiveContainer>
    ),
  },
  {
    title: "Fortune 500 MNC",
    headline: "Savings of 500,000 USD",
    body: "Developed a sourcing strategy built on robust analysis and a bespoke calculation methodology",
    timeline: "Project Timeline: 2 Months",
    visual: (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            innerRadius="50%"
            outerRadius="85%"
            paddingAngle={1}
            dataKey="value"
            label={{ fill: "#ffffff", fontSize: 11 }}
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={BLUE_PALETTE[i]} stroke="none" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    ),
  },
  {
    title: "UK Home & Living Company",
    headline: "Software Development",
    body: "Developed an ERP from scratch, overhauling the resource planning system, leading to cost and time savings",
    timeline: "Project Timeline: 5 Months",
    visual: (
      <div className="w-full h-full flex items-center justify-center">
        <img src={erpImg} alt="ERP system" className="max-h-full max-w-full object-contain rounded-lg" />
      </div>
    ),
  },
  {
    title: "National Energy Company",
    headline: "Net Positive Carbon Rating",
    body: "Brought a national company with no prior ESG knowledge to a net positive carbon rating",
    timeline: "Project Timeline: 5 Months",
    visual: (
      <div className="w-full h-full flex items-center justify-center">
        <img src={esgImg} alt="ESG sustainability" className="max-h-full max-w-full object-contain rounded-lg" />
      </div>
    ),
  },
  {
    title: "F&B Startup",
    headline: "Sales Growth of 30%",
    body: "Developed and implemented a new route to market strategy alongside a data-driven sales plan leading to 30%",
    timeline: "Project Timeline: 3 Months",
    visual: (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
          <CartesianGrid stroke="#ffffff15" vertical={false} />
          <XAxis dataKey="name" stroke="#ffffff80" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} angle={-25} textAnchor="end" />
          <YAxis stroke="#ffffff80" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[280, 400]} />
          <Bar dataKey="v" fill={BLUE} radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    ),
  },
];

export function AchievementsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  // Autoplay
  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, 6000);
    return () => clearInterval(id);
  }, [api]);

  return (
    <div className="mx-auto max-w-5xl">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {slides.map((s, i) => (
            <CarouselItem key={i}>
              <div className="relative rounded-2xl bg-gradient-to-br from-[#1a1d24] to-[#0e1014] border border-[#1e9eff]/40 p-8 md:p-12 shadow-2xl">
                <h3 className="text-2xl md:text-4xl font-light text-white text-center md:text-left">
                  {s.title}
                </h3>
                <div className="h-px w-full bg-[#1e9eff] mt-4 mb-8" />
                <div className="grid md:grid-cols-2 gap-8 items-center min-h-[340px]">
                  <div className="h-[280px] md:h-[320px]">{s.visual}</div>
                  <div className="text-left">
                    <h4 className="text-2xl md:text-3xl font-light text-white leading-tight mb-5">
                      {s.headline}
                    </h4>
                    <p className="text-white/85 text-base md:text-lg leading-relaxed font-light">
                      {s.body}
                    </p>
                  </div>
                </div>
                <p className="text-right italic text-white/70 text-sm mt-8">
                  {s.timeline}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              current === i ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
