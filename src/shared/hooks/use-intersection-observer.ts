import { useRef, useCallback } from 'react';

interface UseIntersectionObserverProps {
  /** 교차 발생 시, 실행할 콜백 함수 */
  onIntersect: () => void;
  /** 옵저버 활성화 여부 */
  enabled?: boolean;
}

export const useIntersectionObserver = ({
  onIntersect,
  enabled = true,
}: UseIntersectionObserverProps) => {
  // IntersectionObserver 인스턴스 저장할 ref
  const observer = useRef<IntersectionObserver | null>(null);

  // 마지막 요소에 대한 ref를 생성하는 콜백 함수
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      // enabled가 false면 옵저버를 설정하지 않음
      if (!enabled) return;

      // 기존 옵저버가 있다면 연결 해제
      if (observer.current) observer.current.disconnect();

      // 새로운 IntersectionObserver 생성
      observer.current = new IntersectionObserver((entries) => {
        // 교차 발생 시, onIntersect 콜백 호출
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      });

      // 노드가 있다면 옵저버 연결
      if (node) observer.current.observe(node);
    },
    [enabled, onIntersect],
  );

  return { lastElementRef };
};
