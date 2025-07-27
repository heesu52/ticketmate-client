import instance from '@/shared/services/instance';
import { createQueryParams } from '@/shared/utils/services/query-string';

import { GetUserListRequest, GetUserListResponse } from './type';

const BASE_URL = '/concert-agent-availability';

/**
 * @description 공연별 수락 대리인 목록 조회
 */
const getUserList = async (request?: GetUserListRequest) => {
  if (!request?.concertId) {
    throw new Error('concertId is required');
  }

  const { concertId, ...queryParams } = request;

  const query = Object.keys(queryParams).length
    ? `?${createQueryParams(queryParams)}`
    : '';

  const data = await instance<GetUserListResponse>(
    `${BASE_URL}/${concertId}/agents${query}`,
    {
      method: 'GET',
    },
  );
  return data;
};

export { getUserList };
