import CommonBottomSheet from '@/shared/components/ui/bottom-sheet/bottom-sheet';
import { getBankIconByCode, getBankNameByCode } from '@/shared/utils/bank';

import styles from './bank-bottom-sheet.module.scss';

interface BottomSheetProps {
  onClose: () => void;
  isOpen: boolean;
  onSelectBank: (bankCode: string) => void;
}

const BankBottomSheet = ({
  isOpen,
  onClose,
  onSelectBank,
}: BottomSheetProps) => {
  // 표시할 은행 코드 목록
  const bankCodes = [
    'KAKAO_BANK',
    'SHINHAN',
    'K_BANK',
    'KOOKMIN',
    'WOORI',
    'HANA',
    'NONGHYEOP',
    'IBK',
    'TOSS_BANK',
    'CITI',
    'SC',
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
