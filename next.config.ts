import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  transpilePackages: ["@platform-system/design-ui", "@platform/api-client"],
  experimental: {
    externalDir: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
