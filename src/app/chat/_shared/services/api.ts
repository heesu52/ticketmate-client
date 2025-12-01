import httpClient from '@/lib/http-client/http-client';

import { GetChatListRequest, GetChatListResponse } from './type';

const BASE_URL = 'chat-room';

/**
 * 채팅 목록 조회
 * @param request 채팅 목록 조회 요청 파라미터
 * @returns 채팅 목록 조회 응답
 */
export const getChatList = async (request: GetChatListRequest) => {
  const response = await httpClient<GetChatListResponse>({
    url: `${BASE_URL}`,
    method: 'get',
    options: {
      searchParams: { ...request },
    },
  });

  return response;
};
