import { Concert } from '@/shared/types';

interface GetConcertDetailRequest {
  concertId: string; // 공연ID [필수]
}

type GetConcertDetailResponse = Concert;

export type { GetConcertDetailRequest, GetConcertDetailResponse };
