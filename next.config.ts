import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: ".",
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
  // Exclude opik from bundling as it has Node.js-specific dependencies
  serverExternalPackages: ['opik'],
};

export default nextConfig;
