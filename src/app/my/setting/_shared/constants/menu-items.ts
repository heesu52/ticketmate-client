import { ReactNode } from 'react';

type MenuItem = {
  type: 'link' | 'text';
  title: string;
  href: string;
  trailing?: ReactNode;
};

const SETTING_URL_PREFIX = '/my/setting';

export const SETTING_ITEMS: MenuItem[] = [
  {
    type: 'link',
    title: '알림 설정',
    href: `${SETTING_URL_PREFIX}/notification`,
  },
  {
    type: 'link',
    title: '계정 설정',
    href: `${SETTING_URL_PREFIX}/account`,
  },
  {
    type: 'link',
    title: '제재 내역',
    href: `${SETTING_URL_PREFIX}/restriction`,
  },
  {
    type: 'link',
    title: '언어 설정',
    href: `${SETTING_URL_PREFIX}/language`,
    trailing: '한국어',
  },
  {
    type: 'link',
    title: '대리인 전환',
    href: `${SETTING_URL_PREFIX}/agent`,
  },
];

const SERVICE_INFO_URL_PREFIX = '/support';

export const SERVICE_INFO_ITEMS: MenuItem[] = [
  {
    type: 'link',
    title: '이용약관',
    href: `${SERVICE_INFO_URL_PREFIX}/terms-of-use`,
  },
  {
    type: 'link',
    title: '공지사항',
    href: `${SERVICE_INFO_URL_PREFIX}/notice`,
  },
  {
    type: 'link',
    title: '개인정보처리방침',
    href: `${SERVICE_INFO_URL_PREFIX}/privacy-policy`,
  },
  {
    type: 'link',
    title: '운영정책',
    href: `${SERVICE_INFO_URL_PREFIX}/operating-policy`,
  },
  {
    type: 'text',
    title: '버전 정보',
    href: '',
    trailing: 'v1.0.0',
  },
];
