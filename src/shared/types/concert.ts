type ConcertType =
  | 'CONCERT'
  | 'MUSICAL'
  | 'SPORTS'
  | 'CLASSIC'
  | 'EXHIBITIONS'
  | 'OPERA'
  | 'ETC';

type TicketReservationSite =
  | 'INTERPARK_TICKET'
  | 'YES24_TICKET'
  | 'TICKET_LINK'
  | 'MELON_TICKET'
  | 'COUPANG_PLAY'
  | 'ETC';

interface Concert {
  concertId: string; // 공연 ID
  concertName: string; // 공연 제목
  concertHallName: string; // 공연장 이름
  concertType: string; // 공연 카테고리
  ticketReservationSite: string; // 예매처 사이트
  ticketPreOpenDate: string; // 선예매 시작일
  preOpenBankTransfer: boolean; // 선예매 계좌이체 가능 여부
  ticketGeneralOpenDate: string; // 일반 예매 시작일
  generalOpenBankTransfer: boolean; // 일반 예매 계좌이체 가능 여부
  startDate: string; // 공연 시작일
  endDate: string; // 공연 종료일
  concertThumbnailUrl: string; // 공연 썸네일 URL
  seatingChartUrl: string; // 좌석 배치도 URL
}

export type { ConcertType, TicketReservationSite, Concert };
