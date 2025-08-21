import { ReactNode } from 'react';

import classNames from 'classnames/bind';
import { Tabs as RadixTabs } from 'radix-ui';

import { CloseIcon, PlusIcon } from '@/assets/icons';

import styles from './tab.module.scss';

interface TabProps {
  tabType?: 'text' | 'icon';
  items: {
    value: string;
    label: string;
    content: ReactNode;
    deletable?: boolean;
    disabled?: boolean;
  }[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  enableAddTab?: boolean;
  onAddTab?: () => void;
  onDeleteTab?: (value: string) => void;
  addTabButtonText?: string;
}

const cn = classNames.bind(styles);

const Tab = ({
  items,
  defaultValue,
  value,
  onValueChange,
  enableAddTab = false,
  onAddTab,
  onDeleteTab,
  addTabButtonText = '추가하기',
}: TabProps) => {
  return (
    <RadixTabs.Root
      className={cn('tab_root')}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
    >
      <RadixTabs.List className={cn('tab_list')}>
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            className={cn('tab_trigger')}
            value={item.value}
            disabled={item.disabled}
          >
            {item.label}

            {/* 삭제 가능한 탭인 경우 삭제 버튼 표시 */}
            {item.deletable && onDeleteTab && (
              <button
                type="button"
                className={cn('tab_delete_button')}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTab(item.value);
                }}
                aria-label={`${item.label} 탭 삭제`}
              >
                <CloseIcon width={16} height={16} />
              </button>
            )}
          </RadixTabs.Trigger>
        ))}

        {/* 탭 추가 버튼 (동적 탭 모드일 때만 표시) */}
        {enableAddTab && onAddTab && (
          <button
            type="button"
            className={cn('tab_add_button')}
            onClick={onAddTab}
            aria-label="새 탭 추가"
          >
            <div className={cn('tab_add_button_content')}>
              <span>{addTabButtonText}</span>
              <PlusIcon width={16} height={16} />
            </div>
          </button>
        )}
      </RadixTabs.List>

      {items.map((item) => (
        <RadixTabs.Content
          key={item.value}
          className={cn('tab_content')}
          value={item.value}
        >
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
};

export default Tab;
