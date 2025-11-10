'use client';
import React, { use, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useCreateAgentAvailabilityMutation } from '@/app/my/application/_shared/services/mutation';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import Spacer from '@/shared/components/ui/spacer/spacer';
import Textarea from '@/shared/components/ui/textarea/textarea';
import { toastify } from '@/shared/components/ui/toast/toastify';

import styles from './page.module.scss';

interface BioPageProps {
  params: Promise<{ id: string }>;
}

export default function BioPage({ params }: BioPageProps) {
  const { id: concertId } = use(params);

  const [introduction, setIntroduction] = useState('');
  const router = useRouter();
  const { mutate } = useCreateAgentAvailabilityMutation();

  // 한 줄 소개 변경
  const handleIntroductionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setIntroduction(e.target.value);
  };

  // 저장 버튼 클릭
  const handleSubmit = () => {
    const requestData = {
      concertId,
      introduction,
    };

    mutate(requestData, {
      onSuccess: () => {
        toastify({
          variant: 'success',
          description: '한 줄 소개 작성이 완료됐습니다',
        });
        router.push('/my/application');
      },
      onError: () => {
        toastify({
          variant: 'error',
          description: '한 줄 소개 작성에 실패됐습니다',
        });
      },
    });
  };

  return (
    <PageFrame
      appBar={{
        title: '한 줄 소개 관리',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        <span className={styles.title}>한 줄 소개</span>

        <div className={styles.content}>
          <Textarea
            value={introduction}
            onChange={handleIntroductionChange}
            id="bio"
            placeholder="의뢰인에게 보여줄 공연 한 줄 소개를 작성하세요."
            style={{ height: '200px' }}
          />
          <Button variant="fill" onClick={handleSubmit}>
            저장하기
          </Button>
        </div>
        <Spacer size={20} />
      </div>
    </PageFrame>
  );
}
