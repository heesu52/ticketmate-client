'use client';

import React, { useState } from 'react';

import DeleteAccountModal from '@/app/my/setting/account/delete/_shared/components/delete-account-modal/delete-account-modal';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import InformationBanner from '@/shared/components/ui/banner/information-banner/information-banner';
import Button from '@/shared/components/ui/button/button';
import Checkbox from '@/shared/components/ui/checkbox/checkbox';
import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import { Radio, RadioGroup } from '@/shared/components/ui/radio/radio';
import { RadioOption } from '@/shared/components/ui/radio/radio.type';
import Spacer from '@/shared/components/ui/spacer/spacer';

import styles from './page.module.scss';

const AccountDeletePage = () => {
  const { open } = useModalStore();

  const radioOptions = [
    { value: 'reason1', label: '찾는 공연이 없어요' },
    { value: 'reason2', label: '비매너 사용자를 만났어요' },
    { value: 'reason3', label: '억울하게 이용이 제한됐어요' },
    { value: 'reason4', label: '새 계정을 만들고 싶어요' },
    { value: 'reason5', label: '개인정보를 삭제하고 싶어요' },
    { value: 'reason6', label: '기타', type: 'input' },
  ];

  const [reason, setReason] = useState<string>('reason1');
  const [reasonInput, setReasonInput] = useState<string>('');

  const [isChecked, setIsChecked] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      const result = await open('delete-account-modal', DeleteAccountModal);

      if (result) {
        // TODO: 탈퇴하기 로직
        console.log('reason', reason);
        console.log('reasonInput', reasonInput);
        console.log('isChecked', isChecked);
        console.log('탈퇴하기');
      }
    } catch (error) {
      // TODO: 탈퇴 취소 로직
      console.log('탈퇴 취소');
    }
  };

  return (
    <PageFrame
      appBar={{
        title: '탈퇴하기',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        <div className={styles.title}>사유를 선택해주세요.</div>

        <Spacer size={16} />

        <RadioGroup
          name="reason"
          ariaLabel="reason"
          value={reason}
          onValueChange={(value) => setReason(value)}
          inputValue={reasonInput}
          onInputChange={(value) => setReasonInput(value)}
        >
          {radioOptions.map((option) => (
            <React.Fragment key={option.value}>
              <Radio option={option as RadioOption} />
              {option.value === 'reason3' && reason === 'reason3' && (
                <InformationBanner
                  type="link"
                  variant="info"
                  title="억울하게 이용 제한됐나요?"
                  description="탈퇴전 고객센터에 문의주시면 빠르게 해결해드리겠습니다."
                />
              )}
            </React.Fragment>
          ))}
        </RadioGroup>

        <Checkbox
          id="checkbox"
          label="계정을 탈퇴하면 의뢰내역, 팔로우한 대리인 등 모든 정보가 삭제됩니다. 계정 삭제 후 30일간 다시 가입할 수 없어요."
          checked={isChecked}
          align="left"
          onChange={(e) => setIsChecked(e.target.checked)}
        />

        <Spacer size={12} />

        <Button
          variant="fill"
          color="default"
          disabled={!isChecked}
          onClick={handleDeleteAccount}
        >
          탈퇴하기
        </Button>
      </div>
    </PageFrame>
  );
};

export default AccountDeletePage;
