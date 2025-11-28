import React, { useCallback, useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import Image from 'next/image';

import FulfillmentMessageCard from '@/app/chat/[id]/_shared/components/chat-message-list/fulfillment-message-card/fulfillment-message-card';
import { useGetChatMessageList } from '@/app/chat/[id]/_shared/services/query';
import type {
  ChatMessage,
  ChatMessage as ChatMessageType,
  GetChatMessageListRequest,
} from '@/app/chat/[id]/_shared/services/type';
import { useMember } from '@/shared/context/member-context';
import { useWebSocket } from '@/shared/context/websocket-context';
import { FulfillmentFormType } from '@/shared/types/chat';

import styles from './chat-message-list.module.scss';

interface ChatMessageListProps {
  roomId: string;
}

const cn = classNames.bind(styles);

/** 같은 사람이 보낸 메시지인지 확인 */
const isSameSender = (a: ChatMessageType, b: ChatMessageType) =>
  a?.senderNickname === b?.senderNickname && a?.mine === b?.mine;

/** 같은 시간에 보낸 메시지인지 확인 */
const isSameMinute = (a: ChatMessageType, b: ChatMessageType) =>
  dayjs(a.sendDate).format('YYYY-MM-DD HH:mm') ===
  dayjs(b.sendDate).format('YYYY-MM-DD HH:mm');

/** 같은 날 보낸 메시지인지 확인 */
const isSameDate = (a: ChatMessageType, b: ChatMessageType) =>
  dayjs(a.sendDate).format('YYYY-MM-DD') ===
  dayjs(b.sendDate).format('YYYY-MM-DD');

/** 채팅 메시지 목록 컴포넌트 */
const ChatMessageList = ({ roomId }: ChatMessageListProps) => {
  const { member } = useMember();
  const memberId = member?.memberId;

  /** 채팅 메시지 조회 요청 Request */
  const [request] = useState<GetChatMessageListRequest>({
    chatRoomId: roomId,
    parameter: {
      pageNumber: 1,
      pageSize: 20,
    },
  });

  /** 채팅 메시지 조회 API */
  const {
    data: initialMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetChatMessageList(request);

  /** 메시지 목록 */
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  /** 초기 로딩 완료 여부 */
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  /** 이미지 모달 상태 */
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  /** 이전 메시지 로딩 중 스크롤 위치 정보 */
  const scrollPositionRef = useRef<{
    scrollY: number;
    scrollHeight: number;
    firstMessageOffsetTop: number;
  } | null>(null);

  /** 초기 메시지 설정 */
  useEffect(() => {
    if (initialMessages?.content) {
      setMessages([...initialMessages.content].reverse());
      setIsInitialLoadComplete(true);
    }
  }, [initialMessages]);

  /** 메시지 수신 처리 핸들러 */
  const handleMessage = useCallback((response: ChatMessage) => {
    if ('message' in response) {
      setMessages((prev) => [...prev, response]);
    }
  }, []);

  /** 웹소켓 훅 */
  const {
    isConnected,
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    sendMessage,
  } = useWebSocket();

  /** 웹소켓 연결 및 구독 */
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
        readDate: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
      });
    },
    [roomId, sendMessage],
  );

  /** 스크롤 하단 참조 */
  const bottomRef = useRef<HTMLDivElement>(null);
  /** 컨테이너 참조 */
  const containerRef = useRef<HTMLDivElement>(null);

  /** 초기 로딩 완료 후 스크롤을 하단으로 이동 */
  useEffect(() => {
    if (isInitialLoadComplete && bottomRef.current) {
      // 약간의 지연을 두어 DOM이 완전히 렌더링된 후 스크롤 실행
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: 'auto',
        });
      }, 100);
    }
  }, [isInitialLoadComplete]);

  /** 새 메시지가 추가될 때 스크롤 하단으로 이동 */
  useEffect(() => {
    if (bottomRef.current && messages.length > 0 && isInitialLoadComplete) {
      // 현재 스크롤 위치가 하단에 가까운지 확인
      const { scrollY, innerHeight } = window;
      const documentHeight = document.documentElement.scrollHeight;

      // 하단에서 150px 이내에 있을 때만 자동 스크롤 (더 관대한 기준)
      const isNearBottom = scrollY + innerHeight >= documentHeight - 150;

      // 하단에 가까우면 자동으로 스크롤
      if (isNearBottom) {
        bottomRef.current?.scrollIntoView({
          behavior: 'auto',
        });
      }
      // 사용자가 위쪽을 보고 있다면 자동 스크롤하지 않음 (사용자 경험 개선)
    }
  }, [messages.length, isInitialLoadComplete]);

  /** 스크롤 이벤트 핸들러 */
  const handleScroll = useCallback(() => {
    if (!isConnected || messages.length === 0) return;

    const { scrollY, innerHeight } = window;
    const documentHeight = document.documentElement.scrollHeight;

    // 스크롤이 하단에 도달했는지 확인 (약간의 여유 공간 포함)
    const isAtBottom = scrollY + innerHeight >= documentHeight - 150;

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
    const isAtTop = scrollY < 100;

    if (isAtTop) {
      // 현재 스크롤 위치와 문서 높이 저장
      const currentScrollY = window.scrollY;
      const currentScrollHeight = document.documentElement.scrollHeight;

      // 현재 첫 번째 메시지 요소의 위치 저장 (스크롤 기준점)
      const firstMessageElement = containerRef.current?.firstElementChild;
      const firstMessageOffsetTop =
        firstMessageElement?.getBoundingClientRect().top || 0;

      // 스크롤 위치 정보 저장
      scrollPositionRef.current = {
        scrollY: currentScrollY,
        scrollHeight: currentScrollHeight,
        firstMessageOffsetTop: firstMessageOffsetTop,
      };

      await fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 새 메시지가 로드된 후 스크롤 위치 조정
  useEffect(() => {
    if (scrollPositionRef.current && !isFetchingNextPage) {
      const { scrollY, scrollHeight, firstMessageOffsetTop } =
        scrollPositionRef.current;

      // requestAnimationFrame을 사용하여 DOM 업데이트 완료 후 실행
      requestAnimationFrame(() => {
        const newScrollHeight = document.documentElement.scrollHeight;
        const scrollDifference = newScrollHeight - scrollHeight;

        // 새로운 첫 번째 메시지 요소의 위치 확인
        const newFirstMessageElement = containerRef.current?.firstElementChild;
        const newFirstMessageOffsetTop =
          newFirstMessageElement?.getBoundingClientRect().top || 0;

        // 스크롤 위치를 정확하게 조정하여 사용자가 보고 있던 위치 유지
        const adjustedScrollY =
          scrollY +
          scrollDifference +
          (newFirstMessageOffsetTop - firstMessageOffsetTop);

        window.scrollTo({
          top: adjustedScrollY,
          behavior: 'auto', // 부드러운 애니메이션 없이 즉시 이동
        });

        // 스크롤 위치 정보 초기화
        scrollPositionRef.current = null;
      });
    }
  }, [messages.length, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollTop);
    return () => window.removeEventListener('scroll', handleScrollTop);
  }, [handleScrollTop]);

  // 이미지 클릭 핸들러
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // 모달 외부 클릭 핸들러
  const handleModalOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  // 이미지 크기 계산 함수 (최대 넓이 230px, gap 4px 기준, 최대 3장)
  const getImageSize = (index: number, total: number) => {
    const maxWidth = 230;
    const gap = 4;

    // 최대 3장까지만 처리
    const displayCount = Math.min(total, 3);

    // 1장: 전체 크기
    if (displayCount === 1) return { width: maxWidth, height: maxWidth };

    // 2장: 가로로 2개 배치
    if (displayCount === 2) {
      const size = (maxWidth - gap) / 2;
      return { width: size, height: size };
    }

    // 3장: 가로로 3개 배치
    if (displayCount === 3) {
      const size = (maxWidth - gap * 2) / 3;
      return { width: size, height: size };
    }

    // fallback: 기본값
    const size = (maxWidth - gap * 2) / 3;
    return { width: size, height: size };
  };

  // fulfillment 메시지 타입인지 확인
  const isFulfillmentMessage = (type: FulfillmentFormType) => {
    return [
      'FULFILLMENT_FORM',
      'ACCEPTED_FULFILLMENT_FORM',
      'REJECTED_FULFILLMENT_FORM',
      'UPDATE_FULFILLMENT_FORM',
    ].includes(type);
  };

  // 메시지 내용 렌더링 함수
  const renderMessageContent = (msgItem: ChatMessage) => {
    // fulfillment 메시지인 경우
    if (isFulfillmentMessage(msgItem.chatMessageType as FulfillmentFormType)) {
      return (
        <FulfillmentMessageCard
          type={msgItem.chatMessageType as FulfillmentFormType}
          referenceId={msgItem.referenceId}
        />
      );
    }

    if (msgItem.chatMessageType === 'PICTURE') {
      // 이미지 메시지인 경우 (최대 3장까지만 표시)
      const pictureList = msgItem.pictureMessageUrlList?.slice(0, 3) || [];
      const imageCount = pictureList.length;

      return (
        <div className={styles.image_message}>
          {pictureList.map((picture, index) => {
            const size = getImageSize(index + 1, imageCount);
            return (
              <Image
                key={picture}
                src={picture}
                alt={`채팅 이미지`}
                width={size.width}
                height={size.height}
                className={styles.chat_image}
                onClick={() => handleImageClick(picture)}
              />
            );
          })}
        </div>
      );
    } else {
      // 텍스트 메시지인 경우
      return <div className={styles.text_message}>{msgItem.message}</div>;
    }
  };

  return (
    <>
      <div className={styles.container} ref={containerRef}>
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

          // fulfillment 메시지는 중앙에 독립적으로 표시
          if (
            isFulfillmentMessage(msgItem.chatMessageType as FulfillmentFormType)
          ) {
            return (
              <React.Fragment key={`${msgItem.messageId}-${idx}`}>
                {showDateDivider && (
                  <div className={styles.date_divider}>{formattedDate}</div>
                )}
                <div className={styles.fulfillment_container}>
                  {renderMessageContent(msgItem)}
                </div>
              </React.Fragment>
            );
          }

          // 일반 메시지 (텍스트, 이미지)
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
                      width={44}
                      height={44}
                      className={cn(
                        styles.profile_image,
                        isFirstOfGroup ? '' : styles.hidden,
                      )}
                    />
                  </div>
                )}

                <div className={styles.message_container}>
                  <div
                    className={
                      msgItem.chatMessageType === 'PICTURE'
                        ? styles.image_bubble
                        : styles.message_bubble
                    }
                  >
                    {renderMessageContent(msgItem)}
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
    </>
  );
};

export default ChatMessageList;
