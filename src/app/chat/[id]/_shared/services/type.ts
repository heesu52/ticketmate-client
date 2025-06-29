import { Pagination } from '@/shared/types/api';

export interface GetChatDetailRequest {
  /** 채팅방 고유 ID */
  chatRoomId: string;

  parameter?: {
    pageNumber?: number;
    pageSize?: number;
  };
}

export interface ChatMessage {
  /** 채팅방 고유 ID */
  chatRoomId: string;
  /** 채팅의 읽음 여부 */
  isRead: boolean;
  /** 메시지 정보 */
  message: string;
  /** 채팅 메시지 ID */
  messageId: string;
  /** 채팅을 보낸 사용자가 본인인지 여부 */
  mine: boolean;
  /** 채팅을 보낸 사용자의 프로필 사진 */
  profileUrl: string;
  /** 채팅을 보낸 시간 */
  sendDate: string;
  /** 채팅 메시지를 보낸 사용자 ID */
  senderId: string;
  /** 채팅 메시지를 보낸 사용자 닉네임 */
  senderNickname: string;
}

export type GetChatDetailResponse = Pagination<ChatMessage>;
