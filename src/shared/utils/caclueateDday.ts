const calculateDday = (targetDate: string): string => {
  const today = new Date();
  const target = new Date(targetDate);

  // 시간을 00:00:00으로 맞추기
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffInTime = target.getTime() - today.getTime();
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
