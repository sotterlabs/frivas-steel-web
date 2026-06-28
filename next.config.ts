import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a minimal, self-contained build in .next/standalone —
  // required for an efficient multi-stage Docker image (no need to
  // ship the full node_modules tree into the runtime image).
  output: "standalone",
};

export default nextConfig;