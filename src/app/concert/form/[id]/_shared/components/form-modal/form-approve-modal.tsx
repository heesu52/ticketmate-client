import { usePatchFormApproveMutation } from '@/app/history/_shared/services/mutation';
import ModalTemplate from '@/shared/components/ui/modal/modal-template/modal-template';
import { ModalControl } from '@/shared/components/ui/modal/modal.type';

type FormApproveModalProps = {
  applicationFormId: string;
} & ModalControl<unknown>;

const FormApproveModal = ({
  onResolve,
  onReject,
  applicationFormId,
}: FormApproveModalProps) => {
  const { mutate } = usePatchFormApproveMutation();
  const handleFirstButtonClick = () => {
    onResolve?.(false);
  };

  const handleSecondButtonClick = () => {
    mutate(applicationFormId, {
      onSuccess: () => onResolve?.(true),
      onError: (error) => onReject?.(error),
    });
  };

  return (
    <ModalTemplate
      title="의뢰를 수락하시겠습니까?"
      description={`의뢰를 수락할 시 의뢰인과 매칭이.\n 성사되어 채팅이 가능해집니다.`}
      firstButtonLabel="다음에"
      secondButtonLabel="수락하기"
      onFirstButtonClick={handleFirstButtonClick}
      onSecondButtonClick={handleSecondButtonClick}
    />
  );
};

export default FormApproveModal;
