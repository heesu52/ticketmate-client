import classNames from 'classnames/bind';
import { type ToastContentProps as ToastifyToastContentProps } from 'react-toastify';

import { ToastVariant } from '@/shared/components/ui/toast/toast.type';

import styles from './toast.module.scss';

const cn = classNames.bind(styles);

interface ToastComponentProps extends ToastifyToastContentProps {
  variant: ToastVariant;
  description: string;
}

const Toast = ({ variant, description }: ToastComponentProps) => {
  return (
    <div className={cn('container')} data-variant={variant}>
      <p className={cn('description')}>{description}</p>
    </div>
  );
};

export default Toast;
