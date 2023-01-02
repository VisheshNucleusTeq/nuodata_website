/** @type {import('next').NextConfig} */

const nextConfig = {
  // reactStrictMode: true,
  // trailingSlash: true,
  exportPathMap: async function (defaultPathMap) {
    const pathMap = {};

    for (const [path, config] of Object.entries(defaultPathMap)) {
      if (path === "/") {
        pathMap[path] = config;
      } else {
        pathMap[`${path}/index`] = config;
      }
    }

    return pathMap;
  }
};

module.exports = nextConfig;
