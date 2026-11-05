"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { GodRays, Pulser, RollingText, orderedDither, randomDither } from "@/components/motion";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { DitherImage } from "@/components/home/dither-image";
import styles from "@/components/home/home.module.css";

const NBSP = "\u00A0";

const benefits = [
  {
    title: "Better user experience",
    body: "Load pages in milliseconds. Keep visitors coming back.",
    src: "/home/benefit-wand.png",
    label: "Dithered version of web screen with a magic wand with random dithering applied",
  },
  {
    title: "Improved SEO",
    body: "Rank higher on Google. Stand out from competitors.",
    src: "/home/benefit-podium.png",
    label: "Dithered version of podium with #1 text with random dithering applied",
  },
  {
    title: "Increased conversion",
    body: "Turn visitors into customers. Boost your bottom line.",
    src: "/home/benefit-lightning.png",
    label: "Dithered version of lightning with lines around with random dithering applied",
  },
  {
    title: "Cost savings",
    body: "Reduce hosting expenses. Eliminate performance headaches.",
    src: "/home/benefit-coins.png",
    label: "Dithered version of stacked coins with random dithering applied",
  },
] as const;

const steps = [
  {
    title: "Enter your URL",
    body: "Quick setup, ready to optimize",
    icon: "link",
  },
  {
    title: "Start optimiztaion",
    body: "Analyze and enhance your site",
    icon: "wand",
  },
  {
    title: "Speed takes off",
    body: "Faster loading, better results",
    icon: "rocket",
  },
] as const;

const features = [
  {
    eyebrow: "Image Optimization",
    color: "#00e6c5",
    title: "Images that load in miliseconds.",
    body: "Automatic optimization for every visual asset on your site.",
    points: [
      "Automatic image compression",
      "Next-gen format conversion (WebP, AVIF)",
      "Lazy loading implementation",
      "Responsive image sizing",
    ],
    src: "/home/feature-settings.png",
    label: "Dithered version of optimized settings with ordered dithering applied",
    flip: false,
  },
  {
    eyebrow: "Code Optimization",
    color: "#d85ce0",
    title: "Clean code that just runs faster.",
    body: "Smart optimization that improves performance instantly.",
    points: [
      "JavaScript and CSS minification",
      "HTML optimization",
      "Remove unused code",
      "Combine files automatically",
    ],
    src: "/home/feature-computer.png",
    label: "Dithered version of old computer device with ordered dithering applied",
    flip: true,
  },
  {
    eyebrow: "Speed Technologies",
    color: "#29c2ff",
    title: "Built for speed. Scaled for growth.",
    body: "Fast loading no matter how many visitors you have.",
    points: [
      "Global CDN integration",
      "Browser caching setup",
      "GZIP compression",
      "DNS pre-fetching",
    ],
    src: "/home/feature-rocket.png",
    label: "Dithered version of launching rocket with ordered dithering applied",
    flip: false,
  },
  {
    eyebrow: "Analytics & Monitoring",
    color: "#e0cd3a",
    title: "Performance data you can trust.",
    body: "Real-time insights that help you make better decisions.",
    points: [
      "Real-time speed monitoring",
      "Google PageSpeed integration",
      "Mobile vs Desktop insights",
      "Competitor comparison",
    ],
    src: "/home/feature-satellite.png",
    label: "Dithered version of monitoring satellite with ordered dithering applied",
    flip: true,
  },
] as const;

const tiles = [
  {
    title: "One-click optimize",
    body: "Make your site faster instantly",
    icon: "bolt",
  },
  {
    title: "Code cleanup",
    body: "Remove bloat for better performance",
    icon: "broom",
  },
  {
    title: "24/7 monitoring",
    body: "Always watching your site's performance",
    icon: "chart",
  },
  {
    title: "Real-time alerts",
    body: "Know about issues right away",
    icon: "bell",
  },
] as const;

type Person = {
  quote: string;
  name: string;
  role: string;
  image: string;
  tint: string;
};

const tom: Person = {
  quote: `“We${NBSP}saved on${NBSP}hosting and boosted conversions just by${NBSP}running Jet.”`,
  name: "Tom Sullivan",
  role: "Agency Lead",
  image: "/home/tom.jpg",
  tint: "#00e6c5",
};

const luca: Person = {
  quote: "“My shop now loads in under a second. Jet is the only tool I needed.”",
  name: "Luca Rossi",
  role: "E-commerce Owner",
  image: "/home/luca.jpg",
  tint: "#29c2ff",
};

