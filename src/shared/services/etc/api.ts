import httpClient from '@/lib/http-client/http-client';
import { PostFCMTokenRequest } from '@/shared/services/etc/type';

const postFCMToken = async (request: PostFCMTokenRequest) => {
  const response = await httpClient({
    method: 'post',
    url: `fcm`,
    options: {
      json: request,
    },
  });

  return response;
};

export { postFCMToken };
