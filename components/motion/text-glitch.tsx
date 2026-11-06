"use client";

import { useEffect, useRef, useState } from "react";
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

type Cell = { char: string; scrambled: boolean };

function scrambleCells(text: string): Cell[] {
  return Array.from(text).map((char) => {
    if (char === " " || char === "\u00A0" || Math.random() >= TEXT_GLITCH_SCRAMBLE) {
      return { char, scrambled: false };
    }
    return {
      char: GLITCH_CHARS[(Math.random() * GLITCH_CHARS.length) | 0],
      scrambled: true,
    };
  });
}

export function TextGlitch({
  children,
  tabIndex,
  active,
  restingColor = TEXT_GLITCH_REST_COLOR,
}: {
  children: string;
  tabIndex?: number;
  /** When set, the parent link owns the hover. Otherwise the text watches the pointer. */
  active?: boolean;
  restingColor?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [cells, setCells] = useState<Cell[] | null>(null);
  const textRef = useRef(children);
  const engaged = active ?? hovered;
  textRef.current = children;

  useEffect(() => {
    if (!engaged || reduced !== false) {
      return;
    }
    const id = window.setInterval(() => {
      setCells(scrambleCells(textRef.current));
    }, TEXT_GLITCH_SPEED_MS);
    const stop = window.setTimeout(() => {
      window.clearInterval(id);
      setCells(null);
    }, TEXT_GLITCH_DURATION_MS);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(stop);
      setCells(null);
    };
  }, [engaged, reduced]);

  return (
    <span
      className={styles.glitch}
      tabIndex={tabIndex}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{ color: engaged ? TEXT_GLITCH_HOVER_COLOR : restingColor }}
    >
      <span className="visually-hidden">{children}</span>
      <span aria-hidden="true">
        {cells
          ? cells.map((cell, index) =>
              cell.scrambled ? (
                <span key={index} style={{ color: TEXT_GLITCH_REST_COLOR }}>
                  {cell.char}
                </span>
              ) : (
                <span key={index}>{cell.char}</span>
              ),
            )
          : children}
      </span>
    </span>
  );
}
