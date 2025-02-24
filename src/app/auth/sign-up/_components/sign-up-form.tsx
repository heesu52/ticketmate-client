'use client';

import { useCallback, useState } from 'react';

import { useForm } from 'react-hook-form';

import VisibilityIcon from '@/assets/icons/visibility.svg';
import PositiveButton from '@/shared/components/button/positive-button/positive-button';
import Input from '@/shared/components/input/input';

import styles from './sign-up-form.module.scss';

interface SignUpFormData {
  username: string;
  phone: string;
  birth: number;
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
}

const SignUpForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCheckPasswordVisible, setIsCheckPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
  };

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const toggleCheckPasswordVisibility = useCallback(() => {
    setIsCheckPasswordVisible((prev) => !prev);
  }, []);

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form_content}>
        <div className={styles.bundle}>
          <div className={styles.form_item}>
            <span className={styles.item_title}>이름</span>
            <Input
              {...register('username')}
              placeholder="이름을 입력해주세요."
              label="이름"
              id="username"
              type="text"
            />
          </div>

          <div className={styles.form_item}>
            <span className={styles.item_title}>전화번호</span>
            <div className={styles.item_content}>
              <div className={styles.with_button}>
                <Input
                  {...register('phone')}
                  placeholder="-없이 입력해주세요."
                  label="전화번호"
                  id="phone"
                  type="tel"
                />
                <PositiveButton label="인증번호 받기" />
              </div>
              <div className={styles.with_button}>
                <Input
                  placeholder="인증번호 입력"
                  label="인증번호"
                  id="verification"
                  type="text"
                />
                <PositiveButton label="인증" />
              </div>
            </div>
          </div>

          <div className={styles.form_item}>
            <span className={styles.item_title}>생년월일</span>
            <Input
              {...register('birth')}
              placeholder="숫자 6자리"
              label="생년월일"
              id="birth"
              type="text"
            />
          </div>
        </div>

        <div className={styles.bundle}>
          <div className={styles.form_item}>
            <span className={styles.item_title}>아이디</span>
            <Input
              {...register('email')}
              placeholder="email@email.com"
              label="아이디"
              id="email"
              type="email"
            />
          </div>

          <div className={styles.form_item}>
            <span className={styles.item_title}>비밀번호</span>
            <div className={styles.item_content}>
              <Input
                {...register('password')}
                placeholder="비밀번호"
                label="비밀번호"
                id="password"
                type={isPasswordVisible ? 'text' : 'password'}
                iconProps={{
                  icon: (
                    <VisibilityIcon
                      width={16}
                      height={16}
                      fill={
                        isPasswordVisible
                          ? 'var(--brand-main)'
                          : 'var(--gray-4)'
                      }
                    />
                  ),
                  onIconClick: togglePasswordVisibility,
                }}
              />

              <Input
                {...register('checkPassword')}
                placeholder="비밀번호를 다시 입력해주세요."
                label="비밀번호 확인"
                id="checkPassword"
                type={isCheckPasswordVisible ? 'text' : 'password'}
                iconProps={{
                  icon: (
                    <VisibilityIcon
                      width={16}
                      height={16}
                      fill={
                        isCheckPasswordVisible
                          ? 'var(--brand-main)'
                          : 'var(--gray-4)'
                      }
                    />
                  ),
                  onIconClick: toggleCheckPasswordVisibility,
                }}
              />
            </div>
          </div>

          <div className={styles.form_item}>
            <span className={styles.item_title}>닉네임</span>
            <Input
              placeholder="사용하실 닉네임을 입력해주세요."
              label="닉네임"
              id="nickname"
              type="text"
            />
          </div>
        </div>
      </div>

      <div className={styles.form_button}>
        <PositiveButton label="회원가입" type="submit" size="large" />
      </div>
    </form>
  );
};

export default SignUpForm;
