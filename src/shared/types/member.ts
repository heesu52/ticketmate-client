type WithdrawalReasonType =
  | 'NO_CONCERTS'
  | 'RUDE_USER'
  | 'UNFAIR_RESTRICTION'
  | 'WANT_NEW_ACCOUNT'
  | 'DELETE_PERSONAL_DATA'
  | 'OTHER';

interface Member {
  memberId: string;
  username: string;
  nickname: string;
  name: string;
  birthDay: string;
  birthYear: string;
  phone: string;
  profileUrl: string;
  gender: string;
  memberType: string;
  introduction: string;
  followingCount: string;
  followerCount: string;
}

interface WithdrawalRequest {
  applicationFormRejectedType: WithdrawalReasonType; // 탈퇴 사유 [필수]
  otherMemo: string;
}

export type { Member, WithdrawalReasonType, WithdrawalRequest };
