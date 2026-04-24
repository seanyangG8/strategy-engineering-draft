import { Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-[oklch(0.25_0.02_240)] text-white/80 py-12 px-6">
      <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-8 items-center">
        <Link to="/" className="text-xl font-light tracking-wide text-white lowercase">
          strategy <span className="font-semibold">engineering</span>
        </Link>
        <div className="flex gap-6 md:justify-center text-sm">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/about" className="hover:text-white">About</Link>
          <Link to="/services" className="hover:text-white">Services</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
        </div>
        <div className="flex gap-4 md:justify-end">
          <a href="#" aria-label="Facebook" className="hover:text-primary"><Facebook className="size-5" /></a>
          <a href="#" aria-label="Twitter" className="hover:text-primary"><Twitter className="size-5" /></a>
          <a href="#" aria-label="Instagram" className="hover:text-primary"><Instagram className="size-5" /></a>
        </div>
      </div>
      <div className="mx-auto max-w-7xl mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Strategy Engineering. All rights reserved.
      </div>
    </footer>
  );
}
