import {
  Concert,
  ConcertType,
  Member,
  Pagination,
  TicketReservationSite,
} from '@/shared/types';

interface GetConcertListRequest {
  concertName?: string; // 공연 제목 검색어 [선택]
  concertHallName?: string; // 공연장 이름 검색어 [선택]
  concertType?: ConcertType; // 공연 카테고리 [선택]
  ticketReservationSite?: TicketReservationSite; // 예매처 사이트 [선택]
  pageNumber?: number; // 요청 페이지 번호 [선택]
  pageSize?: number; // 한 페이지 당 항목 수 [선택]
  sortField?: string; // 정렬할 필드 [선택]
  sortDirection?: string; // 정렬 방향 [선택]
}

type GetConcertListResponse = Pagination<Concert>;

type GetMemberResponse = Member;

export type {
  GetConcertListRequest,
  GetConcertListResponse,
  GetMemberResponse,
};
