"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Hover ring for gray pills. The 40px pills use an 8/6 dash. The 30px
 * nav pills use a 6/4 dash. Both strokes are #333 and stay inside the
 * button so the label and the button size do not move.
 */
export function GrayRing() {
  const ref = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const svg = ref.current;
    const parent = svg?.parentElement;
    const path = svg?.querySelector("path");
    if (!svg || !parent || !path) {
      return;
    }

    const draw = () => {
      const parentBox = parent.getBoundingClientRect();
      const ringBox = svg.getBoundingClientRect();
      const width = Math.max(1, ringBox.width || parentBox.width);
      const height = Math.max(1, ringBox.height || parentBox.height);
      const parentRadius = parseFloat(getComputedStyle(parent).borderRadius) || 0;
      const radius = Math.max(0, Math.min(parentRadius, height / 2, width / 2) - 0.5);
      const small = parentBox.height <= 32.5;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      path.setAttribute("d", rounded(0.5, 0.5, width - 1, height - 1, radius));
      path.setAttribute("stroke-dasharray", small ? "6 4" : "8 6");
      path.dataset.dash = small ? "sm" : "lg";
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(parent);
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <svg ref={ref} className="gray-pill-ring" aria-hidden="true" preserveAspectRatio="none">
      <path fill="none" stroke="#333" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function rounded(x: number, y: number, w: number, h: number, radius: number) {
  const r = Math.max(0, Math.min(radius, w / 2, h / 2));
  if (w <= 1 || h <= 1) {
    return "";
  }
  if (r <= 0) {
    return `M ${x} ${y} H ${x + w} V ${y + h} H ${x} Z`;
  }
  return `M ${x + r} ${y} H ${x + w - r} A ${r} ${r} 0 0 1 ${x + w} ${y + r} V ${y + h - r} A ${r} ${r} 0 0 1 ${x + w - r} ${y + h} H ${x + r} A ${r} ${r} 0 0 1 ${x} ${y + h - r} V ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y} Z`;
}
