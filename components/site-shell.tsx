import type { ReactNode } from "react";
import { Announcement } from "@/components/announcement";
import { TravelingDashes } from "@/components/motion/traveling-dashes";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <TravelingDashes />
      <SiteHeader />
      <div className="site-body">
        <Announcement />
        <main className="site-main">{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
}
