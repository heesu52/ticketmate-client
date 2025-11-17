import { WithdrawRequest } from '@/app/my/setting/account/delete/_shared/services/type';
import httpClient from '@/lib/http-client/http-client';

const BASE_URL = 'member';

/**
 * @description 회원 탈퇴
 */

const postWithdraw = async (request: WithdrawRequest) => {
  const data = await httpClient({
    method: 'post',
    url: `${BASE_URL}/withdraw`,
    options: {
      json: request,
    },
  });

  return data;
};
export { postWithdraw };
