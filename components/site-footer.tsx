"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { footerColumns, socialLinks } from "@/lib/routes";

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function HiringMark() {
  return (
    <span className="hiring-badge">
      HIRING
      <span className="shimmer-text-glow" aria-hidden="true">
        HIRING
      </span>
    </span>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  const home = pathname === "/";

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <Link
            href="/"
            className="footer-logo"
            aria-label="Jet"
            aria-current={home ? "page" : undefined}
            data-framer-page-link-current={home ? "true" : undefined}
          >
            <img src="/brand/logo-mark.svg" alt="" width={24} height={24} />
          </Link>
          <div className="footer-columns">
            {footerColumns.map((column) => (
              <div className="footer-column" key={column.title}>
                <p className="footer-title">{column.title}</p>
                <ul>
                  {column.links.map((link) => {
                    const current = isCurrent(pathname, link.href);
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={current ? "page" : undefined}
                          data-framer-page-link-current={
                            current ? "true" : undefined
                          }
                        >
                          {link.label}
                          {"badge" in link ? <HiringMark /> : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">
            Copyright © 2025 Jet.
            <br />
            All rights reserved.
          </p>
          <ul className="socials">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <span
                    className="social-icon"
                    style={{ "--icon": `url(/icons/${link.icon}.svg)` } as CSSProperties}
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
