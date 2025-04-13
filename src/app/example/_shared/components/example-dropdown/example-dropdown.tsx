import { useEffect, useState } from 'react';

import Dropdown from '@/shared/components/select/dropdown/dropdown';

interface DropdownList {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ExampleDropdownProps {
  dropdownList: DropdownList[];
}

const ExampleDropdown = ({ dropdownList }: ExampleDropdownProps) => {
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    console.log('selected', selected);
  }, [selected]);

  return (
    <Dropdown onSelect={setSelected} defaultValue="option1">
      <Dropdown.Trigger label="example" />
      {dropdownList.map((item) => {
        return (
          <Dropdown.Option
            value={item.value}
            key={item.value}
            disabled={item.disabled}
          >
            {item.label}
          </Dropdown.Option>
        );
      })}
    </Dropdown>
  );
};

export default ExampleDropdown;
