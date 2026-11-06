"use client";

import Link from "next/link";
import { useState } from "react";
import { DitherImage } from "@/components/home/dither-image";
import { GodRays, Pulser, RollingText, orderedDither } from "@/components/motion";
import styles from "@/components/about/about.module.css";

const NBSP = "\u00A0";

const portraitDither = {
  ...orderedDither,
  animation: false,
  intensity: 10,
  interval: 0.08,
  brightness: -20,
  pixelSize: 3,
  threshold: 84,
  midtones: 100,
  glow: 30,
};

const portraitHoverDither = {
  ...portraitDither,
  animation: true,
  intensity: 5,
  interval: 0.08,
};

const postDither = {
  ...orderedDither,
  animation: false,
  brightness: -46,
  pixelSize: 2,
  threshold: 116,
  midtones: 56,
  glow: 2,
};

const people = [
  {
    name: "Grace Lee",
    role: "SEO Strategist",
    image: "/about/grace.png",
  },
  {
    name: "Sofia Almeida",
    role: "Customer Success Lead",
    image: "/about/sofia.png",
  },
  {
    name: "Tomasz Zielinski",
    role: "Frontend Architect",
    image: "/about/tomasz.png",
  },
  {
    name: "Priya Mehra",
    role: "Product Marketing Manager",
    image: "/about/priya.png",
  },
  {
    name: "Daniel Cooper",
    role: "Lead Solutions Engineer",
    image: "/about/daniel.png",
  },
  {
    name: "Emma Novak",
    role: "Performance Analyst",
    image: "/about/emma.png",
  },
] as const;

const powers = [
  {
    title: `Image & code optimization${NBSP}`,
    body: "Sharper visuals, cleaner code",
    icon: "image",
  },
  {
    title: `Global CDN integration${NBSP}`,
    body: "Fast delivery, everywhere",
    icon: "globe",
  },
  {
    title: `Real-time speed analytics${NBSP}`,
    body: "Instant insights, always on",
    icon: "chart",
  },
  {
    title: "Instant performance alerts",
    body: "Stay updated, act quickly",
    icon: "bell",
  },
] as const;

const posts = [
  {
    href: "/blog/why-website-speed-matters-more-than-ever-in-2025",
    tag: "Performance",
    title: "Why Website Speed Matters More Than Ever in 2025",
    date: "Jun 7, 2025",
    image: "/about/post-speed.png",
  },
  {
    href: "/blog/image-optimization-the-secret-to-lightning-fast-sites",
    tag: "Optimization",
    title: "Image Optimization: The Secret to Lightning-Fast Sites",
    date: "May 26, 2025",
    image: "/about/post-images.png",
  },
] as const;

function Portrait({
  person,
}: {
  person: (typeof people)[number];
}) {
  const [hot, setHot] = useState(false);

  return (
    <a
      href="https://x.com"
      target="_blank"
      rel="noreferrer"
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => setHot(false)}
      onFocus={() => setHot(true)}
      onBlur={() => setHot(false)}
    >
      <span className={styles.photo}>
        <DitherImage
          src={person.image}
          label={`Portrait of ${person.name}`}
          preset={hot ? portraitHoverDither : portraitDither}
        />
      </span>
      <div className={styles.caption}>
        <h3>{person.name}</h3>
        <p className={styles.role}>
          <span className={styles.slash} aria-hidden="true">
            /
          </span>
          <span className={styles.roleText}>{person.role}</span>
        </p>
      </div>
    </a>
  );
}

function RollLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  const [rolling, setRolling] = useState(false);

  return (
    <Link
      href={href}
      className={styles.button}
      onPointerEnter={() => setRolling(true)}
      onPointerLeave={() => setRolling(false)}
      onFocus={() => setRolling(true)}
      onBlur={() => setRolling(false)}
    >
      <RollingText text={text} rolling={rolling} />
    </Link>
  );
}

function PowerIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 256 256",
    width: 24,
    height: 24,
    fill: "currentColor",
    "aria-hidden": true as const,
  };

  if (name === "image") {
    return (
      <svg {...common}>
        <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172.69l52-52,80,80H40Zm176,27.31H145.66l-22.83-22.83,20-20,53.17,53.17ZM100,84A20,20,0,1,1,80,104,20,20,0,0,1,100,84Z" />
      </svg>
    );
  }

  if (name === "globe") {
    return (
      <svg {...common}>
        <path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm87.62,96H175.8c-1.79-36.51-15.86-62.33-27.39-77.6A88.2,88.2,0,0,1,215.62,120ZM96.22,136h63.56c-1.81,41.62-22.28,67.11-31.78,75.35C118.5,203.11,98,177.62,96.22,136ZM128,40.66c12.83,16.91,25.17,45.36,27.16,79.34H100.84C102.83,86,115.17,57.57,128,40.66ZM40.38,120H80.2c1.79-36.51,15.86-62.33,27.39-77.6A88.2,88.2,0,0,0,40.38,120ZM80.2,136H40.38a88.2,88.2,0,0,0,67.21,77.6C96.06,198.33,82,172.51,80.2,136Zm96,0c-1.79,36.51-15.86,62.33-27.39,77.6A88.2,88.2,0,0,0,215.62,136Z" />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg {...common}>
        <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,136H40V56H216ZM104,120v40a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32-16v56a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32-16v72a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M224,71.1a8,8,0,0,1-10.78-3.42,94.13,94.13,0,0,0-33.46-36.91,8,8,0,1,1,8.54-13.54,111.46,111.46,0,0,1,39.12,43.09A8,8,0,0,1,224,71.1ZM53.89,48.24A8,8,0,0,0,62.43,34.7a94.13,94.13,0,0,0-33.46,36.91A8,8,0,1,0,43.75,60.8,111.36,111.36,0,0,1,53.89,48.24ZM221.84,167.36A79.76,79.76,0,0,1,200,200H56a79.76,79.76,0,0,1-21.84-32.64A8,8,0,0,0,20,172.8,96,96,0,0,0,56,208v8a16,16,0,0,0,16,16h16a16,16,0,0,0,16-16v-8h48v8a16,16,0,0,0,16,16h16a16,16,0,0,0,16-16v-8a96,96,0,0,0,36-35.2,8,8,0,0,0-14.16-5.44ZM128,24a72.08,72.08,0,0,0-72,72v40a8,8,0,0,0,8,8H192a8,8,0,0,0,8-8V96A72.08,72.08,0,0,0,128,24Z" />
    </svg>
  );
}

