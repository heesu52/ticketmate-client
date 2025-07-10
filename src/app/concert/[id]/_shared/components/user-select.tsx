import { useEffect, useState } from 'react';

import { FilterListIcon } from '@/assets/icons';
import Select from '@/shared/components/select/select';

interface UserSelectProps {
  onSelect: (value: string) => void;
}

const selectList = [
  //임의로 value 값 지정
  { value: 'AI_RECOMMEND', label: 'AI 추천 순' },
  { value: 'RATING_DESC', label: '별점 순' },
  { value: 'REVIEW_COUNT_DESC', label: '후기 많은 순' },
  { value: 'FOLLOWER_DESC', label: '팔로워 순' },
  { value: 'SUCCESS_30DAYS_DESC', label: '최근 30일 성공 순' },
];
const UserSelect = ({ onSelect }: UserSelectProps) => {
  const [selected, setSelected] = useState<string>('AI_RECOMMEND');

  useEffect(() => {
    onSelect(selected);
  }, [selected]);

  return (
    <Select onSelect={setSelected} defaultValue={selected}>
      <Select.Trigger
        label="대리인 정렬"
        icon={<FilterListIcon width={20} height={20} />}
      />
      <Select.OptionList listMinWidth="140px">
        {selectList.map((item) => {
          return (
            <Select.Option value={item.value} key={item.value}>
              {item.label}
            </Select.Option>
          );
        })}
      </Select.OptionList>
    </Select>
  );
};

export default UserSelect;
