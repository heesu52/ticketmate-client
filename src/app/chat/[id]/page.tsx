'use client';

import React, { use } from 'react';

import AppBarSetter from '@/app/_components/layout/header/app-bar/app-bar-setter';
import ChatHeader from '@/app/chat/[id]/_shared/components/chat-header/chat-header';
import ChatInput from '@/app/chat/[id]/_shared/components/chat-input/chat-input';
import useStomp from '@/app/chat/[id]/_shared/hooks/useStomp';
import useGetChatDetail from '@/app/chat/[id]/_shared/services/query';

import ChatMessageList from './_shared/components/chat-message-list/chat-message-list';
import styles from './page.module.scss';

interface ChatDetailPageProps {
  params: Promise<{ id: string }>;
}

const ChatDetailPage = ({ params }: ChatDetailPageProps) => {
  const { id } = use(params);

  const { data: initialMessages } = useGetChatDetail({
    chatRoomId: id,
  });

  const { isConnected, sendMessage, subscribeRealTime } = useStomp({
    chatRoomId: id,
    onConnect: () => {
      console.log('연결됨!');
      subscribeRealTime(); // 연결 후 구독
    },
    onReceivedMessage: (message) => {
      console.log('새 메시지:', message);
    },
  });

  return (
    <>
      <AppBarSetter title="의뢰인" />
      <div className={styles.container}>
        <div className={styles.header_container}>
          <ChatHeader />
        </div>

        <div className={styles.messages_container}>
          <ChatMessageList
            messages={initialMessages?.content ?? []}
            // realTimeMessages={stompMessages}
          />
        </div>

        <div className={styles.input_container}>
          <ChatInput
          // onSendMessage={handleSendMessage}
          // disabled={!isConnected}
          />
        </div>
      </div>
    </>
  );
};

export default ChatDetailPage;
