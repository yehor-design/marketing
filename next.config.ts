import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server binds 0.0.0.0. Browsers that open it at 127.0.0.1 send that
  // origin on the HMR socket, and Next blocks the socket unless the host is listed.
  // Without the socket, the dev debug channel never closes and the page never hydrates.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
