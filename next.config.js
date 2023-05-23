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
        source: '/login',
        destination: '/app/login/page'
      }
    ];
  }
};

module.exports = nextConfig;
