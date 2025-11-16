import { useMutation } from '@tanstack/react-query';

import { postWithdraw } from '@/app/my/setting/account/delete/_shared/services/api';
import { WithdrawRequest } from '@/app/my/setting/account/delete/_shared/services/type';

export const usePostWithdrawMutation = () => {
  return useMutation({
    mutationFn: (request: WithdrawRequest) => postWithdraw(request),
  });
};
