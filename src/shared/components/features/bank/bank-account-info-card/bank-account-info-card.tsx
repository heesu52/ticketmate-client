import Dropdown from '@/shared/components/ui/dropdown/dropdown';
import { DropdownItem } from '@/shared/components/ui/dropdown/dropdown.type';
import { BankAccountInfo, BankCode } from '@/shared/types/bank';
import { getBankIconByCode, getBankNameByCode } from '@/shared/utils/bank';

import styles from './bank-account-info-card.module.scss';

interface BankAccountInfoCardProps {
  bankAccountInfo: BankAccountInfo;
  dropdownItems?: DropdownItem[];
  onClick?: () => void;
}

const BankAccountInfoCard = ({
  bankAccountInfo,
  dropdownItems,
  onClick,
}: BankAccountInfoCardProps) => {
  const {
    agentBankAccountId,
    agentAccountNumber,
    bankCode,
    primaryAccount: isPrimaryAccount,
    accountHolder,
  } = bankAccountInfo;

  const BankIcon = getBankIconByCode(bankCode as BankCode);
  const bankName = getBankNameByCode(bankCode as BankCode);

  return (
    <div className={styles.account_container} onClick={onClick}>
      <div className={styles.left_container}>
        {BankIcon && <BankIcon width={40} height={40} />}

        <div className={styles.account_info_container}>
          <div className={styles.wrapper}>
            <div className={styles.wrapper}>
              <span className={styles.bank_name}>{bankName}</span>
              {isPrimaryAccount && (
                <span className={styles.primary_badge}>대표계좌</span>
              )}
            </div>
          </div>

          <div className={styles.wrapper}>
            <div className={styles.account_number}>{agentAccountNumber}</div>
            <div className={styles.account_holder}>({accountHolder})</div>
          </div>
        </div>
      </div>

      {dropdownItems && (
        <div className={styles.right_container}>
          <Dropdown items={dropdownItems} />
        </div>
      )}
    </div>
  );
};

export default BankAccountInfoCard;
