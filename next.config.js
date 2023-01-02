/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  exportPathMap: async function (defaultPathMap) {
    return {
      '/demo/index.html': { page: '/demo' },
    };
  }
};

module.exports = nextConfig;
