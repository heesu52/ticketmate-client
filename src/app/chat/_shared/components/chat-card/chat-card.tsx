import React from 'react';

import Image from 'next/image';

import Badge from '@/shared/components/badge/badge';

import styles from './chat-card.module.scss';

interface ChatCardProps {
  chat: {
    chatRoomId: number;
    chatRoomName: string;
    lastChatMessage: string;
    lastChatSendTime: string;
    concertThumbnailUrl: string;
    concertImg: string;
    ticketOpenType: string;
    unRead: number;
  };
}

const ChatCard = ({ chat }: ChatCardProps) => {
  return (
    <button className={styles.container}>
      <div className={styles.profile_wrapper}>
        <Image
          className={styles.profile_image}
          src={chat.concertThumbnailUrl}
          alt="profile"
          width={48}
          height={48}
        />
        <Badge type="type-a">{chat.ticketOpenType}</Badge>
      </div>
      <div className={styles.chat_info}>
        <div className={styles.top_row}>
          <span className={styles.name}>{chat.chatRoomName}</span>
          <span className={styles.time}>{chat.lastChatSendTime}</span>
        </div>

        <div className={styles.bottom_row}>
          <div className={styles.message}>{chat.lastChatMessage}</div>
          {chat.unRead > 0 && (
            <div className={styles.unread}>
              {chat.unRead > 99 ? '99+' : chat.unRead}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default ChatCard;
