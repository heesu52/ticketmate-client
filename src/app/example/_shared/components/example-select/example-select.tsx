import { useEffect, useState } from 'react';

import Select from '@/shared/components/select/select';

interface SelectList {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ExampleSelectProps {
  selectList: SelectList[];
}

const ExampleSelect = ({ selectList }: ExampleSelectProps) => {
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    console.log('Selected value:', selected);
  }, [selected]);
  return (
    <Select onSelect={setSelected} defaultValue="option1">
      <Select.Trigger label="example" />
      <Select.OptionList>
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
      </Select.OptionList>
    </Select>
  );
};

export default ExampleSelect;
