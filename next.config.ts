import path from 'path';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
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
      'placehold.co',
      'ticketmate.site',
      'ticketmate-storage.s3.ap-northeast-2.amazonaws.com',
    ],
  },
};

export default nextConfig;
