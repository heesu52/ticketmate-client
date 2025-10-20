import { useMutation } from '@tanstack/react-query';

import {
  createConcertForm,
  patchConcertForm,
} from '@/app/concert/form/[id]/_shared/services/api';
import {
  CreateConcertFormRequest,
  PatchConcertFormRequest,
} from '@/app/concert/form/[id]/_shared/services/type';

export const useCreateConcertForm = () => {
  return useMutation({
    mutationFn: (request: CreateConcertFormRequest) =>
      createConcertForm(request),
  });
};

export const usePatchConcertForm = () => {
  return useMutation({
    mutationFn: (request: PatchConcertFormRequest) => patchConcertForm(request),
  });
};
