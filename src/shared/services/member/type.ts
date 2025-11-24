import { BankCode, Member } from '@/shared/types';

export type GetMemberResponse = Member;

export interface PatchMemberRequest {
  nickname: string;
  profileImg?: File;
  introduction?: string;
}

export interface BankAccountResponse {
  agentBankAccountId: string;
  agentAccountNumber: string;
  bankCode: BankCode;
  primaryAccount: boolean;
  accountHolder: string;
}

export type GetBankAccountListResponse = BankAccountResponse[];
