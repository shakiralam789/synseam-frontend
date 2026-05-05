import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* Turbopack is the default bundler in Next.js 16 for both dev and build */
};

export default nextConfig;
