import {
  toast as toastifyToast,
  type ToastOptions as ToastifyToastOptions,
  type ToastContentProps as ToastifyToastContentProps,
} from 'react-toastify';

import Toast from '@/shared/components/ui/toast/toast';
import { ToastVariant } from '@/shared/components/ui/toast/toast.type';

interface ToastOptions extends Omit<ToastifyToastOptions, 'closeButton'> {
  variant?: ToastVariant;
  description: string;
}

export const toast = ({
  description,
  variant = 'default',
  ...rest
}: ToastOptions): void => {
  const toastOptions: ToastifyToastOptions = {
    position: 'top-center', // 토스트 위치
    hideProgressBar: true, // 진행바 숨기기
    autoClose: 3000, // 자동 닫힘 시간
    closeOnClick: true, // 토스트 클릭 시 닫기
    closeButton: false, // 기본 닫기 버튼 숨기기
    style: {
      margin: '0 auto',
      marginTop: '20px',
      padding: 0,
      minHeight: 0,
      overflow: 'hidden',
      background: 'transparent',
      boxShadow: 'none',
    },
    ...rest,
  };

  toastifyToast(
    (props: ToastifyToastContentProps) => (
      <Toast {...props} variant={variant} description={description} />
    ),
    toastOptions,
  );
};
