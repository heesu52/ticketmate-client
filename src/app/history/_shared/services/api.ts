import {
  GetFormListRequest,
  GetFormListResponse,
  PutFormRequest,
  getRejectionReasonResponse,
} from '@/app/history/_shared/services/type';
import instance from '@/shared/services/instance';
import { createQueryParams } from '@/shared/utils/services/query-string';

const BASE_URL = '/application-form';

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
const patchFormApprove = async (request: PutFormRequest) => {
  const { applicationFormId } = request;

  const data = await instance(`${BASE_URL}/${applicationFormId}/accept`, {
    method: 'PATCH',
  });

  return data;
};

/**
 * @description 공연 신청폼 거절
 */
const patchFormReject = async (request: PutFormRequest) => {
  const { applicationFormId } = request;

  const data = await instance(`${BASE_URL}/${applicationFormId}/reject`, {
    method: 'PATCH',
  });

  return data;
};

/**
 * @description 공연 신청폼 신청취소(의뢰인)
 */
const patchFormCancel = async (request: PutFormRequest) => {
  const { applicationFormId } = request;

  const data = await instance(`${BASE_URL}/${applicationFormId}/cancel`, {
    method: 'PATCH',
  });

  return data;
};

/**
 * @description 신청서 거절 사유 조회
 */
const getRejectionReason = async (request: PutFormRequest) => {
  const { applicationFormId } = request;

  const data = await instance<getRejectionReasonResponse>(
    `${BASE_URL}/${applicationFormId}/rejection-reason`,
    {
      method: 'GET',
    },
  );
  return data;
};

export {
  getFormList,
  patchFormApprove,
  patchFormReject,
  patchFormCancel,
  getRejectionReason,
};
