interface GetUserListRequest {
  concertId: string; // 공연 PK (UUID)
  pageNumber?: number; // 요청 페이지 번호 [선택]
  pageSize?: number; // 한 페이지 당 항목 수 [선택]
  sortField?: string; // 정렬할 필드 [선택]
  sortDirection?: string; // 정렬 방향 [선택]
}

interface AgentInfo {
  agentId: string; // UUID
  nickname: string;
  profileUrl: string;
  introduction: string; // 없으면 빈 문자열
  averageRating: number; // double
  reviewCount: number; // int
}

// 전체 응답 타입 (Slice 구조)
interface GetUserListResponse {
  content: AgentInfo[];
  first: boolean;
  last: boolean;
}

export type { GetUserListRequest, GetUserListResponse };
