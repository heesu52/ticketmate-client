// src/constants/ticketSite.ts
import type {
  TicketReservationSite,
  ApplicationFormStatus,
  TicketOpenType,
  ApplicationRejectedType,
} from '@/shared/types';

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

export const APPLICATION_STATUS_LABEL_MAP: Record<
  ApplicationFormStatus,
  string
> = {
  PENDING: '수락 대기 중',
  REJECTED: '거절됨',
  CANCELED: '취소됨',
  ACCEPTED: '수락완료',
  CANCELED_IN_PROCESS: '진행취소',
};

export const TICKET_OPEN_TYPE_LABEL_MAP: Record<TicketOpenType, string> = {
  PRE_OPEN: '선예매',
  GENERAL_OPEN: '일반예매',
};

export const APPLICATION_REJECTED_LABEL_MAP: Record<
  ApplicationRejectedType,
  string
> = {
  FEE_NOT_MATCHING_MARKET_PRICE: '수고비가 시세에 맞지 않음',
  RESERVATION_CLOSED: '예약 마감',
  SCHEDULE_UNAVAILABLE: '티켓팅 일정이 안됨',
  OTHER: '기타',
};
