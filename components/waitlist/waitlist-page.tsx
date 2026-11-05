"use client";

import { useState } from "react";
import { GodRays, RollingText } from "@/components/motion";
import styles from "@/components/waitlist/waitlist.module.css";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function emailError(value: string) {
  if (!value) {
    return "Enter your email.";
  }
  if (!EMAIL.test(value)) {
    return "Enter a valid email.";
  }
  return "";
}

export function WaitlistPage() {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [rolling, setRolling] = useState(false);

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="waitlist-title">
        <div className={styles.art} aria-hidden="true">
          <div className={styles.rays}>
            <GodRays label="" offsetY={0.5} density={0.7} frequency={12} spotty={2.2} />
          </div>
          <div className={styles.grain} />
          <img className={styles.mark} src="/brand/logo-mark.svg" alt="" width={88} height={88} />
        </div>
        <div className={styles.copy}>
          <p className={styles.badge}>
            <span className="shimmer-text">
              WAITLIST IS NOW OPEN
              <span className="shimmer-text-glow" aria-hidden="true">
                WAITLIST IS NOW OPEN
              </span>
            </span>
          </p>
          <h1 id="waitlist-title">Jet is launching soon.</h1>
          <p className={styles.lede}>
            Get on the waitlist and be among the first to get access to Jet.
          </p>
          <form
            className={styles.form}
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const next = emailError(String(data.get("Email") ?? "").trim());
              setError(next);
              setDone(next === "");
            }}
          >
            <div className={styles.row}>
              <label className={styles.field} htmlFor="waitlist-email">
                <span className="visually-hidden">Email</span>
                <input
                  id="waitlist-email"
                  name="Email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  required
                  disabled={done}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "waitlist-email-error" : undefined}
                />
              </label>
              {done ? null : (
                <button
                  className={styles.submit}
                  type="submit"
                  onPointerEnter={() => setRolling(true)}
                  onPointerLeave={() => setRolling(false)}
                  onFocus={() => setRolling(true)}
                  onBlur={() => setRolling(false)}
                >
                  <RollingText text="Join now" rolling={rolling} />
                </button>
              )}
            </div>
            {done ? (
              <p className={styles.success} role="status">
                You&apos;re on the waitlist!
              </p>
            ) : null}
            {error ? (
              <p className={styles.fieldError} id="waitlist-email-error" role="alert">
                {error}
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </div>
  );
}
