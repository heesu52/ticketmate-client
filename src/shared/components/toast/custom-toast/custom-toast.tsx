import classNames from 'classnames/bind';
import {
  toast,
  type ToastOptions,
  type ToastContentProps,
} from 'react-toastify';

import { CloseIcon } from '@/assets/icons';

import styles from './custom-toast.module.scss';

const cn = classNames.bind(styles);

interface CustomToastComponentProps extends ToastContentProps {
  description: string;
  closeButton: boolean;
}

function CustomToastComponent({
  description,
  closeButton,
  closeToast,
}: CustomToastComponentProps) {
  return (
    <div className={cn('container')}>
      <p className={cn('description')}>{description}</p>
      {closeButton && (
        <button onClick={closeToast} aria-label="토스트 닫기">
          <CloseIcon width={20} height={20} fill="var(--white)" />
        </button>
      )}
    </div>
  );
}

interface CustomToastOptions extends Omit<ToastOptions, 'closeButton'> {
  description: string;
  closeButton?: boolean;
}

// 커스텀 토스트 함수
export const customToast = ({
  description,
  closeButton = true,
  ...rest
}: CustomToastOptions): void => {
  const toastOptions: ToastOptions = {
    position: 'top-center', // 토스트 위치
    hideProgressBar: true, // 진행바 숨기기
    autoClose: 3500, // 자동 닫힘 시간
    closeOnClick: true, // 토스트 클릭 시 닫기
    closeButton: false, // 기본 닫기 버튼 숨기기
    className: cn('toast'),
    ...rest,
  };

  toast(
    (props: ToastContentProps) => (
      <CustomToastComponent
        {...props}
        description={description}
        closeButton={closeButton}
      />
    ),
    toastOptions,
  );
};
