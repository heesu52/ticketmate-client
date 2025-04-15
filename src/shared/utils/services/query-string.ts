export const createQueryParams = (params: Record<string, unknown>) => {
  return new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value === undefined || value === null) {
          acc[key] = '';
        } else if (Array.isArray(value)) {
          // 배열
          acc[key] = value.join(',');
        } else if (typeof value === 'object') {
          // 객체
          acc[key] = JSON.stringify(value);
        } else {
          acc[key] = String(value);
        }
        return acc;
      },
      {} as Record<string, string>,
    ),
  ).toString();
};
