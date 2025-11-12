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
      title={'정말 떠나시겠어요?'}
      description={
        '탈퇴 후 3일 이내 같은 전화번호로\n로그인하면 탈퇴를 철회할 수 있어요'
      }
      firstButtonLabel={'아니요'}
      secondButtonLabel={'떠날래요'}
      onFirstButtonClick={handleFirstButtonClick}
      onSecondButtonClick={handleSecondButtonClick}
    ></ModalTemplate>
  );
};

export default DeleteAccountModal;
