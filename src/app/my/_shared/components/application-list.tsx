'use client';
import React, { useCallback } from 'react';

import ApplicationCard from '@/app/my/_shared/components/application-card/application-card';
import { useCreateAgentAvailabilityMutation } from '@/app/my/application/_shared/services/mutation';
import { useGetAcceptingConcertList } from '@/app/my/application/_shared/services/query';
import {
  AcceptingConcert,
  CreateAgentAvailabilityRequest,
} from '@/app/my/application/_shared/services/type';
import DraggableCardList from '@/shared/components/features/draggable-card-list/draggable-card-list';

const ApplicationList = () => {
  const { data, refetch } = useGetAcceptingConcertList();
  const { mutate: createAvailability } = useCreateAgentAvailabilityMutation();

  const handleToggle = useCallback(
    (concertId: string, accepting: boolean) => {
      const payload: CreateAgentAvailabilityRequest = {
        concertId,
        accepting,
      };

      createAvailability(payload, {
        onSuccess: () => refetch(),
        onError: (error) => {},
      });
    },
    [createAvailability, refetch],
  );

  const CardWithToggle = useCallback(
    (props: { item: AcceptingConcert }) => (
      <ApplicationCard {...props} onToggle={handleToggle} />
    ),
    [handleToggle],
  );

  return (
    <DraggableCardList items={data ?? []} CardComponent={CardWithToggle} />
  );
};

export default ApplicationList;
