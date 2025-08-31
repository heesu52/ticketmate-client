import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 스타일 종류
   * - `fill`: 배경이 채워진 버튼
   * - `outline`: 테두리만 있는 버튼
   * @default 'fill'
   */
  variant?: 'fill' | 'outline';

  /**
   * 버튼 색상 타입
   * - `default`: 기본 색상
   * - `gray`: 회색 계열 색상
   * @default 'default'
   */
  color?: 'default' | 'gray';

  /**
   * 버튼 안에 표시할 콘텐츠 (텍스트, 아이콘 등)
   */
  children: ReactNode;
}

/**
 * 재사용 가능한 버튼 컴포넌트
 *
 * ### 사용 예시
 * ```tsx
 * <Button variant="fill" color="default">확인</Button>
 * <Button variant="fill" color="gray">취소</Button>
 * <Button variant="outline">더보기</Button>
 * ```
 *
 * @param props - HTML button 속성 및 커스텀 props
 * @returns 버튼 요소
 */
const Button = ({
  variant = 'fill',
  color = 'default',
  children,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={styles.button}
      data-variant={variant}
      data-color={color}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
