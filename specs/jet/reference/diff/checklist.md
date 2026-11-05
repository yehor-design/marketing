# Jet source comparison

Local production build (`next start`) against [jet.framer.website](https://jet.framer.website/) and `specs/jet/reference/`. Full-page screenshots in this folder were captured at 1440, 1024, and 390. The Framer “Get template” badge and Smart Preview overlay are hosting chrome and are not part of the site.

## Routes

Every route below returned HTTP 200.

| Route | Result |
| --- | --- |
| `/` | pass |
| `/about` | pass |
| `/blog` | pass |
| `/blog/cdn-101-why-a-global-content-delivery-network-matters` | pass |
| `/blog/image-optimization-the-secret-to-lightning-fast-sites` | pass |
| `/blog/how-jet-helped-us-increase-conversions-by-30` | pass |
| `/blog/the-ultimate-guide-to-core-web-vitals` | pass |
| `/blog/from-manual-to-automatic-how-jet-simplifies-site-optimization` | pass |
| `/blog/why-website-speed-matters-more-than-ever-in-2025` | pass |
| `/updates` | pass |
| `/updates/june-jetstream-update` | pass |
| `/updates/may-surge-update` | pass |
| `/updates/march-momentum-update` | pass |
| `/updates/february-flash-update` | pass |
| `/updates/launch-blitz-update` | pass |
| `/pricing` | pass |
| `/careers` | pass |
| `/careers/frontend-developer` | pass |
| `/careers/backend-developer` | pass |
| `/careers/devops-engineer` | pass |
| `/careers/design-engineer` | pass |
| `/careers/product-designer` | pass |
| `/careers/marketing-lead` | pass |
| `/careers/customer-success-specialist` | pass |
| `/careers/wildcard` | pass |
| `/contact` | pass |
| `/waitlist` | pass |
| `/checkout` | pass |
| `/legal/terms-of-service` | pass |
| `/legal/privacy-policy` | pass |

## Viewports

`document.documentElement.scrollWidth` matched `clientWidth` on every shot (no horizontal scroll).

| Page | 1440 | 1024 | 390 |
| --- | --- | --- | --- |
| Home | pass | pass | pass |
| Pricing | pass | pass | pass |
| About | pass | pass | pass |
| Blog index | pass | pass | pass |
| Article (`why-website-speed-matters-more-than-ever-in-2025`) | pass | pass | pass |
| Updates | pass | pass | pass |
| Careers | pass | pass | pass |
| Role (`frontend-developer`) | pass | pass | pass |
| Waitlist | pass | pass | pass |
| Contact | pass | pass | pass |
| Checkout | pass | pass | pass |
| Terms | pass | pass | pass |

Screenshots: `home`, `pricing`, `about`, `blog`, `article`, `updates`, `careers`, `role`, `waitlist`, `contact`, `checkout`, `terms`, each with `-1440.png`, `-1024.png`, and `-390.png`.

## Content and navigation

| Check | Result |
| --- | --- |
| Home order: nav, hero, social proof, benefits, process, features, testimonials, FAQ, CTA, footer | pass |
| “NEW: 2025 JUNE UPDATE” only on the home hero | pass |
| Home headline wraps “Lightning fast sites.” / “In a single click.” at 1440 and 1024, and three lines at 390 | pass |
| About, pricing, and careers headlines use the source 650px balanced wrap | pass |
| Pricing headline is “Choose your” / “Jet plan” | pass |
| Copy matches `specs/jet/pages.md`, including the source typos “optimiztaion”, “miliseconds”, and “Real-time alerts Copy” | pass |
| Legal pages include `support@jet.com` and `privacy@jet.com` as links | pass |
| Sampled internal links from home, pricing, about, blog, updates, careers, contact, waitlist, checkout, and terms return 200 | pass |
| Social links, Whop checkout, `dub.link` ask links, and the Kris tweet are present | pass |
| Desktop nav and footer links glitch on hover; the current page rests at full white | pass |
| Nav buttons use rolling text (12px on desktop, 14px on the mobile menu button) | pass |
| Pricing cards and comparison header use a sun (Starter), accent bolt (Pro), and diamond (Agency) | pass |

## Motion, keyboard, and forms

| Check | Result |
| --- | --- |
| With motion allowed: HIRING shimmer runs, the hero canvas changes, the testimonial quote advances, and the logo row crossfades | pass |
| `prefers-reduced-motion: reduce` stops the shimmer, freezes the hero canvas, holds the first quote, and leaves `document.getAnimations()` empty | pass |
| Keyboard: menu toggle opens on Enter and closes on Escape at 390 | pass |
| Keyboard: FAQ opens and closes on Enter; Space opens the next item | pass |
| Waitlist: empty and invalid email show errors; a valid email shows “You're on the waitlist!” | pass |
| Contact: empty submit lists full name, email, reason, and message; a filled form shows “We'll get back to you soon!” | pass |
| Career apply: empty submit lists the six required fields; a filled form shows “Thanks for your application!” | pass |

## Left unmatched

| Check | Result |
| --- | --- |
| Hero GodRays match the source shafts | fail — rays are softer and more diffuse than the source. Accepted for this pass. |
| Featured testimonial portraits match the source halftone | fail — the local dither is coarser than the source. Accepted for this pass. |
