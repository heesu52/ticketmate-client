'use client';

import React, { useState, useRef, useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { NoRegisterImage } from '@/assets/images';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import Input from '@/shared/components/ui/input/input';
import Spacer from '@/shared/components/ui/spacer/spacer';
import Textarea from '@/shared/components/ui/textarea/textarea';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { useUpdateProfile } from '@/shared/services/member/mutation';
import { useGetMember } from '@/shared/services/member/query';

import styles from './page.module.scss';

const ProfilePage = () => {
  const router = useRouter();

  const { data: member } = useGetMember();
  const updateProfile = useUpdateProfile();

  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 닉네임 변경 처리
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
  };

  // 한 줄 소개 변경 처리
  const handleIntroductionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    setIntroduction(value);
  };

  // 프로필 이미지 변경 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      setProfileImageUrl(URL.createObjectURL(file));
    }
  };

  // 프로필 이미지 클릭 처리
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 저장 버튼 클릭 처리
  const handleSubmit = () => {
    if (!nickname.trim()) {
      toastify({
        variant: 'error',
        description: '닉네임을 입력해주세요.',
      });
      return false;
    } else if (nickname.length < 2) {
      toastify({
        variant: 'error',
        description: '닉네임은 최소 2자 이상이어야 합니다.',
      });
      return false;
    } else if (nickname.length > 12) {
      toastify({
        variant: 'error',
        description: '닉네임은 최대 12자까지 가능합니다.',
      });
      return false;
    }
    // 특수문자 검사 (한글, 영문, 숫자만 허용)
    const specialCharRegex = /[^a-zA-Z0-9ㄱ-ㅣ가-힣]/;

    if (specialCharRegex.test(nickname)) {
      toastify({
        variant: 'error',
        description: '닉네임에는 특수문자를 사용할 수 없습니다.',
      });
      return false;
    }

    const request = {
      nickname,
      profileImg: profileImageFile || undefined,
      introduction: introduction || undefined,
    };

    updateProfile
      .mutateAsync(request)
      .then(() => {
        toastify({
          variant: 'success',
          description: '회원 정보 수정에 성공했습니다.',
        });
        router.back();
      })
      .catch((error) => {
        toastify({
          variant: 'error',
          description: error.errorMessage || '회원 정보 수정에 실패했습니다.',
        });
      });
  };

  useEffect(() => {
    if (member) {
      setNickname(member.nickname);
      setIntroduction(member.introduction);
      setProfileImageUrl(member.profileUrl || null);
    }
  }, [member]);

  return (
    <PageFrame
      appBar={{ title: '프로필 편집', showBack: true }}
      bottomNav={false}
    >
      <div className={styles.container}>
        <div className={styles.profile_image_wrapper}>
          <Image
            src={profileImageUrl || NoRegisterImage}
            alt="프로필 이미지"
            className={styles.profile_image}
            width={81}
            height={81}
          />
          <button
            className={styles.change_image_button}
            onClick={handleImageClick}
          >
            사진 변경하기
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        <Spacer size={40} />

        <div className={styles.wrapper}>
          <div className={styles.label}>닉네임</div>
          <div className={styles.content}>
            <Input
              value={nickname}
              onChange={handleNicknameChange}
              id="nickname"
              label="닉네임"
              placeholder="2-12자, 특수문자 제외"
            />
          </div>
        </div>

        <Spacer size={32} />

        <div className={styles.wrapper}>
          <div className={styles.label}>한 줄 소개</div>
          <div className={styles.content}>
            <Textarea
              value={introduction}
              onChange={handleIntroductionChange}
              id="introduction"
              placeholder="본인을 소개할 한 줄을 작성해주세요."
              style={{ height: '200px' }}
            />
          </div>
        </div>

        <div className={styles.button_container}>
          <Button variant="fill" onClick={handleSubmit}>
            저장하기
          </Button>
        </div>
      </div>
    </PageFrame>
  );
};

export default ProfilePage;
