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

  //상세공연 정보 조회 시 선예매, 일반예매에 대한 응답값
  preOpenDate: string; // 선예매 시작일
  preOpenIsBankTransfer: boolean; // 선예매 계좌이체 가능 여부
  preOpenRequestMaxCount: number; // 선예매 최대 예매 매수
  generalOpenDate: string; // 일반 예매 시작일
  generalOpenIsBankTransfer: boolean; // 일반 예매 계좌이체 가능 여부
  generalOpenRequestMaxCount: number; // 일반예매 최대 예매 매수

  startDate: string; // 공연 시작일
  endDate: string; // 공연 종료일
  concertThumbnailUrl: string; // 공연 썸네일 URL
  seatingChartUrl: string; // 좌석 배치도 URL
}

interface Form {
  applicationFormId: string;
  clientId: string;
  agentId: string;
  concertId: string;
  requestCount: number;
  hopeAreaResponseList: [
    {
      priority: number;
      location: string;
      price: string;
    },
  ];
  requestDetails: string;
  applicationFormStatus: string;
}

export type { ConcertType, TicketReservationSite, Concert, Form };
