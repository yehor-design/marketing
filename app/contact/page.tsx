import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact – Jet",
  description:
    "Supercharge your website with Jet. Instantly optimize images, code, and speed with no code required. Boost SEO, improve user experience, and increase conversions—effortlessly.",
  alternates: {
    canonical: "https://jet.framer.website/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
