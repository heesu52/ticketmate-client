import React, { useCallback, useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import Image from 'next/image';

import useGetChatDetail from '@/app/chat/[id]/_shared/services/query';
import type {
  ChatMessage,
  ChatMessage as ChatMessageType,
  GetChatDetailRequest,
} from '@/app/chat/[id]/_shared/services/type';
import { useWebSocket } from '@/shared/context/websocket-context';

import styles from './chat-message-list.module.scss';

interface ChatMessageListProps {
  roomId: string;
}

const cn = classNames.bind(styles);

/** 같은 사람이 보낸 메시지인지 확인 */
const isSameSender = (a: ChatMessageType, b: ChatMessageType) =>
  a?.senderId === b?.senderId && a?.mine === b?.mine;

/** 같은 시간에 보낸 메시지인지 확인 */
const isSameMinute = (a: ChatMessageType, b: ChatMessageType) =>
  dayjs(a.sendDate).format('YYYY-MM-DD HH:mm') ===
  dayjs(b.sendDate).format('YYYY-MM-DD HH:mm');

/** 같은 날 보낸 메시지인지 확인 */
const isSameDate = (a: ChatMessageType, b: ChatMessageType) =>
  dayjs(a.sendDate).format('YYYY-MM-DD') ===
  dayjs(b.sendDate).format('YYYY-MM-DD');

const ChatMessageList = ({ roomId }: ChatMessageListProps) => {
  const memberId = sessionStorage.getItem('memberId') ?? '';

  const [request] = useState<GetChatDetailRequest>({
    chatRoomId: roomId,
    parameter: {
      pageNumber: 1,
      pageSize: 20,
    },
  });

  /** 초기 메시지 조회 */
  const {
    data: initialMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetChatDetail(request);

  /** 메시지 목록 */
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  /** 초기 메시지 설정 */
  useEffect(() => {
    if (initialMessages?.content) {
      setMessages([...initialMessages.content].reverse());
    }
  }, [initialMessages]);

  // 메시지 수신 처리 핸들러
  const handleMessage = useCallback((response: ChatMessage) => {
    if ('message' in response) {
      setMessages((prev) => [...prev, response]);
    }
  }, []);

  const {
    isConnected,
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    sendMessage,
  } = useWebSocket();

  useEffect(() => {
    connect().then(() => {
      subscribe(
        `/exchange/chat.exchange/chat.room.${roomId}.user.${memberId}`,
        handleMessage,
      );
    });

    return () => {
      disconnect();
      unsubscribe(
        `/exchange/chat.exchange/chat.room.${roomId}.user.${memberId}`,
      );
    };
  }, []);

  /** 메시지 읽음 처리 */
  const handleReadMessage = useCallback(
    (messageId: string) => {
      console.log('메시지 읽음 처리:', messageId);

      sendMessage(`/pub/chat.read.${roomId}`, {
        lastReadMessageId: messageId,
        readDate: new Date().toISOString(),
      });
    },
    [roomId, sendMessage],
  );

  /** 스크롤 하단 참조 */
  const bottomRef = useRef<HTMLDivElement>(null);

  /** 메세지 추가되는 경우 스크롤 하단으로 내리기 */
  useEffect(() => {
    if (bottomRef.current && messages.length > 0 && isFetchingNextPage) {
      bottomRef.current?.scrollIntoView({
        behavior: 'auto',
      });
    }
  }, [messages.length, isFetchingNextPage]);

  /** 스크롤 이벤트 핸들러 */
  const handleScroll = useCallback(() => {
    if (!isConnected || messages.length === 0) return;

    const { scrollY, innerHeight } = window;
    const documentHeight = document.documentElement.scrollHeight;

    // 스크롤이 하단에 도달했는지 확인 (약간의 여유 공간 포함)
    const isAtBottom = scrollY + innerHeight >= documentHeight;

    if (isAtBottom) {
      // 마지막 메시지의 ID 가져오기
      const lastMessage = messages[messages.length - 1];

      if (lastMessage && lastMessage.isRead !== true) {
        // 마지막 메시지 읽음 처리
        handleReadMessage(lastMessage.messageId);
      }
    }
  }, [isConnected, messages, handleReadMessage]);

  /** 스크롤 이벤트 리스너 등록 */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 역방향 무한스크롤
  const handleScrollTop = useCallback(async () => {
    if (!hasNextPage || isFetchingNextPage) return;

    const { scrollY } = window;

    // 스크롤이 상단에 도달했는지 확인 (약간의 여유 공간 포함)
    const isAtTop = scrollY < 50;

    if (isAtTop) {
      await fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollTop);
    return () => window.removeEventListener('scroll', handleScrollTop);
  }, [handleScrollTop]);

  return (
    <div className={styles.container}>
      {messages.map((msgItem, idx) => {
        /** 이전 메시지 */
        const prev = messages[idx - 1];
        /** 다음 메시지 */
        const next = messages[idx + 1];

        /** 보낸 사람이 내 혹은 상대방인지 확인 */
        const isMine = msgItem.mine;
        /** 이전 메시지와 같은 사람이 보낸 메시지인지 확인 */
        const isSameGroupWithPrev =
          prev && isSameSender(msgItem, prev) && isSameMinute(msgItem, prev);
        /** 다음 메시지와 같은 사람이 보낸 메시지인지 확인 */
        const isSameGroupWithNext =
          next && isSameSender(msgItem, next) && isSameMinute(msgItem, next);

        /** 그룹핑된 메세지의 첫 번째 메시지인지 확인 */
        const isFirstOfGroup = !isSameGroupWithPrev;
        /** 그룹핑된 메세지의 마지막 메시지인지 확인 */
        const isLastOfGroup = !isSameGroupWithNext;

        /** 시간 구분 선 표시 여부 */
        const showDateDivider = !prev || !isSameDate(msgItem, prev);
        /** 시간 구분 선 표시 날짜 */
        const formattedDate = dayjs(msgItem.sendDate).format(
          'YYYY년 MM월 DD일',
        );

        /** 그룹 간격 */
        const groupSpacing = isFirstOfGroup ? { marginTop: '24px' } : {};

        return (
          <React.Fragment key={`${msgItem.messageId}-${idx}`}>
            {showDateDivider && (
              <div className={styles.date_divider}>{formattedDate}</div>
            )}
            <div
              className={cn(
                'list_container',
                isMine ? 'my_message' : 'other_message',
              )}
              style={groupSpacing}
            >
              {!isMine && (
                <div className={styles.profile_image_wrapper}>
                  <Image
                    src={msgItem.profileUrl}
                    alt="profile"
                    width={36}
                    height={36}
                    className={cn(
                      styles.profile_image,
                      isFirstOfGroup ? '' : styles.hidden,
                    )}
                  />
                </div>
              )}

              <div className={styles.message_container}>
                <div className={styles.message_bubble}>
                  <div className={styles.message_content}>
                    {msgItem.message}
                  </div>
                </div>

                {isLastOfGroup && (
                  <div className={styles.message_time}>
                    {dayjs(msgItem.sendDate).format('A h:mm')}
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        );
      })}

      <div ref={bottomRef} aria-hidden="true" />
    </div>
  );
};

export default ChatMessageList;
