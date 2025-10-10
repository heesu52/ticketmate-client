export interface GetMemberResponse {
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
  followingCount: string;
  followerCount: string;
}

export interface PatchMemberRequest {
  nickname: string;
  profileImg?: File;
  introduction?: string;
}
