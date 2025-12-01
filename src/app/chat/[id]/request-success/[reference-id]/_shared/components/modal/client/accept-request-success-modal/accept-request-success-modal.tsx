import ModalTemplate from '@/shared/components/ui/modal/modal-template/modal-template';
import { ModalTemplateType } from '@/shared/components/ui/modal/modal-template/modal-template.type';

type AcceptRequestSuccessModalProps = Omit<ModalTemplateType, 'children'>;

const AcceptRequestSuccessModal = ({
  onResolve,
  onReject,
}: AcceptRequestSuccessModalProps) => {
  const handleFirstButtonClick = () => {
    onReject?.();
  };

  const handleSecondButtonClick = () => {
    onResolve?.(true);
  };

  return (
    <ModalTemplate
      title={'수락하시겠습니까?'}
      description={'대리인의 계좌로 수고비를 송금해주세요.'}
      firstButtonLabel={'다음에'}
      secondButtonLabel={'수락하기'}
      onFirstButtonClick={handleFirstButtonClick}
      onSecondButtonClick={handleSecondButtonClick}
    ></ModalTemplate>
  );
};

export default AcceptRequestSuccessModal;