const alex: Person = {
  quote: `“Jet transformed our entire workflow. We${NBSP}cut load times by${NBSP}80% and our development team couldn’t be${NBSP}happier.”`,
  name: "Alex Chen",
  role: "Founder @ Gropa",
  image: "/home/alex.jpg",
  tint: "#7d8cff",
};

const maya: Person = {
  quote: "“Click, done. Pagespeed jumped, bounce rates dropped. Killer ROI.”",
  name: "Maya Thompson",
  role: "Content Marketer",
  image: "/home/maya.jpg",
  tint: "#d85ce0",
};

const sarah: Person = {
  quote: `Our client websites went from sluggish to${NBSP}lightning-fast overnight. Jet’s optimization is${NBSP}pure magic for SEO rankings.”`,
  name: "Sarah Martinez",
  role: "Marketing Director",
  image: "/home/sarah.jpg",
  tint: "#ff5cab",
};

const nia: Person = {
  quote: "“No tech skills, no plugins. Jet just made my portfolio fast on any device.”",
  name: "Nia Patel",
  role: "Designer",
  image: "/home/nia.jpg",
  tint: "#e0cd3a",
};

const james: Person = {
  quote: `“I${NBSP}used to${NBSP}spend hours optimizing each site. With Jet, it’s automatic. My${NBSP}clients get amazing performance without the extra work.”`,
  name: "James Wilson",
  role: "Freelance Developer",
  image: "/home/james.jpg",
  tint: "#86ee02",
};

const featuredSlides: Person[] = [tom, luca, alex, luca];
const cardColumns: Person[][] = [
  [luca, alex, luca],
  [maya, sarah, maya],
  [nia, james, nia],
];

const phases = [
  { ms: 2500, cols: [0, 0, 0], featured: 0 },
  { ms: 100, cols: [1, 0, 0], featured: 1 },
  { ms: 100, cols: [1, 1, 0], featured: 1 },
  { ms: 5000, cols: [1, 1, 1], featured: 1 },
  { ms: 100, cols: [2, 1, 1], featured: 2 },
  { ms: 100, cols: [2, 2, 1], featured: 2 },
  { ms: 2500, cols: [0, 0, 0], featured: 0 },
] as const;

const faqs = [
  {
    q: "Do I need coding skills?",
    a: "Not at all—just enter your website URL and Jet handles the rest automatically.",
  },
  {
    q: "What platforms does Jet support?",
    a: "All major website builders (WordPress, Shopify, Wix, Squarespace) and custom sites.",
  },
  {
    q: "Will my site stay optimized?",
    a: "Jet runs 24/7, constantly monitoring and optimizing as your site and traffic change.",
  },
  {
    q: "Is it safe to use Jet?",
    a: "Yes—we never modify your original files and can instantly reverse any changes if needed.",
  },
  {
    q: "How fast will I see results?",
    a: "Most sites see improvement in seconds, with full optimization within 5 minutes.",
  },
] as const;

const logoSets = [
  ["/home/logo-1.svg", "/home/logo-2.svg", "/home/logo-3.svg"],
  ["/home/logo-4.svg", "/home/logo-5.svg", "/home/logo-6.svg"],
];

const spring = { type: "spring" as const, duration: 0.6, bounce: 0 };

function RollLink({
  href,
  text,
  tone,
}: {
  href: string;
  text: string;
  tone: "primary" | "secondary";
}) {
  const [rolling, setRolling] = useState(false);

  return (
    <Link
      href={href}
      className={tone === "primary" ? styles.buttonPrimary : styles.buttonSecondary}
      onPointerEnter={() => setRolling(true)}
      onPointerLeave={() => setRolling(false)}
      onFocus={() => setRolling(true)}
      onBlur={() => setRolling(false)}
    >
      <RollingText text={text} rolling={rolling} />
    </Link>
  );
}

