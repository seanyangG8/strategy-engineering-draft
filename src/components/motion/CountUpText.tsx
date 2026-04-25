import { useEffect, useRef, useState } from "react";

/**
 * Animates a numeric value extracted from a label (e.g. "↓ 38%", "$4.2M", "12+", "5 wks")
 * by counting the first number up from 0 when scrolled into view. Surrounding text is preserved.
 */
export function CountUpText({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);
  const startedRef = useRef(false);

  // Match first number (with optional decimal)
  const match = value.match(/-?\d+(?:\.\d+)?/);
  const numStr = match?.[0];
  const num = numStr ? parseFloat(numStr) : null;
  const idx = match?.index ?? -1;
  const before = num !== null ? value.slice(0, idx) : "";
  const after = num !== null && numStr ? value.slice(idx + numStr.length) : "";
  const decimals = numStr && numStr.includes(".") ? numStr.split(".")[1].length : 0;

  const [display, setDisplay] = useState(num !== null ? "0" : value);

  useEffect(() => {
    if (!ref.current || num === null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(num.toFixed(decimals));
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          setShown(true);
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay((num * eased).toFixed(decimals));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [num, decimals]);

  if (num === null) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {before}
      {display}
      {after}
      {!shown && ""}
    </span>
  );
}
