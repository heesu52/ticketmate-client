'use client';

import { useEffect, useState } from 'react';

import { useCheckDuplicateForm } from '@/app/concert/[id]/_shared/services/bottom-sheet/mutation';
import { StarIcon } from '@/assets/icons';
import CommonBottomSheet from '@/shared/components/ui/bottom-sheet/bottom-sheet';
import Button from '@/shared/components/ui/button/button';
import { useNavigation } from '@/shared/hooks/navigation/use-navigation';
import { AgentInfo, Concert, TicketOpenType } from '@/shared/types';

import styles from './custom-bottom-sheet.module.scss';

interface BottomSheetProps {
  onClose: () => void;
  isOpen: boolean;
  concertItem: Concert | undefined;
  concertId: string;
  agentInfo: AgentInfo;
}

const CustomBottomSheet = ({
  isOpen,
  onClose,
  concertItem,
  concertId,
  agentInfo,
}: BottomSheetProps) => {
  const { ticketOpenDateInfoResponseList } = concertItem ?? {};
  const navigation = useNavigation<{
    isBankTransfer: boolean;
  }>();
  const { agentId, nickname, introduction, averageRating, reviewCount } =
    agentInfo;

  const safeAvg = Number.isFinite(averageRating)
    ? (averageRating as number)
    : 0;
  const safeCount = Number.isFinite(reviewCount) ? (reviewCount as number) : 0;

  //티켓 오픈 타입 별로 버튼 구분
  const preOpen = ticketOpenDateInfoResponseList?.find(
    (info) => info.ticketOpenType === 'PRE_OPEN',
  );
  const generalOpen = ticketOpenDateInfoResponseList?.find(
    (info) => info.ticketOpenType === 'GENERAL_OPEN',
  );

  // 각 타입별로 중복 여부 관리
  const [isDuplicateMap, setIsDuplicateMap] = useState<
    Record<TicketOpenType, boolean>
  >({ PRE_OPEN: false, GENERAL_OPEN: false });

  //선예매/일반예매를 분리해서 중복확인
  const { mutate: checkPreOpen } = useCheckDuplicateForm();
  const { mutate: checkGeneralOpen } = useCheckDuplicateForm();

  useEffect(() => {
    if (!isOpen || !agentId || !concertId) return;

    if (preOpen) {
      checkPreOpen(
        { agentId, concertId, ticketOpenType: 'PRE_OPEN' },
        {
          onSuccess: (res) =>
            setIsDuplicateMap((prev) => ({
              ...prev,
              PRE_OPEN: res as boolean,
            })),
        },
      );
    }

    if (generalOpen) {
      checkGeneralOpen(
        { agentId, concertId, ticketOpenType: 'GENERAL_OPEN' },
        {
          onSuccess: (res) =>
            setIsDuplicateMap((prev) => ({
              ...prev,
              GENERAL_OPEN: res as boolean,
            })),
        },
      );
    }
  }, [
    isOpen,
    agentId,
    concertId,
    preOpen,
    generalOpen,
    checkGeneralOpen,
    checkPreOpen,
  ]);

  // 버튼 클릭 시 navigate로 이동
  const handleNavigate = (
    ticketOpenType: TicketOpenType,
    isBankTransfer: boolean,
  ) => {
    onClose();
    navigation.navigate({
      pathname: `/concert/form/${concertId}`,
      search: `?agentId=${agentId}&type=${ticketOpenType}`,
      state: { isBankTransfer },
    });
  };

  return (
    <CommonBottomSheet open={isOpen} onDismiss={onClose}>
      {/* bottom-sheet의 내부 콘텐츠 컨테이너 */}
      <div className={styles.content_container}>
        {/* 상단 컨테이너 */}
        <div className={styles.upper_container}>
          <span>프로필 보기</span>
          {/* 대리인 정보 컨테이너 */}
          <div className={styles.title_container}>
            <span className={styles.title}>{nickname}</span>
            {/* 리뷰 컨테이너 */}
            <div className={styles.review_container}>
              <span>
                <StarIcon width={20} height={20} />
              </span>
              <span className={styles.review_score}>{safeAvg.toFixed(1)}</span>
              <span className={styles.review_count}>
                {`(${safeCount > 99 ? '99+' : safeCount})`}
              </span>
            </div>
          </div>
          <span className={styles.info}>
            {introduction || '한 줄 소개를 작성해주세요'}
          </span>
        </div>

        {/* 버튼 컨테이너 */}
        <div className={styles.button_container}>
          {preOpen &&
            (isDuplicateMap.PRE_OPEN ? (
              <Button variant="fill" color="gray" onClick={onClose}>
                신청된 예매
              </Button>
            ) : (
              <Button
                variant="fill"
                onClick={() =>
                  handleNavigate('PRE_OPEN', preOpen.isBankTransfer)
                }
              >
                선예매 신청하기
              </Button>
            ))}

          {generalOpen &&
            (isDuplicateMap.GENERAL_OPEN ? (
              <Button variant="fill" color="gray" onClick={onClose}>
                신청된 예매
              </Button>
            ) : (
              <Button
                variant="outline"
                color="gray"
                onClick={() =>
                  handleNavigate('GENERAL_OPEN', generalOpen.isBankTransfer)
                }
              >
                일반예매 신청하기
              </Button>
            ))}
        </div>
      </div>
    </CommonBottomSheet>
  );
};

export default CustomBottomSheet;
