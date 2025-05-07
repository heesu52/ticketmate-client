import { CreateConcertFormRequest } from '@/app/concert/form/_shared/services/type';

const queryKey = {
  createConcertForm: (request: CreateConcertFormRequest) => [
    'createConcertForm',
    request,
  ],
};

export default queryKey;
