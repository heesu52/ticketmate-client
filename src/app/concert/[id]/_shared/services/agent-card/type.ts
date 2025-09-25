import { Pagination, AgentInfo } from '@/shared/types';

interface GetAgentListRequest {
  concertId: string; // 공연 PK (UUID)
  pageNumber?: number; // 요청 페이지 번호 [선택]
  pageSize?: number; // 한 페이지 당 항목 수 [선택]
  sortField?: string; // 정렬할 필드 [선택]
  sortDirection?: string; // 정렬 방향 [선택]
}

type GetAgentListResponse = Pagination<AgentInfo>;

export type { GetAgentListRequest, GetAgentListResponse };
