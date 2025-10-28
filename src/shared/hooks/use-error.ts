import { toastify } from '@/shared/components/ui/toast/toastify';
import { ERROR_MESSAGES } from '@/shared/constants/error-type';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';

export const useHandleError = (callback?: (message: string) => void) => {
  const handleError = (error: unknown | string) => {
    let message: string;

    if (typeof error === 'string') {
      message = error;
    } else if (error instanceof Error) {
      message = getErrorMessage(error.message as keyof typeof ERROR_MESSAGES);
    } else {
      message = '알 수 없는 에러가 발생했습니다.';
    }

    // 토스트 알림
    toastify({
      variant: 'error',
      description: message,
    });

    // 추가 콜백 실행 (필요할 경우)
    callback?.(message);
  };

  return { handleError };
};

// 사용예시
// const { handleError } = useHandleError();

// try {
//   await someAsyncFunction();
// } catch (error) {
//   handleError(error);
// }
