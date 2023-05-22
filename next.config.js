/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/signup',
        destination: '/app/signup/page'
      },
      {
        source: '/signin',
        destination: '/app/signin/page'
      }
    ];
  }
};

module.exports = nextConfig;
