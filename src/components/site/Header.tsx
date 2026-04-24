import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/" as const, label: "Home" },
  { to: "/about" as const, label: "About" },
  { to: "/services" as const, label: "Services" },
  { to: "/contact" as const, label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex items-center justify-between">
        <Link to="/" className="text-xl font-light tracking-wide text-white lowercase">
          strategy <span className="font-semibold">engineering</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-white/90 hover:text-white text-[15px] font-medium transition-colors"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-white" }}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pl-4 border-l border-white/20">
            <a href="#" aria-label="Facebook" className="text-white/90 hover:text-primary transition-colors"><Facebook className="size-[18px]" /></a>
            <a href="#" aria-label="Twitter" className="text-white/90 hover:text-primary transition-colors"><Twitter className="size-[18px]" /></a>
            <a href="#" aria-label="Instagram" className="text-white/90 hover:text-primary transition-colors"><Instagram className="size-[18px]" /></a>
          </div>
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
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-white/90 hover:text-white text-base font-medium"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
