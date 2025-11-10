'use client';

import classNames from 'classnames/bind';

import { useGetChatRoomInfo } from '@/app/chat/[id]/_shared/services/query';
import { ArrowRightIcon } from '@/assets/icons';
import Badge from '@/shared/components/ui/badge/badge';
import { TICKET_OPEN_TYPE_LABEL_MAP } from '@/shared/constants/type-mapping';
import { TicketOpenType } from '@/shared/types';

import styles from './chat-header.module.scss';

const cn = classNames.bind(styles);

interface ChatHeaderProps {
  roomId: string;
}

const ChatHeader = ({ roomId }: ChatHeaderProps) => {
  const {
    data: chatRoomInfo,
    isLoading,
    isError,
  } = useGetChatRoomInfo({ chatRoomId: roomId });

  const handleClickHeader = () => {
    console.log('채팅 상세 정보 페이지로 이동');
  };

  if (isLoading || isError) {
    return <div>Loading...</div>;
  }

  return (
    <button
      type="button"
      className={styles.container}
      onClick={handleClickHeader}
    >
      <div className={styles.left_container}>
        <Badge
          variant={
            chatRoomInfo?.ticketOpenType === 'PRE_OPEN' ? 'type-a' : 'type-c'
          }
        >
          {
            TICKET_OPEN_TYPE_LABEL_MAP[
              chatRoomInfo?.ticketOpenType as TicketOpenType
            ]
          }
        </Badge>

        <span className={styles.concert_name}>{chatRoomInfo?.concertName}</span>
      </div>

      <ArrowRightIcon width={16} height={16} fill={`var(--grayscale-700)`} />
    </button>
  );
};

export default ChatHeader;
