/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow better-sqlite3 (a native module) to be used in server components / route handlers
  experimental: {
    serverComponentsExternalPackages: ['better-sqlite3'],
  },
};

module.exports = nextConfig;
