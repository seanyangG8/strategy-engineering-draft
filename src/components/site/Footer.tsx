import { Linkedin, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-background text-white/70 pt-20 pb-10 px-6 border-t border-white/5">
      <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-12">
        <div>
          <Link to="/" className="text-lg font-display font-medium tracking-tight text-white lowercase">
            strategy<span className="text-primary">.</span>engineering
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-xs">
            Engineering the systems, automation, and AI that turn ambition into operating advantage.
          </p>
        </div>

        <div>
          <p className="eyebrow text-primary mb-4">Sitemap</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors story-link">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors story-link">About</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors story-link">Services</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors story-link">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-primary mb-4">Get in touch</p>
          <a
            href="mailto:contact@strategyengineering.co"
            className="block text-white hover:text-primary transition-colors text-sm story-link mb-3"
          >
            contact@strategyengineering.co
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-primary transition-colors mb-5"
          >
            Book a call <ArrowUpRight className="size-3.5" />
          </Link>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/70 hover:text-primary hover:border-primary/40 transition-colors"
          >
            <Linkedin className="size-4" />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row gap-3 justify-between items-center text-xs text-white/40">
        <span>© {new Date().getFullYear()} Strategy Engineering. All rights reserved.</span>
        <span className="font-mono">// Built for impact</span>
      </div>
    </footer>
  );
}
