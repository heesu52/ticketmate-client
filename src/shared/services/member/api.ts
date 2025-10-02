import httpClient from '@/lib/http-client/http-client';
import { GetMemberResponse } from '@/shared/services/member/type';

/**
 * @description 회원 정보 조회
 */
export const getMember = async () => {
  const response = await httpClient<GetMemberResponse>({
    method: 'get',
    url: 'member',
    options: {
      credentials: 'include',
    },
  });

  return response;
};
