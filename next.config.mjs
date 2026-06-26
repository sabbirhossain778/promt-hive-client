/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      { protocol: 'https', 
        hostname: 'avatars.githubusercontent.com' 
      },
      { protocol: 'https', 
        hostname: 'lh3.googleusercontent.com' 
      },
      { protocol: 'https', 
        hostname: 'media.licdn.com' 
      },
      { protocol: 'https', 
        hostname: 'github.com' 
      }
    ],
  },
};

export default nextConfig;