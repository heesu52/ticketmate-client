'use client';

import React, { use } from 'react';

import ChatHeader from '@/app/chat/[id]/_shared/components/chat-header/chat-header';
import ChatInput from '@/app/chat/[id]/_shared/components/chat-input/chat-input';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Dropdown from '@/shared/components/ui/dropdown/dropdown';

import ChatMessageList from './_shared/components/chat-message-list/chat-message-list';
import styles from './page.module.scss';

interface ChatDetailPageProps {
  params: Promise<{ id: string }>;
}

const ChatDetailPage = ({ params }: ChatDetailPageProps) => {
  const { id: roomId } = use(params);

  return (
    <PageFrame
      appBar={{
        title: '상대방 닉네임',
        showBack: true,
        additionalContent: (
          <div className={styles.header_container}>
            <ChatHeader roomId={roomId} />
          </div>
        ),
        right: (
          <button type="button">
            <Dropdown
              items={[
                {
                  label: '채팅방 나가기',
                  onClick: () => console.log('채팅방 나가기'),
                },
              ]}
            />
          </button>
        ),
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        <div className={styles.messages_container}>
          <ChatMessageList roomId={roomId} />
        </div>

        <div className={styles.input_container}>
          <ChatInput roomId={roomId} />
        </div>
      </div>
    </PageFrame>
  );
};

export default ChatDetailPage;
