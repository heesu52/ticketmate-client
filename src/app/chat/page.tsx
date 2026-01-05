'use client';

import { useCallback, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import ChatCard from '@/app/chat/_shared/components/chat-card/chat-card';
import { useGetChatList } from '@/app/chat/_shared/services/query';
import queryKey from '@/app/chat/_shared/services/query-key';
import type {
  GetChatListResponse,
  ChatRoom,
} from '@/app/chat/_shared/services/type';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import { useMember } from '@/shared/context/member-context';
import { useWebSocket } from '@/shared/context/websocket-context';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';

import styles from './page.module.scss';

interface UnreadMessage {
  chatRoomId: string;
  lastMessage: string;
  sendDate: string;
  unReadMessageCount: number;
}

export default function ChatPage() {
  const { member } = useMember();
  const memberId = member?.memberId;

  const queryClient = useQueryClient();

  const {
    data: chatList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetChatList();

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
      // 읽지 않은 메시지가 없으면 업데이트하지 않음
      if (response.unReadMessageCount === 0) {
        return;
      }

      // API 호출 없이, React Query 캐시 직접 업데이트
      queryClient.setQueryData(
        queryKey.chatList(),
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
                    lastChatSendTime: response.sendDate,
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
    [queryClient],
  );

  useEffect(() => {
    if (!memberId) return;

    connect().then(() => {
      subscribe(`/queue/unread.${memberId}`, handleUnreadMessage);
    });

    return () => {
      unsubscribe(`/queue/unread.${memberId}`);
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId]);

  return (
    <PageFrame
      appBar={{
        title: '채팅',
      }}
    >
      <div className={styles.container}>
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
    </PageFrame>
  );
}
