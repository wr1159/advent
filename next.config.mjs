/** @type {import('next').NextConfig} */
import remarkGfm from 'remark-gfm';
import nextMdx from '@next/mdx';

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['firebasestorage.googleapis.com']
  },
  // experimental: {
  //   mdxRs: true
  // },
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

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: []
  }
});

export default withMDX(nextConfig);