function Icon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 24,
    height: 24,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "link") {
    return (
      <svg {...common}>
        <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
        <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2a5 5 0 0 0 7.1 7.1l1.1-1.1" />
      </svg>
    );
  }
  if (name === "wand") {
    return (
      <svg {...common}>
        <path d="M15 4l5 5" />
        <path d="M14 5l-9 9 2 2 9-9z" />
        <path d="M5 19l2 2" />
        <path d="M4 8v2M8 4h2M18 14v2M14 18h2" />
      </svg>
    );
  }
  if (name === "rocket") {
    return (
      <svg {...common}>
        <path d="M12 15c-3 0-6-3-6-7 4-1 7 1 8 3 2-1 4-4 4-8-4 1-7 4-8 7-1-1-3-1-4-1 0 3 2 6 6 6z" />
        <path d="M9 14l-3 3 1-4" />
        <path d="M14 12l4-1-3 4" />
        <circle cx="13" cy="8" r="1" />
      </svg>
    );
  }
  if (name === "bolt") {
    return (
      <svg {...common}>
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    );
  }
  if (name === "broom") {
    return (
      <svg {...common}>
        <path d="M14 4l6 6" />
        <path d="M4 20c2-4 5-6 10-8l2-2-2-2-8 10z" />
        <path d="M8 16l2 2" />
      </svg>
    );
  }
  if (name === "chart") {
    return (
      <svg {...common}>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 16v-4M12 16V8M16 16v-6" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M6 9a6 6 0 0 1 12 0c0 7 2 7 2 9H4c0-2 2-2 2-9" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

function Check({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={styles.check}>
      <path
        d="M3 8.2l3.2 3.2L13 4.6"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomePage() {
  const reduced = usePrefersReducedMotion();
  const [logoSet, setLogoSet] = useState(0);
  const [phase, setPhase] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const drag = useRef<{ x: number; id: number } | null>(null);
  const active = phases[phase];

  useEffect(() => {
    if (reduced !== false) {
      return;
    }
    const timer = window.setTimeout(() => {
      setLogoSet((current) => (current + 1) % logoSets.length);
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [logoSet, reduced]);

  useEffect(() => {
    if (reduced !== false) {
      return;
    }
    const timer = window.setTimeout(() => {
      setPhase((current) => (current + 1) % phases.length);
    }, active.ms);
    return () => window.clearTimeout(timer);
  }, [active.ms, phase, reduced]);

  function stepCarousel(direction: number) {
    setPhase((current) => (current + direction + phases.length) % phases.length);
  }

  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroMedia}>
          <div className={styles.heroFilter}>
            <div className={styles.heroWash}>
              <GodRays label="Hero background" />
            </div>
            <div className={styles.heroLines}>
              <GodRays label="Hero ray lines" />
            </div>
            <div className={styles.grain} />
          </div>
        </div>
        <div className={styles.heroCopy}>
          <h1 id="hero-title">
            Lightning <br className={styles.phoneBreak} />
            fast sites. In <br className={styles.phoneBreak} />a single click.
          </h1>
          <p>No code, no hassle. Jet simply keeps your website blazing fast 24/7.</p>
          <div className={styles.actions}>
            <RollLink href="/waitlist" text={`Join${NBSP}waitlist`} tone="primary" />
            <RollLink href="/#benefits" text="Learn more" tone="secondary" />
          </div>
        </div>
      </section>

      <section className={styles.social} aria-label="Trusted by some of the biggest companies">
        <p>Trusted by some of the biggest companies</p>
        <div className={styles.logoStage}>
          {logoSets.map((set, index) => (
            <div
              className={index === logoSet ? styles.logoRowOn : styles.logoRow}
              key={set.join("-")}
            >
              {set.map((src) => (
                <img key={src} src={src} alt="" height={20} />
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.band} id="benefits" aria-labelledby="benefits-title">
        <h2 id="benefits-title">Accelerate your website with Jet.</h2>
        <div className={styles.benefitGrid}>
          {benefits.map((benefit) => (
            <article className={styles.benefit} key={benefit.title}>
              <div className={styles.benefitArt}>
                <DitherImage
                  src={benefit.src}
                  label={benefit.label}
                  preset={{ ...randomDither, brightness: 0, threshold: 152, midtones: 28 }}
                />
              </div>
              <div className={styles.benefitCopy}>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.band} aria-labelledby="process-title">
        <h2 id="process-title">Get started in 3 simple steps.</h2>
        <ol className={styles.steps}>
          {steps.map((step) => (
            <li key={step.title}>
              <span className={styles.stepIcon}>
                <Icon name={step.icon} />
              </span>
              <p className={styles.stepTitle}>{step.title}</p>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.features} aria-label="Features">
        {features.map((feature) => (
          <article
            className={feature.flip ? styles.featureFlip : styles.feature}
            key={feature.eyebrow}
          >
            <div className={styles.featureCopy}>
              <p className={styles.eyebrow} style={{ color: feature.color }}>
                {feature.eyebrow}
              </p>
              <h2>{feature.title}</h2>
              <p className={styles.featureBody}>{feature.body}</p>
              <ul className={styles.checks}>
                {feature.points.map((point) => (
                  <li key={point}>
                    <Check color={feature.color} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.featureArt}>
              <DitherImage src={feature.src} label={feature.label} preset={orderedDither} />
            </div>
          </article>
        ))}
        <ul className={styles.tiles}>
          {tiles.map((tile) => (
            <li key={tile.title}>
              <span className={styles.tileIcon}>
                <Icon name={tile.icon} />
              </span>
              <h2>{tile.title}</h2>
              <p>{tile.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className={styles.quotes}
        aria-labelledby="quotes-title"
        onPointerDown={(event) => {
          drag.current = { x: event.clientX, id: event.pointerId };
        }}
        onPointerUp={(event) => {
          if (!drag.current || drag.current.id !== event.pointerId) {
            return;
          }
          const delta = event.clientX - drag.current.x;
          drag.current = null;
          if (Math.abs(delta) > 48) {
            stepCarousel(delta < 0 ? 1 : -1);
          }
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <h2 id="quotes-title">Customers see instant results.</h2>
        <div className={styles.featured}>
          <div className={styles.portrait}>
            <DitherImage
              src={featuredSlides[active.featured].image}
              label={`Portrait of ${featuredSlides[active.featured].name}`}
              preset={{ ...orderedDither, brightness: 20, threshold: 78, midtones: 90, pixelSize: 2 }}
            />
          </div>
          <div className={styles.featuredCopy}>
            <span className={styles.mark} aria-hidden="true">
              “
            </span>
            <div className={styles.stack}>
              {featuredSlides.map((slide, index) => (
                <motion.div
                  key={`${slide.name}-${index}`}
                  className={index === active.featured ? styles.slideOn : styles.slideOff}
                  animate={{ opacity: index === active.featured ? 1 : 0 }}
                  transition={reduced === false ? spring : { duration: 0 }}
                  aria-hidden={index === active.featured ? undefined : true}
                >
                  <h3>{slide.quote}</h3>
                  <p className={styles.person}>{slide.name}</p>
                  <p className={styles.role}>{slide.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.cards}>
          {cardColumns.map((column, columnIndex) => (
            <article className={styles.card} key={column[0].name}>
              <div className={styles.stack}>
                {column.map((slide, index) => (
                  <motion.div
                    key={`${slide.name}-${index}`}
                    className={index === active.cols[columnIndex] ? styles.slideOn : styles.slideOff}
                    animate={{ opacity: index === active.cols[columnIndex] ? 1 : 0 }}
                    transition={reduced === false ? spring : { duration: 0 }}
                    aria-hidden={index === active.cols[columnIndex] ? undefined : true}
                  >
                    <h3>{slide.quote}</h3>
                    <div className={styles.who}>
                      <span className={styles.avatar} style={{ background: slide.tint }}>
                        <img src={slide.image} alt="" width={40} height={40} />
                      </span>
                      <span>
                        <span className={styles.person}>{slide.name}</span>
                        <span className={styles.role}>{slide.role}</span>
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="faq-title">
        <h2 id="faq-title">Frequently asked questions.</h2>
        <div className={styles.faqList}>
          {faqs.map((item, index) => {
            const open = openFaq === index;
            const answerId = `faq-answer-${index}`;
            return (
              <div className={styles.faqItem} key={item.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={answerId}
                    onClick={() => setOpenFaq(open ? null : index)}
                  >
                    <span>{item.q}</span>
                    <span className={open ? styles.plusOpen : styles.plus} aria-hidden="true" />
                  </button>
                </h3>
                <motion.div
                  id={answerId}
                  className={styles.faqAnswer}
                  initial={false}
                  animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                  transition={
                    reduced === false
                      ? { type: "spring", duration: 0.4, bounce: 0 }
                      : { duration: 0 }
                  }
                >
                  <p>{item.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title">
        <div className={styles.ctaCard}>
          <div className={styles.ctaMedia}>
            <Pulser />
            <div className={styles.grain} />
          </div>
          <div className={styles.ctaCopy}>
            <h2 id="cta-title">Boost your site speed today.</h2>
            <p>Try Jet now—one click, instant performance. No risk, cancel anytime.</p>
            <RollLink href="/waitlist" text={`Join${NBSP}waitlist`} tone="primary" />
          </div>
        </div>
      </section>
    </div>
  );
}
