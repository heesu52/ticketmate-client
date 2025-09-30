'use client';

import React, { useRef, useState } from 'react';

import ChangeAgentModal from '@/app/my/setting/agent/_shared/components/change-agent-modal/change-agent-modal';
import { MinusIcon, PlusIcon } from '@/assets/icons';
import { toast } from '@/lib/toast/toast';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import InformationBanner from '@/shared/components/ui/banner/information-banner/information-banner';
import Button from '@/shared/components/ui/button/button';
import Checkbox from '@/shared/components/ui/checkbox/checkbox';
import UploadedImage from '@/shared/components/ui/image/uploaded-image/uploaded-image';
import Input from '@/shared/components/ui/input/input';
import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import Spacer from '@/shared/components/ui/spacer/spacer';
import Textarea from '@/shared/components/ui/textarea/textarea';

import styles from './page.module.scss';

const AgentPage = () => {
  const { open } = useModalStore();

  // 예매 성공 내역 사진
  const [successPhotos, setSuccessPhotos] = useState<File[]>([]); // 예매 성공 내역 사진
  const successPhotoInputRef = useRef<HTMLInputElement>(null); // 예매 성공 내역 사진 업로드 버튼

  // 한 줄 소개
  const [introduction, setIntroduction] = useState('');

  // SNS 계정 인증 사진
  const [snsPhotos, setSnsPhotos] = useState<File[]>([]); // SNS 계정 인증 사진
  const snsPhotoInputRef = useRef<HTMLInputElement>(null); // SNS 계정 인증 사진 업로드 버튼
  const [snsUrls, setSnsUrls] = useState<string[]>(['']); // SNS 계정 인증 링크

  // 동의 여부
  const [isAgreed, setIsAgreed] = useState(false);

  // 사진업로드
  const handleUploadPhoto = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
    maxCount: number,
  ) => {
    const fileList = e.currentTarget.files;

    if (!fileList || fileList.length === 0) return;

    const incoming = Array.from(fileList);

    // 업데이터 내부에서는 계산만 하고, "초과 발생 여부"만 플래그로 넘김
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

    // 여기서 딱 1번만 토스트
    if (overflow) {
      toast({
        variant: 'error',
        description: `최대 ${maxCount}장까지만 선택할 수 있습니다.`,
        // id: 'max-photos', // (옵션) 지원된다면 중복 방지 toast id 사용
      });
    }
  };

  // 사진 제거
  const handleRemovePhoto = (
    index: number,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
  ) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // SNS 계정 인증 링크 추가
  const handleAddSnsUrl = () => {
    setSnsUrls([...snsUrls, '']);
  };

  // SNS 계정 인증 링크 제거
  const handleRemoveSnsUrl = (index: number) => {
    if (snsUrls.length > 1) {
      setSnsUrls(snsUrls.filter((_, i) => i !== index));
    }
  };

  // SNS 계정 인증 링크 변경
  const handleSnsUrlChange = (index: number, value: string) => {
    const newUrls = [...snsUrls];
    newUrls[index] = value;
    setSnsUrls(newUrls);
  };

  // 전환 신청하기
  const handleSubmit = async () => {
    if (successPhotos.length < 3) {
      toast({
        variant: 'error',
        description: '예매 성공 내역 사진을 최소 3장 이상 업로드해주세요.',
      });
      return;
    }

    if (introduction.length === 0) {
      toast({
        variant: 'error',
        description: '한 줄 소개를 입력해주세요.',
      });
      return;
    }

    const payload = {
      successPhotos,
      introduction,
      snsPhotos,
      snsUrls,
    };

    try {
      const result = await open('change-agent-modal', ChangeAgentModal);

      if (result) {
        toast({
          variant: 'success',
          description: '전환 신청이 완료되었습니다.',
        });
        console.log(payload);
      }
    } catch (error) {
      toast({
        variant: 'error',
        description: '전환 신청이 취소되었습니다.',
      });
    }
  };

  return (
    <PageFrame
      appBar={{
        title: '대리인 전환',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        <InformationBanner
          variant="info"
          title="대리인 전환이 뭔가요?"
          description="대리인은 티켓팅 의뢰를 받을 수 있습니다. 아래 항목들을 입력하면 운영팀의 검토 후 대리인으로 전환될 수 있어요."
        />

        <Spacer size={40} />

        <div className={styles.content_container}>
          <div className={styles.title_container}>
            <div className={styles.title}>
              <span>예매 성공 내역 사진</span>
              <div className={styles.accent}>*</div>
            </div>
            <div className={styles.description}>
              예매 성공 인증 사진을 최소 3장 이상 업로드해주세요.
            </div>
          </div>

          {successPhotos.length > 0 && (
            <div className={styles.uploaded_images_container}>
              {successPhotos.map((file, index) => (
                <UploadedImage
                  key={index}
                  imageURL={URL.createObjectURL(file)}
                  alt={`예매 성공 사진 ${index + 1}`}
                  onRemove={() => handleRemovePhoto(index, setSuccessPhotos)}
                />
              ))}
            </div>
          )}

          <input
            ref={successPhotoInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleUploadPhoto(e, setSuccessPhotos, 10)}
            style={{ display: 'none' }}
          />
          <Button
            variant="outline"
            color="default"
            onClick={() => successPhotoInputRef.current?.click()}
            disabled={successPhotos.length >= 10}
          >
            사진 첨부하기({successPhotos.length}/10)
          </Button>
        </div>

        <Spacer size={40} />

        <div className={styles.content_container}>
          <div className={styles.title_container}>
            <div className={styles.title}>
              <span>한 줄 소개</span>
              <div className={styles.accent}>*</div>
            </div>
          </div>

          <Textarea
            id="introduction"
            placeholder="한 줄 소개를 작성해주세요"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            style={{ height: '200px' }}
          />
        </div>

        <Spacer size={40} />

        <div className={styles.content_container}>
          <div className={styles.title_container}>
            <div className={styles.title}>
              <span>SNS 계정 인증</span>
            </div>
            <div className={styles.description}>
              본인이 관리하고 있는 트위터, 블로그, 티스토리 등을 인증할 수 있는
              사진을 첨부해주세요
            </div>
          </div>

          {snsPhotos.length > 0 && (
            <div className={styles.uploaded_images_container}>
              {snsPhotos.map((file, index) => (
                <UploadedImage
                  key={index}
                  imageURL={URL.createObjectURL(file)}
                  alt={`SNS 인증 사진 ${index + 1}`}
                  onRemove={() => handleRemovePhoto(index, setSnsPhotos)}
                />
              ))}
            </div>
          )}

          <input
            ref={snsPhotoInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleUploadPhoto(e, setSnsPhotos, 3)}
            style={{ display: 'none' }}
          />
          <Button
            variant="outline"
            color="default"
            onClick={() => snsPhotoInputRef.current?.click()}
            disabled={snsPhotos.length >= 3}
          >
            사진 첨부하기({snsPhotos.length}/3)
          </Button>

          <div className={styles.sns_url_container}>
            {snsUrls.map((url, index) => (
              <div key={index} className={styles.input_row}>
                <Input
                  id={`sns-url-${index}`}
                  label=""
                  placeholder="관련 링크를 첨부해주세요."
                  value={url}
                  onChange={(e) => handleSnsUrlChange(index, e.target.value)}
                />
                <button
                  type="button"
                  className={styles.action_button}
                  onClick={
                    index === 0
                      ? handleAddSnsUrl
                      : () => handleRemoveSnsUrl(index)
                  }
                  disabled={index === 0 && snsUrls.length >= 3}
                >
                  {index === 0 ? (
                    <PlusIcon
                      width={16}
                      height={16}
                      fill="var(--grayscale-500)"
                    />
                  ) : (
                    <MinusIcon
                      width={16}
                      height={16}
                      fill="var(--grayscale-500)"
                    />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        <Spacer size={40} />

        <Checkbox
          id="agreement"
          label="전환된 계정은 다시 의뢰인으로 전환할 수 없습니다."
          checked={isAgreed}
          onChange={() => setIsAgreed(!isAgreed)}
        />

        <Button
          variant="fill"
          color="default"
          disabled={!isAgreed}
          onClick={handleSubmit}
        >
          전환 신청하기
        </Button>
      </div>
    </PageFrame>
  );
};

export default AgentPage;
