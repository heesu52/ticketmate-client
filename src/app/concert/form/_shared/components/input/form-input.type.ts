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
  { value: 'date1', label: '2024/12/01(금) (1회차)' },
  { value: 'date2', label: '2024/12/02(토) (2회차)' },
  { value: 'date3', label: '2024/12/03(일) (3회차)' },
];

export const countList = [
  { value: 'count1', label: '1매' },
  { value: 'count2', label: '2매' },
  { value: 'count3', label: '3매' },
];
