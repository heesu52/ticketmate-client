import { Pagination } from '@/shared/types';

type StatusType = 'NOT_REVIEWED' | 'REVIEWED';

interface HistoryItem {
  fulfillmentId: string;
  concertName: string;
  concertThumbnailUrl: string;
  concertType: string;
  createDate: string;
  successHistoryStatus: StatusType;
  reviewId: string;
  reviewRating: number;
  clientNickname: string;
}

type GetRecentSuccessResponse = Pagination<HistoryItem>;

export type { HistoryItem, GetRecentSuccessResponse };
