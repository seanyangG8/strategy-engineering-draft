import { useState, useRef, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { THEMES, THEME_META, useTheme, type Theme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
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
        aria-label={`Theme: ${THEME_META[theme].label}. Click to change.`}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-white/10 hover:border-primary/40 px-3 py-1.5 text-white/80 hover:text-white transition-colors"
      >
        <span
          aria-hidden
          className="size-3 rounded-full ring-1 ring-white/20"
          style={{ background: THEME_META[theme].swatch }}
        />
        <Palette className="size-[14px]" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/10 bg-background/95 backdrop-blur-md shadow-2xl p-1.5 z-50"
        >
          <p className="eyebrow text-primary px-3 py-2">// THEME</p>
          {THEMES.map((t: Theme) => {
            const active = t === theme;
            return (
              <button
                key={t}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setTheme(t);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active ? "bg-white/5 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <span
                  aria-hidden
                  className="size-4 rounded-full ring-1 ring-white/20"
                  style={{ background: THEME_META[t].swatch }}
                />
                <span className="flex-1 text-left">{THEME_META[t].label}</span>
                {active && <Check className="size-3.5 text-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
