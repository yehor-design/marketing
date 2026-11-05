import type { Metadata } from "next";
import { WaitlistPage } from "@/components/waitlist/waitlist-page";

export const metadata: Metadata = {
  title: "Waitlist – Jet",
  description:
    "Supercharge your website with Jet. Instantly optimize images, code, and speed with no code required. Boost SEO, improve user experience, and increase conversions—effortlessly.",
  alternates: {
    canonical: "https://jet.framer.website/waitlist",
  },
};

export default function Page() {
  return <WaitlistPage />;
}
