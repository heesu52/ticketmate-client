export const formatDate = (date: string | number | Date): string => {
  return new Date(date).toLocaleDateString('en-CA'); // YYYY-MM-DD
};

export const calculateDday = (targetDate: string | number | Date): string => {
  const today = new Date();
  const formattedToday = formatDate(today);
  const formattedTargetDate = formatDate(targetDate);

  const todayDate = new Date(formattedToday);
  const target = new Date(formattedTargetDate);

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
