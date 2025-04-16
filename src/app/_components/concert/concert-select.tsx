import { useEffect, useState } from 'react';

import { FilterListIcon } from '@/assets/icons';
import Select from '@/shared/components/select/select';

interface SelectList {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ConcertSelectProps {
  selectList: SelectList[];
}

const ConcertSelect = ({ selectList }: ConcertSelectProps) => {
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    console.log('selected', selected);
  }, [selected]);

  return (
    <Select onSelect={setSelected} defaultValue="popularity">
      <Select.Trigger
        label="Select Label"
        listMinWidth="140px"
        icon={<FilterListIcon width={20} height={20} />}
      />
      {selectList.map((item) => {
        return (
          <Select.Option
            value={item.value}
            key={item.value}
            disabled={item.disabled}
          >
            {item.label}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default ConcertSelect;
