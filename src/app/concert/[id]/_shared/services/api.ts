import {
  GetConcertDetailRequest,
  GetConcertDetailResponse,
} from '@/app/concert/[id]/_shared/services/type';
import instance from '@/shared/services/instance';
import { createQueryParams } from '@/shared/utils/services/query-string';

const BASE_URL = '/concert';

/**
 * @description 공연 상세정보 조회
 */
const getConcertDetail = async (request?: GetConcertDetailRequest) => {
  const query = request
    ? `?${createQueryParams(request as Record<string, unknown>)}`
    : '';

  const data = await instance<GetConcertDetailResponse>(
    `${BASE_URL}${query}/conertId`,
    {
      method: 'GET',
    },
  );

  return data;
};

export { getConcertDetail };
