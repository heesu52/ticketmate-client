import { GetRecentSuccessResponse } from '@/app/my/recent-success/_shared/services/type';
import httpClient from '@/lib/http-client/http-client';

const BASE_URL = 'success-history';

/**
 * @description 최근 신청 성공내역 리스트 조회
 */
const getRecentSuccessList = async (agentId: string) => {
  const data = await httpClient<GetRecentSuccessResponse>({
    method: 'get',
    url: `${BASE_URL}/${agentId}`,
  });
  return data;
};

export { getRecentSuccessList };
