'use client';

import React, { useState } from 'react';

import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import Input from '@/shared/components/ui/input/input';
import { useNavigation } from '@/shared/hooks/navigation/use-navigation';

import CustomBottomSheet from './_shared/components/bank-bottom-sheet/bank-bottom-sheet';
import styles from './page.module.scss';

const BankAccountPage = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountNumberError, setAccountNumberError] = useState('');

  const navigation = useNavigation();

  // 바텀 시트 토글
  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  // 은행 선택 시 콜백
  const handleSelectBank = (bankName: string) => {
    setSelectedBank(bankName);
    setIsBottomSheetOpen(false);
  };

  // 계좌번호 입력 처리
  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const input = e.target.value;
    // 숫자만 필터링
    const filtered = input.replace(/\D/g, '');

    // 최대 16자리 제한
    if (filtered.length > 16) return;

    setAccountNumber(filtered);

    // 11자리 이상인지 검증
    if (filtered.length < 11) {
      setAccountNumberError('계좌번호는 최소 11자리 이상이어야 합니다.');
    } else {
      setAccountNumberError('');
    }
  };

  const handleNavigate = () => {
    navigation.navigate({
      pathname: `/bank-account`,
    });
  };

  return (
    <PageFrame
      appBar={{
        title: '계좌 추가',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <Input
            label="은행"
            placeholder="은행 선택"
            id="bank-select"
            value={selectedBank}
            readOnly
            onClick={() => setIsBottomSheetOpen(true)}
          />

          <Input
            label="계좌번호"
            placeholder="계좌번호 입력"
            id="account-number"
            value={accountNumber}
            onChange={handleAccountNumberChange}
          />
          {accountNumberError && (
            <p style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
              {accountNumberError}
            </p>
          )}
        </div>

        <Button
          variant="fill"
          onClick={handleNavigate}
          disabled={
            !!accountNumberError || !selectedBank || accountNumber.length === 0
          }
        >
          계좌 추가하기
        </Button>

        <CustomBottomSheet
          onClose={toggleBottomSheet}
          isOpen={isBottomSheetOpen}
          onSelectBank={handleSelectBank}
        />
      </div>
    </PageFrame>
  );
};

export default BankAccountPage;
