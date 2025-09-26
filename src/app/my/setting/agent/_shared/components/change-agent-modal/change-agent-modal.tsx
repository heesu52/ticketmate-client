import ModalTemplate from '@/shared/components/ui/modal/modal-template/modal-template';
import { ModalTemplateType } from '@/shared/components/ui/modal/modal-template/modal-template.type';

type ChangeAgentModalProps = Omit<ModalTemplateType, 'children'>;

const ChangeAgentModal = ({ onResolve, onReject }: ChangeAgentModalProps) => {
  const handleFirstButtonClick = () => {
    onReject?.();
  };

  const handleSecondButtonClick = () => {
    onResolve?.(true);
  };

  return (
    <ModalTemplate
      title={'대리인 전환 신청하시겠습니까?'}
      description={
        '심사는 최대 7일 정도 소요될 수 있으며,\n결과는 알림으로 전송됩니다.'
      }
      firstButtonLabel={'아니요'}
      secondButtonLabel={'신청하기'}
      onFirstButtonClick={handleFirstButtonClick}
      onSecondButtonClick={handleSecondButtonClick}
    ></ModalTemplate>
  );
};

export default ChangeAgentModal;
