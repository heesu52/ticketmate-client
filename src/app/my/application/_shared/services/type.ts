import { Pagination } from '@/shared/types';

interface CreateAgentAvailabilityRequest {
  concertId: string; //공연 식별자 [필수]
  accepting?: boolean; // 수락 여부 [선택 (누락 시 true)]
  introduction?: string; //소개 문구 [선택]
}

interface GetAcceptingConcertRequest {
  pageNumber?: number;
  pageSize?: number;
}

// 신청 공연 응답값
interface AcceptingConcert {
  concertId: string; // UUID
  concertName: string;
  concertThumbnailUrl: string;
  matchedClientCount: number;
  accepting?: boolean; //On/Off 할 때 필요
}

type GetAcceptingConcertResponse = Pagination<AcceptingConcert>;

export type {
  CreateAgentAvailabilityRequest,
  GetAcceptingConcertRequest,
  AcceptingConcert,
  GetAcceptingConcertResponse,
};
