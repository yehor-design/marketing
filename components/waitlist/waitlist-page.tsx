"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
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

function unitBezier(x1: number, y1: number, x2: number, y2: number, time: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (u: number) => ((ax * u + bx) * u + cx) * u;
  const sampleY = (u: number) => ((ay * u + by) * u + cy) * u;
  const slope = (u: number) => (3 * ax * u + 2 * bx) * u + cx;
  let u = time;
  for (let step = 0; step < 6; step += 1) {
    const delta = sampleX(u) - time;
    const derivative = slope(u);
    if (Math.abs(delta) < 1e-5 || derivative === 0) {
      break;
    }
    u -= delta / derivative;
  }
  return sampleY(Math.min(1, Math.max(0, u)));
}

function easeRadius(kind: "in" | "out", progress: number) {
  const t = Math.min(1, Math.max(0, progress));
  return kind === "out"
    ? unitBezier(0, 0, 0.58, 1, t)
    : unitBezier(0.42, 0, 1, 1, t);
}

function Flashlight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const point = useRef({
    x: 0,
    y: 0,
    radius: 0,
    from: 0,
    to: 0,
    start: 0,
    ease: "out" as "in" | "out",
  });

  useEffect(() => {
    let frame = 0;
    const tick = (now: number) => {
      const state = point.current;
      const progress = (now - state.start) / 300;
      state.radius =
        progress >= 1
          ? state.to
          : state.from + (state.to - state.from) * easeRadius(state.ease, progress);
      const node = ref.current;
      if (node) {
        node.style.maskImage = `radial-gradient(circle ${state.radius}px at ${state.x}px ${state.y}px, rgb(0, 0, 0), rgb(0, 0, 0) 40%, rgba(0, 0, 0, 0) 100%)`;
        node.style.webkitMaskImage = node.style.maskImage;
        node.style.maskComposite = "destination-out";
        node.style.webkitMaskComposite = "destination-out";
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  function place(event: PointerEvent<HTMLDivElement>, open: boolean) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const state = point.current;
    state.x = event.clientX - bounds.left;
    state.y = event.clientY - bounds.top;
    if (!open) {
      return;
    }
    state.from = state.radius;
    state.to = 400;
    state.start = performance.now();
    state.ease = "out";
  }

  return (
    <div
      ref={ref}
      className={styles.flashlight}
      onPointerEnter={(event) => place(event, true)}
      onPointerLeave={() => {
        const state = point.current;
        state.from = state.radius;
        state.to = 0;
        state.start = performance.now();
        state.ease = "in";
      }}
      onPointerMove={(event) => place(event, false)}
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
            onSubmit={(event) => {
              event.preventDefault();
              setError("");
              setDone(true);
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
