import { UploadPortfolioRequest } from '@/app/my/setting/agent/_shared/services/type';
import httpClient from '@/lib/http-client/http-client';

const BASE_URL = 'portfolio';

export const uploadPortfolio = async (request: UploadPortfolioRequest) => {
  const formData = new FormData();

  formData.append('portfolioDescription', request.portfolioDescription);
  request.portfolioImgList.forEach((img: File) => {
    formData.append('portfolioImgList', img);
  });

  const data = await httpClient({
    method: 'post',
    url: `${BASE_URL}/upload`,
    options: {
      body: formData,
    },
  });

  return data;
};
