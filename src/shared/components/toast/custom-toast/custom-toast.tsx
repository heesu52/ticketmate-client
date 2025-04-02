import classNames from 'classnames/bind';
import {
  toast,
  type ToastOptions,
  type ToastContentProps,
} from 'react-toastify';

import { CloseIcon } from '@/assets/icons';

import styles from './custom-toast.module.scss';

interface CustomToastProps extends ToastContentProps {
  description: string;
}

const cn = classNames.bind(styles);

function CustomToast({ description, closeToast }: CustomToastProps) {
  return (
    <div className={cn(styles.container)}>
      <p className={cn(styles.description)}>{description}</p>
      <button onClick={closeToast} aria-label="토스트 닫기">
        <CloseIcon width={20} height={20} fill="var(--white)" />
      </button>
    </div>
  );
}

interface CustomToastOptions {
  description: string;
}

export const customToast = ({ description }: CustomToastOptions) => {
  const toastOptions: ToastOptions = {
    position: 'top-center',
    hideProgressBar: true,
    closeButton: false,
    className: cn(styles.toast),
  };

  toast(
    (props: ToastContentProps) => (
      <CustomToast description={description} {...props} />
    ),
    toastOptions,
  );
};
