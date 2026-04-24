# Strategy Engineering — 1:1 Site Clone

A pixel-faithful rebuild of [strategyengineering.co](https://strategyengineering.co/) as a multi-page TanStack Start site. Same content, same structure, same look & feel (dark hero overlays, red accent CTAs, clean sans-serif type, "strategy engineering" wordmark logo).

## Site Structure (4 routes)

- `/` — **Home**
- `/about` — **About**
- `/services` — **Services**
- `/contact` — **Contact**

Shared header (logo left, nav right: Home · About · Services · Contact + Facebook/Twitter/Instagram icons) and footer on every page.

## Page Contents (verbatim from source site)

### Home (`/`)
- **Hero** — full-bleed seedling/soil photo with dark overlay
  - Eyebrow: "Unlocking Potential" (with red underline)
  - Headline: "YOUR AMBITION  OUR EXPERTISE"
  - Red pill CTA: "Learn More" → /about
- **Engineering Your Success** — 4-card grid:
  1. Process Improvement
  2. Automation & AI Solutions
  3. Strategy & Transformation
  4. Sustainability & Impact
  Each card: circular icon image + title + description + "Learn More" → /services
- **Our Achievements** — intro copy + image gallery (achievements collage)
- CTA: "Learn More" → /services

### About (`/about`)
- Page title: "Where Engineering Meets Business"
- **Our Mission — Built for Impact** + paragraph
- Feature image (office/team photo)
- **Why We're Different — Engineering Solutions for Real-World Challenges** + paragraph
- **Why Choose Us — Built on Strong Foundations** + paragraph
- **Team section** — 4 members:
  - Sean Goh — Senior Business Process Manager — MEng Electrical and Electronic Engineering
  - Nadzim Zahari — Senior Sustainability Manager — BSc Economics and Finance
  - Jon Quah — Business Development Head — BSc Civil Engineering
  - Sean Morais — Lead Design Engineer — MEng Astronautics Engineering

### Services (`/services`)
- Page title: "Services" / "Transforming Businesses, One Solution at a Time"
- 4 detailed sections, each with circular icon, title, tagline, intro, bulleted benefit list, closing line:
  1. **Process Improvement** — Optimise, Simplify, Excel.
  2. **Automation & AI Solutions** — Innovate Smarter, Not Harder.
  3. **Strategy & Transformation**
  4. **Sustainability & Impact**

### Contact (`/contact`)
- Page title: "Contact Us" / "Let's Re-Engineer the Future."
- **Contact Info**: Email — contact@strategyengineering.co
- **Follow Us**: Facebook, Twitter, Youtube icons
- **Get In Touch** form: Name, Email, Message, Website (form submit shows a success toast — no backend)

## Design

- **Colors**: dark slate background (#2c3e50-ish), white text, red/pink accent (#ed1c5b style) for CTAs and underline accents
- **Typography**: clean modern sans-serif (Inter / similar), bold uppercase for hero headline
- **Hero overlay**: dark gradient on top of provided seedling photo (uploaded image used directly)
- **Cards**: circular images, centered text, generous spacing
- **Responsive**: mobile menu (hamburger), stacked cards on small screens
- Subtle fade/slide-in on scroll

## Assets

- Use the uploaded seedling photo for the homepage hero
- Use the circular seedling image as a recurring motif (about page, service icons placeholder)
- Use the lightbulb-in-sky photo as the About page feature image
- Generate matching circular icon illustrations for the 4 service cards (or use simple iconography in a consistent style) since the originals are WordPress-hosted

## Out of scope

- Real form submission backend (form will show a success toast only — can be wired to email later)
- Live social media links (icons will link to `#` placeholders unless URLs are provided)
