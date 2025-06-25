import { Form } from '@/shared/types';

interface HopeArea {
  priority: number; // 우선순위
  location: string; // 구역명
  price: number; // 가격
}

interface ApplicationFormDetailRequest {
  performanceDate: string; // 공연 일자
  requestCount: number; // 요청한 티켓 수
  hopeAreaList?: HopeArea[]; // 희망 구역 리스트 (선택)
  requestDetails?: string; // 요청 사항 (선택)
}

type TicketOpenType = 'PRE_OPEN' | 'GENERAL_OPEN';

interface CreateConcertFormRequest {
  agentId: string; // 대리인 PK
  concertId: string; // 콘서트 PK
  applicationFormDetailRequestList: ApplicationFormDetailRequest[]; // 신청 공연 회차 목록 [최소 1개 이상 필수]

  ticketOpenType: TicketOpenType; // 선예매 여부
}

interface PatchConcertFormRequest {
  applicationFormId: string;
  applicationFormDetailRequestList: ApplicationFormDetailRequest[]; // 신청 공연 회차 목록 [최소 1개 이상 필수]
}

interface GetFormDetailRequest {
  applicationFormId: string; // 폼ID [필수]
}

type GetFormDetailResponse = Form;

export type {
  CreateConcertFormRequest,
  PatchConcertFormRequest,
  GetFormDetailRequest,
  GetFormDetailResponse,
};
