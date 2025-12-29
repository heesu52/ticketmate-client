'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postLogout } from '@/app/my/setting/account/log-out/_shared/services/api';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { useHandleError } from '@/shared/hooks/use-error';

export const useLogoutMutation = () => {
  const { handleError } = useHandleError();
  const router = useRouter();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      toastify({
        variant: 'success',
        description: '로그아웃 되었어요.',
      });
      router.replace('/');
    },

    onError: (error) => {
      handleError(error);
    },
  });
};
