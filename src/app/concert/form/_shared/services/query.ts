import { useMutation } from '@tanstack/react-query';

import { createConcertForm } from './api';
import { CreateConcertFormRequest } from './type';

export const useCreateConcertForm = () => {
  const { mutate, isError, data } = useMutation({
    mutationFn: (request: CreateConcertFormRequest) =>
      createConcertForm(request),
  });

  return { mutate, isError, data };
};
