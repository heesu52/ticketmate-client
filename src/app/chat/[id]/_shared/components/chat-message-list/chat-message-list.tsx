import React, { useEffect, useRef } from 'react';

import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import Image from 'next/image';

import type {
  ChatMessage as ChatMessageType,
  GetChatDetailResponse,
} from '@/app/chat/[id]/_shared/services/type';

import styles from './chat-message-list.module.scss';

interface ChatMessageListProps {
  messages: GetChatDetailResponse['content'];
  realTimeMessages?: ChatMessageType[];
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

const ChatMessageList = ({
  messages,
  realTimeMessages = [],
}: ChatMessageListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 모든 메시지 합치기 (기존 + 실시간)
  const allMessages = [...messages, ...realTimeMessages].reverse();

  // 스크롤 하단으로 내리기
  useEffect(() => {
    if (containerRef.current && allMessages.length > 0) {
      containerRef.current.scrollIntoView({
        block: 'end',
      });
    }
  }, [allMessages.length]);

  return (
    <div className={styles.container} ref={containerRef}>
      {allMessages.map((msgItem, idx) => {
        /** 이전 메시지 */
        const prev = allMessages[idx - 1];
        /** 다음 메시지 */
        const next = allMessages[idx + 1];

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
    </div>
  );
};

export default ChatMessageList;
