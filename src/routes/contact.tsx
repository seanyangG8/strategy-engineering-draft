import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Mail, Facebook, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import heroContact from "@/assets/hero-contact.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Strategy Engineering" },
      { name: "description", content: "Let's re-engineer the future. Get in touch with Strategy Engineering." },
      { property: "og:title", content: "Contact — Strategy Engineering" },
      { property: "og:description", content: "Let's Re-Engineer the Future." },
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
      toast.success("Message sent — we'll be in touch shortly.");
    }, 600);
  };

  return (
    <main>
      <PageHero eyebrow="Let's Re-Engineer the Future." title="Contact Us" backgroundImage={heroContact} objectPosition="center" />

      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-2">Contact Info</h2>
            <div className="w-16 h-[3px] bg-primary mb-10" />

            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                <Mail className="size-4" /> Email Us
              </h3>
              <a href="mailto:contact@strategyengineering.co" className="text-lg hover:text-primary transition-colors">
                contact@strategyengineering.co
              </a>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" aria-label="Facebook" className="w-11 h-11 rounded-full bg-background text-white flex items-center justify-center hover:bg-primary transition-colors"><Facebook className="size-5" /></a>
                <a href="#" aria-label="Twitter" className="w-11 h-11 rounded-full bg-background text-white flex items-center justify-center hover:bg-primary transition-colors"><Twitter className="size-5" /></a>
                <a href="#" aria-label="YouTube" className="w-11 h-11 rounded-full bg-background text-white flex items-center justify-center hover:bg-primary transition-colors"><Youtube className="size-5" /></a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
            <div className="w-16 h-[3px] bg-primary mb-6" />
            <p className="text-muted-foreground mb-8">We believe in understanding your unique needs before taking the next step.</p>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name *</label>
                <Input required name="name" className="h-11" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input required type="email" name="email" className="h-11" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <Input name="website" className="h-11" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your Message *</label>
                <Textarea required name="message" rows={5} />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-primary hover:bg-primary/90 disabled:opacity-60 px-8 py-3 text-sm font-bold text-primary-foreground uppercase tracking-wider transition-all"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
