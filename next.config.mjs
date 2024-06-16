/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.asuracomics.com",
      },
      {
        protocol: "https",
        hostname: "asuratoon.com",
      },
      {
        protocol: "https",
        hostname: "suryatoon.com",
      },
      {
        protocol: "https",
        hostname: "luminouscomics.org",
      },
      {
        protocol: "https",
        hostname: "flamecomics.me",
      },
      {
        protocol: "https",
        hostname: "flamecomics.com",
      },
    ],
  },
};

export default nextConfig;
