import {
  GetFormListRequest,
  GetFormListResponse,
  PutFormRequest,
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

/**
 * @description 공연 신청폼 수락
 */
const putFormApprove = async (request: PutFormRequest) => {
  const { applicationFormId } = request;

  const data = await instance(
    `${BASE_URL}/expressions/${applicationFormId}/approve`,
    {
      method: 'PUT',
    },
  );

  return data;
};

/**
 * @description 공연 신청폼 거절
 */
const putFormReject = async (request: PutFormRequest) => {
  const { applicationFormId } = request;

  const data = await instance(
    `${BASE_URL}/expressions/${applicationFormId}/reject`,
    {
      method: 'PUT',
    },
  );

  return data;
};

export { getFormList, putFormApprove, putFormReject };
