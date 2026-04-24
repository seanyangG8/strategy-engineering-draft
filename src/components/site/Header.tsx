import { Link } from "@tanstack/react-router";
import { Linkedin, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { to: "/" as const, label: "Home" },
  { to: "/about" as const, label: "About" },
  { to: "/services" as const, label: "Services" },
  { to: "/contact" as const, label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex items-center justify-between">
        <Link to="/" className="text-lg font-display font-medium tracking-tight text-white lowercase">
          strategy<span className="text-primary">.</span>engineering
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-white/80 hover:text-white text-[13px] font-medium tracking-wide transition-colors story-link"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white/70 hover:text-primary transition-colors pl-3 ml-2 border-l border-white/10"
          >
            <Linkedin className="size-[17px]" />
          </a>
        </nav>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur border-t border-white/10">
          <div className="px-6 py-5 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-white/90 hover:text-primary text-base font-medium"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-primary inline-flex items-center gap-2 text-sm pt-2 border-t border-white/10"
            >
              <Linkedin className="size-4" /> LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
