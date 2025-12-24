import { useMutation } from '@tanstack/react-query';

import { postFCMToken } from '@/shared/services/etc/api';

export const usePostFCMToken = () => {
  return useMutation({
    mutationFn: postFCMToken,
  });
};
