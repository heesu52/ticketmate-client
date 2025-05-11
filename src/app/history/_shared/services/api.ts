import {
  GetFormListRequest,
  GetFormListResponse,
} from '@/app/history/_shared/services/type';
import instance from '@/shared/services/instance';
import { createQueryParams } from '@/shared/utils/services/query-string';

const BASE_URL = '/application';

/**
 * @description 공연 신청폼 목록 조회
 */
const getFormList = async (request?: GetFormListRequest) => {
  const query = request
    ? `?${createQueryParams(request as unknown as Record<string, unknown>)}`
    : '';

  const data = await instance<GetFormListResponse>(`${BASE_URL}${query}`, {
    method: 'GET',
  });
  return data;
};

export { getFormList };
