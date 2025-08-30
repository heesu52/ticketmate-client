import { Concert, AgentInfo } from '@/shared/types';

type SearchType = 'CONCERT' | 'AGENT';

interface GetSearchRequest {
  keyword?: string; // 공연 제목 검색어 [선택]
  type?: SearchType; // 카테고리 [선택]
  pageNumber?: number; // 요청 페이지 번호 [선택]
  pageSize?: number; // 한 페이지 당 항목 수 [선택]
}

type GetConcertSearchResponse = Concert;

type GetAgentSearchResponse = AgentInfo;

interface GetRecentSearchResponse {
  searches: string[];
}

export type {
  GetSearchRequest,
  GetConcertSearchResponse,
  GetAgentSearchResponse,
  GetRecentSearchResponse,
};
