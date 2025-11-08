'use client';
import React, { useState } from 'react';

import ApplicationCard from '@/app/my/_shared/components/application-card/application-card';
import { useGetAcceptingConcertList } from '@/app/my/application/_shared/services/query';
import { GetAcceptingConcertRequest } from '@/app/my/application/_shared/services/type';
import DraggableCardList from '@/shared/components/features/scroll/draggable-card-list';

const ApplicationList = () => {
  const [request, setRequest] = useState<GetAcceptingConcertRequest>({
    pageNumber: 1,
    pageSize: 10,
  });

  const { data } = useGetAcceptingConcertList(request);

  const acceptingConcertItem = data?.content ?? [];

  return (
    <DraggableCardList
      items={acceptingConcertItem}
      CardComponent={ApplicationCard}
    />
  );
};

export default ApplicationList;
