/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kidsandcubsclinicblogsystem.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '/*',
      },
    ],
  },
}

module.exports = nextConfig
