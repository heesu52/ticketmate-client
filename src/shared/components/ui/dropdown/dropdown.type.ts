export interface DropdownItem {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  isDanger?: boolean; //삭제하기 버튼 css 구분
}
