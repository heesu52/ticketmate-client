'use client';

import React, { useState } from 'react';

import Input from '@/shared/components/ui/input/input';
import ModalTemplate from '@/shared/components/ui/modal/modal-template/modal-template';
import { ModalTemplateType } from '@/shared/components/ui/modal/modal-template/modal-template.type';

interface InputModalProps extends Omit<ModalTemplateType, 'children'> {
  placeholder?: string;
  initialValue?: string;
}

/**
 * @description 입력 필드가 포함된 모달 컴포넌트
 * @param title 모달 제목
 * @param description 모달 설명
 * @param placeholder 입력 필드 플레이스홀더
 * @param initialValue 초기 입력값
 * @param firstButtonLabel 취소 버튼 텍스트 (기본: '취소')
 * @param secondButtonLabel 확인 버튼 텍스트 (기본: '확인')
 */
const InputModal = ({
  title,
  description,
  placeholder = '입력해주세요',
  initialValue = '',
  firstButtonLabel = '취소',
  onResolve,
  onReject,
}: InputModalProps) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleFirstButtonClick = () => {
    onReject?.();
  };

  const handleSecondButtonClick = () => {
    onResolve?.({
      inputValue,
      test: 'hi',
    });
  };

  return (
    <ModalTemplate
      title={title}
      description={description}
      firstButtonLabel={firstButtonLabel}
      onFirstButtonClick={handleFirstButtonClick}
      onSecondButtonClick={handleSecondButtonClick}
    >
      <div style={{ marginTop: '16px' }}>
        <Input
          id="modal-input"
          label=""
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          autoFocus
        />
      </div>
    </ModalTemplate>
  );
};

export default InputModal;
