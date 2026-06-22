import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Point Turbopack to the monorepo root so it resolves workspace packages correctly
    root: path.resolve(__dirname, "../.."),
  },
};

export default nextConfig;
