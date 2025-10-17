import { GetConcertDetailRequest } from './type';

const queryKey = {
  getConcertDetail: (request: GetConcertDetailRequest) => [
    'getConcertDetail',
    request,
  ],
};

export default queryKey;
