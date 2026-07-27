import type { NextConfig } from "next";
import path from 'path';


const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Sets the root to the parent directory (e.g., monorepo root)
    // lockfile warning解消
    root: path.resolve(__dirname, '../../'),
  },
};

export default nextConfig;
