import {
  GetConcertListRequest,
  GetConcertListResponse,
} from '@/app/_shared/services/type';
import instance from '@/shared/services/instance';
import { createQueryParams } from '@/shared/utils/services/query-string';

const BASE_URL = '/concert';

/**
 * @description 공연 목록 조회
 */
const getConcertList = async (request?: GetConcertListRequest) => {
  const query = request
    ? `?${createQueryParams(request as Record<string, unknown>)}`
    : '';

  const data = await instance<GetConcertListResponse>(`${BASE_URL}${query}`, {
    method: 'GET',
  });

  return data;
};

export { getConcertList };
