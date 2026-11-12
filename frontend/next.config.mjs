/** @type {import('next').NextConfig} */

// Rewrites are in vercel.json for production.
// In development, next.config.mjs rewrites handle /api/* → localhost:5000.
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },

  // Dev-only rewrites so `npm run dev` works without Vercel CLI
  ...(isDev && {
    async rewrites() {
      return [
        {
          source:      '/api/:path*',
          destination: 'http://localhost:5000/api/:path*',
        },
      ];
    },
  }),

  images: {
    remotePatterns: [
      // Cloudinary — permanent image CDN
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      // Production backend (Render + custom domain)
      {
        protocol: 'https',
        hostname: 'api.tilakglobalschool.com',
        pathname: '/uploads/**',
      },
      // Render auto-domain (before custom domain is set) — fixed hostname with -0xwt suffix
      {
        protocol: 'https',
        hostname: 'tilak-global-school-backend-0xwt.onrender.com',
        pathname: '/uploads/**',
      },
      // Development
      {
        protocol: 'http',
        hostname: 'localhost',
        port:     '5000',
        pathname: '/uploads/**',
      },
      // Unsplash placeholder images (remove once real school photos replace them)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    dangerouslyAllowSVG:    true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy:  "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
