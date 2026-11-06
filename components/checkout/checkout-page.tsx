"use client";

import { useState } from "react";
import { RollingText } from "@/components/motion";
import styles from "@/components/checkout/checkout.module.css";

/**
 * https://jet.framer.website/checkout is the template purchase card.
 * It is not a redirect and not a card form. Get access keeps the
 * published Whop URL. Nothing on this page charges a card.
 */
const ACCESS_HREF = "https://whop.com/checkout/plan_gIldr5rd6rTY3";
const ASK_DESKTOP = "https://dub.link/jet-ask-desktop";
const ASK_MOBILE = "https://dub.link/jet-ask-mobile";
const TWEET = "https://x.com/WebsitesByKris/status/1935991610325561365";

const PLANS = [
  { id: "once", price: "$149", detail: "Single payment" },
  { id: "split", price: "$79/month", detail: "2 payments" },
] as const;

const templatePoints = [
  'Unlocks 25% off discount on the "Pro" Framer plan',
  "Optimized for conversions",
  "14 fully responsive pages",
  "Optional waitlist page (if\u00A0you haven’t launched yet)",
  "Login & Get started buttons in case you already have an app",
  "Easy customization",
  "SEO optimized",
];

const copywriter = [
  "Conversion optimized copy",
  "Content for everything (even for your call to action buttons)",
];

const styleGuide = [
  "Generate custom illustrations in consistent style",
  "Compatible with GPT-4o",
  "Built-in post processing on the website for stunning visuals",
];

const seo = [
  "Better search engine visibility",
  "Automatic JSON-LD generation (provided AI prompt)",
];

