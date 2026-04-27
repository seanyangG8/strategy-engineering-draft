import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const THEMES = ["bronze", "midnight", "forest", "mint", "plum", "crimson", "mono"] as const;
export type Theme = (typeof THEMES)[number];

export const THEME_META: Record<Theme, { label: string; swatch: string }> = {
  bronze: { label: "Bronze", swatch: "oklch(0.58 0.06 65)" },
  midnight: { label: "Midnight", swatch: "oklch(0.72 0.14 230)" },
  forest: { label: "Forest", swatch: "oklch(0.78 0.10 90)" },
  mint: { label: "Mint", swatch: "#8cf2a6" },
  plum: { label: "Plum", swatch: "oklch(0.75 0.09 25)" },
  crimson: { label: "Crimson", swatch: "oklch(0.62 0.22 25)" },
  mono: { label: "Mono", swatch: "oklch(0.55 0 0)" },
};

const STORAGE_KEY = "se-theme";

type Ctx = { theme: Theme; setTheme: (t: Theme) => void; cycle: () => void };
const ThemeContext = createContext<Ctx | null>(null);

function getInitial(): Theme {
  if (typeof document === "undefined") return "bronze";
  const attr = document.documentElement.getAttribute("data-theme") as Theme | null;
  if (attr && (THEMES as readonly string[]).includes(attr)) return attr;
  return "bronze";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => getInitial());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const cycle = () => {
    const i = THEMES.indexOf(theme);
    setThemeState(THEMES[(i + 1) % THEMES.length]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycle }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

// Inline script to set theme before hydration — prevents FOUC
export const themeBootstrapScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');var v=['bronze','midnight','forest','plum','crimson','mono'];if(t&&v.indexOf(t)!==-1){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','bronze');}}catch(e){document.documentElement.setAttribute('data-theme','bronze');}})();`;
