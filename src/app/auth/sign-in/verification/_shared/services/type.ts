export interface PostVerifyVerificationCodeRequest {
  phoneNumber: string;
  code: string;
}

export interface PostVerificationCodeRequest {
  phoneNumber: string;
}
