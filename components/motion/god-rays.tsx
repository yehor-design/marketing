"use client";

import { useAnimationFrame } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { drawSourceGodRays } from "./god-rays-shader";
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
  /** Paper GodRays shader. The homepage hero and Pulser use this. */
  paper?: boolean;
  /** The published GodRays shader. The about hero shafts use this. */
  shader?: boolean;
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
  paper: boolean;
  shader: boolean;
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

const COLOR_A = [0, 230 / 255, 197 / 255, 1] as const;
const COLOR_B = [50 / 255, 82 / 255, 77 / 255, 1] as const;
const TWO_PI = Math.PI * 2;

function fract(value: number) {
  return value - Math.floor(value);
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const span = edge1 - edge0;
  if (span === 0) {
    return value < edge0 ? 0 : 1;
  }
  const t = clamp01((value - edge0) / span);
  return t * t * (3 - 2 * t);
}

function hash2(x: number, y: number) {
  return fract(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123);
}

function valueNoise(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const x1 = a + (b - a) * ux;
  const x2 = c + (d - c) * ux;
  return x1 + (x2 - x1) * uy;
}

function rotate(x: number, y: number, angle: number) {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return [cosine * x - sine * y, sine * x + cosine * y] as const;
}

function raysShape(x: number, y: number, radiusTerm: number, freq: number, density: number) {
  const angle = Math.atan2(y, x);
  const left = valueNoise(angle * freq, radiusTerm);
  const right = valueNoise((angle - Math.floor(angle / TWO_PI) * TWO_PI) * freq, radiusTerm);
  const blend = smoothstep(-0.15, 0.15, x);
  const noise = right + (left - right) * blend;
  return noise ** density;
}

function shaderFallbackSize(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const longest = Math.max(rect.width, rect.height, 1);
  const scale = Math.min(1, 720 / longest);
  const width = Math.max(1, Math.round(rect.width * scale));
  const height = Math.max(1, Math.round(rect.height * scale));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  return { width, height };
}

function paperSize(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const longest = Math.max(rect.width, rect.height, 1);
  const scale = Math.min(1, 220 / longest);
  const width = Math.max(1, Math.round(rect.width * scale));
  const height = Math.max(1, Math.round(rect.height * scale));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  return { width, height };
}

function paintPaper(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  options: Options,
) {
  const image = ctx.createImageData(width, height);
  const data = image.data;
  const shortest = Math.min(width, height);
  const scaleX = width / shortest;
  const scaleY = height / shortest;
  const density = 4 - 3 * Math.min(1, Math.max(0, options.density));
  const spots = 5 * Math.abs(options.spotty);
  const clock = 0.2 * time;
  const midIntensity = options.centerIntensity ?? 0;
  const midSize = Math.abs(options.centerSize ?? 0);
  const colors = [COLOR_A, COLOR_B];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const uvX = ((x + 0.5) / width - 0.5) * scaleX;
      const uvY = (0.5 - (y + 0.5) / height) * scaleY + options.offsetY;
      const radius = Math.hypot(uvX, uvY);
      let middle = 0;
      if (midIntensity > 0 && midSize > 0) {
        middle = midIntensity ** 0.3 * smoothstep(midSize, 0.02 * midSize, 3 * radius);
        middle **= 5;
      }
      let accumR = 0;
      let accumG = 0;
      let accumB = 0;
      let accumA = 0;
      for (let index = 0; index < colors.length; index += 1) {
        const [rx, ry] = rotate(uvX, uvY, index + 1);
        const r1 = radius * (1 + 0.4 * index) - 3 * clock;
        const r2 = 0.5 * radius * (1 + spots) - 2 * clock;
        const hashed = fract(Math.sin((index + 10) * 43758.5453123) * 43758.5453123);
        const freq = (1 + (2 + 0.5 * index) * hashed) * options.frequency;
        let ray = raysShape(rx, ry, r1, 5 * freq, density);
        ray *= raysShape(rx, ry, r2, 4 * freq, density);
        ray += (1 + 4 * ray) * middle;
        ray = Math.min(1, Math.max(0, ray));
        const color = colors[index];
        const srcA = color[3] * ray;
        accumR += color[0] * srcA;
        accumG += color[1] * srcA;
        accumB += color[2] * srcA;
        accumA += srcA;
      }
      const grain =
        (1 / 256) *
        (fract(Math.sin(0.014 * x * 12.9898 + 0.014 * y * 78.233) * 43758.5453123) - 0.5);
      const pixel = (y * width + x) * 4;
      data[pixel] = Math.min(255, Math.max(0, Math.round((accumR + grain) * 255)));
      data[pixel + 1] = Math.min(255, Math.max(0, Math.round((accumG + grain) * 255)));
      data[pixel + 2] = Math.min(255, Math.max(0, Math.round((accumB + grain) * 255)));
      data[pixel + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
}

export function GodRays({
  speed = GOD_RAYS_SPEED,
  frequency = GOD_RAYS_FREQUENCY,
  spotty = GOD_RAYS_SPOTTY,
  offsetY = GOD_RAYS_OFFSET_Y,
  density = GOD_RAYS_DENSITY,
  centerIntensity,
  centerSize,
  paper = false,
  shader = false,
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
    paper,
    shader,
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
    paper,
    shader,
    reduced,
  };

  const draw = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    if (options.current.shader) {
      const frame = canvas.parentElement?.getBoundingClientRect();
      if (!frame || frame.width < 2 || frame.height < 2) {
        return;
      }
      const clock = options.current.reduced !== false ? 0 : time;
      if (!drawSourceGodRays(canvas, clock, options.current)) {
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        const { width, height } = shaderFallbackSize(canvas);
        paintPaper(ctx, width, height, clock, options.current);
      }
      return;
    }
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      return;
    }
    if (options.current.paper) {
      const { width, height } = paperSize(canvas);
      if (width < 2 || height < 2) {
        return;
      }
      paintPaper(ctx, width, height, options.current.reduced !== false ? 0 : time, options.current);
      return;
    }
    const { width, height } = fit(canvas);
    if (!bufferRef.current) {
      bufferRef.current = document.createElement("canvas");
    }
    paint(ctx, bufferRef.current, width, height, time, options.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    draw(0);
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
