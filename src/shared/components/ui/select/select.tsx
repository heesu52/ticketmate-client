import { Fragment } from 'react';

import classNames from 'classnames/bind';
import { Select as RadixSelect, Separator } from 'radix-ui';

import { ArrowBottomIcon } from '@/assets/icons';

import styles from './select.module.scss';

import type { Option, SelectVariant } from './select.type';

const cn = classNames.bind(styles);

interface SelectProps {
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: SelectVariant;
}

/**
 * @description 셀렉트 컴포넌트
 * @param options 옵션 리스트
 * @param value 선택된 값
 * @param onValueChange 값 변경 핸들러
 * @param placeholder 빈 값 표시 문구
 * @param className 컴포넌트 추가 클래스명
 * @param variant 디자인 변형 ('form' | 'filter')
 * @example
 * ```tsx
 * const [value, setValue] = useState('CREATED_DATE');
 *
 * // Form 스타일 (폼 입력용, 전체 너비)
 * <Select
 *  options={[{ label: '최신순', value: 'CREATED_DATE' }, { label: '오픈일순', value: 'TICKET_OPEN_DATE' }]}
 *  value={value}
 *  onValueChange={setValue}
 *  variant="form"
 * />
 *
 * // Filter 스타일 (필터링용, 컴팩트)
 * <Select
 *  options={[{ label: '최신순', value: 'CREATED_DATE' }, { label: '오픈일순', value: 'TICKET_OPEN_DATE' }]}
 *  value={value}
 *  onValueChange={setValue}
 *  variant="filter"
 * />
 * ```
 */
const Select = ({
  options,
  value,
  onValueChange,
  placeholder = '선택하세요',
  className,
  variant = 'form',
}: SelectProps) => {
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
      <RadixSelect.Trigger
        className={cn('select_trigger', className)}
        data-variant={variant}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className={cn('select_icon')}>
          {variant === 'form' ? (
            <ArrowBottomIcon width={20} height={20} />
          ) : (
            <ArrowBottomIcon width={12} height={12} />
          )}
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className={cn('select_content')}
          position="popper"
          sideOffset={8}
          align="end"
          avoidCollisions={true}
          data-variant={variant}
        >
          <RadixSelect.Viewport className={cn('select_viewport')}>
            {options.map((option) => (
              <Fragment key={option.value}>
                <RadixSelect.Item
                  value={option.value}
                  className={cn('select_item', {
                    active: option.value === value,
                  })}
                  disabled={option.disabled}
                >
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                </RadixSelect.Item>
                <Separator.Root className={cn('select_separator')} />
              </Fragment>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

export default Select;
