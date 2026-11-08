/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev     = process.env.NODE_ENV !== 'production';

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },

  // Silence "workspace root" warning — tells Next.js this app lives inside a monorepo
  outputFileTracingRoot: path.join(__dirname, '..'),

  // Dev-only rewrites — production uses vercel.json rewrites
  ...(isDev && {
    async rewrites() {
      return [
        {
          source:      '/api/:path*',
          destination: 'http://localhost:5000/api/:path*',
        },
        {
          source:      '/uploads/:path*',
          destination: 'http://localhost:5000/uploads/:path*',
        },
      ];
    },
  }),

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.tilakglobalschool.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'tilak-global-school-backend.onrender.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port:     '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
