/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['http://localhost:3000/', 'https://stylocore-everidoor.vercel.app/'],
      unoptimized: true, // Disable image optimization for static export
    },
  }

export default nextConfig;
