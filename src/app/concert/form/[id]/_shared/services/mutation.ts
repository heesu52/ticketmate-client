import { useMutation } from '@tanstack/react-query';

import { createConcertForm, patchConcertForm } from './api';
import { CreateConcertFormRequest, PatchConcertFormRequest } from './type';

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
