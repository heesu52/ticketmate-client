import {
  CreateBankAccountRequest,
  PutBankAccountRequest,
  GetBankAccountListResponse,
} from '@/app/bank-account/_shared/services/type';
import httpClient from '@/lib/http-client/http-client';

const BASE_URL = 'member/bank-account';

/**
 * @description 계좌목록 조회
 */
const getBankAccountList = async () => {
  const data = await httpClient<GetBankAccountListResponse>({
    method: 'get',
    url: `${BASE_URL}`,
  });
  return data;
};

/**
 * @description 계좌 추가
 */

const createBankAccount = async (request: CreateBankAccountRequest) => {
  const data = await httpClient({
    method: 'post',
    url: `${BASE_URL}`,
    options: {
      json: request,
    },
  });

  return data;
};

/**
 * @description 대표계좌 수정
 */
const patchBankAccount = async (agentBankAccountId: string) => {
  return await httpClient({
    method: 'patch',
    url: `${BASE_URL}/${agentBankAccountId}`,
  });
};

/**
 * @description 대표계좌 변경
 */
const putBankAccount = async (request: PutBankAccountRequest) => {
  const { agentBankAccountId } = request;

  return await httpClient({
    method: 'put',
    url: `${BASE_URL}/${agentBankAccountId}`,
    options: {
      json: request,
    },
  });
};

/**
 * @description 대표계좌 삭제
 */
const deleteBankAccout = async (agentBankAccountId: string) => {
  return await httpClient({
    method: 'delete',
    url: `${BASE_URL}/${agentBankAccountId}`,
  });
};

export {
  getBankAccountList,
  createBankAccount,
  putBankAccount,
  patchBankAccount,
  deleteBankAccout,
};
