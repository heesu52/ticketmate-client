// 'use client';

// import React, {
//   ReactNode,
//   useContext,
//   KeyboardEvent,
//   ChangeEvent,
// } from 'react';

// import classNames from 'classnames/bind';

// import styles from './radio.module.scss';

// const cn = classNames.bind(styles);

// interface RadioGroupContextType {
//   name: string;
//   value: string | null;
//   onChange: (value: string) => void;
// }

// const RadioGroupContext = React.createContext<
//   RadioGroupContextType | undefined
// >(undefined);

// interface RadioProps {
//   value: string;
//   label?: ReactNode;
//   checked?: boolean;
//   onChange?: (value: string) => void;
//   disabled?: boolean;
// }

// const Radio = ({
//   value,
//   label,
//   checked: controlledChecked,
//   onChange: controlledOnChange,
//   disabled = false,
// }: RadioProps) => {
//   const context = useContext(RadioGroupContext);
//   const name = context?.name || `radio-${value}`;
//   const isChecked = context ? context.value === value : controlledChecked;
//   const onChange = context ? context.onChange : controlledOnChange;

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (!disabled && onChange && e.target.checked) {
//       onChange(value);
//     }
//   };

//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();
//       if (!disabled && onChange && !isChecked) {
//         onChange(value);
//       }
//     }
//   };

//   return (
//     <label className={cn('radio_container', { checked: isChecked, disabled })}>
//       <input
//         type="radio"
//         name={name}
//         value={value}
//         checked={isChecked}
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         disabled={disabled}
//         className={cn('radio_button')}
//       />
//       <span className={cn('radio_label', { checked: isChecked })}>{label}</span>
//     </label>
//   );
// };

// interface RadioInputProps {
//   placeholder?: string;
//   disabled?: boolean;
// }

// const RadioInput = ({
//   placeholder = '직접 입력',
//   disabled = false,
// }: RadioInputProps) => {
//   const context = useContext(RadioGroupContext);
//   if (!context)
//     throw new Error(
//       'RadioInput 컴포넌트는 RadioGroup 하위에서 사용되어야 합니다.',
//     );
//   const { name, value, onChange } = context;

//   const customValueKey = 'custom';
//   const isChecked =
//     value !== null && !['option1', 'option2', 'option3'].includes(value);
//   const inputValue = isChecked ? value || '' : '';

//   const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (!disabled && e.target.checked) {
//       onChange(''); // 초기 빈 값으로 설정
//     }
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (!disabled) {
//       onChange(e.target.value); // 입력 값 실시간 반영
//     }
//   };

//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();
//       if (!disabled && !isChecked) {
//         onChange('');
//       }
//     }
//   };

//   return (
//     <label className={cn('radio_container', { checked: isChecked, disabled })}>
//       <input
//         type="radio"
//         name={name}
//         value={customValueKey}
//         checked={isChecked}
//         onChange={handleRadioChange}
//         onKeyDown={handleKeyDown}
//         disabled={disabled}
//         className={cn('radio_button')}
//       />
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         onClick={() => !isChecked && onChange('')} // 텍스트 클릭 시 라디오 선택
//         disabled={disabled}
//         placeholder={placeholder}
//         className={cn('radio_input', { checked: isChecked })}
//       />
//     </label>
//   );
// };

// interface RadioGroupProps {
//   name?: string;
//   value: string | null;
//   onChange: (value: string) => void;
//   children: ReactNode;
// }

// const RadioGroup = ({
//   name = 'radio-group',
//   value,
//   onChange,
//   children,
// }: RadioGroupProps) => {
//   return (
//     <div className={cn('radio_group')} role="radiogroup">
//       <RadioGroupContext.Provider value={{ name, value, onChange }}>
//         {children}
//       </RadioGroupContext.Provider>
//     </div>
//   );
// };

// RadioGroup.Radio = Radio;
// RadioGroup.RadioInput = RadioInput;

// export default RadioGroup;
'use client';

import React, { ReactNode, useContext, ChangeEvent } from 'react';

import classNames from 'classnames/bind';

import styles from './radio.module.scss';

const cn = classNames.bind(styles);

interface RadioGroupContextType {
  name: string;
  value: string | null;
  onChange: (value: string) => void;
}

const RadioGroupContext = React.createContext<
  RadioGroupContextType | undefined
>(undefined);

interface RadioProps {
  value: string;
  label?: ReactNode;
  disabled?: boolean;
}

const Radio = ({ value, label, disabled = false }: RadioProps) => {
  const context = useContext(RadioGroupContext);
  if (!context)
    throw new Error('Radio 컴포넌트는 RadioGroup 내부에서 사용해야 합니다.');

  const { name, value: selectedValue, onChange } = context;
  const isChecked = selectedValue === value;

  const handleChange = () => {
    if (!disabled) onChange(value);
  };

  return (
    <label className={cn('radio_container', { checked: isChecked, disabled })}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className={cn('radio_button')}
      />
      <span className={cn('radio_label', { checked: isChecked })}>{label}</span>
    </label>
  );
};

interface RadioInputProps {
  placeholder?: string;
  disabled?: boolean;
}

const RadioInput = ({
  placeholder = '직접 입력',
  disabled = false,
}: RadioInputProps) => {
  const context = useContext(RadioGroupContext);
  if (!context)
    throw new Error(
      'RadioInput 컴포넌트는 RadioGroup 내부에서 사용해야 합니다.',
    );

  const { name, value, onChange } = context;
  const isChecked = value !== null && !context.value?.startsWith('option');

  const handleRadioChange = () => {
    if (!disabled) onChange('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!disabled) onChange(e.target.value);
  };

  return (
    <label className={cn('radio_container', { checked: isChecked, disabled })}>
      <input
        type="radio"
        name={name}
        checked={isChecked}
        onChange={handleRadioChange}
        disabled={disabled}
        className={cn('radio_button')}
      />
      <input
        type="text"
        value={isChecked ? value || '' : ''}
        onChange={handleInputChange}
        onClick={() => !isChecked && onChange('')}
        disabled={disabled}
        placeholder={placeholder}
        className={cn('radio_input', { checked: isChecked })}
      />
    </label>
  );
};

interface RadioGroupProps {
  name?: string;
  value: string | null;
  onChange: (value: string) => void;
  children: ReactNode;
}

const RadioGroup = ({
  name = 'radio-group',
  value,
  onChange,
  children,
}: RadioGroupProps) => {
  return (
    <div className={cn('radio_group')} role="radiogroup">
      <RadioGroupContext.Provider value={{ name, value, onChange }}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
};

RadioGroup.Radio = Radio;
RadioGroup.RadioInput = RadioInput;

export default RadioGroup;
