import httpClient from '@/lib/http-client/http-client';

import {
  CreateAgentAvailabilityRequest,
  GetAcceptingConcertRequest,
  GetAcceptingConcertResponse,
} from './type';

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

/**
 * @description 대리인 on/off 설정을 위한 공연 목록 조회
 */
const getOnOffConcert = async (request: GetAcceptingConcertRequest) => {
  const data = await httpClient<GetAcceptingConcertResponse>({
    method: 'get',
    url: `${BASE_URL}/concerts`,
    options: {
      searchParams: { ...request },
    },
  });
  return data;
};

/**
 * @description 대리인 on설정된 모집 중 공연 목록 조회
 */
const getAcceptingConcert = async (request: GetAcceptingConcertRequest) => {
  const data = await httpClient<GetAcceptingConcertResponse>({
    method: 'get',
    url: `${BASE_URL}/accepting-concerts`,
    options: {
      searchParams: { ...request },
    },
  });
  return data;
};

export { createAgentAvailability, getOnOffConcert, getAcceptingConcert };
