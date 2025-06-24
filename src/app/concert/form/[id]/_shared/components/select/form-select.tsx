import Select from '@/shared/components/select/select';

interface SelectList {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormSelectProps {
  selectList: SelectList[];
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const FormSelect = ({
  selectList,
  value,
  onChange,
  disabled,
}: FormSelectProps) => {
  const selectedLabel =
    selectList.find((item) => item.value === value)?.label || '선택해주세요.';

  return (
    <Select defaultValue={value} onSelect={onChange} disabled={disabled}>
      <Select.Trigger
        label="Select Label"
        placeholder={selectedLabel}
        disabled={disabled}
      />
      <Select.OptionList listMinWidth="140px">
        {selectList.map((item) => (
          <Select.Option
            value={item.value}
            key={item.value}
            disabled={disabled || item.disabled}
          >
            {item.label}
          </Select.Option>
        ))}
      </Select.OptionList>
    </Select>
  );
};

export default FormSelect;
