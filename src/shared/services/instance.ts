import { getCookie } from 'cookies-next';

import { refreshAccessToken } from '@/shared/utils/auth';
import httpClient from '@/shared/utils/services/http-client';

const instance = httpClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  interceptors: {
    async request(
      input: NonNullable<Parameters<typeof fetch>[0]>,
      init: NonNullable<Parameters<typeof fetch>[1]>,
    ): Promise<NonNullable<Parameters<typeof fetch>[1]>> {
      const accessToken =
        process.env.NODE_ENV === 'development'
          ? process.env.NEXT_PUBLIC_ACCESS_TOKEN
          : getCookie('accessToken');

      if (accessToken) {
        init.headers = {
          'Content-Type': 'application/json;charset=UTF-8',
          ...init.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }

      return init;
    },

    async response<T = unknown>(
      response: Response,
      input: NonNullable<Parameters<typeof fetch>[0]>,
      init: NonNullable<Parameters<typeof fetch>[1]>,
    ): Promise<T> {
      if (!response.ok) {
        if (response.status === 401) {
          const newAccessToken = await refreshAccessToken();

          if (newAccessToken) {
            const accessToken = await getCookie('accessToken');

            const retryHeaders = {
              ...init.headers,
              Authorization: `Bearer ${accessToken}`,
            };

            const retryResponse = await fetch(input, {
              ...init,
              headers: retryHeaders,
            });

            if (retryResponse.ok) {
              return retryResponse.json() as Promise<T>;
            } else {
              // 재시도 실패
              const retryErrorText = await retryResponse.text();
              throw new Error(`Retry failed: ${retryErrorText}`);
            }
          } else {
            // 재발급 실패 시 로그인으로
            if (
              window.confirm(
                '로그인이 필요한 페이지입니다. 로그인 창으로 이동하시겠습니까?',
              )
            ) {
              window.location.href = '/auth/sign-in';
              return Promise.reject('Redirecting to login');
            }
          }
        }

        const errorBody = await response.json().catch(() => ({}));
        throw {
          status: response.status,
          data: errorBody,
        };
      }

      return response.json() as Promise<T>;
    },
  },
});

export default instance;
