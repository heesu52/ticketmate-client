import { BankCode } from '@/shared/types';

interface CreateBankAccountRequest {
  bankCode: string; // 은행 코드
  accountHolder: string; // 예금주 명
  accountNumber: string; // 계좌번호
  primaryAccount: boolean; // 대표계좌 여부
}

interface BankAccountResponse {
  agentBankAccountId: string;
  agentAccountNumber: string;
  bankCode: BankCode;
  primaryAccount: boolean;
  accountHolder: string;
}

type GetBankAccountListResponse = BankAccountResponse[];

interface PutBankAccountRequest {
  agentBankAccountId: string;
  bankCode?: string;
  accountHolder?: string;
  accountNumber?: string;
}

export type {
  CreateBankAccountRequest,
  PutBankAccountRequest,
  BankAccountResponse,
  GetBankAccountListResponse,
};
