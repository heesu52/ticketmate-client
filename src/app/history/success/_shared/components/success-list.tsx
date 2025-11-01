'use client';
import React from 'react';

import SuccessCard from '@/app/history/success/_shared/components/success-card/success-card';
import DraggableCardList from '@/shared/components/features/scroll/draggable-card-list';

const SuccessList = () => {
  const mockItems = Array.from({ length: 12 });

  return <DraggableCardList items={mockItems} CardComponent={SuccessCard} />;
};

export default SuccessList;
