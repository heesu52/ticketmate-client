'use client';

import React, { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import queryKey from '@/app/bank-account/_shared/services/query-key';
import { BankAccountResponse } from '@/app/bank-account/_shared/services/type';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import Input from '@/shared/components/ui/input/input';
import { useLocation } from '@/shared/hooks/navigation/use-location';
import { useNavigation } from '@/shared/hooks/navigation/use-navigation';

import CustomBottomSheet from './_shared/components/bank-bottom-sheet/bank-bottom-sheet';
import styles from './page.module.scss';

const BankAccountPage = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountNumberError, setAccountNumberError] = useState('');

  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { state } = useLocation<{ agentBankAccountId?: string }>();

  // id의 여부로 계좌 추가/수정 구분
  const isEditMode = Boolean(state?.agentBankAccountId);

  // 계좌 개별 데이터 가져오기
  const cachedList = queryClient.getQueryData<BankAccountResponse[]>(
    queryKey.getBankAccountList(),
  );
  const currentAccount = cachedList?.find(
    (acc) => acc.agentBankAccountId === state?.agentBankAccountId,
  );

  // 계좌 수정 시 기존 데이터 세팅
  useEffect(() => {
    if (currentAccount) {
      setSelectedBank(currentAccount.bankCode);
      setAccountNumber(currentAccount.accountNumber);
    }
  }, [currentAccount]);

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
    const input = e.target.value.replace(/\D/g, '');
    if (input.length > 16) return;

    setAccountNumber(input);
    setAccountNumberError(
      input.length < 11 ? '계좌번호는 최소 11자리 이상이어야 합니다.' : '',
    );
  };

  const handleSubmit = () => {
    if (isEditMode) {
      console.log('수정 API 호출', { selectedBank, accountNumber });
    } else {
      console.log('추가 API 호출', { selectedBank, accountNumber });
    }

    navigation.navigate({ pathname: '/bank-account' });
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
          onClick={handleSubmit}
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
