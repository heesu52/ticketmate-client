import formatDate from './services/format-date';

const calculateDday = (targetDate: string): string => {
  const today = new Date();

  // formattedToday는 Date 객체로 생성
  const formattedToday = formatDate(today);
  const formattedTargetDate = formatDate(targetDate);

  console.log(formattedToday, formattedTargetDate);

  const target = new Date(formattedTargetDate);
  const todayFormatted = new Date(formattedToday);

  // 시간을 00:00:00으로 맞추기
  todayFormatted.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffInTime = target.getTime() - todayFormatted.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

  if (diffInDays > 0) {
    return `D-${diffInDays}`;
  } else if (diffInDays === 0) {
    return 'D-Day';
  } else {
    return `D+${Math.abs(diffInDays)}`;
  }
};

export default calculateDday;
