import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 768, 1024],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
