export const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/updates", label: "Updates" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers", badge: "8" },
] as const;

export const footerColumns = [
  {
    title: "Product",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/updates", label: "Updates" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/careers", label: "Careers", badge: "HIRING" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/terms-of-service", label: "Terms of service" },
      { href: "/legal/privacy-policy", label: "Privacy policy" },
    ],
  },
] as const;

export const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", icon: "facebook" },
  { href: "https://instagram.com", label: "Instagram", icon: "instagram" },
  { href: "https://tiktok.com", label: "TikTok", icon: "tiktok" },
  { href: "https://youtube.com", label: "YouTube", icon: "youtube" },
  { href: "https://x.com", label: "X", icon: "x" },
] as const;

export const blogSlugs = [
  "cdn-101-why-a-global-content-delivery-network-matters",
  "image-optimization-the-secret-to-lightning-fast-sites",
  "how-jet-helped-us-increase-conversions-by-30",
  "the-ultimate-guide-to-core-web-vitals",
  "from-manual-to-automatic-how-jet-simplifies-site-optimization",
  "why-website-speed-matters-more-than-ever-in-2025",
] as const;

export const updateSlugs = [
  "june-jetstream-update",
  "may-surge-update",
  "march-momentum-update",
  "february-flash-update",
  "launch-blitz-update",
] as const;

export const careerSlugs = [
  "frontend-developer",
  "backend-developer",
  "devops-engineer",
  "design-engineer",
  "product-designer",
  "marketing-lead",
  "customer-success-specialist",
  "wildcard",
] as const;

export const legalSlugs = ["terms-of-service", "privacy-policy"] as const;

const SMALL_WORDS = new Set([
  "a",
  "an",
  "and",
  "by",
  "for",
  "from",
  "in",
  "of",
  "on",
  "the",
  "than",
  "to",
]);

const WORD_LABELS: Record<string, string> = {
  cdn: "CDN",
  devops: "DevOps",
};

export function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((word, index) => {
      const label = WORD_LABELS[word];
      if (label) {
        return label;
      }
      if (index > 0 && SMALL_WORDS.has(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
