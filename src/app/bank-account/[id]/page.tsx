'use client';

import React, { use, useEffect, useState } from 'react';

import BankBottomSheet from '@/app/bank-account/_shared/components/bank-bottom-sheet/bank-bottom-sheet';
import { usePutBankAccout } from '@/app/bank-account/_shared/services/mutation';
import { useGetBankAccountList } from '@/app/bank-account/_shared/services/query';
import { PutBankAccountRequest } from '@/app/bank-account/_shared/services/type';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import Input from '@/shared/components/ui/input/input';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { useMember } from '@/shared/context/member-context';
import { useLocation } from '@/shared/hooks/navigation/use-location';
import { useNavigation } from '@/shared/hooks/navigation/use-navigation';
import { getBankCodeByName, getBankNameByCode } from '@/shared/utils/bank';

import styles from './page.module.scss';

interface EditPageProps {
  params: Promise<{ id: string }>;
}

const EditPage = ({ params }: EditPageProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedBankCode, setSelectedBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountNumberError, setAccountNumberError] = useState('');

  const { member } = useMember();
  const navigation = useNavigation();

  const { state } = useLocation<{ accountNumber: string; bankName: string }>();
  const { id: agentBankAccountId } = use(params);

  const { data: bankList } = useGetBankAccountList();
  const { mutate } = usePutBankAccout();

  // 기존 계좌 데이터 input에 세팅
  useEffect(() => {
    if (state) {
      setAccountNumber(state.accountNumber);
      const foundBankCode = getBankCodeByName(state.bankName);
      if (foundBankCode !== '미등록 은행') setSelectedBankCode(foundBankCode);
      return;
    }

    // 새로고침으로 state가 없어졌다면 목록재조회 -> id로 데이터찾기
    if (bankList && agentBankAccountId) {
      const target = bankList.find(
        (item) => item.agentBankAccountId === agentBankAccountId,
      );
      if (target) {
        setAccountNumber(target.agentAccountNumber);
        const foundBankCode = getBankCodeByName(target.bankName);
        if (foundBankCode !== '미등록 은행') setSelectedBankCode(foundBankCode);
      }
    }
  }, [state, bankList, agentBankAccountId]);

  // 바텀 시트 닫기
  const closeBottomSheet = () => setIsBottomSheetOpen(false);

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
    if (
      !agentBankAccountId ||
      !member?.name ||
      !selectedBankCode ||
      !accountNumber
    )
      return;

    const payload: PutBankAccountRequest = {
      agentBankAccountId: agentBankAccountId,
      bankCode: selectedBankCode,
      accountHolder: member.name,
      accountNumber,
    };

    mutate(payload as PutBankAccountRequest, {
      onSuccess: () => {
        navigation.navigate({ pathname: '/bank-account' });
        toastify({
          variant: 'success',
          description: '계좌 수정이 완료됐습니다.',
        });
      },
      onError: () => {
        toastify({
          variant: 'error',
          description: '계좌 수정을 실패했습니다.',
        });
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

        <BankBottomSheet
          onClose={closeBottomSheet}
          isOpen={isBottomSheetOpen}
          onSelectBank={handleSelectBank}
        />
      </div>
    </PageFrame>
  );
};

export default EditPage;
