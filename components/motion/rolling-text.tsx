"use client";

import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./motion.module.css";
import { usePrefersReducedMotion } from "./use-reduced-motion";

export const ROLLING_TEXT_FONT_SIZE_PX = 14;
export const ROLLING_TEXT_LINE_HEIGHT_EM = 1.7;
export const ROLLING_TEXT_LINE_HEIGHT_PX =
  ROLLING_TEXT_FONT_SIZE_PX * ROLLING_TEXT_LINE_HEIGHT_EM;
export const ROLLING_TEXT_SPRING = {
  type: "spring" as const,
  duration: 0.4,
  bounce: 0,
  delay: 0,
};
export const ROLLING_TEXT_STAGGER = 25;

/** Button-shell spring. The chrome did not move, so this is unused. */
export const buttonShellSpring = {
  type: "spring" as const,
  bounce: 0.2,
  delay: 0,
  duration: 0.4,
};

function letterDelay(index: number, count: number) {
  return (
    ROLLING_TEXT_SPRING.delay +
    (ROLLING_TEXT_SPRING.duration / count) * index * (ROLLING_TEXT_STAGGER / 100)
  );
}

export function RollingText({
  text,
  rolling,
  fontSize = ROLLING_TEXT_FONT_SIZE_PX,
  lineHeightPx,
  letterSpacing,
}: {
  text: string;
  rolling?: boolean;
  /** Nav buttons are 12px. Hero and form buttons are 14px. */
  fontSize?: number;
  /** Nav Contact rolls 21.6px. Nav Join waitlist rolls 14.4px. */
  lineHeightPx?: number;
  letterSpacing?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);
  const active = rolling ?? hovered;
  const move = active && reduced === false;
  const letters = Array.from(text);
  const controlled = rolling !== undefined;
  const lineHeight = lineHeightPx ?? fontSize * ROLLING_TEXT_LINE_HEIGHT_EM;
  const sizerRef = useRef<HTMLSpanElement>(null);
  const [offsets, setOffsets] = useState<number[] | null>(null);

  useLayoutEffect(() => {
    const sizer = sizerRef.current;
    const node = sizer?.firstChild;
    if (!sizer || !node) {
      return;
    }

    let cancelled = false;
    const place = () => {
      if (cancelled) return;
      const origin = sizer.getBoundingClientRect().left;
      const range = document.createRange();
      const next = Array.from(text, (_, index) => {
        range.setStart(node, index);
        range.setEnd(node, index + 1);
        return range.getBoundingClientRect().left - origin;
      });
      range.detach();
      setOffsets((current) => {
        if (
          current &&
          current.length === next.length &&
          current.every((value, index) => Math.abs(value - next[index]) < 0.05)
        ) {
          return current;
        }
        return next;
      });
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(sizer);
    document.fonts?.ready.then(place).catch(() => undefined);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [text, fontSize]);

  return (
    <span
      className={styles.roll}
      style={{
        fontSize,
        lineHeight: `${lineHeight}px`,
        letterSpacing: letterSpacing === undefined ? undefined : `${letterSpacing}px`,
      }}
      onPointerEnter={controlled ? undefined : () => setHovered(true)}
      onPointerLeave={controlled ? undefined : () => setHovered(false)}
    >
      <span className={styles.sizer} ref={sizerRef} aria-hidden="true">
        {text}
      </span>
      <span className="visually-hidden">{text}</span>
      {letters.map((letter, index) => (
        <span
          className={styles.clip}
          key={`${letter}-${index}`}
          aria-hidden="true"
          style={{ height: lineHeight, left: offsets?.[index] ?? 0 }}
        >
          <motion.span
            className={styles.letter}
            initial={{ y: 0 }}
            animate={{ y: move ? -lineHeight : 0 }}
            transition={{
              type: ROLLING_TEXT_SPRING.type,
              duration: ROLLING_TEXT_SPRING.duration,
              bounce: ROLLING_TEXT_SPRING.bounce,
              delay: letterDelay(index, letters.length),
            }}
            style={{
              textShadow: `0 ${lineHeight}px 0 currentColor`,
              willChange: move ? "transform" : "auto",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function RollButton({ text }: { text: string }) {
  const [rolling, setRolling] = useState(false);

  return (
    <button
      type="button"
      className={styles.rollButton}
      onPointerEnter={() => setRolling(true)}
      onPointerLeave={() => setRolling(false)}
      onFocus={() => setRolling(true)}
      onBlur={() => setRolling(false)}
    >
      <RollingText text={text} rolling={rolling} />
    </button>
  );
}
