'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import ChangeBankBottomSheet from '@/app/chat/[id]/request-success/[reference-id]/_shared/components/change-bank-bottom-sheet/change-bank-bottom-sheet';
import SendRequestSuccessModal from '@/app/chat/[id]/request-success/[reference-id]/_shared/components/modal/agent/send-request-success-modal/send-request-success-modal';
import { usePostFulfillmentForm } from '@/app/chat/[id]/request-success/[reference-id]/_shared/services/mutation';
import { ArrowRightIcon } from '@/assets/icons';
import BankAccountInfoCard from '@/shared/components/features/bank/bank-account-info-card/bank-account-info-card';
import Button from '@/shared/components/ui/button/button';
import UploadedImage from '@/shared/components/ui/image/uploaded-image/uploaded-image';
import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import Spacer from '@/shared/components/ui/spacer/spacer';
import Textarea from '@/shared/components/ui/textarea/textarea';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { useGetBankAccountList } from '@/shared/services/member/query';
import { BankAccountInfo } from '@/shared/types';

import styles from './request-success-create.module.scss';

const RequestSuccessCreate = () => {
  const router = useRouter();
  const { open } = useModalStore();

  const { id: chatRoomId } = useParams();

  // 계좌 변경 바텀 시트 상태 관리
  const [isChangeBankBottomSheetOpen, setIsChangeBankBottomSheetOpen] =
    useState(false);

  // 예매 성공 내역 사진 상태 관리
  const [successPhotoList, setSuccessPhotoList] = useState<File[]>([]);
  const successPhotoInputRef = useRef<HTMLInputElement>(null);
  // 상세 설명 상태 관리
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  // 입금 계좌 정보 (대표 계좌로 초기화)
  const [registeredAccount, setRegisteredAccount] =
    useState<BankAccountInfo | null>(null);

  // 계좌 리스트 조회
  const { data: bankAccountList = [] } = useGetBankAccountList();

  // 파일을 ObjectURL로 변환하는 함수
  const toObjectURL = useCallback((file: File) => {
    return URL.createObjectURL(file);
  }, []);

  // 사진 업로드 핸들러
  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileList = e.currentTarget.files;

    if (!fileList || fileList.length === 0) return;

    const fileListArray = Array.from(fileList);

    // 초과 발생 여부 플래그
    let overflow = false;
    const MAX_COUNT = 6;

    setSuccessPhotoList((prev) => {
      // 중복 제거(이름+사이즈+마지막 수정 시간 기준)
      const seen = new Set(
        prev.map((f) => `${f.name}_${f.size}_${f.lastModified}`),
      );
      const deduplicatedFileList: File[] = [];
      for (const f of fileListArray) {
        const key = `${f.name}_${f.size}_${f.lastModified}`;
        if (!seen.has(key)) {
          deduplicatedFileList.push(f);
          seen.add(key);
        }
      }

      const available = Math.max(0, MAX_COUNT - prev.length);
      const willAdd = deduplicatedFileList.slice(0, available);
      // 초과 판단 (중복 제거 후에도 남은 파일이 available보다 많았는지)
      overflow = deduplicatedFileList.length > available;

      return [...prev, ...willAdd];
    });

    // 초과 시 토스트 메시지 표시
    if (overflow) {
      toastify({
        variant: 'error',
        description: `최대 ${MAX_COUNT}장까지만 선택할 수 있습니다.`,
      });
    }
  };

  // 사진 제거 핸들러
  const handleRemovePhoto = (index: number) => {
    setSuccessPhotoList((prev) => prev.filter((_, i) => i !== index));
  };

  // 계좌 변경하기 핸들러
  const handleChangeAccount = () => {
    setIsChangeBankBottomSheetOpen(true);
  };

  // 계좌 등록하기 핸들러
  const handleRegisterAccount = () => {
    router.push('/bank-account/new');
  };

  // 계좌 선택 핸들러
  const handleSelectBankAccount = (bankAccountInfo: BankAccountInfo) => {
    setRegisteredAccount(bankAccountInfo);
    setIsChangeBankBottomSheetOpen(false);
  };

  const requestSuccess = usePostFulfillmentForm();

  const handleClickRequest = () => {
    open('send-request-success-modal', SendRequestSuccessModal)
      .then(() => {
        requestSuccess
          .mutateAsync({
            chatRoomId: chatRoomId as string,
            fulfillmentFormRequest: {
              fulfillmentFormImgList: successPhotoList,
              particularMemo: descriptionRef.current?.value ?? '',
              agentBankAccountId: registeredAccount?.agentBankAccountId ?? '',
            },
          })
          .then(() => {
            toastify({
              variant: 'success',
              description: '의뢰 성공 요청이 정상적으로 완료되었습니다.',
            });
            router.push(`/chat/${chatRoomId}`);
          })
          .catch(() => {
            toastify({
              variant: 'error',
              description: '의뢰 성공 안내에 실패했습니다.',
            });
          });
      })
      .catch(() => {
        return false;
      });
  };

  // 의뢰 성공 버튼 활성화 여부 (계좌가 등록되어 있어야 활성화)
  const isSubmitDisabled = !registeredAccount;

  // 계좌 리스트에서 대표 계좌 찾기
  useEffect(() => {
    if (bankAccountList.length > 0) {
      // primaryAccount가 true인 계좌를 찾거나, 없으면 첫 번째 계좌 사용
      const primaryAccount =
        bankAccountList.find((account) => account.primaryAccount) ||
        bankAccountList[0];
      setRegisteredAccount(primaryAccount);
    } else {
      setRegisteredAccount(null);
    }
  }, [bankAccountList]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.section_title}>
            <span>예매 성공 내역 사진</span>
          </div>

          {/* 업로드된 이미지 표시 */}
          {successPhotoList.length > 0 && (
            <div className={styles.uploaded_images_container}>
              {successPhotoList.map((file, index) => (
                <UploadedImage
                  key={index}
                  imageURL={toObjectURL(file)}
                  alt={`예매 성공 내역 사진 ${index + 1}`}
                  onRemove={() => handleRemovePhoto(index)}
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
            onChange={(e) => handleUploadPhoto(e)}
            style={{ display: 'none' }}
          />

          {/* 사진 첨부하기 버튼 */}
          <Button
            variant="fill"
            color="gray"
            onClick={() => successPhotoInputRef.current?.click()}
            disabled={successPhotoList.length >= 6}
          >
            사진 첨부하기({successPhotoList.length}/6)
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
            ref={descriptionRef}
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
            <BankAccountInfoCard bankAccountInfo={registeredAccount} />
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
          onClick={handleClickRequest}
          disabled={isSubmitDisabled}
          style={{ marginTop: 'auto' }}
        >
          성공 안내하기
        </Button>
      </div>

      <ChangeBankBottomSheet
        onClose={() => setIsChangeBankBottomSheetOpen(false)}
        isOpen={isChangeBankBottomSheetOpen}
        bankAccountInfoList={bankAccountList}
        onSelectBankAccount={handleSelectBankAccount}
      />
    </>
  );
};

export default RequestSuccessCreate;
