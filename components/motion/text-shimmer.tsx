"use client";

import { motion } from "motion/react";
import styles from "./motion.module.css";
import { usePrefersReducedMotion } from "./use-reduced-motion";

/**
 * The inserted stylesheet is 3s linear, holding through 66.666…%.
 * That is delay 2 and speed 10. The module's delay 1.5 (2.5s) is not what runs.
 */
export const TEXT_SHIMMER_DURATION_S = 3;
export const TEXT_SHIMMER_EASE = "linear" as const;
export const TEXT_SHIMMER_HOLD = 2 / 3;
export const TEXT_SHIMMER_ROTATION_DEG = 100;
export const TEXT_SHIMMER_SIZE = 30;
const SHIMMER_SPREAD = 0.3;
const band = TEXT_SHIMMER_SIZE * SHIMMER_SPREAD;
const shimmerStart = 50 - band;
const shimmerEnd = 50 + band;

const shimmerImage = `linear-gradient(${TEXT_SHIMMER_ROTATION_DEG}deg, transparent ${shimmerStart}%, var(--shimmer) 50%, transparent ${shimmerEnd}%)`;

export function TextShimmer({ children }: { children: string }) {
  const reduced = usePrefersReducedMotion();
  const animateMotion = reduced === false;

  return (
    <span className={styles.shimmer}>
      <p className={styles.shimmerText}>{children}</p>
      <motion.p
        aria-hidden="true"
        className={styles.shimmerOverlay}
        initial={{ backgroundPositionX: "200%" }}
        animate={
          animateMotion
            ? { backgroundPositionX: ["200%", "200%", "-100%"] }
            : { backgroundPositionX: "200%" }
        }
        transition={
          animateMotion
            ? {
                duration: TEXT_SHIMMER_DURATION_S,
                ease: TEXT_SHIMMER_EASE,
                repeat: Infinity,
                times: [0, TEXT_SHIMMER_HOLD, 1],
              }
            : { duration: 0 }
        }
        style={{
          backgroundImage: shimmerImage,
          backgroundRepeat: "no-repeat",
          backgroundSize: "200% 100%",
        }}
      >
        {children}
      </motion.p>
    </span>
  );
}
