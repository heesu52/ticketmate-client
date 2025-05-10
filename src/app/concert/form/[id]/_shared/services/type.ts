interface CreateConcertFormRequest {
  agentId: string; // 대리인 PK
  concertId: string; // 콘서트 PK
  performanceDate: string; // 공연 일자
  requestCount: number; // 요청한 티켓 수
  hopeAreaList?: string[]; // 희망 구역 리스트 (선택)
  requestDetails?: string; // 요청 사항 (선택)
  isPreOpen: boolean; // 선예매 여부
}

export type { CreateConcertFormRequest };
