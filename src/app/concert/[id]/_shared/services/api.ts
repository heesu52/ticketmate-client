import {
  GetConcertDetailRequest,
  GetConcertDetailResponse,
} from '@/app/concert/[id]/_shared/services/type';
import instance from '@/shared/services/instance';

const BASE_URL = '/concert';

/**
 * @description 공연 상세정보 조회
 */
const getConcertDetail = async (request?: GetConcertDetailRequest) => {
  const { concertId } = request || {};

  if (!concertId) throw new Error('concertId is required');

  const data = await instance<GetConcertDetailResponse>(
    `${BASE_URL}/${concertId}`,
    {
      method: 'GET',
    },
  );

  console.log(data);
  return data;
};

export { getConcertDetail };
