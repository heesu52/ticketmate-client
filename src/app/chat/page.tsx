'use client';

import { useState } from 'react';

import AppBarSetter from '@/app/_components/layout/header/app-bar/app-bar-setter';
import ChatCard from '@/app/chat/_shared/components/chat-card/chat-card';
import TabButton from '@/shared/components/button/tab-button/tab-button';

import styles from './page.module.scss';

const tabs: { label: string; value: Tab }[] = [
  {
    label: '전체',
    value: 'ALL',
  },
  {
    label: '선예매',
    value: 'PRE_OPEN',
  },
  {
    label: '일반예매',
    value: 'NORMAL',
  },
];

type Tab = 'ALL' | 'PRE_OPEN' | 'NORMAL';

const chatList = Array.from({ length: 10 }, (_, index) => ({
  chatRoomId: index + 1,
  chatRoomName: `의뢰인 ${index + 1}`,
  lastChatMessage: `안녕하세요~~!! 의뢰인 ${index + 1}이에요 안녕하세요~~!! 의뢰인 ${index + 1}이에요안녕하세요~~!! 의뢰인 ${index + 1}이에요안녕하세요~~!! 의뢰인 ${index + 1}이에요 안녕하세요~~!! 의뢰인 ${index + 1}이에요`,
  lastChatSendTime: '12:00',
  concertThumbnailUrl: 'https://picsum.photos/200/300',
  concertImg: 'https://picsum.photos/200/300',
  ticketOpenType: '선예매',
  unRead: index + 1,
}));

export default function ChatPage() {
  const [selectedTab, setSelectedTab] = useState<Tab>('ALL');

  return (
    <>
      <AppBarSetter title="채팅" />

      <div className={styles.container}>
        <div className={styles.button_container}>
          {tabs.map((tab) => (
            <TabButton
              key={tab.value}
              label={tab.label}
              isActive={selectedTab === tab.value}
              onClick={() => setSelectedTab(tab.value)}
            />
          ))}
        </div>

        <div className={styles.chat_list}>
          {chatList.map((chat) => (
            <ChatCard key={chat.chatRoomId} chat={chat} />
          ))}
        </div>
      </div>
    </>
  );
}
