import { useEffect, useState, useRef } from 'react';

import FormSelect from '@/app/concert/form/[id]/_shared/components/select/form-select';
import { HelpCircleIcon } from '@/assets/icons';
import Input from '@/shared/components/input/input';
import { customToast } from '@/shared/components/toast/custom-toast/custom-toast';
import {
  ConcertDateInfo,
  TicketOpenDateInfo,
  TicketOpenType,
} from '@/shared/types';
import { formatDate } from '@/shared/utils/dates';
import { getTicketOpenInfoByType } from '@/shared/utils/tickets';

import styles from './form-readonly.module.scss';
import { FormData, HopeArea } from './form-readonly.type';

interface FormInputProps {
  value: FormData;
  onChange: (data: FormData) => void;
  concertDateInfoResponseList: ConcertDateInfo[];
  ticketOpenDateInfoResponses: TicketOpenDateInfo[];
  ticketOpenType: TicketOpenType;
}

export default function FormReadOnly({
  value,
  onChange,
  concertDateInfoResponseList,
  ticketOpenDateInfoResponses,
  ticketOpenType,
}: FormInputProps) {
  const [hopeAreaList, setHopeAreaList] = useState<HopeArea[]>(
    value?.hopeAreaList || [{ id: 1, location: '', price: '' }],
  );
  const [performanceDate, setPerformanceDate] = useState<string>(
    value?.performanceDate || '',
  );
  const [requestCount, setRequestCount] = useState<string>(
    value?.requestCount || '',
  );
  const [requestDetails, setRequestDetails] = useState<string>(
    value?.requestDetails || '',
  );

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onChange({ performanceDate, requestCount, hopeAreaList, requestDetails });
  }, [performanceDate, requestCount, hopeAreaList, requestDetails]);

  const addInput = () => {
    setHopeAreaList((prev) => {
      if (prev.length >= 10) {
        customToast({
          description: '최대 10개까지만 가능합니다.',
        });
        return prev;
      }
      return [...prev, { id: Date.now(), location: '', price: '' }];
    });
  };

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

  // 공연 날짜 리스트
  const dateList = concertDateInfoResponseList.map((item) => {
    const formatted = formatDate(item.performanceDate);
    return {
      value: item.performanceDate, // 원본 날짜 값 사용
      label: `${formatted} (${item.session}회차)`,
    };
  });

  const matchedOpenInfo = getTicketOpenInfoByType(
    ticketOpenDateInfoResponses,
    ticketOpenType,
  );

  // 최대 예매 매수 구하기
  const maxCount = matchedOpenInfo?.requestMaxCount ?? 1;

  const countList = Array.from({ length: maxCount }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1}매`,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <span className={styles.span}>
          회차<span className={styles.asterisk}>*</span>
        </span>
        <FormSelect
          selectList={dateList}
          value={performanceDate}
          onChange={setPerformanceDate}
          disabled
        />
      </div>

      <div className={styles.form_container}>
        <span className={styles.span}>
          매수<span className={styles.asterisk}>*</span>
        </span>
        <FormSelect
          selectList={countList}
          value={requestCount}
          onChange={setRequestCount}
          disabled
        />
      </div>

      <div className={styles.form_container}>
        <div className={styles.guide_container}>
          <span className={styles.span}>희망구역</span>
          <div className={styles.guide}>
            <HelpCircleIcon width={16} height={16} fill="var(--gray-4)" />
            <span className={styles.span}>희망구역 작성 가이드</span>
          </div>
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
              disabled
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
              disabled
            />
          </div>
        ))}
      </div>

      <div className={styles.form_container}>
        <span className={styles.span}>요청사항</span>
        <textarea
          className={styles.textarea}
          placeholder="자유롭게 입력해주세요."
          value={requestDetails}
          onChange={(e) => setRequestDetails(e.target.value)}
          disabled
        />
      </div>
    </div>
  );
}
