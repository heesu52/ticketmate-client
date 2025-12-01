import ModalTemplate from '@/shared/components/ui/modal/modal-template/modal-template';
import { ModalTemplateType } from '@/shared/components/ui/modal/modal-template/modal-template.type';

type SendRequestSuccessModalProps = Omit<ModalTemplateType, 'children'>;

const SendRequestSuccessModal = ({
  onResolve,
  onReject,
}: SendRequestSuccessModalProps) => {
  const handleFirstButtonClick = () => {
    onReject?.();
  };

  const handleSecondButtonClick = () => {
    onResolve?.(true);
  };

  return (
    <ModalTemplate
      title={'의뢰 성공 소식을 전하시겠습니까?'}
      description={
        '소식을 전할 시에 곧바로 의뢰인에게 알림이 전송되며,\n해당 내역이 의뢰인에게 보여집니다.'
      }
      firstButtonLabel={'다음에'}
      secondButtonLabel={'전송하기'}
      onFirstButtonClick={handleFirstButtonClick}
      onSecondButtonClick={handleSecondButtonClick}
    ></ModalTemplate>
  );
};

export default SendRequestSuccessModal;
