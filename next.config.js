module.exports = {
  trailingSlash: true,
  staticPageGenerationTimeout: 1200,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/how-it-works": { page: "/how-it-works" },
    };
  },
};
