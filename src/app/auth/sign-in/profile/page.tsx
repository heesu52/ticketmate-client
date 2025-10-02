'use client';

import React, { useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useUpdateProfile } from '@/app/auth/sign-in/profile/_shared/services/mutation';
import { PlusIcon } from '@/assets/icons';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import Input from '@/shared/components/ui/input/input';
import Spacer from '@/shared/components/ui/spacer/spacer';
import { toastify } from '@/shared/components/ui/toast/toastify';

import styles from './page.module.scss';

const ProfilePage = () => {
  const router = useRouter();

  const updateProfile = useUpdateProfile();

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [nickname, setNickname] = useState('');
  const profileImageInputRef = useRef<HTMLInputElement>(null);

  // 닉네임 유효성 검사
  const validateNickname = (value: string) => {
    if (!value.trim()) {
      toastify({ variant: 'error', description: '닉네임을 입력해주세요.' });
      return false;
    }
    if (value.length < 2) {
      toastify({
        variant: 'error',
        description: '닉네임은 최소 2자 이상이어야 합니다.',
      });
      return false;
    }
    if (value.length > 12) {
      toastify({
        variant: 'error',
        description: '닉네임은 최대 12자까지 가능합니다.',
      });
      return false;
    }
    // 특수문자 검사 (한글, 영문, 숫자만 허용)
    const specialCharRegex = /[^\wㄱ-ㅣ가-힣]/;
    if (specialCharRegex.test(value)) {
      toastify({
        variant: 'error',
        description: '닉네임에는 특수문자를 사용할 수 없습니다.',
      });
      return false;
    }

    return true;
  };

  // 프로필 이미지 업로드 처리
  const handleProfileImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  // 닉네임 변경 처리
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
  };

  const handleSubmit = () => {
    const isValid = validateNickname(nickname);

    if (!isValid) {
      return;
    }

    const request = {
      nickname,
      profileImg: profileImage || undefined,
    };

    updateProfile
      .mutateAsync(request)
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        toastify({
          variant: 'error',
          description: error.errorMessage || '회원 정보 수정에 실패했습니다.',
        });
      });
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
                  src={URL.createObjectURL(profileImage)}
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
              onChange={handleNicknameChange}
              id="nickname"
              label="닉네임"
              placeholder="2-12자, 특수문자 제외"
            />
          </div>
        </div>

        <Button variant="fill" onClick={handleSubmit}>
          시작하기
        </Button>
      </div>
    </PageFrame>
  );
};

export default ProfilePage;
