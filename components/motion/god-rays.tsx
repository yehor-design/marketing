"use client";

import { useAnimationFrame } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import styles from "./motion.module.css";
import { usePrefersReducedMotion } from "./use-reduced-motion";

/** No CSS duration or easing. time += deltaSeconds * speed. */
export const GOD_RAYS_SPEED = 5;
export const GOD_RAYS_FREQUENCY = 0;
export const GOD_RAYS_SPOTTY = 2.5;
export const GOD_RAYS_OFFSET_Y = 0.49;
export const GOD_RAYS_DENSITY = 0.5;
export const GOD_RAYS_COLOR_A = [0, 230, 197] as const;
export const GOD_RAYS_COLOR_B = [50, 82, 77] as const;
export const GOD_RAYS_COLOR_BACK = [0, 0, 0] as const;

type Rgb = readonly [number, number, number];

export type GodRaysProps = {
  speed?: number;
  frequency?: number;
  spotty?: number;
  offsetY?: number;
  density?: number;
  centerIntensity?: number;
  centerSize?: number;
  label?: string;
};

type Options = {
  speed: number;
  frequency: number;
  spotty: number;
  offsetY: number;
  density: number;
  centerIntensity?: number;
  centerSize?: number;
  reduced: boolean | null;
};

function rgba(rgb: Rgb, alpha: number) {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

function fit(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  return { width, height };
}

function mix(from: Rgb, to: Rgb, amount: number): Rgb {
  return [
    from[0] + (to[0] - from[0]) * amount,
    from[1] + (to[1] - from[1]) * amount,
    from[2] + (to[2] - from[2]) * amount,
  ];
}

function paint(
  ctx: CanvasRenderingContext2D,
  buffer: HTMLCanvasElement,
  width: number,
  height: number,
  time: number,
  options: Options,
) {
  if (buffer.width !== width || buffer.height !== height) {
    buffer.width = width;
    buffer.height = height;
  }
  const rays = buffer.getContext("2d");
  if (!rays) {
    return;
  }
  rays.setTransform(1, 0, 0, 1, 0, 0);
  rays.clearRect(0, 0, width, height);
  rays.globalCompositeOperation = "lighter";

  const originX = width * 0.5;
  const originY = height * options.offsetY;
  const count = 6 + options.frequency;
  const reach = Math.hypot(width, height);
  const stops = 10;

  for (let index = 0; index < count; index += 1) {
    const angle = (index / count) * Math.PI * 2 + 0.4;
    rays.save();
    rays.translate(originX, originY);
    rays.rotate(angle);
    const gradient = rays.createLinearGradient(0, 0, reach, 0);
    for (let stop = 0; stop <= stops; stop += 1) {
      const t = stop / stops;
      const wave = Math.sin(t * options.spotty * Math.PI * 2 - time);
      const spots = 0.4 + 0.6 * (wave * 0.5 + 0.5);
      const fade = (1 - t) * (1 - t);
      const alpha = Math.min(1, options.density * spots * fade * 0.85);
      gradient.addColorStop(t, rgba(mix(GOD_RAYS_COLOR_A, GOD_RAYS_COLOR_B, t), alpha));
    }
    rays.fillStyle = gradient;
    rays.beginPath();
    rays.moveTo(0, 0);
    rays.lineTo(reach, reach * 0.16);
    rays.lineTo(reach, reach * -0.16);
    rays.closePath();
    rays.fill();
    rays.restore();
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  ctx.filter = "none";
  ctx.fillStyle = rgba(GOD_RAYS_COLOR_BACK, 1);
  ctx.fillRect(0, 0, width, height);
  ctx.filter = `blur(${Math.max(10, Math.round(height * 0.06))}px)`;
  ctx.drawImage(buffer, 0, 0);
  ctx.filter = "none";

  if (options.centerIntensity !== undefined && options.centerSize !== undefined) {
    const radius = Math.max(width, height) * options.centerSize * 0.55;
    const gradient = ctx.createRadialGradient(originX, originY, 0, originX, originY, radius);
    gradient.addColorStop(0, rgba(GOD_RAYS_COLOR_A, options.centerIntensity));
    gradient.addColorStop(1, rgba(GOD_RAYS_COLOR_A, 0));
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(originX, originY, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }
}

export function GodRays({
  speed = GOD_RAYS_SPEED,
  frequency = GOD_RAYS_FREQUENCY,
  spotty = GOD_RAYS_SPOTTY,
  offsetY = GOD_RAYS_OFFSET_Y,
  density = GOD_RAYS_DENSITY,
  centerIntensity,
  centerSize,
  label = "GodRays",
}: GodRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bufferRef = useRef<HTMLCanvasElement | null>(null);
  const timeRef = useRef(0);
  const drewStatic = useRef(false);
  const reduced = usePrefersReducedMotion();
  const options = useRef<Options>({
    speed,
    frequency,
    spotty,
    offsetY,
    density,
    centerIntensity,
    centerSize,
    reduced,
  });
  options.current = {
    speed,
    frequency,
    spotty,
    offsetY,
    density,
    centerIntensity,
    centerSize,
    reduced,
  };

  const draw = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const { width, height } = fit(canvas);
    if (!bufferRef.current) {
      bufferRef.current = document.createElement("canvas");
    }
    paint(ctx, bufferRef.current, width, height, time, options.current);
  }, []);

  useEffect(() => {
    draw(0);
    const canvas = canvasRef.current;
    const frame = canvas?.parentElement ?? canvas;
    if (!frame) {
      return;
    }
    const observer = new ResizeObserver(() => {
      const time = options.current.reduced !== false ? 0 : timeRef.current;
      draw(time);
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, [draw]);

  const onFrame = useCallback((_timestamp: number, deltaMs: number) => {
    if (options.current.reduced !== false) {
      if (!drewStatic.current) {
        timeRef.current = 0;
        draw(0);
        drewStatic.current = true;
      }
      return;
    }
    drewStatic.current = false;
    timeRef.current += (deltaMs / 1000) * options.current.speed;
    draw(timeRef.current);
  }, [draw]);

  useAnimationFrame(onFrame);

  return (
    <div className={styles.raysFrame}>
      <canvas ref={canvasRef} className={styles.rays} role="img" aria-label={label} />
    </div>
  );
}
