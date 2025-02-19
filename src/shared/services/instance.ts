import httpClient from '@/shared/utils/services/http-client';

const instance = httpClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  interceptors: {
    async response<T = unknown>(response: Response): Promise<T> {
      const apiResponse = await response;

      if (!apiResponse.ok) {
        // unauthorized 401
        if (apiResponse.status === 401) {
          if (
            window.confirm(
              '로그인이 필요한 페이지입니다. 로그인 창으로 이동하시겠습니까?',
            )
          ) {
            window.location.href = '/auth/sign-in';
            return Promise.reject('Redirecting to login');
          }
        }

        const errorText = await apiResponse.text();
        throw new Error(`HTTP error ${apiResponse.status}: ${errorText}`);
      }

      return apiResponse.json() as Promise<T>;
    },
  },
});

export default instance;
