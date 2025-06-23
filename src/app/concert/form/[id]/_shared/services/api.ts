import {
  CreateConcertFormRequest,
  GetFormDetailRequest,
  GetFormDetailResponse,
} from '@/app/concert/form/[id]/_shared/services/type';
import instance from '@/shared/services/instance';

const BASE_URL = '/application';

/**
 * @description 공연 신청폼 작성
 */
const createConcertForm = async (request: CreateConcertFormRequest) => {
  const data = await instance(`${BASE_URL}`, {
    method: 'POST',
    body: JSON.stringify(request),
  });

  return data;
};

/**
 * @description 공연 신청폼 개별 조회
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

export { createConcertForm, getFormDetail };
