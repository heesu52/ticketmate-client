import { Member } from '@/shared/types';

export type GetMemberResponse = Member;

export interface PatchMemberRequest {
  nickname: string;
  profileImg?: File;
  introduction?: string;
}
