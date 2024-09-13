/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        process.env.ALLOWED_ORIGINS,
        process.env.ALLOWED_ORIGINS_BE,
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  env: {
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    BACKEND_API: process.env.NEXT_PUBLIC_OROCHI_WEBSITE_BACKEND_API,
    PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
  },
}

export default nextConfig
