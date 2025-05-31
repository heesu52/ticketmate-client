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

interface ConcertDateInfo {
  performanceDate: string; // 공연 일자
  session: number; // 세션 번호
}

type TicketOpenType = 'PRE_OPEN' | 'GENERAL_OPEN';

interface TicketOpenDateInfo {
  openDate: string; // 오픈 날짜
  requestMaxCount: number; // 최대 예매 매수
  isBankTransfer: boolean; // 계좌이체 가능 여부
  ticketOpenType: TicketOpenType; // 오픈 타입
}

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

  //상세공연 정보 조회 시 선예매, 일반예매에 대한 응답값
  ticketOpenDateInfoResponses: TicketOpenDateInfo[]; // 예매 관련 정보
  concertDateInfoResponseList: ConcertDateInfo[]; // 공연 날짜 정보

  startDate: string; // 공연 시작일
  endDate: string; // 공연 종료일
  concertThumbnailUrl: string; // 공연 썸네일 URL
  seatingChartUrl: string; // 좌석 배치도 URL
}

export type { ConcertType, TicketReservationSite, Concert };
