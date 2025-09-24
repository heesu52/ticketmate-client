'use client';

import classNames from 'classnames/bind';
import { Toggle as RadixToggle } from 'radix-ui';

import styles from './toggle.module.scss';

interface ToggleProps {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  disabled?: boolean;
  label?: string;
}

const cn = classNames.bind(styles);

/**
 * @description 토글 스위치 컴포넌트
 * @param pressed 토글 상태
 * @param onPressedChange 상태 변경 핸들러
 * @param disabled 비활성화 여부
 * @param label 라벨
 * @example
 * ```tsx
 * const [isEnabled, setIsEnabled] = useState(false);
 *
 * <Toggle
 *   pressed={isEnabled}
 *   onPressedChange={setIsEnabled}
 *   label="토글 라벨"
 * />
 * ```
 */
const Toggle = ({
  pressed,
  onPressedChange,
  disabled = false,
  label = 'Toggle switch',
}: ToggleProps) => {
  return (
    <RadixToggle.Root
      className={cn('toggle_root')}
      pressed={pressed}
      onPressedChange={onPressedChange}
      disabled={disabled}
      aria-label={label}
    >
      <div className={cn('toggle_thumb')} />
    </RadixToggle.Root>
  );
};

export default Toggle;
