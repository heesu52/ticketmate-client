import classNames from 'classnames/bind';

import Button from '@/shared/components/ui/button/button';
import Modal from '@/shared/components/ui/modal/modal';
import { ModalTemplateType } from '@/shared/components/ui/modal/modal-template/modal-template.type';
import Spacer from '@/shared/components/ui/spacer/spacer';

import styles from './modal-template.module.scss';

const cn = classNames.bind(styles);

function ModalTemplate({
  title,
  description,
  firstButtonLabel = '취소',
  secondButtonLabel = '확인',
  onFirstButtonClick,
  onSecondButtonClick,
  children,
}: ModalTemplateType) {
  /** 첫 번째 버튼 클릭 시 처리 */
  const handleFirstButtonClick = () => {
    onFirstButtonClick?.();
  };

  /** 두 번째 버튼 클릭 시 처리 */
  const handleSecondButtonClick = () => {
    onSecondButtonClick?.();
  };

  return (
    <Modal className={cn('container')}>
      <Modal.Title className={cn('modal_title')}>{title}</Modal.Title>

      <Spacer size={4} />

      <Modal.Description className={cn('modal_description')}>
        {description}
      </Modal.Description>

      {children}

      <Spacer size={32} />

      <Modal.Action className={cn('modal_actions')}>
        {onFirstButtonClick && (
          <Button
            type="button"
            variant="fill"
            color="gray"
            onClick={handleFirstButtonClick}
          >
            {firstButtonLabel}
          </Button>
        )}

        {onSecondButtonClick && (
          <Button
            type="button"
            variant="fill"
            color="default"
            onClick={handleSecondButtonClick}
          >
            {secondButtonLabel}
          </Button>
        )}
      </Modal.Action>
    </Modal>
  );
}

export default ModalTemplate;
