import instance from '@/shared/services/instance';

import { GetConcertDetailRequest, GetConcertDetailResponse } from './type';

const BASE_URL = '/concert';

/**
 * @description 공연 상세정보 조회
 */
const getConcertDetail = async (request?: GetConcertDetailRequest) => {
  const { concertId } = request || {};

  const data = await instance<GetConcertDetailResponse>(
    `${BASE_URL}/${concertId}`,
    {
      method: 'GET',
    },
  );
  return data;
};

export { getConcertDetail };
