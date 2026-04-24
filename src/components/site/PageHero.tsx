import { Header } from "./Header";

export function PageHero({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.25_0.02_240)] to-[oklch(0.32_0.025_240)]" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,oklch(0.62_0.22_5)_0%,transparent_60%)]" />
      <Header />
      <div className="relative z-10 text-center px-6 pt-24">
        {eyebrow && (
          <>
            <p className="text-white text-base md:text-lg font-medium mb-3">{eyebrow}</p>
            <div className="w-16 h-[3px] bg-primary mx-auto mb-6" />
          </>
        )}
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight uppercase">
          {title}
        </h1>
      </div>
    </section>
  );
}
