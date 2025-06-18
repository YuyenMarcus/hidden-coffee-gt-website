/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure ISR works on Vercel
  experimental: {
    serverComponentsExternalPackages: [],
  },
  
  // Redirect old blog routes to new blog-simple route
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blog-simple',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/blog-simple',
        permanent: true,
      },
    ]
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.notion.so',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig 