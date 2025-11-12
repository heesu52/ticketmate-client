'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import DeleteAccountModal from '@/app/my/setting/account/delete/_shared/components/delete-account-modal/delete-account-modal';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import InformationBanner from '@/shared/components/ui/banner/information-banner/information-banner';
import Button from '@/shared/components/ui/button/button';
import Checkbox from '@/shared/components/ui/checkbox/checkbox';
import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import { Radio, RadioGroup } from '@/shared/components/ui/radio/radio';
import { RadioOption } from '@/shared/components/ui/radio/radio.type';
import Spacer from '@/shared/components/ui/spacer/spacer';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { WITHDRAWAL_REASON_LABEL_MAP } from '@/shared/constants/type-mapping';
import { useHandleError } from '@/shared/hooks/use-error';

import styles from './page.module.scss';

const AccountDeletePage = () => {
  const { open } = useModalStore();
  const { handleError } = useHandleError();
  const router = useRouter();

  const radioOptions: RadioOption[] = [
    {
      value: 'NO_CONCERTS',
      label: WITHDRAWAL_REASON_LABEL_MAP.NO_CONCERTS,
    },
    {
      value: 'RUDE_USER',
      label: WITHDRAWAL_REASON_LABEL_MAP.RUDE_USER,
    },
    {
      value: 'UNFAIR_RESTRICTION',
      label: WITHDRAWAL_REASON_LABEL_MAP.UNFAIR_RESTRICTION,
    },
    {
      value: 'WANT_NEW_ACCOUNT',
      label: WITHDRAWAL_REASON_LABEL_MAP.WANT_NEW_ACCOUNT,
    },
    {
      value: 'DELETE_PERSONAL_DATA',
      label: WITHDRAWAL_REASON_LABEL_MAP.DELETE_PERSONAL_DATA,
    },
    {
      value: 'OTHER',
      label: WITHDRAWAL_REASON_LABEL_MAP.OTHER,
      type: 'input',
    },
  ];

  const [reason, setReason] = useState<string>('');
  const [reasonInput, setReasonInput] = useState<string>('');

  const [isChecked, setIsChecked] = useState(false);
  const [isConfirmStep, setIsConfirmStep] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      const result = await open('delete-account-modal', DeleteAccountModal);

      if (result) {
        toastify({
          variant: 'success',
          description: '회원 탈퇴가 되었어요. 다음에 또 만나요',
        });
        router.push('/auth/sign-in');
      }
    } catch (error) {
      handleError(error);
    }
  };

  // 다음단계 클릭 시
  const handleNextStep = () => {
    if (!reason) return;
    setIsConfirmStep(true);
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
        {!isConfirmStep && (
          <>
            <div className={styles.title}>
              의문의 의뢰인님 저희를 떠나는 이유가 있나요?
            </div>
            <Spacer size={20} />
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
                  {option.value === 'UNFAIR_RESTRICTION' &&
                    reason === 'UNFAIR_RESTRICTION' && (
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
          </>
        )}

        {isConfirmStep && (
          <>
            <div className={styles.title}>
              탈퇴하기 전 확인해야 할 내용들이 있어요
            </div>
            <Spacer size={20} />
            <div className={styles.notice}>
              <span className={styles.notice_title}>회원 탈퇴 시 유의사항</span>
              <span className={styles.notice_text}>
                · 회원 탈퇴 시 의뢰내역, 팔로우한 대리인 등 모든 정보가
                삭제됩니다. 또한, 계정 삭제 후 30일간 다시 가입할 수 없습니다.
              </span>

              <span className={styles.notice_title}>정보 보관 동의</span>
              <span className={styles.notice_text}>
                · 부정 이용 방지를 위해 탈퇴 후 30일간 암호화된 식별
                정보(전화번호)를 보관하여 재가입을 통한 혜택 중복 수령을
                방지하는 것에 동의합니다.
                <br />· 전자 상거래 등에서의 소비자 보호 법률 규정에 따라 기록
                보관은 법률 의한 경우 외 다른 목적으로 이용되지 않습니다.
              </span>
            </div>
            <Checkbox
              id="checkbox"
              label="위 유의사항을 확인하였으며, 내용에 모두 동의합니다."
              checked={isChecked}
              align="left"
              onChange={(e) => setIsChecked(e.target.checked)}
            />
          </>
        )}

        <Spacer size={40} />

        <div className={styles.button}>
          <Button
            variant="outline"
            color="gray"
            onClick={() => console.log('더 사용할래요 클릭')}
          >
            더 사용할래요
          </Button>

          {!isConfirmStep && (
            <Button
              variant="fill"
              color="default"
              disabled={!reason}
              onClick={handleNextStep}
            >
              다음단계
            </Button>
          )}

          {isConfirmStep && (
            <Button
              variant="fill"
              color="default"
              disabled={!isChecked}
              onClick={handleDeleteAccount}
            >
              탈퇴하기
            </Button>
          )}
        </div>
      </div>
    </PageFrame>
  );
};

export default AccountDeletePage;
