'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  usePostSendVerificationCode,
  usePostVerifyVerificationCode,
} from '@/app/auth/sign-in/verification/_shared/services/mutation';
import { HttpClientError } from '@/lib/http-client/http-client.type';
import { toast } from '@/lib/toast/toast';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import Input from '@/shared/components/ui/input/input';
import Spacer from '@/shared/components/ui/spacer/spacer';

import styles from './page.module.scss';

const VerificationPage = () => {
  const router = useRouter();

  const sendVerificationCodeMutation = usePostSendVerificationCode();
  const verifyVerificationCodeMutation = usePostVerifyVerificationCode();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호 발송 여부

  // 인증번호 입력 길이 제한 (6자리)
  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setVerificationCode(value);
    }
  };

  // 인증번호 발송
  const handleCodeSend = () => {
    sendVerificationCodeMutation
      .mutateAsync({ phoneNumber })
      .then((res) => {
        if (res) {
          if (isCodeSent) {
            toast({
              variant: 'info',
              description: '인증번호가 재발송되었습니다.',
            });
          } else {
            toast({
              variant: 'info',
              description: '인증번호가 발송되었습니다.',
            });
            setIsCodeSent(true);
          }
        }
      })
      .catch((err: HttpClientError) => {
        toast({
          variant: 'error',
          description: err.errorMessage,
        });
      });
  };

  // 인증번호 검증
  const handleVerifyCode = () => {
    verifyVerificationCodeMutation
      .mutateAsync({
        phoneNumber,
        code: verificationCode,
      })
      .then((res) => {
        router.push('/auth/sign-in/profile');
      })
      .catch((err) => {
        toast({
          variant: 'error',
          description: err.errorMessage,
        });
      });
  };

  return (
    <PageFrame
      appBar={{
        title: '본인인증',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        <div className={styles.title}>본인인증</div>

        <Spacer size={16} />

        <div className={styles.description}>
          본 서비스는 안전한 거래를 위해
          <br />
          휴대전화를 통한 본인인증을 진행하고있습니다.
          <br />
          <br />
          관련 정보는 본인인증 외 사용되지 않습니다.
        </div>

        <div className={styles.input_container}>
          <Input
            type="number"
            placeholder="- 없이 입력해주세요."
            id="phoneNumber"
            label="휴대전화번호"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ width: '100%' }}
          />

          <Input
            type="number"
            placeholder="인증번호 입력해주세요."
            id="verificationCode"
            label="인증번호"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            disabled={!isCodeSent}
          />
        </div>

        <Spacer size={20} />

        <div className={styles.button_container}>
          <Button
            variant="outline"
            color="gray"
            disabled={!phoneNumber}
            onClick={handleCodeSend}
          >
            {isCodeSent ? '재발송' : '인증번호 발송'}
          </Button>
          <Button
            variant="fill"
            disabled={!isCodeSent || !phoneNumber || !verificationCode}
            onClick={handleVerifyCode}
          >
            인증하기
          </Button>
        </div>
      </div>
    </PageFrame>
  );
};

export default VerificationPage;
