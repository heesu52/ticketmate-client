'use client';
import React from 'react';

import ApplicationCard from '@/app/my/_shared/components/application-card/application-card';
import { useCreateAgentAvailabilityMutation } from '@/app/my/application/_shared/services/mutation';
import { useGetAcceptingConcertList } from '@/app/my/application/_shared/services/query';
import { CreateAgentAvailabilityRequest } from '@/app/my/application/_shared/services/type';
import DraggableCardList from '@/shared/components/features/scroll/draggable-card-list';

const ApplicationList = () => {
  const { data, refetch } = useGetAcceptingConcertList();
  const { mutate: createAvailability } = useCreateAgentAvailabilityMutation();

  const acceptingConcertItem = data?.content ?? [];

  const handleToggle = (concertId: string, accepting: boolean) => {
    const payload: CreateAgentAvailabilityRequest = {
      concertId,
      accepting,
    };

    createAvailability(payload, {
      onSuccess: () => refetch(),
      onError: (error) => {},
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
