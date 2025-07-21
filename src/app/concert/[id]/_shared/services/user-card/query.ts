import { useQuery } from '@tanstack/react-query';

import { getUserList } from './api';
import queryKey from './query-key';
import { GetUserListRequest } from './type';

export const useGetUserList = (request?: GetUserListRequest) => {
  const concertId = request?.concertId;

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey.getUserList(request),
    queryFn: () => getUserList(request),
    enabled: !!concertId,
  });

  return { data, isLoading, isError };
};
