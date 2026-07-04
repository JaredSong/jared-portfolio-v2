import type { NextConfig } from "next";
import path from "node:path";

// Static export for Hostinger (same pipeline as v1):
//   npm run build → out/ → scp to public_html (see README / package.json
//   "deploy"). unoptimized images + trailing slashes are export requirements.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
