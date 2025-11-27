import { BankAccountInfo } from '@/shared/types';

type FulfillmentFormRequest = {
  /** 성공양식 이미지 리스트 */
  fulfillmentFormImgList: File[];
  /** 상세설명 */
  particularMemo: string;
  /** 은행 계좌 ID */
  agentBankAccountId: string;
};

/** 성공양식 전송 */
export interface PostFulfillmentFormRequest {
  /** 채팅방 고유 ID */
  chatRoomId: string;
  /** 채팅 메시지 타입 */
  fulfillmentFormRequest: FulfillmentFormRequest;
}

/** 성공양식 수정 */
export interface PatchFulfillmentFormUpdateRequest {
  /** 성공양식 고유 ID */
  fulfillmentFormId: string;
  /** 삭제할 이미지 리스트 */
  deleteImgIdList?: string[];
  /** 성공양식 이미지 리스트 */
  newSuccessImgList?: File[];
  /** 상세설명 */
  particularMemo?: string;
  /** 은행 계좌 ID */
  agentBankAccountId?: string;
}

/** 성공양식 거절 */
export interface PatchFulfillmentFormRejectRequest {
  fulfillmentFormId: string;
  /** 거절 사유 */
  rejectedMemo?: string;
}

export interface PatchFulfillmentFormAcceptRequest {
  /** 성공양식 고유 ID */
  fulfillmentFormId: string;
}

export interface GetFulfillmentFormRequest {
  /** 성공양식 고유 ID */
  fulfillmentFormId: string;
}

export type FulfillmentFormImgResponse = {
  /** 성공양식 이미지 고유 ID */
  fulfillmentFormImgId: string;
  /** 성공양식 이미지 URL */
  fulfillmentFormImgUrl: string;
};

/** 성공양식 조회 */
export interface GetFulfillmentFormResponse {
  /** 성공양식 고유 ID */
  fulfillmentFormId: string;
  /** 성공양식 이미지 리스트 */
  fulfillmentFormImgUrlList: FulfillmentFormImgResponse[];
  /** 상세 메모 */
  particularMemo: string;
  /** 대리인 계좌정보 */
  agentBankAccount: BankAccountInfo;
  /** 생성일 */
  createDate: string;
}
