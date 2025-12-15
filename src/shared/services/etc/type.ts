import { DeviceType } from '@/shared/types/common';

export interface PostFCMTokenRequest {
  fcmToken: string;
  deviceType: DeviceType;
}

export interface PostFCMTokenResponse {
  tokenId: string;
  fcmToken: string;
  memberId: string;
  deviceType: DeviceType;
}
