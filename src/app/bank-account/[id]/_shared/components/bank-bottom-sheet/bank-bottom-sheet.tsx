import CommonBottomSheet from '@/shared/components/ui/bottom-sheet/bottom-sheet';
import { getBankIconByName } from '@/shared/utils/bank';

import styles from './bank-bottom-sheet.module.scss';

interface BottomSheetProps {
  onClose: () => void;
  isOpen: boolean;
  onSelectBank: (bankName: string) => void;
}

const CustomBottomSheet = ({
  isOpen,
  onClose,
  onSelectBank,
}: BottomSheetProps) => {
  const banks = [
    '카카오뱅크',
    '신한',
    '케이뱅크',
    '국민',
    '우리',
    '하나',
    '농협',
    '기업',
    '토스',
    '한국씨티',
    'SC제일',
  ];

  return (
    <CommonBottomSheet open={isOpen} onDismiss={onClose}>
      <div className={styles.content_container}>
        <span className={styles.title}>은행 선택</span>

        <div className={styles.grid_container}>
          {banks.map((bank) => {
            const BankIcon = getBankIconByName(bank);
            return (
              <button
                key={bank}
                className={styles.grid_item}
                onClick={() => {
                  onSelectBank(bank);
                  onClose();
                }}
              >
                {BankIcon && <BankIcon width={24} height={24} />}
                {bank}
              </button>
            );
          })}
        </div>
      </div>
    </CommonBottomSheet>
  );
};

export default CustomBottomSheet;
