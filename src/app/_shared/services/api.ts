import {
  GetConcertListRequest,
  GetConcertListResponse,
} from '@/app/_shared/services/type';
import httpClient from '@/lib/http-client/http-client';

const BASE_URL = 'concert';

/**
 * @description 공연 목록 조회
 */
const getConcertList = async (request: GetConcertListRequest) => {
  const data = await httpClient<GetConcertListResponse>({
    method: 'get',
    url: `${BASE_URL}`,
    options: {
      searchParams: { ...request },
    },
  });

  return data;
};

export { getConcertList };
