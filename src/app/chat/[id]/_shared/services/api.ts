import instance from '@/shared/services/instance';
import { createQueryParams } from '@/shared/utils/services/query-string';

import {
  GetChatDetailRequest,
  GetChatDetailResponse,
  SendChatImageMessageRequest,
} from './type';

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

export const sendChatMessageImage = async (
  request: SendChatImageMessageRequest,
) => {
  const formData = new FormData();

  request.chatMessagePictureList.forEach((picture) => {
    formData.append('chatMessagePictureList', picture);
  });
  formData.append('type', request.type);

  const data = await instance(
    `/chat-message/${request.chatRoomId}/send/pictures`,
    {
      method: 'POST',
      body: formData,
    },
  );

  return data;
};
