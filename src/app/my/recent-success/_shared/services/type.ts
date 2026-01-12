import { Pagination } from '@/shared/types';

type StatusType = 'NOT_REVIEWED ' | 'REVIEWED ';

interface HistoryItem {
  fulfillmentId: string;
  concertName: string;
  concertThumbnailUrl: string;
  concertType: string; // 필요하면 유니온 확장 가능
  createDate: string; // ISO DateTime
  successHistoryStatus: StatusType; // enum화 추천
  reviewId: string;
  reviewRating: number;
  clientNickname: string;
}

type GetRecentSuccessResponse = Pagination<HistoryItem>;

export type { HistoryItem, GetRecentSuccessResponse };
