// next.config.mjs
/** @type {import('next').NextConfig} */


const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`  // Use template literals to interpolate the environment variable
      }
    ];
  }
};

export default nextConfig;
