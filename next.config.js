/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  exportPathMap : function(){
    return {
      '/demo': { page: '/demo/index.html' }
    }
  }
};

module.exports = nextConfig;
