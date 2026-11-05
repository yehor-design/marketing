"use client";

import { useEffect, useRef } from "react";
import styles from "@/components/home/home.module.css";

type HalftoneProps = {
  src: string;
  label: string;
  pointSize?: number;
  pointSpacing?: number;
  contrast?: number;
  angle?: number;
  foreground?: string;
  background?: string;
};

function contrastChannel(value: number, amount: number) {
  return Math.min(255, Math.max(0, (value - 128) * amount + 128));
}

function rotatePoint(x: number, y: number, originX: number, originY: number, angle: number) {
  const dx = x - originX;
  const dy = y - originY;
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return [dx * cosine - dy * sine + originX, dx * sine + dy * cosine + originY] as const;
}

export function Halftone({
  src,
  label,
  pointSize = 6,
  pointSpacing = 3,
  contrast = 140,
  angle = 45,
  foreground = "#000",
  background = "#00e6c5",
}: HalftoneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const image = new Image();
    image.decoding = "async";
    image.src = src;
    let cancelled = false;
    const draw = () => {
      if (cancelled || !canvas) {
        return;
      }
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      if (width < 1 || height < 1) {
        return;
      }
      const sample = document.createElement("canvas");
      sample.width = width;
      sample.height = height;
      const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
      const out = canvas.getContext("2d");
      if (!sampleCtx || !out) {
        return;
      }
      canvas.width = width;
      canvas.height = height;
      sampleCtx.drawImage(image, 0, 0, width, height);
      const pixels = sampleCtx.getImageData(0, 0, width, height);
      const data = pixels.data;
      const amount = contrast / 100;
      for (let index = 0; index < data.length; index += 4) {
        data[index] = contrastChannel(data[index], amount);
        data[index + 1] = contrastChannel(data[index + 1], amount);
        data[index + 2] = contrastChannel(data[index + 2], amount);
      }
      const radians = (angle * Math.PI) / 180;
      const corners = [
        [0, 0],
        [width, 0],
        [width, height],
        [0, height],
      ].map(([x, y]) => rotatePoint(x, y, width / 2, height / 2, radians));
      const minX = Math.min(...corners.map((point) => point[0])) | 0;
      const minY = Math.min(...corners.map((point) => point[1])) | 0;
      const maxX = Math.max(...corners.map((point) => point[0])) | 0;
      const maxY = Math.max(...corners.map((point) => point[1])) | 0;
      const step = Math.max(pointSize * (1 + pointSpacing / 10), pointSpacing);
      out.fillStyle = background;
      out.fillRect(0, 0, width, height);
      out.fillStyle = foreground;
      for (let y = minY; y < maxY; y += step) {
        for (let x = minX; x < maxX; x += step) {
          const [sampleX, sampleY] = rotatePoint(x, y, width / 2, height / 2, -radians);
          if (sampleX < 0 || sampleY < 0 || sampleX > width || sampleY > height) {
            continue;
          }
          const px = Math.floor(sampleX);
          const py = Math.floor(sampleY);
          const index = (py * width + px) * 4;
          if (!data[index + 3]) {
            continue;
          }
          const radius = (pointSize / 2) * (1 - data[index] / 255);
          if (radius <= 0) {
            continue;
          }
          out.beginPath();
          out.arc(sampleX, sampleY, radius, 0, Math.PI * 2);
          out.fill();
        }
      }
    };
    if (image.complete && image.naturalWidth > 0) {
      draw();
    } else {
      image.addEventListener("load", draw);
    }
    return () => {
      cancelled = true;
      image.removeEventListener("load", draw);
    };
  }, [angle, background, contrast, foreground, pointSize, pointSpacing, src]);

  return <canvas ref={canvasRef} className={styles.halftone} role="img" aria-label={label} />;
}
