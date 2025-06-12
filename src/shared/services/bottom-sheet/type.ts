import { TicketOpenType } from '@/shared/types/concert';

interface CheckDuplicateFormRequest {
  agentId: string; // 대리인 PK (UUID)
  concertId: string; // 공연 PK (UUID)
  ticketOpenType: TicketOpenType; // 예매 타입 (필수)
}
export type { CheckDuplicateFormRequest };
