import React from 'react';

import classNames from 'classnames/bind';

import styles from './textarea.module.scss';

const cn = classNames.bind(styles);

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({
  id,
  placeholder,
  value,
  onChange,
  ...rest
}: TextareaProps) => {
  return (
    <textarea
      className={cn('textarea')}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default Textarea;
