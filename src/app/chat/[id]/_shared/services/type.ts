import {
  TicketOpenDateInfo,
  TicketOpenType,
  TicketReservationSite,
} from '@/shared/types';
import { Pagination } from '@/shared/types/api';

export interface GetChatMessageListRequest {
  /** 채팅방 고유 ID */
  chatRoomId: string;

  parameter?: {
    pageNumber?: number;
    pageSize?: number;
  };
}
export type ChatMessageType = 'TEXT' | 'PICTURE';

export interface ChatMessage {
  /** 채팅 메시지 타입 */
  chatMessageType: ChatMessageType;
  /** 채팅방 고유 ID */
  chatRoomId: string;
  /** 채팅의 읽음 여부 */
  isRead: boolean;
  /** 메시지 정보 */
  message: string | null;
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
  /** 채팅 메시지 이미지 목록 */
  pictureMessageList?: string[];
}

export type GetChatMessageListResponse = Pagination<ChatMessage>;

export interface GetChatRoomInfoRequest {
  /** 채팅방 고유 ID */
  chatRoomId: string;
}

export interface GetChatRoomInfoResponse {
  /** 채팅방 고유 ID */
  chatRoomId: string;
  /** 상대방 ID */
  otherMemberId: string;
  /** 상대방 닉네임 */
  opponentMemberNickName: string;
  /** 콘서트 이름 */
  concertName: string;
  /** 콘서트 썸네일 이미지 */
  concertThumbnailImage: string;
  /** 예매 타입 */
  ticketOpenType: TicketOpenType;
  /** 예매 일자 정보 */
  ticketOpenDateInfoResponseList: TicketOpenDateInfo[];
  /** 예매처 정보 */
  ticketReservationSite: TicketReservationSite;
  /** 콘서트 타입 */
  concertType: string;
}

export interface SendChatMessageRequest {
  /** 채팅방 고유 ID */
  chatRoomId: string;
  /** 채팅 메시지 타입 */
  chatMessageType: ChatMessageType;
  /** 채팅 메시지 */
  message: string;
}

/**
 * 채팅방에 이미지 메시지를 전송할 때 사용하는 요청 타입
 */
export interface SendChatImageMessageRequest {
  /** 채팅방 고유 ID (Path Variable) */
  chatRoomId: string;
  /** 전송할 이미지 파일 목록 (최대 10장, 파라미터명: chatMessagePictureList) */
  chatMessagePictureList: File[];
  type: 'PICTURE';
}
