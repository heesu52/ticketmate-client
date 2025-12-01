'use client';

import classNames from 'classnames/bind';

import { GetChatRoomInfoResponse } from '@/app/chat/[id]/_shared/services/type';
import { ArrowRightIcon } from '@/assets/icons';
import Badge from '@/shared/components/ui/badge/badge';
import { TICKET_OPEN_TYPE_LABEL_MAP } from '@/shared/constants/type-mapping';
import { useNavigation } from '@/shared/hooks/navigation/use-navigation';
import { TicketOpenType } from '@/shared/types';

import styles from './chat-header.module.scss';

const cn = classNames.bind(styles);

interface ChatHeaderProps {
  chatRoomInfo: GetChatRoomInfoResponse | undefined;
}

const ChatHeader = ({ chatRoomInfo }: ChatHeaderProps) => {
  const navigation = useNavigation();

  const handleClickHeader = () => {
    navigation.navigate({
      pathname: `/concert/form/${chatRoomInfo?.chatRoomId}/view?from=chat`,
    });
  };

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
