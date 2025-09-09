'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { clamp } from '@/shared/utils/math';

import styles from './bottom-sheet.module.scss';

interface BottomSheetProps {
  open: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({ open, onDismiss, children }: BottomSheetProps) => {
  /** 현재 드래그 중인지 */
  const [isDragging, setIsDragging] = useState(false);
  /** 현재 Y 변위(px), 0이면 열린 상태 */
  const [translateY, setTranslateY] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 드래그 관련 상태(Ref로 관리)
  const dragRef = useRef({
    startY: 0,
    startTranslate: 0,
    lastY: 0,
  });

  // 드래그 중 위치 값(리렌더 없이 DOM 반영)
  const translateYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const sheetHeightRef = useRef(0);
  // 프레임 적용
  const applyFrame = () => {
    // transform 업데이트
    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${translateYRef.current}px)`;
    }
    // 오버레이 투명도: 열림 진행도(0~1)
    const openProgress = sheetHeightRef.current
      ? 1 - translateYRef.current / sheetHeightRef.current
      : 0;

    if (overlayRef.current) {
      overlayRef.current.style.opacity = String(
        Math.max(0, Math.min(1, openProgress)),
      );
    }
    rafIdRef.current = null;
  };

  const scheduleFrame = () => {
    if (rafIdRef.current == null) {
      rafIdRef.current = requestAnimationFrame(applyFrame);
    }
  };

  /** 컨텐츠 높이 기반으로 시트 높이 측정 */
  const measureHeight = () => {
    // 최대높이
    const maxHeight = window.innerHeight;
    // 컨텐츠 높이
    const contentHeight = contentRef.current?.scrollHeight ?? 0;
    // (컨텐츠 높이 + Tip Area 높이, 최대 높이) 중 작은 값
    const ideal = Math.min(contentHeight + 24, maxHeight);

    // 시트 높이 설정
    sheetHeightRef.current = ideal;

    const nextY = open ? 0 : ideal;
    setTranslateY(nextY);
    translateYRef.current = nextY;
    scheduleFrame();
  };

  useLayoutEffect(() => {
    if (!open) return;
    measureHeight();

    const ro = new ResizeObserver(() => measureHeight());
    if (contentRef.current) ro.observe(contentRef.current);

    const onResize = () => measureHeight();
    window.addEventListener('resize', onResize);

    // 배경 스크롤 잠금
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const nextY = open ? 0 : sheetHeightRef.current;
    setTranslateY(nextY);
    translateYRef.current = nextY;
    scheduleFrame();
  }, [open, sheetHeightRef.current]);

  /** 드래그 시작 */
  const handleDragStart = (clientY: number) => {
    setIsDragging(true);

    dragRef.current = {
      startY: clientY,
      startTranslate: translateY,
      lastY: clientY,
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
  };

  /** 드래그 이동 */
  const handleDragMove = (clientY: number) => {
    const { startY, startTranslate } = dragRef.current;
    const delta = clientY - startY;
    translateYRef.current = clamp(
      startTranslate + delta,
      0,
      sheetHeightRef.current,
    );
    dragRef.current.lastY = clientY;
    scheduleFrame();
  };

  /** 드래그 종료 */
  const handleDragEnd = () => {
    setIsDragging(false);

    // 현재 위치를 dragRef 기준으로 재계산 (state 의존 X)
    const { startY, startTranslate, lastY } = dragRef.current;
    const current = clamp(
      startTranslate + (lastY - startY),
      0,
      sheetHeightRef.current,
    );

    // 닫힘 판정: 절반 넘게 내려간 경우
    const shouldClose = current >= sheetHeightRef.current * 0.5;

    const snap = shouldClose ? sheetHeightRef.current : 0;
    translateYRef.current = snap;
    setTranslateY(snap); // 스냅 결과 한 번만 리렌더
    scheduleFrame();

    if (shouldClose) onDismiss();

    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
  };

  // 마우스
  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    handleDragStart(e.clientY);
  };
  const onMouseMove = (e: MouseEvent) => {
    handleDragMove(e.clientY);
  };
  const onMouseUp = () => {
    handleDragEnd();
  };

  // 터치
  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    handleDragStart(e.touches[0].clientY);
  };
  const onTouchMove = (e: TouchEvent) => {
    // 드래그 시 문서 스크롤 방지
    e.preventDefault();
    handleDragMove(e.touches[0].clientY);
  };
  const onTouchEnd = () => {
    handleDragEnd();
  };

  if (!open) return null;

  return (
    <div className={styles.container}>
      {/* 오버레이 - 외부 클릭으로 닫기 */}
      <div ref={overlayRef} className={styles.overlay} onClick={onDismiss} />

      {/* 바텀시트 */}
      <div
        ref={sheetRef}
        className={styles.bottom_sheet_container}
        data-dragging={isDragging}
        style={{
          // transform: `translateY(${translateY}px)`,
          height: sheetHeightRef.current || undefined,
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* Tip Area + Tip Bar */}
        <div
          className={styles.tip_area}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          <div className={styles.tip_bar} />
        </div>

        {/* 스크롤 컨텐츠 */}
        <div ref={contentRef} className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
