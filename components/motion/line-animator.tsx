"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./use-reduced-motion";

type Dash = {
  position: number;
  dash: number;
  gap: number;
  duration: number;
  direction: number;
};

/**
 * CTA Block line animator. Horizontal dashes, line height 4%, gap 0, speed 0.6.
 * Each line loops its dash offset over `(0.8 + random * 1.7) / speed` seconds.
 */
export function LineAnimator() {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const svg = svgRef.current;
    const frame = svg?.parentElement;
    if (!svg || !frame) {
      return;
    }
    const color = "#000";
    const speed = 0.6;
    let dashes: Dash[] = [];
    let frameId = 0;
    const started = performance.now();

    const layout = () => {
      const rect = frame.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.setAttribute("width", String(width));
      svg.setAttribute("height", String(height));
      const thickness = Math.max(1, Math.round(height * 0.04));
      const step = thickness;
      let count = Math.ceil((height - thickness) / step) + 1;
      if (count > 0 && (count - 1) * step + thickness < height) {
        count += 1;
      }
      const next: Dash[] = [];
      const seed = 20250601;
      let state = seed;
      const random = () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
      };
      for (let index = 0; index < count; index += 1) {
        const dash = width * (0.2 + random() * 0.6);
        const gap = width * (0.1 + random() * 0.5);
        next.push({
          position: index * step + thickness / 2,
          dash,
          gap,
          duration: (0.8 + random() * 1.7) / speed,
          direction: random() > 0.5 ? 1 : -1,
        });
      }
      dashes = next;
      paint(0);
    };

    const paint = (seconds: number) => {
      const width = Number(svg.getAttribute("width")) || 1;
      const lines = dashes
        .map((dash) => {
          const phase = dash.duration === 0 ? 0 : (seconds % dash.duration) / dash.duration;
          const offset = dash.direction * (dash.dash + dash.gap) * phase;
          return `<line x1="0" y1="${dash.position}" x2="${width}" y2="${dash.position}" stroke="${color}" stroke-width="${Math.max(1, Math.round((Number(svg.getAttribute("height")) || 1) * 0.04))}" stroke-dasharray="${dash.dash} ${dash.gap}" stroke-dashoffset="${offset}" stroke-linecap="butt" />`;
        })
        .join("");
      svg.innerHTML = lines;
    };

    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(frame);
    const tick = (now: number) => {
      if (reduced !== true) {
        paint((now - started) / 1000);
      }
      frameId = window.requestAnimationFrame(tick);
    };
    frameId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, zIndex: 2, overflow: "hidden", pointerEvents: "none" }}
    >
      <svg ref={svgRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
    </div>
  );
}
