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
} from '@/assets/icons';

export const bankImageMap: Record<string, React.ElementType> = {
  카카오뱅크: KakaoBankLogoIcon,
  신한은행: SinhanLogoIcon,
  케이뱅크: KBankLogoIcon,
  국민은행: KbLogoIcon,
  우리은행: WooriLogoIcon,
  하나은행: HanaLogoIcon,
  농협은행: NongHyubLogoIcon,
  기업은행: IBKLogoIcon,
  토스뱅크: TossLogoIcon,
  한국씨티: CitiLogoIcon,
};

const DEFAULT_BANK_ICON = '/banks/default-bank.png';

export const getBankIconByName = (
  bankName: string,
): React.ElementType | string => {
  return bankImageMap[bankName] || DEFAULT_BANK_ICON;
};
