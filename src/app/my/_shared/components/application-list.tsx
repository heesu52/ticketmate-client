'use client';
import React, { useState } from 'react';

import ApplicationCard from '@/app/my/_shared/components/application-card/application-card';
import { useCreateAgentAvailabilityMutation } from '@/app/my/application/_shared/services/mutation';
import { useGetAcceptingConcertList } from '@/app/my/application/_shared/services/query';
import {
  CreateAgentAvailabilityRequest,
  GetAcceptingConcertRequest,
} from '@/app/my/application/_shared/services/type';
import DraggableCardList from '@/shared/components/features/scroll/draggable-card-list';
import { toastify } from '@/shared/components/ui/toast/toastify';

const ApplicationList = () => {
  const [request, setRequest] = useState<GetAcceptingConcertRequest>({
    pageNumber: 1,
    pageSize: 10,
  });

  const { data, refetch } = useGetAcceptingConcertList(request);
  const { mutate: createAvailability } = useCreateAgentAvailabilityMutation();

  const acceptingConcertItem = data?.content ?? [];

  const handleToggle = (concertId: string, accepting: boolean) => {
    const payload: CreateAgentAvailabilityRequest = {
      concertId,
      accepting,
    };

    createAvailability(payload, {
      onSuccess: () => refetch(),
      onError: (error) => {
        toastify({
          variant: 'success',
          description: '한 줄 소개 작성이 완료됐습니다',
        });
      },
    });
  };

  return (
    <DraggableCardList
      items={acceptingConcertItem}
      CardComponent={(props) => (
        <ApplicationCard {...props} onToggle={handleToggle} />
      )}
    />
  );
};

export default ApplicationList;
