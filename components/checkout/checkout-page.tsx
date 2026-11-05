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

function WindowIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" fill="none" stroke="currentColor" />
      <path d="M1.5 5.5h13" stroke="currentColor" />
    </svg>
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
            <h2>
              <WindowIcon />
              Website Template
            </h2>
            <Points items={templatePoints} />
          </article>
          <p className={styles.kit}>
            Bonus SaaS Launch Kit
            <span>($186 in total value)</span>
          </p>
          <article className={styles.block}>
            <h2>
              High Conversion Copywriter <span>($49 Value)</span>
            </h2>
            <ol className={styles.steps}>
              <li>Answer a few questions about your business and offerings</li>
              <li>Use the provided AI prompt to generate all content for your website based on your answers</li>
            </ol>
            <Points items={copywriter} />
          </article>
          <article className={styles.block}>
            <h2>
              AI Style Guide <span>($29 Value)</span>
            </h2>
            <Points items={styleGuide} />
          </article>
          <article className={styles.block}>
            <h2>
              SEO Booster
              <span>JSON-LD Generator ($59 Value)</span>
            </h2>
            <Points items={seo} />
          </article>
          <article className={styles.block}>
            <h2>
              50 Minute Go-Live Video Guide <span>($49 Value)</span>
            </h2>
            <Points items={guide} />
          </article>
          <h2 className={styles.saying}>What people are saying</h2>
          <a className={styles.quote} href={TWEET} target="_blank" rel="noreferrer">
            <img src="/checkout/kris.png" alt="" width={34} height={34} />
            <span>
              <strong>Kris</strong>
              <span className={styles.handle}>@WebsitesByKris</span>
              <span className={styles.quoteBody}>
                I think you&apos;ve set a new bar here, not just in terms of design, but the whole
                experience from buying to customising!
              </span>
            </span>
          </a>
          <article className={styles.thread}>
            <img src="/checkout/dylan.png" alt="" width={34} height={34} />
            <div>
              <strong>Dylan Ott</strong>
              <p>I love the template bro it&apos;s awesome genuinely the best one so far</p>
              <time>12:34 AM</time>
              <figure>
                <img src="/checkout/blueprint.png" alt="Blueprint" />
                <figcaption>
                  Blueprint
                  <span>https://satisfy-shapeed-402151.framer.app/</span>
                </figcaption>
              </figure>
              <time>12:57 AM</time>
              <p>yo man thank you so much!</p>
              <time>09:18 AM</time>
            </div>
          </article>
          <a className={styles.quote} href={TWEET} target="_blank" rel="noreferrer">
            <img src="/checkout/anikin.png" alt="" width={34} height={34} />
            <span>
              <strong>Anikin Jaywalker</strong>
              <span className={styles.handle}>@TJae</span>
              <span className={styles.quoteBody}>
                Beyond me how well you made this template and I’m always paying attention to what’s
                dropping on the marketplace.
              </span>
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
