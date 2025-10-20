import {
  GetConcertDetailRequest,
  GetConcertDetailResponse,
} from '@/app/concert/[id]/_shared/services/concert/type';
import httpClient from '@/lib/http-client/http-client';

const BASE_URL = 'concert';

/**
 * @description 공연 상세정보 조회
 */

const getConcertDetail = async (request: GetConcertDetailRequest) => {
  const { concertId } = request;
  const data = await httpClient<GetConcertDetailResponse>({
    method: 'get',
    url: `${BASE_URL}/${concertId}`,
  });

  return data;
};

export { getConcertDetail };
