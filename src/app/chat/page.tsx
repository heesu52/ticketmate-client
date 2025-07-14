'use client';

import { useCallback, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import AppBarSetter from '@/app/_components/layout/header/app-bar/app-bar-setter';
import ChatCard from '@/app/chat/_shared/components/chat-card/chat-card';
import { useGetChatList } from '@/app/chat/_shared/services/query';
import queryKey from '@/app/chat/_shared/services/query-key';
import type {
  GetChatListResponse,
  ChatRoom,
} from '@/app/chat/_shared/services/type';
import TabButton from '@/shared/components/button/tab-button/tab-button';
import { TICKET_OPEN_TYPE_LABEL_MAP } from '@/shared/constants/type-mapping';
import { useWebSocket } from '@/shared/context/websocket-context';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';
import type { TicketOpenType } from '@/shared/types';
import { formatDateToLocale, formatTime, isToday } from '@/shared/utils/dates';

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

interface UnreadMessage {
  chatRoomId: string;
  lastMessage: string;
  sendDate: string;
  unReadMessageCount: number;
}

const formatDateTime = (time: string) => {
  return isToday(time)
    ? formatTime(time)
    : formatDateToLocale({ datetime: time });
};

export default function ChatPage() {
  const memberId = sessionStorage.getItem('memberId') ?? '';

  const [selectedTab, setSelectedTab] = useState<Tab>('');
  const queryClient = useQueryClient();

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

  const { connect, disconnect, subscribe, unsubscribe } = useWebSocket();

  // 안읽은 메시지 수신 처리 핸들러
  const handleUnreadMessage = useCallback(
    (response: UnreadMessage) => {
      // API 호출 없이, React Query 캐시 직접 업데이트
      queryClient.setQueryData(
        queryKey.chatList({
          ticketOpenType: selectedTab as TicketOpenType,
        }),
        (oldData: { pages: GetChatListResponse[] } | undefined) => {
          if (!oldData?.pages) return oldData;

          // 변경된 채팅방이 있는지 확인
          let hasChanges = false;

          const updatedPages = oldData.pages.map(
            (page: GetChatListResponse) => {
              const updatedContent = page.content.map((chat: ChatRoom) => {
                if (chat.chatRoomId === response.chatRoomId) {
                  hasChanges = true;

                  return {
                    ...chat,
                    lastChatMessage: response.lastMessage,
                    lastChatSendTime: formatDateTime(response.sendDate),
                    unReadMessageCount: response.unReadMessageCount,
                  };
                }
                return chat;
              });

              return {
                ...page,
                content: updatedContent,
              };
            },
          );

          // 변경사항이 없으면 원본 데이터 반환 (불필요한 리렌더링 방지)
          return hasChanges ? { ...oldData, pages: updatedPages } : oldData;
        },
      );
    },
    [queryClient, selectedTab],
  );

  useEffect(() => {
    connect().then(() => {
      subscribe(`/queue/unread.${memberId}`, handleUnreadMessage);
    });

    return () => {
      unsubscribe(`/queue/unread.${memberId}`);
      disconnect();
    };
  }, []);

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
