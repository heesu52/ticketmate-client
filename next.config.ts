import path from 'path';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: `@use "@/styles/index" as *;`,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: [
      'picsum.photos',
      'ticketmate.site',
      'ticketmate-storage.s3.ap-northeast-2.amazonaws.com',
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
