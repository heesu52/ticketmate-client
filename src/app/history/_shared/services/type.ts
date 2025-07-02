import { Form, ApplicationFormStatus, Pagination } from '@/shared/types';

interface GetFormListRequest {
  clientId?: string; // 의뢰인  [선택]
  agentId?: string; // 대리인 [선택]
  concertId?: string; // 공연  [선택]
  requestCount?: number; // 매수 [선택]
  applicationStatus?: ApplicationFormStatus; // 신청서 상태 [선택]
  pageNumber?: number; // 요청 페이지 번호 [선택]
  pageSize?: number; // 한 페이지 당 항목 수 [선택]
  sortField?: string; // 정렬할 필드 [선택]
  sortDirection?: string; // 정렬 방향 [선택]
}

type GetFormListResponse = Pagination<Form>;

interface PutFormRequest {
  applicationFormId: string;
}

export type { GetFormListRequest, GetFormListResponse, PutFormRequest };
