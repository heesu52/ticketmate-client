import React, { Fragment } from 'react';

import classNames from 'classnames/bind';
import { DropdownMenu, Separator } from 'radix-ui';

import { MoreIcon } from '@/assets/icons';
import { DropdownItem } from '@/shared/components/ui/dropdown/dropdown.type';

import styles from './dropdown.module.scss';

const cn = classNames.bind(styles);

interface DropdownProps {
  trigger?: React.ReactNode;
  items: DropdownItem[];
}

/**
 * @description 드롭다운 컴포넌트
 * @param trigger 트리거 컴포넌트
 * @param items 아이템 리스트
 * @example
 * ```tsx
 * <Dropdown
 *  items={[
 *    { label: '테스트1', onClick: () => console.log('테스트1') },
 *    { label: '테스트2', onClick: () => console.log('테스트2') },
 *  ]}
 * />
 * ```
 * @returns
 */
const Dropdown = ({ trigger, items }: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {trigger || <MoreIcon width={20} height={20} fill="var(--black)" />}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn('dropdown_content')}
          collisionPadding={20}
        >
          {items.map((item) => (
            <Fragment key={item.label}>
              <DropdownMenu.Item
                className={cn('dropdown_item')}
                key={item.label}
                onClick={item.onClick}
                disabled={item.disabled}
              >
                {item.label}
              </DropdownMenu.Item>
              <Separator.Root className={cn('dropdown_separator')} />
            </Fragment>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
