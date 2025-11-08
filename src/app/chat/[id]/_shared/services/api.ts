import httpClient from '@/lib/http-client/http-client';

import {
  GetChatMessageListRequest,
  GetChatMessageListResponse,
  GetChatRoomInfoRequest,
  GetChatRoomInfoResponse,
  SendChatImageMessageRequest,
} from './type';

const BASE_URL = 'chat-room';

/**
 * 채팅 상세 조회
 * @param request 채팅 상세 조회 요청 파라미터
 * @returns 채팅 상세 조회 응답
 */
export const getChatMessageList = async (
  request: GetChatMessageListRequest,
) => {
  const { chatRoomId, parameter } = request;

  const data = await httpClient<GetChatMessageListResponse>({
    url: `${BASE_URL}/${chatRoomId}/message`,
    method: 'get',
    options: {
      searchParams: { ...parameter },
    },
  });

  return data;
};

/**
 * 채팅방 정보 조회
 * @param request 채팅방 정보 조회 요청 파라미터
 * @returns 채팅방 정보 조회 응답
 */
export const getChatRoomInfo = async (request: GetChatRoomInfoRequest) => {
  const { chatRoomId } = request;

  const data = await httpClient<GetChatRoomInfoResponse>({
    url: `${BASE_URL}/${chatRoomId}/context`,
    method: 'get',
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

  const data = await httpClient<GetChatMessageListResponse>({
    url: `${BASE_URL}/${request.chatRoomId}/send/pictures`,
    method: 'post',
    options: {
      body: formData,
    },
  });

  return data;
};
