/**
 * 주어진 숫자 `n`을 구간 `[min, max]` 안으로 **클램프(clamp)** 합니다.
 * - `n < min` → `min` 반환
 * - `n > max` → `max` 반환
 * - 그 외 → `n` 그대로 반환
 *
 * `min`과 `max`의 순서가 뒤집혀 들어와도 내부에서 자동으로 정렬(하한/상한 계산)하여 안전하게 동작합니다.
 *
 * @param n 숫자
 * @param min 최소값
 * @param max 최대값
 * @returns 제한된 숫자
 *
 * @example
 * clamp(120, 0, 100); // 100
 * clamp(-5, 0, 1);    // 0
 * clamp(0.42, 0, 1);  // 0.42
 *
 * @example
 * // min/max 순서가 뒤집혀도 안전
 * clamp(5, 10, 0); // 5
 *
 * @example
 * // 사용 예: 드래그 변위를 화면 높이로 제한
 * const nextY = clamp(startY + delta, 0, containerHeight);
 */
export const clamp = (n: number, min: number, max: number) => {
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  return Math.max(lo, Math.min(hi, n));
};
