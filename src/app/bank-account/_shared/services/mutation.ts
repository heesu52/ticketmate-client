import { useMutation } from '@tanstack/react-query';

import {
  createBankAccount,
  patchBankAccount,
  putBankAccount,
  deleteBankAccout,
} from '@/app/bank-account/_shared/services/api';
import {
  CreateBankAccountRequest,
  PutBankAccountRequest,
} from '@/app/bank-account/_shared/services/type';

export const useCreateBankAccout = () => {
  return useMutation({
    mutationFn: (request: CreateBankAccountRequest) =>
      createBankAccount(request),
  });
};

export const usePatchBankAccout = () => {
  return useMutation({
    mutationFn: (agentBankAccountId: string) =>
      patchBankAccount(agentBankAccountId),
  });
};

export const usePutBankAccout = () => {
  return useMutation({
    mutationFn: (request: PutBankAccountRequest) => putBankAccount(request),
  });
};

export const useDelteBankAccout = () => {
  return useMutation({
    mutationFn: (agentBankAccountId: string) =>
      deleteBankAccout(agentBankAccountId),
  });
};
