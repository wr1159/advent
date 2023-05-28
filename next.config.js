/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    mdxRs: true
  },
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

const withMDX = require('@next/mdx')();
module.exports = withMDX(nextConfig);
