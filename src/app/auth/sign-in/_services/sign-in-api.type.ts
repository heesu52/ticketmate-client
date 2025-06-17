interface SignInAPIBody {
  username: string;
  password: string;
}

interface SignInAPIResponse {
  memberType: string;
  memberId: string;
  accessToken: string;
}

export type { SignInAPIBody, SignInAPIResponse };
