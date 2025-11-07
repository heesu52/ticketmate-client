'use client';

import React, { useState } from 'react';

import CustomBottomSheet from '@/app/bank-account/_shared/components/bank-bottom-sheet/bank-bottom-sheet';
import { useCreateBankAccout } from '@/app/bank-account/_shared/services/mutation';
import { CreateBankAccountRequest } from '@/app/bank-account/_shared/services/type';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import Input from '@/shared/components/ui/input/input';
import { useMember } from '@/shared/context/member-context';
import { useNavigation } from '@/shared/hooks/navigation/use-navigation';
import { getBankNameByCode } from '@/shared/utils/bank';

import styles from './page.module.scss';

const NewPage = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedBankCode, setSelectedBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountNumberError, setAccountNumberError] = useState('');

  const { member } = useMember();
  const navigation = useNavigation();
  const createMutation = useCreateBankAccout();

  // 바텀 시트 토글
  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  // 은행 선택 시 (은행코드)
  const handleSelectBank = (bankCode: string) => {
    setSelectedBankCode(bankCode);
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

  const handleSubmit = () => {
    if (!member?.name || !selectedBankCode || !accountNumber) return;

    const payload: CreateBankAccountRequest = {
      bankCode: selectedBankCode,
      accountHolder: member.name,
      accountNumber,
      primaryAccount: false, // 일단 지정해놓은 대표계좌가 있을테니 무조건 false로 넣음
    };

    createMutation.mutate(payload as CreateBankAccountRequest, {
      onSuccess: () => {
        navigation.navigate({ pathname: '/bank-account' });
      },
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
            value={selectedBankCode ? getBankNameByCode(selectedBankCode) : ''}
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
            <span className={styles.errormessage}>{accountNumberError}</span>
          )}
        </div>
        <Button
          variant="fill"
          onClick={handleSubmit}
          disabled={
            !!accountNumberError ||
            !selectedBankCode ||
            accountNumber.length === 0
          }
        >
          추가하기
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

export default NewPage;
