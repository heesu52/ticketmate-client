export type InputItem = {
  seat: string;
  price: string;
  id: number;
};

export type FormData = {
  inputs: InputItem[];
  date: string;
  count: string;
  note: string;
};

export const dateList = [
  { value: '2024-12-01', label: '2024/12/01(금) (1회차)' },
  { value: '2024-12-02', label: '2024/12/02(토) (2회차)' },
  { value: '2024-12-03', label: '2024/12/03(일) (3회차)' },
];

export const countList = [
  { value: '1', label: '1매' },
  { value: '2', label: '2매' },
  { value: '3', label: '3매' },
];
