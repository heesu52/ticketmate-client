import ky, { type Options } from 'ky';

const PREFIX_URL = process.env.NEXT_PUBLIC_API_URL;
const MODE = process.env.NODE_ENV;

const created = ky.create({
  prefixUrl: PREFIX_URL,
  credentials: 'include',
  retry: {
    limit: 3,
    backoffLimit: 1000,
  },
  throwHttpErrors: false,
});

const extended = created.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        // Content-Type 설정
        request.headers.set('Content-Type', 'application/json');

        // 개발 환경 토큰 기반 설정
        if (MODE === 'development') {
          request.headers.set(
            'Authorization',
            `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
          );
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        try {
          return response.json();
        } catch (error) {
          console.error('HTTP Client Error:', error);
          throw error;
        }
      },
    ],
  },
});

export type APIMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface HttpClientProps {
  method: APIMethod;
  url: string;
  options?: Options;
}

const httpClient = async <TResponse = unknown>({
  method,
  url,
  options,
}: HttpClientProps): Promise<TResponse> => {
  try {
    const response = await extended[method](url, options);

    return response.json() as TResponse;
  } catch (error) {
    console.error('HTTP Client Error:', error);
    throw error;
  }
};

export default httpClient;
