import httpClient from '@/lib/http-client/http-client';

import { CreateAgentAvailabilityRequest } from './type';

const BASE_URL = 'concert-agent-availability';

/**
 * @description 공연 대리인 수락 옵션 설정
 */

const createAgentAvailability = async (
  request: CreateAgentAvailabilityRequest,
) => {
  const data = await httpClient({
    method: 'post',
    url: `${BASE_URL}`,
    options: {
      json: request,
    },
  });

  return data;
};

export { createAgentAvailability };
