'use client';

import { useState } from 'react';

import AppBarSetter from '@/app/_components/layout/header/app-bar/app-bar-setter';
import ChatCard from '@/app/chat/_shared/components/chat-card/chat-card';
import { useGetChatList } from '@/app/chat/_shared/services/query';
import TabButton from '@/shared/components/button/tab-button/tab-button';
import { TICKET_OPEN_TYPE_LABEL_MAP } from '@/shared/constants/type-mapping';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';
import type { TicketOpenType } from '@/shared/types';

import styles from './page.module.scss';

type Tab = TicketOpenType | '';

const tabs: { label: string; value: Tab }[] = [
  {
    label: '전체',
    value: '',
  },
  {
    label: TICKET_OPEN_TYPE_LABEL_MAP.PRE_OPEN,
    value: 'PRE_OPEN',
  },
  {
    label: TICKET_OPEN_TYPE_LABEL_MAP.GENERAL_OPEN,
    value: 'GENERAL_OPEN',
  },
];

export default function ChatPage() {
  const [selectedTab, setSelectedTab] = useState<Tab>('');

  const {
    data: chatList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetChatList({
    ticketOpenType: selectedTab as TicketOpenType,
  });

  const { lastElementRef } = useIntersectionObserver<HTMLButtonElement>({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage && !isFetchingNextPage,
  });

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
          {chatList?.content.map((chat, index) => (
            <ChatCard
              key={chat.chatRoomId}
              chat={chat}
              ref={
                index === chatList?.content.length - 1
                  ? lastElementRef
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
