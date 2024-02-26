const nextConfig = {
  trailingSlash: true,
  exportPathMap: function () {
    return {
      "/": { page: "/" },
      "/sso/login": { page: "/sso/login" },
      "/api/auth/login": { page: "/api/auth/login" },
      // Add other routes here
    };
  },
  staticPageGenerationTimeout: 1200,
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    IS_LOCAL: process.env.IS_LOCAL,
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  },
  images: {
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
