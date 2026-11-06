"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Outlined dashes on the live site are SVG strokes (12px dash, 6px gap)
 * that travel one period per second. CSS border-style cannot move that
 * pattern, so dashed edges are redrawn here.
 */
export function TravelingDashes() {
  const pathname = usePathname();

  useEffect(() => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.classList.add("jet-dash-layer");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      svg.classList.add("is-static");
    }
    document.body.appendChild(svg);

    const touched = new Set<HTMLElement>();
    let frame = 0;

    const rebuild = () => {
      const width = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
      const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.style.width = `${width}px`;
      svg.style.height = `${height}px`;
      svg.replaceChildren();

      document.body.querySelectorAll<HTMLElement>("*").forEach((el) => {
        if (el.closest(".jet-dash-layer, .gray-pill")) {
          return;
        }
        const style = getComputedStyle(el);
        const top = style.borderTopStyle === "dashed" && parseFloat(style.borderTopWidth) > 0;
        const right = style.borderRightStyle === "dashed" && parseFloat(style.borderRightWidth) > 0;
        const bottom = style.borderBottomStyle === "dashed" && parseFloat(style.borderBottomWidth) > 0;
        const left = style.borderLeftStyle === "dashed" && parseFloat(style.borderLeftWidth) > 0;
        const outline = style.outlineStyle === "dashed" && parseFloat(style.outlineWidth) > 0;
        if (!top && !right && !bottom && !left && !outline) {
          return;
        }

        const rect = el.getBoundingClientRect();
        if (rect.width < 2 || rect.height < 2) {
          return;
        }

        const x = rect.left + window.scrollX;
        const y = rect.top + window.scrollY;
        const w = rect.width;
        const h = rect.height;
        const color = paintColor(el, style);
        if (top) el.style.borderTopColor = "transparent";
        if (right) el.style.borderRightColor = "transparent";
        if (bottom) el.style.borderBottomColor = "transparent";
        if (left) el.style.borderLeftColor = "transparent";
        if (outline) el.style.outlineColor = "transparent";
        touched.add(el);

        if (top && right && bottom && left) {
          addPath(svg, `M ${x} ${y} H ${x + w} V ${y + h} H ${x} Z`, color);
        } else {
          if (top) addPath(svg, `M ${x} ${y} H ${x + w}`, color);
          if (right) addPath(svg, `M ${x + w} ${y} V ${y + h}`, color);
          if (bottom) addPath(svg, `M ${x + w} ${y + h} H ${x}`, color);
          if (left) addPath(svg, `M ${x} ${y + h} V ${y}`, color);
        }

        if (outline) {
          const offset = parseFloat(style.outlineOffset) || 0;
          const inset = -offset;
          const radius = Math.max(
            0,
            Math.min(parseFloat(style.borderTopLeftRadius) || 0, (w - inset * 2) / 2, (h - inset * 2) / 2),
          );
          addPath(svg, rounded(x + inset, y + inset, w - inset * 2, h - inset * 2, radius), color);
        }
      });
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(rebuild);
    };

    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(document.documentElement);
    observer.observe(document.body);
    window.addEventListener("resize", schedule);
    const later = window.setTimeout(schedule, 600);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(later);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      svg.remove();
      touched.forEach((el) => {
        el.style.borderTopColor = "";
        el.style.borderRightColor = "";
        el.style.borderBottomColor = "";
        el.style.borderLeftColor = "";
        el.style.outlineColor = "";
        delete el.dataset.jetDashColor;
      });
    };
  }, [pathname]);

  return null;
}

function paintColor(el: HTMLElement, style: CSSStyleDeclaration) {
  if (el.dataset.jetDashColor) {
    return el.dataset.jetDashColor;
  }
  const sampled = [
    style.borderTopColor,
    style.borderRightColor,
    style.borderBottomColor,
    style.borderLeftColor,
    style.outlineColor,
  ].find((color) => color && color !== "transparent" && color !== "rgba(0, 0, 0, 0)");
  const color = sampled && /^(#|rgb)/.test(sampled) ? sampled : "#1c1c1c";
  el.dataset.jetDashColor = color;
  return color;
}

function addPath(svg: SVGSVGElement, d: string, color: string) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  path.setAttribute("stroke", color);
  svg.appendChild(path);
}

function rounded(x: number, y: number, w: number, h: number, radius: number) {
  const r = Math.max(0, Math.min(radius, w / 2, h / 2));
  if (w <= 1 || h <= 1) {
    return "";
  }
  return `M ${x + r} ${y} H ${x + w - r} A ${r} ${r} 0 0 1 ${x + w} ${y + r} V ${y + h - r} A ${r} ${r} 0 0 1 ${x + w - r} ${y + h} H ${x + r} A ${r} ${r} 0 0 1 ${x} ${y + h - r} V ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y} Z`;
}
