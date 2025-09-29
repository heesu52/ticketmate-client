'use client';

import { useState } from 'react';

import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import Input from '@/shared/components/ui/input/input';
import Spacer from '@/shared/components/ui/spacer/spacer';

import styles from './page.module.scss';

const VerificationPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

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
          본 서비스는 안전한 거래를 위해 휴대전화를 통한 본인인증을
          진행하고있습니다.
          <br />
          <br />
          관련 정보는 본인인증 외 사용되지 않습니다.
        </div>
        <div className={styles.input_container}>
          <div className={styles.phone_number_container}>
            <Input
              placeholder="- 없이 입력해주세요."
              id="phoneNumber"
              label="휴대전화번호"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{ width: '100%' }}
            />
            <Button variant="outline" color="gray">
              인증번호 발송
            </Button>
          </div>

          <Input
            placeholder="인증번호 입력해주세요."
            id="verificationCode"
            label="인증번호"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </div>

        <Spacer size={20} />

        <Button variant="fill">인증하기</Button>
      </div>
    </PageFrame>
  );
};

export default VerificationPage;
