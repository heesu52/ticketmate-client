import { useEffect, useState } from 'react';

import Select from '@/shared/components/select/select';

interface SelectList {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormSelectProps {
  selectList: SelectList[];
}

const FormSelect = ({ selectList }: FormSelectProps) => {
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    console.log('selected', selected);
  }, [selected]);

  return (
    <Select onSelect={setSelected} defaultValue="popularity">
      <Select.Trigger label="Select Label" />
      <Select.OptionList listMinWidth="140px">
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

export default FormSelect;
