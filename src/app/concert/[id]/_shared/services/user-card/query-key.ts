import { GetUserListRequest } from './type';

const queryKey = {
  getUserList: (request?: GetUserListRequest) => ['getUserList', request],
};

export default queryKey;
