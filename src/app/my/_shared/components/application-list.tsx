'use client';
import React from 'react';

import ApplicationCard from '@/app/my/_shared/components/application-card/application-card';
import DraggableCardList from '@/shared/components/features/scroll/draggable-card-list';

const ApplicationList = () => {
  const mockItems = Array.from({ length: 12 });

  return (
    <DraggableCardList items={mockItems} CardComponent={ApplicationCard} />
  );
};

export default ApplicationList;
