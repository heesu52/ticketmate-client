import httpClient from '@/lib/http-client/http-client';

import {
  GetChatDetailRequest,
  GetChatDetailResponse,
  SendChatImageMessageRequest,
} from './type';

const BASE_URL = 'chat-room';

/**
 * 채팅 상세 조회
 * @param request 채팅 상세 조회 요청 파라미터
 * @returns 채팅 상세 조회 응답
 */
export const getChatDetail = async (request: GetChatDetailRequest) => {
  const { chatRoomId, parameter } = request;

  const data = await httpClient<GetChatDetailResponse>({
    url: `${BASE_URL}/${chatRoomId}/message`,
    method: 'get',
    options: {
      searchParams: { ...parameter },
    },
  });

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

  const data = await httpClient<GetChatDetailResponse>({
    url: `${BASE_URL}/${request.chatRoomId}/send/pictures`,
    method: 'post',
    options: {
      body: formData,
    },
  });

  return data;
};
