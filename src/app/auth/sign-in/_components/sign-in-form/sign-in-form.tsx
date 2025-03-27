'use client';

import { useCallback, useState } from 'react';

import { useForm } from 'react-hook-form';

import VisibilityIcon from '@/assets/icons/visibility.svg';
import PositiveButton from '@/shared/components/button/fill-button/fill-button';
import Input from '@/shared/components/input/input';

import styles from './sign-in-form.module.scss';

interface SignInFormData {
  email: string;
  password: string;
}

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
  };

  const [isClicked, setIsClicked] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setIsClicked((prev) => !prev);
  }, []);

  const errorMessage = errors.email?.message || errors.password?.message;

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.input_container}>
        <Input
          {...register('email', {
            required: '아이디(이메일)이나 비밀번호를 확인해주세요.',
          })}
          placeholder="아이디"
          label="아이디"
          id="email"
          type="email"
        />

        <Input
          {...register('password', {
            required: '아이디(이메일)이나 비밀번호를 확인해주세요.',
          })}
          placeholder="비밀번호"
          label="비밀번호"
          id="password"
          type={isClicked ? 'text' : 'password'}
          iconProps={{
            icon: (
              <VisibilityIcon
                width={16}
                height={16}
                fill={isClicked ? 'red' : 'var(--gray-4)'}
              />
            ),
            onIconClick: togglePasswordVisibility,
          }}
        />

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>

      <div className={styles.button_container}>
        <PositiveButton label="로그인" type="submit" />
      </div>
    </form>
  );
};

export default SignInForm;
