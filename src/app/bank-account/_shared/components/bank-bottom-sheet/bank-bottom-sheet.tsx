import CommonBottomSheet from '@/shared/components/ui/bottom-sheet/bottom-sheet';
import { BankCode } from '@/shared/types';
import { getBankIconByCode, getBankNameByCode } from '@/shared/utils/bank';

import styles from './bank-bottom-sheet.module.scss';

interface BottomSheetProps {
  onClose: () => void;
  isOpen: boolean;
  onSelectBank: (bankCode: BankCode) => void;
}

const BankBottomSheet = ({
  isOpen,
  onClose,
  onSelectBank,
}: BottomSheetProps) => {
  // 표시할 은행 코드 목록
  const bankCodes: BankCode[] = [
    BankCode.KAKAO_BANK,
    BankCode.SHINHAN,
    BankCode.K_BANK,
    BankCode.KOOKMIN,
    BankCode.WOORI,
    BankCode.HANA,
    BankCode.NONGHYEOP,
    BankCode.IBK,
    BankCode.TOSS_BANK,
    BankCode.CITI,
    BankCode.SC,
  ];

  return (
    <CommonBottomSheet open={isOpen} onDismiss={onClose}>
      <div className={styles.content_container}>
        <span className={styles.title}>은행 선택</span>

        <div className={styles.grid_container}>
          {bankCodes.map((code) => {
            const BankIcon = getBankIconByCode(code);
            const name = getBankNameByCode(code);
            return (
              <button
                key={code}
                className={styles.grid_item}
                onClick={() => {
                  onSelectBank(code);
                  onClose();
                }}
              >
                {BankIcon && <BankIcon width={24} height={24} />}
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </CommonBottomSheet>
  );
};

export default BankBottomSheet;
