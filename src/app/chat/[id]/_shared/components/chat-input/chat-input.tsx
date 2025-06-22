'use client';

import React, { useState } from 'react';

import { PlusIcon, SendIcon } from '@/assets/icons';

import styles from './chat-input.module.scss';

const ChatInput = () => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
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
      <button className={styles.additional_button} type="button">
        <PlusIcon width={20} height={20} fill={`var(--textColor-main)`} />
      </button>

      <textarea
        className={styles.message_input}
        id="message-input"
        placeholder=""
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        rows={1}
      />

      <button
        className={styles.send_button}
        type="button"
        onClick={handleSendMessage}
        disabled={!inputMessage.trim()}
      >
        <SendIcon width={20} height={20} fill={`var(--textColor-main)`} />
      </button>
    </div>
  );
};

export default ChatInput;
