import {
  GetAgentListRequest,
  GetAgentListResponse,
} from '@/app/concert/[id]/_shared/services/agent-card/type';
import httpClient from '@/lib/http-client/http-client';

const BASE_URL = 'concert-agent-availability';

/**
 * @description 공연별 수락 대리인 목록 조회
 */
const getAgentList = async (request: GetAgentListRequest) => {
  const { concertId, ...queryParams } = request;

  const data = await httpClient<GetAgentListResponse>({
    method: 'get',
    url: `${BASE_URL}/${concertId}/agents`,
    options: {
      searchParams: { ...queryParams },
    },
  });

  return data;
};

export { getAgentList };
