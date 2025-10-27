import { usePatchFormCancelMutation } from '@/app/history/_shared/services/mutation';
import ModalTemplate from '@/shared/components/ui/modal/modal-template/modal-template';
import { ModalControl } from '@/shared/components/ui/modal/modal.type';

type FormCancelModalProps = {
  applicationFormId: string;
} & ModalControl<unknown>;

const FormCancelModal = ({
  onResolve,
  onReject,
  applicationFormId,
}: FormCancelModalProps) => {
  const { mutate } = usePatchFormCancelMutation();
  const handleFirstButtonClick = () => {
    onResolve?.(false);
  };

  const handleSecondButtonClick = () => {
    mutate(applicationFormId, {
      onSuccess: () => onResolve?.(true),
      onError: () => onReject?.(),
    });
  };

  return (
    <ModalTemplate
      title="신청을 취소하시겠습니까?"
      description="신청했던 내역은 과거 신청내역에서 확인 가능합니다."
      firstButtonLabel="다음에"
      secondButtonLabel="취소하기"
      onFirstButtonClick={handleFirstButtonClick}
      onSecondButtonClick={handleSecondButtonClick}
    />
  );
};

export default FormCancelModal;
