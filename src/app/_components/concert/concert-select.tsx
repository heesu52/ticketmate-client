import { useEffect, useState } from 'react';

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
    <Select onSelect={setSelected}>
      <Select.Trigger label="Select Label" />
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
