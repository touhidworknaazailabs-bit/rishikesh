import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // next/image only serves qualities explicitly allow-listed here.
    // 90 is what PropertyImage requests for real photos; 75 stays as
    // the implicit default for anything that doesn't set one.
    qualities: [75, 90],
  },
};

export default nextConfig;
