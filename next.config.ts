import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com"]
  }
};

export default nextConfig;
