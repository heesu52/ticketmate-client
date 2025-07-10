import instance from '@/shared/services/instance';

import { CheckDuplicateFormRequest } from './type';

const BASE_URL = '/application-form/duplicate';

/**
 * @description 공연 신청폼 중복 확인
 */
const checkDuplicateForm = async (request: CheckDuplicateFormRequest) => {
  const data = await instance(`${BASE_URL}`, {
    method: 'POST',
    body: JSON.stringify(request),
  });

  return data;
};

export { checkDuplicateForm };
