import { useDelteBankAccout } from '@/app/bank-account/_shared/services/mutation';
import ModalTemplate from '@/shared/components/ui/modal/modal-template/modal-template';
import { ModalControl } from '@/shared/components/ui/modal/modal.type';

type AccountDeleteModalProps = {
  agentBankAccountId: string;
} & ModalControl<unknown>;

const AccountDeleteModal = ({
  onResolve,
  onReject,
  agentBankAccountId,
}: AccountDeleteModalProps) => {
  const { mutate } = useDelteBankAccout();
  const handleFirstButtonClick = () => {
    onResolve?.(false);
  };

  const handleSecondButtonClick = () => {
    mutate(agentBankAccountId, {
      onSuccess: () => onResolve?.(true),
      onError: () => onReject?.(),
    });
  };

  return (
    <ModalTemplate
      title={'계좌를 삭제하시겠습니까?'}
      description={`삭제된 계좌정보에 대해서는 복구가 불가능합니다.`}
      firstButtonLabel={'다음에'}
      secondButtonLabel={'삭제하기'}
      onFirstButtonClick={handleFirstButtonClick}
      onSecondButtonClick={handleSecondButtonClick}
    ></ModalTemplate>
  );
};

export default AccountDeleteModal;
