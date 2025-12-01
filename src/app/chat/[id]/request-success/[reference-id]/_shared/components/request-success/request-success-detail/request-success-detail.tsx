'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import ChangeBankBottomSheet from '@/app/chat/[id]/request-success/[reference-id]/_shared/components/change-bank-bottom-sheet/change-bank-bottom-sheet';
import SendRequestSuccessModal from '@/app/chat/[id]/request-success/[reference-id]/_shared/components/modal/agent/send-request-success-modal/send-request-success-modal';
import AcceptRequestSuccessModal from '@/app/chat/[id]/request-success/[reference-id]/_shared/components/modal/client/accept-request-success-modal/accept-request-success-modal';
import RejectRequestSuccessModal from '@/app/chat/[id]/request-success/[reference-id]/_shared/components/modal/client/reject-request-success-modal/reject-request-success-modal';
import {
  usePatchFulfillmentFormAccept,
  usePatchFulfillmentFormReject,
  usePatchFulfillmentFormUpdate,
} from '@/app/chat/[id]/request-success/[reference-id]/_shared/services/mutation';
import { useGetFulfillmentForm } from '@/app/chat/[id]/request-success/[reference-id]/_shared/services/query';
import BankAccountInfoCard from '@/shared/components/features/bank/bank-account-info-card/bank-account-info-card';
import Button from '@/shared/components/ui/button/button';
import UploadedImage from '@/shared/components/ui/image/uploaded-image/uploaded-image';
import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import Spacer from '@/shared/components/ui/spacer/spacer';
import Textarea from '@/shared/components/ui/textarea/textarea';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { useMember } from '@/shared/context/member-context';
import { useGetBankAccountList } from '@/shared/services/member/query';
import { BankAccountInfo } from '@/shared/types';

import styles from './request-success-detail.module.scss';

interface RequestSuccessFormProps {
  pageMode: PageMode;
  setPageMode: (pageMode: PageMode) => void;
}

type PageMode = 'create' | 'view' | 'update';

