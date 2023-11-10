const nextConfig = {
  trailingSlash: true,
  staticPageGenerationTimeout: 1200,
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    IS_LOCAL: process.env.IS_LOCAL,
  }
};


module.exports = nextConfig;
