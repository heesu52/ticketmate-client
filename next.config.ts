import path from 'path';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
      'ticketmate.site',
      'ticketmate-storage.s3.ap-northeast-2.amazonaws.com',
    ],
  },
  async rewrites() {
    return [
      {
        // 프론트에서 /api로 시작하는 요청을
        source: '/api/:path*',
        // 실제 API 서버로 프록시
        destination: 'https://api.ticketmate.site/api/:path*',
      },
    ];
  },
};

export default nextConfig;
