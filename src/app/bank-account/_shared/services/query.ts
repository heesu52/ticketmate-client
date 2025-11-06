import { useQuery } from '@tanstack/react-query';

import { getBankAccountList } from '@/app/bank-account/_shared/services/api';
import queryKey from '@/app/bank-account/_shared/services/query-key';

const useGetBankAccountList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKey.getBankAccountList(),
    queryFn: getBankAccountList,
  });

  return { data, isLoading, isError };
};

export { useGetBankAccountList };
