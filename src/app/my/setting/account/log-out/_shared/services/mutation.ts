'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postLogout } from '@/app/my/setting/account/log-out/_shared/services/api';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { handleError } from '@/shared/utils/error';

export const useLogoutMutation = () => {
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
