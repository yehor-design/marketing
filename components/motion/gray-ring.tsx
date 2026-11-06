"use client";

import { useLayoutEffect, useRef } from "react";

/** Hover ring for gray pills: 8px dash, 6px gap, stroke #333, size stays put. */
export function GrayRing() {
  const ref = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const svg = ref.current;
    const parent = svg?.parentElement;
    if (!svg || !parent) {
      return;
    }
    const path = svg.querySelector("path");
    if (!path) {
      return;
    }

    const draw = () => {
      const box = svg.getBoundingClientRect();
      const parentBox = parent.getBoundingClientRect();
      const width = Math.max(1, box.width);
      const height = Math.max(1, box.height);
      const parentRadius = parseFloat(getComputedStyle(parent).borderRadius) || 0;
      const inset = Math.max(0, parentBox.width - width);
      const radius = Math.max(0, Math.min(parentRadius - inset / 2, height / 2) - 0.5);
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      path.setAttribute("d", rounded(0.5, 0.5, width - 1, height - 1, radius));
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(parent);
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <svg ref={ref} className="gray-pill-ring" aria-hidden="true">
      <path fill="none" stroke="#333" strokeWidth="1" strokeDasharray="8 6" />
    </svg>
  );
}

function rounded(x: number, y: number, w: number, h: number, radius: number) {
  const r = Math.max(0, Math.min(radius, w / 2, h / 2));
  if (w <= 0 || h <= 0) {
    return "";
  }
  return `M ${x + r} ${y} H ${x + w - r} A ${r} ${r} 0 0 1 ${x + w} ${y + r} V ${y + h - r} A ${r} ${r} 0 0 1 ${x + w - r} ${y + h} H ${x + r} A ${r} ${r} 0 0 1 ${x} ${y + h - r} V ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y} Z`;
}