const RequestSuccessForm = ({
  pageMode,
  setPageMode,
}: RequestSuccessFormProps) => {
  const router = useRouter();

  const { open } = useModalStore();
  const { member } = useMember();

  const { id: chatRoomId, 'reference-id': referenceId } = useParams();

  // 계좌 변경 바텀 시트 상태 관리
  const [isChangeBankBottomSheetOpen, setIsChangeBankBottomSheetOpen] =
    useState(false);

  // 예매 성공 내역 사진 상태 관리
  // File: 새로 추가된 이미지, string: 기존 이미지 URL
  const [successPhotoList, setSuccessPhotoList] = useState<(File | string)[]>(
    [],
  );
  const successPhotoInputRef = useRef<HTMLInputElement>(null);

  // 기존 이미지 정보 추적 (삭제된 이미지 ID를 찾기 위해)
  const [originalImageList, setOriginalImageList] = useState<
    Array<{ id: string; url: string }>
  >([]);
  // 상세 설명 상태 관리
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  // 입금 계좌 정보 (대표 계좌로 초기화)
  const [registeredAccount, setRegisteredAccount] =
    useState<BankAccountInfo | null>(null);

  // 계좌 리스트 조회
  const { data: bankAccountList = [] } = useGetBankAccountList(
    member?.memberType === 'CLIENT' ? false : false,
  );
  const { data: fulfillmentFormData } = useGetFulfillmentForm({
    fulfillmentFormId: referenceId !== 'new' ? (referenceId as string) : '',
  });

  // 파일을 ObjectURL로 변환하는 함수
  const toObjectURL = useCallback((file: File) => {
    return URL.createObjectURL(file);
  }, []);

  // 사진 업로드 핸들러
  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files;

    if (!fileList || fileList.length === 0) return;

    const fileListArray = Array.from(fileList);

    // 초과 발생 여부 플래그
    let overflow = false;
    const MAX_COUNT = 6;

    setSuccessPhotoList((prev) => {
      // File 타입인 것들만 중복 체크 (기존 이미지 URL은 제외)
      const filePrev = prev.filter((item) => item instanceof File) as File[];
      const seen = new Set(
        filePrev.map((f) => `${f.name}_${f.size}_${f.lastModified}`),
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

    // input 값 초기화 (같은 파일을 다시 선택할 수 있도록)
    e.target.value = '';
  };

  // 사진 제거 핸들러
  const handleRemovePhoto = (index: number) => {
    setSuccessPhotoList((prev) => {
      const removed = prev[index];
      // 제거된 항목이 ObjectURL인 경우 메모리 해제
      if (removed instanceof File) {
        // File 객체는 나중에 useEffect에서 처리되므로 여기서는 제거만
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  // 계좌 변경하기 핸들러
  const handleChangeAccount = () => {
    setIsChangeBankBottomSheetOpen(true);
  };

  // 계좌 선택 핸들러
  const handleSelectBankAccount = (bankAccountInfo: BankAccountInfo) => {
    setRegisteredAccount(bankAccountInfo);
    setIsChangeBankBottomSheetOpen(false);
  };

  const patchFulfillmentFormUpdate = usePatchFulfillmentFormUpdate();

  const handleClickRequest = () => {
    switch (pageMode) {
      case 'view':
        setPageMode('update');
        break;
      case 'update':
        open('send-request-success-modal', SendRequestSuccessModal)
          .then(() => {
            // 현재 선택된 이미지 중 기존 이미지 URL 목록 추출
            const currentImageUrls = successPhotoList.filter(
              (photo) => typeof photo === 'string',
            ) as string[];

            // 삭제된 이미지 ID 찾기 (기존 이미지 중 현재 선택되지 않은 것들)
            const deletedImageIds = originalImageList
              .filter(
                (originalImg) => !currentImageUrls.includes(originalImg.url),
              )
              .map((img) => img.id);

            // 새로 추가된 이미지만 필터링 (File 타입인 것들)
            const newlyAddedImages = successPhotoList.filter(
              (photo) => photo instanceof File,
            ) as File[];

            const payload = {
              fulfillmentFormId: fulfillmentFormData?.fulfillmentFormId ?? '',
              deleteImgIdList: deletedImageIds,
              newSuccessImgList: newlyAddedImages,
              particularMemo: descriptionRef.current?.value ?? '',
              agentBankAccountId: registeredAccount?.agentBankAccountId ?? '',
            };

            patchFulfillmentFormUpdate
              .mutateAsync(payload)
              .then(() => {
                toastify({
                  variant: 'success',
                  description: '의뢰 수정이 정상적으로 완료되었습니다.',
                });
                setPageMode('view');
                // router.push(`/chat/${chatRoomId}`);
              })
              .catch(() => {
                toastify({
                  variant: 'error',
                  description: '의뢰 수정에 실패했습니다.',
                });
              });
          })
          .catch(() => {
            return false;
          });
        break;
    }
  };

  const patchFulfillmentFormReject = usePatchFulfillmentFormReject();
  const patchFulfillmentFormAccept = usePatchFulfillmentFormAccept();

  const handleClickReject = () => {
    open('reject-request-success-modal', RejectRequestSuccessModal)
      .then(() => {
        patchFulfillmentFormReject
          .mutateAsync({
            fulfillmentFormId: fulfillmentFormData?.fulfillmentFormId ?? '',
          })
          .then(() => {
            toastify({
              variant: 'success',
              description: '의뢰 거절이 정상적으로 완료되었습니다.',
            });
            router.push(`/chat/${chatRoomId}`);
          })
          .catch(() => {
            toastify({
              variant: 'error',
              description: '의뢰 거절에 실패했습니다.',
            });
          });
      })
      .catch(() => {
        return false;
      });
  };

  const handleClickAccept = () => {
    open('accept-request-success-modal', AcceptRequestSuccessModal)
      .then(() => {
        patchFulfillmentFormAccept
          .mutateAsync({
            fulfillmentFormId: fulfillmentFormData?.fulfillmentFormId ?? '',
          })
          .then(() => {
            toastify({
              variant: 'success',
              description: '의뢰 수락이 정상적으로 완료되었습니다.',
            });
            router.push(`/chat/${chatRoomId}`);
          })
          .catch(() => {
            toastify({
              variant: 'error',
              description: '의뢰 수락에 실패했습니다.',
            });
          });
      })
      .catch(() => {
        return false;
      });
  };

  // descriptionRef에 값을 설정하는 함수
  const setDescriptionValue = (value: string) => {
    if (descriptionRef.current) {
      descriptionRef.current.value = value;
    }
  };

  // 의뢰 성공 버튼 활성화 여부 (계좌가 등록되어 있어야 활성화)
  const isSubmitDisabled = !registeredAccount;

  // view 모드에서 성공양식 데이터 설정
  useEffect(() => {
    if (fulfillmentFormData && pageMode === 'view') {
      // 기존 이미지 정보 저장
      const imageList = fulfillmentFormData.fulfillmentFormImgUrlList.map(
        (img) => ({
          id: img.fulfillmentFormImgId,
          url: img.fulfillmentFormImgUrl,
        }),
      );
      setOriginalImageList(imageList);

      // 기존 이미지 URL들을 successPhotoList에 설정
      setSuccessPhotoList(
        fulfillmentFormData.fulfillmentFormImgUrlList.map(
          (img) => img.fulfillmentFormImgUrl,
        ),
      );
      setDescriptionValue(fulfillmentFormData.particularMemo);
      setRegisteredAccount(fulfillmentFormData.agentBankAccount);
    }
  }, [fulfillmentFormData, pageMode]);

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
              {successPhotoList.map((photo, index) => {
                // File인 경우 ObjectURL로 변환, string(URL)인 경우 그대로 사용
                const imageURL =
                  photo instanceof File ? toObjectURL(photo) : photo;
                return (
                  <UploadedImage
                    key={index}
                    imageURL={imageURL}
                    alt={`예매 성공 내역 사진 ${index + 1}`}
                    onRemove={() => handleRemovePhoto(index)}
                    readonly={pageMode === 'view'}
                  />
                );
              })}
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
            disabled={successPhotoList.length >= 6 || pageMode === 'view'}
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
            disabled={pageMode === 'view'}
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

            {pageMode !== 'view' && (
              <button className={styles.button} onClick={handleChangeAccount}>
                <span>계좌 변경하기</span>
              </button>
            )}
          </div>

          {registeredAccount && (
            <BankAccountInfoCard bankAccountInfo={registeredAccount} />
          )}
        </div>
        <Spacer size={40} />
        {member?.memberType === 'CLIENT' && (
          <div className={styles.button_container}>
            <Button
              variant="fill"
              color="gray"
              onClick={handleClickReject}
              style={{ marginTop: 'auto' }}
            >
              거절하기
            </Button>
            <Button
              variant="fill"
              color="default"
              onClick={handleClickAccept}
              style={{ marginTop: 'auto' }}
            >
              수락하기
            </Button>
          </div>
        )}

        {member?.memberType === 'AGENT' && (
          <>
            <Button
              variant="fill"
              color="default"
              onClick={handleClickRequest}
              disabled={isSubmitDisabled}
              style={{ marginTop: 'auto' }}
            >
              수정하기
            </Button>
            <ChangeBankBottomSheet
              onClose={() => setIsChangeBankBottomSheetOpen(false)}
              isOpen={isChangeBankBottomSheetOpen}
              bankAccountInfoList={bankAccountList}
              onSelectBankAccount={handleSelectBankAccount}
            />
          </>
        )}
      </div>
    </>
  );
};

export default RequestSuccessForm;
