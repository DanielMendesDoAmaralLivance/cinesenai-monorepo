/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Para monorepo - transpila pacotes do workspace
  transpilePackages: ['@cinesenai-monorepo/types', '@cinesenai-monorepo/types-custom'],
  // Desabilita geração de páginas estáticas por padrão
  output: "standalone",
  // Configura headers para CORS
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
