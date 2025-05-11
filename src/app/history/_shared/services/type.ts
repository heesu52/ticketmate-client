import { Form } from '@/shared/types';

interface GetFormListRequest {
  applicationFormId: string; // 신청서ID [필수]
}

type GetFormListResponse = Form;

export type { GetFormListRequest, GetFormListResponse };
