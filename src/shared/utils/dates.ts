export interface PerformanceDateInfo {
  performanceDate: string;
}

// YYYY-MM-DD로 변환
export const formatDate = (date: string | number | Date): string => {
  const d = new Date(date);
  const formattedDate = d.toLocaleDateString('en-CA'); // YYYY-MM-DD
  const dayName = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
  return `${formattedDate} (${dayName})`;
};

//Open 날짜를 기준으로 디데이 계산
export const calculateDday = (targetDate: string | number | Date): string => {
  const todayDate = new Date();
  const target = new Date(targetDate);

  // 시간을 00:00:00으로 맞추기
  todayDate.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffInTime = target.getTime() - todayDate.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

  if (diffInDays > 0) {
    return `D-${diffInDays}`;
  } else if (diffInDays === 0) {
    return 'D-Day';
  } else {
    return '';
  }
};

//공연 시작 ~ 종료 날짜 계산
export const getPerformancePeriod = (
  concertDateInfoResponseList: PerformanceDateInfo[],
): { startDate: string; endDate: string } => {
  const sortedDates = concertDateInfoResponseList
    .slice()
    .sort(
      (a, b) =>
        new Date(a.performanceDate).getTime() -
        new Date(b.performanceDate).getTime(),
    );

  const startDate = sortedDates[0]?.performanceDate ?? '';
  const endDate = sortedDates[sortedDates.length - 1]?.performanceDate ?? '';

  return { startDate, endDate };
};

/**
 * 주어진 시간 문자열을 HH:mm 형식으로 반환
 * @param time 시간 문자열 (YYYY-MM-DDTHH:MM:SS)
 * @returns HH:mm 형식의 시간 문자열
 */
export const formatTime = (time: string): string => {
  if (!time || !time.includes('T')) {
    throw new Error('시간 형식이 올바르지 않습니다.');
  }

  const timePart = time.split('T')[1];

  if (!timePart || timePart.length < 5) {
    throw new Error('시간 형식이 올바르지 않습니다.');
  }

  return timePart.substring(0, 5); // HH:mm 형식으로 반환
};

/**
 * 주어진 날짜가 오늘인지 확인
 * @param datetime 날짜 문자열 (YYYY-MM-DDTHH:MM:SS)
 * @returns 오늘인지 여부 (boolean)
 */
export const isToday = (datetime: string): boolean => {
  const targetDate = new Date(datetime);
  const today = new Date();

  // 날짜만 비교하기 위해 시간을 00:00:00으로 설정
  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return targetDate.getTime() === today.getTime();
};

/**
 * 날짜를 locale 형식으로 변환
 * @param datetime 날짜 문자열 (YYYY-MM-DDTHH:MM:SS)
 * @param locale 언어 설정 ('ko' | 'en' | 'ja')
 * @returns 포맷된 날짜 문자열
 */
export const formatDateToLocale = ({
  datetime,
  locale = 'ko',
}: {
  datetime: string;
  locale?: 'ko' | 'en' | 'ja';
}): string => {
  const date = new Date(datetime);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  switch (locale) {
    case 'ko':
      return `${month}/${day}`;
    default:
      return `${month}/${day}`;
  }
};
