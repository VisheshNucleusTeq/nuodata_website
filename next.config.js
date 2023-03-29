const nextConfig = {
  trailingSlash: true,
  staticPageGenerationTimeout: 1200,
  reactStrictMode: true,
  env: {
    customKey: 'my-value',
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  }
};


module.exports = nextConfig;
