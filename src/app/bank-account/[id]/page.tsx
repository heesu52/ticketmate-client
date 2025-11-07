'use client';

import React, { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import CustomBottomSheet from '@/app/bank-account/[id]/_shared/components/bank-bottom-sheet/bank-bottom-sheet';
import {
  useCreateBankAccout,
  usePutBankAccout,
} from '@/app/bank-account/_shared/services/mutation';
import queryKey from '@/app/bank-account/_shared/services/query-key';
import {
  BankAccountResponse,
  CreateBankAccountRequest,
  PutBankAccountRequest,
} from '@/app/bank-account/_shared/services/type';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import Input from '@/shared/components/ui/input/input';
import { useMember } from '@/shared/context/member-context';
import { useLocation } from '@/shared/hooks/navigation/use-location';
import { useNavigation } from '@/shared/hooks/navigation/use-navigation';
import { bankInfoMap, getBankNameByCode } from '@/shared/utils/bank';

import styles from './page.module.scss';

const BankAccountPage = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedBankCode, setSelectedBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountNumberError, setAccountNumberError] = useState('');

  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { state } = useLocation<{ agentBankAccountId?: string }>();

  const createMutation = useCreateBankAccout();
  const updateMutation = usePutBankAccout();

  const { member } = useMember();

  // 수정 모드 여부
  const isEditMode = Boolean(state?.agentBankAccountId);

  // 캐시된 계좌 리스트 -> 계좌 개별정보 가져오기
  const cachedList = queryClient.getQueryData<BankAccountResponse[]>(
    queryKey.getBankAccountList(),
  );
  const currentAccount = cachedList?.find(
    (acc) => acc.agentBankAccountId === state?.agentBankAccountId,
  );

  // 기존 데이터 세팅
  useEffect(() => {
    if (currentAccount) {
      // 은행이름에서 은행코드로 변환
      const foundCode = Object.entries(bankInfoMap).find(
        ([, value]) => value.name === currentAccount.bankName,
      )?.[0];

      if (foundCode) {
        setSelectedBankCode(foundCode);
      }

      setAccountNumber(currentAccount.agentAccountNumber);
    }
  }, [currentAccount]);

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

    const payload: CreateBankAccountRequest | PutBankAccountRequest = {
      bankCode: selectedBankCode,
      accountHolder: member.name,
      accountNumber,
      primaryAccount: false, // 일단 지정해놓은 대표계좌가 있을테니 무조건 false로 넣음
    };

    if (isEditMode && state?.agentBankAccountId) {
      // 수정
      updateMutation.mutate(
        { agentBankAccountId: state.agentBankAccountId, ...payload },
        {
          onSuccess: () => {
            navigation.navigate({ pathname: '/bank-account' });
          },
        },
      );
    } else {
      // 신규 등록
      createMutation.mutate(payload as CreateBankAccountRequest, {
        onSuccess: () => {
          navigation.navigate({ pathname: '/bank-account' });
        },
      });
    }
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

export default BankAccountPage;
