/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "i.scdn.co",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "hrnxjebjeesciulgpwla.supabase.co",
    ],
  },
};

module.exports = nextConfig;
