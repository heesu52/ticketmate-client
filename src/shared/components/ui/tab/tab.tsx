import { ReactNode } from 'react';

import classNames from 'classnames/bind';
import { Tabs as RadixTabs } from 'radix-ui';

import { CloseIcon, PlusIcon } from '@/assets/icons';
import { TabItem } from '@/shared/components/ui/tab/tab.type';

import styles from './tab.module.scss';

interface TabProps {
  items: TabItem[];
  value?: string;
  onValueChange?: (value: string) => void;
  onAddTab?: () => void;
  onDeleteTab?: (value: string) => void;
  addTabButtonText?: ReactNode;
}

const cn = classNames.bind(styles);

/**
 * Tab 컴포넌트
 *
 * Radix UI Tabs 기반으로 구현된 탭 UI.
 * - 기본 탭 렌더링
 * - 동적 추가/삭제 기능 지원
 *
 * @component
 * @example
 * ```tsx
 * const [tabs, setTabs] = useState<TabItem[]>([
 *   { value: 'tab1', label: '탭 1', content: <div>내용 1</div> },
 *   { value: 'tab2', label: '탭 2', content: <div>내용 2</div> },
 * ]);
 * const [active, setActive] = useState('tab1');
 *
 * <Tab
 *   items={tabs}
 *   value={active}
 *   onValueChange={setActive}
 *   onAddTab={() => { ... }}
 *   onDeleteTab={(val) => { ... }}
 * />
 * ```
 */
const Tab = ({
  items,
  value,
  onValueChange,
  onAddTab,
  onDeleteTab,
  addTabButtonText = '추가하기',
}: TabProps) => {
  /** 편집 모드 핸들러가 하나라도 있으면 동적 탭 모드로 간주 */
  const isEditable = Boolean(onAddTab || onDeleteTab);

  return (
    <RadixTabs.Root
      className={cn('tab_root')}
      value={value}
      onValueChange={onValueChange}
    >
      <RadixTabs.List className={cn('tab_list')}>
        {items.map((item) => {
          return (
            <RadixTabs.Trigger
              key={item.value}
              className={cn('tab_trigger')}
              value={item.value}
              disabled={item.disabled}
            >
              {item.label}

              {isEditable && onDeleteTab && (
                <span
                  role="button"
                  className={cn('tab_delete_button')}
                  tabIndex={-1}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTab(item.value);
                  }}
                  aria-label={`${item.label} 탭 삭제`}
                >
                  <CloseIcon width={16} height={16} />
                </span>
              )}
            </RadixTabs.Trigger>
          );
        })}

        {/* 탭 추가 버튼 (동적 탭 모드일 때만 표시) */}
        {isEditable && onAddTab && (
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
