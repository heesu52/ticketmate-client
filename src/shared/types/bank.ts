// 은행코드
export enum BankCode {
  KYONGNAM_BANK = 'KYONGNAM_BANK',
  GWANGJU_BANK = 'GWANGJU_BANK',
  LOCALNONGHYEOP = 'LOCALNONGHYEOP',
  BUSAN_BANK = 'BUSAN_BANK',
  SAEMAUL = 'SAEMAUL',
  SANLIM = 'SANLIM',
  SHINHAN = 'SHINHAN',
  SHINHYEOP = 'SHINHYEOP',
  CITI = 'CITI',
  WOORI = 'WOORI',
  POST = 'POST',
  SAVING_BANK = 'SAVING_BANK',
  JEONBUK_BANK = 'JEONBUK_BANK',
  JEJU_BANK = 'JEJU_BANK',
  KAKAO_BANK = 'KAKAO_BANK',
  K_BANK = 'K_BANK',
  TOSS_BANK = 'TOSS_BANK',
  HANA = 'HANA',
  HSBC = 'HSBC',
  IBK = 'IBK',
  KOOKMIN = 'KOOKMIN',
  DAEGU_BANK = 'DAEGU_BANK',
  KDB_BANK = 'KDB_BANK',
  NONGHYEOP = 'NONGHYEOP',
  SC = 'SC',
  SUHYEOP = 'SUHYEOP',
}

export interface BankAccountInfo {
  agentBankAccountId: string;
  agentAccountNumber: string;
  bankCode: BankCode;
  primaryAccount: boolean;
  accountHolder: string;
}
