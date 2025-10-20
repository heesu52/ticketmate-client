import { useMutation, useQueryClient } from '@tanstack/react-query';

import queryKey from '@/app/history/_shared/services/query-key';

type MutationFn<T> = (payload: T) => Promise<unknown>;

interface UsePatchFormOptions<T> {
  mutationFn: MutationFn<T>;
}

export const usePatchForm = <T>({ mutationFn }: UsePatchFormOptions<T>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.getFormList() });
    },
    onError: () => {},
  });
};
