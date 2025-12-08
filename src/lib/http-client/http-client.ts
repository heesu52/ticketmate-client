import { getCookie } from 'cookies-next';
import ky, { HTTPError, type Options } from 'ky';

import { APIMethod } from '@/lib/http-client/http-client.type';
import { refreshAccessToken } from '@/shared/services/auth/api';

const PREFIX_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
// 알림 테스트를 위해 주석처리
// const PREFIX_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
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
        // 401 에러 처리 (토큰 만료)
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

        // 403 에러 처리 (본인인증 또는 프로필 설정 미완료)
        if (response.status === 403 && MODE !== 'development') {
          try {
            const errorJson = await response.clone().json();
            const errorCode = errorJson.errorCode;

            if (errorCode === 'PHONE_VERIFICATION_REQUIRED') {
              // 본인인증 미완료 시 본인인증 페이지로 리다이렉트
              window.location.href = '/auth/sign-in/verification';
              return new Response(null);
            } else if (errorCode === 'INITIAL_PROFILE_SETUP_REQUIRED') {
              // 프로필 설정 미완료 시 프로필 설정 페이지로 리다이렉트
              window.location.href = '/auth/sign-in/profile';
              return new Response(null);
            }
          } catch {
            // JSON 파싱 실패 시 원래 응답 반환
            return response;
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
