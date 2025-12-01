import ModalTemplate from '@/shared/components/ui/modal/modal-template/modal-template';
import { ModalTemplateType } from '@/shared/components/ui/modal/modal-template/modal-template.type';

type RejectRequestSuccessModalProps = Omit<ModalTemplateType, 'children'>;

const RejectRequestSuccessModal = ({
  onResolve,
  onReject,
}: RejectRequestSuccessModalProps) => {
  const handleFirstButtonClick = () => {
    onReject?.();
  };

  const handleSecondButtonClick = () => {
    onResolve?.(true);
  };

  return (
    <ModalTemplate
      title={'거절하시겠습니까?'}
      description={
        '합의된 좌석을 거절하실 경우 패널티를 받을 수 있으며,\n좌석이 취소처리 될 수 있습니다.'
      }
      firstButtonLabel={'다음에'}
      secondButtonLabel={'거절하기'}
      onFirstButtonClick={handleFirstButtonClick}
      onSecondButtonClick={handleSecondButtonClick}
    ></ModalTemplate>
  );
};

export default RejectRequestSuccessModal;
