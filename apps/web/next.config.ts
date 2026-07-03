import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Point Turbopack to the monorepo root so it resolves workspace packages correctly
    root: path.resolve(__dirname, "../..")
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.javaorigins.co.nz',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.javaroyalenusantara.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
