import { WithdrawalReasonType } from '@/shared/types';

interface WithdrawRequest {
  withdrawalReasonType: WithdrawalReasonType; // 탈퇴 사유 [필수]
  otherReason?: string;
}
export type { WithdrawRequest };
