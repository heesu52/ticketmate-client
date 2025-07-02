import instance from '@/shared/services/instance';

import { GetMemberResponse } from './type';

const BASE_URL = '/member';

/**
 * @description 정보 조회
 */
const getMember = async () => {
  const data = await instance<GetMemberResponse>(`${BASE_URL}`, {
    method: 'GET',
    credentials: 'include',
  });
  return data;
};

export { getMember };
