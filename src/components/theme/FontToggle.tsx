import { useState, useRef, useEffect } from "react";
import { Type, Check } from "lucide-react";
import { FONTS, FONT_META, useFont, type FontPair } from "./FontProvider";

export function FontToggle() {
  const { font, setFont } = useFont();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Font: ${FONT_META[font].label}. Click to change.`}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-white/10 hover:border-primary/40 px-3 py-1.5 text-white/80 hover:text-white transition-colors"
      >
        <Type className="size-[14px]" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-white/10 bg-background/95 backdrop-blur-md shadow-2xl p-1.5 z-50"
        >
          <p className="eyebrow text-primary px-3 py-2">// FONT</p>
          {FONTS.map((f: FontPair) => {
            const active = f === font;
            const meta = FONT_META[f];
            return (
              <button
                key={f}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setFont(f);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active ? "bg-white/5 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <span
                  aria-hidden
                  className="size-7 rounded-md ring-1 ring-white/15 bg-white/[0.03] flex items-center justify-center text-[15px] leading-none text-white"
                  style={{ fontFamily: meta.display }}
                >
                  {meta.sample}
                </span>
                <span className="flex-1 text-left" style={{ fontFamily: meta.sans }}>
                  {meta.label}
                </span>
                {active && <Check className="size-3.5 text-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
