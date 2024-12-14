/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.dummyjson.com',
            port: '',
            pathname: '/products/images/**',
          },
          {
            protocol: 'https',
            hostname: 'plus.unsplash.com',
            port: '',
            pathname: '**', // Allow all paths for this domain
          },
          {
            protocol:"https",
            hostname:"firebasestorage.googleapis.com",
            port: '',
            pathname: '**', // Allow all paths for this domain
          }
        ],
      },
};

export default nextConfig;
