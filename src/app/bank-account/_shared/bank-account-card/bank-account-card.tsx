'use client';

import { MoreIcon } from '@/assets/icons';
import Dropdown from '@/shared/components/ui/dropdown/dropdown';
import { getBankIconByName } from '@/shared/utils/bank';

import styles from './bank-account-card.module.scss';

interface BankAccountCardProps {
  accountName: string;
  accountNum: string;
  isMain?: boolean;
}

const BankAccountCard = ({
  accountName,
  accountNum,
  isMain,
}: BankAccountCardProps) => {
  const BankIcon = getBankIconByName(accountName);

  return (
    <div className={styles.container}>
      <BankIcon width={30} height={30} />

      <div className={styles.info_container}>
        <span className={styles.bank_name}>{accountName}</span>
        {isMain && <span className={styles.main_account}>대표계좌</span>}
        <span className={styles.account_num}>{accountNum}</span>
      </div>

      <Dropdown
        trigger={
          <MoreIcon width={20} height={20} fill="var(--grayscale-700)" />
        }
        items={[
          {
            label: '대표 계좌 등록하기',
            onClick: () => console.log('대표 계좌 등록하기'),
          },
          {
            label: '계좌 삭제하기',
            onClick: () => console.log('계좌 삭제하기'),
          },
        ]}
      />
    </div>
  );
};

export default BankAccountCard;
