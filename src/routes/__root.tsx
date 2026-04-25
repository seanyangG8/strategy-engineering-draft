import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/site/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { ThemeProvider, themeBootstrapScript } from "@/components/theme/ThemeProvider";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-white">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-white">Page not found</h2>
        <p className="mt-2 text-sm text-white/70">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

const orgJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Strategy Engineering",
  url: "https://strategyengineering.co",
  description:
    "Engineering your success through process improvement, automation & AI, strategy, and sustainability.",
  email: "contact@strategyengineering.co",
  sameAs: ["https://www.linkedin.com/"],
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Strategy Engineering — Your Ambition, Our Expertise" },
      { name: "description", content: "Engineering your success through process improvement, automation & AI, strategy, and sustainability." },
      { name: "theme-color", content: "#262019" },
      { property: "og:title", content: "Strategy Engineering" },
      { property: "og:description", content: "Your Ambition. Our Expertise." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Strategy Engineering" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
    scripts: [
      { children: themeBootstrapScript },
      { type: "application/ld+json", children: orgJsonLd },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SmoothScroll />
      <ScrollProgress />
      <PageTransition>
        <div id="main-content">
          <Outlet />
        </div>
      </PageTransition>
      <Footer />
      <Toaster />
    </ThemeProvider>
  );
}

