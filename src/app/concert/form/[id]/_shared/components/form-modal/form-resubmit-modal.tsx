import { useQueryClient } from '@tanstack/react-query';

import { usePatchConcertForm } from '@/app/concert/form/[id]/_shared/services/mutation';
import queryKey from '@/app/concert/form/[id]/_shared/services/query-key';
import { ApplicationFormRequest } from '@/app/concert/form/[id]/_shared/services/type';
import ModalTemplate from '@/shared/components/ui/modal/modal-template/modal-template';
import { ModalControl } from '@/shared/components/ui/modal/modal.type';

type FormReSubmitModalProps = {
  applicationFormId: string; // 폼ID
  applicationFormEditRequest: ApplicationFormRequest;
} & ModalControl<unknown>;

const FormReSubmitModal = ({
  onResolve,
  onReject,
  applicationFormId,
  applicationFormEditRequest,
}: FormReSubmitModalProps) => {
  const { mutate } = usePatchConcertForm();
  const queryClient = useQueryClient();
  const handleFirstButtonClick = () => {
    onResolve?.(false);
  };

  const handleSecondButtonClick = () => {
    mutate(
      {
        applicationFormId,
        applicationFormEditRequest,
      },
      {
        onSuccess: () => {
          // 캐시 무효화로 수정한 신청서 데이터 다시 조회
          if (applicationFormId) {
            queryClient.invalidateQueries({
              queryKey: queryKey.getFormDetail({ applicationFormId }),
              exact: true,
            });
          }
          onResolve?.(true);
        },
        onError: (error) => onReject?.(error),
      },
    );
  };

  return (
    <ModalTemplate
      title={'티켓팅 의뢰를 재신청하시겠어요?'}
      description={`대리인이 수락하게 되면 매칭이 완료됩니다.\n매칭이 완료되면 채팅을 통해 이야기를 나눠보세요.`}
      firstButtonLabel={'다음에'}
      secondButtonLabel={'신청하기'}
      onFirstButtonClick={handleFirstButtonClick}
      onSecondButtonClick={handleSecondButtonClick}
    ></ModalTemplate>
  );
};

export default FormReSubmitModal;
