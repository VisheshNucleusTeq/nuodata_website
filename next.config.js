/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // trailingSlash: true,
  swcMinify : true,
  async rewrites(){
    return [
      {
        source : "/demo",
        destination : "/demo/index.js"
      }
    ]
  }
};

module.exports = nextConfig;
