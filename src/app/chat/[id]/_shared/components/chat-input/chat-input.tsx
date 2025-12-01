'use client';

import React, { useState } from 'react';

import dayjs from 'dayjs';

import CancelProgressModal from '@/app/chat/[id]/_shared/components/cancel-progress-modal/cancel-progress-modal';
import {
  usePatchCancelProgress,
  useSendChatMessageImage,
} from '@/app/chat/[id]/_shared/services/mutation';
import { GetChatRoomInfoResponse } from '@/app/chat/[id]/_shared/services/type';
import {
  CheckIcon,
  CloseIcon,
  GalleryIcon,
  ListIcon,
  PlusIcon,
  SendIcon,
} from '@/assets/icons';
import { useModalStore } from '@/shared/components/ui/modal/modal-store';
import { toastify } from '@/shared/components/ui/toast/toastify';
import { useMember } from '@/shared/context/member-context';
import { useWebSocket } from '@/shared/context/websocket-context';
import { useNavigation } from '@/shared/hooks/navigation/use-navigation';

import styles from './chat-input.module.scss';

interface ChatInputProps {
  roomId: string;
  chatRoomInfo?: GetChatRoomInfoResponse;
}

const ChatInput = ({ roomId, chatRoomInfo }: ChatInputProps) => {
  const navigation = useNavigation();
  const { open } = useModalStore();
  const { member } = useMember();

  const hasApplicationForm = chatRoomInfo?.fulfillmentFormId !== null;

  // 추가 버튼 클릭 시 추가 메뉴 표시
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  const { isConnected, isConnecting, sendMessage } = useWebSocket();

  const { mutateAsync: sendChatMessageImage, isPending: isImageUploading } =
    useSendChatMessageImage();

  // 버튼 비활성화 여부
  const disabled = !isConnected || isConnecting || isImageUploading;

  // 이미지 파일 선택 및 업로드 처리
  const handleImageSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const selectedFiles = Array.from(files);

    // 이미지 파일만 필터링 (최대 3장)
    const imageFiles = selectedFiles
      .filter((file) => file.type.startsWith('image/'))
      .slice(0, 3);

    if (imageFiles.length === 0) {
      alert('이미지 파일만 선택할 수 있습니다.');
      return;
    }

    if (imageFiles.length > 3) {
      alert('최대 3장까지만 선택할 수 있습니다.');
      return;
    }

    sendChatMessageImage({
      chatRoomId: roomId,
      chatMessagePictureList: imageFiles,
      type: 'PICTURE',
    })
      .then(() => {
        setIsOpen(false);
      })
      .catch((error) => {
        console.error('이미지 업로드 실패:', error);
      });
  };

  const handleSendMessage = () => {
    // 메시지가 있는 경우
    if (inputMessage.trim()) {
      // 메시지 전송
      sendMessage(`/pub/chat.message.${roomId}`, {
        message: inputMessage.trim(),
      });
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 갤러리 버튼 클릭 핸들러
  const handleGalleryClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.multiple = true; // 여러 이미지 선택 가능
    fileInput.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      handleImageSelect(files);
    };
    fileInput.click();
  };

  // 신청 양식 버튼 클릭 핸들러
  const handleApplicationFormClick = () => {
    navigation.navigate({
      pathname: `/concert/form/${roomId}/view?from=chat`,
    });
  };

  // 의뢰 성공 버튼 클릭 핸들러
  const handleRequestSuccessClick = () => {
    // 예매 오픈 날짜 중 하나라도 지났는지 확인
    const isOpen =
      chatRoomInfo?.ticketOpenDateInfoResponseList?.some((date) => {
        return dayjs().isAfter(dayjs(date.openDate));
      }) ?? false;

    // 대리인인 경우
    if (member?.memberType === 'AGENT') {
      if (!isOpen) {
        toastify({
          variant: 'info',
          description: '아직 안지났어요.',
        });
        return;
      }

      if (hasApplicationForm) {
        navigation.navigate({
          pathname: `/chat/${roomId}/request-success/${chatRoomInfo?.fulfillmentFormId}`,
        });
        return;
      } else {
        navigation.navigate({
          pathname: `/chat/${roomId}/request-success/new`,
        });
        return;
      }
    } else {
      // 의뢰인인 경우
      if (hasApplicationForm) {
        navigation.navigate({
          pathname: `/chat/${roomId}/request-success/${chatRoomInfo?.fulfillmentFormId}`,
        });
        return;
      } else {
        toastify({
          variant: 'info',
          description: '아직 안보냈어요',
        });
        return;
      }
    }
  };

  const cancelProgress = usePatchCancelProgress();
  // 진행 취소 버튼 클릭 핸들러
  const handleCancelProgressClick = async () => {
    open('cancel-progress-modal', CancelProgressModal, { roomId })
      .then(() => {
        cancelProgress
          .mutateAsync({ chatRoomId: roomId })
          .then(() => {
            toastify({
              variant: 'success',
              description: '진행이 정상적으로 취소되었습니다.',
            });
          })
          .catch(() => {
            toastify({
              variant: 'error',
              description: '진행 취소에 실패했습니다.',
            });
          });
      })
      .catch(() => {
        return false;
      });
  };

  const actionItems = [
    {
      icon: <ListIcon width={24} height={24} />,
      label: '신청 양식',
      onClick: handleApplicationFormClick,
    },
    {
      icon: <GalleryIcon width={24} height={24} />,
      label: '갤러리',
      onClick: handleGalleryClick,
    },
    {
      icon: <CheckIcon width={24} height={24} />,
      label: member?.memberType === 'AGENT' ? '성공 확인' : '성공 안내',
      onClick: handleRequestSuccessClick,
    },
    {
      icon: <CloseIcon width={24} height={24} />,
      label: '진행 취소',
      onClick: handleCancelProgressClick,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <button
          className={styles.action_button}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
        >
          {isOpen ? (
            <CloseIcon
              width={20}
              height={20}
              stroke={`var(--textColor-main)`}
              fill={`var(--textColor-main)`}
            />
          ) : (
            <PlusIcon width={20} height={20} fill={`var(--textColor-main)`} />
          )}
        </button>

        <textarea
          className={styles.message_input}
          id="message-input"
          placeholder="내용을 입력해주세요."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          rows={1}
          disabled={disabled}
        />

        <button
          className={styles.action_button}
          type="button"
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || disabled}
        >
          <SendIcon width={20} height={20} />
        </button>
      </div>

      {isOpen && (
        <div className={styles.action_panel}>
          {actionItems.map((item) => (
            <button
              key={item.label}
              className={styles.item}
              type="button"
              onClick={item.onClick}
              disabled={item.label === '갤러리' ? isImageUploading : false}
            >
              <span className={styles.icon}>
                {item.label === '갤러리' && isImageUploading ? (
                  <div className={styles.loading_spinner} />
                ) : (
                  item.icon
                )}
              </span>
              <span className={styles.label}>
                {item.label === '갤러리' && isImageUploading
                  ? '업로드 중...'
                  : item.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatInput;
