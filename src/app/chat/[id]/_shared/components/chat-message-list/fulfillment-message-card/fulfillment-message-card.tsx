import React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { ArrowRightIcon } from '@/assets/icons';
import Spacer from '@/shared/components/ui/spacer/spacer';
import { FulfillmentFormType } from '@/shared/types/chat';

import styles from './fulfillment-message-card.module.scss';

interface FulfillmentMessageCardProps {
  /** fulfillment 메시지 타입 */
  type: FulfillmentFormType;
  /** 참조 ID (fulfillmentFormId) */
  referenceId: string | null;
}

/**
 * fulfillment 메시지 타입에 따른 제목과 설명 반환
 */
const getFulfillmentMessageInfo = (type: FulfillmentFormType) => {
  switch (type) {
    case 'FULFILLMENT_FORM':
      return {
        variant: 'link',
        title: '티켓팅에 성공했습니다!',
        description: '확인 후 티켓팅 결과가 맘에든다면 결과를 수락해주세요.',
      };
    case 'UPDATE_FULFILLMENT_FORM':
      return {
        variant: 'link',
        title: '대리인이 의뢰 성공 내역을 수정했습니다.',
        description: '티켓팅 결과가 맘에든다면 거래를 진행해주세요.',
      };
    case 'ACCEPTED_FULFILLMENT_FORM':
      return {
        variant: 'text',
        color: 'success',
        title: '의뢰인이 티켓팅 결과를 수락했습니다.',
      };
    case 'REJECTED_FULFILLMENT_FORM':
      return {
        variant: 'text',
        color: 'error',
        title: '의뢰인이 티켓팅 결과를 거절했습니다.',
      };
    default:
      return {
        variant: 'text',
        color: 'default',
        title: '의뢰 성공 내역',
        description: '상세 내용을 확인해주세요.',
      };
  }
};

/**
 * fulfillment 메시지 카드 컴포넌트
 */
const FulfillmentMessageCard = ({
  type,
  referenceId,
}: FulfillmentMessageCardProps) => {
  const { id: roomId } = useParams();

  const { variant, color, title, description } =
    getFulfillmentMessageInfo(type);

  return (
    <div className={styles.card} data-variant={variant} data-color={color}>
      <div className={styles.content}>
        <h3 className={styles.title} data-variant={variant}>
          {title}
        </h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      {variant === 'link' && (
        <>
          <Spacer size={16} />
          <Link
            href={`/chat/${roomId}/request-success/${referenceId}`}
            className={styles.link}
          >
            <span>상세보기</span>
            <ArrowRightIcon width={12} height={12} />
          </Link>
        </>
      )}
    </div>
  );
};

export default FulfillmentMessageCard;
