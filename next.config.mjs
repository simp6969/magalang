/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [128, 256],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // better-sqlite3 is a native Node module; must run server-side only
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
};

export default nextConfig;
