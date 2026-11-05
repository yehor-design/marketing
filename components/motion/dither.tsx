"use client";

import { useEffect, useRef } from "react";
import styles from "./motion.module.css";

const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
] as const;

export const orderedDither = {
  algorithm: "ordered" as const,
  animation: true,
  intensity: 40,
  interval: 0.08,
  brightness: -20,
  pixelSize: 4,
  threshold: 140,
  midtones: 48,
  glow: 0,
  radius: 0,
};

export const randomDither = {
  algorithm: "random" as const,
  animation: false,
  intensity: 10,
  interval: 0.1,
  brightness: 58,
  pixelSize: 2,
  threshold: 118,
  midtones: 59,
};

export const nestedDither = {
  algorithm: "ordered" as const,
  animation: false,
  intensity: 20,
  interval: 0.08,
  brightness: 29,
  pixelSize: 3,
  threshold: 90,
  midtones: 87,
};

/** Ordered and hover redraws stayed pixel-identical, so this loop is unused. */
export const ditherAnimationLoop = {
  ordered: { interval: 0.08, intensity: 40 },
  randomHover: { interval: 0.2, intensity: 5 },
} as const;

type Algorithm = "ordered" | "random";

type DitherProps = {
  source: CanvasImageSource;
  algorithm: Algorithm;
  animation: boolean;
  intensity: number;
  interval: number;
  brightness: number;
  pixelSize: number;
  threshold: number;
  midtones: number;
  glow?: number;
  radius?: number;
  label: string;
};

function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sourceSize(source: CanvasImageSource) {
  if (source instanceof HTMLCanvasElement || source instanceof HTMLImageElement) {
    const width = source instanceof HTMLImageElement ? source.naturalWidth : source.width;
    const height = source instanceof HTMLImageElement ? source.naturalHeight : source.height;
    return { width, height };
  }
  if (source instanceof HTMLVideoElement) {
    return { width: source.videoWidth, height: source.videoHeight };
  }
  if (typeof ImageBitmap !== "undefined" && source instanceof ImageBitmap) {
    return { width: source.width, height: source.height };
  }
  return { width: 360, height: 240 };
}

function drawDither(
  canvas: HTMLCanvasElement,
  source: CanvasImageSource,
  props: {
    algorithm: Algorithm;
    brightness: number;
    pixelSize: number;
    threshold: number;
    midtones: number;
  },
) {
  const { width, height } = sourceSize(source);
  if (width < 1 || height < 1) {
    return;
  }
  const sample = document.createElement("canvas");
  sample.width = width;
  sample.height = height;
  const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
  if (!sampleCtx) {
    return;
  }
  sampleCtx.drawImage(source, 0, 0, width, height);
  const src = sampleCtx.getImageData(0, 0, width, height).data;
  canvas.width = width;
  canvas.height = height;
  const out = canvas.getContext("2d");
  if (!out) {
    return;
  }
  const image = out.createImageData(width, height);
  const data = image.data;
  const pixelSize = Math.max(1, Math.round(props.pixelSize));
  const random = mulberry32(
    (width * 73856093) ^
      (height * 19349663) ^
      (props.threshold * 83492791) ^
      (props.brightness * 50331653) ^
      (props.midtones * 2654435761) ^
      (props.algorithm === "ordered" ? 0 : 97),
  );

  for (let y0 = 0; y0 < height; y0 += pixelSize) {
    for (let x0 = 0; x0 < width; x0 += pixelSize) {
      let r = 0;
      let g = 0;
      let b = 0;
      let count = 0;
      const y1 = Math.min(y0 + pixelSize, height);
      const x1 = Math.min(x0 + pixelSize, width);
      for (let y = y0; y < y1; y += 1) {
        for (let x = x0; x < x1; x += 1) {
          const index = (y * width + x) * 4;
          r += src[index];
          g += src[index + 1];
          b += src[index + 2];
          count += 1;
        }
      }
      r /= count;
      g /= count;
      b /= count;
      const luma = Math.min(
        255,
        Math.max(0, 0.2126 * r + 0.7152 * g + 0.0722 * b + props.brightness),
      );
      const row = Math.floor(y0 / pixelSize) % 4;
      const col = Math.floor(x0 / pixelSize) % 4;
      const pattern =
        props.algorithm === "ordered" ? (BAYER_4[row][col] + 0.5) / 16 : random();
      const limit = props.threshold + (pattern - 0.5) * props.midtones;
      const value = luma >= limit ? 255 : 0;
      for (let y = y0; y < y1; y += 1) {
        for (let x = x0; x < x1; x += 1) {
          const index = (y * width + x) * 4;
          data[index] = value;
          data[index + 1] = value;
          data[index + 2] = value;
          data[index + 3] = 255;
        }
      }
    }
  }

  out.putImageData(image, 0, 0);
}

export function Dither({
  source,
  algorithm,
  animation,
  intensity,
  interval,
  brightness,
  pixelSize,
  threshold,
  midtones,
  glow = 0,
  radius = 0,
  label,
}: DitherProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    // animation, interval, intensity, and glow belong to the redraw that
    // ditherAnimationLoop leaves unused. This draws the still frame once.
    void animation;
    void intensity;
    void interval;
    void glow;
    drawDither(canvas, source, {
      algorithm,
      brightness,
      pixelSize,
      threshold,
      midtones,
    });
  }, [
    source,
    algorithm,
    animation,
    intensity,
    interval,
    brightness,
    pixelSize,
    threshold,
    midtones,
    glow,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.dither}
      role="img"
      aria-label={label}
      style={{ borderRadius: radius }}
    />
  );
}
