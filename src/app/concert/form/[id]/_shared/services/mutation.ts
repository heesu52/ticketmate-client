import { useMutation } from '@tanstack/react-query';

import { createConcertForm } from './api';
import { CreateConcertFormRequest } from './type';

export const useCreateConcertForm = () => {
  return useMutation({
    mutationFn: (request: CreateConcertFormRequest) =>
      createConcertForm(request),
    onSuccess: () => {},
    onError: () => {},
  });
};
