import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const FONTS = ["editorial", "bold", "modern", "industrial", "brutalist", "soft", "geometric"] as const;
export type FontPair = (typeof FONTS)[number];

export const FONT_META: Record<
  FontPair,
  { label: string; sample: string; display: string; sans: string }
> = {
  editorial: {
    label: "Editorial",
    sample: "Aa",
    display: "'Fraunces', 'Times New Roman', serif",
    sans: "'Inter', system-ui, sans-serif",
  },
  modern: {
    label: "Modern",
    sample: "Aa",
    display: "'Space Grotesk', 'Inter', sans-serif",
    sans: "'Inter', system-ui, sans-serif",
  },
  industrial: {
    label: "Industrial",
    sample: "Aa",
    display: "'JetBrains Mono', ui-monospace, monospace",
    sans: "'IBM Plex Sans', system-ui, sans-serif",
  },
  brutalist: {
    label: "Brutalist",
    sample: "Aa",
    display: "'Archivo Black', 'Inter', sans-serif",
    sans: "'IBM Plex Sans', system-ui, sans-serif",
  },
  soft: {
    label: "Soft",
    sample: "Aa",
    display: "'DM Serif Display', 'Times New Roman', serif",
    sans: "'DM Sans', system-ui, sans-serif",
  },
  geometric: {
    label: "Geometric",
    sample: "Aa",
    display: "'Syne', 'Inter', sans-serif",
    sans: "'Plus Jakarta Sans', system-ui, sans-serif",
  },
  bold: {
    label: "Bold",
    sample: "Aa",
    display: "'Montserrat', 'Inter', sans-serif",
    sans: "'Montserrat', system-ui, sans-serif",
  },
};

const STORAGE_KEY = "se-font";

type Ctx = { font: FontPair; setFont: (f: FontPair) => void };
const FontContext = createContext<Ctx | null>(null);

function getInitial(): FontPair {
  if (typeof document === "undefined") return "editorial";
  const attr = document.documentElement.getAttribute("data-font") as FontPair | null;
  if (attr && (FONTS as readonly string[]).includes(attr)) return attr;
  return "editorial";
}

export function FontProvider({ children }: { children: ReactNode }) {
  const [font, setFontState] = useState<FontPair>(() => getInitial());

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-font", font);
    const meta = FONT_META[font];
    root.style.setProperty("--font-display", meta.display);
    root.style.setProperty("--font-sans", meta.sans);
    try {
      localStorage.setItem(STORAGE_KEY, font);
    } catch {}
  }, [font]);

  const setFont = (f: FontPair) => setFontState(f);

  return <FontContext.Provider value={{ font, setFont }}>{children}</FontContext.Provider>;
}

export function useFont() {
  const ctx = useContext(FontContext);
  if (!ctx) throw new Error("useFont must be used within FontProvider");
  return ctx;
}

// Inline bootstrap to set font + CSS vars before hydration — prevents FOUC
export const fontBootstrapScript = `(function(){try{var k='${STORAGE_KEY}';var v=['editorial','bold','modern','industrial','brutalist','soft','geometric'];var t=localStorage.getItem(k);if(!t||v.indexOf(t)===-1)t='editorial';document.documentElement.setAttribute('data-font',t);var m={editorial:["'Fraunces','Times New Roman',serif","'Inter',system-ui,sans-serif"],modern:["'Space Grotesk','Inter',sans-serif","'Inter',system-ui,sans-serif"],industrial:["'JetBrains Mono',ui-monospace,monospace","'IBM Plex Sans',system-ui,sans-serif"],brutalist:["'Archivo Black','Inter',sans-serif","'IBM Plex Sans',system-ui,sans-serif"],soft:["'DM Serif Display','Times New Roman',serif","'DM Sans',system-ui,sans-serif"],geometric:["'Syne','Inter',sans-serif","'Plus Jakarta Sans',system-ui,sans-serif"],bold:["'Montserrat','Inter',sans-serif","'Montserrat',system-ui,sans-serif"]};var p=m[t];document.documentElement.style.setProperty('--font-display',p[0]);document.documentElement.style.setProperty('--font-sans',p[1]);}catch(e){}})();`;var t=localStorage.getItem(k);if(!t||v.indexOf(t)===-1)t='editorial';document.documentElement.setAttribute('data-font',t);var m={editorial:["'Fraunces','Times New Roman',serif","'Inter',system-ui,sans-serif"],modern:["'Space Grotesk','Inter',sans-serif","'Inter',system-ui,sans-serif"],industrial:["'JetBrains Mono',ui-monospace,monospace","'IBM Plex Sans',system-ui,sans-serif"],brutalist:["'Archivo Black','Inter',sans-serif","'IBM Plex Sans',system-ui,sans-serif"],soft:["'DM Serif Display','Times New Roman',serif","'DM Sans',system-ui,sans-serif"],geometric:["'Syne','Inter',sans-serif","'Plus Jakarta Sans',system-ui,sans-serif"],bold:["'Montserrat','Inter',sans-serif","'Montserrat',system-ui,sans-serif"]};var p=m[t];document.documentElement.style.setProperty('--font-display',p[0]);document.documentElement.style.setProperty('--font-sans',p[1]);}catch(e){}})();`;
