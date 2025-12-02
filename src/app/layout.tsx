import { ReactNode } from 'react';

import localFont from 'next/font/local';

import NotificationInitializer from '@/app/_components/NotificationInitializer';
import ServiceWorkerRegister from '@/app/_components/ServiceWorkerRegister';
import Provider from '@/providers';

import type { Metadata, Viewport } from 'next';

import '@/styles/base/_index.scss';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: '티켓메이트',
  description:
    '티켓메이트는 공연, 스포츠 경기 등 각종 이벤트의 티켓을 원하는 시간에 대신 예매해줄 메이트를 쉽게 찾아 연결해주는 대리 티켓팅 플랫폼입니다. 신속하고 신뢰할 수 있는 서비스로 효율적인 티켓팅 경험을 제공합니다.',
  manifest: '/manifest.json',
  icons: {
    icon: '/app-assets/icons/favicon.ico',
    apple: '/app-assets/icons/apple-icon-180x180.png',
  },
  appleWebApp: {
    statusBarStyle: 'default',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.variable}>
        <ServiceWorkerRegister />
        <NotificationInitializer />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
