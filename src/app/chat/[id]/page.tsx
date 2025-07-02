'use client';

import React, { use } from 'react';

import AppBarSetter from '@/app/_components/layout/header/app-bar/app-bar-setter';
import ChatHeader from '@/app/chat/[id]/_shared/components/chat-header/chat-header';
import ChatInput from '@/app/chat/[id]/_shared/components/chat-input/chat-input';

import ChatMessageList from './_shared/components/chat-message-list/chat-message-list';
import styles from './page.module.scss';

interface ChatDetailPageProps {
  params: Promise<{ id: string }>;
}

const ChatDetailPage = ({ params }: ChatDetailPageProps) => {
  const { id: roomId } = use(params);

  return (
    <>
      <AppBarSetter title="의뢰인" />
      <div className={styles.container}>
        <div className={styles.header_container}>
          <ChatHeader />
        </div>

        <div className={styles.messages_container}>
          <ChatMessageList roomId={roomId} />
        </div>

        <div className={styles.input_container}>
          <ChatInput roomId={roomId} />
        </div>
      </div>
    </>
  );
};

export default ChatDetailPage;
