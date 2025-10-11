import ModalTemplate from '@/shared/components/ui/modal/modal-template/modal-template';
import { ModalTemplateType } from '@/shared/components/ui/modal/modal-template/modal-template.type';

type FormrejectModalProps = Omit<ModalTemplateType, 'children'>;

const FormRejectedModal = ({ onResolve, onReject }: FormrejectModalProps) => {
  const handleFirstButtonClick = () => {
    onReject?.();
  };

  const handleSecondButtonClick = () => {
    onResolve?.(true);
  };

  return (
    <ModalTemplate
      title={'대리인 닉네임의 거절사유'}
      description={`작성한 신청양식을 통해 동일한 대리인에게 다시 티켓팅을 의뢰할 수 있습니다.`}
      firstButtonLabel={'확인했어요'}
      secondButtonLabel={'신청하기'}
      onFirstButtonClick={handleFirstButtonClick}
      onSecondButtonClick={handleSecondButtonClick}
    ></ModalTemplate>
  );
};

export default FormRejectedModal;
