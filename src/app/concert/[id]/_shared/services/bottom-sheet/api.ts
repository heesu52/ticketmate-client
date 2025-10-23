import { CheckDuplicateFormRequest } from '@/app/concert/[id]/_shared/services/bottom-sheet/type';
import httpClient from '@/lib/http-client/http-client';

const BASE_URL = 'application-form/duplicate';

/**
 * @description 공연 신청폼 중복 확인
 */
const checkDuplicateForm = async (request: CheckDuplicateFormRequest) => {
  const data = await httpClient({
    method: 'post',
    url: `${BASE_URL}`,
    options: {
      json: request,
    },
  });

  return data;
};

export { checkDuplicateForm };
