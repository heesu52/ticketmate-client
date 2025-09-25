'use client';

import { useState } from 'react';

import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import { Radio, RadioGroup } from '@/shared/components/ui/radio/radio';

import styles from './page.module.scss';

const LanguagePage = () => {
  const [language, setLanguage] = useState<'ko' | 'en' | 'ja' | 'cn'>('ko');

  return (
    <PageFrame
      appBar={{
        title: '언어 설정',
        showBack: true,
      }}
    >
      <div className={styles.container}>
        <RadioGroup
          name="language"
          ariaLabel="language"
          value={language}
          onValueChange={(value) => {
            setLanguage(value as 'ko' | 'en' | 'ja' | 'cn');
          }}
        >
          <Radio option={{ value: 'ko', label: '한국어' }} />
          <Radio option={{ value: 'en', label: 'English' }} />
          <Radio option={{ value: 'ja', label: '日本語' }} />
          <Radio option={{ value: 'cn', label: '中文' }} />
        </RadioGroup>
      </div>
    </PageFrame>
  );
};

export default LanguagePage;
