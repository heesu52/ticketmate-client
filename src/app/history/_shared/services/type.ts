import {
  Form,
  ApplicationFormStatus,
  ApplicationRejectedType,
  Pagination,
} from '@/shared/types';

interface GetFormListRequest {
  clientId?: string; // 의뢰인  [선택]
  agentId?: string; // 대리인 [선택]
  concertId?: string; // 공연  [선택]
  applicationStatus?: ApplicationFormStatus; // 신청서 상태 [선택]
  pageNumber?: number; // 요청 페이지 번호 [선택]
  pageSize?: number; // 한 페이지 당 항목 수 [선택]
  sortField?: string; // 정렬할 필드 [선택]
  sortDirection?: string; // 정렬 방향 [선택]
}

type GetFormListResponse = Pagination<Form>;

interface PatchFormRequest {
  applicationFormId: string; // 거절할 신청서 PK [필수]
  applicationFormRejectedType: ApplicationRejectedType; // 거절 사유 [필수]
  otherMemo: string; // 기타 사유인 경우 상세 메모 [기타 사유인 경우 필수, 2자 이상]
}

interface GetRejectionReasonResponse {
  applicationFormRejectedType: ApplicationRejectedType;
  otherMemo: string;
}

export type {
  GetFormListRequest,
  GetFormListResponse,
  PatchFormRequest,
  GetRejectionReasonResponse,
};
