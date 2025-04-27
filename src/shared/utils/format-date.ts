const formatDate = (dateStr: string | number | Date) => {
  const date = new Date(dateStr);

  return date.toLocaleDateString('en-CA'); // 'YYYY-MM-DD' 형식으로 반환
};

export default formatDate;
