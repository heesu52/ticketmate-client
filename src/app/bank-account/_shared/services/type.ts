import { BankCode, BankAccount } from '@/shared/types';

type CreateBankAccountRequest = BankAccount;

interface BankAccountResponse extends BankAccount {
  agentBankAccountId: string; // 계좌 고유 ID
}

type GetBankAccountListResponse = BankAccountResponse[];

interface PutBankAccountRequest {
  agentBankAccountId: string; // params
  bankCode?: BankCode; // 은행 코드
  accountHolder?: string; // 예금주 명
  accountNumber?: string; // 계좌번호
}

export type {
  CreateBankAccountRequest,
  PutBankAccountRequest,
  BankAccountResponse,
  GetBankAccountListResponse,
};
