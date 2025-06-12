import { CreateConcertFormRequest } from '@/app/concert/form/[id]/_shared/services/type';
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

export { createConcertForm };
