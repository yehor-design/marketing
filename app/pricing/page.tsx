import type { Metadata } from "next";
import { PricingPage } from "@/components/pricing/pricing-page";

export const metadata: Metadata = {
  title: "Pricing – Jet",
  description:
    "Supercharge your website with Jet. Instantly optimize images, code, and speed with no code required. Boost SEO, improve user experience, and increase conversions—effortlessly.",
  alternates: {
    canonical: "https://jet.framer.website/pricing",
  },
};

export default function Page() {
  return <PricingPage />;
}
