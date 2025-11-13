import {
  CreateConcertFormRequest,
  PatchConcertFormRequest,
  GetFormDetailRequest,
  GetFormDetailResponse,
} from '@/app/concert/form/[id]/_shared/services/type';
import httpClient from '@/lib/http-client/http-client';

const BASE_URL = 'application-form';

/**
 * @description 신청서 작성
 */

const createConcertForm = async (request: CreateConcertFormRequest) => {
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
 * @description 신청서 수정
 */
const patchConcertForm = async (request: PatchConcertFormRequest) => {
  const { applicationFormId, applicationFormEditRequest } = request;

  return await httpClient({
    method: 'patch',
    url: `${BASE_URL}/${applicationFormId}/edit`,
    options: {
      json: applicationFormEditRequest,
    },
  });
};

/**
 * @description 대리 티켓팅 신청서 상세 조회
 */
const getFormDetail = async (request: GetFormDetailRequest) => {
  const { applicationFormId } = request;

  const data = await httpClient<GetFormDetailResponse>({
    method: 'get',
    url: `${BASE_URL}/${applicationFormId}`,
  });
  return data;
};

const getFormDetailByChat = async (request: GetFormDetailRequest) => {
  const { applicationFormId } = request;

  const data = await httpClient<GetFormDetailResponse>({
    method: 'get',
    url: `chat-room/${applicationFormId}/application-form`,
  });
  return data;
};
export {
  createConcertForm,
  patchConcertForm,
  getFormDetail,
  getFormDetailByChat,
};
