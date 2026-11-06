"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RollingText } from "@/components/motion";
import { GrayRing } from "@/components/motion/gray-ring";
import { navLinks } from "@/lib/routes";

function NavRoll({
  href,
  text,
  className,
}: {
  href: string;
  text: string;
  className: string;
}) {
  const [rolling, setRolling] = useState(false);

  return (
    <Link
      href={href}
      className={className}
      onPointerEnter={() => setRolling(true)}
      onPointerLeave={() => setRolling(false)}
      onFocus={() => setRolling(true)}
      onBlur={() => setRolling(false)}
    >
      <RollingText text={text} rolling={rolling} fontSize={12} />
      {className.includes("gray-pill") ? <GrayRing /> : null}
    </Link>
  );
}

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const home = pathname === "/";

  function closeSoon() {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
    }
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
      closeTimer.current = null;
    }, 50);
  }

  useEffect(() => {
    return () => {
      if (closeTimer.current !== null) {
        window.clearTimeout(closeTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1200px)");
    const onChange = () => {
      if (desktop.matches) {
        setOpen(false);
      }
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1200px)");
    if (!open || desktop.matches) {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const inertTargets = document.querySelectorAll(".site-body, .site-footer");
    inertTargets.forEach((node) => node.setAttribute("inert", ""));
    return () => {
      document.body.style.overflow = previous;
      inertTargets.forEach((node) => node.removeAttribute("inert"));
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSoon();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={open ? "site-header is-open" : "site-header"}>
      <div className="header-bar">
        <div className="header-inner">
          <Link
            href="/"
            className="logo"
            aria-current={home ? "page" : undefined}
            data-framer-page-link-current={home ? "true" : undefined}
            onClick={() => {
              if (open) {
                closeSoon();
              }
            }}
          >
            <img
              src="/brand/logo-wordmark.svg"
              alt="Jet"
              width={62}
              height={24}
            />
          </Link>
          <nav className="desktop-nav" aria-label="Primary">
            <ul>
              {navLinks.map((link) => {
                const current = isCurrent(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={current ? "page" : undefined}
                      data-framer-page-link-current={current ? "true" : undefined}
                    >
                      {link.label}
                      {"badge" in link ? (
                        <span className="count-badge">{link.badge}</span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="desktop-actions">
            <NavRoll
              href="/contact"
              text="Contact"
              className="nav-button nav-button-secondary gray-pill"
            />
            <NavRoll
              href="/waitlist"
              text={"Join\u00A0waitlist"}
              className={
                home
                  ? "nav-button nav-button-secondary gray-pill"
                  : "nav-button nav-button-primary"
              }
            />
          </div>
          <button
            type="button"
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => {
              if (open) {
                closeSoon();
              } else {
                if (closeTimer.current !== null) {
                  window.clearTimeout(closeTimer.current);
                  closeTimer.current = null;
                }
                setOpen(true);
              }
            }}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      {open ? (
        <div id="mobile-menu" className="mobile-panel">
          <Link className="mobile-cta" href="/waitlist" onClick={closeSoon}>
            <RollingText text={"Join\u00A0waitlist"} />
          </Link>
          <nav aria-label="Primary">
            <ul className="mobile-links">
              {navLinks.map((link) => {
                const current = isCurrent(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={current ? "page" : undefined}
                      data-framer-page-link-current={current ? "true" : undefined}
                      onClick={closeSoon}
                    >
                      {link.label}
                      {"badge" in link ? (
                        <span className="count-badge">{link.badge}</span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
