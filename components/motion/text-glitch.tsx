"use client";

import { useAnimationFrame } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./motion.module.css";
import { usePrefersReducedMotion } from "./use-reduced-motion";

/** Nav and footer instance. Not the component default of 1200ms / 40ms / 100%. */
export const TEXT_GLITCH_DURATION_MS = 300;
export const TEXT_GLITCH_SPEED_MS = 50;
export const TEXT_GLITCH_SCRAMBLE = 0.2;
export const TEXT_GLITCH_REST_COLOR = "rgba(255, 255, 255, 0.5)";
export const TEXT_GLITCH_HOVER_COLOR = "rgb(255, 255, 255)";

const GLITCH_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

/** Resting glitch was not isolated on screen, so this preset is unused. */
export const restingTextGlitch = {
  glitch: true,
  scramble: 0.1,
  speedMs: 60,
} as const;

function scrambleText(text: string) {
  let next = "";
  for (const char of text) {
    if (char === " " || char === "\u00A0" || Math.random() >= TEXT_GLITCH_SCRAMBLE) {
      next += char;
      continue;
    }
    next += GLITCH_CHARS[(Math.random() * GLITCH_CHARS.length) | 0];
  }
  return next;
}

export function TextGlitch({
  children,
  tabIndex,
}: {
  children: string;
  tabIndex?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(false);
  const [shown, setShown] = useState(children);
  const textRef = useRef(children);
  const moveRef = useRef(false);
  const clock = useRef({ elapsed: 0, next: TEXT_GLITCH_SPEED_MS, running: false, finished: false });
  textRef.current = children;
  moveRef.current = active && reduced === false;

  useEffect(() => {
    setShown(children);
  }, [children]);

  const onFrame = useCallback((_timestamp: number, deltaMs: number) => {
    const state = clock.current;
    if (!moveRef.current) {
      if (state.running || state.finished) {
        state.running = false;
        state.finished = false;
        state.elapsed = 0;
        state.next = TEXT_GLITCH_SPEED_MS;
        setShown(textRef.current);
      }
      return;
    }
    if (!state.running && !state.finished) {
      state.running = true;
      state.elapsed = 0;
      state.next = TEXT_GLITCH_SPEED_MS;
    }
    if (state.finished) {
      return;
    }
    state.elapsed += deltaMs;
    if (state.elapsed >= TEXT_GLITCH_DURATION_MS) {
      state.running = false;
      state.finished = true;
      setShown(textRef.current);
      return;
    }
    if (state.elapsed >= state.next) {
      state.next += TEXT_GLITCH_SPEED_MS;
      setShown(scrambleText(textRef.current));
    }
  }, []);

  useAnimationFrame(onFrame);

  return (
    <span
      className={styles.glitch}
      tabIndex={tabIndex}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      style={{ color: active ? TEXT_GLITCH_HOVER_COLOR : TEXT_GLITCH_REST_COLOR }}
    >
      <span className="visually-hidden">{children}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
