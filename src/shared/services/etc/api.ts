import httpClient from '@/lib/http-client/http-client';
import { PostFcmTokenRequest } from '@/shared/services/etc/type';

const postFcmToken = async (request: PostFcmTokenRequest) => {
  const response = await httpClient({
    method: 'post',
    url: `fcm`,
    options: {
      json: request,
    },
  });

  return response;
};

export { postFcmToken };
