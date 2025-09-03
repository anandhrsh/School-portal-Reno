/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  // Enable static file serving for uploaded images
  async rewrites() {
    return [
      {
        source: '/schoolImages/:path*',
        destination: '/schoolImages/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
