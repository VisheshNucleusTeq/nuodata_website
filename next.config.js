module.exports = {
    trailingSlash: true,
  exportTrailingSlash: true,
  exportPathMap: async function (defaultPathMap) {
    return {
      '/demo/index.html': { page: '/demo' },
    };
  }
}

// module.exports = {
//   trailingSlash: true,
//   exportTrailingSlash: true
// }

// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   reactStrictMode: true,
//   trailingSlash: true,
// };

// module.exports = nextConfig;
