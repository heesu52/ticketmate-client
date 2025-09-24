const SETTING_URL_PREFIX = '/my';

export const SETTING_ITEMS = [
  {
    title: '알림 설정',
    href: `${SETTING_URL_PREFIX}/notification`,
  },
  {
    title: '계정 설정',
    href: `${SETTING_URL_PREFIX}/account`,
  },
  {
    title: '제재 내역',
    href: `${SETTING_URL_PREFIX}/restriction`,
  },
  {
    title: '언어 설정',
    href: `${SETTING_URL_PREFIX}/language`,
  },
  {
    title: '대리인 전환',
    href: `${SETTING_URL_PREFIX}/agent`,
  },
] as const;

const SERVICE_INFO_URL_PREFIX = '/support';

export const SERVICE_INFO_ITEMS = [
  {
    title: '이용약관',
    href: `${SERVICE_INFO_URL_PREFIX}/terms-of-use`,
  },
  {
    title: '공지사항',
    href: `${SERVICE_INFO_URL_PREFIX}/notice`,
  },
  {
    title: '개인정보처리방침',
    href: `${SERVICE_INFO_URL_PREFIX}/privacy-policy`,
  },
  {
    title: '운영정책',
    href: `${SERVICE_INFO_URL_PREFIX}/operating-policy`,
  },
  {
    title: '버전 정보',
    href: `${SERVICE_INFO_URL_PREFIX}/version`,
  },
] as const;

export type SettingItem = (typeof SETTING_ITEMS)[number];
export type ServiceInfoItem = (typeof SERVICE_INFO_ITEMS)[number];
