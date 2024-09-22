/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://stylocore.vercel.app/"], // Only domain names, no protocol
    unoptimized: true, // Disable image optimization for static export (if required)
  },
  webpack(config) {
    // Add file-loader for handling video files
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/, // File extensions to match
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/', // Public path for serving videos
          outputPath: 'static/videos/', // Output directory for the video files
          name: '[name].[hash].[ext]', // Filename format with hash for cache busting
        },
      },
    });

    return config;
  },
};

export default nextConfig;
