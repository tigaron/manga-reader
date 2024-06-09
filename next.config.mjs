/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.asuracomics.com',
      },
      {
        protocol: 'https',
        hostname: 'asuratoon.com',
      },
      {
        protocol: 'https',
        hostname: 'suryatoon.com',
      }
    ]
  }
};

export default nextConfig;
