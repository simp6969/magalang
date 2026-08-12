/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [128, 256],
    formats: ["image/avif", "image/webp"],
  },

};

export default nextConfig;
