import { TicketOpenType } from './ticket';

type ApplicationFormStatus =
  | 'PENDING'
  | 'REJECTED'
  | 'CANCELED'
  | 'ACCEPTED'
  | 'CANCELED_IN_PROCESS';

type ApplicationRejectedType =
  | 'FEE_NOT_MATCHING_MARKET_PRICE'
  | 'RESERVATION_CLOSED'
  | 'SCHEDULE_UNAVAILABLE'
  | 'OTHER';

interface HopeArea {
  priority: number; // 우선순위
  location: string; // 구역명
  price: number; // 가격
}

interface ApplicationFormDetailResponse {
  performanceDate: string; // 공연 일자
  session: number;
  requestCount: number; // 요청한 티켓 수
  hopeAreaResponseList: HopeArea[]; // 희망 구역 리스트 (선택)
  requirement?: string; // 요청 사항 (선택)
}

interface Form {
  clientId: string; // 의뢰인 PK
  agentId: string; // 대리인 PK
  concertId: string; // 콘서트 PK
  openDate: string;
  applicationFormDetailResponseList: ApplicationFormDetailResponse[]; // 신청 공연 회차 목록 [최소 1개 이상 필수
  applicationFormId: string;

  //신청내역 정보 조회에 대한 응답값(그냥 신청폼 응답값 타입확인해보고 개별/리스트 타입을 분리할지 고민)
  concertName: string;
  concertThumbnailUrl: string;
  agentNickname: string;
  clientNickname: string;
  submittedDate: string;
  applicationFormStatus: ApplicationFormStatus;
  ticketOpenType: TicketOpenType; // 선예매 여부
}

export type {
  ApplicationFormStatus,
  ApplicationRejectedType,
  ApplicationFormDetailResponse,
  Form,
};
