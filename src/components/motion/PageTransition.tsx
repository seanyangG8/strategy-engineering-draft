import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mounted, setMounted] = useState(false);
  const [content, setContent] = useState(children);
  const [key, setKey] = useState(pathname);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const reducedRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return clearTimers;
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (key === pathname) {
      setContent(children);
      return;
    }
    if (reducedRef.current) {
      setContent(children);
      setKey(pathname);
      setPhase("idle");
      return;
    }

    clearTimers();
    setPhase("out");

    const t1 = window.setTimeout(() => {
      setContent(children);
      setKey(pathname);
      const hash = window.location.hash?.slice(1);
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number | HTMLElement, o?: { immediate?: boolean; offset?: number }) => void } }).__lenis;
      const target = hash ? document.getElementById(hash) : null;
      if (target) {
        requestAnimationFrame(() => {
          if (lenis) lenis.scrollTo(target, { offset: -80 });
          else target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      } else if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
      requestAnimationFrame(() => setPhase("in"));
      const t2 = window.setTimeout(() => setPhase("idle"), 280);
      timersRef.current.push(t2);
    }, 180);
    timersRef.current.push(t1);

    return clearTimers;
  }, [pathname, children, key, mounted]);

  if (!mounted) return <>{children}</>;

  const contentOpacity = phase === "out" ? 0 : 1;
  const contentTransform = phase === "out" ? "translateY(6px)" : "translateY(0)";

  return (
    <div
      style={{
        transition:
          "opacity 0.18s cubic-bezier(0.22, 1, 0.36, 1), transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
        opacity: contentOpacity,
        transform: contentTransform,
        willChange: "opacity, transform",
      }}
    >
      {content}
    </div>
  );
}
