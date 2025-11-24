import { useQuery } from '@tanstack/react-query';

import { getBankAccountList, getMember } from '@/shared/services/member/api';
import queryKey from '@/shared/services/member/query-key';

export const useGetMember = (enabled: boolean = true) => {
  return useQuery({
    queryKey: queryKey.getMember(),
    queryFn: getMember,
    enabled,
  });
};

/**
 * @description 회원 계좌 목록 조회
 * @returns 회원 계좌 목록 조회 query
 */
export const useGetBankAccountList = () => {
  return useQuery({
    queryKey: queryKey.getBankAccountList(),
    queryFn: getBankAccountList,
  });
};
