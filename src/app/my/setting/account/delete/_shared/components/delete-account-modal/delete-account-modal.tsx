import ModalTemplate from '@/shared/components/ui/modal/modal-template/modal-template';
import { ModalTemplateType } from '@/shared/components/ui/modal/modal-template/modal-template.type';

type DeleteAccountModalProps = Omit<ModalTemplateType, 'children'>;

const DeleteAccountModal = ({
  onResolve,
  onReject,
}: DeleteAccountModalProps) => {
  const handleFirstButtonClick = () => {
    onReject?.();
  };

  const handleSecondButtonClick = () => {
    onResolve?.(true);
  };

  return (
    <ModalTemplate
      title={'정말 탈퇴하시겠습니까?'}
      description={'한 번 탈퇴한 계정은 복구할 수 없습니다.'}
      firstButtonLabel={'아니요'}
      secondButtonLabel={'탈퇴하기'}
      onFirstButtonClick={handleFirstButtonClick}
      onSecondButtonClick={handleSecondButtonClick}
    ></ModalTemplate>
  );
};

export default DeleteAccountModal;
