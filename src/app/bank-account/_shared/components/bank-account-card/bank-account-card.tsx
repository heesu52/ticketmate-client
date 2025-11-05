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

  const dropdownItems = [
    {
      label: '수정하기',
      onClick: () => console.log('수정하기'),
    },
    {
      label: '삭제하기',
      onClick: () => console.log('삭제하기'),
      isDanger: true,
    },
  ];

  // 대표계좌가 아닐 때만 항목 추가
  if (!isMain) {
    dropdownItems.unshift({
      label: '대표계좌로 설정하기',
      onClick: () => console.log('대표계좌로 설정하기'),
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.info_container}>
        <BankIcon width={40} height={40} />

        <div className={styles.detail_container}>
          <div className={styles.title_row}>
            <span className={styles.bank_name}>{accountName}</span>
            {isMain && <span className={styles.main_account}>대표계좌</span>}
          </div>
          <span className={styles.account_num}>{accountNum}</span>
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
