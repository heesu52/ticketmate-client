import { useRouter } from 'next/navigation';

import FormCancelModal from '@/app/concert/form/[id]/_shared/components/form-modal/form-cancel-modal';
import FormReSubmitModal from '@/app/concert/form/[id]/_shared/components/form-modal/form-resubmit-modal';
import FormSubmitModal from '@/app/concert/form/[id]/_shared/components/form-modal/form-submit-modal';
import {
  CreateConcertFormRequest,
  PatchConcertFormRequest,
} from '@/app/concert/form/[id]/_shared/services/type';
import Button from '@/shared/components/ui/button/button';
import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { useMember } from '@/shared/context/member-context';
import { useNavigation } from '@/shared/hooks/navigation/use-navigation';
import { ApplicationFormStatus } from '@/shared/types';
import { handleError } from '@/shared/utils/error';

import styles from './form-tab-button.module.scss';

interface FormTabManagerProps {
  handleOpenModal: () => void;
  requestData: CreateConcertFormRequest | PatchConcertFormRequest;
  status?: ApplicationFormStatus | null;
  applicationFormId?: string | null;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
}

export default function FormTabClientButton({
  handleOpenModal,
  requestData,
  applicationFormId,
  status,
  isEdit,
  setIsEdit,
}: FormTabManagerProps) {
  const navigation = useNavigation();
  const { member } = useMember();
  const router = useRouter();
  const { open } = useModalStore();

  // 버튼 클릭 시 navigate로 이동
  const handleNavigate = () => {
    navigation.navigate({
      pathname: `/chat`,
    });
  };

  // 공연 신청 취소 모달 (의뢰인용)
  const handleOpenCancelModal = async () => {
    if (!applicationFormId) return;

    try {
      const result = await open('form-cancel-modal', FormCancelModal, {
        applicationFormId,
      });

      if (result) {
        toastify({
          variant: 'success',
          description: '신청이 정상적으로 취소되었습니다',
        });
        router.push('/history');
      }
    } catch (error) {
      handleError(error);
    }
  };

  // 신청서 요청 확인 모달 (의뢰인용)
  const handleOpenSubmitModal = async () => {
    if (!('agentId' in requestData)) return;
    try {
      const result = await open('form-submit-modal', FormSubmitModal, {
        ...requestData,
      });

      if (result) {
        toastify({
          variant: 'success',
          description: '공연 의뢰에 성공했습니다.',
        });
        router.push('/history');
      }
    } catch (error) {
      handleError(error);
    }
  };

  // 신청서 재요청 확인 모달 (의뢰인용)
  const handleOpenReSumitModal = async () => {
    if (!('applicationFormId' in requestData)) return;
    try {
      const result = await open('form-resubmit-modal', FormReSubmitModal, {
        ...requestData,
      });

      if (result) {
        toastify({
          variant: 'success',
          description: '공연 의뢰에 성공했습니다.',
        });
        router.push('/history');
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className={styles.button_container}>
      {status === 'PENDING' && (
        <Button variant="outline" color="gray" onClick={handleOpenCancelModal}>
          신청 취소하기
        </Button>
      )}
      {status === 'APPROVED' && (
        <Button variant="outline" color="gray" onClick={handleNavigate}>
          {'대리인과 채팅하기'}
        </Button>
      )}
      {status === 'REJECTED' && !isEdit && (
        <div className={styles.button}>
          <Button variant="outline" color="gray" onClick={handleOpenModal}>
            거절사유
          </Button>

          {member?.memberType === 'CLIENT' && (
            <Button variant="fill" onClick={() => setIsEdit(true)}>
              재신청하기
            </Button>
          )}
        </div>
      )}
      {(status === 'CANCELED' || status === 'CANCELED_IN_PROCESS') &&
        !isEdit && (
          <Button variant="fill" onClick={() => setIsEdit(true)}>
            재신청하기
          </Button>
        )}

      {(!status || isEdit) && (
        <Button
          variant="fill"
          onClick={() => {
            if (status) {
              handleOpenReSumitModal();
            } else {
              handleOpenSubmitModal();
            }
          }}
        >
          신청하기
        </Button>
      )}
    </div>
  );
}
