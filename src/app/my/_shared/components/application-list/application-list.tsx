'use client';
import React, { useRef, useState } from 'react';

import ApplicationCard from '@/app/my/_shared/components/application-list/application-card/application-card';

import styles from './application-list.module.scss';

const ApplicationList = () => {
  // 가로 스크롤 영역 참조
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 드래그 시작 시점
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  // 드래그 종료 시점
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  // 드래그 중일 때 스크롤 이동
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.2; // 드래그 속도 조절
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
      {/* 드래그 확인을 위해 임의로 작성 */}
      {Array.from({ length: 12 }).map((_, i) => (
        <ApplicationCard key={i} />
      ))}
    </div>
  );
};

export default ApplicationList;
