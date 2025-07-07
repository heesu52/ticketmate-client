import { TicketOpenType } from './ticket';

type ApplicationFormStatus =
  | 'PENDING'
  | 'REJECTED'
  | 'CANCELED'
  | 'ACCEPTED'
  | 'CANCELED_IN_PROCESS';

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
  applicationFormId: string;
  concertName: string;
  concertThumbnailUrl: string;
  agentNickname: string;
  clientNickname: string;
  submittedDate: string;
  applicationFormStatus: ApplicationFormStatus;
  ticketOpenType: TicketOpenType; // 선예매 여부
}

export type { ApplicationFormStatus, ApplicationFormDetailResponse, Form };
