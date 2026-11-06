"use client";

import Link from "next/link";
import { useState } from "react";
import { Pulser, RollingText } from "@/components/motion";
import styles from "@/components/site-cta.module.css";

const NBSP = "\u00A0";

/** Homepage footer CTA, reused on every other page that closes with this block. */
export function SiteCta({ titleId = "site-cta" }: { titleId?: string }) {
  const [rolling, setRolling] = useState(false);

  return (
    <section className={styles.cta} aria-labelledby={titleId}>
      <div className={styles.card}>
        <div className={styles.media}>
          <Pulser />
          <div className={styles.grain} />
        </div>
        <div className={styles.copy}>
          <h2 id={titleId}>Boost your site speed today.</h2>
          <p>Try Jet now—one click, instant performance. No risk, cancel anytime.</p>
          <Link
            href="/waitlist"
            className={styles.button}
            onPointerEnter={() => setRolling(true)}
            onPointerLeave={() => setRolling(false)}
            onFocus={() => setRolling(true)}
            onBlur={() => setRolling(false)}
          >
            <RollingText text={`Join${NBSP}waitlist`} rolling={rolling} />
          </Link>
        </div>
      </div>
    </section>
  );
}
