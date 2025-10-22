import { useMutation } from '@tanstack/react-query';

import { checkDuplicateForm } from '@/app/concert/[id]/_shared/services/bottom-sheet/api';
import { CheckDuplicateFormRequest } from '@/app/concert/[id]/_shared/services/bottom-sheet/type';

export const useCheckDuplicateForm = () => {
  return useMutation({
    mutationFn: (request: CheckDuplicateFormRequest) =>
      checkDuplicateForm(request),
    onSuccess: () => {},
    onError: () => {},
  });
};
