import { useEffect, useState } from 'react';

import { FilterListIcon } from '@/assets/icons';
import Select from '@/shared/components/select/select';

interface ConcertSelectProps {
  onSelect: (value: string) => void;
}

const selectList = [
  {
    value: 'CREATED_DATE',
    label: '최신순',
  },
  {
    value: 'TICKET_OPEN_DATE',
    label: '오픈일순',
  },
];
const ConcertSelect = ({ onSelect }: ConcertSelectProps) => {
  const [selected, setSelected] = useState<string>('CREATED_DATE');

  useEffect(() => {
    onSelect(selected);
  }, [selected]);

  return (
    <Select onSelect={setSelected} defaultValue={selected}>
      <Select.Trigger
        label="공연 정렬"
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

export default ConcertSelect;
