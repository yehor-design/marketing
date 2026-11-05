import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About – Jet",
  description:
    "Supercharge your website with Jet. Instantly optimize images, code, and speed with no code required. Boost SEO, improve user experience, and increase conversions—effortlessly.",
  alternates: {
    canonical: "https://jet.framer.website/about",
  },
};

export default function Page() {
  return <AboutPage />;
}
