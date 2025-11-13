import { useMutation } from '@tanstack/react-query';

import {
  createBankAccount,
  patchBankAccount,
  putBankAccount,
  deleteBankAccount,
} from '@/app/bank-account/_shared/services/api';
import {
  CreateBankAccountRequest,
  PutBankAccountRequest,
} from '@/app/bank-account/_shared/services/type';

export const useCreateBankAccount = () => {
  return useMutation({
    mutationFn: (request: CreateBankAccountRequest) =>
      createBankAccount(request),
  });
};

export const usePatchBankAccount = () => {
  return useMutation({
    mutationFn: (agentBankAccountId: string) =>
      patchBankAccount(agentBankAccountId),
  });
};

export const usePutBankAccount = () => {
  return useMutation({
    mutationFn: (request: PutBankAccountRequest) => putBankAccount(request),
  });
};

export const useDelteBankAccount = () => {
  return useMutation({
    mutationFn: (agentBankAccountId: string) =>
      deleteBankAccount(agentBankAccountId),
  });
};
