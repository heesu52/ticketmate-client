'use client';

import {
  useDelteBankAccout,
  usePatchBankAccout,
} from '@/app/bank-account/_shared/services/mutation';
import { BankAccountResponse } from '@/app/bank-account/_shared/services/type';
import { MoreIcon } from '@/assets/icons';
import Dropdown from '@/shared/components/ui/dropdown/dropdown';
import { getBankIconByCode } from '@/shared/utils/bank';

import styles from './bank-account-card.module.scss';
interface BankAccountCardProps {
  bankAccountData: BankAccountResponse;
  onEdit: () => void;
}

const BankAccountCard = ({ bankAccountData, onEdit }: BankAccountCardProps) => {
  const { bankName, agentAccountNumber, primaryAccount, agentBankAccountId } =
    bankAccountData;
  const Icon = getBankIconByCode(bankName);

  const { mutate: patchBankAccount } = usePatchBankAccout();
  const { mutate: deleteBankAccount } = useDelteBankAccout();

  const dropdownItems = [
    {
      label: '수정하기',
      onClick: onEdit,
    },
    {
      label: '삭제하기',
      onClick: () => deleteBankAccount(agentBankAccountId),
      isDanger: true,
    },
  ];

  // 대표계좌가 아닐 때만 항목 추가
  if (!primaryAccount) {
    dropdownItems.unshift({
      label: '대표계좌로 설정하기',
      onClick: () => patchBankAccount(agentBankAccountId),
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.info_container}>
        <Icon width={40} height={40} />

        <div className={styles.detail_container}>
          <div className={styles.title_row}>
            <span className={styles.bank_name}>{bankName}</span>
            {primaryAccount && (
              <span className={styles.main_account}>대표계좌</span>
            )}
          </div>
          <span className={styles.account_num}>{agentAccountNumber}</span>
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
