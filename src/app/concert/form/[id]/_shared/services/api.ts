import {
  CreateConcertFormRequest,
  PatchConcertFormRequest,
  GetFormDetailRequest,
  GetFormDetailResponse,
} from '@/app/concert/form/[id]/_shared/services/type';
import instance from '@/shared/services/instance';

const BASE_URL = '/application-form';

const createConcertForm = async (request: CreateConcertFormRequest) => {
  const data = await instance(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  return data; // 이미 instance 인터셉터에서 JSON 파싱된 데이터 반환한다고 가정
};

/**
 * @description 신청서 수정
 */
const patchConcertForm = async (request: PatchConcertFormRequest) => {
  const { applicationFormId, applicationFormEditRequest } = request;

  const data = await instance(`${BASE_URL}/${applicationFormId}/edit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
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
