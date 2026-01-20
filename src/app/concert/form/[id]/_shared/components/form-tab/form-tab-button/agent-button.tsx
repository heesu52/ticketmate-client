import { useRouter } from 'next/navigation';

import FormApproveModal from '@/app/concert/form/[id]/_shared/components/form-modal/form-approve-modal';
import FormRejectedModal from '@/app/concert/form/[id]/_shared/components/form-modal/form-rejected-modal/form-rejected-modal';
import Button from '@/shared/components/ui/button/button';
import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { useNavigation } from '@/shared/hooks/navigation/use-navigation';
import { ApplicationFormStatus } from '@/shared/types';
import { handleError } from '@/shared/utils/error';

import styles from './form-tab-button.module.scss';

interface FormTabManagerProps {
  handleOpenModal: () => void;
  status?: ApplicationFormStatus | null;
  applicationFormId?: string | null;
}

export default function FormTabAgentButton({
  handleOpenModal,
  applicationFormId,
  status,
}: FormTabManagerProps) {
  const navigation = useNavigation();
  const router = useRouter();
  const { open } = useModalStore();

  // 버튼 클릭 시 navigate로 이동
  const handleNavigate = () => {
    navigation.navigate({
      pathname: `/chat`,
    });
  };

  //신청서 거절 모달 (대리인용)
  const handleOpenRejectedModal = async () => {
    if (!applicationFormId) return;
    try {
      const result = await open('form-rejected-modal', FormRejectedModal, {
        applicationFormId,
      });
      if (result) {
        toastify({
          variant: 'success',
          description: '신청이 정상적으로 거절되었습니다',
        });
        router.push('/history');
      }
    } catch (error) {
      handleError(error);
    }
  };

  //신청서 수락 모달 (대리인용)
  const handleOpenApproveModal = async () => {
    if (!applicationFormId) return;
    try {
      const result = await open('form-approve-modal', FormApproveModal, {
        applicationFormId,
      });
      if (result) {
        toastify({
          variant: 'success',
          description: '신청이 정상적으로 수락되었습니다',
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
        <div className={styles.button}>
          <Button
            variant="outline"
            color="gray"
            onClick={handleOpenRejectedModal}
          >
            거절하기
          </Button>
          <Button variant="fill" onClick={handleOpenApproveModal}>
            수락하기
          </Button>
        </div>
      )}
      {status === 'APPROVED' && (
        <Button variant="outline" color="gray" onClick={handleNavigate}>
          {'의뢰인과 채팅하기'}
        </Button>
      )}
      {status === 'REJECTED' && (
        <Button variant="outline" color="gray" onClick={handleOpenModal}>
          거절사유
        </Button>
      )}

      {(status === 'CANCELED' || status === 'CANCELED_IN_PROCESS') && <div />}
    </div>
  );
}
