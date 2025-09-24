'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { clamp } from '@/shared/utils/math';

import styles from './bottom-sheet.module.scss';

/**
 * BottomSheet 컴포넌트 props.
 */
interface BottomSheetProps {
  /**
   * 시트 열림 여부
   */
  open: boolean;
  /**
   * 닫기 요청 콜백 (오버레이 클릭/ESC/드래그 스냅 등에서 호출)
   */
  onDismiss: () => void;
  /**
   * 시트 내부에 렌더링할 자식 노드
   */
  children: React.ReactNode;
}

/**
 * 바텀시트 컴포넌트
 * @param props - {@link BottomSheetProps}
 * @returns JSX.Element | null
 *
 * - **Pointer Events** 기반 드래그(마우스/터치 통합)
 * - `requestAnimationFrame`으로 transform/opacity를 프레임 단위로 반영(부드러운 인터랙션)
 * - `ResizeObserver` + `window.resize`로 콘텐츠/뷰포트 변화에 따른 동적 높이 측정
 * - ESC / 오버레이 클릭으로 닫기
 * - 드래그 중에는 ref 기반 상태로 DOM만 업데이트하여 re-render 최소화
 *
 * @example
 * ```tsx
 * function Example() {
 *   const [open, setOpen] = useState(false);
 *   return (
 *     <>
 *       <button onClick={() => setOpen(true)}>Open</button>
 *       <BottomSheet
 *         open={open}
 *         onDismiss={() => setOpen(false)}
 *       >
 *         <div style={{ padding: 16 }}>
 *           <h3>Bottom Sheet Content</h3>
 *           <p>여기에 원하는 컨텐츠를 넣으세요.</p>
 *         </div>
 *       </BottomSheet>
 *     </>
 *   );
 * }
 * ```
 *
 * @remarks
 * - 시트 높이는 `contentRef.scrollHeight + TIP_AREA_HEIGHT`와 `window.innerHeight` 중 작은 값으로 결정됩니다.
 * - 시트가 열릴 때는 `translateY = 0`, 닫힐 때는 `translateY = 시트 높이`로 스냅됩니다.
 * - 닫힘 판정은 현재 `translateY >= 시트 높이 * 0.5` 조건(절반 이상 내려가면 닫기)입니다.
 */

