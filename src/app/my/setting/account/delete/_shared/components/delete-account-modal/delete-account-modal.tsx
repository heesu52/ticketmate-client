import { usePostWithdrawMutation } from '@/app/my/setting/account/delete/_shared/services/mutation';
import { WithdrawRequest } from '@/app/my/setting/account/delete/_shared/services/type';
import ModalTemplate from '@/shared/components/ui/modal/modal-template/modal-template';
import { ModalControl } from '@/shared/components/ui/modal/modal.type';
import { WithdrawalReasonType } from '@/shared/types';

type DeleteAccountModalProps = {
  reason: string;
  reasonInput: string;
} & ModalControl<unknown>;

const DeleteAccountModal = ({
  onResolve,
  onReject,
  reason,
  reasonInput,
}: DeleteAccountModalProps) => {
  const { mutate } = usePostWithdrawMutation();

  const handleFirstButtonClick = () => {
    onReject?.();
  };

  const handleSecondButtonClick = () => {
    const request: WithdrawRequest = {
      withdrawalReasonType: reason as WithdrawalReasonType,
      otherReason: reason === 'OTHER' ? reasonInput : undefined,
    };

    mutate(request, {
      onSuccess: () => onResolve?.(true),
      onError: (error) => onReject?.(error),
    });
  };

  return (
    <ModalTemplate
      title="정말 떠나시겠어요?"
      description={
        '탈퇴 후 3일 이내 같은 전화번호로\n로그인하면 탈퇴를 철회할 수 있어요'
      }
      firstButtonLabel="아니요"
      secondButtonLabel="떠날래요"
      onFirstButtonClick={handleFirstButtonClick}
      onSecondButtonClick={handleSecondButtonClick}
    />
  );
};

export default DeleteAccountModal;
