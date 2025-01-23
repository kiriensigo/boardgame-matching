const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*", // Rails APIのエンドポイント
      },
    ];
  },
};

module.exports = nextConfig;
