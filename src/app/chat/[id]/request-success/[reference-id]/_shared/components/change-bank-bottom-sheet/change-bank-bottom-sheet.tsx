import BankAccountInfoCard from '@/shared/components/features/bank/bank-account-info-card/bank-account-info-card';
import CommonBottomSheet from '@/shared/components/ui/bottom-sheet/bottom-sheet';
import Spacer from '@/shared/components/ui/spacer/spacer';
import { BankAccountInfo } from '@/shared/types/bank';

import styles from './change-bank-bottom-sheet.module.scss';

interface ChangeBankBottomSheetProps {
  onClose: () => void;
  isOpen: boolean;
  onSelectBankAccount: (bankAccountInfo: BankAccountInfo) => void;
  bankAccountInfoList: BankAccountInfo[];
}

const ChangeBankBottomSheet = ({
  isOpen,
  onClose,
  onSelectBankAccount,
  bankAccountInfoList,
}: ChangeBankBottomSheetProps) => {
  return (
    <CommonBottomSheet open={isOpen} onDismiss={onClose}>
      <span className={styles.title}>계좌 변경하기</span>

      <Spacer size={24} />

      <div className={styles.content_container}>
        {bankAccountInfoList.map((bankAccountInfo) => (
          <BankAccountInfoCard
            key={bankAccountInfo.agentBankAccountId}
            bankAccountInfo={bankAccountInfo}
            onClick={() => onSelectBankAccount(bankAccountInfo)}
          />
        ))}
      </div>
    </CommonBottomSheet>
  );
};

export default ChangeBankBottomSheet;
