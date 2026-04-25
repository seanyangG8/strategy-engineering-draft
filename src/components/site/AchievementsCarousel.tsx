import { useEffect, useRef, useState } from "react";
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

// Theme-aware chart colors — pulled from CSS variables at render time
const PRIMARY = "var(--primary)";
const PRIMARY_PALETTE = [
  "color-mix(in oklab, var(--primary) 95%, white 5%)",
  "color-mix(in oklab, var(--primary) 80%, white 20%)",
  "var(--primary)",
  "color-mix(in oklab, var(--primary) 70%, black 30%)",
  "color-mix(in oklab, var(--primary) 50%, black 50%)",
];

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

// Mounts the visual with play=false on first paint, then flips to play=true on the next frame.
// This guarantees CSS transitions fire (initial state must differ from final state).
function VisualSlot({ active, render }: { active: boolean; render: (play: boolean) => React.ReactNode }) {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    if (!active) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setPlay(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [active]);
  return <div className="h-[260px] md:h-[340px]">{render(play)}</div>;
}

// Animated ERP diagram — central hub with 4 satellite modules wiring in
function ErpDiagram({ play }: { play: boolean }) {
  const modules = [
    { label: "Inventory", x: 50, y: 18 },
    { label: "Orders", x: 82, y: 50 },
    { label: "Finance", x: 50, y: 82 },
    { label: "People", x: 18, y: 50 },
  ];
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-6 bg-primary/15 blur-3xl rounded-full" />
      <svg viewBox="0 0 100 100" className="relative w-full h-full">
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.9" />
            <stop offset="100%" stopColor={PRIMARY} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connector lines drawing in */}
        {modules.map((m, i) => (
          <line
            key={`l-${i}`}
            x1="50"
            y1="50"
            x2={m.x}
            y2={m.y}
            stroke={PRIMARY}
            strokeWidth="0.4"
            strokeDasharray="60"
            strokeDashoffset={play ? 0 : 60}
            style={{
              transition: `stroke-dashoffset 800ms ease-out ${300 + i * 150}ms`,
              opacity: 0.7,
            }}
          />
        ))}

        {/* Pulsing hub */}
        <circle cx="50" cy="50" r="14" fill="url(#hubGlow)" />
        <circle
          cx="50"
          cy="50"
          r={play ? 7 : 0}
          fill={PRIMARY}
          style={{ transition: "r 600ms cubic-bezier(0.34,1.56,0.64,1) 100ms" }}
        />
        <text x="50" y="51.5" textAnchor="middle" fontSize="3.2" fill="#fff" fontWeight="600" style={{ opacity: play ? 1 : 0, transition: "opacity 400ms 700ms" }}>
          ERP
        </text>

        {/* Satellite nodes */}
        {modules.map((m, i) => (
          <g
            key={`m-${i}`}
            style={{
              opacity: play ? 1 : 0,
              transform: play ? "scale(1)" : "scale(0)",
              transformOrigin: `${m.x}px ${m.y}px`,
              transition: `opacity 400ms ease-out ${800 + i * 150}ms, transform 500ms cubic-bezier(0.34,1.56,0.64,1) ${800 + i * 150}ms`,
            }}
          >
            <circle cx={m.x} cy={m.y} r="6" fill="#0d0d0d" stroke={PRIMARY} strokeWidth="0.6" />
            <text x={m.x} y={m.y + 11} textAnchor="middle" fontSize="3" fill="#fff" opacity="0.85">
              {m.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// Animated ESG diagram — carbon meter sweeping from red to net positive
function EsgDiagram({ play }: { play: boolean }) {
  // Arc from -120deg to +120deg (240deg sweep)
  const start = -120;
  const end = 120;
  const targetDeg = play ? end : start;
  const polar = (deg: number, r: number) => {
    const rad = (deg * Math.PI) / 180;
    return { x: 50 + r * Math.sin(rad), y: 50 - r * Math.cos(rad) };
  };
  const arcPath = (from: number, to: number, r: number) => {
    const a = polar(from, r);
    const b = polar(to, r);
    const large = to - from > 180 ? 1 : 0;
    return `M ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y}`;
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-6 bg-primary/15 blur-3xl rounded-full" />
      <svg viewBox="0 0 100 100" className="relative w-full h-full">
        {/* Track */}
        <path d={arcPath(start, end, 38)} fill="none" stroke="#ffffff15" strokeWidth="6" strokeLinecap="round" />
        {/* Coloured arc */}
        <path
          d={arcPath(start, end, 38)}
          fill="none"
          stroke={PRIMARY}
          strokeWidth="6"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={play ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1600ms cubic-bezier(0.65,0,0.35,1) 200ms" }}
        />
        {/* Tick markers */}
        {[-120, -60, 0, 60, 120].map((d) => {
          const a = polar(d, 32);
          const b = polar(d, 28);
          return <line key={d} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#ffffff40" strokeWidth="0.5" />;
        })}
        {/* Needle */}
        <g
          style={{
            transform: `rotate(${targetDeg}deg)`,
            transformOrigin: "50px 50px",
            transition: "transform 1600ms cubic-bezier(0.65,0,0.35,1) 200ms",
          }}
        >
          <line x1="50" y1="50" x2="50" y2="18" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="50" cy="18" r="2" fill={PRIMARY} />
        </g>
        <circle cx="50" cy="50" r="3.5" fill="#0d0d0d" stroke={PRIMARY} strokeWidth="0.6" />
        {/* Labels */}
        <text x="14" y="78" fontSize="3" fill="#ffffff60">High emissions</text>
        <text x="86" y="78" textAnchor="end" fontSize="3" fill={PRIMARY} fontWeight="600" style={{ opacity: play ? 1 : 0, transition: "opacity 400ms 1600ms" }}>
          Net positive
        </text>
        {/* Centre readout */}
        <text x="50" y="62" textAnchor="middle" fontSize="3" fill="#ffffff70">CARBON</text>
        <text x="50" y="72" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="300" style={{ opacity: play ? 1 : 0, transition: "opacity 500ms 1700ms" }}>
          +
        </text>
      </svg>
    </div>
  );
}

// Animated bar chart — bars grow one at a time, left to right
function GrowthBars({ play }: { play: boolean }) {
  // SVG coordinate system
  const W = 100;
  const H = 60;
  const padL = 10;
  const padR = 4;
  const padT = 8;
  const padB = 10;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const yMin = 260;
  const yMax = 410;
  const scaleY = (v: number) => ((v - yMin) / (yMax - yMin)) * chartH;
  const barW = chartW / barData.length;
  const innerBarW = barW * 0.55;
  const stagger = 220; // ms between bar starts
  const grow = 650; // ms per bar growth
  // Y-axis ticks
  const ticks = [260, 300, 340, 410];

  return (
    <div className="relative w-full h-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="growthBarFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.95} />
            <stop offset="100%" stopColor={PRIMARY} stopOpacity={0.35} />
          </linearGradient>
        </defs>

        {/* Gridlines + Y labels */}
        {ticks.map((t) => {
          const y = padT + chartH - scaleY(t);
          return (
            <g key={t}>
              <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#ffffff10" strokeWidth="0.2" />
              <text x={padL - 1} y={y + 1} textAnchor="end" fontSize="2.4" fill="#ffffff70">
                {t}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {barData.map((d, i) => {
          const x = padL + i * barW + (barW - innerBarW) / 2;
          const fullH = scaleY(d.v);
          const y = padT + chartH - fullH;
          const delay = play ? i * stagger : 0;
          return (
            <g key={d.name}>
              {/* Bar */}
              <rect
                x={x}
                y={play ? y : padT + chartH}
                width={innerBarW}
                height={play ? fullH : 0}
                rx={1}
                fill="url(#growthBarFill)"
                style={{
                  transition: `y ${grow}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, height ${grow}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
                }}
              />
              {/* Value label */}
              <text
                x={x + innerBarW / 2}
                y={(play ? y : padT + chartH) - 1.2}
                textAnchor="middle"
                fontSize="2.4"
                fill="#ffffffcc"
                fontWeight="600"
                style={{
                  opacity: play ? 1 : 0,
                  transition: `opacity 300ms ease-out ${delay + grow - 150}ms, y ${grow}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
                }}
              >
                {d.v}
              </text>
              {/* X-axis label */}
              <text
                x={x + innerBarW / 2}
                y={padT + chartH + 4}
                textAnchor="middle"
                fontSize="2.4"
                fill="#ffffff70"
              >
                {d.name}
              </text>
            </g>
          );
        })}

        {/* Trend arrow sweeping over bar tops */}
        <path
          d={barData
            .map((d, i) => {
              const x = padL + i * barW + barW / 2;
              const y = padT + chartH - scaleY(d.v);
              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="0.4"
          strokeLinecap="round"
          strokeDasharray="120"
          strokeDashoffset={play ? 0 : 120}
          style={{
            transition: `stroke-dashoffset 1100ms ease-out ${barData.length * stagger + 100}ms`,
          }}
        />
      </svg>
    </div>
  );
}

type Slide = {
  title: string;
  headline: string;
  body: string;
  timeline: string;
  visual: (play: boolean) => React.ReactNode;
};

const slides: Slide[] = [
  {
    title: "Listed FMCG Market Leader",
    headline: "Time Saved by 98.2%",
    body: "Developed a regional automation solution streamlining six hours of daily work into several minutes whilst employing Lean principles and practices.",
    timeline: "Project Timeline: 3 Months",
    visual: (play) => (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={play ? areaData : areaData.map((d) => ({ ...d, v: 0 }))} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.95} />
              <stop offset="100%" stopColor={PRIMARY} stopOpacity={0.15} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#ffffff10" vertical={false} />
          <XAxis dataKey="name" stroke="#ffffff70" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis stroke="#ffffff70" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
          <Area type="monotone" dataKey="v" stroke={PRIMARY} strokeWidth={2.5} fill="url(#areaFill)" isAnimationActive animationDuration={1400} animationEasing="ease-out" />
        </AreaChart>
      </ResponsiveContainer>
    ),
  },
  {
    title: "Fortune 500 MNC",
    headline: "Savings of 500,000 USD",
    body: "Developed a sourcing strategy built on robust analysis and a bespoke calculation methodology.",
    timeline: "Project Timeline: 2 Months",
    visual: (play) => (
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
              label={({ value }) => `${value}%`}
              labelLine={false}
              style={{ fontSize: 11, fill: "#fff" }}
              isAnimationActive={play}
              animationDuration={1200}
              animationBegin={150}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={PRIMARY_PALETTE[i]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] uppercase tracking-widest text-white/60">Total</span>
          <span className="text-2xl font-light text-white" style={{ opacity: play ? 1 : 0, transition: "opacity 500ms 1100ms" }}>100%</span>
        </div>
      </div>
    ),
  },
  {
    title: "UK Home & Living Company",
    headline: "Software Development",
    body: "Developed an ERP from scratch, overhauling the resource planning system, leading to cost and time savings.",
    timeline: "Project Timeline: 5 Months",
    visual: (play) => <ErpDiagram play={play} />,
  },
  {
    title: "National Energy Company",
    headline: "Net Positive Carbon Rating",
    body: "Brought a national company with no prior ESG knowledge to a net positive carbon rating.",
    timeline: "Project Timeline: 5 Months",
    visual: (play) => <EsgDiagram play={play} />,
  },
  {
    title: "F&B Startup",
    headline: "Sales Growth of 30%",
    body: "Developed and implemented a new route to market strategy alongside a data-driven sales plan leading to 30% sales growth.",
    timeline: "Project Timeline: 3 Months",
    visual: (play) => <GrowthBars play={play} />,
  },
];

export function AchievementsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Watch when the carousel scrolls into view
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setInView(true);
          else setInView(false);
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Re-trigger visual animation when active slide changes (while in view)
  useEffect(() => {
    if (inView) setPlayKey((k) => k + 1);
  }, [current, inView]);

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
    if (!api || paused || !inView) return;
    const id = setInterval(() => {
      api.scrollNext();
    }, 6500);
    return () => clearInterval(id);
  }, [api, paused, inView]);

  return (
    <div
      ref={wrapperRef}
      className="mx-auto max-w-5xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="w-full">
        <CarouselContent>
          {slides.map((s, i) => {
            const isActive = current === i && inView;
            return (
              <CarouselItem key={i}>
                <div className="group relative rounded-3xl bg-bronze-flow border border-primary/30 p-6 md:p-12 shadow-2xl shadow-primary/20 overflow-hidden">
                  {/* Glow */}
                  <div className="pointer-events-none absolute -top-32 -right-32 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold">
                        Case Study {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-primary/60 to-transparent" />
                    </div>
                    <h3 className="text-2xl md:text-4xl font-light text-white tracking-tight">
                      {s.title}
                    </h3>
                    <div className="h-[2px] w-full bg-gradient-to-r from-primary via-primary/60 to-transparent mt-4 mb-8" />

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[320px]">
                      <VisualSlot key={`${i}-${isActive ? playKey : "idle"}`} active={isActive} render={s.visual} />
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
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-8" role="group" aria-label="Carousel controls">
        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          aria-label="Previous slide"
          className="h-10 w-10 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1} of ${slides.length}`}
              aria-current={current === i ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                current === i ? "w-8 bg-primary" : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => api?.scrollNext()}
          aria-label="Next slide"
          className="h-10 w-10 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
