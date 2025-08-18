import { useMutation, useQueryClient } from '@tanstack/react-query';

import queryKey from '@/app/history/_shared/services/query-key';
import { customToast } from '@/shared/components/toast/custom-toast/custom-toast';

type MutationFn<T> = (payload: T) => Promise<unknown>;

interface UsePatchFormOptions<T> {
  mutationFn: MutationFn<T>;
  successMessage: string;
  errorMessage: string;
}

export const usePatchForm = <T>({
  mutationFn,
  successMessage,
  errorMessage,
}: UsePatchFormOptions<T>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      customToast({ description: successMessage });
      queryClient.invalidateQueries({ queryKey: queryKey.getFormList() });
    },
    onError: () => {
      customToast({ description: errorMessage });
    },
  });
};
