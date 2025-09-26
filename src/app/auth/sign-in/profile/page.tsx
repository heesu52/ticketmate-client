'use client';

import React, { useRef, useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import { PlusIcon } from '@/assets/icons';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import Input from '@/shared/components/ui/input/input';
import Spacer from '@/shared/components/ui/spacer/spacer';

import styles from './page.module.scss';

const cn = classNames.bind(styles);

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
  const profileImageInputRef = useRef<HTMLInputElement>(null);

  const handleProfileImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <PageFrame
      appBar={{ title: '프로필 설정', showBack: true }}
      bottomNav={false}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            {'티켓메이트에서 사용할\n닉네임과 프로필 사진을 정해주세요!'}
          </div>

          <Spacer size={20} />

          <div className={styles.profile_image_container}>
            <input
              ref={profileImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfileImageUpload}
              style={{ display: 'none' }}
            />

            <button
              className={styles.profile_image_button}
              data-has-image={!!profileImage}
              onClick={() => profileImageInputRef.current?.click()}
            >
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="profile"
                  width={52}
                  height={52}
                />
              ) : (
                <PlusIcon width={16} height={16} fill="var(--grayscale-700)" />
              )}
            </button>

            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              id="nickname"
              label="닉네임"
            />
          </div>
        </div>

        <Button variant="fill">시작하기</Button>
      </div>
    </PageFrame>
  );
};

export default ProfilePage;
