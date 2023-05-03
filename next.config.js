const nextConfig = {
  trailingSlash: true,
  staticPageGenerationTimeout: 1200,
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  compiler: {
    removeConsole: true,
  },
};


module.exports = nextConfig;