export function AboutPage() {
  return (
    <div className={styles.about}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.frame}>
          <div className={styles.band} aria-hidden="true">
            <div className={styles.bandRays}>
              <GodRays
                label=""
                shader
                speed={5}
                frequency={0.1}
                offsetY={1.2}
                spotty={5}
                density={0.5}
                centerIntensity={0.57}
                centerSize={0.8}
              />
              <div className={styles.grain} />
            </div>
          </div>
          <div className={styles.heroCopy}>
            <h1 id="about-title">Jet is unlocking a faster, simpler web for everyone.</h1>
            <p>
              Lightning-fast performance for every website—find the perfect plan for your needs and
              scale with ease.
            </p>
          </div>
          <div className={styles.band} aria-hidden="true">
            <div className={styles.bandRays}>
              <GodRays
                label=""
                shader
                speed={5}
                frequency={0.1}
                offsetY={1.2}
                spotty={5}
                density={0.5}
                centerIntensity={0.57}
                centerSize={0.8}
              />
              <div className={styles.grain} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.block} aria-labelledby="mission-title">
        <div className={`${styles.frame} ${styles.mission}`}>
          <h2 id="mission-title">Our mission.</h2>
          <div className={styles.missionCopy}>
            <p>
              {"At Jet, we believe every millisecond matters. In a world where digital experiences shape first impressions, speed isn’t just a technical detail—"}<span className={styles.bright}>it’s a competitive advantage</span>{". A fast website keeps visitors engaged, builds trust, and drives real results for businesses of all sizes."}
            </p>
            <p>
              {"Our mission is to "}<span className={styles.bright}>empower creators, businesses, and agencies</span>{" to deliver lightning-fast, high-performing websites. We’re passionate about removing the barriers that slow teams down, making advanced optimization accessible to everyone, regardless of technical background."}
            </p>
            <p>
              {"With Jet, you don’t need to be a developer or performance expert to have a world-class site. Our platform "}<span className={styles.bright}>handles everything behind the scenes</span>{", from image and code optimization to global content delivery and real-time analytics, so you can focus on what matters most: building, creating, and growing."}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.block} aria-labelledby="powers-title">
        <div className={styles.frame}>
          <div className={styles.powersHead}>
            <h2 id="powers-title">How Jet powers a faster web.</h2>
            <p>
              Jet is an all-in-one platform for automatic website optimization. We handle everything
              behind the scenes, so you can focus on building, not troubleshooting.
            </p>
          </div>
          <ul className={styles.powers}>
            {powers.map((item) => (
              <li key={item.body}>
                <span className={styles.powerIcon}>
                  <PowerIcon name={item.icon} />
                </span>
                <p className={styles.powerTitle}>{item.title}</p>
                <p className={styles.powerBody}>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.block} aria-labelledby="team-title">
        <div className={styles.frame}>
          <div className={styles.teamHead}>
            <h2 id="team-title">
              We&apos;re a team obsessed with speed, simplicity, and user experience.
            </h2>
            <p>
              Meet At Jet, we’re performance fanatics and creative problem-solvers from SaaS,
              e-commerce, and design backgrounds. We work together, put users first, and build
              features that make the web faster and empower creators. Our goal: a platform as fast
              and friendly as the sites we help you create. team.
            </p>
          </div>
          <ul className={styles.team}>
            {people.map((person) => (
              <li key={person.name}>
                <Portrait person={person} />
              </li>
            ))}
          </ul>
          <div className={styles.hiring}>
            <h2>
              We’re always <span className={styles.bright}>looking for people to join us</span>{" "}
              making the web simpler, and faster for everyone.
            </h2>
            <RollLink href="/careers#open-roles" text={`Open${NBSP}positions`} />
          </div>
        </div>
      </section>

      <section className={styles.block} aria-labelledby="posts-title">
        <div className={styles.frame}>
          <div className={styles.postsHead}>
            <h2 id="posts-title">Read our posts</h2>
            <Link href="/blog" className={styles.viewAll}>
              View all
              <span className={styles.viewIcon} aria-hidden="true">
                <svg viewBox="0 0 12 12" width="12" height="12">
                  <path
                    d="M4.2 2.2 L7.8 6 L4.2 9.8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
          <ul className={styles.posts}>
            {posts.map((post) => (
              <li key={post.href}>
                <Link href={post.href}>
                  <span className={styles.postArt} aria-hidden="true">
                    <DitherImage src={post.image} label="" preset={postDither} />
                  </span>
                  <span className={styles.postCopy}>
                    <span className={styles.tag}>{post.tag}</span>
                    <h3>{post.title}</h3>
                    <span className={styles.date}>{post.date}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.block} aria-labelledby="about-cta">
        <div className={`${styles.frame} ${styles.cta}`}>
          <div className={styles.ctaMedia} aria-hidden="true">
            <Pulser />
            <div className={styles.grain} />
          </div>
          <div className={styles.ctaCopy}>
            <h2 id="about-cta">Boost your site speed today.</h2>
            <p>Try Jet now—one click, instant performance. No risk, cancel anytime.</p>
            <RollLink href="/waitlist" text={`Join${NBSP}waitlist`} />
          </div>
        </div>
      </section>
    </div>
  );
}
