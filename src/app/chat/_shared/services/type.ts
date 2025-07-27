import { Pagination, TicketOpenType } from '@/shared/types';

export interface GetChatListRequest {
  /** 선예매/일반예매 검색 카테고리 여부 */
  ticketOpenType?: TicketOpenType;
  /** 요청 페이지 번호 */
  pageNumber?: number;
  /** 검색 키워드 */
  searchKeyword?: string;
}

export interface ChatRoom {
  /** 채팅방 고유 ID */
  chatRoomId: string;
  /** 채팅방 이름 */
  chatRoomName: string;
  /** 콘서트 썸네일 URL */
  concertThumbnailUrl: string;
  /** 마지막 채팅 메시지 */
  lastChatMessage: string;
  /** 마지막 채팅 보낸 시간 */
  lastChatSendTime: string;
  /** 프로필 사진 URL */
  profileUrl: string;
  /** 티켓 오픈 타입 */
  ticketOpenType: TicketOpenType;
  /** 읽지 않은 메시지 수 */
  unReadMessageCount: number;
}

export type GetChatListResponse = Pagination<ChatRoom>;
