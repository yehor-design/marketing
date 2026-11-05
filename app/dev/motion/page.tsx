import type { Metadata } from "next";
import { MotionLab } from "./lab";

export const metadata: Metadata = {
  title: "Motion",
  robots: { index: false, follow: false },
};

export default function MotionDevPage() {
  return <MotionLab />;
}
