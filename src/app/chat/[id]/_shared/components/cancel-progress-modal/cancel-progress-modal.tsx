import { usePatchCancelProgress } from '@/app/chat/[id]/_shared/services/mutation';
import ModalTemplate from '@/shared/components/ui/modal/modal-template/modal-template';
import { ModalControl } from '@/shared/components/ui/modal/modal.type';

type CancelProgressModalProps = {
  roomId: string;
} & ModalControl<unknown>;

const CancelProgressModal = ({
  onResolve,
  onReject,
  roomId,
}: CancelProgressModalProps) => {
  const cancelProgress = usePatchCancelProgress();

  const handleFirstButtonClick = () => {
    onReject?.();
  };

  const handleSecondButtonClick = () => {
    cancelProgress.mutateAsync(
      { chatRoomId: roomId },
      {
        onSuccess: () => {
          onResolve?.(true);
        },
        onError: () => {
          onReject?.();
        },
      },
    );
  };

  return (
    <ModalTemplate
      title={'진행을 취소하시겠습니까?'}
      description={
        '진행 취소 시 되돌릴 수 없으며,\n상대방에게 알림이 발송됩니다.'
      }
      firstButtonLabel={'다음에'}
      secondButtonLabel={'취소하기'}
      onFirstButtonClick={handleFirstButtonClick}
      onSecondButtonClick={handleSecondButtonClick}
    ></ModalTemplate>
  );
};

export default CancelProgressModal;
