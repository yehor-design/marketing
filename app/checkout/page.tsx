import type { Metadata } from "next";
import { CheckoutPage } from "@/components/checkout/checkout-page";

export const metadata: Metadata = {
  title: "Jet – Lightning-Fast Website Optimization",
  description:
    "Supercharge your website with Jet. Instantly optimize images, code, and speed with no code required. Boost SEO, improve user experience, and increase conversions—effortlessly.",
  alternates: {
    canonical: "https://jet.framer.website/checkout",
  },
};

export default function Page() {
  return <CheckoutPage />;
}
