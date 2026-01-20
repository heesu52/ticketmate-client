import { useCreateConcertForm } from '@/app/concert/form/[id]/_shared/services/mutation';
import { ApplicationFormDetail } from '@/app/concert/form/[id]/_shared/services/type';
import ModalTemplate from '@/shared/components/ui/modal/modal-template/modal-template';
import { ModalControl } from '@/shared/components/ui/modal/modal.type';
import { TicketOpenType } from '@/shared/types';

type FormSubmitModalProps = {
  agentId: string;
  concertId: string;
  ticketOpenType: TicketOpenType;
  applicationFormDetailRequestList: ApplicationFormDetail[];
} & ModalControl<unknown>;

const FormSubmitModal = ({
  onResolve,
  onReject,
  agentId,
  concertId,
  ticketOpenType,
  applicationFormDetailRequestList,
}: FormSubmitModalProps) => {
  const { mutate } = useCreateConcertForm();
  const handleFirstButtonClick = () => {
    onResolve?.(false);
  };

  const handleSecondButtonClick = () => {
    mutate(
      { agentId, concertId, ticketOpenType, applicationFormDetailRequestList },
      {
        onSuccess: () => onResolve?.(true),
        onError: (error) => onReject?.(error),
      },
    );
  };

  return (
    <ModalTemplate
      title={'티켓팅 의뢰를 신청하시겠어요?'}
      description={`대리인이 수락하게 되면 매칭이 완료됩니다.\n매칭이 완료되면 채팅을 통해 이야기를 나눠보세요.`}
      firstButtonLabel={'다음에'}
      secondButtonLabel={'신청하기'}
      onFirstButtonClick={handleFirstButtonClick}
      onSecondButtonClick={handleSecondButtonClick}
    ></ModalTemplate>
  );
};

export default FormSubmitModal;
