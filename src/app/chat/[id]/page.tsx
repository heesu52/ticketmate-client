'use client';

import React, { use, useEffect } from 'react';

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

  const { data: initialMessages } = useGetChatDetail({ chatRoomId: id });

  const {
    isConnected,
    messages: stompMessages,
    sendMessage,
    connect,
    disconnect,
  } = useStomp({
    chatRoomId: id,
    onMessageReceived: (message) => {
      console.log('새 메시지 수신:', message);
    },
    onReadAck: (data) => {
      console.log('읽음 확인:', data);
    },
  });

  // 메시지 전송 핸들러
  const handleSendMessage = (message: string) => {
    if (isConnected) {
      sendMessage(message);
      console.log('메시지 전송:', message);
    } else {
      console.error('WebSocket이 연결되지 않았습니다.');
    }
  };

  // 연결 상태 표시
  useEffect(() => {
    console.log('WebSocket 연결 상태:', isConnected ? '연결됨' : '연결 안됨');
  }, [isConnected]);

  return (
    <>
      <AppBarSetter title="의뢰인" />
      <div className={styles.container}>
        <div className={styles.header_container}>
          <ChatHeader />
        </div>

        <div className={styles.messages_container}>
          <ChatMessageList
            messages={initialMessages ?? []}
            realTimeMessages={stompMessages}
          />
        </div>

        <div className={styles.input_container}>
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={!isConnected}
          />
        </div>
      </div>
    </>
  );
};

export default ChatDetailPage;
