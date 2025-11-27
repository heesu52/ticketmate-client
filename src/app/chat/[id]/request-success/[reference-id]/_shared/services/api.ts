import httpClient from '@/lib/http-client/http-client';

import {
  GetFulfillmentFormRequest,
  GetFulfillmentFormResponse,
  PatchFulfillmentFormAcceptRequest,
  PatchFulfillmentFormRejectResponse,
  PatchFulfillmentFormUpdateRequest,
  PostFulfillmentFormRequest,
} from './type';

const BASE_URL = 'fulfillment-form';

/**
 * 성공양식 전송
 * @param request 성공양식 전송 요청 파라미터
 * @returns 성공양식 전송 응답
 */
export const postFulfillmentForm = async (
  request: PostFulfillmentFormRequest,
) => {
  const { chatRoomId, fulfillmentFormRequest } = request;

  const formData = new FormData();

  fulfillmentFormRequest.fulfillmentFormImgList.forEach((img) => {
    formData.append('fulfillmentFormImgList', img);
  });
  formData.append('particularMemo', fulfillmentFormRequest.particularMemo);
  formData.append(
    'agentBankAccountId',
    fulfillmentFormRequest.agentBankAccountId,
  );

  const data = await httpClient({
    method: 'post',
    url: `${BASE_URL}/${chatRoomId}`,
    options: {
      body: formData,
    },
  });

  return data;
};

/**
 * 성공양식 수정
 * @param request 성공양식 수정 요청 파라미터
 * @returns 성공양식 수정 응답
 */
export const patchFulfillmentFormUpdate = async (
  request: PatchFulfillmentFormUpdateRequest,
) => {
  const {
    fulfillmentFormId,
    deleteImgIdList,
    newSuccessImgList,
    particularMemo,
    agentBankAccountId,
  } = request;

  const formData = new FormData();
  newSuccessImgList?.forEach((img) => {
    formData.append('newSuccessImgList', img);
  });
  formData.append('particularMemo', particularMemo ?? '');
  formData.append('agentBankAccountId', agentBankAccountId ?? '');

  deleteImgIdList?.forEach((imgId) => {
    formData.append('deleteImgIdList', imgId);
  });

  const data = await httpClient({
    method: 'patch',
    url: `${BASE_URL}/${fulfillmentFormId}`,
    options: {
      body: formData,
    },
  });

  return data;
};

/**
 * 성공양식 거절
 * @param request 성공양식 거절 요청 파라미터
 * @returns 성공양식 거절 응답
 */
export const patchFulfillmentFormReject = async (
  request: PatchFulfillmentFormRejectResponse,
) => {
  const { fulfillmentFormId, rejectedMemo } = request;

  const data = await httpClient({
    method: 'patch',
    url: `${BASE_URL}/${fulfillmentFormId}/reject`,
    options: {
      json: { rejectedMemo },
    },
  });

  return data;
};

/**
 * 성공양식 수락
 * @param request 성공양식 수락 요청 파라미터
 * @returns 성공양식 수락 응답
 */
export const patchFulfillmentFormAccept = async (
  request: PatchFulfillmentFormAcceptRequest,
) => {
  const { fulfillmentFormId } = request;

  const data = await httpClient({
    method: 'patch',
    url: `${BASE_URL}/${fulfillmentFormId}/accept`,
  });

  return data;
};

/**
 * 성공양식 조회
 * @param request 성공양식 조회 요청 파라미터
 * @returns 성공양식 조회 응답
 */
export const getFulfillmentForm = async (
  request: GetFulfillmentFormRequest,
) => {
  const { fulfillmentFormId } = request;

  const data = await httpClient<GetFulfillmentFormResponse>({
    method: 'get',
    url: `${BASE_URL}/${fulfillmentFormId}`,
  });

  return data;
};
