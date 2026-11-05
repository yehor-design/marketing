"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Pulser, PulseGradient, RollingText } from "@/components/motion";
import styles from "@/components/pricing/pricing.module.css";

const NBSP = "\u00A0";

/**
 * Plan purchase buttons on https://jet.framer.website/pricing open
 * https://buy.polar.sh/polar_cl_3qRsLy9BO9WTHskviNZBl54gdf3Uxk9oVwUek1zDfJa
 * The local route for that checkout is /checkout. The closing CTA is /waitlist.
 */
const CHECKOUT_HREF = "/checkout";
const WAITLIST_HREF = "/waitlist";

type Period = "monthly" | "yearly";
type Mark = "check" | "x";
type Cell = { text?: string; mark?: Mark };

type Plan = {
  id: "starter" | "pro" | "agency";
  name: string;
  description: string;
  popular: boolean;
  free: boolean;
  monthly: string;
  yearly: string;
  features: string[];
  cta: string;
  tone: "primary" | "secondary";
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for personal projects—speed up one site for free.",
    popular: false,
    free: true,
    monthly: "29",
    yearly: "24",
    features: ["1 website", "Basic image & code optimization", "Limited analytics"],
    cta: `Try${NBSP}for${NBSP}free`,
    tone: "secondary",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Boost up to 10 sites with advanced tools and analytics.",
    popular: true,
    free: false,
    monthly: "29",
    yearly: "24",
    features: [
      "All Starter features +",
      "Up to 10 websites",
      "Advanced optimization",
      "Advanced Enhanced analytics & monitoring",
      "Priority support",
    ],
    cta: `Get${NBSP}started`,
    tone: "primary",
  },
  {
    id: "agency",
    name: "Agency",
    description: "Unlimited sites, team features, and white-label options for agencies.",
    popular: false,
    free: false,
    monthly: "199",
    yearly: "169",
    features: [
      "All Starter & Pro features +",
      "Unlimited websites",
      "Team collaboration tools",
      "White-label reporting",
      "Dedicated account manager",
    ],
    cta: `Get${NBSP}started`,
    tone: "secondary",
  },
];

type Row = {
  feature: string;
  tip?: string;
  tone: "grey" | "black";
  cells: [Cell, Cell, Cell];
};

const groups: { title: string; rows: Row[] }[] = [
  {
    title: "General",
    rows: [
      {
        feature: "Number of websites",
        tip: "Manage multiple domains with a single account.",
        tone: "grey",
        cells: [{ text: "1" }, { text: "Up to 10" }, { text: "Unlimited" }],
      },
      {
        feature: "Monthly pageviews",
        tone: "black",
        cells: [{ text: "Up to 10,000" }, { text: "Up to 100,000" }, { text: "Unlimited" }],
      },
      {
        feature: "Support",
        tone: "grey",
        cells: [{ text: "Community" }, { text: "Priority" }, { text: "Dedicated" }],
      },
    ],
  },
  {
    title: "Features",
    rows: [
      {
        feature: "Image optimization",
        tone: "grey",
        cells: [{ mark: "check" }, { mark: "check" }, { mark: "check" }],
      },
      {
        feature: "Code optimization",
        tone: "black",
        cells: [{ mark: "check" }, { mark: "check" }, { mark: "check" }],
      },
      {
        feature: "Global CDN",
        tone: "grey",
        cells: [{ mark: "check" }, { mark: "check" }, { mark: "check" }],
      },
      {
        feature: "Google PageSpeed integration",
        tip: "View your site's Google PageSpeed scores and recommendations directly in your Jet dashboard.",
        tone: "black",
        cells: [{ mark: "x" }, { text: "Included" }, { text: "Included" }],
      },
      {
        feature: "Competitor comparison",
        tone: "grey",
        cells: [{ mark: "x" }, { text: "Up to 3 sites" }, { text: "Unlimited" }],
      },
      {
        feature: "Analytics dashboard",
        tone: "black",
        cells: [{ text: "Basic" }, { text: "Advanced" }, { text: "Advanced" }],
      },
      {
        feature: "Mobile vs Desktop insights",
        tone: "grey",
        cells: [{ mark: "x" }, { mark: "check" }, { mark: "check" }],
      },
    ],
  },
  {
    title: "Team Management",
    rows: [
      {
        feature: "Team members",
        tip: "Add colleagues to manage sites together.",
        tone: "grey",
        cells: [{ mark: "x" }, { text: "1" }, { text: "Unlimited" }],
      },
    ],
  },
  {
    title: "Customization",
    rows: [
      {
        feature: "White-label reporting",
        tip: "Customize reports with your own branding for clients—no Jet logos or references included.",
        tone: "grey",
        cells: [{ mark: "x" }, { mark: "x" }, { mark: "check" }],
      },
      {
        feature: "Dedicated account manager",
        tone: "black",
        cells: [{ mark: "x" }, { mark: "x" }, { mark: "check" }],
      },
    ],
  },
  {
    title: "Alerts & Support",
    rows: [
      {
        feature: "Real-time alerts Copy",
        tone: "black",
        cells: [{ mark: "x" }, { mark: "check" }, { mark: "check" }],
      },
      {
        feature: "Real-time alerts 24/7 monitoring",
        tone: "grey",
        cells: [{ mark: "x" }, { mark: "check" }, { mark: "check" }],
      },
    ],
  },
  {
    title: "Hosting Savings",
    rows: [
      {
        feature: "Hosting cost reduction insights",
        tone: "grey",
        cells: [{ mark: "x" }, { text: "Included" }, { text: "Included" }],
      },
    ],
  },
];

