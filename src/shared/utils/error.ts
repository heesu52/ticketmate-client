import { toastify } from '@/shared/components/ui/toast/toastify';
import { ErrorCodeKey } from '@/shared/constants/error';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';

export const handleError = (error: unknown) => {
  const DEFAULT_MESSAGE = '알 수 없는 에러가 발생했습니다.';
  let message = DEFAULT_MESSAGE;

  // 문자열 에러
  if (typeof error === 'string') {
    message = error;
  }
  // 서버 에러 객체 { errorCode, errorMessage }
  else if (
    typeof error === 'object' &&
    error !== null &&
    'errorCode' in error
  ) {
    const { errorCode, errorMessage } = error as {
      errorCode?: ErrorCodeKey;
      errorMessage?: string;
    };

    message = getErrorMessage(errorCode) ?? errorMessage ?? DEFAULT_MESSAGE;
  }

  // JS Error / AxiosError
  else if (error instanceof Error) {
    message =
      getErrorMessage(error.message as ErrorCodeKey) ??
      error.message ??
      DEFAULT_MESSAGE;
  }

  toastify({
    variant: 'error',
    description: message,
  });
};

// 사용예시

// try {
//   await someAsyncFunction();
// } catch (error) {
//   handleError(error);
// }
