import { GetSearchRequest } from './type';

const queryKey = {
  GetSearchRequest: (request?: GetSearchRequest) => [
    'GetSearchRequest',
    request,
  ],
};

export default queryKey;
