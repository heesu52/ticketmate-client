'use client';
import React from 'react';

import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import Spacer from '@/shared/components/ui/spacer/spacer';
import Textarea from '@/shared/components/ui/textarea/textarea';

import styles from './page.module.scss';

export default function BioPage() {
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
            // value={introduction}
            // onChange={handleIntroductionChange}
            id="bio"
            placeholder="의뢰인에게 보여줄 공연 한 줄 소개를 작성하세요."
            style={{ height: '140px' }}
          />
          <Button variant="fill">저장하기</Button>
        </div>
        <Spacer size={20} />
      </div>
    </PageFrame>
  );
}
