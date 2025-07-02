import FormSelect from '@/app/concert/form/[id]/_shared/components/select/form-select';
import { HelpCircleIcon } from '@/assets/icons';
import Input from '@/shared/components/input/input';
import { ConcertDateInfo, Form, TicketOpenDateInfo } from '@/shared/types';
import { formatDate } from '@/shared/utils/dates';
import { getTicketOpenInfoByType } from '@/shared/utils/tickets';

import styles from './form-readonly.module.scss';

/**
 * FormReadOnly 컴포넌트
 * 기존 신청폼의 내용을 읽기 전용(readonly)으로 보여주는 폼 UI
 */

interface FormReadOnlyProps {
  concertDateInfoResponseList: ConcertDateInfo[];
  ticketOpenDateInfoResponses: TicketOpenDateInfo[];
  formItem: Form;
  currentIndex: number;
}

export default function FormReadOnly({
  concertDateInfoResponseList,
  ticketOpenDateInfoResponses,
  formItem,
  currentIndex,
}: FormReadOnlyProps) {
  const { ticketOpenType, applicationFormDetailResponseList } = formItem;

  // 탭(index)에 해당하는 신청폼 상세 데이터 추출
  const detail = applicationFormDetailResponseList[currentIndex];
  const performanceDate = detail.performanceDate;
  const requestCount = detail.requestCount.toString();
  const requirement = detail.requirement || '';
  const hopeAreaList = detail.hopeAreaResponseList || [];

  // 공연 날짜 옵션 리스트로 생성
  const dateList = concertDateInfoResponseList.map((item) => {
    const formatted = formatDate(item.performanceDate);
    return {
      value: item.performanceDate,
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
        <FormSelect selectList={dateList} value={performanceDate} disabled />
      </div>

      <div className={styles.form_container}>
        <span className={styles.span}>
          매수<span className={styles.asterisk}>*</span>
        </span>
        <FormSelect selectList={countList} value={requestCount} disabled />
      </div>

      <div className={styles.form_container}>
        <div className={styles.guide_container}>
          <span className={styles.span}>희망구역</span>
          <div className={styles.guide}>
            <HelpCircleIcon width={16} height={16} fill="var(--gray-4)" />
            <span className={styles.span}>희망구역 작성 가이드</span>
          </div>
        </div>

        {/* 희망 구역 입력 정보 (순위별로 location, price 비활성화 input 표시) */}
        {hopeAreaList.map((input, index) => (
          <div key={index} className={styles.input_container}>
            <span className={styles.text}>{`${index + 1}순위`}</span>
            <Input
              label="구역명"
              placeholder="구역명"
              id={`seat-${index}`}
              value={input.location}
              disabled
            />
            <Input
              label="가격"
              placeholder="가격"
              id={`price-${index}`}
              value={input.price.toString()}
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
          value={requirement}
          disabled
        />
      </div>
    </div>
  );
}
