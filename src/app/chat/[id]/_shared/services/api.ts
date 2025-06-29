import instance from '@/shared/services/instance';
import { createQueryParams } from '@/shared/utils/services/query-string';

import { GetChatDetailRequest, GetChatDetailResponse } from './type';

const BASE_URL = '/chat-room';

/**
 * 채팅 상세 조회
 * @param request 채팅 상세 조회 요청 파라미터
 * @returns 채팅 상세 조회 응답
 */
export const getChatDetail = async (request: GetChatDetailRequest) => {
  const { chatRoomId, parameter } = request;

  const query = parameter
    ? `?${createQueryParams(parameter as unknown as Record<string, unknown>)}`
    : '';

  const data = await instance<GetChatDetailResponse>(
    `${BASE_URL}/${chatRoomId}${query}`,
    {
      method: 'GET',
    },
  );

  return data;
};
