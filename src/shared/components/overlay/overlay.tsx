import { useEffect } from 'react';

import styles from './overlay.module.scss';

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Overlay({ isOpen, onClose }: OverlayProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return <div className={styles.overlay} onClick={onClose} />;
}
