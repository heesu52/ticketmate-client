'use client';

import React from 'react';

import { WebSocketProvider } from '@/shared/context/websocket-context';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WebSocketProvider>{children}</WebSocketProvider>;
}
