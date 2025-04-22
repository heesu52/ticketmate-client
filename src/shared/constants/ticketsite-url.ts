// src/constants/ticketSite.ts
import type { TicketReservationSite } from '@/shared/types';

export const TICKET_SITE_URL_MAP: Record<TicketReservationSite, string> = {
  INTERPARK_TICKET: '',
  YES24_TICKET: 'https://ticket.yes24.com',
  TICKET_LINK: 'https://www.ticketlink.co.kr',
  MELON_TICKET: 'https://ticket.melon.com',
  COUPANG_PLAY: 'https://www.coupangplay.com',
  ETC: '#', // 기타는 임시 처리
};

export const TICKET_SITE_LABEL_MAP: Record<TicketReservationSite, string> = {
  INTERPARK_TICKET: '인터파크',
  YES24_TICKET: 'YES24',
  TICKET_LINK: '티켓링크',
  MELON_TICKET: '멜론티켓',
  COUPANG_PLAY: '쿠팡플레이',
  ETC: '기타', // 기타는 임시 처리
};
