import { TicketOpenType } from './ticket';

type ApplicationFormStatus =
  | 'PENDING'
  | 'REJECTED'
  | 'CANCELED'
  | 'ACCEPTED'
  | 'CANCELED_IN_PROCESS';

interface HopeAreaResponse {
  priority: number; // 우선순위
  location: string; // 구역명
  price: number; // 가격
}

interface ApplicationFormDetailResponse {
  performanceDate: string; // 공연 일자
  session: number;
  requestCount: number; // 요청한 티켓 수
  hopeAreaResponseList: HopeAreaResponse[]; // 희망 구역 리스트 (선택)
  requirement: string; // 요청 사항 (선택)
}

interface Form {
  applicationFormId: string;
  clientId: string; // 의뢰인 PK
  agentId: string; // 대리인 PK
  concertId: string; // 콘서트 PK
  openDate: string;
  applicationFormDetailResponseList: ApplicationFormDetailResponse[]; // 신청 공연 회차 목록 [최소 1개 이상 필수]
  applicationFormStatus: ApplicationFormStatus;
  ticketOpenType: TicketOpenType; // 선예매 여부
}

export type { ApplicationFormStatus, Form };
