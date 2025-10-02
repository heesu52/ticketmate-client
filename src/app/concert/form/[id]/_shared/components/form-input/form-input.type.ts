export type HopeArea = {
  id: number;
  location: string;
  price: string; // 나중에 전송 시 Number로 변환
};

export type FormData = {
  performanceDate: string;
  requestCount: string;
  hopeAreaList: HopeArea[] | null;
  requirement: string;
};
