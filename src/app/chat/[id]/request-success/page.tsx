'use client';

import React, { useCallback, useRef, useState } from 'react';

import ChangeBankBottomSheet from '@/app/chat/[id]/request-success/_shared/components/change-bank-bottom-sheet/change-bank-bottom-sheet';
import SendRequestSuccessModal from '@/app/chat/[id]/request-success/_shared/components/send-request-success-modal/send-request-success-modal';
import { ArrowRightIcon } from '@/assets/icons';
import BankAccountInfoCard from '@/shared/components/features/bank/bank-account-info-card/bank-account-info-card';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import UploadedImage from '@/shared/components/ui/image/uploaded-image/uploaded-image';
import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import Spacer from '@/shared/components/ui/spacer/spacer';
import Textarea from '@/shared/components/ui/textarea/textarea';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { BankAccountInfo, BankCode } from '@/shared/types';

import styles from './page.module.scss';

// TODO: 의뢰 성공 요청 관련 API 추가 예정
const RequestSuccessPage = () => {
  const { open } = useModalStore();
  // 예매 성공 내역 사진 상태 관리
  const [successPhotos, setSuccessPhotos] = useState<File[]>([]);
  const successPhotoInputRef = useRef<HTMLInputElement>(null);

  // 상세 설명 상태 관리
  const [description, setDescription] = useState('');

  // 입금 계좌 정보 (나중에 API로 가져올 예정)
  const [registeredAccount] = useState<BankAccountInfo | null>({
    agentBankAccountId: '1234567890',
    agentAccountNumber: '1234567890',
    bankCode: BankCode.KOOKMIN,
    primaryAccount: true,
    accountHolder: '홍길동',
  });

  // 계좌 변경 바텀 시트 상태 관리
  const [isChangeBankBottomSheetOpen, setIsChangeBankBottomSheetOpen] =
    useState(false);

  // 파일을 ObjectURL로 변환하는 함수
  const toObjectURL = useCallback((file: File) => {
    return URL.createObjectURL(file);
  }, []);

  // 사진 업로드 핸들러
  const handleUploadPhoto = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
    maxCount: number,
  ) => {
    const fileList = e.currentTarget.files;

    if (!fileList || fileList.length === 0) return;

    const incoming = Array.from(fileList);

    // 초과 발생 여부 플래그
    let overflow = false;

    setFiles((prev) => {
      // 중복 제거(이름+사이즈+mtime 기준)
      const seen = new Set(
        prev.map((f) => `${f.name}_${f.size}_${f.lastModified}`),
      );
      const dedupIncoming: File[] = [];
      for (const f of incoming) {
        const key = `${f.name}_${f.size}_${f.lastModified}`;
        if (!seen.has(key)) {
          dedupIncoming.push(f);
          seen.add(key);
        }
      }

      const available = Math.max(0, maxCount - prev.length);
      const willAdd = dedupIncoming.slice(0, available);
      // 초과 판단 (중복 제거 후에도 남은 파일이 available보다 많았는지)
      overflow = dedupIncoming.length > available;

      return [...prev, ...willAdd];
    });

    // 초과 시 토스트 메시지 표시
    if (overflow) {
      toastify({
        variant: 'error',
        description: `최대 ${maxCount}장까지만 선택할 수 있습니다.`,
      });
    }
  };

  // 사진 제거 핸들러
  const handleRemovePhoto = (
    index: number,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
  ) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // 상세 설명 변경 핸들러
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  // 계좌 변경하기 핸들러 (나중에 구현)
  const handleChangeAccount = () => {
    setIsChangeBankBottomSheetOpen(true);
  };

  // 계좌 등록하기 핸들러 (나중에 구현)
  const handleRegisterAccount = () => {
    // TODO: 계좌 등록 페이지로 이동
    console.log('계좌 등록하기');
  };

  // 의뢰 성공 버튼 클릭 핸들러 (나중에 구현)
  const handleRequestSuccess = () => {
    open('send-request-success-modal', SendRequestSuccessModal);
  };

  // 의뢰 성공 버튼 활성화 여부 (계좌가 등록되어 있어야 활성화)
  const isSubmitDisabled = !registeredAccount;

  return (
    <PageFrame
      appBar={{
        title: '의뢰 성공요청',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.section_title}>
            <span>예매 성공 내역 사진</span>
          </div>

          {/* 업로드된 이미지 표시 */}
          {successPhotos.length > 0 && (
            <div className={styles.uploaded_images_container}>
              {successPhotos.map((file, index) => (
                <UploadedImage
                  key={index}
                  imageURL={toObjectURL(file)}
                  alt={`예매 성공 내역 사진 ${index + 1}`}
                  onRemove={() => handleRemovePhoto(index, setSuccessPhotos)}
                />
              ))}
            </div>
          )}

          {/* 파일 입력 (숨김) */}
          <input
            ref={successPhotoInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleUploadPhoto(e, setSuccessPhotos, 6)}
            style={{ display: 'none' }}
          />

          {/* 사진 첨부하기 버튼 */}
          <Button
            variant="fill"
            color="gray"
            onClick={() => successPhotoInputRef.current?.click()}
            disabled={successPhotos.length >= 6}
          >
            사진 첨부하기({successPhotos.length}/6)
          </Button>
        </div>

        <Spacer size={40} />

        {/* 상세 설명 섹션 */}
        <div className={styles.section}>
          <div className={styles.section_title}>
            <span>상세 설명</span>
          </div>
          <Textarea
            id="description"
            placeholder="상세 설명을 입력해주세요"
            value={description}
            onChange={handleDescriptionChange}
            style={{ height: '200px' }}
          />
        </div>

        <Spacer size={40} />

        {/* 입금 계좌 섹션 */}
        <div className={styles.section}>
          <div className={styles.section_title}>
            <div className={styles.wrapper}>
              <span>입금 계좌</span>
              <span className={styles.required}>*</span>
            </div>

            <button className={styles.button} onClick={handleChangeAccount}>
              <span>계좌 변경하기</span>
            </button>
          </div>

          {registeredAccount ? (
            // 등록된 계좌가 있는 경우
            <BankAccountInfoCard
              bankAccountInfo={registeredAccount}
              dropdownItems={[
                {
                  label: '계좌 변경하기',
                  onClick: handleChangeAccount,
                },
              ]}
            />
          ) : (
            // 등록된 계좌가 없는 경우
            <button
              className={styles.account_empty_container}
              onClick={handleRegisterAccount}
            >
              <span className={styles.text}>등록된 계좌 정보가 없습니다</span>
              <span className={styles.register}>
                <span>등록하기</span>
                <ArrowRightIcon width={16} height={16} />
              </span>
            </button>
          )}
        </div>

        <Spacer size={40} />

        <Button
          variant="fill"
          color="default"
          onClick={handleRequestSuccess}
          disabled={isSubmitDisabled}
          style={{ marginTop: 'auto' }}
        >
          의뢰 성공
        </Button>
      </div>

      <ChangeBankBottomSheet
        onClose={() => setIsChangeBankBottomSheetOpen(false)}
        isOpen={isChangeBankBottomSheetOpen}
        // TODO: 계좌 정보 리스트 조회 API 호출 후 바인딩
        bankAccountInfoList={
          registeredAccount
            ? Array.from({ length: 3 }, () => registeredAccount)
            : []
        }
        onSelectBankAccount={(bankAccountInfo) => {
          console.log(bankAccountInfo);
        }}
      />
    </PageFrame>
  );
};

export default RequestSuccessPage;
