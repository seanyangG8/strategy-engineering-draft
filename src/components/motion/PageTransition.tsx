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
      // Same path — keep latest children fresh, no transition
      setContent(children);
      return;
    }
    if (reducedRef.current) {
      setContent(children);
      setKey(pathname);
      setPhase("idle");
      return;
    }

    // Cancel any pending transition before starting a new one
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
      const t2 = window.setTimeout(() => setPhase("idle"), 650);
      timersRef.current.push(t2);
    }, 520);
    timersRef.current.push(t1);

    return clearTimers;
  }, [pathname, children, key, mounted]);

  if (!mounted) return <>{children}</>;

  let overlayTransform = "translateY(100%)";
  if (phase === "out") overlayTransform = "translateY(0%)";
  if (phase === "in") overlayTransform = "translateY(-100%)";

  const contentOpacity = phase === "out" ? 0.6 : 1;
  const contentTransform = phase === "out" ? "scale(0.985)" : "scale(1)";

  return (
    <>
      <div
        style={{
          transition:
            "opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
          opacity: contentOpacity,
          transform: contentTransform,
          transformOrigin: "center top",
        }}
      >
        {content}
      </div>
      <div
        aria-hidden
        className="fixed inset-0 z-[80] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.16 0.012 50) 0%, oklch(0.20 0.025 60) 100%)",
          transform: overlayTransform,
          transition:
            phase === "out"
              ? "transform 0.52s cubic-bezier(0.76, 0, 0.24, 1)"
              : "transform 0.62s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      >
        <div className="absolute inset-0 opacity-[0.06] bg-grain" />
      </div>
    </>
  );
}
