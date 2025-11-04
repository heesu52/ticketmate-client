import { useMutation } from '@tanstack/react-query';

import { createAgentAvailability } from '@/app/my/application/_shared/services/api';
import { CreateAgentAvailabilityRequest } from '@/app/my/application/_shared/services/type';

export const useCreateAgentAvailability = () => {
  return useMutation({
    mutationFn: (request: CreateAgentAvailabilityRequest) =>
      createAgentAvailability(request),
  });
};
