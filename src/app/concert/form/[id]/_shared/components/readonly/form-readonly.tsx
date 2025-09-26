import { useState } from 'react';

import classNames from 'classnames';

import { ArrowBottomIcon, ArrowTopIcon } from '@/assets/icons';
import Input from '@/shared/components/ui/input/input';
import Select from '@/shared/components/ui/select/select';
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
  ticketOpenDateInfoResponseList: TicketOpenDateInfo[];
  formItem: Form;
  currentIndex: number;
  seatingChartUrl?: string;
}

export default function FormReadOnly({
  concertDateInfoResponseList,
  ticketOpenDateInfoResponseList,
  formItem,
  currentIndex,
  seatingChartUrl,
}: FormReadOnlyProps) {
  const { ticketOpenType, applicationFormDetailResponseList } = formItem;

  const [isOpen, setIsOpen] = useState(false);

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
    ticketOpenDateInfoResponseList,
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
          onValueChange={() => {}}
          variant="form"
          disabled
        />
      </div>

      <div className={styles.select_container}>
        <span className={styles.title}>
          매수<span className={styles.asterisk}>*</span>
        </span>
        <Select
          options={countList}
          value={requestCount}
          onValueChange={() => {}}
          variant="form"
          disabled
        />
      </div>

      {/* 희망 구역 입력 정보 */}
      <div className={styles.form_container}>
        <div className={styles.guide_container}>
          <span className={styles.title}>희망구역</span>
          <span className={styles.span}>작성 가이드</span>
        </div>

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
          disabled
        />
      </div>
    </div>
  );
}
