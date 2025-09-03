/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  typescript: {
    // Enable TypeScript strict mode
    ignoreBuildErrors: false,
  },
  // External packages for server components
  serverExternalPackages: [],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'your-production-domain.com',
      },
    ],
  },
  eslint: {
    // Skip ESLint checks during Vercel build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
