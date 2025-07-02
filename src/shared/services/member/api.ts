import { GetMemberResponse } from '@/app/_shared/services/type';
import instance from '@/shared/services/instance';

const BASE_URL = '/member';
/**
 * @description 정보 조회
 */
const getMember = async () => {
  const data = await instance<GetMemberResponse>(`${BASE_URL}`, {
    method: 'GET',
  });
  return data;
};

export { getMember };
