import { useMutation } from '@tanstack/react-query';

import { uploadPortfolio } from '@/app/my/setting/agent/_shared/services/api';
import { UploadPortfolioRequest } from '@/app/my/setting/agent/_shared/services/type';

export const useUploadPortfolioMutation = () => {
  return useMutation({
    mutationFn: (request: UploadPortfolioRequest) => uploadPortfolio(request),
  });
};
