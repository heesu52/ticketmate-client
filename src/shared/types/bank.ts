export type BankCode =
  | 'KYONGNAM_BANK'
  | 'GWANGJU_BANK'
  | 'LOCALNONGHYEOP'
  | 'BUSAN_BANK'
  | 'SAEMAUL'
  | 'SANLIM'
  | 'SHINHAN'
  | 'SHINHYEOP'
  | 'CITI'
  | 'WOORI'
  | 'POST'
  | 'SAVING_BANK'
  | 'JEONBUK_BANK'
  | 'JEJU_BANK'
  | 'KAKAO_BANK'
  | 'K_BANK'
  | 'TOSS_BANK'
  | 'HANA'
  | 'HSBC'
  | 'IBK'
  | 'KOOKMIN'
  | 'DAEGU_BANK'
  | 'KDB_BANK'
  | 'NONGHYEOP'
  | 'SC'
  | 'SUHYEOP';

export interface BankAccount {
  bankCode: BankCode; // 은행 코드
  accountHolder: string; // 예금주 명
  accountNumber: string; // 계좌번호
  primaryAccount: boolean; // 대표계좌 여부
}
