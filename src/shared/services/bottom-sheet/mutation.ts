import { useMutation } from '@tanstack/react-query';

import { checkDuplicateForm } from './api';
import { CheckDuplicateFormRequest } from './type';

export const useCheckDuplicateForm = () => {
  return useMutation({
    mutationFn: (request: CheckDuplicateFormRequest) =>
      checkDuplicateForm(request),
    onSuccess: () => {},
    onError: () => {},
  });
};
