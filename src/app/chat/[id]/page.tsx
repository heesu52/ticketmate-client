'use client';

import React, { use, useState, useCallback } from 'react';

import AppBarSetter from '@/app/_components/layout/header/app-bar/app-bar-setter';
import ChatHeader from '@/app/chat/[id]/_shared/components/chat-header/chat-header';
import ChatInput from '@/app/chat/[id]/_shared/components/chat-input/chat-input';
import useGetChatDetail from '@/app/chat/[id]/_shared/services/query';
import { ChatMessage } from '@/app/chat/[id]/_shared/services/type';
import useStomp from '@/shared/hooks/use-chat-stomp/use-chat-stomp';

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

  const [realTimeMessages, setRealTimeMessages] = useState<ChatMessage[]>([]);

  const { isConnected, sendMessage, subscribeRealTime } = useStomp({
    chatRoomId: id,
    onConnect: () => {
      subscribeRealTime(); // 연결 후 구독
    },
    onReceivedMessage: (message) => {
      setRealTimeMessages((prev) => [...prev, message as ChatMessage]);
    },
  });

  // 메시지 전송 핸들러
  const handleSendMessage = useCallback(
    (message: string) => {
      if (message.trim() && isConnected) {
        sendMessage(message);
      }
    },
    [sendMessage, isConnected],
  );

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
            realTimeMessages={realTimeMessages}
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
