import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const immutableAsset = [
  { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Hotel photos are static; let browsers and the Vercel edge cache them.
      { source: "/images/:path*", headers: immutableAsset },
    ];
  },
  images: {
    // Vercel's free tier meters image optimisation, so keep the number of
    // distinct variants small: few widths, two qualities, long cache.
    qualities: [75, 80],
    deviceSizes: [640, 960, 1280, 1600],
    imageSizes: [320, 640],
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 31,
  },
};

export default nextConfig;
