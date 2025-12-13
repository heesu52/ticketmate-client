import Link from 'next/link';

import { ArrowRightIcon } from '@/assets/icons';

import styles from './setting-item.module.scss';

import type { SettingItem as SettingItemType } from './setting-item.type';

type SettingItemProps = SettingItemType;

const SettingItem = ({
  title,
  description,
  trailing,
  href,
  disabled = false,
  type = 'link',
  trailingIcon,
  onClick,
}: SettingItemProps) => {
  const Trailing = (
    <div className={styles.item_trailing_container}>
      {trailing && <span className={styles.item_trailing}>{trailing}</span>}
      {type === 'link' &&
        (trailingIcon ?? (
          <ArrowRightIcon width={12} height={12} fill="var(--grayscale-500)" />
        ))}
    </div>
  );

  // 링크 항목
  if (type === 'link') {
    return (
      <Link href={href ?? ''} className={styles.item} aria-disabled={disabled}>
        <div className={styles.title_container}>
          <span className={styles.item_title}>{title}</span>
          {description && (
            <span className={styles.item_desc}>{description}</span>
          )}
        </div>
        {Trailing}
      </Link>
    );
  }

  // 클릭 액션(버튼) 항목
  if (type === 'action') {
    return (
      <div
        className={styles.item}
        aria-disabled={disabled}
        role="button"
        tabIndex={0}
        onClick={() => {
          if (disabled) return;
          onClick?.();
        }}
      >
        <div className={styles.title_container}>
          <span className={styles.item_title}>{title}</span>
          {description && (
            <span className={styles.item_desc}>{description}</span>
          )}
        </div>
        {Trailing}
      </div>
    );
  }

  // 텍스트만 표시
  return (
    <div className={styles.item} aria-disabled={disabled}>
      <div className={styles.title_container}>
        <span className={styles.item_title}>{title}</span>
        {description && <span className={styles.item_desc}>{description}</span>}
      </div>
      {Trailing}
    </div>
  );
};

export default SettingItem;
