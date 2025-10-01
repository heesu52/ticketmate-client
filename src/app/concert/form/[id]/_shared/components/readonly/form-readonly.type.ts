export type HopeArea = {
  id: number;
  location: string;
  price: string; // 나중에 전송 시 Number로 변환
};

export type FormData = {
  performanceDate: string; // 기존: date
  requestCount: string; // 기존: count
  hopeAreaList: HopeArea[] | null; // 기존: inputs
  requirement: string; // 기존: note
};
