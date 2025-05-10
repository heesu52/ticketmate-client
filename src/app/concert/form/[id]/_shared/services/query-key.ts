import { CreateConcertFormRequest } from '@/app/concert/form/[id]/_shared/services/type';

const queryKey = {
  createConcertForm: (request: CreateConcertFormRequest) => [
    'createConcertForm',
    request,
  ],
};

export default queryKey;
