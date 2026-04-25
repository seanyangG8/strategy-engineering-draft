import { useRef, type ReactNode, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Common = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

type AsLink = Common & { to: string; href?: never; onClick?: never; type?: never; disabled?: never };
type AsAnchor = Common & { href: string; to?: never; onClick?: never; type?: never; disabled?: never };
type AsButton = Common & {
  to?: never;
  href?: never;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

type Props = AsLink | AsAnchor | AsButton;

export function MagneticButton(props: Props) {
  const { children, className, strength = 14 } = props;
  const ref = useRef<HTMLElement | null>(null);

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
    const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const sharedClass = cn("inline-flex transition-transform duration-300 ease-out will-change-transform", className);
  const handlers = { onMouseMove: handleMove, onMouseLeave: handleLeave };

  if ("to" in props && props.to) {
    return (
      <Link
        ref={ref as never}
        to={props.to}
        className={sharedClass}
        {...handlers}
      >
        {children}
      </Link>
    );
  }
  if ("href" in props && props.href) {
    return (
      <a ref={ref as never} href={props.href} className={sharedClass} {...handlers}>
        {children}
      </a>
    );
  }
  return (
    <button
      ref={ref as never}
      type={(props as AsButton).type ?? "button"}
      onClick={(props as AsButton).onClick}
      disabled={(props as AsButton).disabled}
      className={sharedClass}
      {...handlers}
    >
      {children}
    </button>
  );
}
