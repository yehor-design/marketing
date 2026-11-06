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
        paintBox(svg, el, getComputedStyle(el), el.getBoundingClientRect(), "jetDashColor", touched);
        paintPseudo(svg, el, "before", touched);
        paintPseudo(svg, el, "after", touched);
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
        el.classList.remove("jet-dash-before", "jet-dash-after");
        delete el.dataset.jetDashColor;
        delete el.dataset.jetDashBefore;
        delete el.dataset.jetDashAfter;
      });
    };
  }, [pathname]);

  return null;
}

type DashKey = "jetDashColor" | "jetDashBefore" | "jetDashAfter";

type Sides = { top: boolean; right: boolean; bottom: boolean; left: boolean; outline: boolean };

function paintPseudo(svg: SVGSVGElement, el: HTMLElement, name: "before" | "after", touched: Set<HTMLElement>) {
  const style = getComputedStyle(el, name === "before" ? "::before" : "::after");
  if (style.content === "none" || style.content === "normal") {
    return;
  }
  const sides = readSides(style);
  if (!sides.top && !sides.right && !sides.bottom && !sides.left) {
    return;
  }
  const host = el.getBoundingClientRect();
  const parent = getComputedStyle(el);
  const left = (style.left === "auto" ? 0 : parseFloat(style.left) || 0) + (parseFloat(parent.borderLeftWidth) || 0);
  const top = (style.top === "auto" ? 0 : parseFloat(style.top) || 0) + (parseFloat(parent.borderTopWidth) || 0);
  const width = parseFloat(style.width) || 0;
  const height = parseFloat(style.height) || 0;
  if (width < 2 && height < 2) {
    return;
  }
  const rect = new DOMRect(host.left + left, host.top + top, Math.max(width, 1), Math.max(height, 1));
  paintBox(svg, el, style, rect, name === "before" ? "jetDashBefore" : "jetDashAfter", touched, true);
  el.classList.add(name === "before" ? "jet-dash-before" : "jet-dash-after");
}

function paintBox(
  svg: SVGSVGElement,
  el: HTMLElement,
  style: CSSStyleDeclaration,
  rect: DOMRect,
  key: DashKey,
  touched: Set<HTMLElement>,
  generated = false,
) {
  const sides = readSides(style);
  if (!sides.top && !sides.right && !sides.bottom && !sides.left && !sides.outline) {
    return;
  }
  if (!generated && (rect.width < 2 || rect.height < 2)) {
    return;
  }

  const x = rect.left + window.scrollX;
  const y = rect.top + window.scrollY;
  const w = rect.width;
  const h = rect.height;
  const color = paintColor(el, style, sides, key);
  if (!generated) {
    if (sides.top) el.style.borderTopColor = "transparent";
    if (sides.right) el.style.borderRightColor = "transparent";
    if (sides.bottom) el.style.borderBottomColor = "transparent";
    if (sides.left) el.style.borderLeftColor = "transparent";
    if (sides.outline) el.style.outlineColor = "transparent";
  }
  touched.add(el);

  if (sides.top && sides.right && sides.bottom && sides.left) {
    addPath(svg, `M ${x + 0.5} ${y + 0.5} H ${x + w - 0.5} V ${y + h - 0.5} H ${x + 0.5} Z`, color);
  } else {
    if (sides.top) addPath(svg, `M ${x} ${y + 0.5} H ${x + w}`, color);
    if (sides.right) addPath(svg, `M ${x + w - 0.5} ${y} V ${y + h}`, color);
    if (sides.bottom) addPath(svg, `M ${x + w} ${y + h - 0.5} H ${x}`, color);
    if (sides.left) addPath(svg, `M ${x + 0.5} ${y + h} V ${y}`, color);
  }

  if (sides.outline) {
    const offset = parseFloat(style.outlineOffset) || 0;
    const inset = -offset + 0.5;
    const radius = Math.max(
      0,
      Math.min(parseFloat(style.borderTopLeftRadius) || 0, (w - inset * 2) / 2, (h - inset * 2) / 2),
    );
    addPath(svg, rounded(x + inset, y + inset, Math.max(1, w - inset * 2), Math.max(1, h - inset * 2), radius), color);
  }
}

function readSides(style: CSSStyleDeclaration): Sides {
  return {
    top: style.borderTopStyle === "dashed" && parseFloat(style.borderTopWidth) > 0,
    right: style.borderRightStyle === "dashed" && parseFloat(style.borderRightWidth) > 0,
    bottom: style.borderBottomStyle === "dashed" && parseFloat(style.borderBottomWidth) > 0,
    left: style.borderLeftStyle === "dashed" && parseFloat(style.borderLeftWidth) > 0,
    outline: style.outlineStyle === "dashed" && parseFloat(style.outlineWidth) > 0,
  };
}

function paintColor(el: HTMLElement, style: CSSStyleDeclaration, sides: Sides, key: DashKey) {
  const stored = el.dataset[key];
  if (stored && !isNearWhite(stored)) {
    return stored;
  }
  const candidates = [
    sides.top ? style.borderTopColor : "",
    sides.right ? style.borderRightColor : "",
    sides.bottom ? style.borderBottomColor : "",
    sides.left ? style.borderLeftColor : "",
    sides.outline ? style.outlineColor : "",
  ];
  const sampled = candidates.find((color) => color && color !== "transparent" && color !== "rgba(0, 0, 0, 0)");
  const color = sampled && /^(#|rgb)/.test(sampled) && !isNearWhite(sampled) ? sampled : "#1c1c1c";
  el.dataset[key] = color;
  return color;
}

function isNearWhite(color: string) {
  if (/^#fff(?:fff)?$/i.test(color)) {
    return true;
  }
  const match = color.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
  if (!match) {
    return false;
  }
  return Number(match[1]) > 240 && Number(match[2]) > 240 && Number(match[3]) > 240;
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
  if (r <= 0.5) {
    return `M ${x} ${y} H ${x + w} V ${y + h} H ${x} Z`;
  }
  return `M ${x + r} ${y} H ${x + w - r} A ${r} ${r} 0 0 1 ${x + w} ${y + r} V ${y + h - r} A ${r} ${r} 0 0 1 ${x + w - r} ${y + h} H ${x + r} A ${r} ${r} 0 0 1 ${x} ${y + h - r} V ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y} Z`;
}
