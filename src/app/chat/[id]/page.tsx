'use client';

import React, { useState } from 'react';

import AppBarSetter from '@/app/_components/layout/header/app-bar/app-bar-setter';
import ChatHeader from '@/app/chat/[id]/_shared/components/chat-header/chat-header';
import ChatInput from '@/app/chat/[id]/_shared/components/chat-input/chat-input';

import ChatMessage from './_shared/components/chat-message/chat-message';
import styles from './page.module.scss';

// 임시 메시지 데이터
const mockMessages = [
  {
    id: 1,
    content: '안녕하세요',
    timestamp: '14:30',
    isMyMessage: true,
  },
  {
    id: 2,
    content: '터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’ 대리 모집받았습니다.',
    timestamp: '14:31',
    isMyMessage: true,
  },
  {
    id: 3,
    content: '연속된 채팅창 ',
    timestamp: '14:31',
    isMyMessage: true,
  },
  {
    id: 4,
    content: '안녕하세요.',
    timestamp: '12:51',
    isMyMessage: false,
  },
  {
    id: 5,
    content: '어떤 부분이 궁금해서 연락주셨나요?? 편하게 말씀해주세요.',
    timestamp: '12:51',
    isMyMessage: false,
  },
  {
    id: 6,
    content: '안녕하세요',
    timestamp: '12:51',
    isMyMessage: true,
  },
  {
    id: 7,
    content: '안녕하세요',
    timestamp: '12:51',
    isMyMessage: true,
  },
  {
    id: 8,
    content: '안녕하세요',
    timestamp: '12:51',
    isMyMessage: true,
  },
  {
    id: 9,
    content: '안녕하세요',
    timestamp: '12:51',
    isMyMessage: true,
  },
  {
    id: 10,
    content: '안녕하세요',
    timestamp: '12:51',
    isMyMessage: true,
  },
  {
    id: 11,
    content: '안녕하세요',
    timestamp: '12:51',
    isMyMessage: true,
  },
  {
    id: 12,
    content: '안녕하세요',
    timestamp: '12:51',
    isMyMessage: true,
  },
  {
    id: 13,
    content: '안녕하세요',
    timestamp: '12:51',
    isMyMessage: true,
  },
];

const ChatDetailPage = () => {
  const [messages] = useState(mockMessages);

  const shouldShowProfile = (currentIndex: number) => {
    const currentMessage = messages[currentIndex];
    if (currentMessage.isMyMessage) {
      return false;
    }

    // 이전 메시지가 없거나, 내 메시지인 경우에만 프로필 표시
    if (currentIndex === 0 || messages[currentIndex - 1].isMyMessage) {
      return true;
    }

    return false;
  };

  const shouldShowTimestamp = (currentIndex: number) => {
    const currentMessage = messages[currentIndex];
    const nextMessage = messages[currentIndex + 1];

    if (!nextMessage) {
      return true;
    }

    if (
      nextMessage.isMyMessage !== currentMessage.isMyMessage ||
      nextMessage.timestamp !== currentMessage.timestamp
    ) {
      return true;
    }

    return false;
  };

  return (
    <>
      <AppBarSetter title="의뢰인" />
      <div className={styles.container}>
        <ChatHeader />

        <div className={styles.messages_container}>
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              showProfile={shouldShowProfile(index)}
              showTimestamp={shouldShowTimestamp(index)}
              profileImage="https://picsum.photos/200/300"
            />
          ))}
        </div>

        <ChatInput />
      </div>
    </>
  );
};

export default ChatDetailPage;
