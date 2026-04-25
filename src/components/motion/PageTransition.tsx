import { useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(true);
  const [content, setContent] = useState(children);
  const [key, setKey] = useState(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (key === pathname) {
      setContent(children);
      return;
    }
    setShown(false);
    const t = setTimeout(() => {
      setContent(children);
      setKey(pathname);
      requestAnimationFrame(() => setShown(true));
    }, 220);
    return () => clearTimeout(t);
  }, [pathname, children, key, mounted]);

  // During SSR and first client render, render children directly to avoid hydration mismatch
  if (!mounted) return <>{children}</>;

  return (
    <div
      style={{
        transition: "opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(8px)",
      }}
    >
      {content}
    </div>
  );
}
