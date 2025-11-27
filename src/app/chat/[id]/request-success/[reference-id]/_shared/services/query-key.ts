import { GetFulfillmentFormRequest } from './type';

const queryKey = {
  fulfillmentForm: (request?: GetFulfillmentFormRequest) =>
    request ? ['fulfillmentForm', request] : ['fulfillmentForm'],
};

export default queryKey;
