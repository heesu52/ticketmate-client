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
    return `D+${Math.abs(diffInDays)}`;
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
