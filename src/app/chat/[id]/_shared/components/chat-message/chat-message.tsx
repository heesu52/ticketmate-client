import React from 'react';

import Image from 'next/image';

import styles from './chat-message.module.scss';

interface ChatMessageProps {
  message: {
    id: number;
    content: string;
    timestamp: string;
    isMyMessage: boolean;
  };
  showProfile?: boolean;
  profileImage?: string;
  showTimestamp?: boolean;
}

const ChatMessage = ({
  message,
  showProfile = false,
  profileImage,
  showTimestamp = true,
}: ChatMessageProps) => {
  return (
    <div
      className={`${styles.message_container} ${
        message.isMyMessage ? styles.my_message : styles.other_message
      }`}
    >
      {!message.isMyMessage && (
        <>
          <div className={styles.profile_image_wrapper}>
            {showProfile && (
              <Image
                src={profileImage || 'https://picsum.photos/200/300'}
                alt="profile"
                width={36}
                height={36}
                className={styles.profile_image}
              />
            )}
          </div>
          <div className={styles.message_bubble}>
            <div className={styles.message_content}>{message.content}</div>
          </div>
          {showTimestamp && (
            <div className={styles.message_time}>{message.timestamp}</div>
          )}
        </>
      )}

      {message.isMyMessage && (
        <>
          {showTimestamp && (
            <div className={styles.message_time}>{message.timestamp}</div>
          )}
          <div className={styles.message_bubble}>
            <div className={styles.message_content}>{message.content}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatMessage;
