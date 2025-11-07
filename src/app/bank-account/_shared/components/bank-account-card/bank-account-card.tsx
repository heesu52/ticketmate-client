'use client';

import { useQueryClient } from '@tanstack/react-query';

import AccountDeleteModal from '@/app/bank-account/_shared/components/account-delete-modal';
import { usePatchBankAccount } from '@/app/bank-account/_shared/services/mutation';
import queryKey from '@/app/bank-account/_shared/services/query-key';
import { BankAccountResponse } from '@/app/bank-account/_shared/services/type';
import { MoreIcon } from '@/assets/icons';
import Dropdown from '@/shared/components/ui/dropdown/dropdown';
import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { useNavigation } from '@/shared/hooks/navigation/use-navigation';
import { useHandleError } from '@/shared/hooks/use-error';
import { getBankIconByName } from '@/shared/utils/bank';

import styles from './bank-account-card.module.scss';

interface BankAccountCardProps {
  bankAccountData: BankAccountResponse;
}

const BankAccountCard = ({ bankAccountData }: BankAccountCardProps) => {
  const { agentBankAccountId } = bankAccountData;
  const Icon = getBankIconByName(bankAccountData.bankName);

  const { navigate } = useNavigation<{
    accountNumber: string;
    bankName: string;
  }>();
  const { open } = useModalStore();
  const { handleError } = useHandleError();
  const { mutate } = usePatchBankAccount();
  const queryClient = useQueryClient();

  const handleNavigate = (agentBankAccountId: string) => {
    navigate({
      pathname: `/bank-account/${agentBankAccountId}`,
      state: {
        accountNumber: bankAccountData.agentAccountNumber,
        bankName: bankAccountData.bankName,
      },
    });
  };

  // 계좌 삭제 모달
  const handleOpenDeleteModal = async () => {
    if (!agentBankAccountId) return;
    try {
      const result = await open('form-cancel-modal', AccountDeleteModal, {
        agentBankAccountId,
      });
      if (result) {
        toastify({
          variant: 'success',
          description: '계좌가 삭제되었습니다.',
        });
      }
    } catch (error) {
      handleError(error);
    }
  };

  const dropdownItems = [
    {
      label: '수정하기',
      onClick: () => handleNavigate(agentBankAccountId),
    },
    {
      label: '삭제하기',
      onClick: () => handleOpenDeleteModal(),
      isDanger: true,
    },
  ];

  // 대표계좌가 아닐 때만 항목 추가
  if (!bankAccountData.primaryAccount) {
    dropdownItems.unshift({
      label: '대표계좌로 설정하기',
      onClick: () =>
        mutate(agentBankAccountId, {
          onSuccess: () => {
            // 대표계좌 설정 후 목록 재조회
            queryClient.invalidateQueries({
              queryKey: queryKey.getBankAccountList(),
            });
          },
          onError: (error) => {
            handleError(error);
          },
        }),
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.info_container}>
        <Icon width={40} height={40} />

        <div className={styles.detail_container}>
          <div className={styles.title_row}>
            <span className={styles.bank_name}>{bankAccountData.bankName}</span>
            {bankAccountData.primaryAccount && (
              <span className={styles.main_account}>대표계좌</span>
            )}
          </div>
          <span className={styles.account_num}>
            {bankAccountData.agentAccountNumber}
          </span>
        </div>
      </div>

      <Dropdown
        trigger={
          <MoreIcon width={20} height={20} fill="var(--grayscale-700)" />
        }
        items={dropdownItems}
      />
    </div>
  );
};

export default BankAccountCard;
