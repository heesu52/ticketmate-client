'use client';

import { useMemo, useCallback, useEffect, useRef, useState } from 'react';

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { ChatMessage } from '@/app/chat/[id]/_shared/services/type';
import type {
  ReadAckMessage,
  UnreadMessage,
} from '@/shared/hooks/use-chat-stomp/use-chat-stomp.type';

interface UseStompProps {
  /** 채팅방 ID */
  chatRoomId: string;
  /** 웹소켓 연결 시 호출될 함수 */
  onConnect?: () => void;
  /** 미읽음 메시지 알림 구독 시 호출될 함수 */
  onUnreadMessage?: (dto: unknown) => void;
  /** 실시간 메시지 구독 시 호출될 함수 */
  onReceivedMessage?: (dto: unknown) => void;
  /** 읽음 확인 메시지 수신 시 호출될 함수 */
  onReadAck?: (dto: unknown) => void;
}

const useStomp = ({
  chatRoomId,
  onConnect,
  onUnreadMessage,
  onReceivedMessage,
  onReadAck,
}: UseStompProps) => {
  const port = typeof window !== 'undefined' ? window.location.port : '';
  const accessToken =
    port === '3000'
      ? process.env.NEXT_PUBLIC_ACCESS_TOKEN_3000
      : port === '3001'
        ? process.env.NEXT_PUBLIC_ACCESS_TOKEN_3001
        : process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  const userId = useMemo(() => {
    try {
      return JSON.parse(atob(accessToken?.split('.')[1] ?? '')).memberId;
    } catch {
      return '';
    }
  }, [accessToken]);

  const stompClient = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  /** 웹소켓 연결 */
  const connectWebSocket = useCallback(() => {
    const socket = new SockJS(`https://api.ticketmate.site/chat`);

    const stomp = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      debug: (str) => {
        console.log('STOMP Debug:', str);
      },
      // reconnectDelay: 5000,
      // heartbeatIncoming: 4000,
      // heartbeatOutgoing: 4000,
    });

    stomp.onConnect = () => {
      setIsConnected(true);
      onConnect?.();
    };

    stompClient.current = stomp;
    stomp.activate();
  }, [accessToken, onConnect]);

  /** 미읽음 메세지 알림 구독 */
  const subscribeUnread = useCallback(() => {
    if (!stompClient.current?.connected || !userId) return;

    stompClient.current.subscribe(`/queue/unread.${userId}`, (msg) => {
      const unreadMessage: UnreadMessage = JSON.parse(msg.body);

      onUnreadMessage?.(unreadMessage);
    });
  }, [userId, onUnreadMessage]);

  /** 실시간 메세지 구독 */
  const subscribeRealTime = useCallback(() => {
    if (!stompClient.current?.connected || !userId) return;

    stompClient.current.subscribe(
      `/exchange/chat.exchange/chat.room.${chatRoomId}.user.${userId}`,
      (msg) => {
        const response: ChatMessage | ReadAckMessage = JSON.parse(msg.body);

        if ('type' in response && response.type === 'READ_ACK') {
          onReadAck?.(response);
          return;
        } else if ('message' in response) {
          onReceivedMessage?.(response);
        }
      },
    );
  }, [chatRoomId, userId, onReceivedMessage]);

  /** 메세지 전송 */
  const sendMessage = useCallback(
    (message: string) => {
      if (!stompClient.current?.connected) return;

      stompClient.current.publish({
        destination: `/pub/chat.message.${chatRoomId}`,
        body: JSON.stringify({ message }),
      });
    },
    [chatRoomId],
  );

  /** 메세지 읽음 확인 처리 전송 */
  const sendReadAck = useCallback(
    (messageId: string) => {
      if (!stompClient.current?.connected) return;

      stompClient.current.publish({
        destination: `/pub/chat.read.${chatRoomId}`,
        body: JSON.stringify({
          lastReadMessageId: messageId,
          readDate: new Date().toISOString(),
        }),
      });
    },
    [chatRoomId],
  );

  /** 웹소켓 연결 해제 */
  const disconnectWebSocket = useCallback(() => {
    stompClient.current?.deactivate();
  }, []);

  useEffect(() => {
    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, [connectWebSocket, disconnectWebSocket]);

  return {
    isConnected,
    subscribeUnread,
    subscribeRealTime,
    sendMessage,
    sendReadAck,
  };
};

export default useStomp;
