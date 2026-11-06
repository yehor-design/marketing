"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { DitherImage } from "@/components/home/dither-image";
import { RollingText, orderedDither, randomDither } from "@/components/motion";
import styles from "@/components/waitlist/waitlist.module.css";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const artBase = {
  ...orderedDither,
  animation: false,
  intensity: 10,
  interval: 0.1,
  brightness: -10,
  pixelSize: 1,
  threshold: 125,
  midtones: 50,
  glow: 0,
};

const artHighlight = {
  ...randomDither,
  animation: true,
  intensity: 100,
  interval: 0.08,
  brightness: 50,
  pixelSize: 1,
  threshold: 55,
  midtones: 65,
  glow: 0,
};

function Flashlight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const point = useRef({ x: 0, y: 0, radius: 0, target: 0 });

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const state = point.current;
      const next = state.radius + (state.target - state.radius) * 0.28;
      state.radius = Math.abs(state.target - next) < 0.4 ? state.target : next;
      const node = ref.current;
      if (node) {
        node.style.maskImage = `radial-gradient(circle ${state.radius}px at ${state.x}px ${state.y}px, black 40%, transparent 100%)`;
        node.style.webkitMaskImage = node.style.maskImage;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={ref}
      className={styles.flashlight}
      onPointerEnter={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        point.current.x = event.clientX - bounds.left;
        point.current.y = event.clientY - bounds.top;
        point.current.target = 400;
      }}
      onPointerLeave={() => {
        point.current.target = 0;
      }}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        point.current.x = event.clientX - bounds.left;
        point.current.y = event.clientY - bounds.top;
      }}
    >
      {children}
    </div>
  );
}

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
        <div className={styles.art}>
          <div className={styles.artBase}>
            <DitherImage src="/waitlist/art.png" label="waitlist art" preset={artBase} />
          </div>
          <Flashlight>
            <div className={styles.artHighlight}>
              <DitherImage src="/waitlist/art.png" label="" preset={artHighlight} />
            </div>
          </Flashlight>
        </div>
        <div className={styles.copy}>
          <div className={styles.text}>
            <p className={styles.badge}>
              <span className="shimmer-text">
                WAITLIST IS NOW OPEN
                <span className="shimmer-text-glow" aria-hidden="true">
                  WAITLIST IS NOW OPEN
                </span>
              </span>
            </p>
            <h1 id="waitlist-title">Jet is launching soon. </h1>
            <p className={styles.lede}>
              Get on the waitlist and be among the first to get access to Jet.
            </p>
          </div>
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
