"use client";

import { useEffect, useState } from "react";
import {
  Dither,
  GodRays,
  Pulser,
  RollButton,
  TextGlitch,
  TextShimmer,
  nestedDither,
  orderedDither,
  randomDither,
} from "@/components/motion";
import styles from "./lab.module.css";

function useRamp() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const next = document.createElement("canvas");
    next.width = 360;
    next.height = 240;
    const ctx = next.getContext("2d");
    if (!ctx) {
      return;
    }
    const ramp = ctx.createLinearGradient(0, 0, 0, 240);
    ramp.addColorStop(0, "#050505");
    ramp.addColorStop(1, "#f4f4f4");
    ctx.fillStyle = ramp;
    ctx.fillRect(0, 0, 360, 240);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(180, 118, 56, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#141414";
    ctx.fillRect(148, 106, 64, 24);
    setCanvas(next);
  }, []);

  return canvas;
}

export function MotionLab() {
  const source = useRamp();

  return (
    <div className={styles.lab}>
      <header>
        <h1>Motion</h1>
        <p className={styles.note}>
          Hover Blog and the button. Dither is one still frame. The redraw
          loop, benefit-card hover, button-shell spring, dashed overlay, and
          resting glitch are unused because they were not visible.
        </p>
      </header>

      <section className={styles.section} id="text-glitch" aria-labelledby="text-glitch-title">
        <h2 id="text-glitch-title">TextGlitch</h2>
        <TextGlitch tabIndex={0}>Blog</TextGlitch>
      </section>

      <section className={styles.section} id="text-shimmer" aria-labelledby="text-shimmer-title">
        <h2 id="text-shimmer-title">TextShimmer</h2>
        <TextShimmer>HIRING</TextShimmer>
      </section>

      <section className={styles.section} id="rolling-text" aria-labelledby="rolling-text-title">
        <h2 id="rolling-text-title">RollingText</h2>
        <RollButton text={"Join\u00A0waitlist"} />
      </section>

      <section className={styles.section} id="dither" aria-labelledby="dither-title">
        <h2 id="dither-title">Dither</h2>
        {source ? (
          <div className={styles.ditherRow}>
            <figure>
              <Dither source={source} {...orderedDither} label="Ordered dither" />
              <figcaption className={styles.caption}>Ordered</figcaption>
            </figure>
            <figure>
              <Dither source={source} {...randomDither} label="Random dither" />
              <figcaption className={styles.caption}>Random</figcaption>
            </figure>
            <figure>
              <Dither source={source} {...nestedDither} label="Nested ordered dither" />
              <figcaption className={styles.caption}>Nested</figcaption>
            </figure>
          </div>
        ) : null}
      </section>

      <section className={styles.section} id="god-rays" aria-labelledby="god-rays-title">
        <h2 id="god-rays-title">GodRays</h2>
        <GodRays />
      </section>

      <section className={styles.section} id="pulser" aria-labelledby="pulser-title">
        <h2 id="pulser-title">Pulser</h2>
        <Pulser />
      </section>
    </div>
  );
}
