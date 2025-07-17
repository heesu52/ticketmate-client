'use client';

import React, { useState } from 'react';

import {
  CameraIcon,
  CheckIcon,
  CloseIcon,
  ContentCopyIcon,
  ListIcon,
  PlusIcon,
  SendIcon,
  UnlockIcon,
} from '@/assets/icons';
import { useWebSocket } from '@/shared/context/websocket-context';

import styles from './chat-input.module.scss';

interface ChatInputProps {
  roomId: string;
}

const actionItems = [
  {
    icon: <ListIcon width={24} height={24} stroke={`var(--textColor-main)`} />,
    label: '신청양식',
  },
  {
    icon: <UnlockIcon width={24} height={24} fill={`var(--textColor-main)`} />,
    label: '개인정보양식',
  },
  {
    icon: <CameraIcon width={24} height={24} fill={`var(--textColor-main)`} />,
    label: '카메라',
  },
  {
    icon: (
      <ContentCopyIcon width={24} height={24} fill={`var(--textColor-main)`} />
    ),
    label: '양식복사',
  },
  {
    icon: <CloseIcon width={24} height={24} fill={`var(--textColor-main)`} />,
    label: '진행 취소',
  },
  {
    icon: <CheckIcon width={24} height={24} fill={`var(--textColor-main)`} />,
    label: '의뢰 성공',
  },
];

const ChatInput = ({ roomId }: ChatInputProps) => {
  // 추가 버튼 클릭 시 추가 메뉴 표시
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  const { isConnected, isConnecting, sendMessage } = useWebSocket();

  const disabled = !isConnected || isConnecting;

  const handleSendMessage = () => {
    // 메시지가 있는 경우
    if (inputMessage.trim()) {
      // 메시지 전송
      sendMessage(`/pub/chat.message.${roomId}`, {
        message: inputMessage.trim(),
      });
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <button
          className={styles.action_button}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
        >
          {isOpen ? (
            <CloseIcon width={20} height={20} fill={`var(--textColor-main)`} />
          ) : (
            <PlusIcon width={20} height={20} fill={`var(--textColor-main)`} />
          )}
        </button>

        <textarea
          className={styles.message_input}
          id="message-input"
          placeholder="메시지를 입력해주세요."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          rows={1}
          disabled={disabled}
        />

        <button
          className={styles.action_button}
          type="button"
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || disabled}
        >
          <SendIcon width={20} height={20} fill={`var(--textColor-main)`} />
        </button>
      </div>

      {isOpen && (
        <div className={styles.action_panel}>
          {actionItems.map((item) => (
            <button key={item.label} className={styles.item} type="button">
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatInput;
