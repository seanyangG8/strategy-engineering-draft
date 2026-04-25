import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Mail, Linkedin, Calendar, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import heroContact from "@/assets/hero-contact.webp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Strategy Engineering" },
      { name: "description", content: "Let's re-engineer the future. Get in touch with Strategy Engineering." },
      { property: "og:title", content: "Contact — Strategy Engineering" },
      { property: "og:description", content: "Let's re-engineer the future." },
      { property: "og:image", content: heroContact },
      { name: "twitter:image", content: heroContact },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Message sent — we'll be in touch within one business day.");
    }, 600);
  };

  return (
    <main>
      <PageHero eyebrow="LET'S RE-ENGINEER THE FUTURE" title="Get in touch." backgroundImage={heroContact} objectPosition="center" compact />

      <section className="bg-surface text-surface-foreground py-28 px-6">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow text-primary-foreground/60 mb-3">// CONTACT</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-8">Let's start a conversation.</h2>

            <a
              href="mailto:contact@strategyengineering.co"
              className="block group rounded-2xl border border-black/10 p-6 hover:border-primary/60 hover:bg-background hover:text-white transition-all mb-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow text-primary mb-2 flex items-center gap-2">
                    <Mail className="size-3.5" /> EMAIL US
                  </p>
                  <p className="font-display text-xl font-medium tracking-tight">contact@strategyengineering.co</p>
                  <p className="text-xs mt-2 opacity-60">We reply within one business day.</p>
                </div>
                <ArrowUpRight className="size-5 opacity-40 group-hover:opacity-100 group-hover:rotate-45 transition-all" />
              </div>
            </a>

            <a
              href="mailto:contact@strategyengineering.co?subject=30-min%20discovery%20call"
              className="block group rounded-2xl border border-black/10 p-6 hover:border-primary/60 hover:bg-background hover:text-white transition-all mb-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow text-primary mb-2 flex items-center gap-2">
                    <Calendar className="size-3.5" /> BOOK A CALL
                  </p>
                  <p className="font-display text-xl font-medium tracking-tight">30-min discovery call</p>
                  <p className="text-xs mt-2 opacity-60">Talk through your challenge with no obligation.</p>
                </div>
                <ArrowUpRight className="size-5 opacity-40 group-hover:opacity-100 group-hover:rotate-45 transition-all" />
              </div>
            </a>

            <div>
              <p className="eyebrow text-primary-foreground/60 mb-3">// FOLLOW</p>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-black/15 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Linkedin className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow text-primary-foreground/60 mb-3">// MESSAGE</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-3">Tell us what you're solving.</h2>
            <p className="text-muted-foreground mb-8">We believe in understanding your unique needs before taking the next step.</p>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-widest mb-2 text-primary-foreground/70">Your Name *</label>
                <Input id="contact-name" required name="name" className="h-11" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-widest mb-2 text-primary-foreground/70">Email *</label>
                <Input id="contact-email" required type="email" name="email" className="h-11" />
              </div>
              <div>
                <label htmlFor="contact-website" className="block text-xs font-mono uppercase tracking-widest mb-2 text-primary-foreground/70">Website</label>
                <Input id="contact-website" name="website" className="h-11" />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-widest mb-2 text-primary-foreground/70">Your Message *</label>
                <Textarea id="contact-message" required name="message" rows={5} />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-60 px-8 py-3.5 text-sm font-semibold text-primary-foreground tracking-wide transition-all hover:scale-[1.02]"
              >
                {submitting ? "Sending..." : "Send message"}
                <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
