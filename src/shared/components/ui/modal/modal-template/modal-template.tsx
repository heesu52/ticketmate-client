import { ReactNode } from 'react';

import classNames from 'classnames/bind';

import Button from '@/shared/components/ui/button/button';
import Modal from '@/shared/components/ui/modal/modal';
import type {
  ModalControl,
  ModalComponent,
} from '@/shared/components/ui/modal/modal.type';
import Spacer from '@/shared/components/ui/spacer/spacer';

// 공통 타입들

import styles from './modal-template.module.scss';
const cn = classNames.bind(styles);

/** 외부에 공개되는 props: 사용자가 넘길 항목만 정의 */
export interface ModalTemplatePublicProps {
  title: string;
  description: string;

  /** 첫 번째(좌측) 버튼: 기본 '취소' → reject */
  firstButtonLabel?: string;

  /** 두 번째(우측) 버튼: 기본 '확인' → resolve */
  secondButtonLabel?: string;

  /** 부가 콘텐츠(선택) */
  children?: ReactNode;

  /** 선택: 버튼 클릭 시 부가 동작(검증/로그 등). resolve/reject는 내부에서 처리됨 */
  onFirstButtonClick?: () => void;
  onSecondButtonClick?: () => void;
}

/** 내부 구현: ModalControl<TResult>는 Store가 주입 */
function ModalTemplateInner<TResult = unknown>({
  title,
  description,
  firstButtonLabel = '취소',
  secondButtonLabel = '확인',
  onFirstButtonClick,
  onSecondButtonClick,
  children,
  onResolve,
  onReject,
}: ModalTemplatePublicProps & ModalControl<TResult>) {
  const handleFirstButtonClick = () => {
    onFirstButtonClick?.();
    // first = 취소 의미 → reject
    onReject(new Error(firstButtonLabel));
  };

  const handleSecondButtonClick = () => {
    onSecondButtonClick?.();
    // second = 확인 의미 → resolve (원하면 TResult를 더 좁혀서 설계 가능)
    // 여기서는 라벨 문자열을 그대로 resolve 값으로 보냄
    onResolve(secondButtonLabel as unknown as TResult);
  };

  return (
    <Modal className={cn('container')}>
      <Modal.Title className={cn('modal_title')}>{title}</Modal.Title>

      <Spacer size={4} />

      <Modal.Description className={cn('modal_description')}>
        {description}
      </Modal.Description>

      {children}

      <Spacer size={32} />

      <Modal.Action className={cn('modal_actions')}>
        <Button
          type="button"
          variant="fill"
          color="gray"
          onClick={handleFirstButtonClick}
          className={cn('modal_button', 'first')}
        >
          {firstButtonLabel}
        </Button>
        <Button
          type="button"
          variant="fill"
          color="default"
          onClick={handleSecondButtonClick}
          className={cn('modal_button', 'second')}
        >
          {secondButtonLabel}
        </Button>
      </Modal.Action>
    </Modal>
  );
}

/**
 * 외부로 노출되는 컴포넌트 타입:
 * - 사용자는 ModalTemplatePublicProps만 넘긴다.
 * - onResolve/onReject는 Store가 주입한다.
 *
 * TResult 기본은 unknown. 필요 시 템플릿별로 더 좁혀서 export 가능:
 *   export default ModalTemplateInner as ModalComponent<ModalTemplatePublicProps, string>;
 */
const ModalTemplate = ModalTemplateInner as ModalComponent<
  ModalTemplatePublicProps,
  unknown
>;

export default ModalTemplate;
