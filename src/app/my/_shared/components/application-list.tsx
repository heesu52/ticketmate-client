'use client';
import React from 'react';

import ApplicationCard from '@/app/my/_shared/components/application-card/application-card';
import DraggableCardList from '@/shared/components/features/scroll/draggable-card-list';

const ApplicationList = () => {
  //실제 데이터도 10개가 Max
  const mockItems = Array.from({ length: 10 });

  return (
    <DraggableCardList items={mockItems} CardComponent={ApplicationCard} />
  );
};

export default ApplicationList;