const BottomSheet = ({ open, onDismiss, children }: BottomSheetProps) => {
  /** 현재 드래그 중인지 */
  const [isDragging, setIsDragging] = useState(false);

  // DOM refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 레이아웃/드래그 상태 (re-render 없이 유지)
  const rafIdRef = useRef<number | null>(null);
  const sheetHeightRef = useRef(0);
  const translateYRef = useRef(0);
  const startYRef = useRef(0);
  const startTranslateRef = useRef(0);

  /**
   * 현재 ref 상태(`translateYRef`, `sheetHeightRef`)를 기반으로
   * 한 프레임 내에 실제 DOM 스타일(transform/opacity)을 적용한다.
   *
   * @internal rAF 콜백
   */
  const applyFrame = () => {
    const translateY = translateYRef.current;
    const sheetHeight = sheetHeightRef.current || 1;

    // 바텀시트 위치 업데이트
    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${translateY}px)`;
    }

    // 오버레이 투명도 업데이트
    const openProgress = sheetHeight ? 1 - translateY / sheetHeight : 0; // 오버레이 투명도: 열림 진행도(0~1)

    if (overlayRef.current) {
      overlayRef.current.style.opacity = String(
        Math.max(0, Math.min(1, openProgress)),
      );
    }

    rafIdRef.current = null;
  };

  /**
   * 현재 프레임에 DOM 업데이트 예약.
   * 이미 예약되어 있으면 중복 예약하지 않는다.
   *
   * @internal
   */
  const scheduleFrame = () => {
    if (rafIdRef.current == null) {
      rafIdRef.current = requestAnimationFrame(applyFrame);
    }
  };

  /**
   * translateY 값을 즉시(ref) 설정하고, DOM 업데이트 프레임을 예약한다.
   *
   * @param y - 적용할 Y 변위(px)
   * @internal
   */
  const setTranslateImmediate = (y: number) => {
    translateYRef.current = y;
    scheduleFrame();
  };

  /**
   * 컨텐츠 높이와 뷰포트 높이를 바탕으로 시트의 이상적인 높이(px)를 계산하고 적용한다.
   * - `ideal = min(contentHeight + TIP_AREA_HEIGHT, window.innerHeight)`
   * - `open` 상태에 따라 `translateY` 초기값 결정(열림: 0, 닫힘: ideal)
   *
   * @internal
   */
  const measureHeight = () => {
    // 최대높이
    const viewportMax = window.innerHeight;
    // 컨텐츠 높이
    const contentHeight = contentRef.current?.scrollHeight ?? 0;
    // Tip Area 높이
    const TIP_AREA_HEIGHT = 24;

    // (컨텐츠 높이 + Tip Area 높이, 최대 높이) 중 작은 값
    const ideal = Math.min(contentHeight + TIP_AREA_HEIGHT, viewportMax);

    // 시트 높이 설정
    sheetHeightRef.current = ideal;

    const nextY = open ? 0 : ideal;
    setTranslateImmediate(nextY);
  };

  /**
   * 사이드 이펙트
   */

  /**
   * 시트가 열릴 때 높이를 측정하고(viewport/콘텐츠 변화에 대응),
   * ResizeObserver 및 window.resize 리스너를 등록한다.
   * 이펙트 종료 시에는 옵저버와 리스너를 해제한다.
   */
  useLayoutEffect(() => {
    if (!open) return;

    measureHeight();

    const ro = new ResizeObserver(() => measureHeight());
    if (contentRef.current) ro.observe(contentRef.current);

    const onResize = () => measureHeight();
    window.addEventListener('resize', onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /**
   * 시트가 열려 있을 때 body 스크롤을 잠근다.
   * 이펙트 종료 시 기존 overflow 값을 복원한다.
   */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /**
   * 시트가 열려 있을 때 ESC 키로 닫기를 허용한다.
   */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onDismiss]);

  /**
   * `open`이 false로 전환될 때 DOM 상태를 닫힌 위치로 스냅하고,
   * 드래그 상태를 초기화한다.
   */
  useEffect(() => {
    if (!open) {
      translateYRef.current = sheetHeightRef.current;
      scheduleFrame();
      setIsDragging(false);
    }
  }, [open]);

  //  pointer handlers (mouse/touch 통합)

  /**
   * 드래그 시작 핸들러.
   * 시작 지점과 시작 translate 값을 저장하고, 전역 pointer 이벤트를 등록한다.
   *
   * @param e - PointerDown 이벤트
   */
  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return; // 좌클릭만

    startYRef.current = e.clientY;
    startTranslateRef.current = translateYRef.current;

    setIsDragging(true);

    // iOS 터치 스크롤 방지용 캡처
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);

    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp, { passive: false });
    window.addEventListener('pointercancel', onPointerUp, { passive: false });
  };

  /**
   * 드래그 이동 핸들러.
   * 현재 포인터 위치와 시작 위치의 차이로 translateY를 계산한다.
   * 문서 스크롤을 방지하기 위해 기본 동작을 취소한다.
   *
   * @param e - PointerMove 이벤트
   */
  const onPointerMove = (e: PointerEvent) => {
    if (e.cancelable) e.preventDefault(); // 문서 스크롤 방지
    const delta = e.clientY - startYRef.current;
    const next = clamp(
      startTranslateRef.current + delta,
      0,
      sheetHeightRef.current,
    );
    setTranslateImmediate(next);
  };

  /**
   * 드래그 종료 핸들러.
   * 전역 pointer 리스너를 제거하고, 현재 위치를 기준으로 닫힘/열림을 스냅 결정한다.
   * 현재는 절반 이상 내려갔을 때 닫힘으로 간주한다.
   */
  const onPointerUp = () => {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);

    setIsDragging(false);

    const current = Math.max(
      0,
      Math.min(sheetHeightRef.current, translateYRef.current),
    );
    const shouldClose = current >= sheetHeightRef.current * 0.5;
    const snap = shouldClose ? sheetHeightRef.current : 0;

    setTranslateImmediate(snap);
    if (shouldClose) onDismiss();
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
        role="dialog"
        aria-modal="true"
      >
        {/* Tip Area + Tip Bar */}
        <div className={styles.tip_area} onPointerDown={onPointerDown}>
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