function CardCta({ text, tone }: { text: string; tone: "primary" | "secondary" }) {
  const [rolling, setRolling] = useState(false);

  return (
    <span
      className={tone === "primary" ? styles.cardButtonPrimary : styles.cardButton}
      onPointerEnter={() => setRolling(true)}
      onPointerLeave={() => setRolling(false)}
    >
      <RollingText text={text} rolling={rolling} />
    </span>
  );
}

function RollLink({
  href,
  text,
  tone,
  className,
}: {
  href: string;
  text: string;
  tone: "primary" | "secondary";
  className?: string;
}) {
  const [rolling, setRolling] = useState(false);

  return (
    <Link
      href={href}
      className={`${tone === "primary" ? styles.primary : styles.secondary} ${className ?? ""}`}
      onPointerEnter={() => setRolling(true)}
      onPointerLeave={() => setRolling(false)}
      onFocus={() => setRolling(true)}
      onBlur={() => setRolling(false)}
    >
      <RollingText text={text} rolling={rolling} />
    </Link>
  );
}

function Check({ tone }: { tone: "accent" | "muted" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden="true"
      className={tone === "accent" ? styles.markAccent : styles.markMuted}
    >
      <path
        d="M3.2 8.3 6.3 11.4 12.8 4.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className={styles.markCross}>
      <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PlanMark({ id, size }: { id: Plan["id"]; size: number }) {
  const accent = id === "pro";
  return (
    <svg
      viewBox="0 0 44 44"
      width={size}
      height={size}
      aria-hidden="true"
      className={accent ? styles.markAccent : styles.mark}
    >
      {id === "starter" ? (
        <path
          d="M15 0H21M15 36H21M8 4H28M8 32H28M3 8H33M3 28H33M1 12H35M0 16H36M0 20H36M1 24H35"
          transform="translate(4 4)"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      ) : null}
      {id === "pro" ? (
        <>
          <path d="M0 0H6" transform="translate(19 4)" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M0 0H8" transform="translate(17 8)" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M0 0H10" transform="translate(15 12)" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M0 0H26" transform="translate(12 16)" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M0 0H26" transform="translate(10 20)" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M0 0H26" transform="translate(8 24)" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M0 0H26" transform="translate(6 28)" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M0 0H10" transform="translate(19 32)" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M0 0H8" transform="translate(19 36)" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M0 0H6" transform="translate(19 40)" fill="none" stroke="currentColor" strokeWidth="2" />
        </>
      ) : null}
      {id === "agency" ? (
        <path
          d="M11 0H29M7 4H33M3 8H37M0 12H40M2 16H38M6 20H34M11 24H29M14 28H26M18 32H22"
          transform="translate(2 6)"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      ) : null}
    </svg>
  );
}

function CellValue({ cell }: { cell: Cell }) {
  if (cell.text) {
    return <span>{cell.text}</span>;
  }
  if (cell.mark === "check") {
    return (
      <span className={styles.cellIcon}>
        <Check tone="accent" />
        <span className="visually-hidden">Included</span>
      </span>
    );
  }
  return (
    <span className={styles.cellIcon}>
      <Cross />
      <span className="visually-hidden">Not included</span>
    </span>
  );
}

function Tip({ text }: { text: string }) {
  const id = useId();

  return (
    <span className={styles.tip}>
      <button type="button" className={styles.tipButton} aria-describedby={id} aria-label="More information">
        ?
      </button>
      <span id={id} role="tooltip" className={styles.tipBubble}>
        {text}
      </span>
    </span>
  );
}

export function PricingPage() {
  const [period, setPeriod] = useState<Period>("yearly");
  const [planIndex, setPlanIndex] = useState(0);
  const activePlan = plans[planIndex];

  return (
    <div className={styles.pricing}>
      <section className={styles.hero} aria-labelledby="pricing-title">
        <div className={styles.band} aria-hidden="true">
          <div className={styles.bandMask}>
            <div className={styles.bandGlow}>
              <PulseGradient />
              <div className={styles.grain} />
            </div>
          </div>
        </div>
        <div className={styles.heroCopy}>
          <h1 id="pricing-title">Choose your Jet plan</h1>
          <p>
            Lightning-fast performance for every website—find the perfect plan for your needs and scale
            with ease.
          </p>
        </div>
        <div className={styles.band} aria-hidden="true">
          <div className={styles.bandMask}>
            <div className={styles.bandGlow}>
              <PulseGradient />
              <div className={styles.grain} />
            </div>
          </div>
        </div>
      </section>

      <div className={styles.spacer} aria-hidden="true" />

      <section className={styles.plans} aria-labelledby="pricing-title">
        <div className={styles.toggle} role="group" aria-label="Billing period">
          <button
            type="button"
            className={period === "monthly" ? styles.toggleOn : styles.toggleOff}
            aria-pressed={period === "monthly"}
            onClick={() => setPeriod("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            className={period === "yearly" ? styles.toggleOn : styles.toggleOff}
            aria-pressed={period === "yearly"}
            onClick={() => setPeriod("yearly")}
          >
            Yearly
            <span className={styles.discount}>-15%</span>
          </button>
        </div>

        <div className={styles.cards}>
          {plans.map((plan) => {
            const price = period === "yearly" ? plan.yearly : plan.monthly;
            const suffix = period === "yearly" ? "/month, billed annually" : "/month";
            return (
              <Link key={plan.id} href={CHECKOUT_HREF} className={plan.popular ? styles.cardPopular : styles.card}>
                <span className={styles.wash} aria-hidden="true" />
                <span className={`${styles.corner} ${styles.nw}`} aria-hidden="true" />
                <span className={`${styles.corner} ${styles.ne}`} aria-hidden="true" />
                <span className={`${styles.corner} ${styles.sw}`} aria-hidden="true" />
                <span className={`${styles.corner} ${styles.se}`} aria-hidden="true" />
                <span className={styles.cardBody}>
                  <span className={styles.nameRow}>
                    <span className={styles.planTitle}>
                      <PlanMark id={plan.id} size={28} />
                      <span className={styles.planName}>{plan.name}</span>
                    </span>
                    {plan.popular ? <span className={styles.badge}>Most popular</span> : null}
                  </span>
                  <span className={styles.description}>{plan.description}</span>
                  {plan.free ? (
                    <span className={styles.free}>Free forever</span>
                  ) : (
                    <span className={styles.price}>
                      <span className={styles.amount}>
                        <span className={styles.currency}>$</span>
                        <span>{price}</span>
                      </span>
                      <span className={styles.suffix}>{suffix}</span>
                    </span>
                  )}
                  <span className={plan.popular ? styles.dividerAccent : styles.divider} />
                  <ul className={styles.features}>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check tone={plan.popular ? "accent" : "muted"} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <span className={styles.push} />
                  <CardCta text={plan.cta} tone={plan.tone} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <div className={styles.spacer} aria-hidden="true" />

      <section className={styles.compare} aria-label="Plan comparison">
        <div className={styles.switcher}>
          <div className={styles.tabs} role="tablist" aria-label="Plan">
            {plans.map((plan, index) => (
              <button
                key={plan.id}
                type="button"
                role="tab"
                aria-selected={planIndex === index}
                className={planIndex === index ? styles.tabOn : styles.tab}
                onClick={() => setPlanIndex(index)}
              >
                {plan.name}
              </button>
            ))}
          </div>
          <RollLink
            href={CHECKOUT_HREF}
            text={activePlan.cta}
            tone={activePlan.tone}
            className={styles.smallButton}
          />
        </div>

        <div className={styles.table}>
          <div className={styles.head} role="row">
            <div />
            {plans.map((plan) => (
              <div className={styles.headPlan} key={plan.id}>
                <h3>
                  <PlanMark id={plan.id} size={20} />
                  {plan.name}
                </h3>
                <RollLink href={CHECKOUT_HREF} text={plan.cta} tone={plan.tone} className={styles.smallButton} />
              </div>
            ))}
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h4 className={styles.category}>{group.title}</h4>
              {group.rows.map((row) => (
                <div
                  className={row.tone === "grey" ? styles.rowGrey : styles.rowBlack}
                  key={row.feature}
                  role="row"
                >
                  <h5>
                    {row.feature}
                    {row.tip ? <Tip text={row.tip} /> : null}
                  </h5>
                  {row.cells.map((cell, index) => (
                    <div
                      className={planIndex === index ? styles.valueActive : styles.value}
                      key={plans[index].id}
                      role="cell"
                    >
                      <CellValue cell={cell} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <div className={styles.spacer} aria-hidden="true" />

      <section className={styles.cta} aria-labelledby="pricing-cta">
        <div className={styles.ctaCard}>
          <div className={styles.ctaMedia} aria-hidden="true">
            <Pulser />
            <div className={styles.grain} />
          </div>
          <div className={styles.ctaCopy}>
            <div className={styles.ctaText}>
              <h2 id="pricing-cta">Boost your site speed today.</h2>
              <p>Try Jet now—one click, instant performance. No risk, cancel anytime.</p>
            </div>
            <RollLink href={WAITLIST_HREF} text={`Join${NBSP}waitlist`} tone="primary" />
          </div>
        </div>
      </section>
    </div>
  );
}
