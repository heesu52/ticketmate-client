import React from 'react';

import {
  KakaoBankLogoIcon,
  SinhanLogoIcon,
  KBankLogoIcon,
  KbLogoIcon,
  WooriLogoIcon,
  HanaLogoIcon,
  NongHyubLogoIcon,
  CitiLogoIcon,
  IBKLogoIcon,
  TossLogoIcon,
  SCLogoIcon,
  NoRegisterIcon,
} from '@/assets/icons';

export const bankInfoMap: Record<
  string,
  { name: string; icon: React.ElementType }
> = {
  KYONGNAM_BANK: { name: '경남', icon: NoRegisterIcon },
  GWANGJU_BANK: { name: '광주', icon: NoRegisterIcon },
  LOCALNONGHYEOP: { name: '지역축농협', icon: NongHyubLogoIcon },
  BUSAN_BANK: { name: '부산', icon: NoRegisterIcon },
  SAEMAUL: { name: '새마을', icon: NoRegisterIcon },
  SANLIM: { name: '산림', icon: NoRegisterIcon },
  SHINHAN: { name: '신한', icon: SinhanLogoIcon },
  SHINHYEOP: { name: '신협', icon: NoRegisterIcon },
  CITI: { name: '씨티', icon: CitiLogoIcon },
  WOORI: { name: '우리', icon: WooriLogoIcon },
  POST: { name: '우체국', icon: NoRegisterIcon },
  SAVING_BANK: { name: '저축', icon: NoRegisterIcon },
  JEONBUK_BANK: { name: '전북', icon: NoRegisterIcon },
  JEJU_BANK: { name: '제주', icon: NoRegisterIcon },
  KAKAO_BANK: { name: '카카오', icon: KakaoBankLogoIcon },
  K_BANK: { name: '케이', icon: KBankLogoIcon },
  TOSS_BANK: { name: '토스', icon: TossLogoIcon },
  HANA: { name: '하나', icon: HanaLogoIcon },
  HSBC: { name: '홍콩상하이', icon: NoRegisterIcon },
  IBK: { name: '기업', icon: IBKLogoIcon },
  KOOKMIN: { name: '국민', icon: KbLogoIcon },
  DAEGU_BANK: { name: '대구', icon: NoRegisterIcon },
  KDB_BANK: { name: '산업', icon: NoRegisterIcon },
  NONGHYEOP: { name: '농협', icon: NongHyubLogoIcon },
  SC: { name: 'SC제일', icon: SCLogoIcon },
  SUHYEOP: { name: '수협', icon: NoRegisterIcon },
};

//은행 아이콘 반환

export const getBankIconByCode = (bankCode: string): React.ElementType => {
  return bankInfoMap[bankCode]?.icon || NoRegisterIcon;
};

//은행 이름 반환

export const getBankNameByCode = (bankCode: string): string => {
  return bankInfoMap[bankCode]?.name || '미등록 은행';
};
