import instance from '@/shared/services/instance';
import { createQueryParams } from '@/shared/utils/services/query-string';

import { GetAgentListRequest, GetAgentListResponse } from './type';

const BASE_URL = '/concert-agent-availability';

/**
 * @description 공연별 수락 대리인 목록 조회
 */
const getAgentList = async (request: GetAgentListRequest) => {
  const { concertId, ...queryParams } = request;

  const query = Object.keys(queryParams).length
    ? `?${createQueryParams(queryParams)}`
    : '';

  const data = await instance<GetAgentListResponse>(
    `${BASE_URL}/${concertId}/agents${query}`,
    { method: 'GET' },
  );

  return data;
};

export { getAgentList };
