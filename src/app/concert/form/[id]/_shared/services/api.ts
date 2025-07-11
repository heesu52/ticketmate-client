import {
  CreateConcertFormRequest,
  PatchConcertFormRequest,
  GetFormDetailRequest,
  GetFormDetailResponse,
} from '@/app/concert/form/[id]/_shared/services/type';
import instance from '@/shared/services/instance';

const BASE_URL = '/application-form';

/**
 * @description 신청서 작성
 */
const createConcertForm = async (request: CreateConcertFormRequest) => {
  const data = await instance(`${BASE_URL}`, {
    method: 'POST',
    body: JSON.stringify(request),
  });

  return data;
};

/**
 * @description 신청서 수정
 */
const patchConcertForm = async (request: PatchConcertFormRequest) => {
  const { applicationFormId, applicationFormEditRequest } = request;

  const data = await instance(`${BASE_URL}/${applicationFormId}/edit`, {
    method: 'PATCH',
    body: JSON.stringify(applicationFormEditRequest),
  });

  return data;
};

/**
 * @description 대리 티켓팅 신청서 상세 조회
 */
const getFormDetail = async (request: GetFormDetailRequest) => {
  const { applicationFormId } = request;

  const data = await instance<GetFormDetailResponse>(
    `${BASE_URL}/${applicationFormId}`,
    {
      method: 'GET',
    },
  );
  return data;
};

export { createConcertForm, patchConcertForm, getFormDetail };
