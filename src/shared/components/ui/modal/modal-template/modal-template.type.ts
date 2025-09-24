import { ReactNode } from 'react';

import { ModalControl } from '@/shared/components/ui/modal/modal.type';

export interface ModalTemplateType extends ModalControl {
  /** 모달 제목 */
  title: string;
  /** 모달 설명 */
  description: string;
  /** 첫 번째(좌측) 버튼 */
  firstButtonLabel?: string;
  /** 두 번째(우측) 버튼 */
  secondButtonLabel?: string;
  /** 부가 콘텐츠(선택) */
  children?: ReactNode;
  /** 선택: 버튼 클릭 시 부가 동작(검증/로그 등). resolve/reject는 내부에서 처리됨 */
  onFirstButtonClick?: () => void;
  /** 선택: 버튼 클릭 시 부가 동작(검증/로그 등). resolve/reject는 내부에서 처리됨 */
  onSecondButtonClick?: () => void;
}
