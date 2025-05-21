import Select from '@/shared/components/select/select';

interface SelectList {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormSelectProps {
  selectList: SelectList[];
  value: string;
  onChange: (value: string) => void;
}

const FormSelect = ({ selectList, value, onChange }: FormSelectProps) => {
  const selectedLabel =
    selectList.find((item) => item.value === value)?.label || '선택해주세요.';

  return (
    <Select defaultValue={value} onSelect={onChange}>
      <Select.Trigger label="Select Label" placeholder={selectedLabel} />
      <Select.OptionList listMinWidth="140px">
        {selectList.map((item) => (
          <Select.Option
            value={item.value}
            key={item.value}
            disabled={item.disabled}
          >
            {item.label}
          </Select.Option>
        ))}
      </Select.OptionList>
    </Select>
  );
};

export default FormSelect;
