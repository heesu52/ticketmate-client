import { getCookie } from 'cookies-next';
import ky, { HTTPError, type Options } from 'ky';

import { APIMethod } from '@/lib/http-client/http-client.type';
import { refreshAccessToken } from '@/shared/services/auth/api';

const PREFIX_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
const MODE = process.env.NODE_ENV;

const created = ky.create({
  prefixUrl: PREFIX_URL,
  credentials: 'include',
  retry: {
    limit: 3,
    backoffLimit: 1000,
  },
  throwHttpErrors: true,
});

const extended = created.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        // 개발 환경 토큰 기반 설정
        if (MODE === 'development') {
          request.headers.set(
            'Authorization',
            `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
          );
        } else {
          const accessToken = getCookie('accessToken');

          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status !== 401) {
          return response;
        }

        if (response.status === 401 && MODE !== 'development') {
          const res = await refreshAccessToken();

          if (res) {
            return await ky(request, options);
          } else {
            window.location.href = '/auth/sign-in';

            // 이후 흐름 중단을 위해 빈 Response 반환
            return new Response(null);
          }
        }

        return response;
      },
    ],
  },
});

interface HttpClientProps {
  /** 메서드 타입 */
  method: APIMethod;
  /** URL */
  url: string;
  /** 옵션 */
  options?: Options;
}

const httpClient = async <TResponse = unknown>({
  method,
  url,
  options,
}: HttpClientProps): Promise<TResponse> => {
  try {
    const response = await extended[method](url, options);
    const text = await response.clone().text(); // .text(), .json() 메서드는 한 번만 호출 가능

    // 응답이 성공하고 응답이 비어있으면 true 반환
    if (text === '') {
      return true as TResponse;
    }

    return (await response.json()) as TResponse;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorJson = await error.response.json();
      throw errorJson;
    }
    throw error;
  }
};

export default httpClient;
