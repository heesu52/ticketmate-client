import {
  GetFormListRequest,
  GetFormListResponse,
  PatchFormRequest,
  GetRejectionReasonResponse,
} from '@/app/history/_shared/services/type';
import httpClient from '@/lib/http-client/http-client';

const BASE_URL = 'application-form';

/**
 * @description 공연 신청폼 목록 조회
 */
const getFormList = async (request?: GetFormListRequest) => {
  const data = await httpClient<GetFormListResponse>({
    method: 'get',
    url: `${BASE_URL}`,
    options: {
      searchParams: { ...request },
    },
  });
  return data;
};

/**
 * @description 공연 신청폼 수락
 */
const patchFormApprove = async (applicationFormId: string) => {
  const data = await httpClient({
    method: 'patch',
    url: `${BASE_URL}/${applicationFormId}/accept`,
  });

  return data;
};

/**
 * @description 공연 신청폼 거절
 */
const patchFormReject = async (request: PatchFormRequest) => {
  const { applicationFormId } = request;

  const data = await httpClient({
    method: 'patch',
    url: `${BASE_URL}/${applicationFormId}/reject`,
    options: {
      json: request,
    },
  });

  return data;
};

/**
 * @description 공연 신청폼 신청취소(의뢰인)
 */
const patchFormCancel = async (applicationFormId: string) => {
  const data = await httpClient({
    method: 'patch',
    url: `${BASE_URL}/${applicationFormId}/cancel`,
  });

  return data;
};

/**
 * @description 신청서 거절 사유 조회
 */
const getRejectionReason = async (applicationFormId: string) => {
  const data = await httpClient<GetRejectionReasonResponse>({
    method: 'get',
    url: `${BASE_URL}/${applicationFormId}/rejection-reason`,
  });

  return data;
};

export {
  getFormList,
  patchFormApprove,
  patchFormReject,
  patchFormCancel,
  getRejectionReason,
};
