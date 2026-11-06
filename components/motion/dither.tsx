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
  dot?: string;
  label: string;
};

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

function mapIntensity(intensity: number) {
  return 0.001 + (intensity / 100) * (10 - 0.001);
}

function parseDot(color: string | undefined) {
  if (!color) {
    return [255, 255, 255] as const;
  }
  const hex = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(color.trim());
  if (!hex) {
    return [255, 255, 255] as const;
  }
  return [
    Number.parseInt(hex[1], 16),
    Number.parseInt(hex[2], 16),
    Number.parseInt(hex[3], 16),
  ] as const;
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
    glow: number;
    dot?: string;
  },
) {
  const natural = sourceSize(source);
  if (natural.width < 1 || natural.height < 1) {
    return;
  }
  const ratio = natural.width / natural.height;
  const long = Math.max(1, Math.floor(800 / Math.max(1, props.pixelSize)));
  const width = ratio >= 1 ? long : Math.max(1, Math.floor(long * ratio));
  const height = ratio >= 1 ? Math.max(1, Math.floor(long / ratio)) : long;
  // Process off the visible canvas. Reading the display canvas back after
  // the glow filter reused the previous dither instead of the photo, so the
  // hover brightness never moved a pixel. Resizing the display canvas also
  // dropped :hover.
  const buffer = document.createElement("canvas");
  buffer.width = width;
  buffer.height = height;
  const out = buffer.getContext("2d", { willReadFrequently: true });
  if (!out) {
    return;
  }
  out.imageSmoothingEnabled = false;
  out.drawImage(source, 0, 0, width, height);
  const image = out.getImageData(0, 0, width, height);
  const data = image.data;
  const gain = 1 + props.brightness / 100;
  for (let index = 0; index < data.length; index += 4) {
    data[index] = Math.min(255, Math.max(0, Math.round(data[index] * gain)));
    data[index + 1] = Math.min(255, Math.max(0, Math.round(data[index + 1] * gain)));
    data[index + 2] = Math.min(255, Math.max(0, Math.round(data[index + 2] * gain)));
  }
  const limit = Math.round((props.threshold * props.midtones) / 50);
  const dot = parseDot(props.dot);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const luma = Math.round(
        0.299 * data[index] + 0.587 * data[index + 1] + 0.114 * data[index + 2],
      );
      const bias =
        props.algorithm === "ordered"
          ? (BAYER_4[y % 4][x % 4] - 7.5) * 16
          : (Math.random() - 0.5) * 100;
      const on = luma > limit + bias;
      data[index] = on ? dot[0] : 0;
      data[index + 1] = on ? dot[1] : 0;
      data[index + 2] = on ? dot[2] : 0;
      data[index + 3] = 255;
    }
  }
  out.putImageData(image, 0, 0);
  let final = image;
  if (props.glow > 0) {
    out.filter = `blur(${props.glow / 4}px)`;
    out.globalCompositeOperation = "lighter";
    out.drawImage(buffer, 0, 0);
    out.filter = "none";
    final = out.getImageData(0, 0, width, height);
  }
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  const display = canvas.getContext("2d", { willReadFrequently: true });
  display?.putImageData(final, 0, 0);
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
  dot,
  label,
}: DitherProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const paint = (amount: number) => {
      drawDither(canvas, source, {
        algorithm,
        brightness: amount,
        pixelSize,
        threshold,
        midtones,
        glow,
        dot,
      });
    };
    if (!animation) {
      paint(brightness);
      return;
    }
    // The published loop jitters brightness by the mapped intensity and redraws.
    // Random dither also reseeds its dots on that same interval.
    const span = Math.abs(mapIntensity(intensity));
    let frame = 0;
    let last = 0;
    let elapsed = 0;
    const tick = (now: number) => {
      if (last === 0) {
        last = now;
      }
      elapsed += now - last;
      last = now;
      if (elapsed >= interval * 1000) {
        elapsed = 0;
        paint(brightness + (Math.random() * 2 - 1) * span);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
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
    dot,
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
