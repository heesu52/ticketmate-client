import { toastify } from '@/shared/components/ui/toast/toastify';
import { ERROR_MESSAGES } from '@/shared/constants/error-type';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';

export const useHandleError = (callback?: (message: string) => void) => {
  const handleError = (error: unknown) => {
    let message = '알 수 없는 에러가 발생했습니다.';

    // 문자열 에러
    if (typeof error === 'string') {
      message = getErrorMessage(error as keyof typeof ERROR_MESSAGES);
    }

    // 서버 에러 객체 { errorCode, errorMessage }
    else if (
      typeof error === 'object' &&
      error !== null &&
      'errorCode' in error
    ) {
      const errorCode = (error as { errorCode?: unknown }).errorCode;
      message = getErrorMessage(errorCode as keyof typeof ERROR_MESSAGES);
    }

    // JS Error / AxiosError
    else if (error instanceof Error) {
      message = getErrorMessage(error.message as keyof typeof ERROR_MESSAGES);
    }

    toastify({
      variant: 'error',
      description: message,
    });

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
