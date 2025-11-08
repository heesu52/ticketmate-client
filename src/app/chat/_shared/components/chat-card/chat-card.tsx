import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { ChatRoom } from '@/app/chat/_shared/services/type';
import Badge from '@/shared/components/ui/badge/badge';
import { TICKET_OPEN_TYPE_LABEL_MAP } from '@/shared/constants/type-mapping';
import { formatDateToLocale, formatTime, isToday } from '@/shared/utils/dates';

import styles from './chat-card.module.scss';

interface ChatCardProps {
  chat: ChatRoom;
  ref?: React.Ref<HTMLButtonElement>;
}

const formatDateTime = (time: string) => {
  return isToday(time)
    ? formatTime(time)
    : formatDateToLocale({ datetime: time });
};

const ChatCard = ({ chat, ref }: ChatCardProps) => {
  const router = useRouter();

  const handleChatClick = (chatRoomId: string) => {
    router.push(`/chat/${chatRoomId}`);
  };

  const formattedDateTime = formatDateTime(chat.lastChatSendTime);

  return (
    <button
      className={styles.container}
      onClick={() => handleChatClick(chat.chatRoomId)}
      ref={ref}
    >
      <div className={styles.profile_wrapper}>
        <Image
          className={styles.profile_image}
          src={chat.concertThumbnailUrl}
          alt="profile"
          width={60}
          height={60}
        />
        <Badge
          variant={chat.ticketOpenType === 'PRE_OPEN' ? 'type-a' : 'type-c'}
        >
          {TICKET_OPEN_TYPE_LABEL_MAP[chat.ticketOpenType]}
        </Badge>
      </div>

      <div className={styles.chat_info}>
        <div className={styles.top_container}>
          <span className={styles.name}>{chat.chatRoomName}</span>
          <div className={styles.message}>{chat.lastChatMessage}</div>
        </div>

        <div className={styles.bottom_container}>
          <span className={styles.time}>{formattedDateTime}</span>
          {chat.unReadMessageCount > 0 && (
            <div className={styles.unread}>
              {chat.unReadMessageCount > 99 ? '99+' : chat.unReadMessageCount}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default ChatCard;
