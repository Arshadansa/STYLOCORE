/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      loader: 'default', // Default Next.js loader for internal images
      disableStaticImages: false, // Enable static image imports
    },
  };

export default nextConfig;
