import { useEffect, useState } from 'react';

import Dropdown from '@/shared/components/select/dropdown/dropdown';

interface DropdownList {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ConcertDropdownProps {
  dropdownList: DropdownList[];
}

const ConcertDropdown = ({ dropdownList }: ConcertDropdownProps) => {
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    console.log('selected', selected);
  }, [selected]);

  return (
    <Dropdown onSelect={setSelected}>
      <Dropdown.Trigger label="Dropdown Label" />
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

export default ConcertDropdown;
