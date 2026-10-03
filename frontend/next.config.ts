import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '') || 'http://localhost:3000';
    return [
      {
        source: '/api/proxy/:path*',
        destination: `${backendUrl}/:path*`
      }
    ];
  }
};

export default nextConfig;
