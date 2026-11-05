"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { GodRays, Pulser, RollingText, orderedDither, randomDither } from "@/components/motion";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { Announcement } from "@/components/announcement";
import { DitherImage } from "@/components/home/dither-image";
import { Halftone } from "@/components/home/halftone";
import { PhosphorIcon } from "@/components/home/phosphor-icon";
import styles from "@/components/home/home.module.css";

const NBSP = "\u00A0";

const benefits = [
  {
    title: "Better user experience",
    body: "Load pages in milliseconds.\nKeep visitors coming back.",
    src: "/home/benefit-wand.png",
    label: "Dithered version of web screen with a magic wand with random dithering applied",
  },
  {
    title: "Improved SEO",
    body: "Rank higher on Google.\nStand out from competitors.",
    src: "/home/benefit-podium.png",
    label: "Dithered version of podium with #1 text with random dithering applied",
  },
  {
    title: "Increased conversion",
    body: "Turn visitors into customers.\nBoost your bottom line.",
    src: "/home/benefit-lightning.png",
    label: "Dithered version of lightning with lines around with random dithering applied",
  },
  {
    title: "Cost savings",
    body: "Reduce hosting expenses.\nEliminate performance headaches.",
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

const logoColumns = [
  ["/home/logo-1.svg", "/home/logo-4.svg"],
  ["/home/logo-2.svg", "/home/logo-5.svg"],
  ["/home/logo-3.svg", "/home/logo-6.svg"],
] as const;

const logoPhases = [
  [0, 0, 0],
  [1, 0, 0],
  [1, 1, 0],
  [1, 1, 1],
  [0, 1, 1],
  [0, 0, 1],
  [0, 0, 0],
] as const;

const logoWaits = [1000, 100, 100, 2000, 100, 100, 1000];

const spring = { type: "spring" as const, duration: 0.6, bounce: 0 };
const logoSpring = { type: "spring" as const, duration: 0.6, bounce: 0 };

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

function Check({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true" className={styles.check}>
      <g
        transform="translate(6.5 8) rotate(180 5.75 4)"
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 8 L7.784 0" />
        <path d="M1.773 0 H8 V6.4" />
      </g>
    </svg>
  );
}

function QuoteMark() {
  const bubble =
    "M0 6.988C0 6.926.006 6.866.016 6.807H0V6.698C0 2.999 2.999 0 6.698 0v2.687C4.824 2.687 3.291 4.145 3.17 5.988H6.698V13H0Z";
  return (
    <svg viewBox="0 0 24 24" width="68" height="68" aria-hidden="true" className={styles.mark}>
      <g transform="translate(4 5)" fill="#00e6c5">
        <path d={bubble} />
        <path d={bubble} transform="translate(9.302 0)" />
      </g>
    </svg>
  );
}

export function HomePage() {
  const reduced = usePrefersReducedMotion();
  const [logoPhase, setLogoPhase] = useState(0);
  const [phase, setPhase] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const drag = useRef<{ x: number; id: number } | null>(null);
  const active = phases[phase];

  useEffect(() => {
    if (reduced !== false) {
      return;
    }
    const timer = window.setTimeout(() => {
      setLogoPhase((current) => (current + 1) % logoPhases.length);
    }, logoWaits[logoPhase]);
    return () => window.clearTimeout(timer);
  }, [logoPhase, reduced]);

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

  const logos = logoPhases[logoPhase];

  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`${styles.frame} ${styles.dash} ${styles.heroFrame}`}>
          <div className={styles.heroMedia}>
            <div className={styles.heroShafts}>
              <div className={styles.heroGlow}>
                <GodRays
                  paper
                  centerIntensity={0.57}
                  centerSize={0.8}
                  label="Hero background"
                />
              </div>
              <div className={styles.grain} />
            </div>
          </div>
          <Announcement />
          <div className={styles.heroCopy}>
            <h1 id="hero-title">Lightning fast sites. In a single click.</h1>
            <p>No code, no hassle. Jet simply keeps your website blazing fast 24/7.</p>
          </div>
          <div className={styles.actions}>
            <RollLink href="/waitlist" text={`Join${NBSP}waitlist`} tone="primary" />
            <RollLink href="/#benefits" text="Learn more" tone="secondary" />
          </div>
        </div>
      </section>

      <section className={styles.social} aria-label="Trusted by some of the biggest companies">
        <div className={`${styles.frame} ${styles.dash} ${styles.socialFrame}`}>
          <p>Trusted by some of the biggest companies</p>
          <div className={styles.logoStage}>
            {logoColumns.map((column, index) => (
              <div className={styles.logoCol} key={column[0]}>
                <motion.div
                  className={styles.logoTrack}
                  animate={{ y: logos[index] === 0 ? "0%" : "-50%" }}
                  transition={reduced === false ? logoSpring : { duration: 0 }}
                >
                  {column.map((src) => (
                    <div className={styles.logoSlot} key={src}>
                      <img src={src} alt="" height={20} />
                    </div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="benefits" aria-labelledby="benefits-title">
        <div className={`${styles.frame} ${styles.dash}`}>
          <div className={styles.bandHead}>
            <h2 id="benefits-title">Accelerate your website with Jet.</h2>
          </div>
          <div className={styles.benefitGrid}>
            {benefits.map((benefit) => (
              <article className={styles.benefit} key={benefit.title}>
                <DitherImage src={benefit.src} label={benefit.label} preset={randomDither} />
                <div className={styles.benefitCopy}>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="process-title">
        <div className={`${styles.frame} ${styles.dash}`}>
          <div className={styles.bandHead}>
            <h2 id="process-title">Get started in 3 simple steps.</h2>
          </div>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.title}>
                <span className={styles.stepIcon}>
                  <PhosphorIcon name={step.icon} />
                </span>
                <div className={styles.stepText}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepBody}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section} aria-label="Features">
        <div className={`${styles.frame} ${styles.dash}`}>
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
                <div className={styles.featureFrame}>
                  <DitherImage src={feature.src} label={feature.label} preset={orderedDither} />
                </div>
              </div>
            </article>
          ))}
          <ul className={styles.tiles}>
            {tiles.map((tile) => (
              <li key={tile.title}>
                <span className={styles.tileIcon}>
                  <PhosphorIcon name={tile.icon} />
                </span>
                <h2>{tile.title}</h2>
                <p>{tile.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className={styles.section}
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
        <div className={`${styles.frame} ${styles.dash}`}>
        <div className={styles.bandHead}>
          <h2 id="quotes-title">Customers see instant results.</h2>
        </div>
        <div className={styles.featured}>
          <div className={styles.portrait}>
            <Halftone
              src={featuredSlides[active.featured].image}
              label={`Portrait of ${featuredSlides[active.featured].name}`}
            />
          </div>
          <div className={styles.featuredCopy}>
            <div className={styles.stack}>
              {featuredSlides.map((slide, index) => (
                <motion.div
                  key={`${slide.name}-${index}`}
                  className={index === active.featured ? styles.slideOn : styles.slideOff}
                  animate={{ opacity: index === active.featured ? 1 : 0 }}
                  transition={reduced === false ? spring : { duration: 0 }}
                  aria-hidden={index === active.featured ? undefined : true}
                >
                  <div className={styles.quoteTop}>
                    <QuoteMark />
                    <h3>{slide.quote}</h3>
                  </div>
                  <div>
                    <p className={styles.featuredName}>{slide.name}</p>
                    <p className={styles.featuredRole}>{slide.role}</p>
                  </div>
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
                        <span className={styles.cardName}>{slide.name}</span>
                        <span className={styles.cardRole}>{slide.role}</span>
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="faq-title">
        <div className={`${styles.frame} ${styles.dash} ${styles.faqGrid}`}>
        <h2 id="faq-title">Frequently asked questions.</h2>
        <div>
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
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title">
        <div className={`${styles.frame} ${styles.dash} ${styles.ctaCard}`}>
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