const guide = [
  "How to upload your logo",
  "How to change colors",
  "How to customize the CMS",
  "How to customize the pricing page comparison table",
  "How to receive form submissions",
  "How to write copy FAST",
  "How to use AI for SEO boost",
  "How to buy a site plan & set a custom domain",
];

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path
        d="M3.2 8.3 6.4 11.4 12.8 4.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className={styles.points}>
      {items.map((item) => (
        <li key={item}>
          <Check />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ProductIcon({
  filled,
  paths,
}: {
  filled: boolean;
  paths: ReadonlyArray<readonly [string, string, boolean]>;
}) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" className={styles.productIcon}>
      {paths.map(([d, transform, fill]) =>
        fill && !filled ? null : (
          <path
            key={`${fill ? "f" : "s"}-${transform}-${d.slice(0, 12)}`}
            d={d}
            transform={transform}
            fill={fill ? "#fff" : "none"}
            stroke={fill ? "none" : "#fff"}
            strokeWidth={fill ? undefined : 1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ),
      )}
    </svg>
  );
}

const windowPaths = [
  ["M 16.5 0 C 17.328 0 18 0.672 18 1.5 L 18 12 C 18 12.828 17.328 13.5 16.5 13.5 L 1.5 13.5 C 0.672 13.5 0 12.828 0 12 L 0 1.5 C 0 0.672 0.672 0 1.5 0 Z", "translate(3 4.5)", true],
  ["M 16.5 0 C 17.328 0 18 0.672 18 1.5 L 18 12 C 18 12.828 17.328 13.5 16.5 13.5 L 1.5 13.5 C 0.672 13.5 0 12.828 0 12 L 0 1.5 C 0 0.672 0.672 0 1.5 0 Z", "translate(3 4.5)", false],
  ["M 6 0 L 0 0", "translate(9 21)", false],
] as const;

const dollarPaths = [
  ["M 0 0 L 0 19.5", "translate(12 2.25)", false],
  ["M 11.25 3.75 C 11.25 1.679 9.571 0 7.5 0 L 4.5 0 C 2.429 0 0.75 1.679 0.75 3.75 C 0.75 5.821 2.429 7.5 4.5 7.5 L 8.25 7.5 C 10.321 7.5 12 9.179 12 11.25 C 12 13.321 10.321 15 8.25 15 L 3.75 15 C 1.679 15 0 13.321 0 11.25", "translate(6 4.5)", false],
] as const;

const sparkPaths = [
  ["M 5.65 10.849 L 0.485 8.946 C 0.194 8.839 0 8.561 0 8.25 C 0 7.939 0.194 7.661 0.485 7.553 L 5.65 5.65 L 7.553 0.485 C 7.661 0.194 7.939 0 8.25 0 C 8.561 0 8.839 0.194 8.946 0.485 L 10.849 5.65 L 16.014 7.553 C 16.306 7.661 16.5 7.939 16.5 8.25 C 16.5 8.561 16.306 8.839 16.014 8.946 L 10.849 10.849 L 8.946 16.014 C 8.839 16.306 8.561 16.5 8.25 16.5 C 7.939 16.5 7.661 16.306 7.553 16.014 Z", "translate(2.25 5.25)", true],
  ["M 5.65 10.849 L 0.485 8.946 C 0.194 8.839 0 8.561 0 8.25 C 0 7.939 0.194 7.661 0.485 7.553 L 5.65 5.65 L 7.553 0.485 C 7.661 0.194 7.939 0 8.25 0 C 8.561 0 8.839 0.194 8.946 0.485 L 10.849 5.65 L 16.014 7.553 C 16.306 7.661 16.5 7.939 16.5 8.25 C 16.5 8.561 16.306 8.839 16.014 8.946 L 10.849 10.849 L 8.946 16.014 C 8.839 16.306 8.561 16.5 8.25 16.5 C 7.939 16.5 7.661 16.306 7.553 16.014 Z", "translate(2.25 5.25)", false],
  ["M 0 0 L 0 4.5", "translate(16.5 1.5)", false],
  ["M 0 0 L 0 3", "translate(21 6.75)", false],
  ["M 0 0 L 4.5 0", "translate(14.25 3.75)", false],
  ["M 0 0 L 3 0", "translate(19.5 8.25)", false],
] as const;

const tagPaths = [
  ["M 5.25 0 L 5.25 5.78 C 5.25 5.978 5.171 6.169 5.031 6.309 L 1.81 9.53 C 1.609 9.73 1.312 9.8 1.043 9.71 C 0.774 9.62 0.578 9.386 0.538 9.105 L 0 5.25 Z", "translate(12 11.25)", true],
  ["M 9.749 0 L 3.969 0 C 3.77 0 3.58 0.079 3.439 0.219 L 0.219 3.44 C 0.019 3.641 -0.051 3.938 0.039 4.207 C 0.129 4.476 0.363 4.672 0.644 4.712 L 4.499 5.25 Z", "translate(3.001 6.75)", true],
  ["M 5.115 2.473 C 4.752 3.269 3.53 5.115 0 5.115 C 0 1.585 1.846 0.363 2.642 0 Z", "translate(3.75 15.135)", true],
  ["M 10.417 6.833 C 12.667 4.583 12.807 1.907 12.737 0.713 C 12.713 0.337 12.413 0.037 12.037 0.013 C 10.843 -0.057 8.168 0.082 5.917 2.333 L 0 8.25 L 4.5 12.75 Z", "translate(7.5 3.75)", false],
  ["M 9.749 0 L 3.969 0 C 3.77 0 3.58 0.079 3.439 0.219 L 0.219 3.44 C 0.019 3.641 -0.051 3.938 0.039 4.207 C 0.129 4.476 0.363 4.672 0.644 4.712 L 4.499 5.25 Z", "translate(3.001 6.75)", false],
  ["M 5.25 0 L 5.25 5.78 C 5.25 5.978 5.171 6.169 5.031 6.309 L 1.81 9.53 C 1.609 9.73 1.312 9.8 1.043 9.71 C 0.774 9.62 0.578 9.386 0.538 9.105 L 0 5.25 Z", "translate(12 11.25)", false],
  ["M 5.115 2.473 C 4.752 3.269 3.53 5.115 0 5.115 C 0 1.585 1.846 0.363 2.642 0 Z", "translate(3.75 15.135)", false],
] as const;

const playPaths = [
  ["M 0 0.736 L 0 17.259 C 0.005 17.527 0.153 17.772 0.388 17.902 C 0.623 18.031 0.91 18.025 1.139 17.886 L 14.647 9.625 C 14.866 9.492 15 9.254 15 8.997 C 15 8.741 14.866 8.503 14.647 8.37 L 1.139 0.109 C 0.91 -0.03 0.623 -0.036 0.388 0.093 C 0.153 0.222 0.005 0.468 0 0.736 Z", "translate(6.75 3.003)", true],
  ["M 0 0.736 L 0 17.259 C 0.005 17.527 0.153 17.772 0.388 17.902 C 0.623 18.031 0.91 18.025 1.139 17.886 L 14.647 9.625 C 14.866 9.492 15 9.254 15 8.997 C 15 8.741 14.866 8.503 14.647 8.37 L 1.139 0.109 C 0.91 -0.03 0.623 -0.036 0.388 0.093 C 0.153 0.222 0.005 0.468 0 0.736 Z", "translate(6.75 3.003)", false],
] as const;

function HelpMark() {
  return (
    <span className={styles.help} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="12" height="12">
        <path
          d="M 0 2.627 C 0 1.435 0.823 0 3 0 C 5.177 0 6 1.363 6 2.627 C 6 5.608 3 5.391 3 7.179 L 3 8.968"
          transform="translate(9 5.5)"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 0 0 L 0 0"
          transform="translate(12 17.449)"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function RollLink({
  href,
  text,
  className,
}: {
  href: string;
  text: string;
  className: string;
}) {
  const [rolling, setRolling] = useState(false);

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      onPointerEnter={() => setRolling(true)}
      onPointerLeave={() => setRolling(false)}
      onFocus={() => setRolling(true)}
      onBlur={() => setRolling(false)}
    >
      <RollingText text={text} rolling={rolling} />
    </a>
  );
}

export function CheckoutPage() {
  const [plan, setPlan] = useState<(typeof PLANS)[number]["id"]>("once");

  return (
    <div className={styles.page}>
      <section className={styles.card} aria-label="Buy template">
        <header className={styles.header}>
          <h1>Buy template</h1>
          <p>Choose plan and proceed to checkout.</p>
          <div className={styles.plans} role="group" aria-label="Plan">
            {PLANS.map((item) => {
              const selected = plan === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={selected ? styles.planOn : styles.plan}
                  aria-pressed={selected}
                  onClick={() => setPlan(item.id)}
                >
                  <span className={styles.price}>{item.price}</span>
                  <span className={styles.detail}>{item.detail}</span>
                </button>
              );
            })}
          </div>
        </header>
        <div className={styles.scroller}>
          <div className={styles.videoWrap}>
            <video
              className={styles.video}
              src="/checkout/preview.mp4"
              autoPlay
              muted
              loop
              playsInline
              poster="/checkout/poster.png"
              aria-label="Website template preview"
            />
          </div>
          <article className={styles.block}>
            <div className={styles.titleBlock}>
              <ProductIcon filled paths={windowPaths} />
              <h2>Website Template</h2>
            </div>
            <Points items={templatePoints} />
          </article>
          <p className={styles.kit}>
            Bonus SaaS Launch Kit
            <span>($186 in total value)</span>
          </p>
          <article className={`${styles.block} ${styles.inset}`}>
            <div className={styles.titleBlock}>
              <ProductIcon filled={false} paths={dollarPaths} />
              <h2>
                High Conversion Copywriter <span>($49 Value)</span>
              </h2>
            </div>
            <ol className={styles.steps}>
              <li>Answer a few questions about your business and offerings</li>
              <li>Use the provided AI prompt to generate all content for your website based on your answers</li>
            </ol>
            <Points items={copywriter} />
          </article>
          <article className={`${styles.block} ${styles.inset}`}>
            <div className={styles.titleBlock}>
              <ProductIcon filled paths={sparkPaths} />
              <h2>
                AI Style Guide <span>($29 Value)</span>
              </h2>
            </div>
            <Points items={styleGuide} />
          </article>
          <article className={`${styles.block} ${styles.inset}`}>
            <div className={styles.titleBlock}>
              <ProductIcon filled paths={tagPaths} />
              <div className={styles.seoHead}>
                <h2>
                  SEO Booster
                  <br />
                  JSON-LD Generator <span>($59 Value)</span>
                </h2>
                <HelpMark />
              </div>
            </div>
            <Points items={seo} />
          </article>
          <article className={`${styles.block} ${styles.inset}`}>
            <div className={styles.titleBlock}>
              <ProductIcon filled paths={playPaths} />
              <h2>
                50 Minute Go-Live Video Guide <span>($49 Value)</span>
              </h2>
            </div>
            <Points items={guide} />
          </article>
          <h2 className={styles.saying}>What people are saying</h2>
          <a className={styles.quote} href={TWEET} target="_blank" rel="noreferrer">
            <span className={styles.quoteTop}>
              <img src="/checkout/kris.png" alt="" width={34} height={34} />
              <span>
                <strong>Kris</strong>
                <span className={styles.handle}>@WebsitesByKris</span>
              </span>
            </span>
            <span className={styles.quoteBody}>
              I think you&apos;ve set a new bar here, not just in terms of design, but the whole
              experience from buying to customising!
            </span>
          </a>
          <article className={styles.thread}>
            <div className={styles.threadHead}>
              <img src="/checkout/dylan.png" alt="" width={34} height={34} />
              <strong>Dylan Ott</strong>
            </div>
            <div className={styles.note}>
              <p className={styles.incoming}>
                I love the template bro it&apos;s awesome genuinely the best one so far
              </p>
              <time>12:34 AM</time>
            </div>
            <div className={styles.note}>
              <figure>
                <img src="/checkout/blueprint.png" alt="Blueprint" width={230} height={121} />
                <figcaption>
                  Blueprint
                  <span>https://satisfy-shapeed-402151.framer.app/</span>
                </figcaption>
              </figure>
              <time>12:57 AM</time>
            </div>
            <div className={styles.noteEnd}>
              <p className={styles.outgoing}>yo man thank you so much!</p>
              <time>09:18 AM</time>
            </div>
          </article>
          <a className={styles.quote} href={TWEET} target="_blank" rel="noreferrer">
            <span className={styles.quoteTop}>
              <img src="/checkout/anikin.png" alt="" width={34} height={34} />
              <span>
                <strong>Anikin Jaywalker</strong>
                <span className={styles.handle}>@TJae</span>
              </span>
            </span>
            <span className={styles.quoteBody}>
              Beyond me how well you made this template and I’m always paying attention to what’s
              dropping on the marketplace.
            </span>
          </a>
          <p className={styles.support}>Lifetime updates & email support</p>
          <p className={styles.taxes}>Local taxes may apply at checkout.</p>
        </div>
        <footer className={styles.footer}>
          <p className={styles.offer}>
            Bonus applied: <strong>$186 SaaS Launch Kit for FREE</strong>
          </p>
          <div className={styles.actions}>
            <RollLink className={styles.access} href={ACCESS_HREF} text={"Get\u00A0access"} />
            <RollLink className={styles.askDesktop} href={ASK_DESKTOP} text={"Ask\u00A0a\u00A0question"} />
            <RollLink className={styles.askMobile} href={ASK_MOBILE} text={"Ask\u00A0a\u00A0question"} />
          </div>
        </footer>
      </section>
    </div>
  );
}
