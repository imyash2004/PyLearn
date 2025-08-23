/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Ensure markdown content is available to server functions on Vercel
    outputFileTracingIncludes: {
      "app/**": ["content/**"],
    },
  },
}

export default nextConfig
