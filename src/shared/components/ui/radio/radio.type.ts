export interface RadioOption {
  /**
   * 옵션의 값
   */
  value: string;
  /**
   * 옵션의 라벨
   */
  label: string;
  /**
   * 옵션이 비활성화되었는지 여부
   */
  disabled?: boolean;
  /**
   * 옵션의 타입
   */
  type?: 'radio' | 'input'; // radio: 일반 라디오, input: 입력 가능한 라디오
}
