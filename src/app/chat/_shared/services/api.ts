import instance from '@/shared/services/instance';
import { createQueryParams } from '@/shared/utils/services/query-string';

import { GetChatListRequest, GetChatListResponse } from './type';

const BASE_URL = '/chat-room';

/**
 * 채팅 목록 조회
 * @param request 채팅 목록 조회 요청 파라미터
 * @returns 채팅 목록 조회 응답
 */
export const getChatList = async (request: GetChatListRequest) => {
  const query = request
    ? `?${createQueryParams(request as Record<string, unknown>)}`
    : '';

  const data = await instance<GetChatListResponse>(`${BASE_URL}/list${query}`, {
    method: 'GET',
  });

  return data;
};
