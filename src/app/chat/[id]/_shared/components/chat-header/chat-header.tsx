'use client';

import { useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import { ArrowBottomIcon } from '@/assets/icons';

import styles from './chat-header.module.scss';

const cn = classNames.bind(styles);

const ChatHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <button type="button" className={styles.chat_header} onClick={toggleOpen}>
        <div className={styles.profile_info}>
          <Image
            src="https://picsum.photos/200/300"
            alt="profile"
            width={48}
            height={48}
            className={styles.profile_image}
          />

          <span className={styles.concert_name}>
            터치드(TOUCHED) 단독 콘서트 ‘HIGHLIGHT Ⅲ’
          </span>

          <ArrowBottomIcon
            width={20}
            height={20}
            fill={`var(--textColor-main)`}
            className={cn('arrow_icon', { open: isOpen })}
          />
        </div>
      </button>

      {isOpen && (
        <div className={styles.content_panel}>
          <div className={styles.content_item}>
            <span className={styles.label}>예매일</span>
            <span className={styles.value}>2025.06.22</span>
          </div>
          <div className={styles.content_item}>
            <span className={styles.label}>예매 구분</span>
            <span className={cn('value', styles.colored)}>선예매</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
