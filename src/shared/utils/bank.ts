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

export const bankImageMap: Record<string, React.ElementType> = {
  카카오뱅크: KakaoBankLogoIcon,
  신한: SinhanLogoIcon,
  케이뱅크: KBankLogoIcon,
  국민: KbLogoIcon,
  우리: WooriLogoIcon,
  하나: HanaLogoIcon,
  농협: NongHyubLogoIcon,
  기업: IBKLogoIcon,
  토스: TossLogoIcon,
  한국씨티: CitiLogoIcon,
  SC제일: SCLogoIcon,
};

export const getBankIconByName = (
  bankName: string,
): React.ElementType | string => {
  return bankImageMap[bankName] || NoRegisterIcon;
};
