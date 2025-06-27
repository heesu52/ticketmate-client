'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import type { ChatMessage } from '@/app/chat/[id]/_shared/services/type';

interface UseStompProps {
  chatRoomId: string;
  onMessageReceived?: (message: ChatMessage) => void;
  onReadAck?: (data: { readerId: string; lastReadMessageId: string }) => void;
}

interface ReadAckData {
  lastReadMessageId: string;
  readDate: string;
}

const useStomp = ({
  chatRoomId,
  onMessageReceived,
  onReadAck,
}: UseStompProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const stompClientRef = useRef<Client | null>(null);
  const chatSubscriptionRef = useRef<StompSubscription | null>(null);
  const unreadSubscriptionRef = useRef<StompSubscription | null>(null);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const port = typeof window !== 'undefined' ? window.location.port : '';
  const accessToken =
    port === '3000'
      ? process.env.NEXT_PUBLIC_ACCESS_TOKEN_3000
      : port === '3001'
        ? process.env.NEXT_PUBLIC_ACCESS_TOKEN_3001
        : process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  // WebSocket 연결
  const connect = useCallback(() => {
    if (stompClientRef.current?.connected) return;

    const socket = new SockJS(`${baseURL}/chat`);
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      debug: (str: string) => {
        console.log('STOMP Debug:', str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log('WebSocket 연결이 성공했습니다.');
      setIsConnected(true);

      // 채팅방 메시지 구독
      const chatSubscription = client.subscribe(
        `/sub/chat.room.${chatRoomId}`,
        (frame) => {
          try {
            const parsedMessage = JSON.parse(frame.body);
            console.log('받은 메시지:', parsedMessage);

            // READ_ACK 타입 처리
            if (parsedMessage.type === 'READ_ACK') {
              if (onReadAck) {
                onReadAck({
                  readerId: parsedMessage.readerId,
                  lastReadMessageId: parsedMessage.lastReadMessageId,
                });
              }
              return;
            }

            // 일반 메시지 처리
            const chatMessage = parsedMessage as ChatMessage;
            setMessages((prev) => [...prev, chatMessage]);

            if (onMessageReceived) {
              onMessageReceived(chatMessage);
            }
          } catch (error) {
            console.error('메시지 파싱 오류:', error);
          }
        },
      );

      chatSubscriptionRef.current = chatSubscription;
    };

    client.onDisconnect = () => {
      console.log('WebSocket 연결이 끊어졌습니다.');
      setIsConnected(false);
    };

    client.onStompError = (frame) => {
      console.error('STOMP 오류:', frame);
      setIsConnected(false);
    };

    client.onWebSocketError = (error) => {
      console.error('WebSocket 오류:', error);
      setIsConnected(false);
    };

    stompClientRef.current = client;
    client.activate();
  }, [baseURL, accessToken, chatRoomId, onMessageReceived, onReadAck]);

  // 메시지 전송
  const sendMessage = useCallback(
    (message: string) => {
      if (!stompClientRef.current?.connected) {
        console.error('WebSocket이 연결되지 않았습니다.');
        return;
      }

      stompClientRef.current.publish({
        destination: `/pub/chat.message.${chatRoomId}`,
        body: JSON.stringify({ message }),
      });
    },
    [chatRoomId],
  );

  // 읽음 확인 전송
  const sendReadAck = useCallback(
    (lastReadMessageId: string) => {
      if (!stompClientRef.current?.connected) {
        console.error('WebSocket이 연결되지 않았습니다.');
        return;
      }

      const readAckData: ReadAckData = {
        lastReadMessageId,
        readDate: new Date().toISOString(),
      };

      stompClientRef.current.publish({
        destination: `/pub/chat.read.${chatRoomId}`,
        body: JSON.stringify(readAckData),
      });
    },
    [chatRoomId],
  );

  // 연결 해제
  const disconnect = useCallback(() => {
    if (chatSubscriptionRef.current) {
      chatSubscriptionRef.current.unsubscribe();
      chatSubscriptionRef.current = null;
    }

    if (unreadSubscriptionRef.current) {
      unreadSubscriptionRef.current.unsubscribe();
      unreadSubscriptionRef.current = null;
    }

    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
      stompClientRef.current = null;
    }

    setIsConnected(false);
  }, []);

  // 컴포넌트 마운트 시 연결
  useEffect(() => {
    connect();

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    messages,
    sendMessage,
    sendReadAck,
    connect,
    disconnect,
  };
};

export default useStomp;
