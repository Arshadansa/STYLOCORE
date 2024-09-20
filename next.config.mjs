/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://stylocore.vercel.app/"], // Only domain names, no protocol
    unoptimized: true, // Disable image optimization for static export (if required)
  },
};

export default nextConfig;
