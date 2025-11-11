'use client';

import { useRouter } from 'next/navigation';

import { NotificationIcon } from '@/assets/icons';

const NotificationButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/notification');
  };

  return (
    <button aria-label="알림" onClick={handleClick}>
      <NotificationIcon width={20} height={20} fill="var(--textColor-main)" />
    </button>
  );
};

export default NotificationButton;
