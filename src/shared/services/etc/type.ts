export enum DeviceType {
  WEB = 'WEB',
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  OTHER = 'OTHER',
}

export interface PostFcmTokenRequest {
  fcmToken: string;
  deviceType: DeviceType;
}

export interface PostFcmTokenResponse {
  tokenId: string;
  fcmToken: string;
  memberId: string;
  deviceType: DeviceType;
}
