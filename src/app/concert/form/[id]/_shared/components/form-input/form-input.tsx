import { useEffect, useState, useRef } from 'react';

import classNames from 'classnames';
// import Image from 'next/image';

import {
  MinusIcon,
  PlusIcon,
  ArrowBottomIcon,
  ArrowTopIcon,
} from '@/assets/icons';
import { customToast } from '@/shared/components/toast/custom-toast/custom-toast';
import Input from '@/shared/components/ui/input/input';
import Select from '@/shared/components/ui/select/select';
import {
  ConcertDateInfo,
  Form,
  TicketOpenDateInfo,
  TicketOpenType,
} from '@/shared/types';
import { formatDate } from '@/shared/utils/dates';
import { getTicketOpenInfoByType } from '@/shared/utils/tickets';

import styles from './form-input.module.scss';
import { FormData, HopeArea } from './form-input.type';
/**
 * FormInput 컴포넌트
 * 신청폼 작성 탭에서 회차/매수/희망구역/요청사항을 입력할 수 있는 폼 UI
 */

interface FormInputProps {
  value: FormData;
  onChange: (data: FormData) => void;
  concertDateInfo: ConcertDateInfo[];
  ticketOpenDateInfo: TicketOpenDateInfo[];
  ticketOpenType: TicketOpenType;
  formItem?: Form;
  currentIndex: number;
  seatingChartUrl?: string;
  disabled?: boolean;
}

export default function FormInput({
  value,
  onChange,
  concertDateInfo,
  ticketOpenDateInfo,
  ticketOpenType,
  formItem,
  currentIndex,
  seatingChartUrl,
  disabled,
}: FormInputProps) {
  const firstDetail =
    formItem?.applicationFormDetailResponseList?.[currentIndex];

  const [isOpen, setIsOpen] = useState(false);

  //희망사항 부분 초기세팅
  const [hopeAreaList, setHopeAreaList] = useState<HopeArea[]>(
    firstDetail?.hopeAreaResponseList?.map((area, idx) => ({
      id: idx + 1,
      location: area.location,
      price: area.price.toString(),
    })) ??
      value?.hopeAreaList ?? [{ id: 1, location: '', price: '' }],
  );
  //공연날짜, 매수, 요청사항 초기세팅 (작성된 신청폼이 있다면 데이터 불러오기)
  const [performanceDate, setPerformanceDate] = useState<string>(
    firstDetail?.performanceDate ?? value?.performanceDate ?? '',
  );
  const [requestCount, setRequestCount] = useState<string>(
    firstDetail?.requestCount.toString() ?? value?.requestCount ?? '',
  );
  const [requirement, setRequirement] = useState<string>(
    firstDetail?.requirement ?? value?.requirement ?? '',
  );

  //무한로딩 에러 해결을 위해 useRef로 중복확인
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onChange({ performanceDate, requestCount, hopeAreaList, requirement });
  }, [performanceDate, requestCount, hopeAreaList, requirement]);

  //희망사항 추가
  const addInput = () => {
    setHopeAreaList((prev) => {
      if (prev.length >= 5) {
        customToast({
          description: '최대 5개까지만 가능합니다.',
        });
        return prev;
      }
      return [...prev, { id: Date.now(), location: '', price: '' }];
    });
  };

  //희망사항 삭제
  const removeInput = (id: number) => {
    setHopeAreaList((prev) => {
      if (prev.length <= 1) return prev; // 최소 1개는 유지
      return prev.filter((input) => input.id !== id);
    });
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setHopeAreaList((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, [field]: value } : input,
      ),
    );
  };

  // 공연 날짜 옵션 리스트로 생성
  const dateList = concertDateInfo.map((item) => {
    const formatted = formatDate(item.performanceDate);
    return {
      value: item.performanceDate, // 원본 날짜 값 사용
      label: `${formatted} (${item.session}회차)`,
    };
  });

  //티켓 오픈 타입 매칭
  const matchedOpenInfo = getTicketOpenInfoByType(
    ticketOpenDateInfo,
    ticketOpenType,
  );

  // 최대 예매 매수 구하기
  const maxCount = matchedOpenInfo?.requestMaxCount ?? 1;
  const countList = Array.from({ length: maxCount }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1}매`,
  }));

  //좌석배치도 아코디언 ui
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      {/*회차/매수 선택 정보 */}
      <div className={styles.select_container}>
        <span className={styles.title}>
          회차<span className={styles.asterisk}>*</span>
        </span>
        <Select
          options={dateList}
          value={performanceDate}
          onValueChange={setPerformanceDate}
          variant="form"
          disabled={disabled}
        />
      </div>

      <div className={styles.select_container}>
        <span className={styles.title}>
          매수<span className={styles.asterisk}>*</span>
        </span>
        <Select
          options={countList}
          value={requestCount}
          onValueChange={setRequestCount}
          variant="form"
          disabled={disabled}
        />
      </div>

      {/* 희망 구역 입력 정보 */}
      <div className={styles.form_container}>
        <div className={styles.guide_container}>
          <span className={styles.title}>희망구역</span>
          <span className={styles.span}>작성 가이드</span>
        </div>

        {hopeAreaList.map((input, index) => (
          <div key={input.id} className={styles.input_container}>
            <span className={styles.text}>{`${index + 1}순위`}</span>
            {/* 구역명 입력 */}
            <Input
              label="구역명"
              placeholder="구역명"
              id={`seat-${input.id}`}
              value={input.location}
              onChange={(e) =>
                handleInputChange(input.id, 'location', e.target.value)
              }
              disabled={disabled}
            />
            {/* 가격 입력 */}
            <Input
              label="가격"
              placeholder="가격"
              id={`price-${input.id}`}
              value={input.price}
              onChange={(e) =>
                handleInputChange(input.id, 'price', e.target.value)
              }
              disabled={disabled}
            />
            {!disabled &&
              (index === hopeAreaList.length - 1 ? (
                <PlusIcon
                  width={20}
                  height={20}
                  fill="var(--grayscale-500)"
                  onClick={addInput}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <MinusIcon
                  width={20}
                  height={20}
                  fill="var(--grayscale-500)"
                  onClick={() => removeInput(input.id)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
          </div>
        ))}
      </div>

      {/* 좌석배치도*/}
      {seatingChartUrl && (
        <div className={styles.seat_container} onClick={toggleAccordion}>
          <div className={classNames(styles.seat, { [styles.open]: isOpen })}>
            <span className={styles.span}>공연장 좌석배치도 보기</span>
            {isOpen ? (
              <ArrowTopIcon width={16} height={16} fill="var(--primary-500)" />
            ) : (
              <ArrowBottomIcon width={16} height={16} fill="var(--gray-4)" />
            )}
          </div>
          {isOpen && (
            // 열람 확인을 위해 넣은거라 나중에 이미지 제대로 업로드 되면 삭제 예정
            <div className={styles.example}>예시</div>
            // <Image
            //   src={seatingChartUrl}
            //   alt="좌석배치도"
            //   width={345}
            //   height={0} // 또는 생략
            //   style={{ width: '100%', height: 'auto', marginTop: '12px' }}
            // />
          )}
        </div>
      )}

      {/* 요청사항 입력 */}
      <div className={styles.form_container}>
        <span className={styles.title}>요청사항</span>
        <textarea
          className={styles.textarea}
          placeholder="자유롭게 입력해주세요."
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
