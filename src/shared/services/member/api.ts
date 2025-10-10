import httpClient from '@/lib/http-client/http-client';
import {
  GetMemberResponse,
  PatchMemberRequest,
} from '@/shared/services/member/type';

const BASE_URL = 'member';

/**
 * @description 회원 정보 조회
 */
export const getMember = async () => {
  const response = await httpClient<GetMemberResponse>({
    method: 'get',
    url: `${BASE_URL}`,
    options: {
      credentials: 'include',
    },
  });

  return response;
};

/**
 * @description 회원 정보 수정
 */
export const patchMember = async (request: PatchMemberRequest) => {
  const formData = new FormData();

  formData.append('nickname', request.nickname);

  if (request.profileImg) {
    formData.append('profileImg', request.profileImg);
  }

  if (request.introduction) {
    formData.append('introduction', request.introduction);
  }

  const data = await httpClient({
    url: `${BASE_URL}`,
    method: 'patch',
    options: {
      body: formData,
    },
  });

  return data;
};
