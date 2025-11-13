'use client';
import React, { useRef, useState, ComponentType } from 'react';

import styles from './draggable-card-list.module.scss';

interface DraggableCardListProps<T> {
  items?: T[];
  CardComponent: ComponentType<{ item: T }>;
  dragSpeed?: number;
}

const DraggableCardList = <T,>({
  items = [],
  CardComponent,
  dragSpeed = 1.5,
}: DraggableCardListProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  // 드래그 종료
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  // 드래그 중
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * dragSpeed;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {items.map((item, index) => (
        <CardComponent key={index} item={item} />
      ))}
    </div>
  );
};

export default DraggableCardList;
